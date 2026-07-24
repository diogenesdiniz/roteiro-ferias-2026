import { useState, useMemo } from 'react'
import { dias, reservas } from './data/roteiro'
import { paraDataLocal, minutosDesdeMeiaNoite, diasAteData } from './lib/tempo'
import { corTexto, corFundo, corBorda, corTextoSuave, corTextoSobre, fonteMonoespacada } from './lib/tema'
import DiaHeader from './components/DiaHeader'
import MapaDia from './components/MapaDia'
import ListaParadas from './components/ListaParadas'
import BlocoDecisao from './components/BlocoDecisao'
import ExtrasDia from './components/ExtrasDia'
import PainelReservas from './components/PainelReservas'
import IndicePorCategoria from './components/IndicePorCategoria'

function idParada(dia, variante, indice) {
  return `d${dia.n}${variante.id}-${indice}`
}

export default function App() {
  const agora = new Date()

  const abaInicial = useMemo(() => {
    const indice = dias.findIndex((dia) => paraDataLocal(dia.data).toDateString() === agora.toDateString())
    return indice >= 0 ? indice : 0
  }, [])

  const [aba, setAba] = useState(abaInicial)
  const [paradaSelecionada, setParadaSelecionada] = useState(null)
  const [visitadas, setVisitadas] = useState({})
  const [reservasFeitas, setReservasFeitas] = useState({})
  const [variantesEscolhidas, setVariantesEscolhidas] = useState({})
  const [painelAberto, setPainelAberto] = useState(null)

  const dia = dias[aba]
  const cor = dia.cor
  const textoSobreCor = corTextoSobre(dia)

  const variante = useMemo(() => {
    const escolhidaId = variantesEscolhidas[dia.n]
    return dia.variantes.find((v) => v.id === escolhidaId) ?? dia.variantes.find((v) => v.recomendada) ?? dia.variantes[0]
  }, [dia, variantesEscolhidas])

  const paradas = variante.paradas

  const ehHoje = useMemo(() => paraDataLocal(dia.data).toDateString() === agora.toDateString(), [dia])

  const indiceAgora = useMemo(() => {
    if (!ehHoje) return -1
    const minutosAgora = agora.getHours() * 60 + agora.getMinutes()
    let indice = -1
    paradas.forEach((parada, i) => {
      if (minutosDesdeMeiaNoite(parada.h) <= minutosAgora) indice = i
    })
    return indice
  }, [paradas, ehHoje])

  const diasAteViagem = useMemo(() => diasAteData(paraDataLocal(dias[0].data)), [])

  function selecionarDia(indice) {
    setAba(indice)
    setParadaSelecionada(null)
  }

  function alternarVisitada(id) {
    setVisitadas((atual) => ({ ...atual, [id]: !atual[id] }))
  }

  function alternarReserva(id) {
    setReservasFeitas((atual) => ({ ...atual, [id]: !atual[id] }))
  }

  function escolherVariante(varianteId) {
    setVariantesEscolhidas((atual) => ({ ...atual, [dia.n]: varianteId }))
    setParadaSelecionada(null)
  }

  const reservasPendentes = reservas.filter((r) => !reservasFeitas[r.id]).length

  return (
    <div className="w-full min-h-screen" style={{ background: corFundo, color: corTexto }}>
      <div className="mx-auto w-full" style={{ maxWidth: 760 }}>

        <header className="px-4 pt-6 pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="relative">
              <div className="absolute" style={{ left: -16, right: -16, top: '53%', height: 9, background: cor, transition: 'background .35s' }} aria-hidden="true" />
              <h1 className="relative text-3xl font-semibold" style={{ letterSpacing: '-0.01em' }}>
                <span style={{ background: corFundo, paddingRight: 10 }}>Londres</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPainelAberto('reservas')}
                className="relative rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ background: '#fff', border: `1px solid ${corBorda}`, fontSize: 12, fontWeight: 600 }}
              >
                Reservas
                {reservasPendentes > 0 && (
                  <span
                    className="absolute rounded-full"
                    style={{ top: -6, right: -6, minWidth: 20, height: 20, background: '#E8402A', color: '#fff', fontSize: 11, fontFamily: fonteMonoespacada, fontWeight: 700, lineHeight: '20px', padding: '0 5px' }}
                  >
                    {reservasPendentes}
                  </span>
                )}
              </button>
              <button
                onClick={() => setPainelAberto('indice')}
                className="rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ background: '#fff', border: `1px solid ${corBorda}`, fontSize: 12, fontWeight: 600 }}
              >
                Índice
              </button>
            </div>
          </div>
          <p className="mt-2" style={{ fontFamily: fonteMonoespacada, fontSize: 11, color: corTextoSuave }}>
            19–25 AGO 2026 · {diasAteViagem > 0 ? `faltam ${diasAteViagem} dias` : diasAteViagem === 0 ? 'começa hoje' : ehHoje ? 'hoje' : 'em viagem'}
          </p>
        </header>

        <nav className="rolagem overflow-x-auto px-4 pb-3" style={{ borderBottom: `1px solid ${corBorda}` }}>
          <div className="flex gap-2" style={{ minWidth: 'max-content' }}>
            {dias.map((d, i) => {
              const ativo = i === aba
              return (
                <button
                  key={d.n}
                  onClick={() => selecionarDia(i)}
                  className="flex items-center gap-2 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ background: ativo ? d.cor : '#fff', color: ativo ? corTextoSobre(d) : corTexto, border: `1px solid ${ativo ? d.cor : corBorda}`, transition: 'background .2s,color .2s' }}
                  aria-pressed={ativo}
                >
                  {!ativo && <span className="rounded-full" style={{ width: 9, height: 9, background: d.cor, display: 'inline-block' }} />}
                  <span style={{ fontFamily: fonteMonoespacada, fontSize: 12, fontWeight: 600 }}>{d.data.slice(8, 10)}/{d.data.slice(5, 7)}</span>
                  <span className="uppercase" style={{ fontSize: 10, letterSpacing: '0.09em', opacity: 0.8 }}>{d.diaSemana.slice(0, 3)}</span>
                </button>
              )
            })}
          </div>
        </nav>

        <DiaHeader dia={dia} totalDias={dias.length} />

        <MapaDia
          dia={dia}
          paradas={paradas}
          cor={cor}
          corTextoSobre={textoSobreCor}
          indiceSelecionado={paradaSelecionada}
          aoSelecionar={setParadaSelecionada}
          indiceAgora={indiceAgora}
          estaVisitada={(indice) => !!visitadas[idParada(dia, variante, indice)]}
        />

        {dia.decisao && (
          <BlocoDecisao
            decisao={dia.decisao}
            variantes={dia.variantes}
            varianteEscolhidaId={variante.id}
            aoEscolherVariante={escolherVariante}
            cor={cor}
          />
        )}

        <ListaParadas
          dia={dia}
          variante={variante}
          paradas={paradas}
          cor={cor}
          corTextoSobre={textoSobreCor}
          indiceSelecionado={paradaSelecionada}
          aoSelecionar={setParadaSelecionada}
          indiceAgora={indiceAgora}
          feitos={visitadas}
          aoAlternarFeito={alternarVisitada}
        />

        <ExtrasDia extras={dia.extras} />

        <footer className="px-4 pt-6 pb-12 mt-4" style={{ fontSize: 12, lineHeight: 1.6, color: corTextoSuave, borderTop: `1px solid ${corBorda}` }}>
          Coordenadas reais, projetadas com correção de longitude, então as distâncias no mapa são fiéis. O Tâmisa e os parques são simplificados, só para orientação. Os tempos de trecho são estimativas, não roteamento ao vivo. Marcações e escolhas não persistem entre sessões ainda.
        </footer>
      </div>

      {painelAberto === 'reservas' && (
        <PainelReservas
          reservas={reservas}
          reservasFeitas={reservasFeitas}
          aoAlternarReserva={alternarReserva}
          aoFechar={() => setPainelAberto(null)}
          diasAteViagem={diasAteViagem}
        />
      )}

      {painelAberto === 'indice' && (
        <IndicePorCategoria dias={dias} opcoes={variantesEscolhidas} aoFechar={() => setPainelAberto(null)} />
      )}
    </div>
  )
}
