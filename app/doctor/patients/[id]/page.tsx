"use client"

import { use } from "react"
import { useStore } from "@/lib/store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SensorChart } from "@/components/charts/SensorChart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Activity, Clock, AlertTriangle, Zap, CheckCircle2, XCircle } from "lucide-react"

export default function DoctorPatientDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { patients, isSimulatingEvent, events } = useStore()
  
  // Use the requested patient ID or default to P001 if not found for demo purposes
  const patientId = resolvedParams.id.toUpperCase()
  const patient = patients.find(p => p.id === patientId) || patients[0]
  const patientEvents = events.filter(e => e.patientId === patient.id)
  
  const isHighRisk = patient.status === "HIGH RISK" || (patient.id === "P001" && isSimulatingEvent)
  const isWarning = patient.status === "WARNING"

  const recoveryData = [
    { day: "Mon", avg: 2.4 },
    { day: "Tue", avg: 2.1 },
    { day: "Wed", avg: 2.5 },
    { day: "Thu", avg: 1.9 },
    { day: "Fri", avg: 2.2 },
    { day: "Sat", avg: 1.8 },
    { day: "Sun", avg: 2.1 },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient: {patient.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="outline">ID: {patient.id}</Badge>
            <Badge variant="outline">Device: {patient.deviceId}</Badge>
          </div>
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
            {isHighRisk && (
              <span className="animate-ping absolute right-6 h-3 w-3 rounded-full bg-white opacity-75"></span>
            )}
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full justify-start min-w-max">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sensors">Live Sensors</TabsTrigger>
            <TabsTrigger value="events">FoG Events</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-6 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className={isHighRisk ? "border-destructive border-2" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">FoG Risk</CardTitle>
                <Activity className={`h-4 w-4 ${isHighRisk ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isHighRisk ? "text-destructive" : ""}`}>{patient.fogRisk}%</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Episodes Today</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patient.episodesToday}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Recovery</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patient.averageRecovery} sec</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Device</CardTitle>
                <Activity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patient.isOnline ? "Online" : "Offline"}</div>
                <p className="text-xs text-muted-foreground">Battery: {patient.battery}%</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-6">
                {patientEvents.slice(0, 3).map((event, i) => (
                  <div key={event.id} className="flex items-start gap-4">
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sensors" className="space-y-6 mt-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Acceleration</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <SensorChart dataKey="gx" color="#10b981" title="X-Axis" domain={[-2, 2]} />
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className={isHighRisk ? "border-destructive border-2 shadow-sm" : ""}>
                <CardHeader>
                  <CardTitle>Real-time Prediction</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
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
                        stroke={isHighRisk ? "#ef4444" : "#0ea5e9"}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray="440"
                        strokeDashoffset={440 - (440 * patient.fogRisk) / 100}
                        className="transition-all duration-700 ease-out"
                        style={{ filter: isHighRisk ? "drop-shadow(0 0 8px rgba(239,68,68,0.6))" : "drop-shadow(0 0 8px rgba(14,165,233,0.6))" }}
                      />
                    </svg>
                    <div className="text-center z-10">
                      <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400">{patient.fogRisk}%</div>
                    </div>
                  </div>
                  {isSimulatingEvent && (
                    <div className="mt-6 bg-destructive/10 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 w-full">
                      <Zap className="h-5 w-5 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-bold block">Intervention Activated</span>
                        Vibration cue triggered.
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                    <tr>
                      <th className="px-6 py-3 rounded-tl-lg">Time</th>
                      <th className="px-6 py-3">Duration</th>
                      <th className="px-6 py-3">Risk</th>
                      <th className="px-6 py-3">Intervention</th>
                      <th className="px-6 py-3 rounded-tr-lg">Recovery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientEvents.map((event) => (
                      <tr key={event.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="px-6 py-4">{event.timestamp}</td>
                        <td className="px-6 py-4">{event.duration} sec</td>
                        <td className="px-6 py-4">
                          <Badge variant={event.fogRisk > 80 ? "destructive" : "secondary"}>{event.fogRisk}%</Badge>
                        </td>
                        <td className="px-6 py-4">{event.intervention}</td>
                        <td className="px-6 py-4 text-green-600">{event.recovery} sec</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {patientEvents.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">No events recorded.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Average Recovery Time</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recoveryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 4]} />
                  <RechartsTooltip />
                  <Line type="monotone" dataKey="avg" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
