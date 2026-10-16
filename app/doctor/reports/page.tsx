"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Printer, FileDown } from "lucide-react"
import { useState } from "react"

export default function DoctorReports() {
  const [reportType, setReportType] = useState("summary")
  const [dateRange, setDateRange] = useState("7days")
  const [generating, setGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setShowPreview(true)
    }, 1500)
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report Generation</h1>
        <p className="text-muted-foreground mt-1">
          Export clinical monitoring data and analytical summaries.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Report Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <select 
                className="w-full h-10 px-3 py-2 rounded-md border bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="summary">Patient Summary Report</option>
                <option value="events">FoG Event History Report</option>
                <option value="sensors">Raw Sensor Data Export</option>
                <option value="interventions">Intervention Efficacy Report</option>
                <option value="model">Model Evaluation Report</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <select 
                className="w-full h-10 px-3 py-2 rounded-md border bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Target Patient</label>
              <select className="w-full h-10 px-3 py-2 rounded-md border bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="all">All Patients (Aggregate)</option>
                <option value="p001">P001 - Alex Johnson</option>
                <option value="p002">P002 - Sarah Miller</option>
                <option value="p003">P003 - John Davis</option>
              </select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={generating} className="w-full">
              {generating ? "Compiling Data..." : "Generate Report Preview"}
            </Button>
          </CardFooter>
        </Card>

        <div className="md:col-span-2">
          {showPreview ? (
            <Card className="h-full border-2 border-primary/20 shadow-md">
              <CardHeader className="border-b bg-muted/20 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Report Preview
                  </CardTitle>
                  <CardDescription className="mt-1">FoG Assist Automated Reporting System</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" title="Print" onClick={() => alert("Printing is disabled in this prototype demo.")}><Printer className="h-4 w-4" /></Button>
                  <Button variant="outline" size="sm" title="Download PDF" onClick={() => alert("PDF Download is disabled in this prototype demo.")}><FileDown className="h-4 w-4" /></Button>
                  <Button variant="default" size="sm" title="Export CSV" onClick={() => alert("CSV Export is disabled in this prototype demo.")}><Download className="h-4 w-4 mr-2" /> CSV</Button>
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="max-w-2xl mx-auto space-y-8 font-serif">
                  <div className="text-center border-b pb-6">
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-800 dark:text-card-foreground">Patient Summary Report</h2>
                    <p className="text-muted-foreground mt-2">Generated on: {new Date().toLocaleDateString()}</p>
                    <p className="text-sm mt-1 text-muted-foreground">Target: All Patients • Range: Last 7 Days</p>
                  </div>
                  
                  <div className="space-y-4 text-slate-700 dark:text-muted-foreground">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-foreground">Executive Summary</h3>
                    <p>During the selected reporting period, the FoG Assist prototype monitored 3 active patients. A total of 42 simulated Freezing of Gait (FoG) episodes were detected across the cohort.</p>
                    
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-900 dark:text-foreground mt-6">Key Metrics</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Average Recovery Time:</strong> 2.1 seconds</li>
                      <li><strong>Most Effective Intervention:</strong> Combined (Vibration + Audio)</li>
                      <li><strong>Highest Risk Period:</strong> 08:00 - 11:00 AM</li>
                    </ul>

                    <div className="bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-200 dark:border-amber-900 rounded my-6">
                      <p className="text-amber-800 dark:text-amber-400 text-sm font-sans italic">
                        Disclaimer: This report contains prototype simulation data intended for demonstration and engineering research purposes only. It does not constitute a clinical diagnosis or medically validated findings.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full min-h-[400px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center bg-slate-50 dark:bg-card/50">
              <FileText className="h-12 w-12 mb-4 text-muted-foreground dark:text-slate-700" />
              <h3 className="text-lg font-medium">No Report Selected</h3>
              <p className="mt-2 text-sm max-w-sm">
                Select your parameters on the left and click "Generate Report Preview" to view the compiled data.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
