import bruto from '../../data/roteiro.json'

const CIDADE_PADRAO = 'Londres'

function comCidade(parada, cidadeDoDia) {
  return { ...parada, cidade: parada.cidade ?? cidadeDoDia }
}

function normalizarDia(dia) {
  const cidade = dia.cidade ?? CIDADE_PADRAO
  return {
    ...dia,
    cidade,
    variantes: dia.variantes.map((v) => ({
      ...v,
      paradas: v.paradas.map((p) => comCidade(p, cidade)),
    })),
  }
}

export const viagem = bruto.viagem
export const linhas = bruto.linhas
export const dias = bruto.dias.map(normalizarDia)
export const reservas = bruto.reservas

export function estaForaDoMapa(dia, parada) {
  return !!parada.foraDoMapa || parada.cidade !== dia.cidade
}
