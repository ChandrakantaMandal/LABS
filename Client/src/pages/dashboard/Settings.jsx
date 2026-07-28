import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Terminal,
  User,
  Sliders,
  ShieldCheck,
  Bell,
  Save,
  Check,
  Camera,
  Sun,
  Moon,
  KeyRound,
  Code2,
  Smartphone,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function Settings() {
  const navigate = useNavigate()
  const { user } = useAuthStore()

  // 1. LocalStorage Theme Sync Logic
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

  // Active Tab & Save State
  const [activeTab, setActiveTab] = useState('profile')
  const [isSaved, setIsSaved] = useState(false)

  // Profile Form States
  const [fullName, setFullName] = useState(user?.name || 'kanha')
  const [username, setUsername] = useState('kanha_dev')
  const [bio, setBio] = useState('Competitive programmer & full-stack software engineer.')

  // Editor Preferences States
  const [fontSize, setFontSize] = useState('14px')
  const [tabSize, setTabSize] = useState('4')
  const [autoComplete, setAutoComplete] = useState(true)
  const [lineNumbers, setLineNumbers] = useState(true)

  // Notification States
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [streakReminders, setStreakReminders] = useState(true)
  const [newsletter, setNewsletter] = useState(false)

  // Security States
  const [twoFactor, setTwoFactor] = useState(false)

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  // Dynamic Theme Colors - High Contrast for Light Mode
  const theme = {
    bgMain: isDarkMode ? 'bg-[#030712]' : 'bg-[#f8fafc]',
    bgCard: isDarkMode ? 'bg-[#0b1021]' : 'bg-[#ffffff]',
    bgNav: isDarkMode ? 'bg-[#030712]' : 'bg-[#ffffff]',
    bgInput: isDarkMode ? 'bg-[#111827]' : 'bg-[#f1f5f9]',
    textMain: isDarkMode ? 'text-slate-300' : 'text-slate-700',
    textHeading: isDarkMode ? 'text-white' : 'text-slate-900',
    textMuted: isDarkMode ? 'text-slate-400' : 'text-slate-600',
    textSubHeading: isDarkMode ? 'text-slate-300' : 'text-slate-800',
    border: isDarkMode ? 'border-slate-800/80' : 'border-slate-200',
    activeTabBg: isDarkMode
      ? 'bg-[#1e1b4b]/60 text-indigo-400 border-indigo-500/30'
      : 'bg-indigo-50 text-indigo-600 border-indigo-200 shadow-sm',
  }

  return (
    <div
      className={`min-h-screen ${theme.bgMain} ${theme.textMain} font-sans antialiased transition-colors duration-200`}
    >
      {/* HEADER BAR */}
      <header
        className={`h-16 border-b ${theme.border} ${theme.bgNav} px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-2 text-xs font-semibold ${theme.textSubHeading} ${isDarkMode ? 'bg-slate-800/40 hover:bg-slate-800/80' : 'bg-slate-100 hover:bg-slate-200'} px-3 py-1.5 rounded-lg border ${theme.border} transition-all`}
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Terminal size={15} />
            </div>
            <h1 className={`text-sm font-bold ${theme.textHeading}`}>Workspace Settings</h1>
          </div>
        </div>

        {/* Theme Switch Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-xl transition-all ${isDarkMode ? 'bg-slate-800/40 text-amber-400 hover:bg-slate-800' : 'bg-slate-100 text-indigo-600 hover:bg-slate-200'}`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* TITLE & SAVE BUTTON BAR */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className={`text-2xl font-bold ${theme.textHeading} tracking-tight`}>
              Account & System Preferences
            </h1>
            <p className={`text-xs ${theme.textMuted} mt-1 font-medium`}>
              Configure your personal profile details, code editor environment, and security
              parameters.
            </p>
          </div>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 ${isSaved ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-500'} text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95`}
          >
            {isSaved ? <Check size={14} /> : <Save size={14} />}
            {isSaved ? 'Saved Changes' : 'Save Changes'}
          </button>
        </div>

        {/* SIDEBAR AND TAB CONTENT LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* NAVIGATION TABS (SIDEBAR) */}
          <aside
            className={`${theme.bgCard} border ${theme.border} rounded-2xl p-2.5 h-fit shadow-sm`}
          >
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${activeTab === 'profile' ? `${theme.activeTabBg} border` : `${theme.textSubHeading} hover:bg-slate-500/10`}`}
              >
                <User size={15} /> Profile & Bio
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${activeTab === 'editor' ? `${theme.activeTabBg} border` : `${theme.textSubHeading} hover:bg-slate-500/10`}`}
              >
                <Sliders size={15} /> Editor Preferences
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${activeTab === 'security' ? `${theme.activeTabBg} border` : `${theme.textSubHeading} hover:bg-slate-500/10`}`}
              >
                <ShieldCheck size={15} /> Security & Password
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all ${activeTab === 'notifications' ? `${theme.activeTabBg} border` : `${theme.textSubHeading} hover:bg-slate-500/10`}`}
              >
                <Bell size={15} /> Notifications
              </button>
            </nav>
          </aside>

          {/* TAB CONTENT PANEL */}
          <div
            className={`md:col-span-3 ${theme.bgCard} border ${theme.border} rounded-2xl p-6 space-y-6 shadow-sm`}
          >
            {/* 1. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className={`border-b ${theme.border} pb-4`}>
                  <h3
                    className={`text-xs font-black ${theme.textHeading} uppercase tracking-wider flex items-center gap-2`}
                  >
                    <User size={15} className="text-indigo-500" /> Public Profile
                  </h3>
                  <p className={`text-xs ${theme.textMuted} mt-1 font-medium`}>
                    This information will be displayed on your Kinetic Labs profile and
                    leaderboards.
                  </p>
                </div>

                <div
                  className={`flex items-center gap-4 p-4 rounded-xl ${theme.bgInput} border ${theme.border}`}
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md">
                      KA
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-indigo-500 text-white p-1 rounded-md hover:scale-105 transition-transform">
                      <Camera size={11} />
                    </button>
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${theme.textHeading}`}>Avatar Icon</h4>
                    <p className={`text-[11px] ${theme.textMuted} mt-0.5 font-medium`}>
                      Supports PNG, JPG, or SVG up to 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl px-3 py-2 text-xs font-semibold ${theme.textHeading} focus:outline-none focus:border-indigo-500`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl px-3 py-2 text-xs font-semibold ${theme.textHeading} focus:outline-none focus:border-indigo-500`}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                  >
                    Bio / Heading
                  </label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl p-3 text-xs font-semibold ${theme.textHeading} focus:outline-none focus:border-indigo-500 resize-none`}
                  />
                </div>
              </div>
            )}

            {/* 2. EDITOR PREFERENCES TAB */}
            {activeTab === 'editor' && (
              <div className="space-y-6">
                <div className={`border-b ${theme.border} pb-4`}>
                  <h3
                    className={`text-xs font-black ${theme.textHeading} uppercase tracking-wider flex items-center gap-2`}
                  >
                    <Code2 size={15} className="text-indigo-500" /> Code Editor Preferences
                  </h3>
                  <p className={`text-xs ${theme.textMuted} mt-1 font-medium`}>
                    Customize IDE appearance and autocomplete behaviors.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                    >
                      Font Size
                    </label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(e.target.value)}
                      className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl px-3 py-2 text-xs font-semibold ${theme.textHeading} focus:outline-none`}
                    >
                      <option value="12px">12px (Small)</option>
                      <option value="14px">14px (Medium - Default)</option>
                      <option value="16px">16px (Large)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                    >
                      Tab Size
                    </label>
                    <select
                      value={tabSize}
                      onChange={(e) => setTabSize(e.target.value)}
                      className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl px-3 py-2 text-xs font-semibold ${theme.textHeading} focus:outline-none`}
                    >
                      <option value="2">2 Spaces</option>
                      <option value="4">4 Spaces</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div
                    className={`flex items-center justify-between p-3.5 rounded-xl ${theme.bgInput} border ${theme.border}`}
                  >
                    <div>
                      <h4 className={`text-xs font-bold ${theme.textHeading}`}>
                        IntelliSense & Autocomplete
                      </h4>
                      <p className={`text-[10px] ${theme.textMuted} mt-0.5 font-medium`}>
                        Suggest code completion triggers automatically.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoComplete}
                      onChange={(e) => setAutoComplete(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div
                    className={`flex items-center justify-between p-3.5 rounded-xl ${theme.bgInput} border ${theme.border}`}
                  >
                    <div>
                      <h4 className={`text-xs font-bold ${theme.textHeading}`}>
                        Display Line Numbers
                      </h4>
                      <p className={`text-[10px] ${theme.textMuted} mt-0.5 font-medium`}>
                        Show line indices inside the IDE code pane.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={lineNumbers}
                      onChange={(e) => setLineNumbers(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. SECURITY & PASSWORD TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className={`border-b ${theme.border} pb-4`}>
                  <h3
                    className={`text-xs font-black ${theme.textHeading} uppercase tracking-wider flex items-center gap-2`}
                  >
                    <KeyRound size={15} className="text-indigo-500" /> Password & Security
                  </h3>
                  <p className={`text-xs ${theme.textMuted} mt-1 font-medium`}>
                    Manage authentication credentials and account access safety.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label
                      className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl px-3 py-2 text-xs font-semibold ${theme.textHeading} focus:outline-none focus:border-indigo-500`}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl px-3 py-2 text-xs font-semibold ${theme.textHeading} focus:outline-none focus:border-indigo-500`}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        className={`text-[10px] font-black ${theme.textSubHeading} uppercase tracking-wider`}
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        className={`w-full ${theme.bgInput} border ${theme.border} rounded-xl px-3 py-2 text-xs font-semibold ${theme.textHeading} focus:outline-none focus:border-indigo-500`}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`flex items-center justify-between p-3.5 rounded-xl ${theme.bgInput} border ${theme.border} mt-4`}
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="text-indigo-500 shrink-0" size={18} />
                    <div>
                      <h4 className={`text-xs font-bold ${theme.textHeading}`}>
                        Two-Factor Authentication (2FA)
                      </h4>
                      <p className={`text-[10px] ${theme.textMuted} mt-0.5 font-medium`}>
                        Secure your account with multi-factor code verification.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={(e) => setTwoFactor(e.target.checked)}
                    className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* 4. NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className={`border-b ${theme.border} pb-4`}>
                  <h3
                    className={`text-xs font-black ${theme.textHeading} uppercase tracking-wider flex items-center gap-2`}
                  >
                    <Bell size={15} className="text-indigo-500" /> Notification Alerts
                  </h3>
                  <p className={`text-xs ${theme.textMuted} mt-1 font-medium`}>
                    Choose how you receive activity updates and streak digests.
                  </p>
                </div>

                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-3.5 rounded-xl ${theme.bgInput} border ${theme.border}`}
                  >
                    <div>
                      <h4 className={`text-xs font-bold ${theme.textHeading}`}>
                        Daily Streak & Activity Reminders
                      </h4>
                      <p className={`text-[10px] ${theme.textMuted} mt-0.5 font-medium`}>
                        Get reminded when your solving streak is about to reset.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={streakReminders}
                      onChange={(e) => setStreakReminders(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div
                    className={`flex items-center justify-between p-3.5 rounded-xl ${theme.bgInput} border ${theme.border}`}
                  >
                    <div>
                      <h4 className={`text-xs font-bold ${theme.textHeading}`}>
                        Email Digest & Submissions
                      </h4>
                      <p className={`text-[10px] ${theme.textMuted} mt-0.5 font-medium`}>
                        Receive weekly summary report of solved contest problems.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={emailAlerts}
                      onChange={(e) => setEmailAlerts(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>

                  <div
                    className={`flex items-center justify-between p-3.5 rounded-xl ${theme.bgInput} border ${theme.border}`}
                  >
                    <div>
                      <h4 className={`text-xs font-bold ${theme.textHeading}`}>
                        Product Updates & Announcements
                      </h4>
                      <p className={`text-[10px] ${theme.textMuted} mt-0.5 font-medium`}>
                        Get notified about new modules, challenges, and platform upgrades.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
