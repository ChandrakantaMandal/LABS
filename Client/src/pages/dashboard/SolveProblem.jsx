import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Terminal,
  Sun,
  Moon,
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick,
  Code2,
  Sparkles,
  FileCode2,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function SolveProblem() {
  const navigate = useNavigate()
  const { id } = useParams()
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

  // Interactive Code & Execution States
  const [selectedLang, setSelectedLang] = useState('cpp')
  const [code, setCode] = useState(`class LRUCache {
public:
    LRUCache(int capacity) {
        // Initialize LRU Cache capacity
    }
    
    int get(int key) {
        return -1;
    }
    
    void put(int key, int value) {
        // Add or update key-value pair
    }
};`)

  const [activeTab, setActiveTab] = useState('description')
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [executionResult, setExecutionResult] = useState(null)

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
    shadow: isDarkMode
      ? 'shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
      : 'shadow-[0_4px_20px_rgba(148,163,184,0.1)]',
  }

  const handleRunCode = () => {
    setIsRunning(true)
    setExecutionResult(null)

    setTimeout(() => {
      setIsRunning(false)
      setExecutionResult({
        type: 'run',
        status: 'Accepted',
        runtime: '42 ms',
        memory: '16.4 MB',
        passed: 'Sample Testcases Passed',
      })
    }, 1200)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setExecutionResult(null)

    setTimeout(() => {
      setIsSubmitting(false)
      setExecutionResult({
        type: 'submit',
        status: 'Success - All Testcases Passed!',
        runtime: '38 ms',
        memory: '16.1 MB',
        passed: '18/18 Testcases Passed',
      })
    }, 1800)
  }

  return (
    <div
      className={`${theme.bgMain} ${theme.textMain} h-screen font-sans flex flex-col antialiased transition-all duration-300 overflow-hidden`}
    >
      {/* IDE HEADER */}
      <header
        className={`${theme.bgNav} backdrop-blur-md border-b ${theme.border} h-14 flex items-center px-4 justify-between shrink-0 z-40`}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className={`flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:${theme.textHeading} bg-slate-500/10 px-2.5 py-1.5 rounded-lg border ${theme.border} transition-all`}
          >
            <ArrowLeft size={14} /> Back
          </button>

          <div className={`h-4 w-[1px] ${theme.border}`} />

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-500 flex items-center justify-center shadow-md">
              <Terminal className="text-white" size={13} />
            </div>
            <span className={`font-black text-xs ${theme.textHeading}`}>LRU Cache Layout</span>
            <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Medium
            </span>
          </div>
        </div>

        {/* HEADER ACTIONS (RUN + SUBMIT BUTTONS) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 active:scale-95 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-all border border-slate-600/50 disabled:opacity-50"
          >
            <Play size={13} fill="currentColor" /> {isRunning ? 'Running...' : 'Run Code'}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs px-4 py-1.5 rounded-lg transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50"
          >
            <Send size={13} /> {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>

          <div className={`h-4 w-[1px] ${theme.border} mx-1`} />

          <button
            onClick={toggleTheme}
            className="text-slate-400 hover:text-indigo-400 p-1.5 rounded-lg bg-slate-500/10 transition-all duration-300"
          >
            {isDarkMode ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-indigo-600" />
            )}
          </button>
        </div>
      </header>

      {/* SPLIT IDE BODY */}
      <div className="flex flex-1 overflow-hidden p-3 gap-3">
        {/* LEFT PANEL: PROBLEM STATEMENT */}
        <div
          className={`w-1/2 ${theme.bgCard} border ${theme.border} rounded-2xl flex flex-col ${theme.shadow} overflow-hidden`}
        >
          <div className={`flex border-b ${theme.border} bg-slate-500/5 px-3 pt-2 gap-2`}>
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 ${activeTab === 'description' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-slate-400'}`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`pb-2 px-3 text-xs font-bold transition-all border-b-2 ${activeTab === 'solution' ? 'border-indigo-500 text-indigo-500' : 'border-transparent text-slate-400'}`}
            >
              Editorial
            </button>
          </div>

          <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
            <h2 className={`text-base font-bold ${theme.textHeading}`}>
              146. LRU Cache Architecture Design
            </h2>

            <p className="leading-relaxed opacity-90">
              Design a data structure that follows the constraints of a{' '}
              <strong>Least Recently Used (LRU) cache</strong>.
            </p>

            <div className={`p-3 rounded-xl ${theme.bgInput} border ${theme.border} space-y-2`}>
              <p className="font-bold text-indigo-400">Functions to implement:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 font-mono text-[11px]">
                <li>
                  <code className={theme.textHeading}>LRUCache(int capacity)</code> Initialize with
                  positive capacity.
                </li>
                <li>
                  <code className={theme.textHeading}>int get(int key)</code> Return value of key if
                  exists, else -1.
                </li>
                <li>
                  <code className={theme.textHeading}>void put(int key, int value)</code> Update or
                  insert key-value pair.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <p className="font-bold uppercase text-[10px] tracking-wider text-slate-400">
                Example 1:
              </p>
              <pre
                className={`p-3 rounded-xl ${theme.bgInput} border ${theme.border} font-mono text-[11px] text-emerald-400 overflow-x-auto`}
              >
                {`Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]

Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]`}
              </pre>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: CODE EDITOR & CONSOLE */}
        <div className="w-1/2 flex flex-col gap-3">
          {/* EDITOR AREA */}
          <div
            className={`flex-1 ${theme.bgCard} border ${theme.border} rounded-2xl flex flex-col ${theme.shadow} overflow-hidden`}
          >
            <div
              className={`flex items-center justify-between border-b ${theme.border} px-4 py-2 bg-slate-500/5`}
            >
              <div className="flex items-center gap-2">
                <FileCode2 size={14} className="text-indigo-400" />
                <span className={`text-xs font-bold ${theme.textHeading}`}>Solution.cpp</span>
              </div>

              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className={`text-xs font-bold ${theme.bgInput} ${theme.textHeading} border ${theme.border} rounded-lg px-2.5 py-1 focus:outline-none`}
              >
                <option value="cpp">C++</option>
                <option value="python">Python 3.10</option>
                <option value="rust">Java</option>
              </select>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full flex-1 p-4 bg-transparent font-mono text-xs focus:outline-none resize-none leading-relaxed ${theme.textHeading}`}
              spellCheck={false}
            />
          </div>

          {/* CONSOLE & EXECUTION RESULTS */}
          <div
            className={`h-40 ${theme.bgCard} border ${theme.border} rounded-2xl p-4 flex flex-col justify-between ${theme.shadow}`}
          >
            <div className="flex items-center justify-between border-b border-slate-700/20 pb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Execution Console
              </span>
              {executionResult && (
                <span
                  className={`text-xs font-bold flex items-center gap-1 ${executionResult.type === 'submit' ? 'text-emerald-400' : 'text-indigo-400'}`}
                >
                  <CheckCircle2 size={13} /> {executionResult.status}
                </span>
              )}
            </div>

            <div className="flex-1 flex items-center justify-center">
              {isRunning || isSubmitting ? (
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold animate-pulse">
                  <Sparkles size={16} />{' '}
                  {isSubmitting
                    ? 'Evaluating against all hidden testcases...'
                    : 'Compiling sample testcases...'}
                </div>
              ) : executionResult ? (
                <div className="space-y-2 text-center">
                  <div className="flex justify-center gap-6 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-amber-400" />
                      <span>
                        Runtime:{' '}
                        <strong className={theme.textHeading}>{executionResult.runtime}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MemoryStick size={14} className="text-indigo-400" />
                      <span>
                        Memory:{' '}
                        <strong className={theme.textHeading}>{executionResult.memory}</strong>
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-emerald-400 font-bold">{executionResult.passed}</p>
                </div>
              ) : (
                <p className="text-xs text-slate-500 font-medium">
                  Run or Submit your code to evaluate solution.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
