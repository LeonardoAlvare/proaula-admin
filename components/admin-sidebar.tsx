"use client"

import { Button } from "@/components/ui/button"

import { BarChart3, FileText, Home, LogOut, Users } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const routes = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Proyectos",
      href: "/admin/projects",
      icon: FileText,
    },
    {
      title: "Propuestas",
      href: "/admin/proposals",
      icon: BarChart3,
    },
    {
      title: "Usuarios",
      href: "/admin/users",
      icon: Users,
    },
  ]

  const handleLogout = () => {
    // Remove authentication state
    localStorage.removeItem("isAuthenticated")
    // Redirect to login page
    router.push("/")
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between p-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
            <span>FreelaXpress</span>
          </Link>
          <SidebarTrigger className="md:hidden" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                  <Link href={route.href}>
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                A
              </div>
              <div>
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@freelaxpress.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Cerrar sesión</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="fixed top-0 left-0 right-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:hidden">
        <SidebarTrigger />
        <Link href="/admin" className="flex items-center gap-2 font-bold">
          FreelaXpress
        </Link>
      </div>
    </>
  )
}
