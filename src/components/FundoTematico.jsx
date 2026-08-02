const CONTORNO = '#2B2118'

function tocaoBase(props = {}) {
  return { stroke: CONTORNO, strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round', ...props }
}

// --- Paris ---

function TorreEiffel() {
  return (
    <g {...tocaoBase({ fill: '#D9A45D', strokeWidth: 2.5 })}>
      <path d="M50 3 Q54 35 56 61 Q64 66 70 80 Q80 86 88 97 L66 97 Q60 88 58 78 Q56 70 54 63 L46 63 Q44 70 42 78 Q40 88 34 97 L12 97 Q20 86 30 80 Q36 66 44 61 Q46 35 50 3 Z" />
      <path d="M40 91 L48 85 M60 91 L52 85 M33 74 L41 69 M67 74 L59 69 M45 47 L49 40 M55 47 L51 40" stroke="#7A4E20" strokeWidth="1.4" opacity="0.75" />
      <rect x="27" y="77" width="46" height="6" rx="1" fill="#B8894F" stroke="#7A4E20" strokeWidth="1.4" />
      <rect x="39" y="59" width="22" height="5" rx="1" fill="#B8894F" stroke="#7A4E20" strokeWidth="1.4" />
      <circle cx="50" cy="3" r="2" fill="#7A4E20" stroke="none" />
    </g>
  )
}

function Croissant() {
  return (
    <g {...tocaoBase()}>
      <path
        d="M8 45 C6 30 14 14 30 9 C42 5 54 8 58 20 C61 28 60 34 56 40 C60 44 68 46 74 52 C80 58 84 64 82 72 C80 80 72 82 66 76 C62 72 62 66 56 62 C48 56 40 54 32 52 C20 50 10 52 8 45 Z"
        fill="#F0AE4E"
      />
      <path
        d="M56 40 C60 44 68 46 74 52 C80 58 84 64 82 72 C80 80 72 82 66 76 C62 72 62 66 56 62 C51 58 46 56 40 54 C46 50 52 44 56 40 Z"
        fill="#D98E30"
      />
      <path
        d="M74 60 C80 62 83 68 82 72 C80 80 72 82 66 76 C64 74 63 71 63 68 C68 66 71 63 74 60 Z"
        fill="#C97A22"
      />
    </g>
  )
}

function Boina() {
  return (
    <g {...tocaoBase({ fill: '#7B2D3B' })}>
      <path d="M14 60 Q10 40 30 28 Q46 18 62 24 Q80 30 84 46 Q86 56 76 62 Q60 70 40 68 Q22 66 14 60 Z" />
      <path d="M52 28 Q50 20 54 14 Q57 20 55 27 Z" />
      <path d="M20 56 Q40 64 68 58" fill="none" stroke="#4A1B24" strokeWidth="1.8" opacity="0.8" />
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
    <g stroke={CONTORNO} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M20 34 Q20 18 50 18 Q80 18 80 34 L80 40 Q50 46 20 40 Z" fill="#F4A6C6" />
      <path
        d="M20 40 Q26 42 22 44 Q28 45 24 47 Q30 47 26 49 Q32 48 50 49 Q68 48 74 49 Q70 47 76 47 Q72 45 78 44 Q74 42 80 40 Q50 46 20 40 Z"
        fill="#F4A6C6"
      />
      <rect x="21" y="45" width="58" height="10" fill="#FFF1D6" stroke="none" />
      <path d="M20 66 Q20 82 50 82 Q80 82 80 66 L80 60 Q50 54 20 60 Z" fill="#F4A6C6" />
      <path
        d="M20 60 Q26 58 22 56 Q28 55 24 53 Q30 53 26 51 Q32 52 50 51 Q68 52 74 51 Q70 53 76 53 Q72 55 78 56 Q74 58 80 60 Q50 54 20 60 Z"
        fill="#F4A6C6"
      />
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
    <g stroke={CONTORNO} strokeWidth="2.5" strokeLinejoin="round">
      <path d="M33 16 Q50 6 67 16 L67 20 L33 20 Z" fill="#8B1E3F" />
      <rect x="30" y="20" width="40" height="74" rx="2" fill="#C8102E" />
      <rect x="35" y="27" width="12" height="13" fill="#DCEBF7" />
      <rect x="53" y="27" width="12" height="13" fill="#DCEBF7" />
      <rect x="35" y="44" width="12" height="13" fill="#DCEBF7" />
      <rect x="53" y="44" width="12" height="13" fill="#DCEBF7" />
      <rect x="35" y="61" width="12" height="13" fill="#DCEBF7" />
      <rect x="53" y="61" width="12" height="13" fill="#DCEBF7" />
      <circle cx="50" cy="10" r="3" fill="#F4C542" stroke="none" />
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

// Cabine de policia azul genérica (sem letreiro/marca), não é o TARDIS oficial da BBC
function CabinePolicial() {
  return (
    <g stroke={CONTORNO} strokeWidth="2.5" strokeLinejoin="round">
      <rect x="34" y="10" width="32" height="6" rx="1" fill="#0A2A5E" />
      <circle cx="50" cy="6" r="4" fill="#F4C542" />
      <rect x="30" y="18" width="40" height="76" rx="2" fill="#1B3A6B" />
      <rect x="35" y="25" width="12" height="13" fill="#DCEBF7" />
      <rect x="53" y="25" width="12" height="13" fill="#DCEBF7" />
      <rect x="35" y="42" width="12" height="13" fill="#DCEBF7" />
      <rect x="53" y="42" width="12" height="13" fill="#DCEBF7" />
      <rect x="35" y="59" width="12" height="13" fill="#DCEBF7" />
      <rect x="53" y="59" width="12" height="13" fill="#DCEBF7" />
    </g>
  )
}

// Chapeu de mago genérico, sem referência a personagem específico
function ChapeuMagico() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <path d="M50 4 Q58 32 68 54 L32 54 Q42 32 50 4 Z" fill="#3B2E5A" />
      <ellipse cx="50" cy="56" rx="30" ry="9" fill="#3B2E5A" />
      <path d="M22 56 Q50 64 78 56" fill="none" stroke="#241B3A" strokeWidth="2" />
      <path d="M62 20 L66 12 L70 20 L78 22 L70 26 L66 34 L62 26 L54 22 Z" fill="#F4C542" stroke="none" />
    </g>
  )
}

// --- Madrid (para quando o roteiro tiver dias por lá, e para os dias de fratura) ---

function PortaAlcala() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <rect x="14" y="30" width="72" height="12" fill="#D9A45D" />
      <rect x="18" y="42" width="20" height="50" fill="#D9A45D" />
      <rect x="62" y="42" width="20" height="50" fill="#D9A45D" />
      <path d="M38 92 L38 68 Q38 56 50 56 Q62 56 62 68 L62 92 Z" fill="#E9ECF0" stroke="none" />
      <path d="M22 20 L30 30 L14 30 Z" fill="#D9A45D" />
      <path d="M78 20 L86 30 L70 30 Z" fill="#D9A45D" />
      <path d="M42 12 L58 12 L50 26 Z" fill="#D9A45D" />
    </g>
  )
}

