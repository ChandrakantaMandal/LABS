import React from 'react'

export default function RegLoader({ message = 'Creating your account...' }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm">
      <div className="w-[280px] rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/40">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
        <p className="text-center text-sm font-semibold text-white">{message}</p>
        <p className="mt-2 text-center text-xs text-slate-400">
          Please wait...
        </p>
      </div>
    </div>
  )
}
