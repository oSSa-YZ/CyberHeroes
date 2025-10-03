"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, BarChart, Users, FileText, Award, Download, Printer } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { useEffect, useMemo, useState } from "react"
import { TeacherAuthButtons } from "@/components/teacher-auth-buttons"

export default function ProgressDashboardPage() {
  const [summary, setSummary] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  useEffect(() => {
    fetch('/api/progress/summary').then(r => r.json()).then(d => { if (d.ok) setSummary(d.summary); else setError('Failed to load'); }).catch(()=>setError('Failed to load')).finally(()=>setLoading(false))
  }, [])

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

          {/* Mobile Menu */}
          <MobileMenu items={navItems} />

          <style jsx global>{`
            .teacher-header span.font-bold { color: #fff !important; }
          `}</style>
          <TeacherAuthButtons />

          {/* Desktop Navigation */}
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
              <Link href="/">
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-blue-700">
              Progress Dashboard
            </h1>
          </div>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-4 mb-8">
            <Card className="bg-white border-2 border-blue-200">
              <CardHeader className="bg-blue-500 text-white p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" /> Students
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-3xl font-bold text-blue-700">{loading ? '…' : (summary?.totalUsers ?? 0)}</div>
                <p className="text-sm sm:text-base text-blue-600">Active students (unique accounts)</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-blue-200">
              <CardHeader className="bg-green-500 text-white p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5" /> Completed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-3xl font-bold text-green-700">{loading ? '…' : (summary?.categories?.passwordSecurity ?? 0)}%</div>
                <p className="text-sm sm:text-base text-green-600">Password Security completion</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-blue-200">
              <CardHeader className="bg-yellow-500 text-white p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <BarChart className="h-4 w-4 sm:h-5 sm:w-5" /> In Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-3xl font-bold text-yellow-700">{loading ? '…' : (summary?.categories?.phishingAwareness ?? 0)}%</div>
                <p className="text-sm sm:text-base text-yellow-600">Phishing Awareness completion</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-blue-200">
              <CardHeader className="bg-purple-500 text-white p-3 sm:p-4">
                <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" /> Average Score
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4">
                <div className="text-xl sm:text-3xl font-bold text-purple-700">{loading ? '…' : `${Math.round(((summary?.categories?.phishingAwareness || 0) + (summary?.categories?.passwordSecurity || 0)) / 2)}%`}</div>
                <p className="text-sm sm:text-base text-purple-600">Average completion (tracked)</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-blue-100 p-2 gap-2 mb-6">
              <TabsTrigger
                value="overview"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700 text-xs sm:text-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="students"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700 text-xs sm:text-sm"
              >
                Students
              </TabsTrigger>
              <TabsTrigger
                value="reports"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700 text-xs sm:text-sm"
              >
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg sm:text-xl font-bold text-blue-700">Class Progress Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm sm:text-base font-bold text-blue-700">Phishing Awareness</span>
                        <span className="text-sm sm:text-base font-bold text-green-600">{loading ? '…' : `${summary?.categories?.phishingAwareness ?? 0}% Complete`}</span>
                      </div>
                      <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${loading ? 0 : (summary?.categories?.phishingAwareness ?? 0)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm sm:text-base font-bold text-blue-700">Password Security</span>
                        <span className="text-sm sm:text-base font-bold text-green-600">{loading ? '…' : `${summary?.categories?.passwordSecurity ?? 0}% Complete`}</span>
                      </div>
                      <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${loading ? 0 : (summary?.categories?.passwordSecurity ?? 0)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm sm:text-base font-bold text-blue-700">Online Privacy</span>
                        <span className="text-sm sm:text-base font-bold text-yellow-600">{loading ? '…' : `${summary?.categories?.onlinePrivacy ?? 0}% Complete`}</span>
                      </div>
                      <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${loading ? 0 : (summary?.categories?.onlinePrivacy ?? 0)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm sm:text-base font-bold text-blue-700">Cyberbullying</span>
                        <span className="text-sm sm:text-base font-bold text-yellow-600">{loading ? '…' : `${summary?.categories?.cyberbullying ?? 0}% Complete`}</span>
                      </div>
                      <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${loading ? 0 : (summary?.categories?.cyberbullying ?? 0)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm sm:text-base font-bold text-blue-700">Digital Footprint</span>
                        <span className="text-sm sm:text-base font-bold text-red-600">{loading ? '…' : `${summary?.categories?.digitalFootprint ?? 0}% Complete`}</span>
                      </div>
                      <div className="w-full h-4 bg-blue-100 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${loading ? 0 : (summary?.categories?.digitalFootprint ?? 0)}%` }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white border-2 border-blue-200">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-lg sm:text-xl font-bold text-blue-700">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {loading ? (
                        <div className="text-blue-600 text-sm">Loading recent activity…</div>
                      ) : (
                        (summary?.events || []).slice(-6).reverse().map((ev: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="bg-green-100 p-2 rounded-full">
                              <Award className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm sm:text-base font-bold text-blue-700">
                                {ev.username} • {ev.type}
                              </p>
                              <p className="text-xs sm:text-sm text-blue-600">{new Date(ev.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-blue-200">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-lg sm:text-xl font-bold text-blue-700">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Button onClick={() => {
                        const blob = new Blob([JSON.stringify(summary || {}, null, 2)], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'class-report.json'
                        a.click()
                        URL.revokeObjectURL(url)
                      }} className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center text-sm sm:text-base">
                        <Download className="h-4 w-4 sm:h-5 sm:w-5" /> Download Class Report
                      </Button>

                      <Button onClick={() => window.print()} className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 justify-center text-sm sm:text-base">
                        <Printer className="h-4 w-4 sm:h-5 sm:w-5" /> Print Certificates
                      </Button>

                      <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 justify-center text-sm sm:text-base">
                        <Link href="/progress-dashboard/students">
                          <Users className="h-4 w-4 sm:h-5 sm:w-5" /> Manage Student Groups
                        </Link>
                      </Button>

                      <Button asChild className="w-full bg-yellow-600 hover:bg-yellow-700 text-white flex items-center gap-2 justify-center text-sm sm:text-base">
                        <Link href="/progress-dashboard/resources">
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5" /> Access Lesson Plans
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <Card className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg sm:text-xl font-bold text-blue-700">Student Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {loading ? (
                      <div className="text-blue-600 text-sm">Loading students…</div>
                    ) : (
                      (summary?.students || []).length === 0 ? (
                        <p className="text-sm sm:text-base text-blue-600">No students yet.</p>
                      ) : (
                        (summary?.students || []).map((s: any) => (
                          <div key={s.username} className="flex items-center justify-between p-3 rounded-lg border border-blue-100 bg-blue-50">
                            <div className="font-bold text-blue-800">{s.username}</div>
                            <div className="text-xs sm:text-sm text-blue-700 flex gap-3 items-center">
                              <span className={s.phishingAwareness ? 'text-green-700 font-bold' : 'text-gray-500'}>Phishing {s.phishingAwareness ? '✓' : '—'}</span>
                              <span className={s.passwordSecurity ? 'text-green-700 font-bold' : 'text-gray-500'}>Password {s.passwordSecurity ? '✓' : '—'}</span>
                              <span className={s.cyberdefenderDone ? 'text-green-700 font-bold' : 'text-gray-500'}>CyberDefender {s.cyberdefenderDone ? '✓' : '—'}</span>
                              <span className={s.quizCompleted ? 'text-green-700 font-bold' : 'text-gray-500'}>Quiz {s.quizCompleted ? '✓' : '—'}</span>
                              <span className="text-purple-700">Games {s.games ?? 0}</span>
                              <span className="text-blue-700">Activities {s.activities ?? 0}</span>
                              <span className="text-pink-700">Powers {s.powers ?? 0}</span>
                            </div>
                          </div>
                        ))
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg sm:text-xl font-bold text-blue-700">Available Reports</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {/* Report options would go here */}
                    <p className="text-sm sm:text-base text-blue-600">
                      Generate and download various reports for your class.
                    </p>
                  </div>
                </CardContent>
              </Card>
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