function Abanico() {
  return (
    <g stroke={CONTORNO} strokeWidth="3" strokeLinejoin="round">
      <path d="M50 92 L14 34 Q32 20 50 24 Q68 20 86 34 Z" fill="#C8102E" />
      <path d="M50 92 L26 42 M50 92 L38 30 M50 92 L50 24 M50 92 L62 30 M50 92 L74 42" fill="none" stroke="#F4C542" strokeWidth="2" />
    </g>
  )
}

function Presunto() {
  return (
    <g {...tocaoBase({ fill: '#D98A6B' })}>
      <path d="M40 10 Q70 10 74 42 Q76 66 58 84 Q48 92 40 88 Q30 82 30 66 Q26 40 40 10 Z" />
      <path d="M38 12 L26 6" stroke="#8B4A2E" strokeWidth="3" />
      <path d="M46 30 Q60 40 58 58" fill="none" stroke="#8B4A2E" strokeWidth="2" />
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

const TAMANHO_LADRILHO = 360

const LADRILHOS_POR_CIDADE = {
  Paris: [
    { Icone: TorreEiffel, x: 65, y: 65, rotate: -6, escala: 0.85 },
    { Icone: Croissant, x: 250, y: 45, rotate: 14, escala: 0.7 },
    { Icone: Boina, x: 180, y: 195, rotate: -10, escala: 0.65 },
    { Icone: Baguete, x: 45, y: 245, rotate: 6, escala: 0.75 },
    { Icone: Macaron, x: 280, y: 260, rotate: -6, escala: 0.6 },
    { Icone: Croissant, x: 115, y: 315, rotate: 22, escala: 0.4 },
    { Icone: TorreEiffel, x: 315, y: 155, rotate: 12, escala: 0.4 },
    { Icone: Macaron, x: 195, y: 65, rotate: 8, escala: 0.35 },
    { Icone: Croissant, x: 330, y: 300, rotate: -15, escala: 0.35 },
  ],
  Londres: [
    { Icone: BigBen, x: 65, y: 60, rotate: -5, escala: 0.85 },
    { Icone: CabineTelefonica, x: 250, y: 50, rotate: 8, escala: 0.65 },
    { Icone: OnibusDoisAndares, x: 165, y: 195, rotate: -6, escala: 0.7 },
    { Icone: Guardachuva, x: 45, y: 240, rotate: 10, escala: 0.65 },
    { Icone: Coroa, x: 280, y: 260, rotate: -8, escala: 0.55 },
    { Icone: CabinePolicial, x: 115, y: 315, rotate: -10, escala: 0.5 },
    { Icone: ChapeuMagico, x: 315, y: 155, rotate: 10, escala: 0.5 },
    { Icone: BigBen, x: 195, y: 65, rotate: 12, escala: 0.35 },
  ],
  Madrid: [
    { Icone: PortaAlcala, x: 65, y: 65, rotate: -5, escala: 0.8 },
    { Icone: Abanico, x: 250, y: 55, rotate: 10, escala: 0.65 },
    { Icone: Presunto, x: 175, y: 200, rotate: -8, escala: 0.65 },
    { Icone: Abanico, x: 50, y: 250, rotate: 14, escala: 0.5 },
    { Icone: PortaAlcala, x: 290, y: 250, rotate: 8, escala: 0.45 },
    { Icone: Presunto, x: 130, y: 320, rotate: -12, escala: 0.4 },
  ],
}

// Dias de fratura: mistura os motivos das duas cidades no mesmo ladrilho
const LADRILHOS_FRATURA = {
  'Londres->Paris': [
    { Icone: BigBen, x: 65, y: 60, rotate: -5, escala: 0.8 },
    { Icone: TorreEiffel, x: 295, y: 60, rotate: 8, escala: 0.8 },
    { Icone: Guardachuva, x: 175, y: 150, rotate: -8, escala: 0.55 },
    { Icone: Croissant, x: 60, y: 220, rotate: 10, escala: 0.6 },
    { Icone: Coroa, x: 300, y: 190, rotate: -10, escala: 0.5 },
    { Icone: Baguete, x: 155, y: 300, rotate: 12, escala: 0.55 },
    { Icone: CabineTelefonica, x: 330, y: 300, rotate: -8, escala: 0.45 },
    { Icone: Macaron, x: 30, y: 330, rotate: 6, escala: 0.4 },
  ],
  'Paris->Madrid': [
    { Icone: TorreEiffel, x: 65, y: 60, rotate: -6, escala: 0.8 },
    { Icone: PortaAlcala, x: 295, y: 60, rotate: 8, escala: 0.75 },
    { Icone: Croissant, x: 175, y: 150, rotate: -8, escala: 0.55 },
    { Icone: Abanico, x: 60, y: 220, rotate: 10, escala: 0.55 },
    { Icone: Macaron, x: 300, y: 190, rotate: -10, escala: 0.45 },
    { Icone: Presunto, x: 155, y: 300, rotate: 12, escala: 0.5 },
    { Icone: Boina, x: 330, y: 300, rotate: -8, escala: 0.45 },
    { Icone: Baguete, x: 30, y: 330, rotate: 6, escala: 0.4 },
  ],
}

export default function FundoTematico({ cidade, cidadeDestino }) {
  const chaveFratura = cidadeDestino ? `${cidade}->${cidadeDestino}` : null
  const ladrilho = (chaveFratura && LADRILHOS_FRATURA[chaveFratura]) || LADRILHOS_POR_CIDADE[cidade]
  if (!ladrilho) return null

  const id = `papel-tematico-${chaveFratura || cidade}`
  const tamanho = chaveFratura ? 380 : TAMANHO_LADRILHO

  return (
    <svg
      className="fixed pointer-events-none"
      style={{ inset: 0, width: '100vw', height: '100vh', zIndex: 0, opacity: 0.4, transition: 'opacity .4s' }}
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} width={tamanho} height={tamanho} patternUnits="userSpaceOnUse">
          {ladrilho.map((motivo, indice) => (
            <Motivo key={indice} {...motivo} />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
