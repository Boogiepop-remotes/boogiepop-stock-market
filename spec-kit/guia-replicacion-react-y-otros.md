---
title: Guía de anatomía del spec-kit (uso multi-seed, React aquí como referencia)
tipo: solo-documentacion
uso: desarrollo-equipo-multi-seed
no_es_artifact_deploy: true
---

# Guía: cómo está armado el **spec-kit** en este repo (React) y cómo replica la idea del seed Streamlit

Este archivo es **documentación metodológica**. No forma parte del build ni del deploy MF. Describe la forma portable de usar **Markdown + orden de lectura + specs opcionales** que viene del seed Streamlit corporativo (`boogiepop-streamlit-seed`), adaptada aquí.

> En el equipo podés tener en paralelo: `boogiepop-streamlit-seed` y `boogiepop-stock-market`. La fuente textual original “replicación en React” vivía como  
> **`…/boogiepop-streamlit-seed/spec-kit/guia-replicacion-react-y-otros.md`**. Esta copia contextualiza **este** árbol (React MF).

## Anatomía de **este** repositorio (React remote seed)

```text
.
├── AGENTS.md                        # Contrato: qué sí / qué no / MF / infra
├── README.md                        # Humano: ejecución, Docker, ECS, MF URLs
├── spec-kit/
│   ├── README.md                   # Índice + orden de lectura agente
│   ├── map.md                      # Rutas por criticidad (producto vs infra)
│   ├── stack.md                    # Node, comandos, Docker, MF
│   ├── vite-react-notes.md         # Peculiaridades Vite/React/MF (equiv. streamlit-notes)
│   ├── guia-replicacion-react-y-otros.md  # Este archivo
│   ├── workflows/
│   │   └── spec-driven-lite.md     # Spec → PLAN → TASKS sin CLI GH spec-kit
│   └── templates/
│       └── feature-spec.template.md
└── specs/                           # Opcional: features numeradas
    └── README.md
```

Invariantes cuando un agente trabaja sobre el repo:

| Concepto | Rol |
|----------|-----|
| `AGENTS.md` en raíz | Políticas vinculantes (MF host, infra, navbar). |
| `spec-kit/README.md` | Primer onboarding ordenado después de AGENTS. |
| `vite-react-notes.md` | Equivalente **Streamlit** de `streamlit-notes.md`. |
| `workflows/spec-driven-lite.md` | Podés mantener contenido casi igual entre seeds (cambiar sólo comandos). |
| `specs/` | Trazabilidad `nnn-slug/` con SPEC/PLAN/TASKS. |

## Mapeo: Streamlit seed → Este seed React

| Seed Streamlit (Python) | Seed React MF (este repo) |
|-------------------------|---------------------------|
| `app/Home.py`, `app/pages/` | `src/App.tsx`, `src/router/AppRoutes.tsx`, `src/pages/SeedLandingPage.tsx` |
| `app/seed_main.py`, `configure_page` | `src/main.tsx`, `index.html`, `vite.config.ts` (entrada cliente + tema/MF build) |
| `app/styles/base.css`, `.streamlit/config.toml` | `src/index.css` (@theme tipo Streamlit, `.st-*`), fuentes en `index.html` |
| `requirements.txt`, `Dockerfile` | `package.json` + lock, `Dockerfile` (Node → nginx estáticos) |
| Sidebar Streamlit multipágina | **Host** lleva navegación global; remote página única + `MemoryRouter` para MF |

Para “mapa rápido” día a día: edición frecuente en `src/pages/**`, infra en `vite.config.ts` / Dockerfile / workflow.

## Checklist al replicar metodología en otro proyecto

1. Copiar esta estructura `spec-kit/` + `specs/README.md`.
2. Renombrar notas del stack (`vite-react-notes.md` u otro) según tecnología destino.
3. Actualizar `map.md`, `stack.md` y comandos dentro de `workflows/spec-driven-lite.md`.
4. Escribir o adaptar **AGENTS.md** en raíz si el repo nuevo no lo tenía.
5. Compará cada tanto con el seed Streamlit paralelo usando el mismo criterio de zonas modificables vs infra definido su **propio `AGENTS.md`** en ese repositorio.

## Relación con el spec-kit oficial de GitHub

Sólo compartimos la **filosofía** (Markdown, fases opcionales, carpetas). La CLI `/speckit-*` del repo [**github/spec-kit**](https://github.com/github/spec-kit) es **opcional** y **no está integrada** aquí ni en la plantilla Streamlit interna típica.

## Mantener varios seeds alineados

| Artefacto | Objetivo |
|-----------|-----------|
| `AGENTS.md` | Misma distinción “producto fácil vs infra coordina”. |
| `workflows/spec-driven-lite.md` | Paralelo entre repos cambiando stack/comandos. |
| `templates/feature-spec.template.md` | Divergir sólo rutas/stack en la tabla de archivos |

Así la misma persona puede saltar entre Streamlit corporativo y React MF sin reinventar proceso.
