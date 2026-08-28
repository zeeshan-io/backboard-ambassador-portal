import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Moon,
  RotateCcw,
  Shield,
  Sun,
  VolumeX,
} from 'lucide-react'
import { HouseCrest } from './HouseCrest'
import { houses } from './spinoffData'
import type { House, ThemeMode } from './spinoffData'

type DraftPhase = 'ready' | 'thinking' | 'result'

const draftMessages = [
  'Picking the roster...',
  'Checking team chemistry...',
  'Interesting...',
  'Hmm... this makes sense.',
]

type DraftToquePageProps = {
  theme: ThemeMode
  onThemeChange: (theme: ThemeMode) => void
  onAssigned: (house: House) => void
  onBack: () => void
}

export function DraftToquePage({
  theme,
  onThemeChange,
  onAssigned,
  onBack,
}: DraftToquePageProps) {
  const [phase, setPhase] = useState<DraftPhase>('ready')
  const [messageIndex, setMessageIndex] = useState(0)
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null)
  const intervalRef = useRef<number | null>(null)
  const resultTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
      if (resultTimerRef.current !== null) window.clearTimeout(resultTimerRef.current)
    }
  }, [])

  const beginDraft = () => {
    const currentCount = Number(localStorage.getItem('backboard-spinoff-draft-count') ?? '0')
    const nextHouse = houses[currentCount % houses.length]
    localStorage.setItem('backboard-spinoff-draft-count', String(currentCount + 1))

    setSelectedHouse(nextHouse)
    setMessageIndex(0)
    setPhase('thinking')

    intervalRef.current = window.setInterval(() => {
      setMessageIndex((current) => Math.min(draftMessages.length - 1, current + 1))
    }, 900)

    resultTimerRef.current = window.setTimeout(() => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setPhase('result')
      resultTimerRef.current = null
    }, 3900)
  }

  const resetDraft = () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    if (resultTimerRef.current !== null) window.clearTimeout(resultTimerRef.current)
    intervalRef.current = null
    resultTimerRef.current = null
    setSelectedHouse(null)
    setMessageIndex(0)
    setPhase('ready')
  }

  return (
    <div className={`draft-page draft-page--${theme}`}>
      <header className="draft-header">
        <img src="/backboard-logo-on-dark.png" alt="Backboard.io" />
        <div className="draft-header__right">
          <span>Onboarding</span>
          <strong>02 / 03</strong>
          <button
            type="button"
            onClick={() => onThemeChange(theme === 'day' ? 'arena' : 'day')}
            aria-label={`Switch to ${theme === 'day' ? 'arena night' : 'daylight'}`}
          >
            {theme === 'day' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </header>

      <main className="draft-layout">
        <section className="draft-stage">
          <div className="draft-stage__architecture" aria-hidden="true">
            <span className="draft-window draft-window--one" />
            <span className="draft-window draft-window--two" />
            <span className="draft-skyline draft-skyline--left" />
            <span className="draft-skyline draft-skyline--centre" />
            <span className="draft-skyline draft-skyline--right" />
            <span className="draft-tower"><i /></span>
            <span className="draft-bench" />
            <span className="draft-bench-leg draft-bench-leg--left" />
            <span className="draft-bench-leg draft-bench-leg--right" />
          </div>

          <div className="draft-stage__hud">
            <div><span>Ottawa roster desk</span><strong>Draft room 01</strong></div>
            <div><span>Available houses</span><strong>04</strong></div>
          </div>

          <div className={`draft-toque-scene draft-toque-scene--${phase}`}>
            <div className="draft-toque" aria-label="Backboard Draft Toque">
              <span className="draft-toque__pom" />
              <span className="draft-toque__body">
                <i className="draft-toque__fold" />
                <i className="draft-toque__mark">B</i>
              </span>
              {phase === 'thinking' && <span className="draft-toque__thought">...</span>}
            </div>

            <div className="draft-dialogue" aria-live="polite">
              {phase === 'ready' && (
                <>
                  <span>The Draft Toque</span>
                  <strong>Every strong roster needs different kinds of builders.</strong>
                  <p>Step up to the equipment bench. Your house is waiting.</p>
                </>
              )}
              {phase === 'thinking' && (
                <>
                  <span>Roster in progress</span>
                  <strong>{draftMessages[messageIndex]}</strong>
                  <p>Reviewing the next available locker.</p>
                </>
              )}
              {phase === 'result' && selectedHouse && (
                <>
                  <span>Decision confirmed</span>
                  <strong>{selectedHouse.name}.</strong>
                  <p>{selectedHouse.motto}</p>
                </>
              )}
            </div>
          </div>

          <div className="draft-house-rail" aria-label="Available houses">
            {houses.map((house, index) => {
              const active =
                phase === 'thinking'
                  ? index === messageIndex % houses.length
                  : phase === 'result' && house.id === selectedHouse?.id
              return (
                <div className={active ? 'is-active' : ''} key={house.id}>
                  <HouseCrest house={house} size="small" showLabel={false} />
                  <span><strong>{house.name}</strong><small>{house.role}</small></span>
                </div>
              )
            })}
          </div>

          <div className="draft-stage__controls">
            <div><VolumeX size={17} /> Sound assets pending</div>
            <span>Prototype assignment: rotating roster order</span>
          </div>
        </section>

        <section className="draft-panel">
          <div className="draft-panel__inner">
            <button className="draft-back" type="button" onClick={onBack}>
              <ArrowLeft size={18} /> Back to the entrance
            </button>

            {phase !== 'result' ? (
              <>
                <p className="draft-kicker">House assignment</p>
                <h1>Take your place in the roster.</h1>
                <p className="draft-lede">
                  Houses create a smaller crew for shared goals, friendly standings, and season moments. They never limit your missions or rewards.
                </p>

                <div className="draft-rules">
                  <div><span>01</span><p><strong>One shared program</strong>Every ambassador keeps access to the same opportunities.</p></div>
                  <div><span>02</span><p><strong>Four different strengths</strong>Each house brings a distinct contribution style.</p></div>
                  <div><span>03</span><p><strong>A rotating roster</strong>The prototype assigns each new ambassador in sequence.</p></div>
                </div>

                <button className="draft-primary" type="button" onClick={beginDraft} disabled={phase === 'thinking'}>
                  {phase === 'thinking' ? 'The Toque is deciding' : 'Begin the roster draw'}
                  <ArrowRight size={19} />
                </button>
              </>
            ) : selectedHouse ? (
              <div
                className="draft-result"
                style={
                  {
                    '--house-color': selectedHouse.color,
                    '--house-ink': selectedHouse.ink,
                  } as CSSProperties
                }
              >
                <p className="draft-kicker">Roster confirmed</p>
                <div className="draft-result__identity">
                  <HouseCrest house={selectedHouse} size="large" />
                  <div>
                    <span>Your assigned house</span>
                    <h1>{selectedHouse.name}</h1>
                    <p>{selectedHouse.role} · {selectedHouse.region}</p>
                  </div>
                </div>

                <div className="draft-result__locker">
                  <div className="draft-jersey">
                    <span>{selectedHouse.shortName}</span>
                    <strong>{selectedHouse.number}</strong>
                  </div>
                  <div>
                    <span>Locker assignment</span>
                    <strong>{selectedHouse.initials} / {selectedHouse.number}</strong>
                    <p><Check size={17} /> House patch issued</p>
                    <p><Check size={17} /> Standings access active</p>
                  </div>
                </div>

                <button className="draft-primary" type="button" onClick={() => onAssigned(selectedHouse)}>
                  Enter the Performance Centre <ArrowRight size={19} />
                </button>
                <button className="draft-secondary" type="button" onClick={resetDraft}>
                  <RotateCcw size={17} /> Replay ceremony
                </button>
              </div>
            ) : null}

            <div className="draft-assurance">
              <Shield size={19} />
              <p><strong>Original house system.</strong> The Draft Toque is a Canadian sports character created for Backboard—not an adaptation of an existing franchise.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
