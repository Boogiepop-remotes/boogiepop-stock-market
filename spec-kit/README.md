# Spec-kit ligero para agentes (Boogiepop React Remote Seed)

No reemplaza [AGENTS.md](../AGENTS.md). Es onboarding y manual de rutas para LLMs sobre este seed **React · Vite · Module Federation**.

**No** integramos la CLI de [GitHub spec-kit](https://github.com/github/spec-kit) ni slash-commands tipo `/speckit-*`; sólo Markdown y la convención opcional **`specs/`** (SPEC → PLAN → TASKS).

## Entradas automáticas por herramienta

- **Claude Code** carga [CLAUDE.md](../CLAUDE.md) automáticamente → apunta a AGENTS.md.
- **Cursor** carga [.cursor/rules/seed-contract.mdc](../.cursor/rules/seed-contract.mdc) automáticamente → apunta a AGENTS.md.
- **Otros agentes** leen [AGENTS.md](../AGENTS.md) directamente (fuente de verdad única).

## Orden de lectura recomendado (agente)

1. **[AGENTS.md](../AGENTS.md)** — contrato: qué tocar, infra, MF (**obligatorio**).
2. **[map.md](map.md)** — mapa rápido por tipo de archivo.
3. **[stack.md](stack.md)** — runtime, Docker, comandos efectivos del seed.
4. **[vite-react-notes.md](vite-react-notes.md)** — Vite, MF remote, tema Streamlit-ish, página única.
5. **[workflows/spec-driven-lite.md](workflows/spec-driven-lite.md)** — proceso opcional spec → plan → tareas antes de cambios grandes.
6. Opcional **`../specs/`** — [README](../specs/README.md) para ubicar SPEC/PLAN/TASKS.

## Plantillas

- **[templates/feature-spec.template.md](templates/feature-spec.template.md)** — copiar a `specs/<nnn>-<slug>/SPEC.md` si seguís ese flujo.

## Alineación con otros seeds (p. ej. Streamlit hermano)

- **[guia-replicacion-react-y-otros.md](guia-replicacion-react-y-otros.md)** — anatomía de **este** spec-kit + mapeo y checklist frente al seed Streamlit (metodología compartida).

## Reglas prácticas para el agente

- **Terminal, git y push** sólo cuando el usuario lo pidan (salvo proceso del repo ya acordado).
- **No duplicar** políticas largas aquí; enlazar [AGENTS.md](../AGENTS.md).
- Punto de arranque local: **`npm run dev`** desde la raíz del repo React (véase [stack.md](stack.md)).
