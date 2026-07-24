import { useMemo } from 'react'
import { linkMapaParada } from '../lib/links'
import { corFundo, corBorda, corTextoSuave, fonteMonoespacada, CATEGORIAS } from '../lib/tema'

function varianteEscolhida(dia, opcoes) {
  const escolhidaId = opcoes[dia.n]
  return dia.variantes.find((v) => v.id === escolhidaId) ?? dia.variantes.find((v) => v.recomendada) ?? dia.variantes[0]
}

export default function IndicePorCategoria({ dias, opcoes, aoFechar }) {
  const paradasPorCategoria = useMemo(() => {
    const mapa = {}
    dias.forEach((dia) => {
      const variante = varianteEscolhida(dia, opcoes)
      variante.paradas.forEach((parada) => {
        if (!mapa[parada.tipo]) mapa[parada.tipo] = []
        mapa[parada.tipo].push({ ...parada, dia })
      })
    })
    return mapa
  }, [dias, opcoes])

  return (
    <div className="fixed overflow-y-auto" style={{ inset: 0, background: corFundo, zIndex: 50 }}>
      <div className="mx-auto w-full" style={{ maxWidth: 760 }}>
        <div className="sticky flex items-center justify-between px-4 py-4" style={{ top: 0, background: corFundo, borderBottom: `1px solid ${corBorda}` }}>
          <h2 className="text-xl font-semibold">Índice</h2>
          <button
            onClick={aoFechar}
            className="rounded-full px-4 py-2 focus:outline-none focus:ring-2"
            style={{ background: '#fff', border: `1px solid ${corBorda}`, fontSize: 13, fontWeight: 600 }}
          >
            Fechar
          </button>
        </div>
        <p className="px-4 pt-4" style={{ fontSize: 14, lineHeight: 1.55, color: corTextoSuave }}>
          Tudo que está no roteiro, agrupado por tipo. Reflete as escolhas que você fez em sábado e segunda.
        </p>
        <div className="px-4 py-4">
          {Object.keys(CATEGORIAS)
            .filter((categoria) => paradasPorCategoria[categoria]?.length)
            .map((categoria) => (
              <div key={categoria} className="mb-6">
                <p className="uppercase pb-2" style={{ fontSize: 10, letterSpacing: '0.16em', color: corTextoSuave, borderBottom: `1px solid ${corBorda}` }}>
                  {CATEGORIAS[categoria]}
                </p>
                {paradasPorCategoria[categoria].map((parada, indice) => (
                  <div key={`${categoria}${indice}`} className="flex items-center gap-3 py-3" style={{ borderBottom: `1px solid ${corBorda}` }}>
                    <span className="rounded-full shrink-0" style={{ width: 10, height: 10, background: parada.dia.cor }} />
                    <span className="flex-1" style={{ minWidth: 0 }}>
                      <span className="block font-medium" style={{ fontSize: 14.5 }}>{parada.nome}</span>
                      <span className="block" style={{ fontFamily: fonteMonoespacada, fontSize: 11, color: corTextoSuave }}>
                        {parada.dia.diaSemana.toLowerCase()} {parada.dia.data.slice(8, 10)}/{parada.dia.data.slice(5, 7)} · {parada.h}
                      </span>
                    </span>
                    <a
                      href={linkMapaParada(parada)} target="_blank" rel="noreferrer"
                      className="shrink-0 rounded-full px-3 py-1 focus:outline-none focus:ring-2"
                      style={{ fontSize: 11, fontWeight: 600, border: `1px solid ${corBorda}`, color: corTextoSuave, background: '#fff' }}
                    >
                      Maps
                    </a>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
