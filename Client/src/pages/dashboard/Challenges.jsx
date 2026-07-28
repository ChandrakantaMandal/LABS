import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Terminal,
  Trophy,
  Search,
  Flame,
  Sun,
  Moon,
  Play,
  ChevronRight,
  LayoutDashboard,
  BookOpen,
  Settings,
  LifeBuoy,
  Filter,
  CheckCircle2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Challenges() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // Theme Sync Logic
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

  // Interactive States
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Dynamic Theme Colors
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

  // Challenges Mock Data
  const challengesList = [
    {
      id: '1',
      title: 'Two Sum Matrix Lookup',
      category: 'Arrays & Hashing',
      difficulty: 'Easy',
      status: 'Solved',
      acceptance: '49.2%',
    },
    {
      id: '2',
      title: 'LRU Cache Layout',
      category: 'System Design',
      difficulty: 'Medium',
      status: 'Unsolved',
      acceptance: '41.8%',
    },
    {
      id: '3',
      title: 'Concurrent Task Scheduler',
      category: 'Concurrency',
      difficulty: 'Hard',
      status: 'Unsolved',
      acceptance: '28.5%',
    },
    {
      id: '4',
      title: 'Binary Tree Zigzag Traversal',
      category: 'Trees & Graphs',
      difficulty: 'Medium',
      status: 'Unsolved',
      acceptance: '54.1%',
    },
    {
      id: '5',
      title: 'Dynamic Grid Shortest Path',
      category: 'Dynamic Programming',
      difficulty: 'Hard',
      status: 'Unsolved',
      acceptance: '33.9%',
    },
  ]

  const categories = [
    'All',
    'Arrays & Hashing',
    'System Design',
    'Concurrency',
    'Trees & Graphs',
    'Dynamic Programming',
  ]

  const filteredChallenges = challengesList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDiff = selectedDifficulty === 'All' || item.difficulty === selectedDifficulty
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory
    return matchesSearch && matchesDiff && matchesCat
  })

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
              placeholder="Search challenges or categories..."
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
              <button
                onClick={() => navigate('/curriculum')}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-colors ${theme.dropdownHover}`}
              >
                <BookOpen size={16} /> Curriculum
              </button>
              <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 text-xs font-bold border border-indigo-500/20 text-left">
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

        {/* MAIN CHALLENGES CONTENT */}
        <main className="flex-1 space-y-6">
          <div>
            <h1 className={`text-2xl font-black ${theme.textHeading} tracking-tight`}>
              Problem Bank & Arena
            </h1>
            <p className="text-xs mt-1 opacity-80 font-medium">
              Filter and practice algorithmic coding problems to build your expertise.
            </p>
          </div>

          {/* FILTERS TOOLBAR */}
          <div
            className={`${theme.bgCard} border ${theme.border} p-4 rounded-2xl ${theme.shadow} flex flex-wrap gap-4 justify-between items-center`}
          >
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
              <Filter size={14} className="text-indigo-500 shrink-0" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-indigo-500 text-white shadow-md' : `text-slate-400 ${theme.bgInput} ${theme.dropdownHover}`}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all ${selectedDifficulty === diff ? 'bg-indigo-500 text-white shadow-sm' : 'text-slate-400 bg-slate-500/10 hover:bg-slate-500/20'}`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* PROBLEMS LIST TABLE */}
          <div className={`${theme.bgCard} border ${theme.border} p-5 rounded-2xl ${theme.shadow}`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="opacity-50 border-b border-slate-700/30 text-[10px] uppercase">
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Title</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Difficulty</th>
                    <th className="pb-3">Acceptance</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/10">
                  {filteredChallenges.map((item) => (
                    <tr key={item.id} className={`${theme.dropdownHover} transition-colors`}>
                      <td className="py-3">
                        {item.status === 'Solved' ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-500/40" />
                        )}
                      </td>
                      <td className="py-3">
                        <p className={`font-bold ${theme.textHeading}`}>{item.title}</p>
                      </td>
                      <td className="py-3">
                        <span className="text-[10px] text-indigo-400 font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md ${item.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-500/10' : item.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'}`}
                        >
                          {item.difficulty}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-slate-400">{item.acceptance}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => navigate(`/challenges/solve/${item.id}`)}
                          className="inline-flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition-all shadow-md shadow-indigo-500/20 active:scale-95"
                        >
                          <Play size={11} fill="currentColor" /> Solve
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
    </div>
  )
}
