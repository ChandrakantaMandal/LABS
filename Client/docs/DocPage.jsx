import { useNavigate } from 'react-router-dom'
import { Suspense } from 'react'
import DocSkeleton from './DocSkeleton.jsx'

export default function DocPage({ doc, section }) {
  const navigate = useNavigate()

  if (!doc || !section) {
    return null
  }

  const Component = doc.component

  const index = section.items.findIndex((item) => item.id === doc.id)

  const prev = section.items[index - 1]
  const next = section.items[index + 1]

  return (
    <div className="max-w-3xl">
      {/* Title */}
      <h1 className="text-3xl font-semibold mb-6">{doc.title}</h1>

      {/* Content */}
      <Suspense fallback={<DocSkeleton />}>
        <Component />
      </Suspense>

      {/* 🔥 NAVIGATION (RESTORED) */}
      <div className="flex justify-between mt-10 pt-6 border-t border-[#2a2a3a]">
        {/* Prev */}
        {prev ? (
          <button
            onClick={() => navigate(prev.slug)}
            className="px-4 py-2 bg-[#1e1e2f] rounded hover:bg-[#2a2a3a]"
          >
            ← {prev.title}
          </button>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <button
            onClick={() => navigate(next.slug)}
            className="px-4 py-2 bg-[#1e1e2f] rounded hover:bg-[#2a2a3a]"
          >
            {next.title} →
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
