"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function PatientEvents() {
  const { events, patients } = useStore()
  const patientEvents = events.filter(e => e.patientId === "P001")
  const patient = patients.find(p => p.id === "P001")

  if (!patient) return null

  // Calculate stats
  const total = patientEvents.length
  const avgDuration = total > 0 ? (patientEvents.reduce((acc, curr) => acc + curr.duration, 0) / total).toFixed(1) : "0.0"
  const longest = total > 0 ? Math.max(...patientEvents.map(e => e.duration)).toFixed(1) : "0.0"

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">FoG Events History</h1>
        <p className="text-muted-foreground mt-1">
          Review your recently detected Freezing of Gait episodes and interventions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Episodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgDuration} sec</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Longest Episode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{longest} sec</div>
          </CardContent>
        </Card>
      </div>

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
                  <th className="px-6 py-3">FoG Risk</th>
                  <th className="px-6 py-3">Intervention</th>
                  <th className="px-6 py-3 rounded-tr-lg">Recovery</th>
                </tr>
              </thead>
              <tbody>
                {patientEvents.map((event, i) => (
                  <tr key={event.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{event.timestamp}</td>
                    <td className="px-6 py-4">{event.duration} sec</td>
                    <td className="px-6 py-4">
                      <Badge variant={event.fogRisk > 80 ? "destructive" : "secondary"}>
                        {event.fogRisk}%
                      </Badge>
                    </td>
                    <td className="px-6 py-4">{event.intervention}</td>
                    <td className="px-6 py-4 text-green-600 font-medium">{event.recovery} sec</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
