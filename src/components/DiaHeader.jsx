import { corTextoSuave, fonteMonoespacada } from '../lib/tema'

export default function DiaHeader({ dia, totalDias }) {
  return (
    <section className="px-4 pt-5 pb-3">
      <p className="uppercase" style={{ fontSize: 10, letterSpacing: '0.16em', color: corTextoSuave }}>
        {dia.diaSemana}, {dia.data.slice(8, 10)}/{dia.data.slice(5, 7)} · dia {dia.n} de {totalDias}
      </p>
      <h2 className="mt-1 text-xl font-semibold" style={{ letterSpacing: '-0.01em' }}>
        {dia.titulo}
      </h2>
      <p className="mt-2" style={{ fontSize: 14, lineHeight: 1.55, color: corTextoSuave }}>
        {dia.resumo}
      </p>
      <p className="mt-2" style={{ fontFamily: fonteMonoespacada, fontSize: 11, color: corTextoSuave }}>
        nascer {dia.nascer} · pôr do sol {dia.porSol}
      </p>
    </section>
  )
}
