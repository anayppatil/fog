"use client"

import { useState } from "react"
import { Sidebar } from "./Sidebar"
import { TopNav } from "./TopNav"
import { useStore } from "@/lib/store"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const role = useStore((state) => state.role)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // If not logged in, just show the content (Login page)
  if (!role) {
    return <div className="min-h-screen bg-background">{children}</div>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </div>
      
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <TopNav onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
