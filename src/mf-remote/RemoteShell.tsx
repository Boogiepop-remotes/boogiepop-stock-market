/** Estilos globales + Tailwind: en federation el host NO ejecuta `main.tsx`; hay que cargarlos acá para que MF inyecte el CSS en el documento del host. */
import '../index.css'

import { AppRoutes } from '../router/AppRoutes'

/**
 * Remote montado dentro del BrowserRouter del host.
 * RR v6 prohibe `<MemoryRouter>` (u otro `<Router>`) anidado; los `<Routes>` de `AppRoutes`
 * funcionan como **descendent** routes siempre que el padre declare `path=".../*"`.
 *
 * Ejecutado standalone, `BrowserRouter` en `App.tsx` envuelve el mismo árbol.
 */
export default function RemoteShell() {
  return <AppRoutes />
}
