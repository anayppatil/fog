"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, AlertTriangle, RefreshCcw, WifiOff, BatteryWarning } from "lucide-react"
import { useState } from "react"

export default function DemoPage() {
  const { isSimulatingEvent, simulateFogEvent, resetSimulation, patients } = useStore()
  const p001 = patients.find(p => p.id === "P001")
  const [deviceConnected, setDeviceConnected] = useState(true)
  const [lowBattery, setLowBattery] = useState(false)

  const handleSimulateFoG = () => {
    simulateFogEvent()
  }

  const handleReset = () => {
    resetSimulation()
    setDeviceConnected(true)
    setLowBattery(false)
  }

  const toggleConnection = () => {
    setDeviceConnected(!deviceConnected)
    // Normally we'd dispatch to store, keeping it simple here for demo UI changes
  }

  const toggleBattery = () => {
    setLowBattery(!lowBattery)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Demo Control Panel</h1>
          <p className="text-muted-foreground mt-1">
            Simulate real-time events to demonstrate system reactivity.
          </p>
        </div>
        <Badge variant={isSimulatingEvent ? "destructive" : "outline"} className="px-4 py-1 text-sm">
          Status: {isSimulatingEvent ? "Simulating FoG Event..." : "Normal Monitoring"}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Simulate FoG Event
            </CardTitle>
            <CardDescription>
              Injects a mock Freezing of Gait pattern into the live sensor data and triggers interventions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleSimulateFoG} 
              disabled={isSimulatingEvent}
              className="w-full"
              variant={isSimulatingEvent ? "secondary" : "default"}
            >
              {isSimulatingEvent ? "Event in Progress..." : "Trigger FoG Event"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <WifiOff className="h-5 w-5" />
              Device Connection
            </CardTitle>
            <CardDescription>
              Simulate a wearable device losing Wi-Fi or Bluetooth connection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={toggleConnection} 
              variant={deviceConnected ? "outline" : "destructive"} 
              className="w-full"
            >
              {deviceConnected ? "Simulate Disconnect" : "Reconnect Device"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BatteryWarning className="h-5 w-5" />
              Battery Warning
            </CardTitle>
            <CardDescription>
              Simulate a low battery event (drops below 20%) to trigger a notification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={toggleBattery} 
              variant={lowBattery ? "destructive" : "outline"} 
              className="w-full"
            >
              {lowBattery ? "Recharge (82%)" : "Drop Battery to 15%"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-100 dark:bg-card border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCcw className="h-5 w-5" />
            Reset Environment
          </CardTitle>
          <CardDescription>
            Restore all mocked data, clear alerts, and reset the simulation state.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleReset} variant="outline" className="w-full md:w-auto">
            Reset to Initial State
          </Button>
        </CardContent>
      </Card>

    </div>
  )
}
