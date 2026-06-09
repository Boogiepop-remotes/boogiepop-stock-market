import { useEffect, useRef, useState } from 'react'

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY as string

const SYMBOLS = [
  { symbol: 'SPY',  name: 'S&P 500',       category: 'Index' },
  { symbol: 'QQQ',  name: 'NASDAQ-100',    category: 'Index' },
  { symbol: 'DIA',  name: 'Dow Jones',     category: 'Index' },
  { symbol: 'USO',  name: 'WTI Oil',       category: 'Commodity' },
  { symbol: 'UNG',  name: 'Natural Gas',   category: 'Commodity' },
  { symbol: 'GLD',  name: 'Gold',          category: 'Commodity' },
  { symbol: 'SLV',  name: 'Silver',        category: 'Commodity' },
  { symbol: 'IWM',  name: 'Russell 2000',  category: 'Index' },
  { symbol: 'TLT',  name: 'US 20yr Bonds', category: 'Bond' },
  { symbol: 'VIXY', name: 'VIX Volatility',category: 'Volatility' },
]

interface Quote {
  c: number   // current price
  d: number   // change
  dp: number  // % change
  h: number   // day high
  l: number   // day low
  o: number   // open
  pc: number  // prev close
  t: number   // timestamp
}

type QuoteMap = Record<string, Quote | null>

async function fetchAllQuotes(): Promise<QuoteMap> {
  const results = await Promise.allSettled(
    SYMBOLS.map(async ({ symbol }) => {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`,
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Quote = await res.json()
      return { symbol, data }
    }),
  )

  const map: QuoteMap = {}
  for (const r of results) {
    if (r.status === 'fulfilled') {
      map[r.value.symbol] = r.value.data
    }
  }
  // fill nulls for failed fetches
  for (const { symbol } of SYMBOLS) {
    if (!(symbol in map)) map[symbol] = null
  }
  return map
}

function fmt(n: number, decimals = 2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

function ChangeCell({ d, dp }: { d: number; dp: number }) {
  const up = d >= 0
  const color = up ? 'text-emerald-600' : 'text-red-500'
  return (
    <span className={`font-mono text-sm tabular-nums ${color}`}>
      {up ? '+' : ''}{fmt(d)} ({up ? '+' : ''}{fmt(dp)}%)
    </span>
  )
}

const REFRESH_MS = 30_000

export function CommoditiesPage() {
  const [quotes, setQuotes] = useState<QuoteMap>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [countdown, setCountdown] = useState(REFRESH_MS / 1000)
  const nextRefresh = useRef<number>(Date.now() + REFRESH_MS)

  async function load() {
    try {
      setError(null)
      const data = await fetchAllQuotes()
      setQuotes(data)
      setLastUpdated(new Date())
      nextRefresh.current = Date.now() + REFRESH_MS
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, REFRESH_MS)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const tick = setInterval(() => {
      setCountdown(Math.max(0, Math.round((nextRefresh.current - Date.now()) / 1000)))
    }, 1000)
    return () => clearInterval(tick)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.75rem] font-semibold text-bp-body">Market Overview</h1>
          <p className="mt-1 text-sm text-bp-muted">
            Índices, materias primas y renta fija — datos de Finnhub
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-bp-muted">
          {lastUpdated && (
            <span>
              Actualizado: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={load}
            className="flex items-center gap-1.5 rounded-md border border-bp-border bg-bp-muted-bg px-3 py-1.5 text-xs font-medium text-bp-body transition hover:bg-bp-border"
          >
            ↻ Refresh ({countdown}s)
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-bp-border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-bp-border bg-bp-muted-bg text-left">
              <th className="px-4 py-3 font-semibold text-bp-body">Nombre</th>
              <th className="px-4 py-3 font-semibold text-bp-body">Símbolo</th>
              <th className="px-4 py-3 font-semibold text-bp-body">Categoría</th>
              <th className="px-4 py-3 text-right font-semibold text-bp-body">Precio</th>
              <th className="px-4 py-3 text-right font-semibold text-bp-body">Cambio</th>
              <th className="px-4 py-3 text-right font-semibold text-bp-body">Apertura</th>
              <th className="px-4 py-3 text-right font-semibold text-bp-body">Máx</th>
              <th className="px-4 py-3 text-right font-semibold text-bp-body">Mín</th>
            </tr>
          </thead>
          <tbody>
            {SYMBOLS.map(({ symbol, name, category }, i) => {
              const q = quotes[symbol]
              const isLoading = loading && !q
              return (
                <tr
                  key={symbol}
                  className={`border-b border-bp-border last:border-0 transition-colors hover:bg-bp-muted-bg/60 ${i % 2 === 0 ? '' : 'bg-bp-muted-bg/30'}`}
                >
                  <td className="px-4 py-3 font-medium text-bp-body">{name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-bp-muted">{symbol}</td>
                  <td className="px-4 py-3">
                    <CategoryBadge category={category} />
                  </td>
                  {isLoading ? (
                    <td colSpan={5} className="px-4 py-3 text-bp-muted">
                      <span className="inline-block h-4 w-32 animate-pulse rounded bg-bp-border" />
                    </td>
                  ) : q ? (
                    <>
                      <td className="px-4 py-3 text-right font-mono tabular-nums text-bp-body">
                        ${fmt(q.c)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <ChangeCell d={q.d} dp={q.dp} />
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-bp-muted">
                        ${fmt(q.o)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-bp-muted">
                        ${fmt(q.h)}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-xs tabular-nums text-bp-muted">
                        ${fmt(q.l)}
                      </td>
                    </>
                  ) : (
                    <td colSpan={5} className="px-4 py-3 text-xs text-bp-muted">
                      Sin datos
                    </td>
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-bp-muted">
        Datos con 15 min de retraso · Auto-refresh cada {REFRESH_MS / 1000}s · Fuente: Finnhub
      </p>
    </div>
  )
}

function CategoryBadge({ category }: { category: string }) {
  const styles: Record<string, string> = {
    Index:      'bg-blue-50 text-blue-700 border-blue-200',
    Commodity:  'bg-amber-50 text-amber-700 border-amber-200',
    Bond:       'bg-purple-50 text-purple-700 border-purple-200',
    Volatility: 'bg-gray-100 text-gray-600 border-gray-200',
  }
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${styles[category] ?? 'bg-bp-muted-bg text-bp-muted border-bp-border'}`}>
      {category}
    </span>
  )
}
