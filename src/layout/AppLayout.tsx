import { Outlet } from 'react-router-dom'

/**
 * Ocupa todo el alto/ancho disponible: standalone (`App` ya da `min-h-svh`), y en hub el padre usa
 * `HOST_HUB_EMBED_FILL_CLASS` para estirar el remote. Mantener esta cadena flexible (no usar
 * solo `min-h-svh` aquí dentro del área del hub, evitaría scrollbar doble — ver docs del host).
 */
export function AppLayout() {
  return (
    <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden bg-bp-bg">
      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
        <Outlet />
      </div>
    </div>
  )
}
