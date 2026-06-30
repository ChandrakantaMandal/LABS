import { Routes, Route } from 'react-router-dom'
import DocsLayout, { DocPage } from '../docs/DocsLayout.jsx'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/docs/*"
        element={
          <DocsLayout>
            <DocPage />
          </DocsLayout>
        }
      />
    </Routes>
  )
}
