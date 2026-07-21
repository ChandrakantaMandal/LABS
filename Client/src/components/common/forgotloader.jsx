import React from 'react'

function ForgotLoader() {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/55 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-slate-900/80 px-8 py-6 shadow-2xl shadow-black/30">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.2s]" />
          <div className="h-3 w-3 animate-bounce rounded-full bg-purple-400 [animation-delay:-0.1s]" />
          <div className="h-3 w-3 animate-bounce rounded-full bg-cyan-400" />
        </div>
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-100 uppercase">
          Processing request...
        </p>
      </div>
    </div>
  )
}

export default ForgotLoader
