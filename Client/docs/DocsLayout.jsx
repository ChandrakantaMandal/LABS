import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loadDocs } from './docsLoader'
import DocPage from './DocPage.jsx'

export default function DocsLayout() {
  const navigate = useNavigate()
  const location = useLocation()

  const sections = useMemo(() => loadDocs(), [])

  // 🔥 Sidebar collapse state
  const [openSections, setOpenSections] = useState({})

  // 🔥 find doc by URL
  const allDocs = sections.flatMap((s) => s.items)

  const currentDoc = allDocs.find((d) => d.slug === location.pathname) || allDocs[0]

  const currentSection = sections.find((s) => s.items.some((i) => i.id === currentDoc?.id))

  // 🔥 navigate if URL changes
  useEffect(() => {
    if (!location.pathname || location.pathname === '/docs') {
      navigate(currentDoc.slug, { replace: true })
    }
  }, [])

  const handleClick = (doc, section) => {
    navigate(doc.slug)
  }

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  return (
    <div className="flex h-screen bg-[#0b1326] text-[#dae2fd]">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#2a2a3a] p-4 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            {/* Folder Header */}
            <div
              onClick={() => toggleSection(section.title)}
              className="text-sm text-[#918fa1] mb-2 cursor-pointer flex justify-between"
            >
              {section.title}
              <span>{openSections[section.title] ? '−' : '+'}</span>
            </div>

            {/* Items */}
            {openSections[section.title] !== false && (
              <div className="space-y-1">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleClick(item, section)}
                    className={`px-2 py-1 rounded text-sm cursor-pointer ${
                      currentDoc?.id === item.id ? 'bg-[#2a2a3a]' : 'hover:bg-[#1e1e2f]'
                    }`}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <DocPage doc={currentDoc} section={currentSection} />
      </div>
    </div>
  )
}
