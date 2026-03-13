import { Home, ListTodo } from "lucide-react"
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

// import { ModeToggle } from "@/components/mode-toggle"

export function AppSidebar() {
  return (
    <Sidebar>

      <SidebarHeader>
        <h2 className="text-lg font-semibold">HabitBreak</h2>
      </SidebarHeader>

      <SidebarContent>

        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink to="/">
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
        {/* <ModeToggle /> */}
      </SidebarFooter>

    </Sidebar>
  )
}