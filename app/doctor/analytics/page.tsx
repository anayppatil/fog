"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function DoctorAnalytics() {
  const episodesData = [
    { day: "Mon", episodes: 3 },
    { day: "Tue", episodes: 4 },
    { day: "Wed", episodes: 2 },
    { day: "Thu", episodes: 5 },
    { day: "Fri", episodes: 4 },
    { day: "Sat", episodes: 3 },
    { day: "Sun", episodes: 4 },
  ]

  const riskDistribution = [
    { name: "Low Risk", value: 65, color: "#22c55e" },
    { name: "Medium Risk", value: 20, color: "#f59e0b" },
    { name: "High Risk", value: 15, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">FoG Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Research-oriented analytics and aggregate data for all monitored patients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>FoG Episodes Over Time</CardTitle>
            <CardDescription>Aggregate count across all active devices (Demo Data)</CardDescription>
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
            <CardTitle>FoG Risk Distribution</CardTitle>
            <CardDescription>Time spent in different risk categories (Demo Data)</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="flex justify-center gap-6 pb-6">
            {riskDistribution.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        </Card>
      </div>

    </div>
  )
}
