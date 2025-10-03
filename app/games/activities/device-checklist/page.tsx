"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Smartphone, Laptop, Tablet, CheckCircle, AlertTriangle, Trophy, Lock, Wifi, Eye, Download, ArrowLeft } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth-buttons"
import { logProgressOnce } from "@/lib/progress-client"

export default function DeviceChecklistPage() {
  useEffect(() => {
    logProgressOnce('activities : visited', { page: 'device-checklist' })
  }, [])
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [hasCompleted, setHasCompleted] = useState(false)

  const checklistItems = [
    {
      id: "screen-lock",
      category: "Screen Security",
      title: "Set up a strong screen lock",
      description: "Use a PIN, pattern, or fingerprint to lock your device",
      icon: "🔒",
      tips: [
        "Use a PIN with at least 6 digits",
        "Don't use simple patterns like 1234",
        "Enable fingerprint or face recognition if available"
      ]
    },
    {
      id: "auto-lock",
      category: "Screen Security",
      title: "Set auto-lock timer",
      description: "Device should lock automatically after 1-2 minutes",
      icon: "⏰",
      tips: [
        "Set to 1 minute for maximum security",
        "Never set to 'Never'",
        "Test the timer to make sure it works"
      ]
    },
    {
      id: "updates",
      category: "Software Updates",
      title: "Keep software updated",
      description: "Install the latest security updates and patches",
      icon: "🔄",
      tips: [
        "Enable automatic updates",
        "Check for updates weekly",
        "Don't ignore update notifications"
      ]
    },
    {
      id: "antivirus",
      category: "Protection",
      title: "Install security software",
      description: "Use trusted antivirus and security apps",
      icon: "🛡️",
      tips: [
        "Choose well-known security apps",
        "Keep security software updated",
        "Run regular scans"
      ]
    },
    {
      id: "wifi-security",
      category: "Network Security",
      title: "Use secure Wi-Fi networks",
      description: "Only connect to trusted, password-protected networks",
      icon: "📶",
      tips: [
        "Avoid public Wi-Fi for sensitive activities",
        "Use a VPN on public networks",
        "Turn off Wi-Fi when not needed"
      ]
    },
    {
      id: "bluetooth",
      category: "Network Security",
      title: "Turn off Bluetooth when not needed",
      description: "Keep Bluetooth disabled unless actively using it",
      icon: "🔵",
      tips: [
        "Disable Bluetooth in public places",
        "Don't accept unknown pairing requests",
        "Use 'invisible' mode when possible"
      ]
    },
    {
      id: "app-permissions",
      category: "App Security",
      title: "Review app permissions",
      description: "Only give apps the permissions they really need",
      icon: "📱",
      tips: [
        "Check location, camera, and microphone access",
        "Deny unnecessary permissions",
        "Review permissions regularly"
      ]
    },
    {
      id: "app-sources",
      category: "App Security",
      title: "Download apps from trusted sources",
      description: "Only install apps from official app stores",
      icon: "🏪",
      tips: [
        "Use Google Play Store or Apple App Store",
        "Avoid third-party app stores",
        "Check app reviews and ratings"
      ]
    },
    {
      id: "backup",
      category: "Data Protection",
      title: "Regular data backups",
      description: "Back up important data to cloud or external storage",
      icon: "💾",
      tips: [
        "Use cloud backup services",
        "Back up photos and documents",
        "Test your backups regularly"
      ]
    },
    {
      id: "find-device",
      category: "Data Protection",
      title: "Enable 'Find My Device'",
      description: "Set up tracking in case your device is lost or stolen",
      icon: "📍",
      tips: [
        "Enable location services",
        "Test the feature works",
        "Know how to use it if needed"
      ]
    }
  ]

  const toggleItem = (itemId: string) => {
    const newCompleted = new Set(completedItems)
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId)
    } else {
      newCompleted.add(itemId)
    }
    setCompletedItems(newCompleted)
    
    // Check if all items are completed
    if (newCompleted.size === checklistItems.length && !hasCompleted) {
      setHasCompleted(true)
      logProgressOnce('activities : completed', { activity: 'device-checklist' })
    }
  }

  const getProgress = () => {
    return Math.round((completedItems.size / checklistItems.length) * 100)
  }

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "text-red-600 bg-red-100"
    if (progress < 60) return "text-orange-600 bg-orange-100"
    if (progress < 90) return "text-yellow-600 bg-yellow-100"
    return "text-green-600 bg-green-100"
  }

  const getProgressText = (progress: number) => {
    if (progress < 30) return "Getting Started"
    if (progress < 60) return "Good Progress"
    if (progress < 90) return "Almost There"
    return "Security Master"
  }

  const resetChecklist = () => {
    setCompletedItems(new Set())
  }

  const downloadChecklist = () => {
    const checklistText = checklistItems.map(item => {
      const status = completedItems.has(item.id) ? "✅" : "❌"
      return `${status} ${item.title} - ${item.description}`
    }).join('\n\n')
    
    const blob = new Blob([checklistText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'device-security-checklist.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const progress = getProgress()

  return (
    <div className="flex min-h-screen flex-col bg-purple-50">
      <header className="sticky top-0 z-50 w-full border-b bg-brand-header shadow-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-purple-800">
            <div className="bg-purple-600 rounded-full p-2">
              <Shield className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="font-extrabold">CyberHeroes</span>
          </Link>

          {/* Mobile Menu */}
          <MobileMenu items={navItems} />

          <AuthButtons />

          {/* Desktop Navigation */}
          <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
            {navItems.map((item, index) => (
              <Link
                key={index}
                className="text-sm font-bold text-purple-800 hover:scale-110 transition-transform flex flex-col items-center"
                href={item.href}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-green-400 to-blue-500 min-h-[calc(100vh-4rem)]">
          {/* progress tracking moved to effect */}
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon" asChild className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full">
                <Link href="/games">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md">
                Device Security Checklist 📱💻
              </h1>
              <div className="mt-2">
                <Badge className="bg-green-100 text-green-800 font-bold border-0">Security Activity</Badge>
              </div>
              <p className="text-white mt-4 text-lg">Check off security steps to protect your devices!</p>
            </div>

            {/* Progress Section */}
            <div className="bg-white border-8 border-green-500 rounded-xl p-6 shadow-xl max-w-2xl mx-auto mb-8">
              <div className="text-center">
                <h2 className="text-green-800 font-extrabold mb-4 flex items-center justify-center gap-2">
                  <Trophy className="h-6 w-6" /> Your Progress
                </h2>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-green-800">Security Level:</span>
                    <Badge className={`font-bold ${getProgressColor(progress)}`}>
                      {getProgressText(progress)}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {completedItems.size} of {checklistItems.length} items completed ({progress}%)
                  </p>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button 
                    onClick={resetChecklist}
                    variant="outline"
                    className="border-green-500 text-green-600 hover:bg-green-50"
                  >
                    Reset Checklist
                  </Button>
                  <Button 
                    onClick={downloadChecklist}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="grid gap-4 max-w-4xl mx-auto">
              {checklistItems.map((item) => (
                <div key={item.id} className="bg-white border-8 border-blue-500 rounded-xl p-4 shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Checkbox
                        checked={completedItems.has(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="h-6 w-6 border-2 border-blue-500 data-[state=checked]:bg-blue-500"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="text-lg font-extrabold text-blue-800">{item.title}</h3>
                        <Badge className="text-xs bg-blue-100 text-blue-800">{item.category}</Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDetails(showDetails === item.id ? null : item.id)}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          {showDetails === item.id ? "Hide Tips" : "Show Tips"}
                        </Button>
                        
                        {completedItems.has(item.id) && (
                          <div className="flex items-center gap-1 text-green-600 font-bold">
                            <CheckCircle className="h-4 w-4" />
                            Completed!
                          </div>
                        )}
                      </div>
                      
                      {showDetails === item.id && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" /> Security Tips:
                          </h4>
                          <ul className="space-y-1">
                            {item.tips.map((tip, index) => (
                              <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                                <span className="text-blue-500 mt-0.5">•</span>
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Completion Celebration */}
            {progress === 100 && (
              <div className="mt-8 bg-white border-8 border-yellow-500 rounded-xl p-6 shadow-xl max-w-2xl mx-auto text-center">
                <div className="text-6xl mb-4">🎉🏆🎉</div>
                <h2 className="text-2xl font-extrabold text-yellow-800 mb-2">
                  Congratulations! You're a Security Master!
                </h2>
                <p className="text-yellow-700 mb-4">
                  You've completed all the device security steps. Your devices are now much safer!
                </p>
                <Badge className="text-lg bg-yellow-100 text-yellow-800 font-bold border-0">
                  Security Level: MAXIMUM! 🛡️
                </Badge>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-4 bg-brand-footer text-white border-t-8 border-brand-footer">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-base text-white font-medium">© {new Date().getFullYear()} CyberHeroes</p>
          <div className="flex gap-4">
            <Link className="text-sm font-medium hover:underline text-yellow-300" href="#">
              For Parents
            </Link>
            <Link className="text-sm font-medium hover:underline text-yellow-300" href="#">
              For Teachers
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
