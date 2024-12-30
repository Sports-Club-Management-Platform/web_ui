import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Navbar from './Navbar'
import { ModeToggle } from '@/components/mode-toggle'

const AdminLayout: React.FC = () => {
  const [location, setLocation] = useState<string>('Home')

  return (
    <SidebarProvider>
        <Navbar />
        <SidebarInset>
          <header className="flex h-16 shrink z-10 items-center gap-2">
            <div className="flex items-center gap-2 px-6">
              <ModeToggle />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div>
                <p>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink to="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink to={location}>{location}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </p>
              </div>
            </div>
          </header>
          <div className="flex flex-1 border rounded-2xl flex-col gap-4 p-4 pt-0">
            <Outlet />
          </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export { AdminLayout }