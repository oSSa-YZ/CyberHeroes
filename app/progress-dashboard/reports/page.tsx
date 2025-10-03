"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, FileText, Download, BarChart, Users, Calendar, TrendingUp, Award, Printer, Filter, Eye } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { useState } from "react"
import { TeacherAuthButtons } from "@/components/teacher-auth-buttons"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState("class-progress")
  const [selectedTimeframe, setSelectedTimeframe] = useState("last-month")
  const [selectedGrade, setSelectedGrade] = useState("all")
  
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  const reportTypes = [
    {
      id: "class-progress",
      title: "Class Progress Report",
      description: "Overview of class performance across all cybersecurity topics",
      icon: <BarChart className="h-6 w-6" />,
      color: "bg-blue-500",
      features: ["Overall completion rates", "Topic-wise breakdown", "Student rankings", "Trends over time"]
    },
    {
      id: "individual-student",
      title: "Individual Student Report",
      description: "Detailed progress report for a specific student",
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-500",
      features: ["Personal progress tracking", "Strengths and weaknesses", "Recommendations", "Achievement history"]
    },
    {
      id: "topic-analysis",
      title: "Topic Analysis Report",
      description: "Deep dive into specific cybersecurity topics",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "bg-purple-500",
      features: ["Topic mastery levels", "Common misconceptions", "Learning gaps", "Improvement suggestions"]
    },
    {
      id: "achievement-certificates",
      title: "Achievement Certificates",
      description: "Generate certificates for student accomplishments",
      icon: <Award className="h-6 w-6" />,
      color: "bg-yellow-500",
      features: ["Completion certificates", "Badge achievements", "Customizable templates", "Printable format"]
    },
    {
      id: "activity-log",
      title: "Activity Log Report",
      description: "Detailed log of all student activities and interactions",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-orange-500",
      features: ["Time spent on activities", "Login patterns", "Game completion", "Quiz attempts"]
    },
    {
      id: "comparison-report",
      title: "Comparison Report",
      description: "Compare performance across different groups or time periods",
      icon: <BarChart className="h-6 w-6" />,
      color: "bg-pink-500",
      features: ["Group comparisons", "Before/after analysis", "Benchmark data", "Statistical insights"]
    }
  ]

  const timeframes = [
    { value: "last-week", label: "Last Week" },
    { value: "last-month", label: "Last Month" },
    { value: "last-quarter", label: "Last Quarter" },
    { value: "last-year", label: "Last Year" },
    { value: "custom", label: "Custom Range" }
  ]

  const grades = [
    { value: "all", label: "All Grades" },
    { value: "3rd", label: "3rd Grade" },
    { value: "4th", label: "4th Grade" },
    { value: "5th", label: "5th Grade" },
    { value: "6th", label: "6th Grade" }
  ]

  const recentReports = [
    {
      id: 1,
      name: "Class Progress Report - January 2024",
      type: "class-progress",
      generated: "2024-01-21",
      size: "2.3 MB",
      status: "completed"
    },
    {
      id: 2,
      name: "Sarah Jones - Individual Report",
      type: "individual-student",
      generated: "2024-01-20",
      size: "1.1 MB",
      status: "completed"
    },
    {
      id: 3,
      name: "Phishing Awareness Analysis",
      type: "topic-analysis",
      generated: "2024-01-19",
      size: "3.7 MB",
      status: "completed"
    },
    {
      id: 4,
      name: "Achievement Certificates - Q4 2023",
      type: "achievement-certificates",
      generated: "2024-01-18",
      size: "5.2 MB",
      status: "completed"
    }
  ]

  const generateReport = () => {
    // Simulate report generation
    alert(`Generating ${selectedReportType} report for ${selectedTimeframe}...`)
  }

  const getReportTypeInfo = (type: string) => {
    return reportTypes.find(rt => rt.id === type)
  }

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="sticky top-0 z-50 w-full border-b bg-blue-600 shadow-md teacher-header">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <div className="bg-white rounded-full p-2">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-extrabold">CyberHeroes</span>
            <span className="text-xs bg-blue-500 px-2 py-1 rounded-md">Teacher Portal</span>
          </Link>

          <MobileMenu items={navItems} />

          <style jsx global>{`
            .teacher-header span.font-bold { color: #fff !important; }
          `}</style>
          <TeacherAuthButtons />

          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            <Link className="text-sm font-bold text-white hover:underline underline-offset-4" href="/">
              Home
            </Link>
            <Link
              className="text-sm font-bold text-white hover:underline underline-offset-4"
              href="/progress-dashboard"
            >
              Dashboard
            </Link>
            <Link
              className="text-sm font-bold text-white hover:underline underline-offset-4"
              href="/progress-dashboard/students"
            >
              Students
            </Link>
            <Link
              className="text-sm font-bold text-white hover:underline underline-offset-4"
              href="/progress-dashboard/resources"
            >
              Resources
            </Link>
            <Link
              className="text-sm font-bold text-white hover:underline underline-offset-4"
              href="/progress-dashboard/reports"
            >
              Reports
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center gap-2 mb-8">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="bg-white hover:bg-blue-100 text-blue-600 rounded-full"
            >
              <Link href="/progress-dashboard">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-blue-700">
              Reports & Analytics
            </h1>
          </div>

          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-blue-100 p-2 gap-2 mb-6">
              <TabsTrigger
                value="generate"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700"
              >
                Generate Reports
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700"
              >
                Report History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-6">
              <Card className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg font-bold text-blue-700">Report Configuration</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <label className="text-sm font-medium text-blue-700 mb-2 block">Report Type</label>
                      <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700 mb-2 block">Timeframe</label>
                      <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeframes.map((timeframe) => (
                            <SelectItem key={timeframe.value} value={timeframe.value}>
                              {timeframe.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-blue-700 mb-2 block">Grade Level</label>
                      <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade.value} value={grade.value}>
                              {grade.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-4">
                    <Button onClick={generateReport} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {reportTypes.map((reportType) => (
                  <Card key={reportType.id} className="bg-white border-2 border-blue-200 hover:border-blue-300 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${reportType.color} text-white`}>
                          {reportType.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold text-blue-800">
                            {reportType.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-blue-600 mb-4">
                        {reportType.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {reportType.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-blue-700">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-blue-600 border-blue-300 hover:bg-blue-50"
                        onClick={() => setSelectedReportType(reportType.id)}
                      >
                        Select This Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg font-bold text-blue-700">Recent Reports</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${getReportTypeInfo(report.type)?.color} text-white`}>
                            {getReportTypeInfo(report.type)?.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-800">{report.name}</h4>
                            <p className="text-sm text-blue-600">
                              Generated {report.generated} • {report.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {report.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm" className="text-green-600 border-green-300">
                            <Printer className="h-4 w-4 mr-1" />
                            Print
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white border-2 border-blue-200">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-lg font-bold text-blue-700">Report Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Total Reports Generated</span>
                        <span className="font-bold text-blue-800">24</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">This Month</span>
                        <span className="font-bold text-blue-800">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Most Popular Report</span>
                        <span className="font-bold text-blue-800">Class Progress</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Total Downloads</span>
                        <span className="font-bold text-blue-800">156</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-blue-200">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-lg font-bold text-blue-700">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center">
                        <FileText className="h-4 w-4" />
                        Generate Weekly Report
                      </Button>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 justify-center">
                        <Award className="h-4 w-4" />
                        Create Certificates
                      </Button>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 justify-center">
                        <BarChart className="h-4 w-4" />
                        Export All Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="w-full border-t py-4 bg-blue-600 text-white">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-base text-white font-medium">© {new Date().getFullYear()} CyberHeroes Teacher Portal</p>
          <div className="flex gap-4">
            <Link className="text-xs sm:text-sm font-medium hover:underline text-white" href="#">
              Help Center
            </Link>
            <Link className="text-xs sm:text-sm font-medium hover:underline text-white" href="#">
              Privacy Policy
            </Link>
            <Link className="text-xs sm:text-sm font-medium hover:underline text-white" href="#">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
