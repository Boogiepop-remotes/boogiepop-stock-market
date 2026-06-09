import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout'
import { SeedLandingPage } from '../pages/SeedLandingPage'

/**
 * Rutas relativas cuando el Shell se monta bajo `/hub/react-remote/*` en el host
 * (`Routes` descendiente). Rutas desde la raíz cuando corre solo con `BrowserRouter`.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SeedLandingPage />} />
        <Route path="*" element={<SeedLandingPage />} />
      </Route>
    </Routes>
  )
}
