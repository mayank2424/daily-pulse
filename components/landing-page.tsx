"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Award, Check, ChevronRight, Clock, Flame, Sparkles, Star, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import HabitTracker from "@/components/habit-tracker"
import { HabitStreakVisualizer } from "@/components/habit-streak-visualizer"
import { MoodTracker } from "@/components/mood-tracker"
import { AIRecommendations } from "@/components/ai-recommendations"
import { HabitStack } from "@/components/habit-stack"

export default function LandingPage() {
  const [showApp, setShowApp] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 5)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (showApp) {
    return <HabitTracker />
  }

  const features = [
    {
      title: "Streak Visualization",
      description: "Watch your streaks grow with beautiful visual representations of your progress",
      icon: <Flame className="h-6 w-6 text-orange-500" />,
      component: <HabitStreakVisualizer />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Mood Correlation",
      description: "Track how your habits affect your daily mood and wellbeing",
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      component: <MoodTracker />,
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "AI Recommendations",
      description: "Get personalized habit suggestions based on your goals and patterns",
      icon: <Sparkles className="h-6 w-6 text-violet-500" />,
      component: <AIRecommendations />,
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Habit Stacking",
      description: "Build powerful routines by stacking complementary habits together",
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      component: <HabitStack />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Achievement System",
      description: "Earn badges and rewards as you build consistency in your habits",
      icon: <Award className="h-6 w-6 text-emerald-500" />,
      component: (
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`flex h-20 items-center justify-center rounded-lg ${
                i <= 3 ? "bg-gradient-to-br from-emerald-500 to-green-500" : "bg-slate-200 dark:bg-slate-800"
              }`}
            >
              {i <= 3 ? (
                <Award className="h-8 w-8 text-white" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-700">
                  <Award className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      ),
      color: "from-emerald-500 to-green-500",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">DailyPulse</span>
          </div>
          <nav className="hidden space-x-6 md:flex">
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowApp(true)}
              className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.2),transparent)]"></div>
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                  Build Better Habits, <br />
                  <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                    Transform Your Life
                  </span>
                </h1>
                <p className="mb-10 text-xl text-slate-600 dark:text-slate-300">
                  Track, visualize, and maintain your habits with our beautiful and intuitive habit tracking app. Stay
                  motivated with streaks, insights, and achievements.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <Button
                  onClick={() => setShowApp(true)}
                  size="lg"
                  className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
                >
                  Start Tracking Habits <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mx-auto mt-16 max-w-5xl rounded-2xl border bg-white/50 p-4 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50"
            >
              <div className="overflow-hidden rounded-xl border shadow-sm dark:border-slate-700">
                <div className="flex h-6 items-center gap-2 border-b bg-slate-100 px-4 dark:border-slate-700 dark:bg-slate-800">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
                <div className="bg-white p-4 dark:bg-slate-900">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="h-8 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800"></div>
                      <div className="h-24 rounded-md bg-slate-200 dark:bg-slate-800"></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="h-20 rounded-md bg-violet-100 dark:bg-violet-900/30"></div>
                        <div className="h-20 rounded-md bg-blue-100 dark:bg-blue-900/30"></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 rounded-md bg-slate-200 dark:bg-slate-800"></div>
                      <div className="grid gap-3">
                        <div className="h-16 rounded-md bg-slate-200 dark:bg-slate-800"></div>
                        <div className="h-16 rounded-md bg-green-100 dark:bg-green-900/30"></div>
                        <div className="h-16 rounded-md bg-slate-200 dark:bg-slate-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Floating elements */}
          <div className="absolute left-10 top-40 h-20 w-20 rounded-full bg-violet-500/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl"></div>
        </section>

        {/* Stats Section */}
        <section className="border-y bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">10K+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Active Users</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">1M+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Habits Tracked</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">87%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Success Rate</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">4.9/5</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">User Rating</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                Powerful Features to Build Lasting Habits
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Our app is designed with cutting-edge features to help you build and maintain habits effectively.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      activeFeature === index
                        ? "border-2 border-violet-200 bg-violet-50 dark:border-violet-900/50 dark:bg-violet-900/20"
                        : ""
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${feature.color} text-white`}
                        >
                          {feature.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{feature.description}</p>
                        </div>
                        <ChevronRight
                          className={`h-5 w-5 text-slate-400 transition-transform ${
                            activeFeature === index ? "rotate-90 text-violet-500" : ""
                          }`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-xl border bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-[300px] w-full"
                  >
                    <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                      {features[activeFeature].title}
                    </h3>
                    {features[activeFeature].component}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
                How DailyPulse Works
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Building better habits has never been easier. Follow these simple steps to transform your life.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Create Your Habits",
                  description: "Choose from our suggestions or create custom habits aligned with your goals.",
                  icon: <Sparkles className="h-6 w-6 text-violet-500" />,
                },
                {
                  step: "02",
                  title: "Track Consistently",
                  description: "Check in daily to mark your habits complete and build your streak.",
                  icon: <Check className="h-6 w-6 text-violet-500" />,
                },
                {
                  step: "03",
                  title: "Analyze & Improve",
                  description: "Review your insights and achievements to stay motivated and improve.",
                  icon: <Clock className="h-6 w-6 text-violet-500" />,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative rounded-xl border bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-800"
                >
                  <div className="absolute -top-4 left-6 rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-1 text-sm font-bold text-white">
                    {item.step}
                  </div>
                  <div className="mb-4 mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">What Our Users Say</h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Thousands of people have transformed their lives with DailyPulse.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
              {[
                {
                  name: "Alex Johnson",
                  role: "Fitness Enthusiast",
                  content:
                    "DailyPulse helped me maintain my workout routine for over 6 months now. The streak visualization keeps me motivated every day!",
                  avatar: "A",
                  rating: 5,
                },
                {
                  name: "Sarah Williams",
                  role: "Productivity Coach",
                  content:
                    "I recommend DailyPulse to all my clients. The habit stacking feature is a game-changer for building complex routines.",
                  avatar: "S",
                  rating: 5,
                },
                {
                  name: "Michael Chen",
                  role: "Software Developer",
                  content:
                    "The mood correlation feature helped me identify which habits actually make me feel better. Now I know what to prioritize.",
                  avatar: "M",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mb-4 text-slate-600 dark:text-slate-300">"{testimonial.content}"</p>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_70%,rgba(120,119,198,0.2),transparent)]"></div>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 p-8 text-center text-white shadow-lg md:p-12"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Habits?</h2>
              <p className="mb-8 text-lg text-violet-100">
                Join thousands of users who have successfully built lasting habits with DailyPulse.
              </p>
              <Button
                onClick={() => setShowApp(true)}
                size="lg"
                className="bg-white text-violet-600 hover:bg-violet-50"
              >
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500">
                  <Flame className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">DailyPulse</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Building better habits, one day at a time.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold text-slate-900 dark:text-white">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            &copy; {new Date().getFullYear()} DailyPulse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
