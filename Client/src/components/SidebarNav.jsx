const defaultItems = [
  { label: 'Overview', href: '/', active: true },
  { label: 'Getting started', href: '/docs/getting-started' },
  { label: 'Usage guide', href: '/docs/guide/usage' },
  { label: 'Installation', href: '/docs/guide/installation' },
]

export function SidebarNav({ items = defaultItems, title = 'Explore' }) {
  return (
    <nav className="space-y-2">
      <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
        {title}
      </p>
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
            item.active
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
          }`}
        >
          <span>{item.label}</span>
          {item.active ? <span className="text-xs">●</span> : null}
        </a>
      ))}
    </nav>
  )
}
