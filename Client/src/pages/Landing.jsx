import React, { useEffect, useState } from 'react'
import {
  Terminal,
  Bell,
  PlayCircle,
  Bot,
  Zap,
  Layers,
  Sparkles,
  MessageSquare,
  Briefcase,
  User,
  Globe,
  Mail,
  GitFork,
  LayoutDashboard,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Landing() {
  // Theme management state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('labs-theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  useEffect(() => {
    const observerOptions = { threshold: 0.1 }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0')
          entry.target.classList.remove('opacity-0', 'translate-y-8')
        }
      })
    }, observerOptions)

    const cards = document.querySelectorAll('.glass-card')
    cards.forEach((card) => {
      card.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out')
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  // Toggle Theme handler
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light'
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('labs-theme', newTheme)
    window.dispatchEvent(new Event('storage'))
  }

  // Dynamic Theme Styling Maps
  const theme = {
    bgMain: isDarkMode ? 'bg-[#0b1326]' : 'bg-[#f8fafc]',
    bgSection: isDarkMode ? 'bg-[#060e20]' : 'bg-[#f1f5f9]',
    bgCard: isDarkMode ? 'bg-[#171f33]/70' : 'bg-white/80',
    bgNav: isDarkMode ? 'bg-[#0b1326]/80' : 'bg-white/80',
    textMain: isDarkMode ? 'text-[#dae2fd]' : 'text-[#1e293b]',
    textMuted: isDarkMode ? 'text-[#c7c4d8]' : 'text-[#64748b]',
    textNav: isDarkMode ? 'text-[#c3c0ff]' : 'text-[#4f46e5]',
    border: isDarkMode ? 'border-slate-700/30' : 'border-slate-200',
    editorBg: isDarkMode ? 'bg-[#060e20]' : 'bg-[#0f172a]',
  }

  return (
    <div
      className={`${theme.bgMain} ${theme.textMain} font-sans min-h-screen selection:bg-indigo-600 selection:text-white overflow-x-hidden transition-colors duration-300`}
    >
      {/* TopAppBar */}
      <header
        className={`${theme.bgNav} backdrop-blur-md border-b ${theme.border} shadow-sm sticky top-0 z-50 transition-colors duration-300`}
      >
        <div className="flex justify-between items-center w-full px-6 py-2 max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-2">
            <Terminal className={`${theme.textNav} w-6 h-6`} />
            <span className={`text-2xl font-bold ${theme.textNav} tracking-tight`}>LABS</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a
              className={`text-sm font-semibold ${theme.textNav} hover:bg-slate-500/10 transition-colors duration-200 px-3 py-1 rounded-lg`}
              href="#home"
            >
              Home
            </a>
            <a
              className={`text-sm font-medium ${theme.textMuted} hover:bg-slate-500/10 transition-colors duration-200 px-3 py-1 rounded-lg`}
              href="#catalog"
            >
              Catalog
            </a>
            <a
              className={`text-sm font-medium ${theme.textMuted} hover:bg-slate-500/10 transition-colors duration-200 px-3 py-1 rounded-lg`}
              href="#challenges"
            >
              Challenges
            </a>
            <a
              className={`text-sm font-medium ${theme.textMuted} hover:bg-slate-500/10 transition-colors duration-200 px-3 py-1 rounded-lg`}
              href="#pricing"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Unique Theme Change Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className={`relative flex items-center justify-center p-2.5 rounded-xl ${isDarkMode ? 'bg-[#171f33]/80 border-slate-700/50' : 'bg-slate-200/80 border-slate-300'} border text-slate-500 hover:text-[#4edea3] transition-all duration-300 group active:scale-95`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="relative w-5 h-5 transition-transform duration-500 rotate-0 group-hover:rotate-[360deg]">
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-500 drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-600 drop-shadow-[0_0_4px_rgba(79,70,229,0.3)]" />
                )}
              </div>
            </button>

            <button
              className={`${theme.textMuted} hover:bg-slate-500/10 p-2 rounded-full transition-colors active:scale-95 duration-150`}
            >
              <Bell className="w-5 h-5" />
            </button>
            <Link to="/login">
              <button className="bg-[#4f46e5] text-white px-6 py-2 rounded-lg text-sm font-medium hover:scale-[0.98] transition-transform active:scale-95">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <section
          className={`pt-10 pb-24 px-6 max-w-7xl mx-auto relative ${isDarkMode ? 'bg-[radial-gradient(circle_at_50%_-20%,rgba(79,70,229,0.15)_0%,rgba(11,19,38,0)_60%)]' : 'bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.05)_0%,transparent_60%)]'}`}
        >
          <div className="relative z-10 text-center max-w-4xl mx-auto mb-20">
            <div
              className={`inline-flex items-center gap-2 px-4 py-1 rounded-full ${isDarkMode ? 'bg-[#171f33]' : 'bg-slate-200'} border ${theme.border} mb-6`}
            >
              <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-pulse"></span>
              <span className="text-sm font-medium text-[#4edea3]">New: AI Tutor v4.0 is live</span>
            </div>

            <h1
              className={`text-5xl font-bold ${theme.textMain} tracking-tight leading-[1.1] mb-4`}
            >
              Master Coding with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#4edea3]">
                AI at Your Side.
              </span>
            </h1>

            <p className={`text-lg ${theme.textMuted} leading-relaxed mb-10 max-w-2xl mx-auto`}>
              The only platform that pairs interactive coding environments with a real-time AI
              debugging engine and personalized 24/7 tutoring.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/docs">
                <button className="bg-[#4f46e5] text-white px-10 py-4 rounded-lg text-2xl font-semibold hover:scale-[0.98] transition-transform shadow-xl shadow-indigo-600/20 active:scale-95">
                  Start Learning for Free
                </button>
              </Link>
              <button
                className={`flex items-center gap-2 px-10 py-4 rounded-lg border ${theme.border} text-2xl font-semibold hover:bg-slate-500/10 transition-colors active:scale-95`}
              >
                <PlayCircle className="w-6 h-6" />
                See Demo
              </button>
            </div>
          </div>

          {/* Interface Visualization */}
          <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto relative">
            {/* Main Editor */}
            <div
              className={`col-span-12 lg:col-span-8 ${theme.bgCard} backdrop-blur-xl border ${theme.border} rounded-xl overflow-hidden shadow-2xl glass-card transition-colors duration-300`}
            >
              <div className="bg-[#2d3449] px-4 py-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="font-mono text-xs text-slate-300 opacity-70">
                  main.py — CodeLearn IDE
                </div>
                <div className="w-8"></div>
              </div>
              <div
                className={`p-4 font-mono text-sm ${theme.editorBg} text-[#dae2fd] overflow-x-auto rounded-b-lg`}
              >
                <pre className="m-0 p-0 leading-6 block">
                  <div className="flex min-w-full hover:bg-slate-800/50 px-2 rounded">
                    <span className="w-8 text-slate-500 text-right pr-4">1</span>
                    <span>
                      <span className="text-[#4edea3]">def</span>{' '}
                      <span className="text-[#c3c0ff]">analyze_data</span>(dataset):
                    </span>
                  </div>
                  <div className="flex min-w-full hover:bg-slate-800/50 px-2 rounded">
                    <span className="w-8 text-slate-500 text-right pr-4">2</span>
                    <span className="text-[#d0bcff]">
                      {' '}
                      # AI Suggestion: Use vectorization for speed
                    </span>
                  </div>
                  <div className="flex min-w-full hover:bg-slate-800/50 px-2 rounded">
                    <span className="w-8 text-slate-500 text-right pr-4">3</span>
                    <span> processed = []</span>
                  </div>
                </pre>
              </div>
              <div className={`flex items-center justify-between p-4 border-t ${theme.border}`}>
                <span className="text-xs text-slate-400 font-mono">
                  Environment: <span className="text-[#38bdf8]">Python 3.10</span>
                </span>
                <div className="flex items-center gap-3">
                  <button
                    className={`bg-transparent hover:bg-slate-500/10 border ${theme.border} px-4 py-1.5 rounded-lg text-sm font-semibold transition-all`}
                  >
                    Run Code
                  </button>
                  <button className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white px-5 py-1.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95">
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* AI Panel */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
              <div
                className={`${theme.bgCard} backdrop-blur-xl border ${isDarkMode ? 'border-indigo-500/20' : 'border-indigo-200'} rounded-xl p-4 flex-1 glass-card transition-colors duration-300`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Bot className={`${theme.textNav} w-5 h-5`} />
                  <span className="text-sm font-semibold">AI Debugger</span>
                </div>
                <p className={`text-sm ${theme.textMain} mb-2`}>
                  I've detected a potential logic error on line 4.
                </p>
                <div
                  className={`${isDarkMode ? 'bg-[#222a3d]' : 'bg-slate-100'} rounded-lg p-3 border ${theme.border}`}
                >
                  <p className="font-mono text-xs italic opacity-80">
                    "You are checking for validity, but not handling empty datasets."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`py-24 px-6 ${theme.bgSection} transition-colors duration-300`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                Everything You Need to Scale
              </h2>
              <p className={`text-sm ${theme.textMuted} max-w-xl mx-auto`}>
                Advanced tools integrated into a seamless learning experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Documentations',
                  desc: 'Learn by doing with live code execution in every single module.',
                  icon: Layers,
                  iconColor: 'text-indigo-500',
                },
                {
                  title: 'AI Debugging',
                  desc: 'Get instant explanations for errors and real-time optimization tips.',
                  icon: Sparkles,
                  iconColor: 'text-purple-500',
                },
                {
                  title: '24/7 AI Tutor',
                  desc: 'Our AI tutor knows your progress and can guide you anytime.',
                  icon: MessageSquare,
                  iconColor: 'text-emerald-500',
                },
                {
                  title: 'Real-world Projects',
                  desc: 'Build production-grade apps from day one to build your portfolio.',
                  icon: Briefcase,
                  iconColor: 'text-blue-500',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`${theme.bgCard} p-6 rounded-xl border ${theme.border} hover:border-indigo-500 transition-all duration-300 glass-card`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-slate-500/10 flex items-center justify-center ${item.iconColor} mb-4`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className={`text-sm ${theme.textMuted}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-6 text-center relative overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.08)_0%,transparent_70%)]">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-5xl font-bold tracking-tight mb-4">
              Ready to start your coding journey?
            </h2>
            <p className="text-lg text-[#c7c4d8] mb-10">
              Join thousands of students and start building with the power of AI today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="bg-[#4f46e5] text-white px-10 py-4 rounded-lg text-2xl font-semibold hover:scale-[0.98] transition-transform active:scale-95 inline-flex items-center justify-center"
              >
                Create Free Account
              </Link>
              <button className="px-10 py-4 rounded-lg bg-[#171f33] border border-slate-700 text-2xl font-semibold hover:bg-[#2d3449] transition-colors active:scale-95">
                Contact Enterprise
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer without Newsletter */}
      <footer
        className={`${theme.bgSection} border-t ${theme.border} pt-20 pb-20 md:pb-6 px-6 transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className={`${theme.textNav} w-6 h-6`} />
                <span className={`text-2xl font-bold ${theme.textNav} tracking-tight`}>LABS</span>
              </div>
              <p className={`text-sm ${theme.textMuted} mb-6 max-w-xs leading-relaxed`}>
                Empowering the next generation of software engineers with AI-driven education.
              </p>
              <div className="flex gap-4">
                <a
                  className={`${theme.textMuted} hover:text-indigo-500 transition-colors`}
                  href="#globe"
                >
                  <Globe className="w-5 h-5" />
                </a>
                <a
                  className={`${theme.textMuted} hover:text-indigo-500 transition-colors`}
                  href="#email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  className={`${theme.textMuted} hover:text-indigo-500 transition-colors`}
                  href="#git"
                >
                  <GitFork className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-6 uppercase tracking-widest text-[12px]">
                Platform
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    className={`text-sm ${theme.textMuted} hover:text-indigo-500 transition-colors`}
                    href="#courses"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    className={`text-sm ${theme.textMuted} hover:text-indigo-500 transition-colors`}
                    href="#roadmaps"
                  >
                    Roadmaps
                  </a>
                </li>
                <li>
                  <a
                    className={`text-sm ${theme.textMuted} hover:text-indigo-500 transition-colors`}
                    href="#debugger"
                  >
                    AI Debugger
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-6 uppercase tracking-widest text-[12px]">
                Company
              </h4>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    className={`text-sm ${theme.textMuted} hover:text-indigo-500 transition-colors`}
                    href="#about"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className={`text-sm ${theme.textMuted} hover:text-indigo-500 transition-colors`}
                    href="#careers"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className={`text-sm ${theme.textMuted} hover:text-indigo-500 transition-colors`}
                    href="#privacy"
                  >
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className={`flex flex-col md:flex-row justify-between items-center pt-6 border-t ${theme.border} gap-4`}
          >
            <p className="text-sm text-slate-500">© 2026 LABS. Built for the modern engineer.</p>
            <div className="flex gap-6">
              <a className="text-sm text-slate-500 hover:text-indigo-500" href="#terms">
                Terms
              </a>
              <a className="text-sm text-slate-500 hover:text-indigo-500" href="#cookies">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* BottomNavBar (Mobile Only) */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 ${isDarkMode ? 'bg-[#171f33]/95' : 'bg-white/95'} backdrop-blur-xl border-t ${theme.border} z-50`}
      >
        <a
          className="flex flex-col items-center justify-center bg-[#4f46e5] text-white rounded-full px-4 py-1 scale-[0.95]"
          href="#dashboard"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </a>
        <a
          className={`flex flex-col items-center justify-center ${theme.textMuted} hover:text-indigo-500`}
          href="#catalog"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium">Catalog</span>
        </a>
        <a
          className={`flex flex-col items-center justify-center ${theme.textMuted} hover:text-indigo-500`}
          href="#challenges"
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-medium">Challenges</span>
        </a>
        <a
          className={`flex flex-col items-center justify-center ${theme.textMuted} hover:text-indigo-500`}
          href="#profile"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </a>
      </nav>
    </div>
  )
}
