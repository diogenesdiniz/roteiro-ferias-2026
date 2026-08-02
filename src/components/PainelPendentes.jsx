import { useMemo } from 'react'
import lugares from '../../data/lugares.json'
import { linkMapaBusca, linkMapaParada } from '../lib/links'
import { corFundo, corBorda, corTextoSuave, fonteMonoespacada, CATEGORIAS } from '../lib/tema'

const CIDADES = { londres: 'Londres', paris: 'Paris', madrid: 'Madrid' }

export default function PainelPendentes({ aoFechar }) {
  const porCidade = useMemo(() => {
    return Object.keys(CIDADES)
      .map((cidade) => ({
        cidade,
        lugares: (lugares[cidade] ?? []).filter((lugar) => lugar.status === 'candidato'),
      }))
      .filter((grupo) => grupo.lugares.length > 0)
  }, [])

  const total = porCidade.reduce((soma, grupo) => soma + grupo.lugares.length, 0)

  return (
    <div className="fixed overflow-y-auto" style={{ inset: 0, background: corFundo, zIndex: 50 }}>
      <div className="mx-auto w-full" style={{ maxWidth: 760 }}>
        <div className="sticky flex items-center justify-between px-4 py-4" style={{ top: 0, background: corFundo, borderBottom: `1px solid ${corBorda}` }}>
          <h2 className="text-xl font-semibold">Fora do roteiro</h2>
          <button
            onClick={aoFechar}
            className="rounded-full px-4 py-2 focus:outline-none focus:ring-2"
            style={{ background: '#fff', border: `1px solid ${corBorda}`, fontSize: 13, fontWeight: 600 }}
          >
            Fechar
          </button>
        </div>
        <p className="px-4 pt-4" style={{ fontSize: 14, lineHeight: 1.55, color: corTextoSuave }}>
          {total === 0
            ? 'Nada pendente: tudo da sua lista já entrou em algum dia.'
            : `${total} ${total === 1 ? 'lugar' : 'lugares'} da sua lista ainda sem dia no roteiro.`}
        </p>
        <div className="px-4 py-4">
          {porCidade.map((grupo) => (
            <div key={grupo.cidade} className="mb-6">
              <p className="uppercase pb-2" style={{ fontSize: 10, letterSpacing: '0.16em', color: corTextoSuave, borderBottom: `1px solid ${corBorda}` }}>
                {CIDADES[grupo.cidade]}
              </p>
              {grupo.lugares.map((lugar) => (
                <div key={lugar.id} className="flex items-start gap-3 py-3" style={{ borderBottom: `1px solid ${corBorda}` }}>
                  <span
                    className="shrink-0 rounded-full px-2 py-1 mt-0.5"
                    style={{ fontSize: 10, fontFamily: fonteMonoespacada, color: corTextoSuave, border: `1px solid ${corBorda}` }}
                  >
                    {CATEGORIAS[lugar.categoria] ?? lugar.categoria}
                  </span>
                  <span className="flex-1" style={{ minWidth: 0 }}>
                    <span className="block font-medium" style={{ fontSize: 14.5 }}>{lugar.nome}</span>
                    {lugar.nota && (
                      <span className="block mt-1" style={{ fontSize: 13, lineHeight: 1.5, color: corTextoSuave }}>{lugar.nota}</span>
                    )}
                    {lugar.origem === 'agente' && (
                      <span className="inline-block mt-1" style={{ fontSize: 11, color: '#8A93A1', fontStyle: 'italic' }}>sugestão do agente</span>
                    )}
                  </span>
                  <a
                    href={lugar.lat && lugar.lng ? linkMapaParada(lugar) : linkMapaBusca(lugar.nome, CIDADES[grupo.cidade])}
                    target="_blank" rel="noreferrer"
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
