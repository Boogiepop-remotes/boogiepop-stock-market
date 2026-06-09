# Specs opcionales (features documentadas)

Carpeta **opcional**. Orden tipo “spec-kit lite”: subcarpeta por feature enumerada (`nnn`-prefijo) con SPEC / PLAN / TASKS en Markdown **sin tooling adicional**.

## Convención sugerida

```text
specs/
├── README.md                         # Este archivo
└── <nnn>-<slug-corto>/
    ├── SPEC.md                       # Qué queremos lograr (desde plantilla)
    ├── PLAN.md                       # Cómo lo implementamos
    └── TASKS.md                      # Lista verificable
```

Ejemplo: `001-mf-headers-cors/` (incrementá el prefijo cuando agregues carpetas nuevas si querés orden lexicográfico simple).

Índices y plantilla:

- [spec-kit/README.md](../spec-kit/README.md)
- [spec-kit/templates/feature-spec.template.md](../spec-kit/templates/feature-spec.template.md)
- [spec-kit/workflows/spec-driven-lite.md](../spec-kit/workflows/spec-driven-lite.md)

**Reglas vinculantes:** [AGENTS.md](../AGENTS.md).
