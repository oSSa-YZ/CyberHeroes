"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Shield, Gamepad2, Trophy, Star, Lock, Fish, UserCheck, CheckCircle } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { useEffect as useEffectProgress, useState } from "react"
import { AuthButtons } from "@/components/auth-buttons"
import { logProgressOnce } from "@/lib/progress-client"

function BadgesPanel() {
  const [earned, setEarned] = useState<Set<string>>(new Set())
  useEffectProgress(() => {
    fetch('/api/progress/my-badges').then(r => r.json()).then(d => {
      if (d?.ok && d?.badges?.earned) setEarned(new Set(d.badges.earned))
    }).catch(()=>{})
  }, [])

  const BadgeChip = ({ id, label, emoji }: { id: string; label: string; emoji: string }) => {
    const has = earned.has(id)
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-full border-2 ${has ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'}`}>
        <span className="text-xl">{emoji}</span>
        <span className={`text-sm font-bold ${has ? 'text-green-800' : 'text-gray-600'}`}>{label}</span>
        {has && <CheckCircle className="h-4 w-4 text-green-600" />}
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      <div className="bg-white border-8 border-yellow-500 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-yellow-500 p-4 flex flex-col items-center">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white border-4 border-yellow-600 flex items-center justify-center mb-2">
            <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-600" />
          </div>
          <h3 className="text-lg sm:text-xl text-white font-extrabold">Beginner Badges</h3>
        </div>
        <div className="p-4 space-y-2">
          <BadgeChip id="beginner.passwordStarter" label="Password Starter" emoji="🔑" />
          <BadgeChip id="beginner.phishSpotter" label="Phish Spotter" emoji="🎣" />
          <BadgeChip id="beginner.firstLogin" label="First Login" emoji="👤" />
        </div>
      </div>

      <div className="bg-white border-8 border-blue-500 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-blue-500 p-4 flex flex-col items-center">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center mb-2">
            <Star className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />
          </div>
          <h3 className="text-lg sm:text-xl text-white font-extrabold">Advanced Badges</h3>
        </div>
        <div className="p-4 space-y-2">
          <BadgeChip id="advanced.passwordPro" label="Password Pro" emoji="🔒" />
          <BadgeChip id="advanced.phishDetective" label="Phishing Detective" emoji="🕵️" />
          <BadgeChip id="advanced.quizChampion" label="Quiz Champion" emoji="🏆" />
        </div>
      </div>

      <div className="bg-white border-8 border-purple-500 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-purple-500 p-4 flex flex-col items-center">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white border-4 border-purple-600 flex items-center justify-center mb-2">
            <span className="text-3xl sm:text-4xl">👑</span>
          </div>
          <h3 className="text-lg sm:text-xl text-white font-extrabold">Hero Badges</h3>
        </div>
        <div className="p-4 space-y-2">
          <BadgeChip id="hero.tripleThreat" label="Triple Threat" emoji="🌟" />
        </div>
      </div>
    </div>
  )
}

export default function GamesPage() {
  useEffectProgress(() => {
    logProgressOnce('games : visited')
  }, [])

  const [progress, setProgress] = useState({
    quizCompleted: false,
    gamesPlayed: 0,
    activitiesDone: 0
  })

  useEffectProgress(() => {
    // Populate progress cards
    fetch('/api/progress/summary', { method: 'POST' })
      .then(r => r.json()).then(d => {
        if (!d?.ok) return
        setProgress({
          quizCompleted: d.progress.quizCompleted,
          gamesPlayed: d.progress.gamesPlayed,
          activitiesDone: d.progress.activitiesDone
        })
      }).catch(()=>{})
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
        <section className="w-full py-8 md:py-12 bg-brand-gradient">
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
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-white drop-shadow-md">
                Cyber Hero Games! 🎮
              </h1>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl sm:text-3xl">👉</span>
              <p className="text-base sm:text-xl text-white font-medium">Play and learn how to stay safe online!</p>
            </div>

            <Tabs defaultValue="games" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-purple-100 p-2 gap-2 mb-6">
                <TabsTrigger
                  value="games"
                  className="bg-white data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg font-bold text-purple-800 border-2 border-purple-300 data-[state=active]:border-purple-700 flex items-center gap-2"
                >
                  <span className="text-lg sm:text-xl">🎮</span> Games
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="bg-white data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg font-bold text-purple-800 border-2 border-purple-300 data-[state=active]:border-purple-700 flex items-center gap-2"
                >
                  <span className="text-lg sm:text-xl">🎨</span> Activities
                </TabsTrigger>
                <TabsTrigger
                  value="badges"
                  className="bg-white data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg font-bold text-purple-800 border-2 border-purple-300 data-[state=active]:border-purple-700 flex items-center gap-2"
                >
                  <span className="text-lg sm:text-xl">🏆</span> Badges
                </TabsTrigger>
              </TabsList>

              <TabsContent value="games" className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white border-8 border-blue-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="relative">
                      <div className="w-full h-40 relative overflow-hidden">
                        <Image
                          src="/images/phishing-game.png"
                          alt="Phishing Detective Game"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                        Ages 8-12
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                        <h3 className="text-base sm:text-lg text-purple-800 font-extrabold">Phishing Detective</h3>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 font-bold border-0">Beginner</Badge>
                      <div className="mt-2">
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600" asChild>
                          <Link href="/games/phishing-detective">Play Now!</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-8 border-green-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="relative">
                      <div className="w-full h-40 relative overflow-hidden">
                        <Image
                          src="/images/password-game.png"
                          alt="Password Protector Game"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                        Ages 9-12
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        <h3 className="text-base sm:text-lg text-purple-800 font-extrabold">Password Protector</h3>
                      </div>
                      <Badge className="bg-green-100 text-green-800 font-bold border-0">Level 2</Badge>
                      <div className="mt-2">
                        <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600" asChild>
                          <Link href="/games/password-protector">Play Now!</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-8 border-purple-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="relative">
                      <div className="w-full h-40 relative overflow-hidden">
                        <Image
                          src="/images/defender-game.png"
                          alt="Cyber Defender Game"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                        Ages 10-12
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                        <h3 className="text-base sm:text-lg text-purple-800 font-extrabold">Cyber Defender</h3>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 font-bold border-0">Advanced</Badge>
                      <div className="mt-2">
                        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold border-2 border-purple-600" asChild>
                          <Link href="/games/digital-footprint-cleanup">Play Now!</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Cyber Hero Quiz moved earlier to be bottom-left of second row */}
                  <div className="bg-white border-8 border-pink-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="relative">
                      <div className="w-full h-40 relative overflow-hidden">
                        <Image src="/images/quiz-game.png" alt="Cyber Hero Quiz" fill className="object-contain" />
                      </div>
                      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                        Ages 8-12
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                        <h3 className="text-base sm:text-lg text-purple-800 font-extrabold">Cyber Hero Quiz</h3>
                      </div>
                      <Badge className="bg-pink-100 text-pink-800 font-bold border-0">All Levels</Badge>
                      <div className="mt-2">
                        <Button
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold border-2 border-pink-600"
                          asChild
                        >
                          <Link href="/quiz">Play Now!</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Patrol - Coming Soon */}
                  <div className="bg-white border-8 border-red-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 relative cursor-not-allowed">
                    <div className="absolute inset-0 bg-white/60 z-10"></div>
                    <div className="absolute top-0 left-0 right-0 z-20 bg-black/70 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider py-1 text-center">Coming Soon</div>
                    <div className="relative">
                      <div className="w-full h-40 relative overflow-hidden">
                        <Image
                          src="/images/privacy-game.png"
                          alt="Privacy Patrol Game"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                        Ages 8-12
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                        <h3 className="text-base sm:text-lg text-purple-800 font-extrabold">Privacy Patrol</h3>
                      </div>
                      <Badge className="bg-red-100 text-red-800 font-bold border-0">Multiplayer</Badge>
                      <div className="mt-2">
                        <Button disabled className="w-full bg-red-300 text-white font-bold border-2 border-red-400 cursor-not-allowed">Coming Soon</Button>
                      </div>
                    </div>
                  </div>

                  {/* Malware Monsters - Coming Soon */}
                  <div className="bg-white border-8 border-orange-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 relative cursor-not-allowed">
                    <div className="absolute inset-0 bg-white/60 z-10"></div>
                    <div className="absolute top-0 left-0 right-0 z-20 bg-black/70 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider py-1 text-center">Coming Soon</div>
                    <div className="relative">
                      <div className="w-full h-40 relative overflow-hidden">
                        <Image
                          src="/images/malware-game.png"
                          alt="Malware Monsters Game"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 animate-pulse">
                        Ages 9-12
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Gamepad2 className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                        <h3 className="text-base sm:text-lg text-purple-800 font-extrabold">Malware Monsters</h3>
                      </div>
                      <Badge className="bg-orange-100 text-orange-800 font-bold border-0">Action Game</Badge>
                      <div className="mt-2">
                        <Button disabled className="w-full bg-orange-300 text-white font-bold border-2 border-orange-400 cursor-not-allowed">Coming Soon</Button>
                      </div>
                    </div>
                  </div>

                </div>
              </TabsContent>

              <TabsContent value="activities" className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-white border-8 border-purple-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="bg-purple-500 p-3 text-center">
                      <h3 className="text-lg sm:text-xl text-white font-extrabold flex items-center justify-center gap-2">
                        <span className="text-xl sm:text-2xl">🎨</span> Create a Cyber Safety Poster
                      </h3>
                    </div>
                    <div className="p-4 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="bg-purple-100 p-3 rounded-full">
                          <span className="text-3xl sm:text-4xl">🖌️</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold border-2 border-purple-600" asChild>
                          <Link href="/games/activities/drawing">Start Drawing!</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-8 border-blue-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="bg-blue-500 p-3 text-center">
                      <h3 className="text-lg sm:text-xl text-white font-extrabold flex items-center justify-center gap-2">
                        <span className="text-xl sm:text-2xl">🔑</span> Password Challenge
                      </h3>
                    </div>
                    <div className="p-4 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <span className="text-3xl sm:text-4xl">🔒</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600" asChild>
                          <Link href="/games/activities/password-challenge">Try Challenge!</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-8 border-green-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                    <div className="bg-green-500 p-3 text-center">
                      <h3 className="text-lg sm:text-xl text-white font-extrabold flex items-center justify-center gap-2">
                        <span className="text-xl sm:text-2xl">📱</span> Device Security Checklist
                      </h3>
                    </div>
                    <div className="p-4 text-center">
                      <div className="flex justify-center mb-3">
                        <div className="bg-green-100 p-3 rounded-full">
                          <span className="text-3xl sm:text-4xl">✅</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600" asChild>
                          <Link href="/games/activities/device-checklist">Get Checklist!</Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-8 border-orange-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 relative cursor-not-allowed">
                    <div className="absolute inset-0 bg-white/60 z-10"></div>
                    <div className="absolute top-0 left-0 right-0 z-20 bg-black/70 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider py-1 text-center">Coming Soon</div>
                    <div className="bg-orange-500 p-3 text-center">
                      <h3 className="text-lg sm:text-xl text-white font-extrabold flex items-center justify-center gap-2">
                        <span className="text-xl sm:text-2xl">📚</span> Cyber Hero Comic Creator
                      </h3>
                    </div>
                    <div className="p-4 text-center relative z-0">
                      <div className="flex justify-center mb-3">
                        <div className="bg-orange-100 p-3 rounded-full">
                          <span className="text-3xl sm:text-4xl">🦸‍♀️</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Button disabled className="bg-orange-300 text-white font-bold border-2 border-orange-400 cursor-not-allowed">
                          Coming Soon
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="badges" className="space-y-6">
                <BadgesPanel />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-8 bg-yellow-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
              <div className="inline-block bg-purple-600 px-6 py-2 rounded-full border-4 border-purple-700 shadow-md">
                <h2 className="text-xl sm:text-2xl font-extrabold text-yellow-300">Get Your Certificate! 🏆</h2>
              </div>
            </div>

            <div className="bg-white border-8 border-purple-500 rounded-xl p-4 max-w-md mx-auto shadow-xl">
              <div className="text-center mb-4">
                <h3 className="text-lg sm:text-xl font-extrabold text-purple-800">Your Progress</h3>
              </div>

              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-3 rounded-lg border-2 ${/* quiz */''} bg-blue-50 border-blue-200`}>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <span className="text-lg sm:text-xl">1️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-purple-800">Complete Quiz</h4>
                  </div>
                  <Badge className={`font-bold ${progress.quizCompleted ? 'bg-green-500 text-white' : 'bg-yellow-400 text-purple-800'}`}>
                    {progress.quizCompleted ? 'Done' : 'Not Done'}
                  </Badge>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg border-2 bg-green-50 border-green-200`}>
                  <div className="bg-green-100 p-2 rounded-full">
                    <span className="text-lg sm:text-xl">2️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-purple-800">Play 3 Games</h4>
                  </div>
                  <Badge className={`font-bold ${progress.gamesPlayed >= 3 ? 'bg-green-500 text-white' : 'bg-yellow-400 text-purple-800'}`}>
                    {progress.gamesPlayed >= 3 ? 'Done' : `${progress.gamesPlayed} of 3`}
                  </Badge>
                </div>

                <div className={`flex items-center gap-3 p-3 rounded-lg border-2 bg-purple-50 border-purple-200`}>
                  <div className="bg-purple-100 p-2 rounded-full">
                    <span className="text-lg sm:text-xl">3️⃣</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-bold text-purple-800">Do 2 Activities</h4>
                  </div>
                  <Badge className={`font-bold ${progress.activitiesDone >= 2 ? 'bg-green-500 text-white' : 'bg-yellow-400 text-purple-800'}`}>
                    {progress.activitiesDone >= 2 ? 'Done' : `${progress.activitiesDone} of 2`}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-4 border-purple-700 shadow-lg" asChild>
                  <Link href="/profile">Check Progress</Link>
                </Button>
              </div>
            </div>
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
