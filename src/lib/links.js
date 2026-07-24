export function linkMapaParada(parada) {
  return `https://www.google.com/maps/search/?api=1&query=${parada.lat},${parada.lng}`
}

export function linkRotaEntreParadas(origem, destino, modoViagem) {
  return `https://www.google.com/maps/dir/?api=1&origin=${origem.lat},${origem.lng}&destination=${destino.lat},${destino.lng}&travelmode=${modoViagem}`
}

export function linkRotaDoDia(paradas, modoViagem) {
  const paradasNaRota = paradas.filter((parada) => !parada.alternativa)
  const comoCoordenada = (parada) => `${parada.lat},${parada.lng}`
  const paradasIntermediarias = paradasNaRota
    .slice(1, -1)
    .map(comoCoordenada)
    .join('%7C')
  const origem = comoCoordenada(paradasNaRota[0])
  const destino = comoCoordenada(paradasNaRota[paradasNaRota.length - 1])
  const waypoints = paradasIntermediarias ? `&waypoints=${paradasIntermediarias}` : ''
  return `https://www.google.com/maps/dir/?api=1&origin=${origem}&destination=${destino}${waypoints}&travelmode=${modoViagem}`
}
