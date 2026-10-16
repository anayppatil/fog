"use client"

import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Role } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, User, Users, BrainCircuit } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const setRole = useStore((state) => state.setRole)

  const handleLogin = (role: Role) => {
    setRole(role)
    router.push(`/${role}/dashboard`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="space-y-8">
          <div className="flex items-center gap-4 text-sky-400">
            <div className="relative">
              <div className="absolute inset-0 bg-sky-400 blur-xl opacity-50" />
              <Activity className="h-16 w-16 relative z-10 animate-pulse" />
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-teal-300 to-sky-400">FoG Assist</h1>
          </div>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Adaptive AI-Powered Predictive Wearable System for Parkinson's Freezing of Gait
          </p>
          <div className="bg-sky-950/30 backdrop-blur-md p-5 rounded-2xl border border-sky-500/20 shadow-[0_0_30px_rgba(14,165,233,0.1)]">
            <p className="text-sm text-sky-300 font-medium">
              Note: This is a project prototype and demonstration platform. It is not a clinical diagnostic system.
            </p>
          </div>
        </div>

        <Card className="glass-panel border-border/50 shadow-2xl p-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/10 to-transparent blur-2xl" />
          <CardHeader className="pb-8">
            <CardTitle className="text-3xl font-bold">Select Demo Role</CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              Choose a user role to experience the platform. No authentication is required.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full h-20 justify-start gap-4 text-left px-6 text-lg bg-card/50 border-border hover:bg-muted hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] transition-all duration-300 rounded-xl group"
              onClick={() => handleLogin("patient")}
            >
              <div className="bg-sky-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-sky-500/20">
                <User className="h-6 w-6 text-sky-400" />
              </div>
              <div>
                <div className="font-semibold text-card-foreground">Patient Login</div>
                <div className="text-sm font-normal text-muted-foreground">patient@demo.com</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full h-20 justify-start gap-4 text-left px-6 text-lg bg-card/50 border-border hover:bg-muted hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] transition-all duration-300 rounded-xl group"
              onClick={() => handleLogin("guardian")}
            >
              <div className="bg-teal-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-teal-500/20">
                <Users className="h-6 w-6 text-teal-400" />
              </div>
              <div>
                <div className="font-semibold text-card-foreground">Guardian / Caregiver</div>
                <div className="text-sm font-normal text-muted-foreground">guardian@demo.com</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full h-20 justify-start gap-4 text-left px-6 text-lg bg-card/50 border-border hover:bg-muted hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300 rounded-xl group"
              onClick={() => handleLogin("doctor")}
            >
              <div className="bg-indigo-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-indigo-500/20">
                <BrainCircuit className="h-6 w-6 text-indigo-400" />
              </div>
              <div>
                <div className="font-semibold text-card-foreground">Doctor / Researcher</div>
                <div className="text-sm font-normal text-muted-foreground">doctor@demo.com</div>
              </div>
            </Button>
          </CardContent>
        </Card>
        
      </div>
    </div>
  )
}
