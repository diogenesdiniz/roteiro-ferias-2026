import { corBorda, corTextoSuave } from '../lib/tema'

export default function BlocoDecisao({ decisao, variantes, varianteEscolhidaId, aoEscolherVariante, cor }) {
  return (
    <section className="px-4 pt-5">
      <div className="rounded-2xl px-4 py-4" style={{ background: '#fff', border: `1px solid ${corBorda}`, borderLeft: `4px solid ${cor}` }}>
        <p className="uppercase" style={{ fontSize: 10, letterSpacing: '0.16em', color: corTextoSuave }}>Escolha do dia</p>
        <h3 className="mt-1 font-semibold" style={{ fontSize: 16 }}>{decisao.pergunta}</h3>
        <p className="mt-2" style={{ fontSize: 14, lineHeight: 1.5, color: corTextoSuave }}>{decisao.contexto}</p>
        <div className="mt-4 flex flex-col gap-3">
          {variantes.map((variante) => {
            const ativa = variante.id === varianteEscolhidaId
            return (
              <button
                key={variante.id}
                onClick={() => aoEscolherVariante(variante.id)}
                className="text-left rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ border: `2px solid ${ativa ? cor : corBorda}`, background: ativa ? '#FBFCFD' : '#fff' }}
                aria-pressed={ativa}
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full" style={{ width: 16, height: 16, border: `4px solid ${ativa ? cor : '#C7CEDA'}`, background: '#fff', display: 'inline-block' }} />
                  <span className="font-semibold" style={{ fontSize: 15 }}>{variante.nome}</span>
                  {variante.recomendada && (
                    <span className="uppercase rounded-full px-2" style={{ fontSize: 9, letterSpacing: '0.13em', background: '#EEF1F5', color: corTextoSuave, paddingTop: 3, paddingBottom: 3 }}>sugerida</span>
                  )}
                </div>
                <p className="mt-2" style={{ fontSize: 13.5, lineHeight: 1.5 }}>{variante.descricao}</p>
                <p className="mt-2" style={{ fontSize: 12.5, lineHeight: 1.5, color: corTextoSuave }}>
                  <span style={{ fontWeight: 600 }}>Custa: </span>{variante.tradeoff}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
