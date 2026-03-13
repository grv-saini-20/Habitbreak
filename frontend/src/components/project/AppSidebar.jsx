import { Home, ListTodo, Settings, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useDispatch } from "react-redux"
import { useLogoutMutation } from "@/services/usersApi";
import { logout as userLogout } from "@/services/authSlice";

export function AppSidebar() {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  
  const handleLogout = async() => {
    try {
      await logout().unwrap();
      dispatch(userLogout());
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <Sidebar className={"p-6 bg-sidebar"}>

      <SidebarHeader>
        <h2 className="text-2xl font-bold">HabitBreak</h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/dashboard">
                <Home />
                Dashboard
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/habits">
                <ListTodo />
                Habits
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/settings">
                <Settings />
                Settings
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
            >
              <LogOut />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>

    </Sidebar>
  )
}