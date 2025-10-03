"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useEffect as useEffectProgress } from "react"
import { ArrowLeft, CheckCircle, XCircle, Shield } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth-buttons"
import confetti from "canvas-confetti"
import { logProgressOnce } from "@/lib/progress-client"

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/progress-dashboard", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
  ]

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  // Log visit and completion to progress API
  useEffectProgress(() => {
    logProgressOnce('quiz : visited')
  }, [])

  const questions = [
    {
      question: "Oh no! You got an email saying your game account will be deleted. What should you do?",
      options: [
        {
          text: "Click the link right away!",
          emoji: "🖱️",
          isCorrect: false,
        },
        {
          text: "Ask a grown-up for help",
          emoji: "👨‍👩‍👧‍👦",
          isCorrect: true,
        },
        {
          text: "Share your password",
          emoji: "🔑",
          isCorrect: false,
        },
        {
          text: "Ignore it completely",
          emoji: "🙈",
          isCorrect: false,
        },
      ],
      explanation:
        "Always ask a grown-up when you get scary messages. Real game companies don't send threatening emails!",
      tip: "Phishy Phil tries to scare you with fake urgent messages!",
    },
    {
      question: "Your game asks you to turn on 2-step login (2FA). What should you do?",
      options: [
        {
          text: "Turn it on to be extra safe",
          emoji: "🛡️",
          isCorrect: true,
        },
        {
          text: "Turn it off, it's annoying",
          emoji: "🙅",
          isCorrect: false,
        },
        {
          text: "Share the code with friends",
          emoji: "📤",
          isCorrect: false,
        },
        {
          text: "Use the same code every time",
          emoji: "🔁",
          isCorrect: false,
        },
      ],
      explanation: "2-step login (2FA) keeps your account safe even if someone knows your password!",
      tip: "Hero tip: Codes from apps or texts should never be shared!",
    },
    {
      question: "Your tablet says: 'Update available'. What should you do?",
      options: [
        {
          text: "Install updates when allowed",
          emoji: "⬇️",
          isCorrect: true,
        },
        {
          text: "Ignore every update",
          emoji: "🙈",
          isCorrect: false,
        },
        {
          text: "Delete all apps instead",
          emoji: "🗑️",
          isCorrect: false,
        },
        {
          text: "Click random pop-ups for updates",
          emoji: "📢",
          isCorrect: false,
        },
      ],
      explanation: "Updates fix bugs and close security holes so villains can't sneak in!",
      tip: "Ask a grown-up if you're unsure about an update pop-up.",
    },
    {
      question: "A website says: 'Download this secret cheat tool!' What now?",
      options: [
        {
          text: "Don't download it",
          emoji: "🚫",
          isCorrect: true,
        },
        {
          text: "Download and run it",
          emoji: "💾",
          isCorrect: false,
        },
        {
          text: "Send it to everyone",
          emoji: "📣",
          isCorrect: false,
        },
        {
          text: "Give it your password",
          emoji: "🔑",
          isCorrect: false,
        },
      ],
      explanation: "Cheat tools often hide malware that can steal your stuff.",
      tip: "Only download apps from trusted stores with a grown-up's help!",
    },
    {
      question: "You're on public Wi‑Fi at a cafe. Which is safest?",
      options: [
        {
          text: "Avoid logging into important accounts",
          emoji: "☕",
          isCorrect: true,
        },
        {
          text: "Share personal info freely",
          emoji: "🗣️",
          isCorrect: false,
        },
        {
          text: "Turn off your device security",
          emoji: "📴",
          isCorrect: false,
        },
        {
          text: "Tell strangers your passwords",
          emoji: "🤐",
          isCorrect: false,
        },
      ],
      explanation: "Public Wi‑Fi can be risky. Save logins for trusted networks.",
      tip: "Use cellular data or wait until you're on a safe network.",
    },
    {
      question: "Someone is being mean to you online. What's the best move?",
      options: [
        {
          text: "Tell a trusted adult and block/report",
          emoji: "🧑‍🏫",
          isCorrect: true,
        },
        {
          text: "Be mean back",
          emoji: "😡",
          isCorrect: false,
        },
        {
          text: "Share their messages with everyone",
          emoji: "📤",
          isCorrect: false,
        },
        {
          text: "Give them your info to make peace",
          emoji: "🤝",
          isCorrect: false,
        },
      ],
      explanation: "Block, report, and talk to a grown-up. You don't have to face it alone!",
      tip: "Save screenshots if you can, then block and report.",
    },
    {
      question: "Which is a smart way to remember strong passwords?",
      options: [
        {
          text: "Use a password manager with help",
          emoji: "📔",
          isCorrect: true,
        },
        {
          text: "Use the same password everywhere",
          emoji: "🔁",
          isCorrect: false,
        },
        {
          text: "Write it on your backpack",
          emoji: "🎒",
          isCorrect: false,
        },
        {
          text: "Tell your friends so they remember",
          emoji: "🗣️",
          isCorrect: false,
        },
      ],
      explanation: "Password managers help keep long, strong passwords safe and easy to use.",
      tip: "Never reuse passwords. Make each one unique like a hero badge!",
    },
    {
      question: "Your friend sends you a link for free game money. What should you do?",
      options: [
        {
          text: "Click it fast!",
          emoji: "⚡",
          isCorrect: false,
        },
        {
          text: "Share it with friends",
          emoji: "👭",
          isCorrect: false,
        },
        {
          text: "Don't click it",
          emoji: "🛑",
          isCorrect: true,
        },
        {
          text: "Enter your password",
          emoji: "🔓",
          isCorrect: false,
        },
      ],
      explanation: "Free game money offers are almost always tricks! Even messages from friends can be scams.",
      tip: "If it sounds too good to be true, it probably is!",
    },
    {
      question: "Which password is the strongest?",
      options: [
        {
          text: "password123",
          emoji: "👎",
          isCorrect: false,
        },
        {
          text: "my_pet_dog",
          emoji: "🐕",
          isCorrect: false,
        },
        {
          text: "R0ck3t$h!p_Bl@st!",
          emoji: "🚀",
          isCorrect: true,
        },
        {
          text: "12345678",
          emoji: "🔢",
          isCorrect: false,
        },
      ],
      explanation: "Strong passwords use a mix of UPPERCASE, lowercase, numb3rs, and $ymb0l$!",
      tip: "Password Peeper can't guess complicated passwords!",
    },
    {
      question: "Someone online asks for your real name and school. What do you do?",
      options: [
        {
          text: "Tell them everything",
          emoji: "🗣️",
          isCorrect: false,
        },
        {
          text: "Never share personal info",
          emoji: "🤐",
          isCorrect: true,
        },
        {
          text: "Give just your address",
          emoji: "🏠",
          isCorrect: false,
        },
        {
          text: "Ask for their info first",
          emoji: "🔄",
          isCorrect: false,
        },
      ],
      explanation: "Keep your personal info secret! Never share your address, name, school, or phone number online.",
      tip: "Tricky Tina pretends to be your friend to get your information!",
    },
    {
      question: "A website looks like your favorite game site but something seems weird. What do you do?",
      options: [
        {
          text: "Log in anyway",
          emoji: "🤷‍♂️",
          isCorrect: false,
        },
        {
          text: "Close it and ask for help",
          emoji: "❓",
          isCorrect: true,
        },
        {
          text: "Try a different password",
          emoji: "🔐",
          isCorrect: false,
        },
        {
          text: "Share with friends",
          emoji: "📲",
          isCorrect: false,
        },
      ],
      explanation: "Trust your instincts! If something seems off about a website, it might be a fake copy!",
      tip: "Phishy Phil makes fake websites that look almost like the real ones!",
    },
  ]

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleCheckAnswer = () => {
    const currentQ = questions[currentQuestion]
    const selectedOption = currentQ.options.find((option) => option.text === selectedAnswer)
    const correct = selectedOption?.isCorrect || false

    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore(score + 1)
      setShowConfetti(true)
    }
  }

  const handleNextQuestion = () => {
    // Only proceed to the next question if the answer is correct
    if (isCorrect) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer("")
        setShowFeedback(false)
      } else {
        setShowResult(true)
        setShowConfetti(true)
        try { logProgressOnce('quiz : completed', { score }) } catch {}
      }
    } else {
      // If answer is wrong, allow the user to try again
      setShowFeedback(false)
      setSelectedAnswer("")
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setShowResult(false)
    setScore(0)
    setShowFeedback(false)
  }

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
      <main className="flex-1 bg-gradient-to-b from-purple-100 to-blue-100">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center gap-2 mb-6">
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
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-purple-800 bg-yellow-300 px-4 py-1 rounded-lg border-4 border-yellow-400 shadow-md">
              Cyber Hero Quiz! 🎮
            </h1>
          </div>

          <div className="max-w-2xl mx-auto">
            {!showResult ? (
              <Card className="border-8 border-purple-500 shadow-xl bg-white rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
                    <div className="text-base sm:text-lg font-bold bg-yellow-300 text-purple-800 px-3 py-1 rounded-full">
                      Question {currentQuestion + 1} of {questions.length}
                    </div>
                    <div className="text-base sm:text-lg font-bold bg-yellow-300 text-purple-800 px-3 py-1 rounded-full flex items-center gap-1">
                      <span className="text-xl">⭐</span> Score: {score}
                    </div>
                  </div>
                  <Progress
                    value={(currentQuestion / questions.length) * 100}
                    className="h-4 bg-purple-200"
                    indicatorClassName="bg-yellow-400"
                  />
                  <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-bold">
                    {questions[currentQuestion].question}
                  </h2>
                </div>
                <div className="p-4">
                  <RadioGroup
                    value={selectedAnswer}
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                    disabled={showFeedback && isCorrect}
                  >
                    {questions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 p-3 rounded-md border-2 
                          ${
                            showFeedback && option.isCorrect
                              ? "border-green-400 bg-green-50"
                              : showFeedback && selectedAnswer === option.text && !option.isCorrect
                                ? "border-red-400 bg-red-50"
                                : "border-purple-200 hover:bg-purple-50 hover:border-purple-400"
                          } 
                          transition-colors cursor-pointer`}
                      >
                        <RadioGroupItem
                          value={option.text}
                          id={`option-${index}`}
                          className={`${
                            option.isCorrect && showFeedback
                              ? "text-green-600"
                              : !option.isCorrect && showFeedback && selectedAnswer === option.text
                                ? "text-red-600"
                                : "text-purple-600"
                          }`}
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="flex-1 cursor-pointer py-2 font-bold text-purple-800 flex items-center gap-2"
                        >
                          <span className="text-xl sm:text-2xl">{option.emoji}</span>
                          <span className="text-sm sm:text-base">{option.text}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {showFeedback && (
                    <div
                      className={`mt-6 p-4 rounded-lg border-4 ${isCorrect ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"}`}
                    >
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <>
                            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            <span className="font-extrabold text-green-600 text-sm sm:text-base">
                              CORRECT! Great job!
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            <span className="font-extrabold text-red-600 text-sm sm:text-base">
                              Oops! Not quite right. Try again!
                            </span>
                          </>
                        )}
                      </div>
                      <p className="mt-2 font-medium text-purple-800 text-sm sm:text-base">
                        {questions[currentQuestion].explanation}
                      </p>
                      <div className="mt-2 bg-yellow-100 p-2 rounded-lg border-2 border-yellow-300 flex items-center gap-2">
                        <span className="text-lg sm:text-xl">💡</span>
                        <p className="font-medium text-purple-800 text-sm sm:text-base">
                          {questions[currentQuestion].tip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-purple-100 p-4">
                  {!showFeedback ? (
                    <Button
                      onClick={handleCheckAnswer}
                      disabled={!selectedAnswer}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-base sm:text-lg border-4 border-purple-700 shadow-lg"
                    >
                      Check Answer
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNextQuestion}
                      className={`w-full ${isCorrect ? "bg-green-600 hover:bg-green-700 border-green-700" : "bg-purple-600 hover:bg-purple-700 border-purple-700"} text-white font-bold text-base sm:text-lg border-4 shadow-lg`}
                    >
                      {isCorrect
                        ? currentQuestion === questions.length - 1
                          ? "See Results"
                          : "Next Question"
                        : "Try Again"}
                    </Button>
                  )}
                </div>
              </Card>
            ) : (
              <Card className="border-8 border-purple-500 shadow-xl bg-white rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">Quiz Results</h2>
                  <p className="text-white text-lg sm:text-xl font-bold text-center">
                    You scored {score} out of {questions.length}
                  </p>
                </div>
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    {score === questions.length ? (
                      <>
                        <div className="relative">
                          <div className="absolute -top-6 -left-6 bg-yellow-400 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 rotate-12 animate-bounce">
                            Amazing!
                          </div>
                          <div className="bg-purple-100 p-4 rounded-full border-4 border-purple-300">
                            <CheckCircle className="h-16 w-16 sm:h-24 sm:w-24 text-purple-600" />
                          </div>
                          <div className="absolute -bottom-4 -right-4 bg-pink-400 text-white font-bold px-4 py-2 rounded-full border-2 border-pink-500 -rotate-12 animate-bounce">
                            Super Hero!
                          </div>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-center text-purple-800">
                          PERFECT SCORE!
                        </h3>
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                          <div className="bg-blue-100 p-3 rounded-full border-4 border-blue-300">
                            <span className="text-3xl sm:text-4xl">🏆</span>
                          </div>
                          <div className="bg-green-100 p-3 rounded-full border-4 border-green-300">
                            <span className="text-3xl sm:text-4xl">🦸‍♂️</span>
                          </div>
                          <div className="bg-purple-100 p-3 rounded-full border-4 border-purple-300">
                            <span className="text-3xl sm:text-4xl">🌟</span>
                          </div>
                        </div>
                      </>
                    ) : score >= questions.length / 2 ? (
                      <>
                        <div className="bg-blue-100 p-4 rounded-full border-4 border-blue-300">
                          <CheckCircle className="h-16 w-16 sm:h-24 sm:w-24 text-blue-600" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-center text-purple-800">GOOD JOB!</h3>
                        <div className="flex items-center justify-center gap-4">
                          <div className="bg-blue-100 p-3 rounded-full border-4 border-blue-300">
                            <span className="text-3xl sm:text-4xl">🥈</span>
                          </div>
                          <div className="bg-green-100 p-3 rounded-full border-4 border-green-300">
                            <span className="text-3xl sm:text-4xl">👍</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-orange-100 p-4 rounded-full border-4 border-orange-300">
                          <XCircle className="h-16 w-16 sm:h-24 sm:w-24 text-orange-600" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-center text-purple-800">
                          KEEP TRAINING!
                        </h3>
                        <div className="flex items-center justify-center gap-4">
                          <div className="bg-orange-100 p-3 rounded-full border-4 border-orange-300">
                            <span className="text-3xl sm:text-4xl">🔄</span>
                          </div>
                          <div className="bg-yellow-100 p-3 rounded-full border-4 border-yellow-300">
                            <span className="text-3xl sm:text-4xl">📚</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-4 bg-purple-100 p-4">
                  <Button
                    onClick={resetQuiz}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-base sm:text-lg border-4 border-purple-700 shadow-lg"
                  >
                    Try Again
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold text-base sm:text-lg border-4 border-yellow-500 shadow-lg"
                  >
                    <Link href="/">Return to Home</Link>
                  </Button>
                  <div className="bg-blue-100 p-3 rounded-lg border-2 border-blue-300 text-center flex items-center justify-center gap-2">
                    <span className="text-xl sm:text-2xl">🏅</span>
                    <p className="font-bold text-purple-800 text-sm sm:text-base">Print your Cyber Hero Certificate!</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-4 bg-purple-800 text-white border-t-8 border-yellow-400">
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
