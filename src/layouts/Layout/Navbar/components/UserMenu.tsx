import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'
import { Settings, User, ChevronDown, LogOut, Settings2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUserStore } from '@/stores/useUserStore'

interface Props {
  name: string;
  handleLogout: () => void;
}

export function UserMenu({ name, handleLogout }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const admin = useUserStore(state => state.admin)

  return (
    <DropdownMenu onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex rounded-full items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-lg font-bold">{name}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/account" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          {admin && (
            <div>
              <DropdownMenuItem asChild>
                <Link to="/management/tickets" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>
                    Tickets Management
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/management/games" className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  <span>
                    Games Management
                  </span>
                </Link>
              </DropdownMenuItem>
            </div>
          )}
          <DropdownMenuSeparator />          
          <DropdownMenuItem onClick={handleLogout} className="text-red-600">
            <LogOut className="h-4 w-4 mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </motion.div>
    </DropdownMenu>
  )
}