import React from 'react'
import { AppSidebar } from '../project/AppSidebar'
import { SidebarProvider } from '../ui/sidebar'

const DashboardLayout = ({children}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout