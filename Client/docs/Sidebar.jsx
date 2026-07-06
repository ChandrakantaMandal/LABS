export default function Sidebar({ docs, onSelect, current }) {
  return (
    <div className="w-[280px] bg-[#131b2e] border-r border-[#2d3449] p-4">
      <h2 className="text-lg font-semibold mb-6">Docs</h2>

      {docs.map((section) => (
        <div key={section.title} className="mb-6">
          <h3 className="text-sm uppercase text-[#918fa1] mb-2 px-2">{section.title}</h3>

          <div className="space-y-1">
            {section.items.map((doc) => {
              const active = current?.id === doc.id

              return (
                <div
                  key={doc.id}
                  onClick={() => onSelect(doc)}
                  className={`
                    px-3 py-2 rounded-md cursor-pointer transition-all
                    ${
                      active
                        ? 'bg-indigo-500/20 text-indigo-400 border-l-2 border-indigo-500'
                        : 'text-[#918fa1] hover:bg-[#171f33] hover:text-[#dae2fd]'
                    }
                  `}
                >
                  {doc.title}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
