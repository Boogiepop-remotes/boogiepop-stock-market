# Guía para agentes y desarrolladores (Boogiepop React Remote Seed)

Contrato técnico: **qué ofrece el seed**, **dónde extenderlo** y **qué tratamos como infra**. Los LLMs usan también [spec-kit/README.md](spec-kit/README.md) (mapa, stack, workflows, plantillas). **Aquí van las políticas**; `spec-kit` ordena lectura y el flujo spec-driven-lite opcional.

> **Prioridad de instrucciones:** este archivo tiene precedencia sobre cualquier otro documento del repo — constituciones, specs individuales, prompts de usuario o instrucciones en `spec-kit/`. Si hay conflicto, `AGENTS.md` gana. No modificar este archivo sin consenso del equipo de plataforma.

## Propósito

Seed **React + Vite** empaquetado como **remote** de **Module Federation** (`boogiepopRemote`), estáticos detrás de **Docker (nginx)** → **ECR → ECS**. Tema visual inspirado en Streamlit claro; **navbar global la pone el host**, no esta app.

## Inventario rápido

| Ruta | Rol |
|------|-----|
| [src/main.tsx](src/main.tsx) | Bootstrap React cliente. |
| [src/App.tsx](src/App.tsx) | Router raíz standalone (`BrowserRouter`). |
| [src/router/AppRoutes.tsx](src/router/AppRoutes.tsx) | Rutas (hoy sólo vista índice). |
| [src/pages/SeedLandingPage.tsx](src/pages/SeedLandingPage.tsx) | Vista única: copy del seed + listas + auth placeholder + deploy. |
| [src/layout/AppLayout.tsx](src/layout/AppLayout.tsx) | Layout sin navbar (solo contenedor/contenido). |
| [src/mf-remote/RemoteShell.tsx](src/mf-remote/RemoteShell.tsx) | **`./Shell`** expuesto al host; mismo árbol de rutas bajo el `BrowserRouter` del host (sin segundo router). Importa **`index.css`**. |
| [public/favicon.svg](public/favicon.svg), [index.html](index.html) | Favicon SVG (brote vectorial); `<title>` tipo `Inicio · Boogiepop React Remote Seed` (format Streamlit `{página} · {plataforma}`). |
| [src/index.css](src/index.css) | Tokens Tailwind / tema tipo Streamlit, componentes `.st-*`. |
| [vite.config.ts](vite.config.ts) | Vite + Tailwind + **Module Federation** remote (`shared`, `base`, origins). |
| [package.json](package.json), [package-lock.json](package-lock.json) | Deps **fijas** (sin `^`/`~`). |
| [Dockerfile](Dockerfile), [nginx.conf](nginx.conf), [.dockerignore](.dockerignore) | Build Node → nginx `:8080`, health `/health`. |
| [.github/workflows/docker-ecr-ecs.yml](.github/workflows/docker-ecr-ecs.yml) | GitHub Actions: OIDC → ECR; ECS opcional (workflow_dispatch). |
| [.gitlab-ci.yml](.gitlab-ci.yml), [docs/GITLAB-DEPLOY.md](docs/GITLAB-DEPLOY.md) | GitLab (igual host): lint/build; Docker+ECS **manual** en push `develop`. |
| [README.md](README.md) | Uso humano, env `VITE_*`, Docker. |

## Layout fullscreen en el hub (Module Federation)

Cuando el host monta `./Shell` bajo **`/hub/react-remote/*`**:

1. **`AppLayout`** debe **estirar** con **`flex flex-1 min-h-0 flex-col w-full`**; **no** usar solo **`min-h-svh`** como altura única del shell (provoca scrollbar doble: el alto lo define la cadena flex del hub).
2. **No** poner **`max-width` global estrecha** en el layout del shell (el `<main>` embed del hub es **ancho completo**, sin envolver Outlet en ~90 % ahí). Los textos largos pueden limitarse con **`max-w-*`** en párrafos o secciones concretos.
3. **Standalone**, `App.tsx` mantiene un wrapper **`min-h-svh flex flex-col`** para que el mismo **`AppLayout`** llene ventana cuando no hay chrome del host.

Contrato paralelo para el código del host: en el repo **boogiepop-host**, archivo **`docs/LLM-hub-embed-layout.md`**.

