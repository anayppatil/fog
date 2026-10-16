"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, Database, Sliders, Layers } from "lucide-react"

export default function DoctorModel() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FoG Prediction Model</h1>
          <p className="text-muted-foreground mt-1">
            Machine learning architecture and evaluation metrics.
          </p>
        </div>
        <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50 dark:bg-amber-950/30 text-sm py-1">
          MODEL STATUS: Prototype / Under Evaluation
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-500" />
                Training Dataset
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Dataset Name</span>
                <span className="font-medium">FoG-STAR</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Subjects</span>
                <span className="font-medium">22 Parkinson's patients</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Sensor Placement</span>
                <span className="font-medium">Left + Right Ankle (IMUs)</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Sensor Modalities</span>
                <span className="font-medium">Accelerometer + Gyroscope</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Labels</span>
                <span className="font-medium">FoG / Non-FoG</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5 text-emerald-500" />
                Input Processing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Sampling Rate</span>
                <span className="font-medium">60 Hz</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Sliding Window</span>
                <span className="font-medium">2 seconds</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Samples per Window</span>
                <span className="font-medium">120</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Channels</span>
                <span className="font-medium">12 (6 per ankle)</span>
              </div>
              <div className="flex justify-between bg-muted/50 p-3 rounded-lg mt-2">
                <span className="font-semibold">Final Input Shape</span>
                <span className="font-mono bg-background px-2 py-0.5 rounded border">120 × 12</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-indigo-500" />
                Network Architecture (1D CNN)
              </CardTitle>
              <CardDescription>Forward pass pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-2 py-4">
                <div className="px-4 py-2 border-2 border-slate-200 dark:border-border bg-slate-50 dark:bg-card rounded-lg text-sm font-medium font-mono w-full text-center">
                  Input (120 × 12)
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-blue-500/20 bg-blue-500/10 rounded-lg text-sm font-medium w-full text-center">
                  1D Convolution
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-indigo-500/20 bg-indigo-500/10 rounded-lg text-sm font-medium w-full text-center">
                  Batch Normalization
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-blue-500/20 bg-blue-500/10 rounded-lg text-sm font-medium w-full text-center">
                  1D Convolution
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-emerald-500/20 bg-emerald-500/10 rounded-lg text-sm font-medium w-full text-center">
                  Global Average Pooling
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-purple-500/20 bg-purple-500/10 rounded-lg text-sm font-medium w-full text-center">
                  Dense (64)
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-slate-500/20 bg-slate-500/10 rounded-lg text-sm font-medium w-full text-center">
                  Dropout
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-purple-500/20 bg-purple-500/10 rounded-lg text-sm font-medium w-full text-center">
                  Dense (32)
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-rose-500/20 bg-rose-500/10 rounded-lg text-sm font-medium w-full text-center">
                  Sigmoid Activation
                </div>
                <div className="text-muted-foreground">↓</div>
                <div className="px-4 py-2 border-2 border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-400 rounded-lg font-bold w-full text-center">
                  FoG Probability Output
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-purple-500" />
            Performance Metrics
          </CardTitle>
          <CardDescription>
            Clinical validation is currently pending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {["Accuracy", "Precision", "Recall", "Specificity", "F1 Score", "AUROC"].map((metric) => (
              <div key={metric} className="bg-muted/30 p-4 rounded-xl border text-center">
                <div className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-2">{metric}</div>
                <div className="text-lg font-medium italic text-muted-foreground">Pending</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
