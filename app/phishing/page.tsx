import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthButtons } from "@/components/auth-buttons"
import { Badge } from "@/components/ui/badge"
import { FileWarning, ArrowLeft, CheckCircle, XCircle } from "lucide-react"

export default function PhishingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-purple-50">
      <header className="sticky top-0 z-50 w-full border-b bg-brand-header shadow-md">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-purple-800">
            <div className="bg-purple-600 rounded-full p-2">
              <FileWarning className="h-6 w-6 text-yellow-300" />
            </div>
            <span className="font-extrabold">CyberHeroes</span>
          </Link>
          <AuthButtons />
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link className="text-sm font-bold text-purple-800 hover:underline underline-offset-4" href="/">
              Home
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:underline underline-offset-4" href="/games">
              Games
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:underline underline-offset-4" href="/bad-guys">
              Bad Guys
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:underline underline-offset-4" href="/powers">
              Super Powers
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:underline underline-offset-4" href="/quiz">
              Fun Quiz
            </Link>
            <Link className="text-sm font-bold text-purple-800 hover:underline underline-offset-4" href="/team">
              About Us
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-12 md:px-6 md:py-24">
          <div className="flex items-center gap-2 mb-8">
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
            <Badge variant="outline" className="text-red-600 border-red-600 bg-white text-lg px-4 py-1 font-bold">
              Bad Guy Alert!
            </Badge>
            <h1 className="text-3xl font-extrabold tracking-tighter text-purple-800">Phishy Phil</h1>
          </div>

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <div className="bg-white rounded-xl border-4 border-red-400 p-6 shadow-lg relative overflow-hidden">
                <div className="absolute -right-8 -top-8 bg-red-500 text-white text-sm font-bold px-12 py-2 rotate-45">
                  DANGER!
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-100 rounded-full p-4 border-4 border-red-400">
                    <FileWarning className="h-10 w-10 text-red-500" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-red-500">Who is Phishy Phil?</h2>
                    <p className="text-purple-800 font-medium">The trickiest bad guy on the internet!</p>
                  </div>
                </div>
                <p className="text-lg text-purple-800 font-medium bg-yellow-100 p-4 rounded-lg border-2 border-yellow-300">
                  Phishy Phil is a sneaky villain who sends fake messages and creates fake websites that look real! He
                  tries to trick you into giving him your passwords and personal information. He's like a fisherman 🎣
                  trying to catch you with his bait!
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-800 bg-yellow-300 inline-block px-4 py-1 rounded-lg">
                  Phishy Phil's Sneaky Tricks
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="bg-white border-4 border-red-300 shadow-lg overflow-hidden">
                    <div className="bg-red-300 py-2 px-4">
                      <CardTitle className="text-xl text-white font-extrabold flex items-center gap-2">
                        <span className="text-2xl">📧</span> Fake Emails
                      </CardTitle>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-base text-purple-800 font-medium">
                        Phil sends emails pretending to be from your favorite games, apps, or websites. He wants you to
                        click on bad links!
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-4 border-red-300 shadow-lg overflow-hidden">
                    <div className="bg-red-300 py-2 px-4">
                      <CardTitle className="text-xl text-white font-extrabold flex items-center gap-2">
                        <span className="text-2xl">🎭</span> Copycat Websites
                      </CardTitle>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-base text-purple-800 font-medium">
                        Phil makes fake websites that look just like real ones to trick you into typing your password!
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-4 border-red-300 shadow-lg overflow-hidden">
                    <div className="bg-red-300 py-2 px-4">
                      <CardTitle className="text-xl text-white font-extrabold flex items-center gap-2">
                        <span className="text-2xl">📱</span> Text Message Tricks
                      </CardTitle>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-base text-purple-800 font-medium">
                        Phil sends text messages with scary warnings or exciting prizes to make you click on bad links!
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white border-4 border-red-300 shadow-lg overflow-hidden">
                    <div className="bg-red-300 py-2 px-4">
                      <CardTitle className="text-xl text-white font-extrabold flex items-center gap-2">
                        <span className="text-2xl">🎁</span> Too-Good Offers
                      </CardTitle>
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-base text-purple-800 font-medium">
                        Phil offers free stuff that seems too amazing to be true - because it isn't true at all!
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold mb-4 text-purple-800 bg-yellow-300 inline-block px-4 py-1 rounded-lg">
                  How to Spot Phishy Phil's Tricks
                </h2>
                <Tabs defaultValue="signs">
                  <TabsList className="grid w-full grid-cols-2 bg-purple-100 p-2 gap-2">
                    <TabsTrigger
                      value="signs"
                      className="bg-white data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg font-bold text-purple-800 border-2 border-purple-300 data-[state=active]:border-purple-700"
                    >
                      Warning Signs
                    </TabsTrigger>
                    <TabsTrigger
                      value="examples"
                      className="bg-white data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg font-bold text-purple-800 border-2 border-purple-300 data-[state=active]:border-purple-700"
                    >
                      Examples
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="signs" className="p-4 border-4 border-purple-300 rounded-md mt-4 bg-white">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 bg-red-100 p-3 rounded-lg border-2 border-red-200">
                        <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-bold text-purple-800">
                          Messages that say "URGENT!" or "ACT NOW!" trying to scare you
                        </span>
                      </li>
                      <li className="flex items-start gap-2 bg-red-100 p-3 rounded-lg border-2 border-red-200">
                        <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-bold text-purple-800">
                          Weird email addresses with lots of numbers or misspelled words
                        </span>
                      </li>
                      <li className="flex items-start gap-2 bg-red-100 p-3 rounded-lg border-2 border-red-200">
                        <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-bold text-purple-800">
                          Messages with lots of spelling mistakes and weird grammar
                        </span>
                      </li>
                      <li className="flex items-start gap-2 bg-red-100 p-3 rounded-lg border-2 border-red-200">
                        <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-bold text-purple-800">
                          Anyone asking for your password or personal information
                        </span>
                      </li>
                      <li className="flex items-start gap-2 bg-red-100 p-3 rounded-lg border-2 border-red-200">
                        <XCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                        <span className="font-bold text-purple-800">
                          Links or attachments you weren't expecting to get
                        </span>
                      </li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="examples" className="p-4 border-4 border-purple-300 rounded-md mt-4 bg-white">
                    <div className="space-y-4">
                      <div className="border-4 border-red-300 p-4 rounded-md bg-red-50">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🚨</span>
                          <p className="font-extrabold mb-2 text-red-500">Example 1: Scary Bank Message</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border-2 border-gray-200 mb-2">
                          <p className="text-base text-purple-800 font-medium">
                            "URGENT: Your game account has been HACKED! Click here NOW to fix it or lose all your
                            progress and items forever!!!"
                          </p>
                        </div>
                        <div className="flex items-center text-red-500 text-sm font-bold bg-red-100 p-2 rounded-lg">
                          <XCircle className="h-5 w-5 mr-1" />
                          <span>Real companies don't send scary messages like this!</span>
                        </div>
                      </div>
                      <div className="border-4 border-red-300 p-4 rounded-md bg-red-50">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🎮</span>
                          <p className="font-extrabold mb-2 text-red-500">Example 2: Free V-Bucks Scam</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border-2 border-gray-200 mb-2">
                          <p className="text-base text-purple-800 font-medium">
                            "Congratulations! You've been selected to get 10,000 FREE V-Bucks! Just enter your Fortnite
                            username and password here!"
                          </p>
                        </div>
                        <div className="flex items-center text-red-500 text-sm font-bold bg-red-100 p-2 rounded-lg">
                          <XCircle className="h-5 w-5 mr-1" />
                          <span>If it sounds too good to be true, it probably is!</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <div className="space-y-8">
              <Card className="bg-white border-4 border-green-400 shadow-lg overflow-hidden">
                <CardHeader className="bg-green-400">
                  <CardTitle className="text-2xl text-white font-extrabold">Your Super Powers</CardTitle>
                  <CardDescription className="text-white font-bold">Use these to defeat Phishy Phil!</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 bg-green-100 p-3 rounded-lg border-2 border-green-200">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="font-bold text-purple-800">
                        Always check who sent the message very carefully
                      </span>
                    </li>
                    <li className="flex items-start gap-2 bg-green-100 p-3 rounded-lg border-2 border-green-200">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="font-bold text-purple-800">Hover over links to see where they really go</span>
                    </li>
                    <li className="flex items-start gap-2 bg-green-100 p-3 rounded-lg border-2 border-green-200">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="font-bold text-purple-800">
                        Never give your password to anyone - even friends!
                      </span>
                    </li>
                    <li className="flex items-start gap-2 bg-green-100 p-3 rounded-lg border-2 border-green-200">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="font-bold text-purple-800">
                        Ask a grown-up if you're not sure about a message
                      </span>
                    </li>
                    <li className="flex items-start gap-2 bg-green-100 p-3 rounded-lg border-2 border-green-200">
                      <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="font-bold text-purple-800">
                        If something seems weird or too good to be true, it probably is!
                      </span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="bg-green-100">
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-600"
                    asChild
                  >
                    <Link href="/quiz">Take the Phishing Challenge!</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white border-4 border-yellow-400 shadow-lg overflow-hidden">
                <CardHeader className="bg-yellow-400">
                  <CardTitle className="text-2xl text-purple-800 font-extrabold">Earn Your Badge!</CardTitle>
                  <CardDescription className="text-purple-800 font-bold">Complete these missions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-6">
                  <Link
                    href="#"
                    className="block p-3 hover:bg-yellow-100 rounded-md border-2 border-yellow-200 flex items-center gap-2"
                  >
                    <span className="text-2xl">🕵️</span>
                    <div>
                      <div className="font-extrabold text-purple-800">Phishing Detective Game</div>
                      <p className="text-sm text-purple-700">Spot the fake emails and websites!</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="block p-3 hover:bg-yellow-100 rounded-md border-2 border-yellow-200 flex items-center gap-2"
                  >
                    <span className="text-2xl">🎮</span>
                    <div>
                      <div className="font-extrabold text-purple-800">Password Protector</div>
                      <p className="text-sm text-purple-700">Create super strong passwords!</p>
                    </div>
                  </Link>
                  <Link
                    href="#"
                    className="block p-3 hover:bg-yellow-100 rounded-md border-2 border-yellow-200 flex items-center gap-2"
                  >
                    <span className="text-2xl">🏆</span>
                    <div>
                      <div className="font-extrabold text-purple-800">Cyber Hero Quiz</div>
                      <p className="text-sm text-purple-700">Test your knowledge and earn your badge!</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0 bg-brand-footer text-white border-t-8 border-brand-footer">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
          <p className="text-base text-white font-medium">
            © {new Date().getFullYear()} CyberHeroes. City University Malaysia Project. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link className="text-sm font-medium hover:underline underline-offset-4 text-yellow-300" href="#">
              Privacy Policy
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4 text-yellow-300" href="#">
              Terms of Service
            </Link>
            <Link className="text-sm font-medium hover:underline underline-offset-4 text-yellow-300" href="#">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
