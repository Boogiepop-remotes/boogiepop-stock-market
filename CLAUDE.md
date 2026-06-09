# Boogiepop React Remote Seed

Leé [AGENTS.md](AGENTS.md) — ahí está el contrato completo (qué tocar, qué no, Module Federation, infra).

## Contexto rápido

- Remote Module Federation: nombre `boogiepopRemote`, expone `./Shell` → `RemoteShell.tsx`
- Nginx puerto **8080**, healthcheck `/health` — contractuales con ECS, no cambiar
- UI: `boogiepop-ui` — tokens `--bp-*`, clases `.bp-*`, componentes `Button/Card/Input/Select/Text`
- Auth: `boogiepop-auth-sdk` — `resolveBoogiepopSession()` devuelve `workspaces`, `roles`, `abilities`

## Reglas operativas

- Usá `/plan` para cambios en `vite.config.ts`, `Dockerfile`, `nginx.conf` o archivos CI
- No ejecutés `npm run build` ni `git push` sin que el usuario lo pida
- Corré `npm run lint` antes de dar una tarea por terminada
