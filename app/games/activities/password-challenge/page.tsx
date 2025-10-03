"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Shield, Eye, EyeOff, CheckCircle, XCircle, AlertTriangle, Zap, ArrowLeft } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth-buttons"
import confetti from "canvas-confetti"

export default function PasswordChallengePage() {
  useEffect(() => { try { (window as any).fetch && fetch('/api/progress/log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'activities : visited', payload: { page: 'password-challenge' } }) }) } catch {} }, [])
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [score, setScore] = useState(0)
  const [challengeCompleted, setChallengeCompleted] = useState(false)

  const checkPasswordStrength = (pass: string) => {
    let strength = 0
    const feedback = []

    if (pass.length >= 8) {
      strength += 1
      feedback.push("✅ At least 8 characters")
    } else {
      feedback.push("❌ Need at least 8 characters")
    }

    if (/[a-z]/.test(pass)) {
      strength += 1
      feedback.push("✅ Contains lowercase letter")
    } else {
      feedback.push("❌ Need lowercase letter")
    }

    if (/[A-Z]/.test(pass)) {
      strength += 1
      feedback.push("✅ Contains uppercase letter")
    } else {
      feedback.push("❌ Need uppercase letter")
    }

    if (/[0-9]/.test(pass)) {
      strength += 1
      feedback.push("✅ Contains number")
    } else {
      feedback.push("❌ Need number")
    }

    if (/[^A-Za-z0-9]/.test(pass)) {
      strength += 1
      feedback.push("✅ Contains special character")
    } else {
      feedback.push("❌ Need special character")
    }

    if (pass.length >= 12) {
      strength += 1
      feedback.push("✅ Extra long (12+ characters)")
    }

    return { strength, feedback }
  }

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return "text-red-600 bg-red-100"
    if (strength <= 3) return "text-orange-600 bg-orange-100"
    if (strength <= 4) return "text-yellow-600 bg-yellow-100"
    if (strength <= 5) return "text-green-600 bg-green-100"
    return "text-blue-600 bg-blue-100"
  }

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return "Very Weak"
    if (strength <= 3) return "Weak"
    if (strength <= 4) return "Fair"
    if (strength <= 5) return "Good"
    return "Excellent"
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    if (value.length > 0) {
      const { strength } = checkPasswordStrength(value)
      setScore(strength)
    } else {
      setScore(0)
    }
  }

  const generateStrongPassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz"
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    
    let newPassword = ""
    newPassword += lowercase[Math.floor(Math.random() * lowercase.length)]
    newPassword += uppercase[Math.floor(Math.random() * uppercase.length)]
    newPassword += numbers[Math.floor(Math.random() * numbers.length)]
    newPassword += symbols[Math.floor(Math.random() * symbols.length)]
    
    // Fill remaining length with random characters
    const allChars = lowercase + uppercase + numbers + symbols
    for (let i = 4; i < 12; i++) {
      newPassword += allChars[Math.floor(Math.random() * allChars.length)]
    }
    
    // Shuffle the password
    newPassword = newPassword.split('').sort(() => Math.random() - 0.5).join('')
    
    setPassword(newPassword)
    const { strength } = checkPasswordStrength(newPassword)
    setScore(strength)
  }

  const completeChallenge = () => {
    if (score >= 5) {
      setChallengeCompleted(true)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const { strength, feedback } = checkPasswordStrength(password)

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
        <section className="w-full py-8 md:py-12 bg-brand-gradient min-h-[calc(100vh-4rem)]">
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
                Password Challenge! 🔑
              </h1>
              <div className="mt-2">
                <Badge className="bg-blue-100 text-blue-800 font-bold border-0">Security Activity</Badge>
              </div>
              <p className="text-white mt-4 text-lg">Test your password strength and learn to create super secure passwords!</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Password Input Section */}
              <div className="bg-white border-8 border-blue-500 rounded-xl p-6 shadow-xl">
                <h2 className="text-blue-800 font-extrabold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5" /> Test Your Password
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-bold text-blue-800 mb-2">Enter a password:</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      placeholder="Type your password here..."
                      className="pr-12 text-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <Button 
                    onClick={generateStrongPassword}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                  >
                    <Zap className="h-4 w-4 mr-2" /> Generate Strong Password
                  </Button>
                </div>

                {password && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-blue-800">Strength:</span>
                      <Badge className={`font-bold ${getStrengthColor(strength)}`}>
                        {getStrengthText(strength)}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${
                          strength <= 2 ? 'bg-red-500' :
                          strength <= 3 ? 'bg-orange-500' :
                          strength <= 4 ? 'bg-yellow-500' :
                          strength <= 5 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${(strength / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Feedback Section */}
              <div className="bg-white border-8 border-green-500 rounded-xl p-6 shadow-xl">
                <h2 className="text-green-800 font-extrabold mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" /> Password Analysis
                </h2>

                {password ? (
                  <div className="space-y-3">
                    {feedback.map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Shield className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Enter a password to see the analysis!</p>
                  </div>
                )}

                {password && score >= 5 && !challengeCompleted && (
                  <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
                      <CheckCircle className="h-5 w-5" />
                      Great job! Your password is strong!
                    </div>
                    <Button 
                      onClick={completeChallenge}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold"
                    >
                      Complete Challenge! 🏆
                    </Button>
                  </div>
                )}

                {challengeCompleted && (
                  <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-800 font-bold mb-2">
                      <CheckCircle className="h-5 w-5" />
                      Challenge Completed! 🎉
                    </div>
                    <div className="relative">
                      <div className="absolute top-6 left-6 bg-yellow-400 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 rotate-12 animate-bounce z-10">
                        Champion!
                      </div>
                      <div className="absolute bottom-6 right-6 bg-pink-400 text-white font-bold px-4 py-2 rounded-full border-2 border-pink-500 -rotate-12 animate-bounce z-10">
                        Master!
                      </div>
                    </div>
                    <p className="text-blue-700 text-sm">You've mastered password security!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-white border-8 border-purple-500 rounded-xl p-6 shadow-xl max-w-4xl mx-auto">
              <h2 className="text-purple-800 font-extrabold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Password Security Tips
              </h2>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-800">Use a mix of characters</h4>
                      <p className="text-sm text-gray-600">Combine letters, numbers, and symbols</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-800">Make it long</h4>
                      <p className="text-sm text-gray-600">Aim for at least 12 characters</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-800">Avoid personal info</h4>
                      <p className="text-sm text-gray-600">Don't use names, birthdays, or addresses</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-800">Don't reuse passwords</h4>
                      <p className="text-sm text-gray-600">Use unique passwords for each account</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-800">Avoid common words</h4>
                      <p className="text-sm text-gray-600">Stay away from "password" or "123456"</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-purple-800">Don't share passwords</h4>
                      <p className="text-sm text-gray-600">Keep your passwords private and secure</p>
                    </div>
                  </div>
                </div>
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
