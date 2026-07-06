export default function ArraysPage() {
  return (
    <div data-theme="light" data-topic="arrays">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar__header">
          <a href="/" className="sidebar__logo">
            <svg width="28" height="28" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="6" fill="#3b82f6" />
              <text
                x="16"
                y="22"
                textAnchor="middle"
                fontFamily="monospace"
                fontWeight="bold"
                fontSize="16"
                fill="white"
              >
                {'</>'}
              </text>
            </svg>
            DS-Algo
          </a>
        </div>

        <nav id="sidebar-nav" className="sidebar__nav"></nav>

        <div className="sidebar__footer">
          <span className="text-sm text-gray-400">
            Press <strong>?</strong> for shortcuts
          </span>
        </div>
      </aside>

      <div className="sidebar-overlay"></div>

      {/* Main Content */}
      <div className="main">
        <header className="main__header">
          <button className="hamburger" aria-label="Toggle menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="search-container">
            <svg
              className="search-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input type="text" className="search-input" placeholder="Search topics..." />

            <span className="search-shortcut">/</span>
            <div className="search-results"></div>
          </div>

          <div className="header-actions">{/* Add buttons here if needed */}</div>
        </header>

        {/* 🔥 YOUR CONTENT STARTS HERE */}
        <main className="content">
          <h1>Arrays</h1>
          <p>
            Arrays are a fundamental data structure used to store elements in contiguous memory
            locations.
          </p>

          {/* keep adding your HTML content here converted to JSX */}
        </main>
      </div>
    </div>
  )
}
