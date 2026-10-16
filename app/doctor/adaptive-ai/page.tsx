"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Cpu, Activity, Zap, BarChart2, Repeat, BrainCircuit } from "lucide-react"

export default function DoctorAdaptiveAI() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Adaptive AI Workflow</h1>
        <p className="text-muted-foreground mt-1">
          Conceptual personalization workflow for the intervention engine.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-500" />
              Continuous Learning Loop
            </CardTitle>
            <CardDescription>How the system adapts to individual patient responses over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center py-4 relative">
              <div className="absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-indigo-100 dark:bg-indigo-900/50 -z-10 rounded-full" />
              
              <div className="bg-background border-2 border-red-500 rounded-xl p-4 w-full max-w-sm mb-6 shadow-sm">
                <div className="flex items-center gap-3 font-semibold text-red-600 dark:text-red-400">
                  <Activity className="h-5 w-5" /> FoG Episode Detected
                </div>
                <div className="text-sm text-muted-foreground mt-2">Triggered by predictive model (Risk &gt; 80%)</div>
              </div>

              <ArrowDown className="h-6 w-6 text-indigo-300 mb-6" />

              <div className="bg-background border-2 border-indigo-500 rounded-xl p-4 w-full max-w-sm mb-6 shadow-sm">
                <div className="flex items-center gap-3 font-semibold text-indigo-600 dark:text-indigo-400">
                  <Cpu className="h-5 w-5" /> Adaptive Intervention
                </div>
                <div className="text-sm text-muted-foreground mt-2">Selects optimal cue (e.g. Vibration) based on patient history.</div>
              </div>

              <ArrowDown className="h-6 w-6 text-indigo-300 mb-6" />

              <div className="bg-background border-2 border-amber-500 rounded-xl p-4 w-full max-w-sm mb-6 shadow-sm">
                <div className="flex items-center gap-3 font-semibold text-amber-600 dark:text-amber-400">
                  <Zap className="h-5 w-5" /> Patient Response
                </div>
                <div className="text-sm text-muted-foreground mt-2">Sensors monitor gait parameters immediately following the cue.</div>
              </div>

              <ArrowDown className="h-6 w-6 text-indigo-300 mb-6" />

              <div className="bg-background border-2 border-blue-500 rounded-xl p-4 w-full max-w-sm mb-6 shadow-sm">
                <div className="flex items-center gap-3 font-semibold text-blue-600 dark:text-blue-400">
                  <BarChart2 className="h-5 w-5" /> Recovery Analysis
                </div>
                <div className="text-sm text-muted-foreground mt-2">Calculates time taken to resume normal cadence.</div>
              </div>

              <ArrowDown className="h-6 w-6 text-indigo-300 mb-6" />

              <div className="bg-background border-2 border-emerald-500 rounded-xl p-4 w-full max-w-sm shadow-sm">
                <div className="flex items-center gap-3 font-semibold text-emerald-600 dark:text-emerald-400">
                  <Repeat className="h-5 w-5" /> Personalization Engine
                </div>
                <div className="text-sm text-muted-foreground mt-2">Updates internal weights. Future strategy is adjusted.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Decision Engine Inputs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">FoG probability</Badge>
                <Badge variant="secondary">Current cadence</Badge>
                <Badge variant="secondary">Stride variability</Badge>
                <Badge variant="secondary">Previous FoG events</Badge>
                <Badge variant="secondary">Previous cue type</Badge>
                <Badge variant="secondary">Recovery time</Badge>
                <Badge variant="outline" className="border-primary text-primary bg-primary/5">Intervention effectiveness score</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Patient Learning Loop (P001)</CardTitle>
              <CardDescription>Illustrating how the system optimizes cues.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/20">
                  <div className="text-sm font-semibold text-muted-foreground mb-1">Episode 1</div>
                  <div className="flex justify-between items-center">
                    <span>Vibration Cue selected</span>
                    <span className="font-mono text-amber-500 font-semibold">Rec: 2.1s</span>
                  </div>
                </div>
                <div className="p-4 border rounded-lg bg-muted/20">
                  <div className="text-sm font-semibold text-muted-foreground mb-1">Episode 2</div>
                  <div className="flex justify-between items-center">
                    <span>Audio Cue tested</span>
                    <span className="font-mono text-blue-500 font-semibold">Rec: 1.4s</span>
                  </div>
                </div>
                <div className="p-4 border border-emerald-500/50 bg-emerald-500/10 rounded-lg">
                  <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Episode 3 (Optimized)</div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Combined (Vibration + Audio)</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Rec: 0.9s</span>
                  </div>
                  <p className="text-xs text-emerald-600/80 mt-2">System has updated future strategy for this patient to favor Combined cues for high-severity events.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
