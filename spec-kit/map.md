# Mapa rápido de rutas (agente)

Referencia breve. Normas contractuales: [AGENTS.md](../AGENTS.md).

## Modificá con frecuencia (producto)

| Ruta | Cuándo |
|------|--------|
| [src/pages/SeedLandingPage.tsx](../src/pages/SeedLandingPage.tsx) | Copy, bloques del seed, anclas `#detalle-del-seed`, secciones informativas. |
| [src/components/](../src/components/) | Piezas locales (p. ej. `AuthPlaceholder`); sin navbar de producto. |
| [src/index.css](../src/index.css) | Importa `boogiepop-ui/styles` y mapea tokens `--bp-*` a utilidades Tailwind (`text-bp-body`, `bg-bp-muted-bg`, etc.). No redefinir tokens acá; los cambios globales van en el repo `boogiepop-ui`. |
| [public/favicon.svg](../public/favicon.svg), [index.html](../index.html) | Favicon SVG brote vectorial; `<title>Inicio · Boogiepop React Remote Seed`; fuentes IBM Plex. |

## Ajustás con conocimiento (impacto medio)

| Ruta | Cuándo |
|------|--------|
| [src/router/AppRoutes.tsx](../src/router/AppRoutes.tsx) | Nueva ruta interna (coordinar con host si el MF asume página única). |
| [package.json](../package.json) | Deps pinned; mismo PR que actualice `package-lock.json`. |
| [README.md](../README.md) | Comandos locales, Docker, variables `VITE_*`. |

## Infra del seed — coordinación / PR de plataforma

| Ruta | Motivo |
|------|--------|
| [vite.config.ts](../vite.config.ts) | Module Federation, `base`, `shared`, origins dev/build. |
| [src/mf-remote/RemoteShell.tsx](../src/mf-remote/RemoteShell.tsx) | Contrato `./Shell` con el host (`MemoryRouter`). |
| [Dockerfile](../Dockerfile), [nginx.conf](../nginx.conf) | Imagen, puerto 8080, headers para cross-origin MF. |
| [.github/workflows/docker-ecr-ecs.yml](../.github/workflows/docker-ecr-ecs.yml) | CI OIDC ECR / ECS. |

## Documentación sólo Markdown (sin runtime)

| Ruta |
|------|
| [AGENTS.md](../AGENTS.md) — contrato técnico (fuente de verdad) |
| [CLAUDE.md](../CLAUDE.md) — entrada automática para Claude Code (apunta a AGENTS.md) |
| [.cursor/rules/seed-contract.mdc](../.cursor/rules/seed-contract.mdc) — entrada automática para Cursor (apunta a AGENTS.md) |
| [spec-kit/README.md](README.md), este `map.md`, `stack.md`, `vite-react-notes.md`, workflows, templates |
| [spec-kit/guia-replicacion-react-y-otros.md](guia-replicacion-react-y-otros.md) |
| [specs/README.md](../specs/README.md) |
