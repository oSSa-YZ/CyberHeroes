"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, ArrowLeft, FileText, Download, BookOpen, Video, Users, Calendar, Star, Clock, Filter } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { useState } from "react"
import { TeacherAuthButtons } from "@/components/teacher-auth-buttons"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  const resources = [
    {
      id: 1,
      title: "Phishing Awareness Lesson Plan",
      description: "Complete lesson plan for teaching students about phishing scams and how to identify them.",
      category: "lesson-plans",
      grade: "5th Grade",
      duration: "45 minutes",
      rating: 4.8,
      downloads: 1247,
      type: "PDF",
      tags: ["phishing", "email safety", "critical thinking"],
      featured: true
    },
    {
      id: 2,
      title: "Password Security Worksheet",
      description: "Interactive worksheet for students to practice creating strong passwords.",
      category: "worksheets",
      grade: "4th-6th Grade",
      duration: "20 minutes",
      rating: 4.6,
      downloads: 892,
      type: "PDF",
      tags: ["passwords", "security", "hands-on"]
    },
    {
      id: 3,
      title: "Digital Footprint Video Lesson",
      description: "Educational video explaining digital footprints and online privacy.",
      category: "videos",
      grade: "5th Grade",
      duration: "15 minutes",
      rating: 4.9,
      downloads: 2156,
      type: "MP4",
      tags: ["digital footprint", "privacy", "video"]
    },
    {
      id: 4,
      title: "Cyberbullying Prevention Guide",
      description: "Comprehensive guide for teachers on preventing and addressing cyberbullying.",
      category: "guides",
      grade: "All Grades",
      duration: "30 minutes",
      rating: 4.7,
      downloads: 567,
      type: "PDF",
      tags: ["cyberbullying", "prevention", "social-emotional"]
    },
    {
      id: 5,
      title: "Online Privacy Activity Pack",
      description: "Collection of activities and games for teaching online privacy concepts.",
      category: "activities",
      grade: "4th-6th Grade",
      duration: "60 minutes",
      rating: 4.5,
      downloads: 734,
      type: "ZIP",
      tags: ["privacy", "activities", "games"]
    },
    {
      id: 6,
      title: "Cybersecurity Assessment Rubric",
      description: "Rubric for assessing student understanding of cybersecurity concepts.",
      category: "assessments",
      grade: "5th Grade",
      duration: "N/A",
      rating: 4.4,
      downloads: 445,
      type: "PDF",
      tags: ["assessment", "rubric", "evaluation"]
    }
  ]

  const categories = [
    { value: "all", label: "All Resources" },
    { value: "lesson-plans", label: "Lesson Plans" },
    { value: "worksheets", label: "Worksheets" },
    { value: "videos", label: "Videos" },
    { value: "guides", label: "Guides" },
    { value: "activities", label: "Activities" },
    { value: "assessments", label: "Assessments" }
  ]

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "lesson-plans": return <BookOpen className="h-4 w-4" />
      case "worksheets": return <FileText className="h-4 w-4" />
      case "videos": return <Video className="h-4 w-4" />
      case "guides": return <FileText className="h-4 w-4" />
      case "activities": return <Users className="h-4 w-4" />
      case "assessments": return <FileText className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "lesson-plans": return "bg-blue-100 text-blue-800 border-blue-200"
      case "worksheets": return "bg-green-100 text-green-800 border-green-200"
      case "videos": return "bg-purple-100 text-purple-800 border-purple-200"
      case "guides": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "activities": return "bg-pink-100 text-pink-800 border-pink-200"
      case "assessments": return "bg-orange-100 text-orange-800 border-orange-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
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
              Teaching Resources
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 bg-blue-100 p-2 gap-2 mb-6">
              <TabsTrigger
                value="all"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700"
              >
                All Resources
              </TabsTrigger>
              <TabsTrigger
                value="featured"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700"
              >
                Featured
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="bg-white data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg font-bold text-blue-700 border-2 border-blue-200 data-[state=active]:border-blue-700"
              >
                Recently Added
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className={`bg-white border-2 border-blue-200 hover:border-blue-300 transition-colors ${resource.featured ? 'ring-2 ring-yellow-400' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(resource.category)}
                          <Badge className={`text-xs ${getCategoryColor(resource.category)}`}>
                            {categories.find(c => c.value === resource.category)?.label}
                          </Badge>
                        </div>
                        {resource.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <CardTitle className="text-lg font-bold text-blue-800 line-clamp-2">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-blue-600 mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-blue-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {resource.grade}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium">{resource.rating}</span>
                        </div>
                        <span className="text-xs text-blue-600">•</span>
                        <span className="text-xs text-blue-600">{resource.downloads} downloads</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {resource.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download {resource.type}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="featured" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.filter(r => r.featured).map((resource) => (
                  <Card key={resource.id} className="bg-white border-2 border-blue-200 hover:border-blue-300 transition-colors ring-2 ring-yellow-400">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(resource.category)}
                          <Badge className={`text-xs ${getCategoryColor(resource.category)}`}>
                            {categories.find(c => c.value === resource.category)?.label}
                          </Badge>
                        </div>
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                      <CardTitle className="text-lg font-bold text-blue-800 line-clamp-2">
                        {resource.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-blue-600 mb-4 line-clamp-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs text-blue-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {resource.grade}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {resource.duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-xs font-medium">{resource.rating}</span>
                        </div>
                        <span className="text-xs text-blue-600">•</span>
                        <span className="text-xs text-blue-600">{resource.downloads} downloads</span>
                      </div>

                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Download {resource.type}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <Card className="bg-white border-2 border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="text-lg font-bold text-blue-700">Recently Added Resources</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div>
                        <h4 className="font-bold text-blue-800">Cybersecurity Assessment Rubric</h4>
                        <p className="text-sm text-blue-600">Added 2 days ago • 445 downloads</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                      <div>
                        <h4 className="font-bold text-green-800">Online Privacy Activity Pack</h4>
                        <p className="text-sm text-green-600">Added 1 week ago • 734 downloads</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-green-600 border-green-300">
                        Download
                      </Button>
                    </div>
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
