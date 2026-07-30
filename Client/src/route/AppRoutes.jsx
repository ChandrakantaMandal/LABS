import { Routes, Route } from 'react-router-dom'
import DocsLayout from '../../docs/DocsLayout.jsx'
import { lazy, Suspense } from 'react'
import ProtectedRoute from './ProtectedRoute.jsx'
import Loader from '../components/common/Loader.jsx'

// Lazy loaded pages
const Landing = lazy(() => import('../pages/Landing.jsx'))
const Login = lazy(() => import('../pages/auth/Login.jsx'))
const Register = lazy(() => import('../pages/auth/Register.jsx'))
const Verify = lazy(() => import('../pages/auth/Verify.jsx'))

// Dashboard Section Pages
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword.jsx'))
const Dashboard = lazy(() => import('../pages/dashboard/Dashboard.jsx'))
const Settings = lazy(() => import('../pages/dashboard/Settings.jsx'))
const Challenges = lazy(() => import('../pages/dashboard/Challenges.jsx'))
const Curriculum = lazy(() => import('../pages/dashboard/Curriculum.jsx'))
const SolveProblem = lazy(() => import('../pages/dashboard/SolveProblem.jsx'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges"
          element={
            <ProtectedRoute>
              <Challenges />
            </ProtectedRoute>
          }
        />
        <Route
          path="/challenges/solve/:id"
          element={
            <ProtectedRoute>
              <SolveProblem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/curriculum"
          element={
            <ProtectedRoute>
              <Curriculum />
            </ProtectedRoute>
          }
        />

        {/* Docs Route */}
        <Route path="/docs/*" element={<DocsLayout />} />
      </Routes>
    </Suspense>
  )
}
