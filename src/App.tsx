import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './router/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-svh flex-col">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}
