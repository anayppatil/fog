"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Bell, UserCircle, Wifi, Menu, LogOut, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export function TopNav({ onMenuClick }: { onMenuClick?: () => void }) {
  const { role, isSimulatingEvent, setRole } = useStore()
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  
  if (!role) return null

  const handleLogout = () => {
    setRole(null as any) // clearing role
    router.push("/")
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/20 bg-background/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-4 md:px-6 justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-semibold capitalize text-lg text-foreground hidden sm:block">
          {role} Dashboard
        </div>
        {isSimulatingEvent && (
          <Badge variant="destructive" className="animate-pulse">
            Demo: Event Simulating
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline" className="text-sky-400 border-sky-400/30 bg-sky-500/10 rounded-full px-3 py-1">
          DEMO MODE
        </Badge>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
          <Wifi className="h-4 w-4 text-green-500" />
          <span className="hidden sm:inline-block">System Online</span>
        </div>

        <ThemeToggle />

        <Button variant="ghost" size="icon" className="relative hover:bg-muted hover:text-sky-400 rounded-full transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {isSimulatingEvent && (
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
          )}
        </Button>
        
        <div className="flex items-center gap-3 border-l border-border/50 pl-4 relative" ref={dropdownRef}>
          <div 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 bg-muted/30 hover:bg-muted/60 px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-transparent hover:border-border"
          >
            <UserCircle className="h-7 w-7 text-sky-400" />
            <div className="flex flex-col text-sm leading-none hidden sm:flex">
              <span className="font-medium text-card-foreground capitalize">Demo {role}</span>
              <span className="text-muted-foreground text-xs">{role}@demo.com</span>
            </div>
          </div>
          
          {isProfileOpen && (
            <div className="absolute top-12 right-0 w-48 bg-card border border-border/50 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in duration-200">
              <Link 
                href="/profile" 
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-sky-400 transition-colors cursor-pointer"
              >
                <User className="h-4 w-4" />
                My Profile
              </Link>
              <div className="h-px bg-muted/50 my-1" />
              <div 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </div>
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout" className="hover:bg-red-500/10 hover:text-red-400 rounded-full transition-colors hidden sm:flex">
          <LogOut className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  )
}
