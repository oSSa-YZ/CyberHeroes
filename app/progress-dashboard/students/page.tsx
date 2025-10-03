"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, Users, Search, Plus, Edit, Trash2, Award, BarChart, Eye } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { useEffect, useState } from "react"
import { TeacherAuthButtons } from "@/components/teacher-auth-buttons"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([])
  const [groups, setGroups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  useEffect(() => {
    // Fetch real students data from API
    Promise.all([
      fetch('/api/students').then(response => response.json()),
      fetch('/api/groups').then(response => response.json())
    ])
      .then(([studentsData, groupsData]) => {
        if (studentsData.ok) {
          setStudents(studentsData.students)
        } else {
          console.error('Failed to load students:', studentsData.error)
        }
        
        if (groupsData.ok) {
          setGroups(groupsData.groups)
        } else {
          console.error('Failed to load groups:', groupsData.error)
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const createGroup = async () => {
    if (!newGroupName.trim()) return
    
    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newGroupName,
          description: newGroupDescription
        })
      })
      
      const data = await response.json()
      if (data.ok) {
        setGroups([...groups, data.group])
        setNewGroupName("")
        setNewGroupDescription("")
        setShowCreateGroup(false)
      }
    } catch (error) {
      console.error('Error creating group:', error)
    }
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.username.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressBg = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 70) return "bg-yellow-500"
    return "bg-red-500"
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
              Student Management
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search students by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Student
            </Button>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-blue-100 p-2 gap-2 mb-6">
              <TabsTrigger
                value="list"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700"
              >
                Student List
              </TabsTrigger>
              <TabsTrigger
                value="groups"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700"
              >
                Groups
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              {loading ? (
                <Card className="bg-white border-2 border-blue-200">
                  <CardContent className="p-8 text-center">
                    <div className="text-blue-600">Loading students...</div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredStudents.map((student) => (
                    <Card key={student.id} className="bg-white border-2 border-blue-200 hover:border-blue-300 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-bold text-blue-800">{student.name}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {student.grade}
                              </Badge>
                            </div>
                            <p className="text-sm text-blue-600 mb-2">
                              @{student.username} • {student.email}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                              <div>
                                <span className="font-medium text-blue-700">Phishing:</span>
                                <span className={`ml-1 font-bold ${getProgressColor(student.progress.phishingAwareness)}`}>
                                  {student.progress.phishingAwareness}%
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-blue-700">Password:</span>
                                <span className={`ml-1 font-bold ${getProgressColor(student.progress.passwordSecurity)}`}>
                                  {student.progress.passwordSecurity}%
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-blue-700">Privacy:</span>
                                <span className={`ml-1 font-bold ${getProgressColor(student.progress.onlinePrivacy)}`}>
                                  {student.progress.onlinePrivacy}%
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-blue-700">Cyberbullying:</span>
                                <span className={`ml-1 font-bold ${getProgressColor(student.progress.cyberbullying)}`}>
                                  {student.progress.cyberbullying}%
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-blue-700">Digital Footprint:</span>
                                <span className={`ml-1 font-bold ${getProgressColor(student.progress.digitalFootprint)}`}>
                                  {student.progress.digitalFootprint}%
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-blue-700">Quiz:</span>
                                <span className={`ml-1 font-bold ${student.quizCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                                  {student.quizCompleted ? '✓' : '—'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedStudent(student)}
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 border-green-300 hover:bg-green-50"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <Card className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg font-bold text-blue-700">Student Groups</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {groups.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-blue-600 mb-4">No groups created yet.</p>
                        <Button 
                          onClick={() => setShowCreateGroup(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 mx-auto"
                        >
                          <Plus className="h-4 w-4" />
                          Create Your First Group
                        </Button>
                      </div>
                    ) : (
                      <>
                        {groups.map((group) => (
                          <div key={group.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                            <div>
                              <h4 className="font-bold text-blue-800">{group.name}</h4>
                              <p className="text-sm text-blue-600">
                                {group.studentCount} students • Created {new Date(group.createdAt).toLocaleDateString()}
                              </p>
                              {group.description && (
                                <p className="text-xs text-blue-500 mt-1">{group.description}</p>
                              )}
                            </div>
                            <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                              Manage Group
                            </Button>
                          </div>
                        ))}
                        <Button 
                          onClick={() => setShowCreateGroup(true)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 justify-center"
                        >
                          <Plus className="h-4 w-4" />
                          Create New Group
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Create Group Modal */}
              {showCreateGroup && (
                <Card className="bg-white border-2 border-blue-200">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <CardTitle className="text-lg font-bold text-blue-700">Create New Group</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-blue-700 mb-2 block">Group Name</label>
                        <Input
                          value={newGroupName}
                          onChange={(e) => setNewGroupName(e.target.value)}
                          placeholder="Enter group name..."
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-blue-700 mb-2 block">Description (Optional)</label>
                        <Input
                          value={newGroupDescription}
                          onChange={(e) => setNewGroupDescription(e.target.value)}
                          placeholder="Enter group description..."
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={createGroup}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={!newGroupName.trim()}
                        >
                          Create Group
                        </Button>
                        <Button 
                          onClick={() => {
                            setShowCreateGroup(false)
                            setNewGroupName("")
                            setNewGroupDescription("")
                          }}
                          variant="outline"
                          className="text-blue-600 border-blue-300"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
