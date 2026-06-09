import { federation } from '@module-federation/vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { defineConfig } from 'vite'

/** Normaliza base de Vite: `/` por defecto, o URL absoluta/ruta terminada en `/`. */
function normalizeBase(raw: string | undefined): string {
  if (raw === undefined || raw === '' || raw === '/') {
    return '/'
  }
  return raw.endsWith('/') ? raw : `${raw}/`
}

const DEV_PORT = Number(process.env.PORT || process.env.VITE_DEV_PORT || 8008)

const DEV_ORIGIN =
  process.env.VITE_DEV_SERVER_ORIGIN ?? `http://localhost:${DEV_PORT}`

/**
 * El navegador solicita /favicon.ico antes de evaluar <link rel="icon">.
 * En modo SPA, esa ruta cae en index.html y el icono se ve roto (p. ej. "??").
 */
function faviconIcoRedirectPlugin(): Plugin {
  let base = '/'

  function mount(server: ViteDevServer | PreviewServer) {
    server.middlewares.use((req, res, next) => {
      const pathname = (req.url ?? '').split(/[?#]/)[0] ?? ''
      if (pathname !== '/favicon.ico') {
        next()
        return
      }
      const prefix =
        base === '/' || base === './' ? '' : base.replace(/\/$/, '')
      const loc = `${prefix}/favicon.svg`.replace(/\/{2,}/g, '/')
      res.statusCode = 302
      res.setHeader('Location', loc)
      res.end()
    })
  }

  return {
    name: 'favicon-ico-redirect-svg',
    enforce: 'pre',
    configResolved(c) {
      base = c.base
    },
    configureServer: mount,
    configurePreviewServer: mount,
  }
}

export default defineConfig({
  base: normalizeBase(process.env.VITE_REMOTE_BASE),
  plugins: [
    faviconIcoRedirectPlugin(),
    react(),
    tailwindcss(),
    federation({
      name: 'StockMarketRemote',
      filename: 'remoteEntry.js',
      manifest: true,
      exposes: {
        './Shell': './src/mf-remote/RemoteShell.tsx',
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router-dom': { singleton: true },
      },
      dts: false,
    }),
  ],
  server: {
    origin: DEV_ORIGIN,
    port: DEV_PORT,
    strictPort: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  preview: {
    port: 4173,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    target: 'chrome89',
  },
})
