"use client"

import { Button } from "@/components/ui/button"
import { Menu, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
  const { user, logout, isSampleUser } = { user: "benup", logout: () => false, isSampleUser: false }
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-sm md:text-2xl font-semibold text-gray-800 ml-2 lg:ml-0">FEFVEN Admin</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          Logged in as: <strong>{user}</strong>
          {isSampleUser && " (Sample User)"}
        </span>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  )
}

