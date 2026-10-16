"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Battery, CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react"
import { SensorChart } from "@/components/charts/SensorChart"
import Link from "next/link"

export default function PatientDashboard() {
  const patients = useStore(state => state.patients)
  const isSimulatingEvent = useStore(state => state.isSimulatingEvent)
  
  // Using P001 as the logged in patient for demo
  const patient = patients.find(p => p.id === "P001")
  
  if (!patient) return null

  const isHighRisk = patient.status === "HIGH RISK" || isSimulatingEvent
  const isWarning = patient.status === "WARNING"

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Good morning, {patient.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground mt-1">
          Here's your monitoring overview for today.
        </p>
      </div>

      {/* Top Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/patient/monitoring">
          <Card className={`hover:border-sky-500/50 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] transition-all cursor-pointer ${isHighRisk ? "border-destructive border-2" : "border-border/50"}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current FoG Risk</CardTitle>
              <Activity className={`h-4 w-4 ${isHighRisk ? "text-destructive animate-pulse" : "text-sky-400"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isHighRisk ? "text-destructive" : "text-foreground"}`}>{patient.fogRisk}%</div>
              <p className="text-xs text-muted-foreground">
                {isHighRisk ? "High Risk" : isWarning ? "Elevated Risk" : "Low Risk"}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/patient/device">
          <Card className="border-border/50 hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Device Status</CardTitle>
              <Battery className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">Connected</div>
              <p className="text-xs text-muted-foreground">
                Battery {patient.battery}%
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/patient/events">
          <Card className="border-border/50 hover:border-amber-500/50 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Episodes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{patient.episodesToday}</div>
              <p className="text-xs text-muted-foreground">
                Recorded FoG events
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/patient/events">
          <Card className="border-border/50 hover:border-indigo-500/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Recovery</CardTitle>
              <Clock className="h-4 w-4 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{patient.averageRecovery} sec</div>
              <p className="text-xs text-muted-foreground">
                Time to resume walking
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Main Status Section */}
      <Card className={`overflow-hidden border-2 ${
        isHighRisk ? 'border-destructive' : isWarning ? 'border-amber-500' : 'border-green-500'
      }`}>
        <div className={`p-6 text-foreground ${
          isHighRisk ? 'bg-destructive' : isWarning ? 'bg-amber-500' : 'bg-green-500'
        }`}>
          <div className="flex items-center gap-3">
            {isHighRisk ? (
              <XCircle className="h-8 w-8" />
            ) : isWarning ? (
              <AlertTriangle className="h-8 w-8" />
            ) : (
              <CheckCircle2 className="h-8 w-8" />
            )}
            <div>
              <h2 className="text-2xl font-bold">{patient.status}</h2>
              <p className="opacity-90 mt-1">
                {isHighRisk 
                  ? "High risk of Freezing of Gait detected. Intervention activated."
                  : isWarning 
                  ? "Elevated variability detected. Proceed with caution."
                  : "Your current gait pattern is within the normal monitoring range."}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Mini Live Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Live Sensor Activity (Preview)</CardTitle>
          <CardDescription>Real-time accelerometer stream from {patient.deviceId}</CardDescription>
        </CardHeader>
        <CardContent>
          <SensorChart dataKey="ax" color={isHighRisk ? "#ef4444" : "#3b82f6"} title="Accelerometer X (m/s²)" />
        </CardContent>
      </Card>

    </div>
  )
}
