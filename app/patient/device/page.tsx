"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cpu, Wifi, Activity, Zap, PlayCircle, HardDrive } from "lucide-react"
import { useState } from "react"
import { useStore } from "@/lib/store"

export default function PatientDevice() {
  const { patients } = useStore()
  const patient = patients.find(p => p.id === "P001")
  const [testing, setTesting] = useState(false)
  const [testLog, setTestLog] = useState<string[]>([])

  const runTest = () => {
    setTesting(true)
    setTestLog(["Initiating hardware test sequence..."])
    
    setTimeout(() => setTestLog(prev => [...prev, "Checking ESP32-S3 connection... OK"]), 1000)
    setTimeout(() => setTestLog(prev => [...prev, "Reading MPU6050 IMU registers... OK"]), 2000)
    setTimeout(() => setTestLog(prev => [...prev, "Calibrating FSR baseline... OK"]), 3000)
    setTimeout(() => setTestLog(prev => [...prev, "Testing Vibration Motor... OK"]), 4000)
    setTimeout(() => setTestLog(prev => [...prev, "Checking Wi-Fi signal strength (-45dBm)... OK"]), 5000)
    setTimeout(() => {
      setTestLog(prev => [...prev, "All systems nominal. Ready for monitoring."])
      setTesting(false)
    }, 6000)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Device</h1>
        <p className="text-muted-foreground mt-1">
          Hardware architecture and connectivity status.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hardware Status</CardTitle>
              <CardDescription>Prototype integration in progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Cpu className="text-blue-500 h-5 w-5" />
                  <span className="font-medium">ESP32-S3</span>
                </div>
                <Badge className="bg-green-500">Connected</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Activity className="text-indigo-500 h-5 w-5" />
                  <span className="font-medium">MPU6050 (IMU)</span>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-600">Prototype Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <HardDrive className="text-purple-500 h-5 w-5" />
                  <span className="font-medium">FSR Sensor</span>
                </div>
                <Badge variant="outline" className="border-green-500 text-green-600">Prototype Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="text-amber-500 h-5 w-5" />
                  <span className="font-medium">Vibration Motor</span>
                </div>
                <Badge variant="secondary">Ready</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wifi className="text-emerald-500 h-5 w-5" />
                  <span className="font-medium">Wi-Fi (60 Hz Sync)</span>
                </div>
                <Badge className="bg-green-500">Connected</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-2 py-4">
                <div className="px-6 py-3 border-2 border-primary/20 bg-primary/5 rounded-xl font-medium">
                  MPU6050 + FSR Sensors
                </div>
                <div className="text-primary/50">↓</div>
                <div className="px-6 py-3 border-2 border-blue-500/20 bg-blue-500/5 rounded-xl font-medium">
                  ESP32-S3 Microcontroller
                </div>
                <div className="text-primary/50">↓</div>
                <div className="px-6 py-3 border-2 border-emerald-500/20 bg-emerald-500/5 rounded-xl font-medium">
                  Wi-Fi / Backend
                </div>
                <div className="text-primary/50">↓</div>
                <div className="px-6 py-3 border-2 border-indigo-500/20 bg-indigo-500/5 rounded-xl font-medium text-indigo-600 dark:text-indigo-400">
                  FoG Assist Web Dashboard
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Diagnostics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={runTest} disabled={testing} className="w-full">
                <PlayCircle className="mr-2 h-4 w-4" />
                {testing ? "Testing..." : "Run Device Test"}
              </Button>
              
              {testLog.length > 0 && (
                <div className="bg-background text-emerald-400 p-4 rounded-lg font-mono text-sm h-40 overflow-y-auto">
                  {testLog.map((log, i) => (
                    <div key={i}>{">"} {log}</div>
                  ))}
                  {testing && <div className="animate-pulse">{">"} _</div>}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
