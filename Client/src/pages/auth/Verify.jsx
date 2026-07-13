import React, { useState, useRef, useEffect } from 'react'
import { ArrowRight, ShieldCheck, RotateCcw } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Verify() {
  const { verifyOtp, resendOtp, loading } = useAuthStore()
  const [email] = useState(() => sessionStorage.getItem('pendingEmail') || '')
  const [otp, setOtp] = useState(new Array(6).fill(''))
  const [timeLeft, setTimeLeft] = useState(300)
  const inputRefs = useRef([])

  const navigate = useNavigate()

  useEffect(() => {
    if (timeLeft === 0) {
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) {
      return
    }
    const newOtp = [...otp]
    newOtp[index] = element.value
    setOtp(newOtp)
    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData('text').replace(/\D/g, '')

    if (!pastedValue) {
      return
    }

    e.preventDefault()

    const digits = pastedValue.slice(0, 6).split('')
    const newOtp = Array(6).fill('')

    digits.forEach((digit, index) => {
      newOtp[index] = digit
    })

    setOtp(newOtp)

    const nextIndex = Math.min(digits.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleVerify = async (e) => {
    e.preventDefault()
    const verificationCode = otp.join('')

    try {
      await verifyOtp({ email, otp: verificationCode })
      toast.success('OTP Verified')
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Invalid OTP'
      toast.error(msg)
    }
  }

  const handleResend = async () => {
    try {
      await resendOtp({ email })
      setTimeLeft(300)
      setOtp(new Array(6).fill(''))
      inputRefs.current[0].focus()
      toast.success('OTP Resent')
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to resend OTP'
      toast.error(msg)
    }
  }

  return (
    <div className="bg-[#060913] min-h-screen w-screen flex items-center justify-center relative overflow-y-auto antialiased select-none font-sans">
      {/* Mobile-only orbs */}
      <div className="md:hidden absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 top-[-50px] left-[-50px] bg-[#6366f1]"></div>
      <div className="md:hidden absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 pointer-events-none z-1 bottom-[-50px] right-[-50px] bg-[#a855f7]"></div>

      <div className="flex w-full min-h-screen md:min-h-0 md:h-screen md:overflow-hidden z-10 relative">
        {/* Left branding panel — desktop only */}
        <div className="hidden md:flex flex-col items-center justify-center w-[45%] relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1a1040] to-[#0f172a]">
          <div className="absolute w-[300px] h-[300px] rounded-full blur-[120px] opacity-20 pointer-events-none top-[-60px] left-[-60px] bg-[#6366f1]"></div>
          <div className="absolute w-[250px] h-[250px] rounded-full blur-[100px] opacity-20 pointer-events-none bottom-[-40px] right-[-40px] bg-[#a855f7]"></div>

          <div className="relative z-10 text-center px-8">
            <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck
                className="drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                size={28}
                color="#818cf8"
              />
            </div>
            <h1 className="text-4xl font-extrabold text-white m-0 tracking-[3px] mb-3">LABS</h1>
            <p className="text-base text-[#94a3b8] m-0 font-medium mb-8">
              Learn • Adapt • Build • Solve
            </p>
            <div className="space-y-3 text-left max-w-[260px] mx-auto">
              <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                <div className="w-2 h-2 rounded-full shrink-0 bg-[#6366f1]"></div>
                <span>One-time verification code</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                <div className="w-2 h-2 rounded-full shrink-0 bg-[#a855f7]"></div>
                <span>Expires in 5 minutes</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#94a3b8]">
                <div className="w-2 h-2 rounded-full shrink-0 bg-[#22d3ee]"></div>
                <span>Check your spam folder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex-1 flex items-center justify-center px-4 py-6 md:px-10 md:py-8 bg-[#060913]">
          <div className="bg-[#0b1324] border border-[#1e293b] rounded-[20px] px-7 py-10 w-full max-w-[440px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#6366f1]/30 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(99,102,241,0.1)]">
            {/* Mobile-only header */}
            <div className="text-center mb-8 md:hidden">
              <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 w-14 h-14 rounded-[14px] flex items-center justify-center mx-auto mb-4">
                <ShieldCheck
                  className="drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                  size={24}
                  color="#818cf8"
                />
              </div>
              <h1 className="text-2xl font-extrabold text-white m-0 tracking-[1px]">
                Verify Email
              </h1>
              <p className="text-[13.5px] text-[#94a3b8] mt-2 m-0 leading-relaxed">
                We've sent a 6-digit code to{' '}
                <span className="text-white font-semibold">{email}</span>
              </p>
            </div>

            {/* Desktop-only header */}
            <div className="hidden md:block text-center mb-8">
              <h2 className="text-2xl font-extrabold text-white m-0 tracking-[1px] mb-1">
                Verify Your Email
              </h2>
              <p className="text-[13.5px] text-[#94a3b8] m-0">
                Enter the code sent to <span className="text-white font-semibold">{email}</span>
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleVerify} className="flex flex-col gap-7">
              <div className="grid grid-cols-6 gap-2 justify-center w-full">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    className="w-full h-13 bg-[#060913] border border-[#1e293b] rounded-xl text-xl font-bold text-white text-center outline-none box-border transition-all duration-200 ease-in-out hover:border-white/40 focus:border-white focus:bg-[#090e1e] focus:shadow-[0_0_15px_rgba(255,255,255,0.15)] focus:scale-[1.04]"
                  />
                ))}
              </div>

              <button
                type="submit"
                className="group/btn bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white border-none py-3.5 px-4 rounded-xl text-[15px] font-bold cursor-pointer flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(99,102,241,0.55)]"
              >
                <span>{loading ? 'Verifying...' : 'Verify Code'}</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/btn:translate-x-[3px]"
                />
              </button>
            </form>

            {/* Resend */}
            <div className="mt-7 text-center">
              {timeLeft > 0 ? (
                <p className="text-[13.5px] text-[#94a3b8] m-0">
                  Code expires in{' '}
                  <span className="text-white font-bold font-mono">
                    {Math.floor(timeLeft / 60)}:
                    {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
                  </span>
                </p>
              ) : (
                <p className="text-[13.5px] text-[#94a3b8] m-0">
                  Code expired?{' '}
                  <button
                    type="button"
                    className="bg-none border-none text-[#6366f1] text-[13.5px] font-semibold cursor-pointer inline-flex items-center gap-1 p-0 ml-1.5 transition-all duration-200 hover:text-[#a855f7] hover:underline"
                    onClick={handleResend}
                  >
                    <RotateCcw size={12} />
                    <span>Resend Code</span>
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
