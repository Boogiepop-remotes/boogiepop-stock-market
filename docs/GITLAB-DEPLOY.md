# GitLab CI/CD — Remote React (`boogiepop-stock-market`)

Basado en **`boogiepop-host`** ([`.gitlab-ci.yml`](../../boogiepop-host/.gitlab-ci.yml), [`GLAB-CI.md`](../../boogiepop-host/docs/GLAB-CI.md)). Deploy AWS: [`DEPLOY-REMOTES.md`](../../boogiepop-host/docs/DEPLOY-REMOTES.md).

## Flujo por rama

| Momento | Pipeline | Deploy |
|---------|----------|--------|
| **MR → `main`** (antes del merge) | `lint` + `vite-build` | — |
| **Merge MR → `main`** (push a `main`) | `lint` + `vite-build` + **`docker-publish-remote-prod`** + **`deploy-remote-ecs-prod`** | **Automático** → ECR `:latest` + rollout ECS |
| **Push a `develop`** | `lint` + `vite-build` + jobs **manual** | Staging opcional (`:develop`) |

## Variables (Settings → CI/CD → Variables)

Mismas credenciales que el **host**:

| Variable | Uso |
|----------|-----|
| **`ECR_REGISTRY`** | `653876198281.dkr.ecr.us-east-1.amazonaws.com` (sin `/repo`) — obligatoria para prod auto |
| **`AWS_ACCESS_KEY_ID`** / **`AWS_SECRET_ACCESS_KEY`** | ECR + ECS |
| **`VITE_REMOTE_BASE`** | URL pública prod del MF (ej. `https://mf.tudominio.com/`) |
| **`ECS_CLUSTER_NAME`** | Default: `boogiepop-api-cluster` |
| **`ECS_FRONT_REMOTE_SERVICE_NAME`** | Default: `boogiepop-api-fe-remote-svc` |

## Jobs

| Job | Cuándo |
|-----|--------|
| `docker-publish-remote` | Manual, push `develop` |
| `deploy-remote-ecs` | Manual, push `develop` (después del Docker manual) |
| `docker-publish-remote-prod` | **Auto**, push `main` (post-merge) |
| `deploy-remote-ecs-prod` | **Auto**, tras Docker prod |

## Orden recomendado equipo

1. Trabajar en **`develop`** → MR a **`main`** (solo valida lint/build en el MR).
2. **Merge** → pipeline en **`main`** publica imagen y hace **`force-new-deployment`** en ECS.
3. Verificar `remoteEntry.js` y manifest del **host** si cambió la URL.

**Requisito infra:** el servicio ECS **`boogiepop-api-fe-remote-svc`** debe existir (Terraform Escenario B).
