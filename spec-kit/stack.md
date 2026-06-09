# Stack del seed (referencia rápida)

Fuente de verdad: [package.json](../package.json), [package-lock.json](../package-lock.json), [Dockerfile](../Dockerfile), [vite.config.ts](../vite.config.ts). Si divergen Dockerfile vs scripts de build, priorizar alinear `npm run build` con la etapa CI/Docker.

## Node y toolchain

- **engines**: Node `>=22` (ver [package.json](../package.json); [.nvmrc](../.nvmrc) tiene `22`).
- **Gestor**: **npm** con lockfile reproducible (`npm ci` en Dockerfile).
- Dependencias sin rangos laxos (`^`) en deps principales según política actual del repo.

## Paquetes internos Boogiepop

| Paquete | Rol |
|---------|-----|
| `boogiepop-auth-sdk` | Resolución de sesión JWT: `resolveBoogiepopSession()`, `useBoogiepopSession()`, helpers `hasRole/hasWorkspace/hasAbility`. Devuelve `workspaces`, `roles` (objetos con `id/name/type/abilities`), `abilities`. |
| `boogiepop-ui` | Librería de componentes y tokens de diseño. Importar estilos: `import 'boogiepop-ui/styles'`. Tokens `--bp-*` (azul `#4361ee`). Componentes: `Button`, `Card`, `Input`, `Select`, `Text`. |

Ambos paquetes están referenciados como `file:../` en `package.json` (local dev). Al publicar, se pinchan a versiones semver.

## Runtime aplicación cliente

- **Dev**: `npm run dev` — Vite; puerto por defecto **8008** y `origin` alineados en `vite.config.ts` (véase también `PORT` / `VITE_DEV_PORT` / `VITE_DEV_SERVER_ORIGIN`).
- **Build**: `npm run build` — `dist/` incluye SPA + artefactos MF (`remoteEntry.js`, `mf-manifest.json`, chunks).
- **Preview**: `npm run preview`.
- **Lint**: `npm run lint`.

## Module Federation (este repo es **remote**)

- Nombre: `boogiepopRemote`; expone `./Shell` → código en [src/mf-remote/RemoteShell.tsx](../src/mf-remote/RemoteShell.tsx).
- Variables de build relevantes: `VITE_REMOTE_BASE`, en dev `VITE_DEV_SERVER_ORIGIN` si cambiás host/puerto (ver README).

## Docker y despliegue

- **Multi-stage**: Node instala deps y build → **nginx:alpine** sirve estáticos en **8080**; health **`/health`**.
- **ECS/ECR**: workflow ejemplo [.github/workflows/docker-ecr-ecs.yml](../.github/workflows/docker-ecr-ecs.yml); plantilla JSON en [ecs/task-definition.sample.json](../ecs/task-definition.sample.json).

## Validación típica de cambio

1. `npm run lint`
2. `npm run build`
3. Si tocás contenedor (`Dockerfile`): `docker build ...` donde Docker esté disponible.
