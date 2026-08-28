import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  AtSign,
  Check,
  ChevronRight,
  CloudSun,
  Moon,
  ShieldCheck,
  Sun,
  VolumeX,
} from 'lucide-react'
import { FacilityScene } from './FacilityScene'
import type { EntrancePhase } from './FacilityScene'
import type { ThemeMode } from './spinoffData'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FacilityEntranceProps = {
  theme: ThemeMode
  onThemeChange: (theme: ThemeMode) => void
  onComplete: () => void
  onPreview: () => void
}

function useOttawaConditions(theme: ThemeMode) {
  return useMemo(() => {
    const now = new Date()
    const time = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Toronto',
      hour: 'numeric',
      minute: '2-digit',
    }).format(now)
    const month = Number(
      new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        month: 'numeric',
      }).format(now),
    )

    if (month >= 12 || month <= 2) {
      return { time, condition: theme === 'arena' ? 'Light snow / -8°C' : 'Clear ice / -4°C', season: 'Winter' }
    }
    if (month >= 9 && month <= 11) {
      return { time, condition: theme === 'arena' ? 'Cool evening / 8°C' : 'Crisp air / 12°C', season: 'Fall' }
    }
    if (month >= 6 && month <= 8) {
      return { time, condition: theme === 'arena' ? 'Clear evening / 19°C' : 'Clear skies / 24°C', season: 'Summer' }
    }
    return { time, condition: theme === 'arena' ? 'Cool evening / 6°C' : 'Bright clouds / 11°C', season: 'Spring' }
  }, [theme])
}

