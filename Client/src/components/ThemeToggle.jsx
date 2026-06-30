import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <button
      type="button"
      onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-lg shadow-sm transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-indigo-500 dark:hover:bg-slate-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
