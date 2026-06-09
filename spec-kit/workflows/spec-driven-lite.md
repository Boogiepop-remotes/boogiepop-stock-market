# Flujo spec-driven lite (sin CLI externa)

Mini-proceso inspirado en la idea de [GitHub spec-kit](https://github.com/github/spec-kit), adaptado a este repositorio **sin** instalación de Specify ni comandos especiales.

## Cuándo usarlo

- Cambios que tocan **`vite.config.ts`**, Dockerfile/CI, **Module Federation**, muchas vistas o nueva dependencia mayor.
- Features que quieras dejar documentadas antes de implementar (`specs/`).

## Pasos

### 1. Entender el objetivo

Leé [AGENTS.md](../../AGENTS.md) y [map.md](../map.md). Confirmá si el cambio toca **infra MF / Docker**.

### 2. Especificación breve (SPEC)

Creá (o pedí que creen) `specs/<nnn>-<slug>/SPEC.md` con la plantilla [../templates/feature-spec.template.md](../templates/feature-spec.template.md).

Incluí contexto, alcance, criterios de aceptación y **archivos probablemente tocados**.

### 3. Plan de implementación (PLAN)

En el mismo directorio, **`PLAN.md`** con:

- Orden sugerido: deps/`package-lock` → `vite.config`/MF → código → nginx/Docker sólo si aplica → docs.
- Riesgos (p. ej. bump React singleton vs host).
- Validación manual: `npm run lint`, `npm run build`, opcionalmente `docker build` y revisión URLs `mf-manifest.json` tras `preview`/contenedor.

### 4. Desglose de tareas (TASKS)

**`TASKS.md`**: checklist atómica (“actualizar exposes”, “añadir sección X en SeedLandingPage”, “documentar `VITE_*`”, etc.).

### 5. Implementar y verificar

- Respetá MF y navbar según [AGENTS.md](../../AGENTS.md).
- Ejecutá `npm run lint` y `npm run build` antes de cerrar si el alcance tocó código o config de build.

## Relación con AGENTS.md

Si un SPEC contradice **AGENTS.md**, ganan las reglas de **AGENTS.md** salvo acuerdo explícito del dueño del repo.
