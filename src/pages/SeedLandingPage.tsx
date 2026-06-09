import { AuthPlaceholder } from '../components/AuthPlaceholder'

const features = [
  {
    title: 'Vite + React + TypeScript',
    body: 'Compilación rápida, tipado estricto y plantilla alineada con el ecosistema actual de Vite 8.',
  },
  {
    title: 'Module Federation (remote)',
    body: (
      <>
        Nombre del remote: <span className="bp-inline-code">boogiepopRemote</span>. Expone{' '}
        <span className="bp-inline-code">./Shell</span> para que el host lo cargue con el runtime
        MF (manifest o <span className="bp-inline-code">remoteEntry.js</span>
        ).
      </>
    ),
  },
  {
    title: 'Tailwind CSS + boogiepop-ui',
    body: 'Tokens de diseño en src/index.css (--bp-*) y componentes Button, Card, Input, Select, Text desde boogiepop-ui.',
  },
  {
    title: 'React Router',
    body: (
      <>
        Una sola vista en la raíz. Sin navbar propia: el chrome va en el host. Integrado en el hub,
        las rutas se resuelven como <span className="bp-inline-code">Routes</span> descendiente bajo{' '}
        <span className="bp-inline-code">/hub/react-remote/*</span> (sin segundo{' '}
        <span className="bp-inline-code">Router</span> anidado, que RR v6 prohíbe).
      </>
    ),
  },
]

/** Intro + documentación del seed en una única página. */
export function SeedLandingPage() {
  return (
    <div className="space-y-12 text-left">
      <header className="space-y-4">
        <h1 className="text-[1.75rem] font-semibold text-bp-body sm:text-[2rem]">
          Remote Vite + React
        </h1>
        <p className="max-w-2xl text-[1rem] leading-relaxed text-bp-muted">
          Este repositorio es un <strong className="text-bp-body">seed</strong> listo para
          publicar como <strong className="text-bp-body">remote</strong> de Module Federation. En
          local corre como SPA en una sola vista; si lo montás como{' '}
          <span className="bp-inline-code">boogiepopRemote/Shell</span>, todo lo que ves abajo forma
          parte de ese mismo módulo.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#detalle-del-seed" className="bp-btn-primary">
            Ver detalle del seed
          </a>
          <a
            href="https://github.com/module-federation/vite"
            target="_blank"
            rel="noreferrer"
            className="bp-btn-secondary"
          >
            Documentación MF + Vite
          </a>
        </div>
      </header>

      <section
        id="detalle-del-seed"
        className="scroll-mt-10 space-y-6"
        aria-labelledby="detalle-titulo"
      >
        <div className="space-y-2">
          <h2 id="detalle-titulo" className="text-[1.375rem] font-semibold text-bp-body">
            Contenido del seed
          </h2>
          <p className="max-w-2xl text-[1rem] leading-relaxed text-bp-muted">
            Resumen para quien clone el repo o consuma el remote desde un host.
          </p>
        </div>

        <ul className="space-y-4">
          {features.map((item) => (
            <li
              key={item.title}
              className="rounded-[0.5rem] border border-bp-border bg-bp-muted-bg/80 p-5"
            >
              <h3 className="text-lg font-semibold text-bp-body">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bp-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <AuthPlaceholder />

        <div className="rounded-[0.5rem] border border-bp-border border-l-[6px] border-l-bp-primary bg-bp-muted-bg/50 p-5 text-sm text-bp-muted">
          <p className="font-semibold text-bp-body">Despliegue</p>
          <p className="mt-2 leading-relaxed">
            Imagen Docker (nginx + estáticos de <span className="bp-inline-code">dist</span>
            ), push a ECR y servicio ECS. Ver{' '}
            <span className="bp-inline-code">README.md</span> y{' '}
            <span className="bp-inline-code">.github/workflows</span>.
          </p>
        </div>
      </section>
    </div>
  )
}
