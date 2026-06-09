import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout'
import { CommoditiesPage } from '../pages/CommoditiesPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<CommoditiesPage />} />
        <Route path="*" element={<CommoditiesPage />} />
      </Route>
    </Routes>
  )
}
