import { Outlet } from "react-router-dom"
import "./App.css"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/project/AppSidebar"

function App() {
  return (
    <SidebarProvider>
      <main className="w-full flex">
        <AppSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  )
}

export default App