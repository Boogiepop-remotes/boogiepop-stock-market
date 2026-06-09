# Vite + React + Module Federation (este repo)

Complemento a [AGENTS.md](../AGENTS.md) y [stack.md](stack.md). Sustituye el rol de **`streamlit-notes.md`** del seed Streamlit hermano.

## Entry y routers

- **Standalone**: [src/App.tsx](../src/App.tsx) usa `BrowserRouter` + [AppRoutes](../src/router/AppRoutes.tsx).
- **Remote federado**: [RemoteShell.tsx](../src/mf-remote/RemoteShell.tsx) envuelve las mismas rutas con **`MemoryRouter`** para no competir con el historial del **host**.
- Vista principal del producto del seed (copy + especificación): **[SeedLandingPage.tsx](../src/pages/SeedLandingPage.tsx)** una sola pantalla `/`.

## Navbar y chrome

Este seed **no** incluye navbar de aplicación; el host la provee. El layout sólo contenido ([AppLayout.tsx](../src/layout/AppLayout.tsx)).

## Estilos (boogiepop-ui)

- Tokens de diseño en el paquete `boogiepop-ui`: primario `#4361ee` (azul), fondo `#fff` / `#f0f2f6`, texto `#1a1a2e`; fuentes IBM Plex.
- [src/index.css](../src/index.css) importa `boogiepop-ui/styles` y expone utilidades Tailwind: `text-bp-body`, `bg-bp-muted-bg`, `border-bp-border`, `text-bp-muted`, etc.
- Clases CSS directas disponibles globalmente: `.bp-btn-primary`, `.bp-btn-secondary`, `.bp-card`, `.bp-inline-code`, `.bp-muted`.
- Componentes React: `import { Button, Card, Input, Select, Text } from 'boogiepop-ui'`.
- **No redefinir tokens en el seed** — los cambios de diseño van en el repo `boogiepop-ui`.

## Module Federation + URLs

- Producción/CDN: alinear **`VITE_REMOTE_BASE`** con la URL donde se publican chunks; errores típicos = 404 de assets cuando el host carga desde otro origin.
- [nginx.conf](../nginx.conf) incluye headers útiles para carga entre orígenes; revisar CORP/CORS con seguridad corporativa del host.

## Auth

- `boogiepop-auth-sdk` resuelve la sesión automáticamente: host-bridge (cuando corre federado) → `?bpToken` en URL → `sessionStorage` → `devToken` → sin sesión.
- [AuthPlaceholder](../src/components/AuthPlaceholder.tsx) muestra el estado actual: origen, usuario, roles.
- Para verificar permisos: `hasRole(snapshot, 'nombre')`, `hasWorkspace(snapshot, 'ws')`, `hasAbility(snapshot, 'ability')`.
- No añadir OAuth propio al remote — el login ocurre en el host o externamente.

## Favicon + título de pestaña (paridad Streamlit)

- Streamlit arma la pestaña con **`configure_page`** → `st.set_page_config`: título combinado **`{title} · {PLATFORM_APP_TITLE}`** (ej. `Inicio · Boogiepop Streamlit Seed`; `PLATFORM_APP_TITLE` en `seed_main.py`).
- En este repo, [index.html](../index.html): **`<title>Inicio · Boogiepop React Remote Seed</title>`** (equiv. plataforma = “Boogiepop React Remote Seed”).
- [public/favicon.svg](../public/favicon.svg): **brote dibujado en SVG** (no emoji), fondo **`#f0f2f6`**, paralelo conceptual al 🌱 de Streamlit.

## ESLint

- Ejecutar `npm run lint` tras cambios de UI o imports grandes.
