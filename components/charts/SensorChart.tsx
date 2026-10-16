"use client"

import { useStore } from "@/lib/store"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect } from "react"

interface SensorChartProps {
  dataKey: string;
  color: string;
  title: string;
  domain?: [number, number];
}

export function SensorChart({ dataKey, color, title, domain = [-5, 5] }: SensorChartProps) {
  const { liveSensorData, updateSensorData } = useStore()

  // Simulate incoming data stream
  useEffect(() => {
    const interval = setInterval(() => {
      updateSensorData()
    }, 100) // 10Hz update for UI smoothness (actual data says 60Hz, but 10Hz is better for DOM)
    
    return () => clearInterval(interval)
  }, [updateSensorData])

  return (
    <div className="h-64 w-full">
      <div className="mb-4 text-sm font-medium text-muted-foreground">{title}</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={liveSensorData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="time" hide />
          <YAxis domain={domain} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip 
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
            labelFormatter={() => ""}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2} 
            dot={false} 
            isAnimationActive={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
