import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Eye, ArrowRight, BarChart, Users, FileText, Award } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeControls } from "@/components/theme-controls"
import { AuthButtons } from "@/components/auth-buttons"

export default function Home() {
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
    { href: "/profile", label: "Profile", icon: "🦸" },
    { href: "/teacher-login", label: "For Teachers", icon: "👨‍👩‍👧‍👦" },
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
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tighter md:text-4xl lg:text-5xl text-white drop-shadow-md">
                    Become a Cyber Hero! 🦸‍♂️
                  </h1>
                  <div className="flex items-center gap-2 animate-bounce">
                    <span className="text-2xl sm:text-3xl">👉</span>
                    <p className="max-w-[600px] text-white text-base sm:text-lg md:text-xl font-bold">
                      Play games & learn to be safe online!
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold text-lg border-4 border-yellow-500 shadow-lg animate-bounce"
                    size="lg"
                    asChild
                  >
                    <Link href="/games">Start Your Training!</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/images/cyberhero.png"
                    alt="Cyber Hero Robot"
                    width={400}
                    height={400}
                    className="rounded-lg transform hover:scale-110 transition-transform duration-300 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
                  />
                  <Link href="/powers" className="absolute -top-5 -right-5">
                    <div className="bg-yellow-300 text-purple-800 font-bold px-4 py-2 rounded-full border-2 border-yellow-500 rotate-12 animate-pulse hover:bg-yellow-400 transition-colors cursor-pointer">
                      Join me!
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-blue-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block bg-purple-600 px-6 py-2 rounded-full border-4 border-purple-700 shadow-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-yellow-300">
                  Fun Games! 🎮
                </h2>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <Link href="/games/phishing-detective" className="block">
                <div className="bg-white rounded-xl border-4 border-blue-500 overflow-hidden shadow-lg hover:scale-105 transition-transform">
                  <div className="p-2 flex justify-center">
                    <Image
                      src="/images/phishing-game.png"
                      alt="Phishing Detective"
                      width={120}
                      height={120}
                      className="object-contain h-24"
                    />
                  </div>
                  <div className="bg-blue-500 p-2 text-center">
                    <h3 className="font-bold text-white">Phishing Detective</h3>
                  </div>
                </div>
              </Link>

              <Link href="/games/password-protector" className="block">
                <div className="bg-white rounded-xl border-4 border-green-500 overflow-hidden shadow-lg hover:scale-105 transition-transform">
                  <div className="p-2 flex justify-center">
                    <Image
                      src="/images/password-game.png"
                      alt="Password Protector"
                      width={120}
                      height={120}
                      className="object-contain h-24"
                    />
                  </div>
                  <div className="bg-green-500 p-2 text-center">
                    <h3 className="font-bold text-white">Password Protector</h3>
                  </div>
                </div>
              </Link>

              <Link href="/games/digital-footprint-cleanup" className="block">
                <div className="bg-white rounded-xl border-4 border-purple-500 overflow-hidden shadow-lg hover:scale-105 transition-transform">
                  <div className="p-2 flex justify-center">
                    <Image
                      src="/images/defender-game.png"
                      alt="Cyber Defender"
                      width={120}
                      height={120}
                      className="object-contain h-24"
                    />
                  </div>
                  <div className="bg-purple-500 p-2 text-center">
                    <h3 className="font-bold text-white">Cyber Defender</h3>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex justify-center mt-6">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700"
                asChild
              >
                <Link href="/games">
                  See All Games <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-yellow-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block bg-purple-600 px-6 py-2 rounded-full border-4 border-purple-700 shadow-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-yellow-300">
                  Meet the Bad Guys! 👾
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-3">
              <Link href="/bad-guys/phishy-phil">
                <Card className="bg-white border-8 border-red-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                  <div className="p-4 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-red-100 p-4 rounded-full border-4 border-red-300">
                        <span className="text-6xl">🎣</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-purple-800">Phishy Phil</h3>
                    <div className="mt-2 bg-red-100 rounded-lg p-2">
                      <p className="text-base text-purple-800 font-medium">Sends fake messages to trick you!</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/bad-guys/ransom-randy">
                <Card className="bg-white border-8 border-green-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                  <div className="p-4 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 p-4 rounded-full border-4 border-green-300">
                        <span className="text-6xl">🔒</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-purple-800">Ransom Randy</h3>
                    <div className="mt-2 bg-green-100 rounded-lg p-2">
                      <p className="text-base text-purple-800 font-medium">Locks your files and demands money!</p>
                    </div>
                  </div>
                </Card>
              </Link>

              <Link href="/bad-guys/sneaky-sam">
                <Card className="bg-white border-8 border-blue-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                  <div className="p-4 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-blue-100 p-4 rounded-full border-4 border-blue-300">
                        <span className="text-6xl">📡</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold text-purple-800">Sneaky Sam</h3>
                    <div className="mt-2 bg-blue-100 rounded-lg p-2">
                      <p className="text-base text-purple-800 font-medium">Tricks you with fake WiFi networks!</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700"
                asChild
              >
                <Link href="/bad-guys">
                  See All Bad Guys <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-purple-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block bg-purple-600 px-6 py-2 rounded-full border-4 border-purple-700 shadow-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-yellow-300">
                  Your Super Powers! 💪
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-3">
              {/* Password Power (matches Powers page color) */}
              <Link href="/powers?open=password" className="block">
                <div className="bg-white border-8 border-red-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                  <div className="bg-red-500 p-4 flex justify-center">
                    <Lock className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-extrabold text-purple-800">Password Power</h3>
                    <div className="mt-2 bg-red-100 rounded-lg p-2">
                      <p className="text-base text-purple-800 font-medium">Create super strong passwords!</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Device Shield (2nd, blue) */}
              <Link href="/powers?open=device" className="block">
                <div className="bg-white border-8 border-blue-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                  <div className="bg-blue-500 p-4 flex justify-center">
                    <Shield className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-extrabold text-purple-800">Device Shield</h3>
                    <div className="mt-2 bg-blue-100 rounded-lg p-2">
                      <p className="text-base text-purple-800 font-medium">Keep your device safe and updated!</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Scam Spotter (3rd, green) */}
              <Link href="/powers?open=scam" className="block">
                <div className="bg-white border-8 border-green-500 rounded-xl shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                  <div className="bg-green-500 p-4 flex justify-center">
                    <Eye className="h-16 w-16 text-white" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-extrabold text-purple-800">Scam Spotter</h3>
                    <div className="mt-2 bg-green-100 rounded-lg p-2">
                      <p className="text-base text-purple-800 font-medium">Spot fake messages and websites!</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex justify-center mt-4">
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700"
                asChild
              >
                <Link href="/powers">
                  Learn All Powers <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-yellow-300 to-yellow-500">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tighter text-purple-800">
                    Take the Cyber Quiz! 🎮
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">🏆</span>
                    <p className="text-purple-800 text-base sm:text-lg md:text-xl font-bold">
                      Win badges and become a Cyber Hero!
                    </p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg border-4 border-purple-700 shadow-lg animate-bounce"
                    size="lg"
                    asChild
                  >
                    <Link href="/quiz">Start The Quiz!</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto flex items-center justify-center">
                <div className="relative">
                  <Image
                    src="/images/quiz-game.png"
                    alt="Cyber Hero Quiz"
                    width={300}
                    height={300}
                    className="rounded-lg transform hover:scale-110 transition-transform duration-300 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px]"
                  />
                  <div className="absolute -top-5 -right-5 bg-purple-600 text-white font-bold px-4 py-2 rounded-full border-2 border-purple-700 rotate-12 animate-pulse">
                    Fun!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 bg-purple-200">
          <div className="container px-4 md:px-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white p-3 sm:p-4 rounded-xl border-4 border-purple-400 shadow-lg flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform">
                <span className="text-3xl sm:text-4xl">📱</span>
                <span className="font-bold text-purple-800 text-sm sm:text-base">Watch Videos</span>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl border-4 border-purple-400 shadow-lg flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform">
                <span className="text-3xl sm:text-4xl">🎨</span>
                <span className="font-bold text-purple-800 text-sm sm:text-base">Fun Activities</span>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl border-4 border-purple-400 shadow-lg flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform">
                <span className="text-3xl sm:text-4xl">🏆</span>
                <span className="font-bold text-purple-800 text-sm sm:text-base">Win Badges</span>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl border-4 border-purple-400 shadow-lg flex items-center gap-2 sm:gap-3 hover:scale-105 transition-transform">
                <span className="text-3xl sm:text-4xl">🎮</span>
                <span className="font-bold text-purple-800 text-sm sm:text-base">Play Games</span>
              </div>
            </div>
          </div>
        </section>

        {/* New Progress Tracking Section for Teachers and Parents */}
        <section className="w-full py-8 md:py-12 bg-blue-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="inline-block bg-white px-6 py-2 rounded-full border-4 border-blue-300 shadow-md">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-blue-600">
                  For Teachers & Parents 👨‍👩‍👧‍👦
                </h2>
              </div>
              <p className="text-white text-base sm:text-lg max-w-3xl">
                Track your child's progress, view detailed reports, and get insights into their cybersecurity learning
                journey.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-xl border-4 border-blue-300 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-blue-500 p-4 flex justify-center">
                  <BarChart className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Progress Dashboard</h3>
                  <p className="text-blue-600 mb-4 text-sm sm:text-base flex-grow">
                    View detailed progress reports and track completion of games, quizzes, and activities.
                  </p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" asChild>
                    <Link href="/progress-dashboard">View Dashboard</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl border-4 border-blue-300 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-blue-500 p-4 flex justify-center">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Class Management</h3>
                  <p className="text-blue-600 mb-4 text-sm sm:text-base flex-grow">
                    Create and manage student groups, assign activities, and monitor group progress.
                  </p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" asChild>
                    <Link href="/progress-dashboard/students">Manage Classes</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl border-4 border-blue-300 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-blue-500 p-4 flex justify-center">
                  <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Learning Resources</h3>
                  <p className="text-blue-600 mb-4 text-sm sm:text-base flex-grow">
                    Access lesson plans, worksheets, and additional teaching materials for cybersecurity.
                  </p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" asChild>
                    <Link href="/progress-dashboard/resources">Get Resources</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-xl border-4 border-blue-300 shadow-xl overflow-hidden flex flex-col">
                <div className="bg-blue-500 p-4 flex justify-center">
                  <Award className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Certificates & Reports</h3>
                  <p className="text-blue-600 mb-4 text-sm sm:text-base flex-grow">
                    Generate achievement certificates and detailed learning reports for students.
                  </p>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" asChild>
                    <Link href="/progress-dashboard/reports">Generate Reports</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-white p-4 sm:p-6 rounded-xl border-4 border-blue-300 shadow-xl">
              <div className="flex flex-col lg:flex-row items-center gap-6">
                <div className="w-full lg:w-1/3">
                  <div className="bg-blue-100 p-4 rounded-xl border-2 border-blue-200">
                    <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Sample Progress Report</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-600 text-sm sm:text-base">Phishing Awareness:</span>
                        <div className="w-24 sm:w-32 h-3 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                        <span className="font-bold text-green-600 text-sm sm:text-base">85%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-600 text-sm sm:text-base">Password Security:</span>
                        <div className="w-24 sm:w-32 h-3 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                        <span className="font-bold text-green-600 text-sm sm:text-base">70%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-blue-600 text-sm sm:text-base">Online Privacy:</span>
                        <div className="w-24 sm:w-32 h-3 bg-blue-100 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                        <span className="font-bold text-yellow-600 text-sm sm:text-base">50%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-2/3">
                  <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Teacher & Parent Portal</h3>
                  <p className="text-blue-600 mb-4 text-sm sm:text-base">
                    Our secure portal gives you insights into learning progress and areas that need attention. Track
                    completion rates, quiz scores, and time spent on each activity.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-xs sm:text-sm font-medium text-blue-700">Detailed Analytics</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-xs sm:text-sm font-medium text-blue-700">Printable Reports</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-xs sm:text-sm font-medium text-blue-700">Email Notifications</span>
                    </div>
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-center gap-2">
                      <span className="text-blue-500">✓</span>
                      <span className="text-xs sm:text-sm font-medium text-blue-700">Achievement Tracking</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                      <Link href="/progress-dashboard">Access Portal</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ThemeControls />
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
