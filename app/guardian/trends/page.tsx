"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts"
import { Calendar, TrendingUp } from "lucide-react"

export default function GuardianTrends() {
  const episodesData = [
    { day: "Mon", episodes: 3 },
    { day: "Tue", episodes: 4 },
    { day: "Wed", episodes: 2 },
    { day: "Thu", episodes: 5 },
    { day: "Fri", episodes: 4 },
    { day: "Sat", episodes: 3 },
    { day: "Sun", episodes: 4 },
  ]

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
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Trends & Reports</h1>
        <p className="text-muted-foreground mt-1">
          Historical overview of Alex's Freezing of Gait patterns.
        </p>
      </div>

      <div className="flex gap-2 pb-2">
        <button onClick={() => alert("Timeframe selection is locked to 'Last 7 Days' in this demo.")} className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">Last 7 Days</button>
        <button onClick={() => alert("Timeframe selection is locked to 'Last 7 Days' in this demo.")} className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 rounded-md">Last 30 Days</button>
        <button onClick={() => alert("Timeframe selection is locked to 'Last 7 Days' in this demo.")} className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground hover:bg-muted/80 rounded-md">Custom Range</button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Daily FoG Episodes
            </CardTitle>
            <CardDescription>Number of events detected per day</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={episodesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="episodes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Average Recovery Time
            </CardTitle>
            <CardDescription>Time to resume normal gait (seconds)</CardDescription>
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
      </div>
    </div>
  )
}
