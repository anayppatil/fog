"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { Zap, Headphones, Vibrate } from "lucide-react"

export default function DoctorInterventions() {
  const interventionData = [
    { name: "Vibration", recovery: 2.1, fill: "#3b82f6" },
    { name: "Audio", recovery: 1.4, fill: "#8b5cf6" },
    { name: "Both", recovery: 0.9, fill: "#10b981" },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intervention Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Evaluate the effectiveness of different cue strategies.
          </p>
        </div>
        <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-950/30 text-sm py-1">
          Illustrative Prototype Data
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Average Recovery Time by Cue Type</CardTitle>
            <CardDescription>Lower is better (seconds)</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interventionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" unit="s" />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: 'transparent' }} formatter={(val) => [`${val} sec`, "Recovery Time"]} />
                <Bar dataKey="recovery" radius={[0, 4, 4, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Vibrate className="h-5 w-5 text-blue-500" />
                Vibration Cue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2.1 sec</div>
              <p className="text-sm text-muted-foreground mt-1">Average recovery.</p>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">Discrete, haptic feedback applied to the ankle via coin motor.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-purple-500" />
                Audio Cue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1.4 sec</div>
              <p className="text-sm text-muted-foreground mt-1">Average recovery.</p>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">Rhythmic metronome beat played via connected smartphone or earpiece.</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-500/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-500" />
                Combined (Both)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">0.9 sec</div>
              <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 mt-1">Most effective strategy in demo tests.</p>
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">Synchronized haptic and auditory metronome to maximize sensory input.</p>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  )
}
