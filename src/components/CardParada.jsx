import { linhas } from '../data/roteiro'
import { distanciaKm } from '../lib/geo'
import { formatarDuracao, formatarDistancia } from '../lib/tempo'
import { linkMapaParada, linkRotaEntreParadas } from '../lib/links'
import { corBorda, corTextoSuave, fonteMonoespacada } from '../lib/tema'

function SeloLinha({ codigo }) {
  const linha = linhas[codigo] ?? linhas.pe
  return (
    <span
      className="inline-block rounded"
      style={{ background: linha.cor, color: linha.texto ?? '#fff', fontSize: 10, fontWeight: 700, padding: '2px 7px', letterSpacing: '0.03em', whiteSpace: 'nowrap' }}
    >
      {linha.nome}
    </span>
  )
}

export default function CardParada({
  parada,
  indice,
  proximaParada,
  cor,
  corTextoSobre,
  aberto,
  visitada,
  aoAlternarVisitada,
  aoSelecionar,
  ehAgora,
  minutosLivres,
  mostrarAvisoObraFimDeSemana,
}) {
  const trecho = parada.trecho

  return (
    <li className="relative flex gap-4" data-parada={indice}>
      <div className="relative flex flex-col items-center" style={{ width: 34 }}>
        {(proximaParada || trecho) && (
          <div
            className="absolute"
            style={{ top: 22, bottom: 0, width: 5, background: cor, opacity: parada.alternativa ? 0.22 : 0.9, borderRadius: 3 }}
          />
        )}
        <button
          onClick={aoAlternarVisitada}
          aria-label={visitada ? `Desmarcar ${parada.nome}` : `Marcar ${parada.nome} como visitada`}
          className="relative rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ marginTop: 14, width: 26, height: 26, background: visitada ? cor : '#fff', border: `4px solid ${cor}`, borderStyle: parada.alternativa ? 'dashed' : 'solid' }}
        >
          {visitada && (
            <svg viewBox="0 0 24 24" className="absolute" style={{ inset: 0 }} fill="none" stroke={corTextoSobre} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5 10 17.5 19 7" />
            </svg>
          )}
        </button>
      </div>

      <div className="flex-1" style={{ minWidth: 0 }}>
        <button
          onClick={aoSelecionar}
          className="w-full text-left rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ background: '#fff', border: `1px solid ${aberto ? cor : corBorda}`, boxShadow: aberto ? `inset 3px 0 0 ${cor}` : 'none', opacity: visitada ? 0.55 : 1 }}
          aria-expanded={aberto}
        >
          <div className="flex items-baseline gap-3" style={{ flexWrap: 'wrap' }}>
            <span style={{ fontFamily: fonteMonoespacada, fontSize: 14, fontWeight: 700, color: cor }}>{parada.h}</span>
            <span className="uppercase" style={{ fontSize: 9, letterSpacing: '0.13em', color: corTextoSuave }}>{parada.alternativa ? 'alternativa' : parada.tipo}</span>
            {ehAgora && (
              <span className="uppercase rounded-full px-2" style={{ fontSize: 9, letterSpacing: '0.13em', background: cor, color: corTextoSobre, paddingTop: 2, paddingBottom: 2 }}>agora</span>
            )}
          </div>
          <h3 className="mt-1 font-semibold" style={{ fontSize: 16, lineHeight: 1.25, textDecoration: visitada ? 'line-through' : 'none' }}>{parada.nome}</h3>
          {parada.foraDoMapa && <p style={{ fontFamily: fonteMonoespacada, fontSize: 11, color: corTextoSuave, marginTop: 4 }}>{parada.rotuloFora}</p>}

          {aberto && (
            <div className="mt-3">
              {minutosLivres !== null && minutosLivres > 0 && (
                <p className="rounded-lg px-3 py-2 mb-3" style={{ fontSize: 12.5, background: '#EEF1F5', color: '#39404C', fontFamily: fonteMonoespacada }}>
                  você tem {formatarDuracao(minutosLivres)} aqui
                </p>
              )}
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#39404C' }}>{parada.nota}</p>
              {parada.alerta && (
                <p className="mt-2 rounded-lg px-3 py-2" style={{ fontSize: 13, lineHeight: 1.45, background: '#FDF3E3', color: '#7A5314', border: '1px solid #F0DFC0' }}>{parada.alerta}</p>
              )}
              <a
                href={linkMapaParada(parada)} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
                className="inline-block mt-3 rounded-full px-3 py-2 focus:outline-none focus:ring-2"
                style={{ fontSize: 12, fontWeight: 600, border: `1px solid ${cor}`, color: cor }}
              >
                Abrir no Maps
              </a>
            </div>
          )}
        </button>

        {trecho && proximaParada && (
          <div className="py-3 pl-1 pr-2">
            <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
              <SeloLinha codigo={trecho.linha} />
              <span style={{ fontFamily: fonteMonoespacada, fontSize: 12, fontWeight: 700 }}>{formatarDuracao(trecho.min)}</span>
              <span style={{ fontFamily: fonteMonoespacada, fontSize: 11, color: corTextoSuave }}>
                {formatarDistancia(distanciaKm(parada, proximaParada))} em linha reta
              </span>
              <a
                href={linkRotaEntreParadas(parada, proximaParada, trecho.linha === 'pe' ? 'walking' : 'transit')}
                target="_blank" rel="noreferrer"
                className="rounded-full px-2 focus:outline-none focus:ring-2"
                style={{ fontSize: 10, fontWeight: 700, color: corTextoSuave, border: `1px solid ${corBorda}`, paddingTop: 3, paddingBottom: 3, background: '#fff' }}
              >
                traçar
              </a>
            </div>
            <p className="mt-1" style={{ fontSize: 13, lineHeight: 1.5, color: corTextoSuave }}>{trecho.texto}</p>
            {mostrarAvisoObraFimDeSemana && (
              <p className="mt-1" style={{ fontSize: 11.5, color: '#9AA3B0' }}>
                A TfL faz obra em fim de semana com frequência. Confira no TfL Go ou Citymapper antes de descer.
              </p>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
