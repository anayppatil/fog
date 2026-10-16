"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, AlertTriangle, CheckCircle2, XCircle, Cpu, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function GuardianDashboard() {
  const { patients, isSimulatingEvent, events } = useStore()
  const patient = patients.find(p => p.id === "P001")
  const recentEvents = events.filter(e => e.patientId === "P001").slice(0, 5)

  if (!patient) return null

  const isHighRisk = patient.status === "HIGH RISK" || isSimulatingEvent
  const isWarning = patient.status === "WARNING"

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Monitoring</h1>
          <p className="text-muted-foreground mt-1">
            Guardian overview for {patient.name} (ID: {patient.id})
          </p>
        </div>
        
        <Card className={`overflow-hidden border-2 flex items-center md:min-w-[300px] ${
          isHighRisk ? 'border-destructive' : isWarning ? 'border-amber-500' : 'border-green-500'
        }`}>
          <div className={`p-4 text-foreground w-full flex items-center justify-between ${
            isHighRisk ? 'bg-destructive' : isWarning ? 'bg-amber-500' : 'bg-green-500'
          }`}>
            <div className="flex items-center gap-3">
              {isHighRisk ? <XCircle className="h-6 w-6" /> : isWarning ? <AlertTriangle className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
              <span className="text-lg font-bold">STATUS: {patient.status}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/guardian/dashboard">
          <Card className={`hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] transition-all cursor-pointer h-full ${isHighRisk ? "border-destructive border-2" : "border-border/50"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">FoG Risk</CardTitle>
              <Activity className={`h-4 w-4 ${isHighRisk ? "text-destructive animate-pulse" : "text-sky-400"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isHighRisk ? "text-destructive" : "text-foreground"}`}>{patient.fogRisk}%</div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/guardian/trends">
          <Card className="border-border/50 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Episodes</CardTitle>
              <TrendingUp className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{patient.episodesToday}</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guardian/trends">
          <Card className="border-border/50 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Recovery</CardTitle>
              <Clock className="h-4 w-4 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{patient.averageRecovery} sec</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/guardian/dashboard">
          <Card className="border-border/50 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Device</CardTitle>
              <Cpu className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Online</div>
              <p className="text-xs text-muted-foreground">Battery: {patient.battery}%</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentEvents.map((event, i) => (
                <div key={event.id} className="flex items-start gap-4 relative">
                  {i !== recentEvents.length - 1 && (
                    <div className="absolute top-6 left-2.5 w-0.5 h-full bg-border -z-10" />
                  )}
                  <div className={`rounded-full p-1 mt-0.5 ${
                    event.fogRisk > 80 ? "bg-destructive/20 text-destructive" : "bg-amber-500/20 text-amber-500"
                  }`}>
                    {event.fogRisk > 80 ? <XCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      {event.fogRisk > 80 ? "High Risk FoG Event" : "Possible FoG Event"}
                    </div>
                    <div className="text-muted-foreground text-xs">{event.timestamp}</div>
                    <div className="text-sm mt-1 bg-muted p-2 rounded-md">
                      Risk: {event.fogRisk}% • Duration: {event.duration}s • Interventions: {event.intervention}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-start gap-4">
                <div className="rounded-full p-1 mt-0.5 bg-green-500/20 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Normal Gait Monitored</div>
                  <div className="text-muted-foreground text-xs">Earlier today</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSimulatingEvent && (
              <div className="p-4 border border-destructive bg-destructive/10 rounded-lg flex items-start gap-4">
                <AlertTriangle className="text-destructive h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-destructive">WARNING: Possible FoG event detected</h4>
                  <p className="text-sm mt-1">Patient is currently experiencing an episode. Intervention (Vibration) has been activated.</p>
                  <p className="text-xs text-muted-foreground mt-2">Just now</p>
                </div>
              </div>
            )}
            
            <div className="p-4 border bg-muted/30 rounded-lg flex items-start gap-4">
              <CheckCircle2 className="text-muted-foreground h-5 w-5 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold">Routine monitoring active</h4>
                <p className="text-sm mt-1 text-muted-foreground">All systems nominal. No critical alerts from overnight monitoring.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