export function FacilityEntrance({
  theme,
  onThemeChange,
  onComplete,
  onPreview,
}: FacilityEntranceProps) {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [phase, setPhase] = useState<EntrancePhase>('form')
  const transitionTimer = useRef<number | null>(null)
  const conditions = useOttawaConditions(theme)
  const validEmail = emailPattern.test(email)
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useEffect(() => {
    return () => {
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current)
    }
  }, [])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    if (!validEmail || phase !== 'form') return

    localStorage.setItem('backboard-spinoff-email', email)
    setPhase('transition')
    transitionTimer.current = window.setTimeout(
      () => {
        setPhase('arrived')
        transitionTimer.current = null
      },
      reducedMotion ? 100 : 2900,
    )
  }

  return (
    <div className={`facility-entrance facility-entrance--${theme}`}>
      <header className="facility-header">
        <img src="/backboard-logo-on-dark.png" alt="Backboard.io" />
        <div className="facility-header__status">
          <span><i /> Ottawa facility online</span>
          <button type="button" onClick={onPreview}>Preview dashboard <ChevronRight size={16} /></button>
        </div>
      </header>

      <main className="facility-layout">
        <section className="facility-stage" aria-label="Interactive Backboard hockey performance centre">
          <FacilityScene
            theme={theme}
            emailReady={validEmail}
            phase={phase}
            reducedMotion={reducedMotion}
          />

          <div className="facility-stage__topbar">
            <div>
              <span>Facility 01</span>
              <strong>Ottawa Performance Centre</strong>
            </div>
            <div>
              <CloudSun size={19} />
              <span>{conditions.season} conditions</span>
              <strong>{conditions.condition}</strong>
            </div>
          </div>

          <div className="facility-stage__number">07</div>

          <div className={`facility-access ${validEmail ? 'is-ready' : ''}`}>
            <span>{validEmail ? 'Access verified' : 'Visitor access'}</span>
            <strong>{validEmail ? 'Tunnel unlocked' : 'Waiting for credentials'}</strong>
          </div>

          {phase === 'transition' && (
            <div className="facility-travel" role="status">
              <div className="facility-travel__line"><span /></div>
              <strong>Proceeding to centre ice</strong>
              <p>Locker room cleared · Tunnel lights active · Rink doors opening</p>
            </div>
          )}

          {phase === 'arrived' && (
            <div className="facility-arrival" aria-hidden="true">
              <span>Centre ice</span>
              <strong>Welcome to the lineup</strong>
            </div>
          )}

          <div className="facility-stage__footer">
            <span>Pointer look enabled</span>
            <span>Ottawa feed / mock data</span>
            <div><VolumeX size={16} /> Sound assets pending</div>
          </div>
        </section>

        <section className="facility-signup">
          <div className="facility-signup__inner">
            {phase !== 'arrived' ? (
              <>
                <div className="facility-signup__step">
                  <span>League access</span>
                  <strong>01 / 03</strong>
                </div>

                <p className="facility-kicker">Backboard Campus Ambassadors</p>
                <h1>Your locker is waiting.</h1>
                <p className="facility-lede">
                  Verify your ambassador email. We’ll open the tunnel and take you to centre ice.
                </p>

                <div className="facility-theme-choice">
                  <div>
                    <span>Choose facility atmosphere</span>
                    <small>You can change this later.</small>
                  </div>
                  <div role="group" aria-label="Facility atmosphere">
                    <button
                      className={theme === 'day' ? 'is-active' : ''}
                      type="button"
                      aria-pressed={theme === 'day'}
                      onClick={() => onThemeChange('day')}
                    >
                      <Sun size={17} /> Daylight
                    </button>
                    <button
                      className={theme === 'arena' ? 'is-active' : ''}
                      type="button"
                      aria-pressed={theme === 'arena'}
                      onClick={() => onThemeChange('arena')}
                    >
                      <Moon size={17} /> Arena night
                    </button>
                  </div>
                </div>

                <form className="facility-form" onSubmit={submit} noValidate>
                  <label htmlFor="spinoff-email">Ambassador email</label>
                  <div className={`facility-email ${touched && !validEmail ? 'has-error' : ''}`}>
                    <AtSign size={20} aria-hidden="true" />
                    <input
                      id="spinoff-email"
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (touched) setTouched(false)
                      }}
                      onBlur={() => setTouched(true)}
                      placeholder="you@university.ca"
                      autoComplete="email"
                      aria-invalid={touched && !validEmail}
                      aria-describedby={touched && !validEmail ? 'spinoff-email-error' : 'spinoff-email-help'}
                      disabled={phase === 'transition'}
                    />
                    {validEmail && <Check size={20} aria-label="Email verified" />}
                  </div>
                  {touched && !validEmail ? (
                    <p className="facility-form__error" id="spinoff-email-error">
                      Enter a valid email address to unlock the tunnel.
                    </p>
                  ) : (
                    <p className="facility-form__help" id="spinoff-email-help">
                      Use the email connected to your ambassador application.
                    </p>
                  )}

                  <button className="facility-submit" type="submit" disabled={phase === 'transition'}>
                    {phase === 'transition' ? 'Moving through the tunnel' : validEmail ? 'Enter the rink' : 'Verify and continue'}
                    <ArrowRight size={19} />
                  </button>
                </form>

                <div className="facility-proof">
                  <ShieldCheck size={20} />
                  <p><strong>Accepted ambassadors only.</strong> Prototype access uses mock authentication and stores no credentials.</p>
                </div>
              </>
            ) : (
              <div className="facility-success" role="status">
                <span className="facility-success__icon"><Check size={29} /></span>
                <p className="facility-kicker">Centre ice reached</p>
                <h1>Welcome to the season.</h1>
                <p>
                  <strong>{email}</strong> is cleared. Your next stop is the equipment bench, where the Draft Toque will assign your house.
                </p>
                <div className="facility-success__route">
                  <span>Next</span>
                  <div><strong>House draft</strong><small>A short roster ceremony. No quiz required.</small></div>
                  <ArrowRight size={18} />
                </div>
                <button className="facility-submit" type="button" onClick={onComplete}>
                  Continue to the Draft Toque <ArrowRight size={19} />
                </button>
                <button
                  className="facility-success__replay"
                  type="button"
                  onClick={() => {
                    setEmail('')
                    setTouched(false)
                    setPhase('form')
                  }}
                >
                  Replay entrance
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
