import React, { useEffect, useState } from 'react'
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import LoginLoader from '../../components/common/loginloader'
import { themes } from '../../lib/themes.js'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // Dynamic eye button ke liye state
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
  const { login, loading, error } = useAuthStore()

  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await login({ email, password })
    if (res) {
      navigate('/dashboard')
    } else {
      toast.error(useAuthStore.getState().error || 'Login failed')
    }
  }

  const currentTheme = isDarkMode ? themes.dark : themes.light

  return (
    <div
      className={`min-h-screen w-screen flex items-center justify-center relative overflow-y-auto antialiased select-none font-sans transition-colors duration-300 ${currentTheme.bgMain}`}
    >
      {loading && <LoginLoader />}
      {/* Mobile-only orbs */}
      <div
        className={`md:hidden absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 top-[-50px] left-[-50px] transition-all duration-700 ${currentTheme.orbLeft}`}
      ></div>
      <div
        className={`md:hidden absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 bottom-[-50px] right-[-50px] transition-all duration-700 ${currentTheme.orbRight}`}
      ></div>

      <div className="flex w-full min-h-screen md:min-h-0 md:h-screen md:overflow-hidden z-10 relative">
        {/* Left branding panel — desktop only */}
        <div
          className={`hidden md:flex flex-col items-center justify-center w-[45%] relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-[#0f172a] via-[#1a1040] to-[#0f172a]' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-white'}`}
        >
          <div
            className={`absolute w-[300px] h-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none top-[-60px] left-[-60px] ${isDarkMode ? 'bg-[#6366f1]' : 'bg-indigo-300'}`}
          ></div>
          <div
            className={`absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-20 pointer-events-none bottom-[-40px] right-[-40px] ${isDarkMode ? 'bg-[#a855f7]' : 'bg-purple-300'}`}
          ></div>

          <div className="relative z-10 text-center px-8">
            <div
              className={`border w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${currentTheme.badgeBg} ${currentTheme.badgeBorder}`}
            >
              <span
                className={`font-mono text-lg font-bold transition-colors duration-500 ${currentTheme.badgeText}`}
              >
                {'< />'}
              </span>
            </div>
            <h1
              className={`text-4xl font-extrabold m-0 tracking-[3px] mb-3 ${currentTheme.titleText}`}
            >
              LABS
            </h1>
            <p className={`text-base m-0 font-medium mb-8 ${currentTheme.descText}`}>
              Learn • Adapt • Build • Solve
            </p>
            <div className={`space-y-3 text-left max-w-[260px] mx-auto`}>
              <div className={`flex items-center gap-3 text-sm ${currentTheme.descText}`}>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${isDarkMode ? 'bg-[#6366f1]' : 'bg-indigo-500'}`}
                ></div>
                <span>Secure authentication system</span>
              </div>
              <div className={`flex items-center gap-3 text-sm ${currentTheme.descText}`}>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${isDarkMode ? 'bg-[#a855f7]' : 'bg-purple-500'}`}
                ></div>
                <span>Real-time email verification</span>
              </div>
              <div className={`flex items-center gap-3 text-sm ${currentTheme.descText}`}>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${isDarkMode ? 'bg-[#22d3ee]' : 'bg-cyan-500'}`}
                ></div>
                <span>Full-stack modern architecture</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div
          className={`flex-1 flex items-center justify-center px-4 py-6 md:px-10 md:py-8 ${currentTheme.bgMain}`}
        >
          <div
            className={`border rounded-[20px] px-7 py-8 w-full max-w-[400px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${currentTheme.cardBg} ${currentTheme.hoverBorder}`}
          >
            {/* Mobile-only header */}
            <div className="text-center mb-6 md:hidden">
              <div
                className={`border w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${currentTheme.badgeBg} ${currentTheme.badgeBorder}`}
              >
                <span
                  className={`font-mono text-base font-bold transition-colors duration-500 ${currentTheme.badgeText}`}
                >
                  {'< />'}
                </span>
              </div>
              <h1
                className={`text-[28px] font-extrabold m-0 tracking-[2px] ${currentTheme.titleText}`}
              >
                LABS
              </h1>
              <p className={`text-sm mt-1 m-0 font-medium ${currentTheme.descText}`}>
                Learn • Adapt • Build • Solve
              </p>
            </div>

            {/* Desktop-only welcome */}
            <div className="hidden md:block text-center mb-6">
              <h2
                className={`text-2xl font-extrabold m-0 tracking-[1px] mb-1 ${currentTheme.titleText}`}
              >
                Welcome back
              </h2>
              <p className={`text-sm m-0 ${currentTheme.descText}`}>Sign in to your account</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`w-full pl-[42px] pr-[44px] py-3 text-sm outline-none box-border transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-xl ${currentTheme.inputBg} ${currentTheme.inputFocus}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-[14px] bg-transparent border-none p-0 cursor-pointer text-[#94a3b8] hover:text-slate-400 focus:outline-none flex items-center h-full"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="text-right -mt-1">
                <Link
                  to="/forgot-password"
                  className={`text-xs font-semibold ${currentTheme.linkText}`}
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`group/btn bg-gradient-to-r text-white border-none py-3 px-4 rounded-xl text-[14.5px] font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-[2px] disabled:opacity-50 ${currentTheme.btnGradient} ${currentTheme.btnShadow}`}
              >
                <span>{loading ? 'Logging in...' : 'Login'}</span>
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
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className={`inline-flex items-center font-semibold transition-all duration-300 hover:underline ${currentTheme.linkText}`}
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login