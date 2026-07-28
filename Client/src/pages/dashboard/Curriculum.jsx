import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Terminal,
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  ChevronRight,
  Code2,
  Sun,
  Moon,
  Search,
  Flame,
  LayoutDashboard,
  Trophy,
  Settings,
  LifeBuoy,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Curriculum() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // Theme Sync
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('labs-theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const savedTheme = localStorage.getItem('labs-theme')
      setIsDarkMode(savedTheme ? savedTheme === 'dark' : true)
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isDarkMode
    setIsDarkMode(nextTheme)
    localStorage.setItem('labs-theme', nextTheme ? 'dark' : 'light')
  }

  const [searchQuery, setSearchQuery] = useState('')

  // Theme Config
  const theme = {
    bgMain: isDarkMode ? 'bg-[#060913]' : 'bg-[#f8fafc]',
    bgSidebar: isDarkMode ? 'bg-[#0b1324]' : 'bg-[#ffffff]',
    bgCard: isDarkMode ? 'bg-[#0b1324]' : 'bg-[#ffffff]',
    bgNav: isDarkMode ? 'bg-[#060913]/80' : 'bg-[#ffffff]/80',
    bgInput: isDarkMode ? 'bg-[#171f33]' : 'bg-[#f1f5f9]',
    textMain: isDarkMode ? 'text-[#c7c4d8]' : 'text-[#475569]',
    textHeading: isDarkMode ? 'text-white' : 'text-[#0f172a]',
    border: isDarkMode ? 'border-slate-800' : 'border-slate-200',
    dropdownHover: isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100',
    shadow: isDarkMode
      ? 'shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
      : 'shadow-[0_4px_20px_rgba(148,163,184,0.1)]',
  }

  // Curriculum Data Modules
  const modules = [
    {
      id: 'm1',
      title: 'Module 1: Data Structures & Matrix Fundamentals',
      description: 'Master core memory layouts, 2D arrays, hash maps, and pointer arithmetic.',
      lessons: [
        {
          id: '1',
          name: 'Two Sum Matrix Lookup',
          difficulty: 'Easy',
          diffBadge: 'text-emerald-400 bg-emerald-500/10',
          completed: true,
        },
        {
          id: '2',
          name: 'LRU Cache Architecture Design',
          difficulty: 'Medium',
          diffBadge: 'text-amber-400 bg-amber-500/10',
          completed: false,
        },
      ],
    },
    {
      id: 'm2',
      title: 'Module 2: Advanced Trees & Graphs',
      description:
        'Explore recursive traversals, segment trees, and shortest path graph algorithms.',
      lessons: [
        {
          id: '4',
          name: 'Binary Tree Zigzag Traversal',
          difficulty: 'Medium',
          diffBadge: 'text-amber-400 bg-amber-500/10',
          completed: false,
        },
        {
          id: '5',
          name: 'Dynamic Grid Shortest Path',
          difficulty: 'Hard',
          diffBadge: 'text-rose-400 bg-rose-500/10',
          completed: false,
        },
      ],
    },
    {
      id: 'm3',
      title: 'Module 3: Concurrency & System Design',
      description: 'Design multi-threaded schedulers, locks, and cache replacement algorithms.',
      lessons: [
        {
          id: '3',
          name: 'Concurrent Task Scheduler',
          difficulty: 'Hard',
          diffBadge: 'text-rose-400 bg-rose-500/10',
          completed: false,
        },
      ],
    },
  ]

  return (
    <div
      className={`${theme.bgMain} ${theme.textMain} min-h-screen font-sans flex flex-col antialiased transition-all duration-300`}
    >
      {/* HEADER BAR */}
      <header
        className={`${theme.bgNav} backdrop-blur-md border-b ${theme.border} h-16 flex items-center sticky top-0 z-40 px-6 justify-between`}
      >
        <div className="flex items-center gap-6 w-full max-w-7xl mx-auto justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Terminal className="text-white" size={16} />
            </div>
            <span
              className={`font-black text-sm tracking-tight hidden sm:block ${theme.textHeading}`}
            >
              Kinetic Labs
            </span>
          </div>

          <div className="relative w-80 hidden md:block">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search module topics..."
              className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${theme.textHeading}`}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20">
              <Flame size={14} fill="currentColor" className="animate-pulse" />{' '}
              <span>Streak: 12</span>
            </div>

            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-indigo-400 p-2 rounded-xl bg-slate-500/10 transition-all duration-300"
            >
              {isDarkMode ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-indigo-600" />
              )}
            </button>

            <div className="w-9 h-9 rounded-xl border-2 border-indigo-500 bg-gradient-to-tr from-[#6366f1] to-[#a855f7] flex items-center justify-center font-bold text-white text-xs uppercase shadow-md">
              {user?.name ? user.name.slice(0, 2) : 'KA'}
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTAINER */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-6 py-6 gap-6">
        {/* SIDEBAR */}
        <aside
          className={`w-60 ${theme.bgSidebar} border ${theme.border} rounded-2xl p-4 flex flex-col justify-between hidden lg:flex ${theme.shadow}`}
        >
          <div className="space-y-6">
            <div className="px-2">
              <h2 className={`text-base font-extrabold tracking-wider ${theme.textHeading}`}>
                Kinetic Logic
              </h2>
              <p className="text-[10px] text-indigo-400 font-black uppercase">Pro Workspace</p>
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => navigate('/dashboard')}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-colors ${theme.dropdownHover}`}
              >
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 text-xs font-bold border border-indigo-500/20 text-left">
                <BookOpen size={16} /> Curriculum
              </button>
              <button
                onClick={() => navigate('/challenges')}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-colors ${theme.dropdownHover}`}
              >
                <Trophy size={16} /> Challenges
              </button>
              <button
                onClick={() => navigate('/settings')}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-colors ${theme.dropdownHover}`}
              >
                <Settings size={16} /> Settings
              </button>
            </nav>
          </div>
          <div className={`border-t ${theme.border} pt-4`}>
            <button
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${theme.dropdownHover}`}
            >
              <LifeBuoy size={16} /> Support Unit
            </button>
          </div>
        </aside>

        {/* MAIN CURRICULUM LIST */}
        <main className="flex-1 space-y-6">
          <div>
            <h1 className={`text-2xl font-black ${theme.textHeading} tracking-tight`}>
              Learning Path & Roadmap
            </h1>
            <p className="text-xs mt-1 opacity-80 font-medium">
              Follow structured algorithmic modules to master competitive programming.
            </p>
          </div>

          <div className="space-y-6">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className={`${theme.bgCard} border ${theme.border} rounded-2xl p-5 ${theme.shadow} space-y-4`}
              >
                <div>
                  <h3 className={`text-sm font-bold ${theme.textHeading}`}>{mod.title}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{mod.description}</p>
                </div>

                <div className="space-y-2">
                  {mod.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`flex items-center justify-between p-3 rounded-xl border ${theme.border} ${theme.bgInput} hover:border-indigo-500/50 transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        {lesson.completed ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                        ) : (
                          <Circle size={16} className="text-slate-500 shrink-0" />
                        )}
                        <div>
                          <p className={`text-xs font-bold ${theme.textHeading}`}>{lesson.name}</p>
                          <span
                            className={`text-[9px] font-extrabold px-2 py-0.5 rounded border border-slate-700/20 ${lesson.diffBadge}`}
                          >
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate(`/challenges/solve/${lesson.id}`)}
                        className="flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shadow-md shadow-indigo-500/20"
                      >
                        <Play size={12} fill="currentColor" /> Solve
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
