import { useRef } from 'react'
import CardParada from './CardParada'
import { minutosDesdeMeiaNoite } from '../lib/tempo'
import { corTextoSuave, fonteMonoespacada } from '../lib/tema'

function idParada(dia, variante, indice) {
  return `d${dia.n}${variante.id}-${indice}`
}

export default function ListaParadas({ dia, variante, paradas, cor, corTextoSobre, indiceSelecionado, aoSelecionar, indiceAgora, feitos, aoAlternarFeito }) {
  const listaRef = useRef(null)
  const feitosNoDia = paradas.filter((_, i) => feitos[idParada(dia, variante, i)]).length

  function selecionarComScroll(indice) {
    aoSelecionar(indice)
    const el = listaRef.current?.querySelector(`[data-parada="${indice}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-5 pb-2">
        <p className="uppercase" style={{ fontSize: 10, letterSpacing: '0.16em', color: corTextoSuave }}>{paradas.length} paradas</p>
        <p style={{ fontFamily: fonteMonoespacada, fontSize: 11, color: corTextoSuave }}>{feitosNoDia} de {paradas.length} visitadas</p>
      </div>

      <ol ref={listaRef} className="px-4">
        {paradas.map((parada, indice) => {
          const id = idParada(dia, variante, indice)
          const proximaParada = paradas[indice + 1]
          const proximaNaRota = paradas.slice(indice + 1).find((q) => !q.alternativa)
          const minutosLivres =
            proximaNaRota && parada.trecho
              ? minutosDesdeMeiaNoite(proximaNaRota.h) - minutosDesdeMeiaNoite(parada.h) - parada.trecho.min
              : null

          return (
            <CardParada
              key={id}
              parada={parada}
              indice={indice}
              proximaParada={proximaParada}
              cor={cor}
              corTextoSobre={corTextoSobre}
              aberto={indiceSelecionado === indice}
              visitada={!!feitos[id]}
              aoAlternarVisitada={() => aoAlternarFeito(id)}
              aoSelecionar={() => selecionarComScroll(indiceSelecionado === indice ? null : indice)}
              ehAgora={indiceAgora === indice}
              minutosLivres={minutosLivres}
              mostrarAvisoObraFimDeSemana={dia.n === 4 || dia.n === 5}
            />
          )
        })}
      </ol>
    </>
  )
}
