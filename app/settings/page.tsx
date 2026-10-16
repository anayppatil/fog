"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto h-[80vh] flex flex-col justify-center">
      <Card className="border-border/50 bg-card/50 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/40 via-transparent to-transparent pointer-events-none" />
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-muted/80 rounded-full flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-border/50">
            <Lock className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Settings Locked</CardTitle>
          <CardDescription className="text-lg mt-2 text-muted-foreground">
            System configuration is restricted in Demo Mode
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground max-w-md mx-auto pt-4">
          <p>
            You are currently viewing a prototype demonstration. User preferences, API configurations, and system settings are disabled to prevent accidental modifications to the demo environment.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
