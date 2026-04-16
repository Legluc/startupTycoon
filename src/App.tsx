import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/components/AppLayout'
import { HomePage } from '@/pages/Game'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Settings } from '@/pages/Settings'

const Shop = lazy(() =>
  import('@/pages/Shop').then((m) => ({ default: m.Shop }))
)
const Stats = lazy(() =>
  import('@/pages/Stats').then((m) => ({ default: m.Stats }))
)

function LoadingPage() {
  return (
    <section className="hero">
      <p>Chargement...</p>
    </section>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path="shop"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Shop />
            </Suspense>
          }
        />
        <Route
          path="stats"
          element={
            <Suspense fallback={<LoadingPage />}>
              <Stats />
            </Suspense>
          }
        />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/home" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
