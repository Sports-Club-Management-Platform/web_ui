"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import InteractiveHoverButton, {ButtonVariant} from "./interactive-hover-button";
import { LucideIcon, Plus } from 'lucide-react';
import { Button } from "./button";

interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  return (
    <ModalContext.Provider value={{ open, setOpen, visible, setVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

interface ModalTriggerProps {
  children?: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  text?: string;
  icon?: LucideIcon;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  children,
  className,
  variant = "primary",
  text = "Open Modal",
  icon: Icon = Plus,
}) => {
  const { setOpen, setVisible } = useModal();
  return (
    <InteractiveHoverButton
      variant={variant}
      className={cn(className)}
      text={text}
      icon={Icon}
      onClick={() => {
        setOpen(true);
        setVisible(true);
      }}
    >
      {children}
    </InteractiveHoverButton>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open, visible, setOpen } = useModal();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };
      document.addEventListener("keydown", handleEscKey);
      return () => {
        document.removeEventListener("keydown", handleEscKey);
      };
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open, setOpen]);

  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: visible ? 1 : 0,
            backdropFilter: visible ? "blur(10px)" : "blur(0px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
        >
          <Overlay visible={visible} />

          <motion.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: visible ? 1 : 0,
              scale: visible ? 1 : 0.5,
              rotateX: visible ? 0 : 40,
              y: visible ? 0 : 40,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col flex-1 p-8 md:p-10", className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-end p-4 bg-gray-100 dark:bg-neutral-900",
        className
      )}
    >
      {children}
    </div>
  );
};
const Overlay = ({ visible, className }: { visible: boolean, className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: visible ? 1 : 0,
        backdropFilter: visible ? "blur(10px)" : "blur(0px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    ></motion.div>
  );
};

const CloseIcon = () => {
  const { setOpen, setVisible } = useModal();
  return (
    <button
      onClick={() => {
        setVisible(false);
        setTimeout(() => setOpen(false), 300); // Delay closing to allow for fade out animation
      }}
      className="absolute top-4 right-4 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};


// Hook to detect clicks outside of a component.
// Add it in a separate file, I've added here for simplicity
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      // DO NOTHING if the element being clicked is the target element or their children
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

export const ModalCancelButton = ({ onClick, children }: { onClick?: () => void, children?: ReactNode }) => {
  const { setOpen } = useModal();
  
  const handleClick = () => {
    setOpen(false);
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button variant="outline" onClick={handleClick}>
      {children || "Cancel"}
    </Button>
  );
};
