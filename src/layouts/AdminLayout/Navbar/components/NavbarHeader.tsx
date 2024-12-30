import React from 'react';
import { SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import CSCLogo from "@/assets/CSC-SemFundo.png";
import CSCLogoSpecial from "@/assets/CSC-SemFundo-Special.png";
import { useTheme } from '@/components/theme-provider'

const NavbarHeader: React.FC<{ isExpanded: boolean; }> = ({ isExpanded}) => {
    const { theme } = useTheme();
    
    return (
        <SidebarHeader className="bg-background">
            <SidebarMenu>
                <SidebarMenuItem className="flex items-center w-full">
                    <SidebarMenuButton size="lg" asChild>
                        <div className="flex items-center w-full">
                            <a href="/" className='flex items-center space-x-2'>
                                <div className="flex aspect-square items-center justify-center rounded-lg">
                                    <img src={theme === "special" ? CSCLogoSpecial : CSCLogo} alt="logo" className="w-12 h-12" />
                                </div>
                                {isExpanded && (
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="text-md font-handwritten font-semibold">Adminstation</span>
                                        <span className="text-sm font-handwritten text-muted-foreground">Candelária S. C.</span>
                                    </div>
                                )}
                            </a>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
};

export default NavbarHeader;