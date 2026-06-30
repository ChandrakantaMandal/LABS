import { FeatureCard } from '../components/FeatureCard.jsx'
import { SearchBar } from '../components/SearchBar.jsx'
import { SidebarNav } from '../components/SidebarNav.jsx'
import { ThemeToggle } from '../components/ThemeToggle.jsx'

const cards = [
  {
    title: 'Getting started',
    description:
      'Learn the structure of the LABS experience and begin your first guided walkthrough.',
    badge: 'New',
    href: '/docs/getting-started',
  },
  {
    title: 'Installation',
    description: 'Set up the client and server environment with the recommended local workflow.',
    badge: 'Setup',
    href: '/docs/guide/installation',
  },
  {
    title: 'Usage guide',
    description: 'See how the docs layout, navigation, and examples work together in the app.',
    badge: 'Docs',
    href: '/docs/guide/usage',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 transition-colors dark:bg-slate-950 dark:text-slate-300">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100"
          >
            LABS
          </a>
          <div className="flex-1">
            <SearchBar />
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8 lg:py-10">
        <aside className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:w-72">
          <SidebarNav />
        </aside>

        <main className="flex-1 space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
              Developer-first learning workspace
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl">
              Build a calm, focused experience for exploration and documentation.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              The interface now uses a clear visual hierarchy, compact navigation, and polished
              cards so learning feels effortless.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/docs/getting-started"
                className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                Open docs
              </a>
              <a
                href="/docs/guide/usage"
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300"
              >
                Read usage guide
              </a>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              What changed
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              <li>
                • Added a polished home shell with header, sidebar, search, and theme switching.
              </li>
              <li>• Introduced reusable cards and navigation components for the visual system.</li>
              <li>• Kept the docs experience intact while reflecting the new design direction.</li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  )
}
