"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, X, CheckCircle2, XCircle, AlertTriangle } from "lucide-react"
import { InteractiveTip } from "@/components/interactive-tip"
import { Sticker } from "@/components/sticker"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth-buttons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { logProgressOnce } from "@/lib/progress-client"
import { Badge } from "@/components/ui/badge"
import confetti from "canvas-confetti"

export default function BadGuysPage() {
  useEffect(() => {
    logProgressOnce('bad-guys : visited')
  }, [])
  const pathname = usePathname()
  const [showPhishyPhilModal, setShowPhishyPhilModal] = useState(false)
  const [phishingGameStep, setPhishingGameStep] = useState(0)
  const [phishingScore, setPhishingScore] = useState(0)
  const [showPhishingResult, setShowPhishingResult] = useState(false)
  
  const [showRansomRandyModal, setShowRansomRandyModal] = useState(false)
  const [ransomwareGameStep, setRansomwareGameStep] = useState(0)
  const [ransomwareScore, setRansomwareScore] = useState(0)
  const [showRansomwareResult, setShowRansomwareResult] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  const phishingExamples = [
    // EMAILS (5)
    {
      id: 1,
      type: "email",
      content: "🎮 FREE ROBUX! Click here to get 1000 free Robux now! 🎁",
      sender: "robux@free-games.com",
      isPhishing: true,
      explanation: "Real companies never ask for passwords via email!"
    },
    {
      id: 2,
      type: "email",
      content: "Your account has been suspended. Click here to verify your information immediately.",
      sender: "security@roblox-support.com",
      isPhishing: true,
      explanation: "Urgent threats and suspicious links are red flags!"
    },
    {
      id: 3,
      type: "email",
      content: "Welcome to Roblox! Here's your new account information.",
      sender: "noreply@roblox.com",
      isPhishing: false,
      explanation: "This looks like a legitimate welcome email from Roblox."
    },
    {
      id: 4,
      type: "email",
      content: "🎁 CONGRATULATIONS! You won a FREE iPhone! Click here to claim!",
      sender: "prizes@winning-games.net",
      isPhishing: true,
      explanation: "Too good to be true offers are usually fake!"
    },
    {
      id: 5,
      type: "email",
      content: "Your Roblox password was changed. If this wasn't you, click here to secure your account.",
      sender: "security@roblox.com",
      isPhishing: false,
      explanation: "This is a legitimate security alert from Roblox."
    },
    // WEBSITES (5)
    {
      id: 6,
      type: "website",
      content: "roblox.com",
      isPhishing: false,
      explanation: "This is the real Roblox website address."
    },
    {
      id: 7,
      type: "website",
      content: "roblox-free-robux.com",
      isPhishing: true,
      explanation: "Extra words in the URL are suspicious!"
    },
    {
      id: 8,
      type: "website",
      content: "minecraft.net",
      isPhishing: false,
      explanation: "This is the official Minecraft website."
    },
    {
      id: 9,
      type: "website",
      content: "minecraft-free-download.net",
      isPhishing: true,
      explanation: "Fake download sites often have extra words!"
    },
    {
      id: 10,
      type: "website",
      content: "fortnite.com",
      isPhishing: false,
      explanation: "This is the real Fortnite website."
    }
  ]

  const ransomwareExamples = [
    {
      id: 1,
      scenario: "You get a popup saying 'Your computer is infected! Click here to scan now!'",
      choices: [
        { id: "A", text: "Click the popup to scan", correct: false, explanation: "Never click suspicious popups - they might be Ransom Randy!" },
        { id: "B", text: "Close the popup and tell a grown-up", correct: true, explanation: "Great choice! Always ask for help with suspicious messages." },
        { id: "C", text: "Ignore it and keep playing games", correct: false, explanation: "While ignoring can work, it's better to tell someone about suspicious popups." }
      ]
    },
    {
      id: 2,
      scenario: "A website asks you to download a 'free game' that's not from the official store",
      choices: [
        { id: "A", text: "Download it - it's free!", correct: false, explanation: "Free downloads from unofficial sites can contain Ransom Randy's malware!" },
        { id: "B", text: "Only download from official app stores", correct: true, explanation: "Perfect! Official stores are much safer." },
        { id: "C", text: "Ask a grown-up first", correct: true, explanation: "Excellent! Always check with adults before downloading anything." }
      ]
    },
    {
      id: 3,
      scenario: "Your screen shows a message: 'All your files are locked! Pay $500 to unlock them!'",
      choices: [
        { id: "A", text: "Pay the money to get your files back", correct: false, explanation: "Never pay ransom! This encourages more attacks." },
        { id: "B", text: "Tell a grown-up immediately", correct: true, explanation: "Perfect! Adults can help remove ransomware safely." },
        { id: "C", text: "Try to click everything to fix it", correct: false, explanation: "Clicking randomly can make things worse!" }
      ]
    },
    {
      id: 4,
      scenario: "Someone sends you a file in a message saying 'Check out this cool game!'",
      choices: [
        { id: "A", text: "Open the file right away", correct: false, explanation: "Never open files from unknown sources - they might be infected!" },
        { id: "B", text: "Ask who sent it and if it's safe", correct: true, explanation: "Good thinking! Always verify before opening files." },
        { id: "C", text: "Delete the message", correct: true, explanation: "Smart! When in doubt, delete suspicious messages." }
      ]
    },
    {
      id: 5,
      scenario: "Your computer starts running very slowly and shows strange messages",
      choices: [
        { id: "A", text: "Keep using it normally", correct: false, explanation: "Strange behavior could mean Ransom Randy is attacking!" },
        { id: "B", text: "Tell a grown-up about the problems", correct: true, explanation: "Excellent! Adults can help check for malware." },
        { id: "C", text: "Restart the computer", correct: false, explanation: "While restarting can help, it's better to get help first." }
      ]
    }
  ]

  const wifiExamples = [
    {
      id: 1,
      scenario: "You're at the mall and see a WiFi network called 'Mall_Free_WiFi'",
      choices: [
        { id: "A", text: "Connect to it - it's free WiFi!", correct: false, explanation: "Free public WiFi can be dangerous! Sneaky Sam might be watching!" },
        { id: "B", text: "Ask a grown-up if it's safe first", correct: true, explanation: "Great thinking! Always check with adults about public WiFi." },
        { id: "C", text: "Use your phone's data instead", correct: true, explanation: "Smart choice! Your own data is much safer than public WiFi." }
      ]
    },
    {
      id: 2,
      scenario: "You see two WiFi networks: 'Airport_WiFi' and 'Airport_Free_WiFi_2024'",
      choices: [
        { id: "A", text: "Choose the one with 'Free' in the name", correct: false, explanation: "Extra words in WiFi names can be Sneaky Sam's trap!" },
        { id: "B", text: "Choose the simpler name 'Airport_WiFi'", correct: true, explanation: "Official WiFi usually has simple names without extra words." },
        { id: "C", text: "Ask airport staff which one is official", correct: true, explanation: "Perfect! Staff can tell you the real WiFi network." }
      ]
    },
    {
      id: 3,
      scenario: "Your friend says 'Connect to my hotspot - it's called Cool_Gaming_Zone'",
      choices: [
        { id: "A", text: "Connect right away - it's your friend!", correct: false, explanation: "Even friends' networks can be unsafe if not set up properly!" },
        { id: "B", text: "Ask your friend if it's password protected", correct: true, explanation: "Good question! Password protection makes WiFi safer." },
        { id: "C", text: "Use your own data to be safe", correct: true, explanation: "Your own data is always the safest option!" }
      ]
    },
    {
      id: 4,
      scenario: "You're at a restaurant and see 'Restaurant_WiFi' and 'Restaurant_Free_Internet'",
      choices: [
        { id: "A", text: "Ask the restaurant staff which WiFi to use", correct: true, explanation: "Excellent! Staff know which network is official." },
        { id: "B", text: "Choose the one with 'Free' in the name", correct: false, explanation: "Sneaky Sam often adds 'Free' to fake network names!" },
        { id: "C", text: "Don't use WiFi and use your data", correct: true, explanation: "Smart choice! Your own data is always safer." }
      ]
    },
    {
      id: 5,
      scenario: "Your device asks 'Do you want to connect to this network?' for an unknown WiFi",
      choices: [
        { id: "A", text: "Click 'Yes' - it might be faster", correct: false, explanation: "Never connect to unknown networks! Sneaky Sam could be watching!" },
        { id: "B", text: "Click 'No' and ask a grown-up", correct: true, explanation: "Perfect! Always check with adults about unknown networks." },
        { id: "C", text: "Check if you recognize the network name", correct: true, explanation: "Good thinking! Only connect to networks you know are safe." }
      ]
    }
  ]

  // Combined Bad Guy Detector scenarios
  const combinedExamples = [
    {
      id: 1,
      scenario: "You get a message that says 'Click here to claim your free prize!' with a strange link",
      badGuy: "phishy",
      explanation: "Phishy Phil loves trick links and fake prizes to make you click."
    },
    {
      id: 2,
      scenario: "A popup says 'Your files are locked! Pay now to unlock them!'",
      badGuy: "ransom",
      explanation: "Ransom Randy locks files and demands money. Never pay and tell an adult."
    },
    {
      id: 3,
      scenario: "At the airport you see 'Airport_Free_WiFi_2024' and 'Airport_WiFi'",
      badGuy: "sneaky",
      explanation: "Sneaky Sam makes fake WiFi names. Choose official, simple names or ask staff."
    },
    {
      id: 4,
      scenario: "An email says your password expires today and you must log in now on a weird site",
      badGuy: "phishy",
      explanation: "Phishy Phil sends fake login pages to steal passwords."
    },
    {
      id: 5,
      scenario: "Your computer acts weird and you see a scary 'System infected! Download cleaner!' popup",
      badGuy: "ransom",
      explanation: "Ransom Randy uses scary popups to make you install malware."
    },
    {
      id: 6,
      scenario: "Your friend says 'Use this free WiFi: Mall_Free_Internet!'",
      badGuy: "sneaky",
      explanation: "Sneaky Sam lures with 'Free' WiFi. Use your data or ask an adult."
    }
  ]

  const [showFeedback, setShowFeedback] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [showTransition, setShowTransition] = useState(false)
  const [transitionMessage, setTransitionMessage] = useState("")
  
  const [showRansomwareFeedback, setShowRansomwareFeedback] = useState(false)
  const [lastRansomwareAnswerCorrect, setLastRansomwareAnswerCorrect] = useState(false)
  
  const [showSneakySamModal, setShowSneakySamModal] = useState(false)
  const [wifiGameStep, setWifiGameStep] = useState(0)
  const [wifiScore, setWifiScore] = useState(0)
  const [showWifiResult, setShowWifiResult] = useState(false)
  const [showWifiFeedback, setShowWifiFeedback] = useState(false)
  const [lastWifiAnswerCorrect, setLastWifiAnswerCorrect] = useState(false)
  const [wifiDragChoice, setWifiDragChoice] = useState<string | null>(null)
  const [wifiDropActive, setWifiDropActive] = useState(false)

  // Combined Bad Guy Detector state
  const [showCombinedModal, setShowCombinedModal] = useState(false)
  const [combinedStep, setCombinedStep] = useState(0)
  const [combinedScore, setCombinedScore] = useState(0)
  const [showCombinedResult, setShowCombinedResult] = useState(false)
  const [showCombinedFeedback, setShowCombinedFeedback] = useState(false)
  const [lastCombinedAnswerCorrect, setLastCombinedAnswerCorrect] = useState(false)

  const handlePhishingChoice = (isPhishing: boolean) => {
    const currentExample = phishingExamples[phishingGameStep]
    const correct = currentExample.isPhishing === isPhishing
    
    setLastAnswerCorrect(correct)
    setShowFeedback(true)
    
    if (correct) {
      setPhishingScore(prev => prev + 1)
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const goToNextQuestion = () => {
    setShowFeedback(false)
    if (phishingGameStep < phishingExamples.length - 1) {
      const nextStep = phishingGameStep + 1
      const currentType = phishingExamples[phishingGameStep].type
      const nextType = phishingExamples[nextStep].type
      
      // Show transition message if switching between email and website
      if (currentType !== nextType) {
        if (nextType === "website") {
          setTransitionMessage("🌐 Now let's see how Phishy Phil tricks you with FAKE WEBSITES!")
        } else {
          setTransitionMessage("📧 Now let's check some suspicious EMAILS from Phishy Phil!")
        }
        setShowTransition(true)
        // Store the next step to use when user clicks next
        setPhishingGameStep(nextStep)
      } else {
        setPhishingGameStep(nextStep)
      }
    } else {
      setShowPhishingResult(true)
    }
  }

  const continueFromTransition = () => {
    setShowTransition(false)
  }

  const resetPhishingGame = () => {
    setPhishingGameStep(0)
    setPhishingScore(0)
    setShowPhishingResult(false)
    setShowFeedback(false)
    setLastAnswerCorrect(false)
    setShowTransition(false)
    setTransitionMessage("")
  }

  const closePhishyPhilModal = () => {
    setShowPhishyPhilModal(false)
    resetPhishingGame()
  }

  const handleRansomwareChoice = (choiceId: string) => {
    const currentExample = ransomwareExamples[ransomwareGameStep]
    const selectedChoice = currentExample.choices.find(c => c.id === choiceId)
    const correct = selectedChoice?.correct || false
    
    setLastRansomwareAnswerCorrect(correct)
    setShowRansomwareFeedback(true)
    
    if (correct) {
      setRansomwareScore(prev => prev + 1)
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const goToNextRansomwareQuestion = () => {
    setShowRansomwareFeedback(false)
    if (ransomwareGameStep < ransomwareExamples.length - 1) {
      setRansomwareGameStep(ransomwareGameStep + 1)
    } else {
      setShowRansomwareResult(true)
    }
  }

  const resetRansomwareGame = () => {
    setRansomwareGameStep(0)
    setRansomwareScore(0)
    setShowRansomwareResult(false)
    setShowRansomwareFeedback(false)
    setLastRansomwareAnswerCorrect(false)
  }

  const closeRansomRandyModal = () => {
    setShowRansomRandyModal(false)
    resetRansomwareGame()
  }

  const handleWifiChoice = (choiceId: string) => {
    const currentExample = wifiExamples[wifiGameStep]
    const selectedChoice = currentExample.choices.find(c => c.id === choiceId)
    const correct = selectedChoice?.correct || false

    setLastWifiAnswerCorrect(correct)
    setShowWifiFeedback(true)

    if (correct) {
      setWifiScore(prev => prev + 1)
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const onWifiDragStart = (choiceId: string) => {
    setWifiDragChoice(choiceId)
  }

  const onWifiDragOver = (e: any) => {
    e.preventDefault()
    setWifiDropActive(true)
  }

  const onWifiDragLeave = () => {
    setWifiDropActive(false)
  }

  const onWifiDrop = () => {
    if (!wifiDragChoice) return
    setWifiDropActive(false)
    handleWifiChoice(wifiDragChoice)
    setWifiDragChoice(null)
  }

  const goToNextWifiQuestion = () => {
    setShowWifiFeedback(false)
    if (wifiGameStep < wifiExamples.length - 1) {
      setWifiGameStep(wifiGameStep + 1)
    } else {
      setShowWifiResult(true)
    }
  }

  const resetWifiGame = () => {
    setWifiGameStep(0)
    setWifiScore(0)
    setShowWifiResult(false)
    setShowWifiFeedback(false)
    setLastWifiAnswerCorrect(false)
  }

  const closeSneakySamModal = () => {
    setShowSneakySamModal(false)
    resetWifiGame()
  }

  // Auto-open specific bad guy modal when routed to /bad-guys/<slug>
  useEffect(() => {
    if (!pathname) return
    if (pathname.endsWith('/phishy-phil')) {
      setShowPhishyPhilModal(true)
    } else if (pathname.endsWith('/ransom-randy')) {
      setShowRansomRandyModal(true)
    } else if (pathname.endsWith('/sneaky-sam')) {
      setShowSneakySamModal(true)
    }
  }, [pathname])

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
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-red-400 to-pink-500">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="bg-yellow-300 hover:bg-yellow-400 text-purple-800 rounded-full"
              >
                <Link href="/">
                  <ArrowLeft className="h-6 w-6" />
                  <span className="sr-only">Back</span>
                </Link>
              </Button>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md flex items-center gap-2">
                <Sticker emoji="😈" size="lg" /> The Internet Bad Guys!
              </h1>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl sm:text-3xl">👉</span>
              <p className="text-base sm:text-xl text-white font-medium">Watch out for these tricky villains!</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {/* Phishy Phil Card */}
              <div className="bg-white rounded-xl border-8 border-red-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-red-500 p-4 flex justify-center">
                  <div className="bg-white rounded-full p-4 border-4 border-red-300">
                    <span className="text-5xl sm:text-6xl">🎣</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Phishy Phil</h2>
                    <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                      Danger Level: High
                    </div>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg border-2 border-red-200 mb-3">
                    <p className="text-sm sm:text-base text-purple-800 font-medium">
                      Sends fake emails and makes fake websites to steal your passwords!
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border-2 border-red-200">
                      <span className="text-xl sm:text-2xl">📧</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Sends fake emails from games
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border-2 border-red-200">
                      <span className="text-xl sm:text-2xl">🌐</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">Makes fake websites</span>
                    </div>
                  </div>
                </div>
                <div className="bg-red-100 p-3 flex justify-center">
                  <Button 
                    onClick={() => setShowPhishyPhilModal(true)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold border-2 border-red-600"
                  >
                    How To Beat Him!
                  </Button>
                </div>
              </div>

              {/* Ransom Randy Card */}
              <div className="bg-white rounded-xl border-8 border-green-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-green-500 p-4 flex justify-center">
                  <div className="bg-white rounded-full p-4 border-4 border-green-300">
                    <span className="text-5xl sm:text-6xl">🔒</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Ransom Randy</h2>
                    <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                      Danger Level: Very High
                    </div>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg border-2 border-green-200 mb-3">
                    <p className="text-sm sm:text-base text-purple-800 font-medium">
                      Locks up your files and games and demands payment to give them back!
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border-2 border-green-200">
                      <span className="text-xl sm:text-2xl">💾</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">Sneaks into your device</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border-2 border-green-200">
                      <span className="text-xl sm:text-2xl">💰</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">Asks for money</span>
                    </div>
                  </div>
                </div>
                <div className="bg-green-100 p-3 flex justify-center">
                  <Button 
                    onClick={() => setShowRansomRandyModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                  >
                    How To Beat Him!
                  </Button>
                </div>
              </div>

              {/* Sneaky Sam Card */}
              <div className="bg-white rounded-xl border-8 border-blue-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-blue-500 p-4 flex justify-center">
                  <div className="bg-white rounded-full p-4 border-4 border-blue-300">
                    <span className="text-5xl sm:text-6xl">📡</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-center mb-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Sneaky Sam</h2>
                    <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                      Danger Level: Medium
                    </div>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg border-2 border-blue-200 mb-3">
                    <p className="text-sm sm:text-base text-purple-800 font-medium">
                      Hides in public WiFi and spies on what people do online!
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border-2 border-blue-200">
                      <span className="text-xl sm:text-2xl">🔍</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Creates fake WiFi networks
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-white p-2 rounded-lg border-2 border-blue-200">
                      <span className="text-xl sm:text-2xl">👀</span>
                      <span className="text-sm sm:text-base font-medium text-purple-800">
                        Watches what you do online
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-100 p-3 flex justify-center">
                  <Button 
                    onClick={() => setShowSneakySamModal(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600"
                  >
                    How To Beat Him!
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <InteractiveTip
                title="Did You Know?"
                content="Bad guys can't steal your information if you don't share it with them! Always keep your personal info secret."
                emoji="🔍"
              />

              <div className="bg-white p-4 rounded-xl border-4 border-yellow-400 mt-4 flex flex-col sm:flex-row items-center gap-4">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <span className="text-3xl sm:text-4xl">🎮</span>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-purple-800">Play the Bad Guy Detector Game!</h3>
                  <p className="text-sm sm:text-base text-purple-800">
                    Can you spot all the tricks these bad guys use?
                  </p>
                </div>
                <Button onClick={() => setShowCombinedModal(true)} className="w-full sm:w-auto sm:ml-auto bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">
                  Play Now!
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Phishy Phil Modal */}
      {showPhishyPhilModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePhishyPhilModal()
            }
          }}
        >
          <style jsx global>{`
            body {
              overflow: hidden;
            }
          `}</style>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-4xl">🎣</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">How to Beat Phishy Phil!</h2>
                    <p className="text-white/90 font-medium">Learn to spot his tricks and stay safe!</p>
                  </div>
                </div>
                <Button
                  onClick={closePhishyPhilModal}
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {showTransition ? (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-20 h-20 mx-auto flex items-center justify-center animate-bounce">
                    <span className="text-3xl">🎣</span>
                  </div>
                  <div className="bg-yellow-100 border-4 border-yellow-400 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-yellow-800 mb-2">Switching Tactics!</h3>
                    <p className="text-lg text-yellow-700 font-medium mb-4">{transitionMessage}</p>
                    <Button
                      onClick={continueFromTransition}
                      className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-bold border-2 border-yellow-600 px-8 py-3 text-lg"
                    >
                      Let's Go! ➡️
                    </Button>
                  </div>
                </div>
              ) : !showPhishingResult ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">
                      Phishing Detection Challenge!
                    </h3>
                    <p className="text-purple-600 mb-4">
                      Can you spot Phishy Phil's fake emails and websites? 
                      <br />
                      <span className="font-bold">Question {phishingGameStep + 1} of {phishingExamples.length}</span>
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                      <Badge className="bg-green-100 text-green-800">Score: {phishingScore}</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Progress: {phishingGameStep + 1}/{phishingExamples.length}</Badge>
                    </div>
                  </div>

                  <Card className="border-4 border-purple-300 shadow-lg">
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="flex items-center gap-2 text-purple-800">
                        {phishingExamples[phishingGameStep].type === "email" ? "📧 Email" : "🌐 Website"}
                        <span className="text-sm font-normal text-purple-600">
                          From: {phishingExamples[phishingGameStep].sender || "Unknown"}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-4">
                        <p className="text-lg font-medium text-gray-800">
                          {phishingExamples[phishingGameStep].content}
                        </p>
                      </div>
                      
                                             <div className="text-center">
                         {!showFeedback ? (
                           <>
                             <p className="text-purple-800 font-bold mb-4">Is this Phishy Phil trying to trick you?</p>
                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                               <Button
                                 onClick={() => handlePhishingChoice(true)}
                                 className="bg-red-500 hover:bg-red-600 text-white font-bold border-2 border-red-600 px-8 py-3 text-lg"
                               >
                                 🚫 YES - It's a TRAP!
                               </Button>
                               <Button
                                 onClick={() => handlePhishingChoice(false)}
                                 className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600 px-8 py-3 text-lg"
                               >
                                 ✅ NO - It's Safe!
                               </Button>
                             </div>
                           </>
                         ) : (
                           <div className={`p-6 rounded-xl border-4 animate-pulse ${lastAnswerCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
                             <div className="flex items-center justify-center gap-3 mb-3">
                               {lastAnswerCorrect ? (
                                 <CheckCircle2 className="h-8 w-8 text-green-600 animate-bounce" />
                               ) : (
                                 <XCircle className="h-8 w-8 text-red-600 animate-bounce" />
                               )}
                               <span className={`text-xl font-bold ${lastAnswerCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                 {lastAnswerCorrect ? 'CORRECT! 🎉' : 'WRONG! 😅'}
                               </span>
                             </div>
                             <p className="text-sm text-purple-700 mb-3">
                               {phishingExamples[phishingGameStep].explanation}
                             </p>
                             <div className="text-xs text-purple-600 mb-4">
                               {lastAnswerCorrect ? 'Great job spotting the trick!' : 'Don\'t worry, you\'ll get the next one!'}
                             </div>
                             <Button
                               onClick={goToNextQuestion}
                               className={`w-full font-bold border-2 px-8 py-3 text-lg ${
                                 lastAnswerCorrect 
                                   ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' 
                                   : 'bg-purple-500 hover:bg-purple-600 text-white border-purple-600'
                               }`}
                             >
                               {phishingGameStep < phishingExamples.length - 1 ? 'Next Question ➡️' : 'See Results! 🏆'}
                             </Button>
                           </div>
                         )}
                       </div>
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-2">💡 Phishy Phil's Tricks:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Promises free stuff or money</li>
                          <li>• Creates urgency ("Act now!")</li>
                          <li>• Uses fake company names</li>
                          <li>• Asks for passwords or personal info</li>
                          <li>• Has suspicious links or addresses</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                                 <div className="text-center space-y-6">
                   <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                     <span className="text-4xl">
                       {phishingScore <= 4 ? "😅" : "🏆"}
                     </span>
                   </div>
                   
                   <div>
                     <h3 className="text-2xl font-bold text-purple-800 mb-2">
                       {phishingScore === phishingExamples.length ? "Perfect Score! 🎉" : 
                        phishingScore <= 4 ? "You'll Get Him Next Time! 💪" : "Good Job! 👍"}
                     </h3>
                     <p className="text-lg text-purple-600 mb-4">
                       You scored {phishingScore} out of {phishingExamples.length}!
                     </p>
                     <div className={`border-2 rounded-lg p-3 mb-4 ${
                       phishingScore <= 4 ? "bg-orange-50 border-orange-300" : "bg-blue-50 border-blue-300"
                     }`}>
                       <p className={`text-sm font-medium ${
                         phishingScore <= 4 ? "text-orange-800" : "text-blue-800"
                       }`}>
                         {phishingScore <= 4 
                           ? "💡 Don't worry! Phishy Phil is tricky, but you're learning! Try again to get better!" 
                           : `💡 You got ${phishingScore} out of ${phishingExamples.length} questions right!`
                         }
                       </p>
                     </div>
                    
                    {phishingScore === phishingExamples.length && (
                      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 text-green-800 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          You're a Phishy Phil Defeater!
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 mb-3">🛡️ Your Anti-Phishing Powers:</h4>
                    <div className="grid gap-3 text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Never click suspicious links</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Don't share passwords via email</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Check website addresses carefully</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Ask a grown-up if you're unsure</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={resetPhishingGame}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700"
                    >
                      Play Again! 🎮
                    </Button>
                    <Button
                      onClick={closePhishyPhilModal}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                    >
                      I'm Ready! 💪
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Ransom Randy Modal */}
      {showRansomRandyModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeRansomRandyModal()
            }
          }}
        >
          <style jsx global>{`
            body {
              overflow: hidden;
            }
          `}</style>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-4xl">🔒</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">How to Beat Ransom Randy!</h2>
                    <p className="text-white/90 font-medium">Learn to protect your files and games!</p>
                  </div>
                </div>
                <Button
                  onClick={closeRansomRandyModal}
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {!showRansomwareResult ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">
                      Ransomware Defense Challenge!
                    </h3>
                    <p className="text-purple-600 mb-4">
                      Can you outsmart Ransom Randy and protect your computer?
                      <br />
                      <span className="font-bold">Question {ransomwareGameStep + 1} of {ransomwareExamples.length}</span>
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                      <Badge className="bg-green-100 text-green-800">Score: {ransomwareScore}</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Progress: {ransomwareGameStep + 1}/{ransomwareExamples.length}</Badge>
                    </div>
                  </div>

                  <Card className="border-4 border-green-300 shadow-lg">
                    <CardHeader className="bg-green-50">
                      <CardTitle className="flex items-center gap-2 text-green-800">
                        🔒 Scenario {ransomwareGameStep + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-6">
                        <p className="text-lg font-medium text-gray-800">
                          {ransomwareExamples[ransomwareGameStep].scenario}
                        </p>
                      </div>
                      
                      {!showRansomwareFeedback ? (
                        <div className="space-y-3">
                          <p className="text-green-800 font-bold mb-4 text-center">What should you do?</p>
                          {ransomwareExamples[ransomwareGameStep].choices.map((choice) => (
                            <Button
                              key={choice.id}
                              onClick={() => handleRansomwareChoice(choice.id)}
                              className="w-full text-left bg-white hover:bg-gray-50 text-gray-800 font-medium border-2 border-gray-300 p-4 h-auto"
                            >
                              <span className="mr-3 bg-green-200 text-green-900 font-bold rounded-full px-3 py-1">
                                {choice.id}
                              </span>
                              {choice.text}
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <div className={`p-6 rounded-xl border-4 animate-pulse ${
                          lastRansomwareAnswerCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
                        }`}>
                          <div className="flex items-center justify-center gap-3 mb-3">
                            {lastRansomwareAnswerCorrect ? (
                              <CheckCircle2 className="h-8 w-8 text-green-600 animate-bounce" />
                            ) : (
                              <XCircle className="h-8 w-8 text-red-600 animate-bounce" />
                            )}
                            <span className={`text-xl font-bold ${
                              lastRansomwareAnswerCorrect ? 'text-green-800' : 'text-red-800'
                            }`}>
                              {lastRansomwareAnswerCorrect ? 'CORRECT! 🎉' : 'WRONG! 😅'}
                            </span>
                          </div>
                          <p className="text-sm text-purple-700 mb-4">
                            {ransomwareExamples[ransomwareGameStep].choices.find(c => 
                              c.id === (lastRansomwareAnswerCorrect ? 
                                ransomwareExamples[ransomwareGameStep].choices.find(choice => choice.correct)?.id : 
                                'A'
                              )
                            )?.explanation}
                          </p>
                          <div className="text-xs text-purple-600 mb-4">
                            {lastRansomwareAnswerCorrect ? 'Great job protecting your computer!' : 'Don\'t worry, you\'ll get the next one!'}
                          </div>
                          <Button
                            onClick={goToNextRansomwareQuestion}
                            className={`w-full font-bold border-2 px-8 py-3 text-lg ${
                              lastRansomwareAnswerCorrect 
                                ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' 
                                : 'bg-purple-500 hover:bg-purple-600 text-white border-purple-600'
                            }`}
                          >
                            {ransomwareGameStep < ransomwareExamples.length - 1 ? 'Next Question ➡️' : 'See Results! 🏆'}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-2">💡 Ransom Randy's Tricks:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Creates fake virus warnings</li>
                          <li>• Offers free downloads that are actually malware</li>
                          <li>• Locks your files and demands money</li>
                          <li>• Sends infected files in messages</li>
                          <li>• Makes your computer act strangely</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <span className="text-4xl">
                      {ransomwareScore <= 2 ? "😅" : "🏆"}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">
                      {ransomwareScore === ransomwareExamples.length ? "Perfect Score! 🎉" : 
                       ransomwareScore <= 2 ? "You'll Get Him Next Time! 💪" : "Good Job! 👍"}
                    </h3>
                    <p className="text-lg text-purple-600 mb-4">
                      You scored {ransomwareScore} out of {ransomwareExamples.length}!
                    </p>
                    <div className={`border-2 rounded-lg p-3 mb-4 ${
                      ransomwareScore <= 2 ? "bg-orange-50 border-orange-300" : "bg-blue-50 border-blue-300"
                    }`}>
                      <p className={`text-sm font-medium ${
                        ransomwareScore <= 2 ? "text-orange-800" : "text-blue-800"
                      }`}>
                        {ransomwareScore <= 2 
                          ? "💡 Don't worry! Ransom Randy is tricky, but you're learning! Try again to get better!" 
                          : `💡 You got ${ransomwareScore} out of ${ransomwareExamples.length} questions right!`
                        }
                      </p>
                    </div>
                    
                    {ransomwareScore === ransomwareExamples.length && (
                      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 text-green-800 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          You're a Ransom Randy Defeater!
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 mb-3">🛡️ Your Anti-Ransomware Powers:</h4>
                    <div className="grid gap-3 text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Never click suspicious popups</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Only download from official stores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Tell adults about strange computer behavior</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Never pay ransom demands</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={resetRansomwareGame}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700"
                    >
                      Play Again! 🎮
                    </Button>
                    <Button
                      onClick={closeRansomRandyModal}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                    >
                      I'm Ready! 💪
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sneaky Sam Modal */}
      {showSneakySamModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeSneakySamModal()
            }
          }}
        >
          <style jsx global>{`
            body {
              overflow: hidden;
            }
          `}</style>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-4xl">📡</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">How to Beat Sneaky Sam!</h2>
                    <p className="text-white/90 font-medium">Learn to spot fake WiFi networks!</p>
                  </div>
                </div>
                <Button
                  onClick={closeSneakySamModal}
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {!showWifiResult ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">
                      WiFi Security Challenge!
                    </h3>
                    <p className="text-purple-600 mb-4">
                      Can you spot Sneaky Sam's fake WiFi networks?
                      <br />
                      <span className="font-bold">Question {wifiGameStep + 1} of {wifiExamples.length}</span>
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                      <Badge className="bg-blue-100 text-blue-800">Score: {wifiScore}</Badge>
                      <Badge className="bg-cyan-100 text-cyan-800">Progress: {wifiGameStep + 1}/{wifiExamples.length}</Badge>
                    </div>
                  </div>

                  <Card className="border-4 border-blue-300 shadow-lg">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center gap-2 text-blue-800">
                        📡 WiFi Scenario {wifiGameStep + 1}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                          <p className="text-lg font-medium text-gray-800">
                            {wifiExamples[wifiGameStep].scenario}
                          </p>
                        </div>
                        <div>
                          {!showWifiFeedback ? (
                            <div className="space-y-4">
                              <p className="text-blue-800 font-bold text-center">Drag the best action into the target!</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {wifiExamples[wifiGameStep].choices.map((choice) => (
                                  <div
                                    key={choice.id}
                                    draggable
                                    onDragStart={() => onWifiDragStart(choice.id)}
                                    className="select-none cursor-grab active:cursor-grabbing h-auto p-4 text-left bg-white hover:bg-gray-50 text-gray-800 font-medium border-2 border-gray-300 rounded-lg flex items-start gap-3"
                                  >
                                    <span className="bg-blue-200 text-blue-900 font-bold rounded-full px-3 py-1 flex-shrink-0">
                                      {choice.id}
                                    </span>
                                    <span className="leading-snug">{choice.text}</span>
                                  </div>
                                ))}
                              </div>
                              <div
                                onDragOver={onWifiDragOver}
                                onDragLeave={onWifiDragLeave}
                                onDrop={onWifiDrop}
                                className={`mt-4 rounded-xl border-4 p-6 text-center transition-colors ${wifiDropActive ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-dashed border-gray-300'}`}
                              >
                                <div className="flex items-center justify-center gap-3">
                                  <span className="text-xl">🎯</span>
                                  <span className="font-bold text-blue-800">Drop your answer here</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className={`p-6 rounded-xl border-4 animate-pulse ${
                              lastWifiAnswerCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
                            }`}>
                              <div className="flex items-center justify-center gap-3 mb-3">
                                {lastWifiAnswerCorrect ? (
                                  <CheckCircle2 className="h-8 w-8 text-green-600 animate-bounce" />
                                ) : (
                                  <XCircle className="h-8 w-8 text-red-600 animate-bounce" />
                                )}
                                <span className={`text-xl font-bold ${
                                  lastWifiAnswerCorrect ? 'text-green-800' : 'text-red-800'
                                }`}>
                                  {lastWifiAnswerCorrect ? 'CORRECT! 🎉' : 'WRONG! 😅'}
                                </span>
                              </div>
                              <p className="text-sm text-purple-700 mb-4">
                                {wifiExamples[wifiGameStep].choices.find(c => 
                                  c.id === (lastWifiAnswerCorrect ? 
                                    wifiExamples[wifiGameStep].choices.find(choice => choice.correct)?.id : 
                                    'A'
                                  )
                                )?.explanation}
                              </p>
                              <div className="text-xs text-purple-600 mb-4">
                                {lastWifiAnswerCorrect ? 'Great job staying safe on WiFi!' : 'Don\'t worry, you\'ll get the next one!'}
                              </div>
                              <Button
                                onClick={goToNextWifiQuestion}
                                className={`w-full font-bold border-2 px-8 py-3 text-lg ${
                                  lastWifiAnswerCorrect 
                                    ? 'bg-green-500 hover:bg-green-600 text-white border-green-600' 
                                    : 'bg-purple-500 hover:bg-purple-600 text-white border-purple-600'
                                }`}
                              >
                                {wifiGameStep < wifiExamples.length - 1 ? 'Next Question ➡️' : 'See Results! 🏆'}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
                      <div>
                        <h4 className="font-bold text-yellow-800 mb-2">💡 Sneaky Sam's WiFi Tricks:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Creates fake WiFi networks with similar names</li>
                          <li>• Adds 'Free' to network names to attract people</li>
                          <li>• Watches what you do when you connect</li>
                          <li>• Steals passwords and personal information</li>
                          <li>• Hides in public places like malls and airports</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <span className="text-4xl">
                      {wifiScore <= 2 ? "😅" : "🏆"}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">
                      {wifiScore === wifiExamples.length ? "Perfect Score! 🎉" : 
                       wifiScore <= 2 ? "You'll Get Him Next Time! 💪" : "Good Job! 👍"}
                    </h3>
                    <p className="text-lg text-purple-600 mb-4">
                      You scored {wifiScore} out of {wifiExamples.length}!
                    </p>
                    <div className={`border-2 rounded-lg p-3 mb-4 ${
                      wifiScore <= 2 ? "bg-orange-50 border-orange-300" : "bg-blue-50 border-blue-300"
                    }`}>
                      <p className={`text-sm font-medium ${
                        wifiScore <= 2 ? "text-orange-800" : "text-blue-800"
                      }`}>
                        {wifiScore <= 2 
                          ? "💡 Don't worry! Sneaky Sam is tricky, but you're learning! Try again to get better!" 
                          : `💡 You got ${wifiScore} out of ${wifiExamples.length} questions right!`
                        }
                      </p>
                    </div>
                    
                    {wifiScore === wifiExamples.length && (
                      <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 mb-4">
                        <div className="flex items-center gap-2 text-green-800 font-bold">
                          <CheckCircle2 className="h-5 w-5" />
                          You're a Sneaky Sam Defeater!
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 mb-3">🛡️ Your WiFi Security Powers:</h4>
                    <div className="grid gap-3 text-left">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Always ask adults about public WiFi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Choose simple network names over complex ones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Use your own data when possible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-purple-700">Never connect to unknown networks</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={resetWifiGame}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700"
                    >
                      Play Again! 🎮
                    </Button>
                    <Button
                      onClick={closeSneakySamModal}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600"
                    >
                      I'm Ready! 💪
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Combined Bad Guy Detector Modal */}
      {showCombinedModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCombinedModal(false)
              setCombinedStep(0)
              setCombinedScore(0)
              setShowCombinedResult(false)
              setShowCombinedFeedback(false)
            }
          }}
        >
          <style jsx global>{`
            body { overflow: hidden; }
          `}</style>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-3">
                    <span className="text-3xl">🎮</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white">Bad Guy Detector!</h2>
                    <p className="text-white/90 font-medium">Guess which bad guy is behind each scenario.</p>
                  </div>
                </div>
                <Button
                  onClick={() => { setShowCombinedModal(false); setCombinedStep(0); setCombinedScore(0); setShowCombinedResult(false); setShowCombinedFeedback(false); }}
                  variant="ghost"
                  size="icon"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {!showCombinedResult ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-purple-800 mb-2">Who did it?</h3>
                    <p className="text-purple-600 mb-4">
                      Read the scenario and pick the right bad guy.
                      <br />
                      <span className="font-bold">Question {combinedStep + 1} of {combinedExamples.length}</span>
                    </p>
                    <div className="flex justify-center gap-4 mb-4">
                      <Badge className="bg-yellow-100 text-yellow-800">Score: {combinedScore}</Badge>
                      <Badge className="bg-pink-100 text-pink-800">Progress: {combinedStep + 1}/{combinedExamples.length}</Badge>
                    </div>
                  </div>

                  <Card className="border-4 border-yellow-300 shadow-lg">
                    <CardHeader className="bg-yellow-50">
                      <CardTitle className="flex items-center gap-2 text-purple-800">🕵️ Scenario {combinedStep + 1}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-6">
                        <p className="text-lg font-medium text-gray-800">{combinedExamples[combinedStep].scenario}</p>
                      </div>

                      {!showCombinedFeedback ? (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <Button
                            onClick={() => {
                              const correct = combinedExamples[combinedStep].badGuy === 'phishy'
                              setLastCombinedAnswerCorrect(correct)
                              setShowCombinedFeedback(true)
                              if (correct) {
                                setCombinedScore(s => s + 1)
                                confetti({
                                  particleCount: 80,
                                  spread: 70,
                                  origin: { y: 0.6 }
                                })
                              }
                            }}
                            className="h-auto p-4 bg-white hover:bg-gray-50 text-purple-900 font-bold border-2 border-purple-300"
                          >
                            🐟 Phishy Phil
                          </Button>
                          <Button
                            onClick={() => {
                              const correct = combinedExamples[combinedStep].badGuy === 'ransom'
                              setLastCombinedAnswerCorrect(correct)
                              setShowCombinedFeedback(true)
                              if (correct) {
                                setCombinedScore(s => s + 1)
                                confetti({
                                  particleCount: 80,
                                  spread: 70,
                                  origin: { y: 0.6 }
                                })
                              }
                            }}
                            className="h-auto p-4 bg-white hover:bg-gray-50 text-green-900 font-bold border-2 border-green-300"
                          >
                            🔒 Ransom Randy
                          </Button>
                          <Button
                            onClick={() => {
                              const correct = combinedExamples[combinedStep].badGuy === 'sneaky'
                              setLastCombinedAnswerCorrect(correct)
                              setShowCombinedFeedback(true)
                              if (correct) {
                                setCombinedScore(s => s + 1)
                                confetti({
                                  particleCount: 80,
                                  spread: 70,
                                  origin: { y: 0.6 }
                                })
                              }
                            }}
                            className="h-auto p-4 bg-white hover:bg-gray-50 text-blue-900 font-bold border-2 border-blue-300"
                          >
                            📡 Sneaky Sam
                          </Button>
                        </div>
                      ) : (
                        <div className={`p-6 rounded-xl border-4 animate-pulse ${lastCombinedAnswerCorrect ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'}`}>
                          <div className="flex items-center justify-center gap-3 mb-3">
                            {lastCombinedAnswerCorrect ? (
                              <CheckCircle2 className="h-8 w-8 text-green-600 animate-bounce" />
                            ) : (
                              <XCircle className="h-8 w-8 text-red-600 animate-bounce" />
                            )}
                            <span className={`text-xl font-bold ${lastCombinedAnswerCorrect ? 'text-green-800' : 'text-red-800'}`}>
                              {lastCombinedAnswerCorrect ? 'CORRECT! 🎉' : 'WRONG! 😅'}
                            </span>
                          </div>
                          <p className="text-sm text-purple-700 mb-4">
                            {combinedExamples[combinedStep].explanation}
                          </p>
                          <Button
                            onClick={() => {
                              setShowCombinedFeedback(false)
                              if (combinedStep < combinedExamples.length - 1) {
                                setCombinedStep(combinedStep + 1)
                              } else {
                                setShowCombinedResult(true)
                              }
                            }}
                            className="w-full font-bold border-2 px-8 py-3 text-lg bg-purple-500 hover:bg-purple-600 text-white border-purple-600"
                          >
                            {combinedStep < combinedExamples.length - 1 ? 'Next Question ➡️' : 'See Results! 🏆'}
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                    <span className="text-4xl">{combinedScore <= 2 ? '😅' : '🏆'}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-purple-800 mb-2">
                      {combinedScore === combinedExamples.length ? 'Perfect Score! 🎉' : combinedScore <= 2 ? "You'll Get Them Next Time! 💪" : 'Great Job! 👍'}
                    </h3>
                    <p className="text-lg text-purple-600 mb-4">You scored {combinedScore} out of {combinedExamples.length}!</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => { setCombinedStep(0); setCombinedScore(0); setShowCombinedResult(false); setShowCombinedFeedback(false); }}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700"
                    >
                      Play Again! 🎮
                    </Button>
                    <Button
                      onClick={() => setShowCombinedModal(false)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                    >
                      I'm Ready! 💪
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
