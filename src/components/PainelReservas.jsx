import { paraDataLocal, diasAteData } from '../lib/tempo'
import { corFundo, corBorda, corTextoSuave, fonteMonoespacada } from '../lib/tema'

export default function PainelReservas({ reservas, reservasFeitas, aoAlternarReserva, aoFechar, diasAteViagem }) {
  const pendentes = reservas.filter((r) => !reservasFeitas[r.id]).length

  return (
    <div className="fixed overflow-y-auto" style={{ inset: 0, background: corFundo, zIndex: 50 }}>
      <div className="mx-auto w-full" style={{ maxWidth: 760 }}>
        <div className="sticky flex items-center justify-between px-4 py-4" style={{ top: 0, background: corFundo, borderBottom: `1px solid ${corBorda}` }}>
          <h2 className="text-xl font-semibold">Reservas</h2>
          <button
            onClick={aoFechar}
            className="rounded-full px-4 py-2 focus:outline-none focus:ring-2"
            style={{ background: '#fff', border: `1px solid ${corBorda}`, fontSize: 13, fontWeight: 600 }}
          >
            Fechar
          </button>
        </div>
        <p className="px-4 pt-4" style={{ fontSize: 14, lineHeight: 1.55, color: corTextoSuave }}>
          {pendentes === 0 ? 'Tudo resolvido.' : `${pendentes} itens em aberto, ${diasAteViagem > 0 ? `faltando ${diasAteViagem} dias` : 'com a viagem em curso'}.`}
        </p>
        <div className="px-4 py-4">
          {reservas.map((reserva) => {
            const feita = !!reservasFeitas[reserva.id]
            const diasAbre = reserva.abre ? diasAteData(paraDataLocal(reserva.abre)) : null
            return (
              <button
                key={reserva.id}
                onClick={() => aoAlternarReserva(reserva.id)}
                className="w-full text-left flex gap-3 rounded-2xl px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ background: '#fff', border: `1px solid ${reserva.urgente && !feita ? '#E8402A' : corBorda}`, opacity: feita ? 0.5 : 1 }}
                aria-pressed={feita}
              >
                <span
                  className="relative rounded-md shrink-0"
                  style={{ marginTop: 2, width: 22, height: 22, background: feita ? '#1D9A5B' : '#fff', border: `2px solid ${feita ? '#1D9A5B' : '#B9C1CD'}` }}
                >
                  {feita && (
                    <svg viewBox="0 0 24 24" className="absolute" style={{ inset: 0 }} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12.5 10 17.5 19 7" />
                    </svg>
                  )}
                </span>
                <span style={{ minWidth: 0 }}>
                  <span className="block font-semibold" style={{ fontSize: 15, textDecoration: feita ? 'line-through' : 'none' }}>{reserva.nome}</span>
                  <span className="block mt-1" style={{ fontSize: 13.5, lineHeight: 1.5, color: corTextoSuave }}>{reserva.detalhe}</span>
                  {reserva.so && <span className="block mt-1" style={{ fontSize: 12, color: '#8A93A1', fontStyle: 'italic' }}>{reserva.so}</span>}
                  {diasAbre !== null && !feita && (
                    <span
                      className="inline-block mt-2 rounded-full px-2 py-1"
                      style={{ fontSize: 11.5, fontFamily: fonteMonoespacada, background: diasAbre <= 0 ? '#E6F4EA' : '#FDF3E3', color: diasAbre <= 0 ? '#1D6B3E' : '#7A5314' }}
                    >
                      {diasAbre > 0 ? `abre em ${diasAbre} dias, ${reserva.abre.slice(8, 10)}/${reserva.abre.slice(5, 7)}` : 'já deve estar aberto'}
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
