"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Mail, Phone, MapPin, Building2, Stethoscope, HeartPulse, Activity, BellRing, Settings, ShieldAlert } from "lucide-react"

export default function ProfilePage() {
  const { role, patients } = useStore()
  
  // Use P001 as the primary patient for the demo
  const demoPatient = patients.find(p => p.id === "P001")

  if (!role) return null

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal details and account settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column: Basic Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="border-border/50 bg-card/50 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-sky-500/20 to-teal-500/20 border-b border-border/50" />
            <div className="px-6 pb-6 text-center -mt-12">
              <div className="inline-block rounded-full p-2 bg-card border border-border mb-4 shadow-lg">
                <UserCircle className="h-16 w-16 text-sky-400" />
              </div>
              <h2 className="text-xl font-bold capitalize">Demo {role}</h2>
              <p className="text-sm text-muted-foreground mb-4">{role}@demo.com</p>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Account Active
              </div>
            </div>
            <div className="px-6 py-4 border-t border-border/50 space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-muted-foreground" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {role}@demo.com
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                San Francisco, CA
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Role Specific Details */}
        <div className="md:col-span-2 space-y-6">
          
          {role === "doctor" && (
            <>
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-sky-400" />
                    Clinical Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Provider ID</p>
                      <p className="font-medium">DR-4921-X</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Department</p>
                      <p className="font-medium">Neurology</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Specialization</p>
                      <p className="font-medium">Movement Disorders (Parkinson's)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Affiliation</p>
                      <p className="font-medium flex items-center gap-1.5">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        UCSF Medical Center
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-indigo-400" />
                    Research Studies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                    <h4 className="font-semibold text-card-foreground">Adaptive AI for Freezing of Gait</h4>
                    <p className="text-sm text-muted-foreground mt-1">Lead Investigator • Phase 2 Trial</p>
                    <div className="mt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-emerald-400" />
                        24 Active Patients
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-amber-400" />
                        Model Accuracy: 94.2%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {role === "patient" && demoPatient && (
            <>
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HeartPulse className="h-5 w-5 text-rose-400" />
                    Patient Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Patient ID</p>
                      <p className="font-medium">{demoPatient.id}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Diagnosis</p>
                      <p className="font-medium">Parkinson's Disease (H&Y Stage 3)</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Primary Physician</p>
                      <p className="font-medium">Dr. Sarah Jenkins</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Emergency Contact (Guardian)</p>
                      <p className="font-medium text-sky-400">Maria (Wife) - linked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-400" />
                    Hardware Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg bg-muted/50 border border-border/50 flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-card-foreground">Wearable IMU Sensor</h4>
                      <p className="text-sm text-muted-foreground mt-1">Device ID: {demoPatient.deviceId}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 font-bold mb-1 flex items-center gap-2 justify-end">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Online
                      </div>
                      <p className="text-xs text-muted-foreground">Last Synced: Just now</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {role === "guardian" && (
            <>
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-amber-400" />
                    Guardian Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Guardian ID</p>
                      <p className="font-medium">G-8812</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Relationship</p>
                      <p className="font-medium">Primary Caregiver</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Linked Patient</p>
                      <p className="font-medium text-sky-400 cursor-pointer hover:underline">Alex ({demoPatient?.id})</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Emergency Protocols</p>
                      <p className="font-medium text-amber-400">Active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellRing className="h-5 w-5 text-sky-400" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                      <div>
                        <h4 className="text-sm font-medium text-card-foreground">High Risk Alerts</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Immediate push notification when FoG risk exceeds 80%</p>
                      </div>
                      <div className="h-5 w-9 bg-sky-500 rounded-full relative cursor-pointer opacity-100">
                        <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30">
                      <div>
                        <h4 className="text-sm font-medium text-card-foreground">Daily Summary Report</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Email summary of daily episodes and recovery times</p>
                      </div>
                      <div className="h-5 w-9 bg-sky-500 rounded-full relative cursor-pointer opacity-100">
                        <div className="absolute right-1 top-1 h-3 w-3 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
