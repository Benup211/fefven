"use client"

import { Button } from "@/components/ui/button"
import useAuthStore from "@/state/admin/login-store"
import { Menu, LogOut, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {toast} from '@/hooks/use-toast'
interface AdminHeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
  const {logout,isLoading}=useAuthStore()
  const router = useRouter()

  const handleLogout = async() => {
    const response=await logout();
    if(response.success){
      toast({
        title:"Logout Success",
        description:"You have successfully logged out",
      })
      router.push('/admin/login')
    }else{
      toast({
        title:"Logout Failed",
        description:response.error,
        variant:"destructive"
      })
    }
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
          Logged in as: <strong>{"fefven"}</strong>
        </span>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Logout"}
        </Button>
      </div>
    </header>
  )
}

