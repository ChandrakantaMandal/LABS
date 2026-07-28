import React, { useState, useRef, useEffect } from 'react'
import {
  Terminal,
  LayoutDashboard,
  BookOpen,
  Sun,
  Moon,
  LogOut,
  Search,
  Flame,
  ChevronRight,
  LifeBuoy,
  Trophy,
  Zap,
  Settings,
  User,
  CheckCircle2,
  Award,
  BarChart3,
  RotateCcw,
  Clock,
  X,
  MessageSquare,
  Info,
  Send,
  Star,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

// GitHub-Style Green Matrix Level Colors
const getGreenLevelColor = (level, isDarkMode) => {
  if (isDarkMode) {
    switch (level) {
      case 1:
        return 'bg-emerald-950/70 border border-emerald-800/40 hover:bg-emerald-900/80'
      case 2:
        return 'bg-emerald-700/80 border border-emerald-600/50 hover:bg-emerald-600'
      case 3:
        return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] hover:scale-110 hover:shadow-[0_0_12px_rgba(16,185,129,0.8)]'
      default:
        return 'bg-slate-800/40 border border-transparent' // Empty cell
    }
  } else {
    switch (level) {
      case 1:
        return 'bg-emerald-200 border border-emerald-300/60 hover:bg-emerald-300'
      case 2:
        return 'bg-emerald-400 border border-emerald-500/50 hover:bg-emerald-500'
      case 3:
        return 'bg-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.4)] hover:scale-110'
      default:
        return 'bg-slate-200/80 border border-transparent' // Empty cell
    }
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuthStore()

  // 1. ANIMATED THEME SWITCHER LOGIC
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('labs-theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  // 2. INTERACTIVE STATES
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [streakCount] = useState(12)
  const [hoveredCell, setHoveredCell] = useState(null)

  // 3. SUPPORT UNIT MODAL STATES
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('about') // 'about' | 'feedback'
  const [rating, setRating] = useState(5)
  const [feedbackMsg, setFeedbackMsg] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isDarkMode
    setIsDarkMode(nextTheme)
    localStorage.setItem('labs-theme', nextTheme ? 'dark' : 'light')
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setIsSupportOpen(false)
      setFeedbackMsg('')
    }, 1800)
  }

  // Theme Configuration
  const theme = {
    bgMain: isDarkMode ? 'bg-[#060913]' : 'bg-[#f8fafc]',
    bgSidebar: isDarkMode ? 'bg-[#0b1324]' : 'bg-[#ffffff]',
    bgCard: isDarkMode ? 'bg-[#0b1324]' : 'bg-[#ffffff]',
    bgNav: isDarkMode ? 'bg-[#060913]/80' : 'bg-[#ffffff]/80',
    bgInput: isDarkMode ? 'bg-[#171f33]' : 'bg-[#f1f5f9]',
    textMain: isDarkMode ? 'text-[#c7c4d8]' : 'text-[#475569]',
    textHeading: isDarkMode ? 'text-white' : 'text-[#0f172a]',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-600',
    border: isDarkMode ? 'border-slate-800' : 'border-slate-200',
    dropdownBg: isDarkMode ? 'bg-[#0b1324]' : 'bg-[#ffffff]',
    dropdownHover: isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-slate-100',
    shadow: isDarkMode
      ? 'shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
      : 'shadow-[0_4px_20px_rgba(148,163,184,0.12)]',
  }

  const initialSubmissions = [
    {
      name: 'LRU Cache',
      difficulty: 'Medium',
      diffColor: 'text-amber-500',
      status: 'Accepted',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      runtime: '45ms',
      lang: 'C++',
      date: '10 mins ago',
    },
    {
      name: 'Binary Tree Maximum Path Sum',
      difficulty: 'Hard',
      diffColor: 'text-rose-500',
      status: 'Wrong Answer',
      statusColor: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
      runtime: 'N/A',
      lang: 'Python',
      date: '2 hours ago',
    },
    {
      name: 'Two Sum',
      difficulty: 'Easy',
      diffColor: 'text-emerald-500',
      status: 'Accepted',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      runtime: '1ms',
      lang: 'Rust',
      date: '1 day ago',
    },
  ]

  const filteredSubmissions = initialSubmissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.lang.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDiff = selectedDifficulty === 'All' || sub.difficulty === selectedDifficulty
    return matchesSearch && matchesDiff
  })

  // Expanded to 210 cells (30 weeks * 7 days)
  const activityCells = Array.from({ length: 210 }, (_, i) => {
    const level = i % 7 === 0 ? 3 : i % 5 === 0 ? 2 : i % 3 === 0 ? 1 : 0
    const submissions =
      level === 3 ? 8 + (i % 4) : level === 2 ? 4 + (i % 3) : level === 1 ? 1 + (i % 2) : 0
    return { id: i, level, submissions }
  })

  return (
    <div
      className={`${theme.bgMain} ${theme.textMain} min-h-screen font-sans flex flex-col antialiased transition-all duration-300`}
    >
      {/* Keyframe Injection for Animations */}
      <style>{`
        @keyframes matrixScaleIn {
          0% { transform: scale(0.3); opacity: 0; filter: brightness(2); }
          100% { transform: scale(1); opacity: 1; filter: brightness(1); }
        }
        .matrix-cell-animated {
          animation: matrixScaleIn 550ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          opacity: 0;
        }
        .hover-card-rise {
          transition: transform 250ms ease, box-shadow 250ms ease;
        }
        .hover-card-rise:hover {
          transform: translateY(-3px);
        }
      `}</style>

      {/* HEADER BAR */}
      <header
        className={`${theme.bgNav} backdrop-blur-md border-b ${theme.border} h-16 flex items-center sticky top-0 z-40 px-6 justify-between transition-colors`}
      >
        <div className="flex items-center gap-6 w-full max-w-7xl mx-auto justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Terminal className="text-white" size={16} />
            </div>
            <span
              className={`font-black text-sm tracking-tight hidden sm:block ${theme.textHeading}`}
            >
              Labs
            </span>
          </div>

          <div className="relative w-80 hidden md:block">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems or languages..."
              className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${theme.textHeading} font-semibold transition-all`}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="group relative">
              <div className="flex items-center gap-1.5 text-amber-500 text-xs font-bold bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20 shadow-[0_2px_10px_rgba(245,158,11,0.05)] cursor-pointer">
                <Flame size={14} fill="currentColor" className="animate-pulse" />{' '}
                <span>Streak: {streakCount}</span>
              </div>
              <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-48 p-2 rounded-xl border border-slate-700/50 bg-slate-900 text-white text-[10px] font-bold shadow-xl z-50 animate-in fade-in slide-in-from-top-1">
                🔥 Solve 1 task today to keep your streak active!
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-indigo-500 p-2 rounded-xl bg-slate-500/5 transition-all duration-300 hover:rotate-12"
            >
              {isDarkMode ? (
                <Sun size={16} className="text-amber-400" />
              ) : (
                <Moon size={16} className="text-indigo-600" />
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-xl border-2 border-indigo-500 bg-gradient-to-tr from-[#6366f1] to-[#a855f7] flex items-center justify-center font-bold text-white text-xs uppercase shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:scale-105 transition-transform duration-200"
              >
                {user?.name ? user.name.slice(0, 2) : 'KA'}
              </button>
              {isDropdownOpen && (
                <div
                  className={`absolute right-0 mt-3 w-56 rounded-2xl border ${theme.border} ${theme.dropdownBg} ${theme.shadow} p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}
                >
                  <div className="px-3 py-2 border-b border-slate-700/20 mb-1">
                    <p className={`text-xs font-bold ${theme.textHeading}`}>
                      {user?.name || 'kanha'}
                    </p>
                    <p className="text-[10px] text-indigo-500 font-medium">
                      {user?.email || 'kanha@labs.com'}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false)
                      navigate('/settings')
                    }}
                    className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${theme.dropdownHover}`}
                  >
                    <User size={14} className="text-indigo-500" /> Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 text-left transition-colors"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* BODY CONTAINER */}
      <div className="flex flex-1 max-w-7xl w-full mx-auto px-6 py-6 gap-6">
        <aside
          className={`w-60 ${theme.bgSidebar} border ${theme.border} rounded-2xl p-4 flex flex-col justify-between hidden lg:flex ${theme.shadow} transition-colors`}
        >
          <div className="space-y-6">
            <div className="px-2">
              <h2 className={`text-base font-extrabold tracking-wider ${theme.textHeading}`}></h2>
              <p className="text-[10px] text-indigo-500 font-black uppercase tracking-wider">
                Pro Workspace
              </p>
            </div>
            <nav className="space-y-1">
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 text-xs font-bold border border-indigo-500/20 text-left transition-all">
                <LayoutDashboard size={16} /> Dashboard
              </button>
              <button
                onClick={() => navigate('/curriculum')}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${theme.dropdownHover}`}
              >
                <BookOpen size={16} /> Curriculum
              </button>
              <button
                onClick={() => navigate('/challenges')}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${theme.dropdownHover}`}
              >
                <Trophy size={16} /> Challenges
              </button>
              <button
                onClick={() => navigate('/settings')}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-colors ${theme.dropdownHover}`}
              >
                <Settings size={16} /> Settings
              </button>
            </nav>
          </div>

          {/* SUPPORT UNIT BUTTON */}
          <div className={`border-t ${theme.border} pt-4`}>
            <button
              onClick={() => setIsSupportOpen(true)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-left transition-colors ${theme.dropdownHover}`}
            >
              <LifeBuoy size={16} className="text-indigo-500" /> Support Unit
            </button>
          </div>
        </aside>

        <main className="flex-1 space-y-6">
          {/* WELCOME BANNER & DAILY TASK */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h1 className={`text-2xl font-black tracking-tight ${theme.textHeading}`}>
                Welcome back, {user?.name || 'kanha'}.
              </h1>
              <p className={`text-xs mt-1 font-semibold ${theme.textMuted}`}>
                Ready to take on today's matrix coding problem structures?
              </p>
            </div>
            <div
              className={`${theme.bgCard} border ${theme.border} rounded-2xl p-4 ${theme.shadow} hover-card-rise transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-wider">
                  Daily Task
                </span>
                <span className="text-[10px] text-indigo-500 font-bold flex items-center gap-1">
                  <Zap size={11} /> +50 XP
                </span>
              </div>
              <h3 className={`text-sm font-bold ${theme.textHeading} mt-1.5`}>LRU Cache Layout</h3>
              <button
                onClick={() => navigate('/challenges/solve/2')}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 rounded-xl mt-3 flex items-center justify-center gap-1 transition shadow-lg shadow-indigo-600/20 active:scale-95"
              >
                Solve Now <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* QUICK STATS CARDS SECTION */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className={`${theme.bgCard} border ${theme.border} p-4 rounded-2xl ${theme.shadow} hover-card-rise flex items-center gap-3`}
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase ${theme.textMuted}`}>
                  Problems Solved
                </p>
                <p className={`text-base font-black ${theme.textHeading}`}>
                  142 <span className="text-[10px] font-semibold text-slate-400">/ 500</span>
                </p>
              </div>
            </div>

            <div
              className={`${theme.bgCard} border ${theme.border} p-4 rounded-2xl ${theme.shadow} hover-card-rise flex items-center gap-3`}
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase ${theme.textMuted}`}>
                  Accuracy Rate
                </p>
                <p className={`text-base font-black ${theme.textHeading}`}>78.5%</p>
              </div>
            </div>

            <div
              className={`${theme.bgCard} border ${theme.border} p-4 rounded-2xl ${theme.shadow} hover-card-rise flex items-center gap-3`}
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                <Award size={18} />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase ${theme.textMuted}`}>Global Rank</p>
                <p className={`text-base font-black ${theme.textHeading}`}>
                  #1,845 <span className="text-[9px] text-emerald-500 font-bold">Top 5%</span>
                </p>
              </div>
            </div>

            <div
              className={`${theme.bgCard} border ${theme.border} p-4 rounded-2xl ${theme.shadow} hover-card-rise flex items-center gap-3`}
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shrink-0">
                <Flame size={18} fill="currentColor" />
              </div>
              <div>
                <p className={`text-[10px] font-black uppercase ${theme.textMuted}`}>
                  Active Streak
                </p>
                <p className={`text-base font-black ${theme.textHeading}`}>12 Days</p>
              </div>
            </div>
          </div>

          {/* ACTIVITY MATRIX */}
          <div
            className={`${theme.bgCard} border ${theme.border} p-5 rounded-2xl ${theme.shadow} relative overflow-visible transition-colors`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-wider ${theme.textHeading}`}>
                  Activity Matrix
                </h4>
                <p className={`text-[10px] ${theme.textMuted} mt-0.5 font-medium`}>
                  Procedural dynamic compilation grids
                </p>
              </div>

              {/* GitHub Green Legend */}
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                <span>Less</span>
                <div
                  className={`w-2.5 h-2.5 rounded-[2px] ${isDarkMode ? 'bg-slate-800/60' : 'bg-slate-200'}`}
                />
                <div
                  className={`w-2.5 h-2.5 rounded-[2px] ${isDarkMode ? 'bg-emerald-950/80 border border-emerald-800/40' : 'bg-emerald-200'}`}
                />
                <div
                  className={`w-2.5 h-2.5 rounded-[2px] ${isDarkMode ? 'bg-emerald-700' : 'bg-emerald-400'}`}
                />
                <div className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                <span>More</span>
              </div>
            </div>

            {/* Matrix Grid System View */}
            <div className="relative overflow-x-auto pb-2 min-h-[115px] flex justify-center">
              <div className="grid grid-flow-col grid-rows-7 gap-[6px] w-full max-w-full justify-between px-1">
                {activityCells.map((cell) => {
                  const cellColor = getGreenLevelColor(cell.level, isDarkMode)

                  return (
                    <div
                      key={cell.id}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-[13px] h-[13px] rounded-[3px] cursor-pointer transition-all duration-200 ease-out matrix-cell-animated ${cellColor}`}
                      style={{ animationDelay: `${(cell.id % 70) * 4}ms` }}
                    />
                  )
                })}
              </div>

              {/* Realtime Floating Tooltip */}
              {hoveredCell && (
                <div
                  className={`absolute bottom-[-10px] left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-lg border text-[10px] font-bold ${isDarkMode ? 'bg-[#171f33] border-slate-700 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-800 shadow-md'} transition-all duration-150 animate-in fade-in slide-in-from-bottom-1 z-50 pointer-events-none flex items-center gap-1.5`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${hoveredCell.level === 3 ? 'bg-emerald-400' : hoveredCell.level === 0 ? 'bg-slate-400' : 'bg-emerald-500'}`}
                  />
                  {hoveredCell.submissions === 0
                    ? 'No metrics collected'
                    : `${hoveredCell.submissions} algorithmic optimizations compiled`}
                </div>
              )}
            </div>
          </div>

          {/* Submissions Grid Table */}
          <div
            className={`${theme.bgCard} border ${theme.border} p-4 rounded-2xl ${theme.shadow} transition-colors`}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${theme.textHeading}`}>
                Submissions Log
              </h4>
              <div className="flex gap-2">
                {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${selectedDifficulty === diff ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 bg-slate-500/5 hover:bg-slate-500/10'}`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-700/20 text-[10px] uppercase font-bold text-slate-400">
                    <th className="pb-2.5">Problem</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5">Runtime</th>
                    <th className="pb-2.5">Language</th>
                    <th className="pb-2.5">Submitted</th>
                    <th className="pb-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/10">
                  {filteredSubmissions.map((sub, idx) => (
                    <tr key={idx} className={`${theme.dropdownHover} transition-colors`}>
                      <td className="py-3">
                        <p className={`font-bold ${theme.textHeading}`}>{sub.name}</p>
                        <p
                          className={`text-[9px] font-black tracking-wide uppercase ${sub.diffColor}`}
                        >
                          {sub.difficulty}
                        </p>
                      </td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-1 rounded-lg border text-[10px] font-bold inline-flex items-center gap-1 ${sub.statusColor}`}
                        >
                          {sub.status === 'Accepted' ? (
                            <CheckCircle2 size={11} />
                          ) : (
                            <RotateCcw size={11} />
                          )}
                          {sub.status}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-[11px] font-bold opacity-80">
                        {sub.runtime}
                      </td>
                      <td className="py-3">
                        <span className="bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold">
                          {sub.lang}
                        </span>
                      </td>
                      <td className="py-3 text-[11px] font-semibold text-slate-400 flex items-center gap-1 mt-2">
                        <Clock size={11} /> {sub.date}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => navigate('/challenges')}
                          className="text-[10px] font-bold text-indigo-500 hover:underline"
                        >
                          Re-try
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* SUPPORT UNIT MODAL */}
      {isSupportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md ${theme.bgCard} border ${theme.border} rounded-2xl ${theme.shadow} overflow-hidden`}
          >
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-4 border-b ${theme.border}`}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <LifeBuoy size={16} />
                </div>
                <h3 className={`text-sm font-bold ${theme.textHeading}`}>
                  Support & Platform Guide
                </h3>
              </div>
              <button
                onClick={() => setIsSupportOpen(false)}
                className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs Header */}
            <div className={`flex border-b ${theme.border} bg-slate-500/5 p-1`}>
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'about'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Info size={14} /> About Platform
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl transition-all ${
                  activeTab === 'feedback'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare size={14} /> Send Feedback
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              {activeTab === 'about' ? (
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className={`font-black text-sm ${theme.textHeading}`}>Kinetic Labs v2.4</h4>
                    <p className="text-indigo-500 font-medium text-[11px]">
                      Pro Interactive Algorithmic Engine
                    </p>
                  </div>
                  <p className={`${theme.textMuted} leading-relaxed`}>
                    Kinetic Labs ek ultra-fast competitive coding environment hai jahan aap DSA
                    concepts, matrix-based visual tasks aur custom problem sets par practice kar
                    sakte hain.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Real-time
                      Activity Matrix Tracking
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Multi-language
                      Compilation Engine
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Daily Streaks &
                      Leaderboard Metrics
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {isSubmitted ? (
                    <div className="text-center py-6 space-y-2">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                      <h4 className={`text-sm font-bold ${theme.textHeading}`}>Thank you!</h4>
                      <p className="text-xs text-slate-400">
                        Aapka feedback record kar liya gaya hai.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                      <div>
                        <label className={`text-[11px] font-bold block mb-2 ${theme.textHeading}`}>
                          How was your experience?
                        </label>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="p-1 text-amber-400 transition-transform hover:scale-110"
                            >
                              <Star size={20} fill={star <= rating ? 'currentColor' : 'none'} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          className={`text-[11px] font-bold block mb-1.5 ${theme.textHeading}`}
                        >
                          Your Feedback / Suggestion
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={feedbackMsg}
                          onChange={(e) => setFeedbackMsg(e.target.value)}
                          placeholder="Kya improvement chahiye? Bataiye..."
                          className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${theme.textHeading}`}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-600/20 active:scale-95"
                      >
                        <Send size={14} /> Submit Feedback
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 ${isDarkMode ? 'bg-[#171f33]/95' : 'bg-white/95'} backdrop-blur-xl border-t ${theme.border} z-50`}
      >
        <button className="flex flex-col items-center justify-center text-indigo-500">
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button
          onClick={() => navigate('/curriculum')}
          className="flex flex-col items-center justify-center text-slate-400"
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] font-medium">Catalog</span>
        </button>
        <button
          onClick={() => navigate('/challenges')}
          className="flex flex-col items-center justify-center text-slate-400"
        >
          <Zap className="w-5 h-5" />
          <span className="text-[10px] font-medium">Challenges</span>
        </button>
      </nav>
    </div>
  )
}
