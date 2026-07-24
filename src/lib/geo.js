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
