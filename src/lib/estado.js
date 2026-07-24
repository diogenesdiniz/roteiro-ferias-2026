import { useCallback, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { doc, initializeFirestore, onSnapshot, persistentLocalCache, setDoc, updateDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = initializeFirestore(app, { localCache: persistentLocalCache() })

const refViagem = doc(db, 'viagens', 'londres-paris-madrid-2026')

const ESTADO_PADRAO = { visitados: {}, reservas: {}, variantes: {} }

export function useEstadoViagem() {
  const [estado, setEstado] = useState(ESTADO_PADRAO)
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    let pararSnapshot = () => {}

    const pararAuth = onAuthStateChanged(auth, (usuario) => {
      if (!usuario) {
        signInAnonymously(auth).catch(() => {})
        return
      }
      pararSnapshot()
      pararSnapshot = onSnapshot(
        refViagem,
        (snap) => {
          if (!snap.exists()) {
            setDoc(refViagem, ESTADO_PADRAO).catch(() => {})
            return
          }
          const dados = snap.data()
          setEstado({
            visitados: dados.visitados ?? {},
            reservas: dados.reservas ?? {},
            variantes: dados.variantes ?? {},
          })
          setPronto(true)
        },
        () => {},
      )
    })

    return () => {
      pararAuth()
      pararSnapshot()
    }
  }, [])

  const alternarVisitado = useCallback(
    (id) => {
      const valor = !estado.visitados[id]
      setEstado((atual) => ({ ...atual, visitados: { ...atual.visitados, [id]: valor } }))
      updateDoc(refViagem, { [`visitados.${id}`]: valor }).catch(() => {})
    },
    [estado.visitados],
  )

  const alternarReserva = useCallback(
    (id) => {
      const valor = !estado.reservas[id]
      setEstado((atual) => ({ ...atual, reservas: { ...atual.reservas, [id]: valor } }))
      updateDoc(refViagem, { [`reservas.${id}`]: valor }).catch(() => {})
    },
    [estado.reservas],
  )

  const escolherVariante = useCallback((diaN, varianteId) => {
    setEstado((atual) => ({ ...atual, variantes: { ...atual.variantes, [diaN]: varianteId } }))
    updateDoc(refViagem, { [`variantes.${diaN}`]: varianteId }).catch(() => {})
  }, [])

  return {
    pronto,
    visitados: estado.visitados,
    reservas: estado.reservas,
    variantes: estado.variantes,
    alternarVisitado,
    alternarReserva,
    escolherVariante,
  }
}