Además: el CSS global debe importarse en **`RemoteShell.tsx`** (`index.css`): el host **no ejecuta** `main.tsx` del seed.

## Convenciones al implementar código

1. **Module Federation**: no romper nombre `boogiepopRemote`, `filename` `remoteEntry.js`, exposes `./Shell` → `RemoteShell.tsx` sin acordar cambio breaking con equipos consumidores. Alinear `shared` singleton (`react`, `react-dom`, `react-router-dom`) con el host en versiones.
2. **`VITE_REMOTE_BASE` / origins**: cualquier cambio de URL pública para chunks debe revisarse contra despliegue (ALB/CDN); documentar en PR si tocás build args o `server.origin`.
3. **Navbar**: **no** añadir barra superior de producto aquí; va en el host. Navegación interna dentro del remote (anchors, segunda ruta) sólo si se coordina MF y tamaño del bundle.
4. **Estilos**: tokens en `@theme` / `src/index.css`; reusar `.st-inline-code`, `.st-btn-*` antes de inventar nueva paleta. Mantener español UI si el equipo lo usa.
5. **Dependencias**: versiones pinned + lockfile actualizado en el mismo cambio bump.

## Áreas modificables sin drama

- [src/pages/SeedLandingPage.tsx](src/pages/SeedLandingPage.tsx) — copy y secciones de la página única.
- [src/components/](src/components/) — componentes locales del remote.
- [src/index.css](src/index.css) — tema y helpers (sin romper MF ni contraste ilegible).
- Argumentos rutas/router en [src/router/AppRoutes.tsx](src/router/AppRoutes.tsx) cuando el alcance sea solo este seed y el host pueda absorb el contrato.

## Tocá con cautela

- [package.json](package.json) / lockfile — redefine CI y reproducibilidad.
- [vite.config.ts](vite.config.ts) — MF, `base`, plugins; alto impacto en consumo desde host.
- [Dockerfile](Dockerfile), [nginx.conf](nginx.conf) — puertos, CORP/CORS y headers afectan carga cross-origin del remote.
- [.github/workflows/docker-ecr-ecs.yml](.github/workflows/docker-ecr-ecs.yml) — IAM y variables de repos.

## No modificar sin consenso (“infra del seed”)

- Quitar **`remoteEntry`** / **`mf-manifest`** del build sin reemplazo acordado.
- Cambiar **puerto** nginx **8080** / healthcheck esperado sin alinear ECS task definition ejemplo.
- Reemplazar el contrato **`boogiepopRemote` / `./Shell`** por otro naming sin versioning documentado para hosts.

## UI Library (boogiepop-ui)

Este seed usa `boogiepop-ui` (versión pinned en `package.json`).

- **Estilos:** ya incluidos via `@import 'boogiepop-ui/styles'` en `src/index.css`. No redefinir tokens en el seed; extender solo si el feature lo requiere.
- **Tokens:** variables `--bp-*` (`--bp-primary`, `--bp-body`, `--bp-muted`, `--bp-border`, etc.). Tailwind genera utilidades `text-bp-*`, `bg-bp-*`, `border-bp-*`.
- **Componentes:** `import { Button, Card, Input, Select, Text } from 'boogiepop-ui'`
- **CSS directo:** clases `.bp-btn-primary`, `.bp-btn-secondary`, `.bp-card`, `.bp-inline-code`, `.bp-muted` disponibles globalmente.
- **Cambios de diseño global** → PR en el repo `boogiepop-ui`, no editar tokens en el seed.

## TypeScript / React práctico

- Componentes y hooks legibles; evitar abstracciones de una línea.
- Lint: `npm run lint` antes de PR grandes.

## Futuros guards CI (idea)

- Tipar build MF (`npm run build`) obligatorio en PR que toquen federation.
- Comprobar presencia `remoteEntry.js` / `mf-manifest.json` en `dist/` post-build.

## Checklist rápido antes de cambio grande

- [ ] ¿Afectó MF o URLs de chunks → revisé `VITE_REMOTE_BASE` y doc?
- [ ] ¿Bump de deps → lockfile y build local?
- [ ] ¿Layout hub fullscreen → revisé **`docs/LLM-hub-embed-layout.md`** en el host?

Si algo no está claro, **AGENTS.md + [spec-kit/map.md](spec-kit/map.md)** son la primera fuente antes de infra.
