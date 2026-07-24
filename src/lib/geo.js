export const LARGURA = 1000
export const ALTURA = 600
const MARGEM_INTERNA = 76
const GRAU_KM = 111.32

const COSSENO_LATITUDE_BASE = Math.cos((51.5 * Math.PI) / 180)
const projetarLng = (lng) => lng * COSSENO_LATITUDE_BASE
const projetarLat = (lat) => -lat

export function criarProjecao(pontos) {
  const xsProjetados = pontos.map((p) => projetarLng(p.lng))
  const ysProjetados = pontos.map((p) => projetarLat(p.lat))
  const minX = Math.min(...xsProjetados), maxX = Math.max(...xsProjetados)
  const minY = Math.min(...ysProjetados), maxY = Math.max(...ysProjetados)
  const extensaoMinima = 0.009
  const larguraGraus = Math.max(maxX - minX, extensaoMinima)
  const alturaGraus = Math.max(maxY - minY, (extensaoMinima * ALTURA) / LARGURA)
  const escala = Math.min(
    (LARGURA - 2 * MARGEM_INTERNA) / larguraGraus,
    (ALTURA - 2 * MARGEM_INTERNA) / alturaGraus,
  )
  const centroX = (minX + maxX) / 2, centroY = (minY + maxY) / 2
  return {
    escala,
    projetar: (lat, lng) => [
      LARGURA / 2 + (projetarLng(lng) - centroX) * escala,
      ALTURA / 2 + (projetarLat(lat) - centroY) * escala,
    ],
  }
}

export function caminhoSvg(proj, pontosLngLat) {
  return pontosLngLat
    .map(([lng, lat], indice) => {
      const [x, y] = proj.projetar(lat, lng)
      return `${indice === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export function caminhoSvgParadas(proj, paradas) {
  return paradas
    .map((parada, indice) => {
      const [x, y] = proj.projetar(parada.lat, parada.lng)
      return `${indice === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
}

export function grampear(x, y) {
  const margem = 28
  return [Math.max(margem, Math.min(LARGURA - margem, x)), Math.max(margem, Math.min(ALTURA - margem, y))]
}

export function distanciaKm(origem, destino) {
  const raioTerraKm = 6371
  const deltaLat = ((destino.lat - origem.lat) * Math.PI) / 180
  const deltaLng = ((destino.lng - origem.lng) * Math.PI) / 180
  const latOrigemRad = (origem.lat * Math.PI) / 180
  const latDestinoRad = (destino.lat * Math.PI) / 180
  const haversine =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(latOrigemRad) * Math.cos(latDestinoRad) * Math.sin(deltaLng / 2) ** 2
  return 2 * raioTerraKm * Math.asin(Math.sqrt(haversine))
}

export function escalaEmKm(escalaProjecao) {
  const pixelsPorKm = escalaProjecao / GRAU_KM
  const opcoesKm = [0.5, 1, 2, 5, 10]
  let melhorOpcaoKm = 0.5
  opcoesKm.forEach((opcaoKm) => {
    if (opcaoKm * pixelsPorKm < 230) melhorOpcaoKm = opcaoKm
  })
  return { km: melhorOpcaoKm, comprimentoPx: melhorOpcaoKm * pixelsPorKm }
}
