"use client"

import { ReactNode, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isSampleUser } = {user: "benup",isSampleUser: false}
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [user, router, pathname])

  if (!user && pathname !== '/admin/login') {
    return null
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {isSampleUser && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
              <p className="font-bold">Sample User</p>
              <p>You are logged in as a sample user. Some features may be limited.</p>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}

