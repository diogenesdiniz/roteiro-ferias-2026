import { useMemo } from 'react'
import { criarProjecao, caminhoSvg, caminhoSvgParadas, grampear, escalaEmKm, LARGURA, ALTURA } from '../lib/geo'
import { linkRotaDoDia } from '../lib/links'
import { corFundoMapa, fonteMonoespacada } from '../lib/tema'

const RIO_TAMISA = [
  [-0.316, 51.44], [-0.308, 51.456], [-0.306, 51.472], [-0.29, 51.483],
  [-0.268, 51.488], [-0.24, 51.488], [-0.227, 51.489], [-0.221, 51.478],
  [-0.216, 51.467], [-0.2, 51.465], [-0.193, 51.47], [-0.178, 51.479],
  [-0.168, 51.483], [-0.152, 51.485], [-0.137, 51.487], [-0.124, 51.487],
  [-0.122, 51.496], [-0.122, 51.501], [-0.116, 51.507], [-0.108, 51.509],
  [-0.103, 51.509], [-0.098, 51.509], [-0.094, 51.508], [-0.088, 51.508],
  [-0.08, 51.506], [-0.0755, 51.5055], [-0.065, 51.506], [-0.057, 51.506],
  [-0.045, 51.509], [-0.033, 51.508], [-0.025, 51.506], [-0.019, 51.498],
  [-0.015, 51.489], [-0.006, 51.485], [0.004, 51.492], [0.006, 51.503],
  [0.01, 51.509], [0.025, 51.508], [0.045, 51.506],
]

const PARQUES_LONDRES = [
  { pontos: [[-0.193, 51.5065], [-0.159, 51.5125], [-0.15, 51.5075], [-0.151, 51.502], [-0.174, 51.4995], [-0.189, 51.502]] },
  { pontos: [[-0.167, 51.525], [-0.153, 51.523], [-0.145, 51.529], [-0.152, 51.536], [-0.165, 51.534]] },
  { pontos: [[-0.3, 51.456], [-0.254, 51.45], [-0.26, 51.43], [-0.29, 51.429], [-0.301, 51.442]] },
  { pontos: [[-0.1405, 51.5035], [-0.1305, 51.5045], [-0.1285, 51.5025], [-0.139, 51.5015]] },
]

export default function MapaDia({ dia, paradas, cor, corTextoSobre, indiceSelecionado, aoSelecionar, indiceAgora, estaVisitada }) {
  const paradasNoMapa = useMemo(() => paradas.filter((p) => !p.foraDoMapa), [paradas])
  const proj = useMemo(() => criarProjecao(paradasNoMapa), [paradasNoMapa])
  const paradasNaRota = useMemo(() => paradasNoMapa.filter((p) => !p.alternativa), [paradasNoMapa])
  const escala = useMemo(() => escalaEmKm(proj.escala), [proj])

  const paradaSelecionada = indiceSelecionado === null ? null : paradas[indiceSelecionado]

  return (
    <section className="px-4">
      <div className="overflow-hidden rounded-2xl" style={{ background: corFundoMapa }}>
        <svg
          viewBox={`0 0 ${LARGURA} ${ALTURA}`}
          className="block w-full"
          role="img"
          aria-label={`Mapa das paradas de ${dia.diaSemana} ${dia.data}`}
        >
          {PARQUES_LONDRES.map((parque, i) => (
            <path key={i} d={`${caminhoSvg(proj, parque.pontos)} Z`} fill="#17251C" stroke="#1F3327" strokeWidth="1.5" />
          ))}
          <path d={caminhoSvg(proj, RIO_TAMISA)} fill="none" stroke="#15304F" strokeWidth="26" strokeLinejoin="round" strokeLinecap="round" />
          <path d={caminhoSvg(proj, RIO_TAMISA)} fill="none" stroke="#1E4674" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

          <path
            d={caminhoSvgParadas(proj, paradasNaRota)}
            fill="none"
            stroke={cor}
            strokeWidth="9"
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity="0.95"
          />

          {paradas.map((parada, i) => {
            if (!parada.foraDoMapa) return null
            const alvo = paradasNoMapa[0]
            if (!alvo) return null
            const [ax, ay] = proj.projetar(alvo.lat, alvo.lng)
            const [bx, by] = grampear(...proj.projetar(parada.lat, parada.lng))
            return (
              <line
                key={`fora-${i}`}
                x1={bx} y1={by} x2={ax} y2={ay}
                stroke={cor} strokeWidth="4" strokeDasharray="3 14" strokeLinecap="round" opacity="0.6"
              />
            )
          })}

          {paradas.map((parada, i) => {
            const [bx, by] = parada.foraDoMapa ? grampear(...proj.projetar(parada.lat, parada.lng)) : proj.projetar(parada.lat, parada.lng)
            const selecionada = indiceSelecionado === i
            const visitada = estaVisitada(i)
            const raio = selecionada ? 25 : 19
            return (
              <g key={i} onClick={() => aoSelecionar(i)} style={{ cursor: 'pointer' }}>
                {indiceAgora === i && <circle className="pulso" cx={bx} cy={by} r={raio + 12} fill={cor} opacity="0.35" />}
                <circle
                  className="estacao"
                  cx={bx} cy={by} r={raio}
                  fill={visitada ? cor : '#F3F5F8'}
                  stroke={cor}
                  strokeWidth={parada.alternativa ? 4 : 6}
                  strokeDasharray={parada.alternativa ? '7 6' : undefined}
                />
                <text
                  x={bx} y={by} textAnchor="middle" dominantBaseline="central"
                  fill={visitada ? corTextoSobre : corFundoMapa}
                  style={{ fontFamily: fonteMonoespacada, fontSize: selecionada ? 22 : 18, fontWeight: 700, pointerEvents: 'none' }}
                >
                  {i + 1}
                </text>
              </g>
            )
          })}

          <g transform={`translate(${LARGURA - 76 - escala.comprimentoPx}, ${ALTURA - 30})`}>
            <line x1="0" y1="0" x2={escala.comprimentoPx} y2="0" stroke="#5E6C80" strokeWidth="3" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="#5E6C80" strokeWidth="3" />
            <line x1={escala.comprimentoPx} y1="-6" x2={escala.comprimentoPx} y2="6" stroke="#5E6C80" strokeWidth="3" />
            <text x={escala.comprimentoPx / 2} y="-14" textAnchor="middle" fill="#8794A6" style={{ fontFamily: fonteMonoespacada, fontSize: 17 }}>
              {escala.km} km
            </text>
          </g>
        </svg>

        <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ borderTop: '1px solid #1B2634' }}>
          <p style={{ fontSize: 13, color: paradaSelecionada === null ? '#6C7A8C' : '#E4E9EF', lineHeight: 1.4 }}>
            {paradaSelecionada === null ? 'Toque numa estação para ver os detalhes' : `${indiceSelecionado + 1}. ${paradaSelecionada.nome}`}
            {paradaSelecionada?.foraDoMapa && <span style={{ color: '#6C7A8C' }}> · {paradaSelecionada.rotuloFora}</span>}
          </p>
          <a
            href={linkRotaDoDia(paradas, dia.modo)}
            target="_blank" rel="noreferrer"
            className="shrink-0 rounded-full px-3 py-2 focus:outline-none focus:ring-2"
            style={{ background: cor, color: corTextoSobre, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            Rota no Maps
          </a>
        </div>
      </div>
    </section>
  )
}
