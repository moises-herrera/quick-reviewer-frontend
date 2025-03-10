import { LayoutGrid, LogOut, User } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavLink, useLocation } from 'react-router';
import { useAuthStore } from '@/auth/store/useAuthStore';
import Github from '../icons/Github';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: () => <LayoutGrid className="!size-5" />,
  },
  {
    title: 'GitHub history',
    url: '/history',
    icon: () => <Github fill="#000" className="!size-5" />,
  },
  {
    title: 'Profile',
    url: '/profile',
    icon: () => <User className="!size-5" />,
  },
];

export const AppSidebar = () => {
  const { pathname } = useLocation();
  const logout = useAuthStore(({ logout }) => logout);

  return (
    <Sidebar className="!absolute h-full">
      <SidebarContent className="!bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.url.startsWith(pathname)}
                  >
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/auth/login">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="!size-5" />
                      <span>Logout</span>
                    </button>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
