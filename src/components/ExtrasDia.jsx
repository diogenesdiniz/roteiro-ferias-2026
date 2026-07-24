import { useState } from 'react'
import { corBorda, corTextoSuave, fonteMonoespacada } from '../lib/tema'

export default function ExtrasDia({ extras }) {
  const [aberto, setAberto] = useState(false)

  if (!extras?.length) return null

  return (
    <section className="px-4 pt-4 pb-2">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex items-center justify-between rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{ background: '#fff', border: `1px dashed ${corBorda}` }}
        aria-expanded={aberto}
      >
        <span style={{ fontSize: 14, fontWeight: 600 }}>O que mais cabe neste dia</span>
        <span style={{ fontFamily: fonteMonoespacada, fontSize: 12, color: corTextoSuave }}>
          {aberto ? 'fechar' : extras.length}
        </span>
      </button>
      {aberto && (
        <div className="mt-2 rounded-2xl px-4 py-1" style={{ background: '#fff', border: `1px solid ${corBorda}` }}>
          {extras.map((extra, indice) => (
            <div key={extra.nome} className="py-3" style={{ borderTop: indice === 0 ? 'none' : `1px solid ${corBorda}` }}>
              <p className="font-semibold" style={{ fontSize: 14.5 }}>{extra.nome}</p>
              <p className="mt-1" style={{ fontSize: 13.5, lineHeight: 1.5, color: corTextoSuave }}>{extra.nota}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
