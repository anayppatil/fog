"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Activity, 
  List, 
  Cpu, 
  User,
  Users,
  TrendingUp,
  AlertTriangle,
  BrainCircuit,
  FileText,
  Settings,
  HelpCircle,
  PlayCircle,
  LogOut
} from "lucide-react"

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const role = useStore((state) => state.role)
  const setRole = useStore((state) => state.setRole)

  const handleLogout = () => {
    setRole(null as any)
    router.push("/")
    if (onClose) onClose()
  }

  const patientLinks = [
    { name: "Overview", href: "/patient/dashboard", icon: LayoutDashboard },
    { name: "Live Monitoring", href: "/patient/monitoring", icon: Activity },
    { name: "FoG Events", href: "/patient/events", icon: List },
    { name: "My Device", href: "/patient/device", icon: Cpu },
  ]

  const guardianLinks = [
    { name: "Overview", href: "/guardian/dashboard", icon: LayoutDashboard },
    { name: "Alerts", href: "/guardian/alerts", icon: AlertTriangle },
    { name: "Trends", href: "/guardian/trends", icon: TrendingUp },
  ]

  const doctorLinks = [
    { name: "Overview", href: "/doctor/dashboard", icon: LayoutDashboard },
    { name: "FoG Analytics", href: "/doctor/analytics", icon: TrendingUp },
    { name: "Model Performance", href: "/doctor/model", icon: BrainCircuit },
    { name: "Intervention Analytics", href: "/doctor/interventions", icon: Activity },
    { name: "Adaptive AI", href: "/doctor/adaptive-ai", icon: Cpu },
    { name: "Reports", href: "/doctor/reports", icon: FileText },
  ]

  const links = 
    role === "patient" ? patientLinks : 
    role === "guardian" ? guardianLinks : 
    role === "doctor" ? doctorLinks : []

  if (!role) return null; // Don't render sidebar if no role (login page)

  return (
    <div className="flex h-screen w-64 flex-col glass-panel border-r-0 md:border-r border-border text-card-foreground">
      <div className="flex h-16 items-center px-6 border-b border-border/50 font-bold text-xl text-primary gap-2 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-xl"></div>
        <Activity className="h-6 w-6 relative z-10 animate-pulse" />
        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-400">FoG Assist</span>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-4">
          {links.map((link) => {
            const isActive = pathname === link.href
            const Icon = link.icon
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
                  isActive 
                    ? "bg-gradient-to-r from-sky-500/20 to-teal-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
                    : "text-muted-foreground hover:bg-muted/40 hover:text-card-foreground hover:translate-x-1"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive && "text-sky-400")} />
                {link.name}
              </Link>
            )
          })}
        </nav>
      </div>
      
      <div className="border-t p-4 space-y-1">
        <div className="text-xs font-semibold text-muted-foreground px-3 mb-2 uppercase tracking-wider">
          System
        </div>
        <Link
          href="/demo"
          onClick={onClose}
          className={cn(
            "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
            pathname === "/demo" 
              ? "bg-gradient-to-r from-sky-500/20 to-teal-500/10 text-sky-400 border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
              : "text-muted-foreground hover:bg-muted/40 hover:text-card-foreground hover:translate-x-1"
          )}
        >
          <PlayCircle className={cn("h-4 w-4", pathname === "/demo" && "text-sky-400")} />
          Demo Mode
        </Link>
        <Link
          href="/settings"
          onClick={onClose}
          className={cn(
            "flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-300",
            pathname === "/settings" 
              ? "bg-gradient-to-r from-slate-700/50 to-slate-800/50 text-foreground border border-slate-600/50 shadow-md" 
              : "text-muted-foreground hover:bg-muted/40 hover:text-card-foreground hover:translate-x-1"
          )}
        >
          <Settings className={cn("h-4 w-4", pathname === "/settings" && "text-foreground")} />
          Settings
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 hover:translate-x-1 transition-all duration-300"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )
}
