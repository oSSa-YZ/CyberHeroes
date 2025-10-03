import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import { Sticker } from "@/components/sticker"
import { AnimatedGif } from "@/components/animated-gif"
import { MobileMenu } from "@/components/mobile-menu"
import { AuthButtons } from "@/components/auth-buttons"

export default function TeamPage() {
  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/games", label: "Games", icon: "🎯" },
    { href: "/bad-guys", label: "Bad Guys", icon: "😈" },
    { href: "/powers", label: "Powers", icon: "⚡" },
    { href: "/quiz", label: "Quiz", icon: "🎮" },
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
        <section className="w-full py-8 md:py-12 bg-gradient-to-b from-blue-400 to-blue-600">
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
                <Sticker emoji="🦸‍♂️" size="lg" /> Meet The Cyber Hero Team!
              </h1>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl sm:text-3xl">👉</span>
              <p className="text-base sm:text-xl text-white font-medium">
                These heroes will help you stay safe online!
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {/* Captain Secure Card */}
              <div className="bg-white rounded-xl border-8 border-blue-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-blue-500 p-4 flex justify-center">
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white border-4 border-blue-300 flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl">🦸‍♂️</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Captain Secure</h2>
                  <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 mb-3">
                    Team Leader
                  </div>
                  <div className="flex justify-center gap-2 mb-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div className="bg-blue-100 p-2 rounded-full">
                      <span className="text-lg sm:text-xl">🔒</span>
                    </div>
                    <div className="bg-blue-100 p-2 rounded-full">
                      <span className="text-lg sm:text-xl">⚡</span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-purple-800 font-medium">
                    Captain Secure leads the team with super strong passwords and amazing security skills!
                  </p>
                </div>
                <div className="bg-blue-100 p-3 flex justify-center">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold border-2 border-blue-600">
                    Learn His Powers!
                  </Button>
                </div>
              </div>

              {/* Techna Card */}
              <div className="bg-white rounded-xl border-8 border-pink-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-pink-500 p-4 flex justify-center">
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white border-4 border-pink-300 flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl">👩‍💻</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Techna</h2>
                  <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 mb-3">
                    Tech Expert
                  </div>
                  <div className="flex justify-center gap-2 mb-3">
                    <div className="bg-pink-100 p-2 rounded-full">
                      <span className="text-lg sm:text-xl">🧠</span>
                    </div>
                    <div className="bg-pink-100 p-2 rounded-full">
                      <span className="text-lg sm:text-xl">💡</span>
                    </div>
                    <div className="bg-pink-100 p-2 rounded-full">
                      <span className="text-lg sm:text-xl">⚡</span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-purple-800 font-medium">
                    Techna is super smart and knows all about computers and devices!
                  </p>
                </div>
                <div className="bg-pink-100 p-3 flex justify-center">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white font-bold border-2 border-pink-600">
                    Learn Her Powers!
                  </Button>
                </div>
              </div>

              {/* Detective Digi Card */}
              <div className="bg-white rounded-xl border-8 border-green-500 shadow-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer">
                <div className="bg-green-500 p-4 flex justify-center">
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-white border-4 border-green-300 flex items-center justify-center">
                    <span className="text-5xl sm:text-6xl">🕵️‍♂️</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800">Detective Digi</h2>
                  <div className="inline-block bg-yellow-400 text-purple-800 font-bold px-3 py-1 rounded-full border-2 border-yellow-500 mb-3">
                    Threat Hunter
                  </div>
                  <div className="flex justify-center gap-2 mb-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <span className="text-lg sm:text-xl">👁️</span>
                    </div>
                    <div className="bg-green-100 p-2 rounded-full">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                    </div>
                    <div className="bg-green-100 p-2 rounded-full">
                      <span className="text-lg sm:text-xl">💡</span>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-purple-800 font-medium">
                    Detective Digi can spot internet bad guys from a mile away!
                  </p>
                </div>
                <div className="bg-green-100 p-3 flex justify-center">
                  <Button className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600">
                    Learn His Powers!
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-white p-4 rounded-xl border-4 border-yellow-400 flex flex-col md:flex-row items-center gap-4">
                <div className="md:w-1/3 w-full">
                  <AnimatedGif
                    src="/placeholder.svg?height=200&width=300"
                    alt="Cyber Heroes in action"
                    className="w-full"
                  />
                </div>
                <div className="md:w-2/3 w-full">
                  <h3 className="text-lg sm:text-xl font-bold text-purple-800 mb-2">Join The Cyber Hero Academy!</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg border-2 border-blue-300 flex items-center gap-2">
                      <span className="text-lg sm:text-xl">🎮</span>
                      <span className="text-sm sm:text-base font-bold text-purple-800">Play Games</span>
                    </div>
                    <div className="bg-green-100 p-2 rounded-lg border-2 border-green-300 flex items-center gap-2">
                      <span className="text-lg sm:text-xl">🏆</span>
                      <span className="text-sm sm:text-base font-bold text-purple-800">Win Badges</span>
                    </div>
                    <div className="bg-purple-100 p-2 rounded-lg border-2 border-purple-300 flex items-center gap-2">
                      <span className="text-lg sm:text-xl">🎓</span>
                      <span className="text-sm sm:text-base font-bold text-purple-800">Get Certified</span>
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-2 border-purple-700">
                    Start Training Now!
                  </Button>
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
