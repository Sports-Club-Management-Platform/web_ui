import React from "react";
import confetti from "canvas-confetti";
import { Button, ButtonProps } from "@/components/ui/button";

interface ConfettiButtonProps extends ButtonProps {
  options?: confetti.Options;
}

export const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  options,
  onClick,
  children,
  ...props
}) => {
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = rect.top / window.innerHeight;

    await confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#4CAF50', '#45a049', '#66bb6a', '#81c784', '#a5d6a7'],
      ...options,
    });
  };

  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};