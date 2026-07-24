export function paraDataLocal(dataIso) {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return new Date(ano, mes - 1, dia)
}

export function minutosDesdeMeiaNoite(horaTexto) {
  const [horas, minutos] = horaTexto.split(':').map(Number)
  return horas * 60 + minutos
}

export function formatarDuracao(minutosTotais) {
  if (minutosTotais < 60) return `${minutosTotais} min`
  const horas = Math.floor(minutosTotais / 60)
  const minutosRestantes = String(minutosTotais % 60).padStart(2, '0')
  return `${horas}h${minutosRestantes}`
}

export function formatarDistancia(km) {
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1).replace('.', ',')} km`
}

export function diasAteData(dataAlvo, dataBase = new Date()) {
  const base = new Date(dataBase.getFullYear(), dataBase.getMonth(), dataBase.getDate())
  return Math.round((dataAlvo - base) / 86400000)
}
