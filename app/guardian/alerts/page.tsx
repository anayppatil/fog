"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

export default function GuardianAlerts() {
  const { alerts, acknowledgeAlert } = useStore()
  const guardianAlerts = alerts.filter(a => a.patientId === "P001") // demo filtering

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alert Center</h1>
        <p className="text-muted-foreground mt-1">
          Review and acknowledge system alerts and notifications.
        </p>
      </div>

      <div className="space-y-4">
        {guardianAlerts.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold">All Clear</h3>
              <p className="text-muted-foreground mt-1">No active alerts for your patients.</p>
            </CardContent>
          </Card>
        ) : (
          guardianAlerts.map(alert => (
            <Card key={alert.id} className={!alert.acknowledged && alert.type === "WARNING" ? "border-amber-500 bg-amber-500/5 dark:bg-amber-500/10" : ""}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-full mt-1 shrink-0 ${
                      alert.type === "HIGH" || alert.fogRisk && alert.fogRisk > 80 ? "bg-destructive/10 text-destructive" :
                      alert.type === "WARNING" ? "bg-amber-500/10 text-amber-500" :
                      "bg-blue-500/10 text-blue-500"
                    }`}>
                      {alert.type === "HIGH" || alert.fogRisk && alert.fogRisk > 80 ? <XCircle className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        {alert.message}
                        {!alert.acknowledged && (
                          <span className="bg-destructive text-destructive-foreground text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
                        )}
                      </h3>
                      
                      <div className="text-sm text-muted-foreground mt-1 mb-3">
                        Patient: Alex Johnson (P001) • Time: {alert.timestamp}
                      </div>

                      {alert.fogRisk && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-background/50 p-3 rounded-lg border">
                          <div>
                            <div className="text-muted-foreground">FoG Risk</div>
                            <div className="font-semibold text-destructive">{alert.fogRisk}%</div>
                          </div>
                          {alert.duration && (
                            <div>
                              <div className="text-muted-foreground">Duration</div>
                              <div className="font-semibold">{alert.duration}s</div>
                            </div>
                          )}
                          {alert.intervention && (
                            <div>
                              <div className="text-muted-foreground">Intervention</div>
                              <div className="font-semibold">{alert.intervention}</div>
                            </div>
                          )}
                          {alert.recovery && (
                            <div>
                              <div className="text-muted-foreground">Recovery</div>
                              <div className="font-semibold text-green-600 dark:text-green-400">{alert.recovery}s</div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2 shrink-0 self-end md:self-auto w-full md:w-auto">
                    {!alert.acknowledged && (
                      <Button onClick={() => acknowledgeAlert(alert.id)} className="w-full">
                        Acknowledge
                      </Button>
                    )}
                    <Button variant="outline" className="w-full" onClick={() => window.alert("Detailed event view is restricted in this demo.")}>
                      View Event
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
