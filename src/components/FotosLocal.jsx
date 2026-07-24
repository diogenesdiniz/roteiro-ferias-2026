import { useEffect, useState } from 'react'
import { corTextoSuave } from '../lib/tema'

const cacheFotos = new Map()

function urlFoto(nomeFoto, larguraMaxima) {
  return `https://places.googleapis.com/v1/${nomeFoto}/media?maxWidthPx=${larguraMaxima}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
}

function buscarFotos(placeId) {
  if (cacheFotos.has(placeId)) return cacheFotos.get(placeId)
  const promessa = fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      'X-Goog-FieldMask': 'photos',
    },
    // A chave é restrita por referer completo (com o path do site); sem isto o
    // navegador manda só a origem em requisições cross-origin e a API bloqueia.
    referrerPolicy: 'unsafe-url',
  })
    .then((res) => (res.ok ? res.json() : { photos: [] }))
    .then((json) =>
      (json.photos ?? []).slice(0, 3).map((foto) => ({
        url: urlFoto(foto.name, 640),
        autorNome: foto.authorAttributions?.[0]?.displayName || 'Google Maps',
        autorUri: foto.authorAttributions?.[0]?.uri,
      })),
    )
    .catch(() => [])
  cacheFotos.set(placeId, promessa)
  return promessa
}

export default function FotosLocal({ placeId }) {
  const [estado, setEstado] = useState('carregando')
  const [fotos, setFotos] = useState([])

  useEffect(() => {
    if (!placeId) {
      setEstado('vazio')
      return
    }
    let vivo = true
    setEstado('carregando')
    buscarFotos(placeId).then((resultado) => {
      if (!vivo) return
      setFotos(resultado)
      setEstado(resultado.length ? 'pronto' : 'vazio')
    })
    return () => {
      vivo = false
    }
  }, [placeId])

  if (estado === 'vazio') return null

  if (estado === 'carregando') {
    return (
      <div className="mt-3 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="shrink-0 rounded-lg" style={{ width: 108, height: 80, background: '#EEF1F5' }} />
        ))}
      </div>
    )
  }

  return (
    <div className="mt-3 flex gap-2 overflow-x-auto">
      {fotos.map((foto, i) => (
        <div key={i} className="shrink-0" style={{ width: 140 }}>
          <img
            src={foto.url}
            alt=""
            loading="lazy"
            referrerPolicy="unsafe-url"
            className="rounded-lg w-full object-cover"
            style={{ height: 100, background: '#EEF1F5', display: 'block' }}
          />
          {foto.autorUri ? (
            <a
              href={foto.autorUri}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block truncate"
              style={{ fontSize: 10, color: corTextoSuave }}
            >
              Foto: {foto.autorNome}
            </a>
          ) : (
            <span className="mt-1 block truncate" style={{ fontSize: 10, color: corTextoSuave }}>
              Foto: {foto.autorNome}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
