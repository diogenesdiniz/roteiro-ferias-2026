const CONTORNO = '#2B2118'

function tocaoBase(props = {}) {
  return { stroke: CONTORNO, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round', ...props }
}

// --- Paris ---

function TorreEiffel() {
  return (
    <g {...tocaoBase({ fill: '#D9A45D' })}>
      <path d="M50 6 L57 40 L46 40 Z" />
      <path d="M20 96 L38 96 L47 40 L40 40 Z" />
      <path d="M80 96 L62 96 L53 40 L60 40 Z" />
      <path d="M30 68 L70 68" fill="none" stroke="#7A4E20" strokeWidth="2" />
      <path d="M25 82 L75 82" fill="none" stroke="#7A4E20" strokeWidth="2" />
    </g>
  )
}

function Croissant() {
  return (
    <g {...tocaoBase({ fill: '#E8B04B' })}>
      <path d="M25 55 C25 30 48 18 68 24 C50 28 42 40 42 55 C42 70 50 82 68 86 C48 92 25 80 25 55 Z" />
      <path d="M34 42 Q40 55 34 68" fill="none" stroke="#8B5A20" strokeWidth="2" />
    </g>
  )
}

function Boina() {
  return (
    <g {...tocaoBase({ fill: '#7B2D3B' })}>
      <ellipse cx="50" cy="58" rx="36" ry="17" />
      <circle cx="52" cy="34" r="5" />
      <path d="M20 58 Q50 46 80 58" fill="none" stroke="#4A1B24" strokeWidth="2" />
    </g>
  )
}

function Baguete() {
  return (
    <g {...tocaoBase({ fill: '#D9A45D' })} transform="rotate(-18 50 50)">
      <rect x="10" y="42" width="80" height="16" rx="8" />
      <path d="M25 44 L20 56 M40 44 L35 56 M55 44 L50 56 M70 44 L65 56" stroke="#7A4E20" strokeWidth="2" />
    </g>
  )
}

function Macaron() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <ellipse cx="50" cy="36" rx="32" ry="15" fill="#F4A6C6" />
      <rect x="20" y="46" width="60" height="10" fill="#FFF1D6" stroke="none" />
      <ellipse cx="50" cy="64" rx="32" ry="15" fill="#F4A6C6" />
    </g>
  )
}

// --- Londres ---

function BigBen() {
  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M38 34 L50 8 L62 34 Z" fill="#7A4E2E" stroke={CONTORNO} strokeWidth="3" />
      <rect x="36" y="34" width="28" height="62" fill="#C9B48C" stroke={CONTORNO} strokeWidth="3" />
      <circle cx="50" cy="50" r="12" fill="#F4C542" stroke={CONTORNO} strokeWidth="2" />
      <path d="M50 50 L50 43 M50 50 L56 53" stroke={CONTORNO} strokeWidth="2" />
    </g>
  )
}

function CabineTelefonica() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <rect x="28" y="14" width="44" height="10" rx="2" fill="#8B1E3F" />
      <rect x="32" y="24" width="36" height="66" fill="#C8102E" />
      <path d="M32 40 L68 40 M32 55 L68 55 M32 70 L68 70 M50 24 L50 90" stroke="#fff" strokeWidth="3" />
    </g>
  )
}

function OnibusDoisAndares() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <rect x="12" y="26" width="76" height="46" rx="8" fill="#C8102E" />
      <rect x="20" y="34" width="16" height="12" fill="#DCEBF7" />
      <rect x="42" y="34" width="16" height="12" fill="#DCEBF7" />
      <rect x="64" y="34" width="16" height="12" fill="#DCEBF7" />
      <circle cx="30" cy="76" r="8" fill={CONTORNO} stroke="none" />
      <circle cx="70" cy="76" r="8" fill={CONTORNO} stroke="none" />
    </g>
  )
}

function Guardachuva() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <path d="M15 45 Q50 5 85 45 Z" fill="#22314E" />
      <path d="M15 45 Q50 55 85 45" fill="none" />
      <path d="M50 45 L50 88 Q50 96 42 96" fill="none" strokeWidth="3" />
    </g>
  )
}

function Coroa() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <path d="M22 68 L22 42 L38 58 L50 30 L62 58 L78 42 L78 68 Z" fill="#F4C542" />
      <rect x="20" y="66" width="60" height="14" fill="#8B1E3F" />
      <circle cx="38" cy="50" r="3" fill="#C8102E" stroke="none" />
      <circle cx="50" cy="42" r="3" fill="#22314E" stroke="none" />
      <circle cx="62" cy="50" r="3" fill="#C8102E" stroke="none" />
    </g>
  )
}

function Motivo({ Icone, x, y, rotate = 0, escala = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${escala}) translate(-50 -50)`}>
      <Icone />
    </g>
  )
}

const TAMANHO_LADRILHO = 340

const LADRILHOS_POR_CIDADE = {
  Paris: [
    { Icone: TorreEiffel, x: 60, y: 65, rotate: -6, escala: 0.85 },
    { Icone: Croissant, x: 240, y: 45, rotate: 14, escala: 0.75 },
    { Icone: Boina, x: 175, y: 190, rotate: -10, escala: 0.7 },
    { Icone: Baguete, x: 45, y: 235, rotate: 6, escala: 0.8 },
    { Icone: Macaron, x: 270, y: 250, rotate: -6, escala: 0.65 },
    { Icone: Croissant, x: 110, y: 305, rotate: 22, escala: 0.5 },
    { Icone: TorreEiffel, x: 300, y: 150, rotate: 12, escala: 0.45 },
  ],
  Londres: [
    { Icone: BigBen, x: 60, y: 60, rotate: -5, escala: 0.85 },
    { Icone: CabineTelefonica, x: 240, y: 50, rotate: 8, escala: 0.7 },
    { Icone: OnibusDoisAndares, x: 160, y: 190, rotate: -6, escala: 0.75 },
    { Icone: Guardachuva, x: 45, y: 230, rotate: 10, escala: 0.7 },
    { Icone: Coroa, x: 270, y: 250, rotate: -8, escala: 0.6 },
    { Icone: CabineTelefonica, x: 105, y: 305, rotate: 16, escala: 0.45 },
    { Icone: BigBen, x: 300, y: 150, rotate: 10, escala: 0.4 },
  ],
}

export default function FundoTematico({ cidade }) {
  const ladrilho = LADRILHOS_POR_CIDADE[cidade]
  if (!ladrilho) return null

  const id = `papel-tematico-${cidade}`

  return (
    <svg
      className="fixed pointer-events-none"
      style={{ inset: 0, width: '100vw', height: '100vh', zIndex: 0, opacity: 0.4, transition: 'opacity .4s' }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width={TAMANHO_LADRILHO} height={TAMANHO_LADRILHO} patternUnits="userSpaceOnUse">
          {ladrilho.map((motivo, indice) => (
            <Motivo key={indice} {...motivo} />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
