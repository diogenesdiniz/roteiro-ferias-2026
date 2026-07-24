import { useEffect, useMemo } from 'react'
import { Map, AdvancedMarker, AdvancedMarkerAnchorPoint, Polyline, ColorScheme, useMap } from '@vis.gl/react-google-maps'
import { linkRotaDoDia } from '../lib/links'
import { corFundoMapa, fonteMonoespacada } from '../lib/tema'
import { estaForaDoMapa } from '../data/roteiro'

const CENTRO_PADRAO = { lat: 51.5074, lng: -0.1278 }

function AjustarEnquadramento({ pontos }) {
  const map = useMap()

  useEffect(() => {
    if (!map || pontos.length === 0) return
    if (pontos.length === 1) {
      map.setCenter(pontos[0])
      map.setZoom(15)
      return
    }
    const bounds = new window.google.maps.LatLngBounds()
    pontos.forEach((p) => bounds.extend(p))
    map.fitBounds(bounds, 48)
  }, [map, pontos])

  return null
}

function MarcadorParada({ parada, indice, cor, corTextoSobre, selecionada, visitada, ehAgora, onClick }) {
  const raio = selecionada ? 25 : 19
  return (
    <AdvancedMarker
      position={{ lat: parada.lat, lng: parada.lng }}
      anchorPoint={AdvancedMarkerAnchorPoint.CENTER}
      zIndex={selecionada ? 10 : ehAgora ? 5 : 1}
      onClick={onClick}
    >
      <div style={{ position: 'relative', width: raio * 2, height: raio * 2, cursor: 'pointer' }}>
        {ehAgora && (
          <div className="pulso-marcador" style={{ position: 'absolute', inset: -12, borderRadius: '9999px', background: cor }} />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '9999px',
            background: visitada ? cor : '#F3F5F8',
            border: `${parada.alternativa ? 4 : 6}px ${parada.alternativa ? 'dashed' : 'solid'} ${cor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: fonteMonoespacada,
              fontWeight: 700,
              fontSize: selecionada ? 22 : 18,
              color: visitada ? corTextoSobre : corFundoMapa,
            }}
          >
            {indice + 1}
          </span>
        </div>
      </div>
    </AdvancedMarker>
  )
}

export default function MapaDia({ dia, paradas, cor, corTextoSobre, indiceSelecionado, aoSelecionar, indiceAgora, estaVisitada }) {
  const paradasNoMapa = useMemo(() => paradas.filter((p) => !estaForaDoMapa(dia, p)), [dia, paradas])
  const pontosEnquadramento = useMemo(() => paradasNoMapa.map((p) => ({ lat: p.lat, lng: p.lng })), [paradasNoMapa])
  const rota = useMemo(
    () => paradasNoMapa.filter((p) => !p.alternativa).map((p) => ({ lat: p.lat, lng: p.lng })),
    [paradasNoMapa],
  )
  const alvo = paradasNoMapa[0]

  const paradaSelecionada = indiceSelecionado === null ? null : paradas[indiceSelecionado]

  return (
    <section className="px-4">
      <div className="overflow-hidden rounded-2xl" style={{ background: corFundoMapa }}>
        <Map
          mapId="DEMO_MAP_ID"
          colorScheme={ColorScheme.DARK}
          defaultCenter={pontosEnquadramento[0] ?? CENTRO_PADRAO}
          defaultZoom={13}
          style={{ width: '100%', height: 380 }}
          gestureHandling="cooperative"
          disableDefaultUI
          zoomControl
          scaleControl
          clickableIcons={false}
        >
          <AjustarEnquadramento pontos={pontosEnquadramento} />

          <Polyline path={rota} strokeColor={cor} strokeOpacity={0.95} strokeWeight={9} />

          {alvo &&
            paradas.map((parada, i) => {
              if (!estaForaDoMapa(dia, parada)) return null
              return (
                <Polyline
                  key={`fora-${i}`}
                  path={[
                    { lat: alvo.lat, lng: alvo.lng },
                    { lat: parada.lat, lng: parada.lng },
                  ]}
                  strokeOpacity={0}
                  icons={[
                    {
                      icon: { path: 'M 0,-1 0,1', strokeOpacity: 0.6, strokeColor: cor, scale: 3 },
                      offset: '0',
                      repeat: '14px',
                    },
                  ]}
                />
              )
            })}

          {paradas.map((parada, i) => (
            <MarcadorParada
              key={i}
              parada={parada}
              indice={i}
              cor={cor}
              corTextoSobre={corTextoSobre}
              selecionada={indiceSelecionado === i}
              visitada={estaVisitada(i)}
              ehAgora={indiceAgora === i}
              onClick={() => aoSelecionar(i)}
            />
          ))}
        </Map>

        <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ borderTop: '1px solid #1B2634' }}>
          <p style={{ fontSize: 13, color: paradaSelecionada === null ? '#6C7A8C' : '#E4E9EF', lineHeight: 1.4 }}>
            {paradaSelecionada === null ? 'Toque numa estação para ver os detalhes' : `${indiceSelecionado + 1}. ${paradaSelecionada.nome}`}
            {paradaSelecionada && estaForaDoMapa(dia, paradaSelecionada) && paradaSelecionada.rotuloFora && (
              <span style={{ color: '#6C7A8C' }}> · {paradaSelecionada.rotuloFora}</span>
            )}
          </p>
          <a
            href={linkRotaDoDia(paradas, dia.modo)}
            target="_blank" rel="noreferrer"
            className="shrink-0 rounded-full px-3 py-2 focus:outline-none focus:ring-2"
            style={{ background: cor, color: corTextoSobre, fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}
          >
            Rota no Maps
          </a>
        </div>
      </div>
    </section>
  )
}
