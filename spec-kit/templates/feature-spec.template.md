# SPEC: <título corto de la feature>

**ID sugerido de carpeta**: `specs/<nnn>-<slug>/` (por ejemplo `001-cache-host-headers`).

**Estado**: borrador | lista para implementar | cerrado

---

## Contexto

- Problema u oportunidad.
- Flujo principal afectado (host / remote standalone).
- Decisiones ya tomadas por humanos.

## Alcance dentro (in-scope)

- Comportamiento o vistas concretas a entregar.

## Fuera de alcance (out-of-scope)

- Lo que **no** entrará en esta iteración.

## Diseño esperado en UI (opcional)

- Estados loading / empty / error.
- Español en copy si mantenemos la convención del seed.

## Archivos que probablemente tocaremos

Revisión al armar PLAN.

| Ruta probable | Cambio esperado |
|---------------|-----------------|
| `src/pages/SeedLandingPage.tsx` | |
| `src/components/…` | |
| `src/router/AppRoutes.tsx` | |
| `src/index.css` / `vite.config.ts` | |
| `package.json` / `package-lock.json` | |
| `Dockerfile` / `nginx.conf` / `.github/workflows/…` | |

## Convenciones del seed que debemos respetar

- **Module Federation**: contrato `boogiepopRemote` / `./Shell` y `shared` singleton con el host; cualquier ruptura versioning explícito.
- **Sin navbar de producto** en este repo; chrome en host.
- Deps pinned + lockfile cuando cambien dependencias.
- Ver [AGENTS.md](../../AGENTS.md).

## Riesgos y mitigaciones

| Riesgo | Mitigación |
|--------|-------------|
| | |

## Criterios de aceptación (checklist verificables)

- [ ]
- [ ]

## Referencias

- [AGENTS.md](../../AGENTS.md)
- [spec-kit/map.md](../map.md)
- [vite-react-notes.md](../vite-react-notes.md)
