export function FeatureCard({ title, description, badge, href = '#' }) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{title}</span>
        {badge ? (
          <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
            {badge}
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
      <div className="mt-4 text-sm font-medium text-indigo-600 transition group-hover:text-indigo-500 dark:text-indigo-400">
        Explore →
      </div>
    </a>
  )
}
