"use client"

import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Activity, List, Clock } from "lucide-react"
import Link from "next/link"

export default function DoctorDashboard() {
  const { patients, isSimulatingEvent } = useStore()
  
  const totalEpisodes = patients.reduce((acc, p) => acc + p.episodesToday, 0)
  const avgRecovery = (patients.reduce((acc, p) => acc + p.averageRecovery, 0) / patients.length).toFixed(1)

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clinical Research Overview</h1>
        <p className="text-muted-foreground mt-1">
          Prototype monitoring and analytics — not a clinical diagnostic system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="#patients">
          <Card className="relative overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Patients Monitored</CardTitle>
              <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                <Users className="h-4 w-4 text-indigo-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{patients.length}</div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="#patients">
          <Card className="relative overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Devices</CardTitle>
              <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{patients.filter(p => p.isOnline).length}</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/doctor/analytics">
          <Card className="relative overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">FoG Episodes Today</CardTitle>
              <div className="p-2 bg-rose-500/20 rounded-lg group-hover:bg-rose-500/30 transition-colors">
                <List className="h-4 w-4 text-rose-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{totalEpisodes}</div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/doctor/analytics">
          <Card className="relative overflow-hidden group hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Recovery</CardTitle>
              <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                <Clock className="h-4 w-4 text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{avgRecovery} sec</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Patient ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">FoG Risk</th>
                  <th className="px-6 py-3">Episodes Today</th>
                  <th className="px-6 py-3">Device</th>
                  <th className="px-6 py-3 rounded-tr-lg">Last Update</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => {
                  const isHighRisk = p.status === "HIGH RISK" || (p.id === "P001" && isSimulatingEvent)
                  const isWarning = p.status === "WARNING"
                  
                  return (
                    <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => window.location.href=`/doctor/patients/${p.id}`}>
                      <td className="px-6 py-4 font-medium">{p.id}</td>
                      <td className="px-6 py-4">{p.name}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={cn("px-2.5 py-0.5 font-medium border-0", isHighRisk ? "bg-rose-500/20 text-rose-400" : isWarning ? "bg-amber-500/20 text-amber-400" : "bg-emerald-500/20 text-emerald-400")}>
                          {isHighRisk ? "HIGH RISK" : p.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={isHighRisk ? "text-rose-400 font-bold drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "text-muted-foreground"}>
                            {p.fogRisk}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{p.episodesToday}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <span className={`h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] ${p.isOnline ? "bg-emerald-400 shadow-emerald-400/50" : "bg-rose-500 shadow-rose-500/50"}`}></span>
                          {p.isOnline ? "Online" : "Offline"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{p.lastUpdate}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
