import { useState } from 'react'

export function SearchBar({ placeholder = 'Search docs...' }) {
  const [value, setValue] = useState('')

  return (
    <label className="flex-1">
      <span className="sr-only">Search</span>
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-400"
      />
    </label>
  )
}
