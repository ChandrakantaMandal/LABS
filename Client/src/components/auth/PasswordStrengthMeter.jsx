import React from 'react'

export default function PasswordStrengthMeter({ password, isDarkMode = true, isValidPassword = false }) {
  const checks = [
    { label: 'At least 8 characters', test: password.length >= 8 },
    { label: 'Uppercase letter', test: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', test: /[a-z]/.test(password) },
    { label: 'Number', test: /\d/.test(password) },
    { label: 'Special character', test: /[^A-Za-z0-9]/.test(password) },
  ]

  let score = 0
  checks.forEach((check) => {
    if (check.test) score += 1
  })

  const strengthMap = [
    {
      label: 'Very weak',
      bar: 'bg-red-500',
      text: 'text-red-400',
      hint: 'Add more variety to make it stronger.',
    },
    {
      label: 'Weak',
      bar: 'bg-orange-500',
      text: 'text-orange-400',
      hint: 'A few more improvements will help.',
    },
    {
      label: 'Fair',
      bar: 'bg-amber-500',
      text: 'text-amber-400',
      hint: 'Good start, but you can make it stronger.',
    },
    {
      label: 'Good',
      bar: 'bg-sky-500',
      text: 'text-sky-400',
      hint: 'Strong password with solid variety.',
    },
    {
      label: 'Strong',
      bar: 'bg-emerald-500',
      text: 'text-emerald-400',
      hint: 'Excellent password strength.',
    },
  ]

  const currentStrength = password
    ? isValidPassword
      ? strengthMap[4]
      : strengthMap[Math.min(Math.max(score - 1, 0), 3)]
    : strengthMap[0]
  const width = password ? `${(score / 5) * 100}%` : '0%'
  const mutedText = isDarkMode ? 'text-slate-400' : 'text-slate-600'
  const borderClass = isDarkMode ? 'border-slate-800' : 'border-slate-200'
  const statusText = password
    ? isValidPassword
      ? 'Password meets all requirements.'
      : 'Password must meet all requirements before registration.'
    : 'Use 8+ characters with a mix of letters, numbers, and symbols.'
  const statusColor = password && !isValidPassword ? 'text-red-400' : currentStrength.text

  return (
    <div className={`mt-2 rounded-xl border px-3 py-2 ${borderClass} ${isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
      <div className="mb-2 flex items-center justify-between text-[11px]">
        <span className={`font-medium ${mutedText}`}>Password strength</span>
        <span className={`font-semibold ${statusColor}`}>{password ? (isValidPassword ? 'Strong' : 'Needs improvement') : 'Not started'}</span>
      </div>

      <div className="mb-2 h-2 overflow-hidden rounded-full bg-slate-700/40">
        <div className={`h-full rounded-full transition-all duration-300 ${currentStrength.bar}`} style={{ width }} />
      </div>

      <p className={`mb-2 text-[11px] ${password && !isValidPassword ? 'text-red-400' : mutedText}`}>{statusText}</p>

      <div className="space-y-1">
        {checks.map((check) => (
          <div key={check.label} className="flex items-center gap-2 text-[11px]">
            <span className={check.test ? 'text-emerald-400' : mutedText}>{check.test ? '✓' : '•'}</span>
            <span className={check.test ? 'text-emerald-400' : mutedText}>{check.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
