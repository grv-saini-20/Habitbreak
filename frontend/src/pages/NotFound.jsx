import React from 'react'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-4">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <a href="/dashboard" className="text-primary underline">
        Go back to dashboard
      </a>
    </div>
  )
}

export default NotFound