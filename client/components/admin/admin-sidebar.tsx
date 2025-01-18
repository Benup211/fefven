"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, CalendarDays, Users, FileText, Settings, LogOut, X, Newspaper, Image,Images } from 'lucide-react'

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {name:'Carousel' , href:'/admin/carousel', icon:Images},
  { name: 'Events', href: '/admin/events', icon: CalendarDays },
  { name: 'News', href: '/admin/news', icon: Newspaper },
  { name: 'Gallery', href: '/admin/gallery', icon: Image },
  { name: 'Members', href: '/admin/members', icon: Users },
  { name: 'Resources', href: '/admin/resources', icon: FileText },
]

interface AdminSidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "-translate-x-full",
      "lg:relative lg:translate-x-0"
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b lg:hidden">
        <span className="text-sm md:text-2xl font-semibold text-gray-800">FFVEN Admin</span>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} passHref>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        pathname === item.href && "bg-gray-100 text-gray-900"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

