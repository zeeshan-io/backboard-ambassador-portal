import type { CSSProperties } from 'react'
import type { House } from './spinoffData'

type CrestProps = {
  house: House
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
}

function CrestSymbol({ house }: { house: House }) {
  if (house.id === 'rideau') {
    return (
      <>
        <path d="M20 49 36 18l7 18 21-19-8 34-18 11-18-13Z" />
        <path d="M23 56c10-9 24-9 36 0" className="crest-symbol__line" />
        <path d="m36 18 5 20 9 6-15 2-9-7 10-21Z" className="crest-symbol__cut" />
      </>
    )
  }

  if (house.id === 'atlantic') {
    return (
      <>
        <path d="M13 50c9-15 18-19 28-11 8 6 15 5 24-5-7 20-18 28-33 22-7-3-13-5-19-6Z" />
        <path d="m43 13-15 25 13-4-4 18 22-30-14 5-2-14Z" className="crest-symbol__cut" />
        <path d="M16 61c12-7 24-6 34 1" className="crest-symbol__line" />
      </>
    )
  }

  if (house.id === 'redwood') {
    return (
      <>
        <path d="m17 28 17-12 7 12 17-12 5 23-11 22-18 4-17-14-4-22 4-1Z" />
        <path d="m24 33 11 6 13-8 7 10-10 16-13-1-11-13 3-10Z" className="crest-symbol__cut" />
        <path d="m34 38 4 8 7-4" className="crest-symbol__line" />
        <path d="M34 16v15" className="crest-symbol__line" />
      </>
    )
  }

  return (
    <>
      <path d="m10 34 24-18 7 14 27-16-13 28-15 19-12-18-18-9Z" />
      <path d="m34 16 4 22 15 3-14 8-12-7 7-26Z" className="crest-symbol__cut" />
      <path d="M13 58c14-8 29-8 45 0" className="crest-symbol__line" />
    </>
  )
}

export function HouseCrest({ house, size = 'medium', showLabel = true }: CrestProps) {
  return (
    <span
      className={`house-crest house-crest--${size}`}
      style={
        {
          '--crest-color': house.color,
          '--crest-ink': house.ink,
          '--crest-soft': house.soft,
        } as CSSProperties
      }
      aria-label={`${house.name} crest`}
    >
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <path className="crest-shield" d="M8 8h64v42L40 73 8 50V8Z" />
        <g className="crest-symbol">
          <CrestSymbol house={house} />
        </g>
      </svg>
      {showLabel && <strong>{house.initials}</strong>}
    </span>
  )
}
