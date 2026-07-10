import React, { useEffect, useState } from 'react'
import { Mail, Lock, ArrowRight, User, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import RegLoader from '../../components/common/regloader.jsx'
import PasswordStrengthMeter from '../../components/auth/PasswordStrengthMeter.jsx'
import { useAuthStore } from '../../store/authStore'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  // Dynamic eye button ke liye toggle state
  const [showPassword, setShowPassword] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('labs-theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  useEffect(() => {
    const checkTheme = () => {
      const savedTheme = localStorage.getItem('labs-theme')
      setIsDarkMode(savedTheme ? savedTheme === 'dark' : true)
    }
    window.addEventListener('storage', checkTheme)
    return () => window.removeEventListener('storage', checkTheme)
  }, [])

  const navigate = useNavigate()
  const { register, loading, error } = useAuthStore()

  const handleRegister = async (e) => {
    e.preventDefault()
    const res = await register({ name, email, password })
    if (res) {
      navigate('/verify')
    }
  }

  const themes = {
    dark: {
      bgMain: 'bg-[#060913]',
      cardBg: 'bg-[#0b1324] border-[#1e293b]',
      titleText: 'text-white',
      descText: 'text-[#94a3b8]',
      inputBg: 'bg-[#060913] border-[#1e293b] text-white',
      orbLeft: 'bg-[#6366f1]',
      orbRight: 'bg-[#a855f7]',
      badgeBg: 'bg-[#6366f1]/10',
      badgeBorder: 'border-[#6366f1]/30',
      badgeText: 'text-[#818cf8]',
      inputFocus: 'focus:border-[#6366f1] focus:shadow-[0_0_15px_rgba(99,102,241,0.25)]',
      iconFocus: 'group-focus-within:text-[#6366f1]',
      btnGradient: 'from-[#6366f1] to-[#a855f7]',
      btnShadow:
        'shadow-[0_8px_24px_rgba(99,102,241,0.4)] hover:shadow-[0_12px_28px_rgba(99,102,241,0.55)]',
      linkText: 'text-[#818cf8] hover:text-[#a5b4fc]',
      hoverBorder:
        'hover:border-[#6366f1]/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(99,102,241,0.1)]',
    },
    light: {
      bgMain: 'bg-[#f8fafc]',
      cardBg: 'bg-white border-slate-200',
      titleText: 'text-slate-900',
      descText: 'text-slate-500',
      inputBg: 'bg-slate-50 border-slate-200 text-slate-900',
      orbLeft: 'bg-indigo-300',
      orbRight: 'bg-purple-300',
      badgeBg: 'bg-indigo-50',
      badgeBorder: 'border-indigo-100',
      badgeText: 'text-indigo-600',
      inputFocus: 'focus:border-indigo-500 focus:shadow-[0_0_15px_rgba(79,70,229,0.15)]',
      iconFocus: 'group-focus-within:text-indigo-500',
      btnGradient: 'from-indigo-600 to-purple-600',
      btnShadow:
        'shadow-[0_8px_24px_rgba(79,70,229,0.2)] hover:shadow-[0_12px_28px_rgba(79,70,229,0.35)]',
      linkText: 'text-indigo-600 hover:text-indigo-700',
      hoverBorder: 'hover:border-indigo-300 hover:shadow-xl hover:shadow-slate-200',
    },
  }

  const currentTheme = isDarkMode ? themes.dark : themes.light

  return (
    <>
      {loading && <RegLoader />}
      <div
        className={`min-h-screen w-screen flex items-center justify-center relative overflow-y-auto px-4 py-6 antialiased select-none font-sans transition-colors duration-300 ${currentTheme.bgMain}`}
      >
      <div
        className={`absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 top-[-50px] left-[-50px] transition-all duration-700 ${currentTheme.orbLeft}`}
      ></div>
      <div
        className={`absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 bottom-[-50px] right-[-50px] transition-all duration-700 ${currentTheme.orbRight}`}
      ></div>

      <div
        className={`border rounded-[20px] px-7 py-8 w-full max-w-[400px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-10 relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${currentTheme.cardBg} ${currentTheme.hoverBorder}`}
      >
        <div className="text-center mb-6">
          <div
            className={`border w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${currentTheme.badgeBg} ${currentTheme.badgeBorder}`}
          >
            <span
              className={`font-mono text-base font-bold transition-colors duration-500 ${currentTheme.badgeText}`}
            >
              {'< />'}
            </span>
          </div>
          <h1 className={`text-[28px] font-extrabold m-0 tracking-[2px] ${currentTheme.titleText}`}>
            LABS
          </h1>
          <p className={`text-sm mt-1 m-0 font-medium ${currentTheme.descText}`}>
            Learn • Adapt • Build • Solve
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center text-xs font-semibold text-red-400 tracking-wide animate-pulse">
            {error.message || error || 'Registration Failed'}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              className={`text-[11px] font-semibold tracking-[0.5px] uppercase ${currentTheme.descText}`}
            >
              Name
            </label>
            <div className="relative flex items-center group">
              <User
                className={`absolute left-[14px] text-[#94a3b8] transition-colors duration-300 ${currentTheme.iconFocus}`}
                size={18}
              />
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`w-full pl-[42px] pr-4 py-3 text-sm outline-none box-border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl ${currentTheme.inputBg} ${currentTheme.inputFocus}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className={`text-[11px] font-semibold tracking-[0.5px] uppercase ${currentTheme.descText}`}
            >
              Email Address
            </label>
            <div className="relative flex items-center group">
              <Mail
                className={`absolute left-[14px] text-[#94a3b8] transition-colors duration-300 ${currentTheme.iconFocus}`}
                size={18}
              />
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-[42px] pr-4 py-3 text-sm outline-none box-border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl ${currentTheme.inputBg} ${currentTheme.inputFocus}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className={`text-[11px] font-semibold tracking-[0.5px] uppercase ${currentTheme.descText}`}
            >
              Password
            </label>
            <div className="relative flex items-center group">
              <Lock
                className={`absolute left-[14px] text-[#94a3b8] transition-colors duration-300 ${currentTheme.iconFocus}`}
                size={18}
              />
              <input
                type={showPassword ? 'text' : 'password'} // Type dynamically changes from password to text
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full pl-[42px] pr-[44px] py-3 text-sm outline-none box-border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl ${currentTheme.inputBg} ${currentTheme.inputFocus}`}
              />
              {/* Show/Hide Password Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[14px] bg-transparent border-none p-0 cursor-pointer text-[#94a3b8] hover:text-slate-400 focus:outline-none flex items-center h-full"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <PasswordStrengthMeter password={password} isDarkMode={isDarkMode} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group/btn bg-gradient-to-r text-white border-none py-3 px-4 rounded-xl text-[14.5px] font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-[2px] disabled:opacity-50 ${currentTheme.btnGradient} ${currentTheme.btnShadow}`}
          >
            <span>{loading ? 'Registering...' : 'Register'}</span>
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/btn:translate-x-[3px]"
            />
          </button>
        </form>

        <div
          className={`mt-6 pt-5 border-t text-center ${isDarkMode ? 'border-[#1e293b]' : 'border-slate-100'}`}
        >
          <p className={`text-sm m-0 ${currentTheme.descText}`}>
            Already have an account?{' '}
            <Link
              to="/login"
              className={`inline-flex items-center font-semibold transition-all duration-300 hover:underline ${currentTheme.linkText}`}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
