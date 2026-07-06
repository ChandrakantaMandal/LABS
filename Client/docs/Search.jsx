import Fuse from 'fuse.js'
import { useState, useMemo } from 'react'

export default function Search({ docs, onSelect }) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(() => {
    return new Fuse(docs, {
      keys: ['title', 'searchText'],
      threshold: 0.4,
    })
  }, [docs])

  const results = query ? fuse.search(query).map((r) => r.item) : []

  return (
    <div className="relative max-w-md">
      <input
        className="w-full px-4 py-2 rounded-md 
                   bg-[#171f33] border border-[#2d3449]
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   placeholder:text-[#918fa1]"
        placeholder="Search topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query && (
        <div
          className="absolute w-full mt-2 rounded-lg 
                        bg-[#131b2e] border border-[#2d3449] 
                        shadow-lg z-50"
        >
          {results.length > 0 ? (
            results.map((doc) => (
              <div
                key={doc.id}
                className="px-4 py-2 cursor-pointer hover:bg-indigo-500/10"
                onClick={() => {
                  onSelect(doc)
                  setQuery('')
                }}
              >
                {doc.title}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-[#918fa1]">No results</div>
          )}
        </div>
      )}
    </div>
  )
}
