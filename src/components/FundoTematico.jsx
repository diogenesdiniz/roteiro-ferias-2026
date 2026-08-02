import { corTexto } from '../lib/tema'

function tracoPadrao(props) {
  return { fill: 'none', stroke: 'currentColor', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round', ...props }
}

function TorreEiffel(props) {
  return (
    <svg viewBox="0 0 240 400" {...tracoPadrao(props)}>
      <path d="M120 14 L120 42" />
      <path d="M120 42 L110 92 L95 142" />
      <path d="M120 42 L130 92 L145 142" />
      <path d="M95 142 L85 202 L70 262" />
      <path d="M145 142 L155 202 L170 262" />
      <path d="M70 262 L55 302 L20 382" />
      <path d="M170 262 L185 302 L220 382" />
      <path d="M95 142 L145 142" />
      <path d="M78 232 L162 232" strokeWidth="2" opacity="0.7" />
      <path d="M70 262 L170 262" />
      <path d="M20 382 L220 382" />
      <path d="M70 347 Q120 292 170 347" />
    </svg>
  )
}

function BigBen(props) {
  return (
    <svg viewBox="0 0 240 400" {...tracoPadrao(props)}>
      <path d="M120 14 L120 42" />
      <path d="M88 122 L120 42 L152 122" />
      <path d="M78 96 L88 122 L90 92" />
      <path d="M162 96 L152 122 L150 92" />
      <path d="M88 122 L88 382" />
      <path d="M152 122 L152 382" />
      <path d="M88 382 L152 382" />
      <path d="M88 202 L152 202" strokeWidth="2" opacity="0.7" />
      <path d="M88 282 L152 282" strokeWidth="2" opacity="0.7" />
      <path d="M88 342 L152 342" strokeWidth="2" opacity="0.7" />
      <circle cx="120" cy="154" r="28" />
      <path d="M120 154 L120 134" strokeWidth="2" />
      <path d="M120 154 L136 160" strokeWidth="2" />
    </svg>
  )
}

const ICONES_POR_CIDADE = {
  Londres: BigBen,
  Paris: TorreEiffel,
}

export default function FundoTematico({ cidade }) {
  const Icone = ICONES_POR_CIDADE[cidade]
  if (!Icone) return null

  return (
    <div
      className="fixed pointer-events-none"
      style={{ right: -50, bottom: -30, width: 'min(48vw, 340px)', zIndex: 0, opacity: 0.14, color: corTexto, transition: 'opacity .4s' }}
      aria-hidden="true"
    >
      <Icone style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  )
}
