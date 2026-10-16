"use client"

import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SensorChart } from "@/components/charts/SensorChart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Activity, Zap } from "lucide-react"

export default function PatientMonitoring() {
  const { patients, isSimulatingEvent, simulateFogEvent } = useStore()
  const patient = patients.find(p => p.id === "P001")
  
  if (!patient) return null

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Monitoring Console</h1>
          <p className="text-muted-foreground mt-1">
            Real-time multi-axis sensor data from {patient.deviceId}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={patient.isOnline ? "default" : "destructive"} className="px-3 py-1 bg-green-500 hover:bg-green-600">
            ● {patient.isOnline ? "CONNECTED" : "DISCONNECTED"}
          </Badge>
          <div className="text-xs text-muted-foreground text-right">
            <div>Last packet: {patient.lastUpdate}</div>
            <div>Sampling rate: 60 Hz</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Acceleration</CardTitle>
              <CardDescription>3-axis accelerometer data (m/s²)</CardDescription>
            </CardHeader>
            <CardContent>
              <SensorChart dataKey="ax" color="#ef4444" title="X-Axis" />
              <div className="h-4"></div>
              <SensorChart dataKey="ay" color="#3b82f6" title="Y-Axis" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Gyroscope</CardTitle>
              <CardDescription>Angular velocity (rad/s)</CardDescription>
            </CardHeader>
            <CardContent>
              <SensorChart dataKey="gx" color="#10b981" title="X-Axis" domain={[-2, 2]} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">FSR (Force Sensitive Resistor)</CardTitle>
              <CardDescription>Foot-pressure signal distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <SensorChart dataKey="fsr" color="#8b5cf6" title="Pressure" domain={[0, 150]} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className={isSimulatingEvent ? "border-destructive border-2" : ""}>
            <CardHeader>
              <CardTitle>FoG Prediction</CardTitle>
              <CardDescription>Real-time AI model inference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-card/50 shadow-[0_0_30px_rgba(0,0,0,0.2)]">
                  <svg className="absolute inset-0 h-full w-full -rotate-90 transform overflow-visible" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="12"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke={isSimulatingEvent ? "#ef4444" : "#0ea5e9"}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="440"
                      strokeDashoffset={440 - (440 * patient.fogRisk) / 100}
                      className="transition-all duration-700 ease-out"
                      style={{ filter: isSimulatingEvent ? "drop-shadow(0 0 8px rgba(239,68,68,0.6))" : "drop-shadow(0 0 8px rgba(14,165,233,0.6))" }}
                    />
                  </svg>
                  <div className="text-center z-10">
                    <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">{patient.fogRisk}%</div>
                    <div className={cn(
                      "text-sm font-semibold uppercase tracking-widest mt-2",
                      isSimulatingEvent ? "text-red-400 animate-pulse" : "text-sky-400"
                    )}>
                      {patient.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-center text-muted-foreground">
                  {isSimulatingEvent 
                    ? "The model has detected a high probability of an impending FoG episode based on the sensor patterns." 
                    : "The model estimates a low current risk based on the available sensor pattern."}
                </p>
              </div>

              {isSimulatingEvent && (
                <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-lg flex items-start gap-3">
                  <Zap className="h-5 w-5 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold block">Intervention Activated</span>
                    Vibration cue triggered to assist recovery.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-50 dark:bg-card border-dashed">
            <CardHeader>
              <CardTitle className="text-sm">Demo Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={simulateFogEvent} 
                disabled={isSimulatingEvent}
                className="w-full"
                variant={isSimulatingEvent ? "secondary" : "default"}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                {isSimulatingEvent ? "Event Active..." : "Simulate FoG Event"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
