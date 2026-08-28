import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, AtSign, Check, ChevronRight, Moon, ShieldCheck, Snowflake, Sun, Trophy } from 'lucide-react'
import type { RinkMode, SceneSeason } from './OttawaRinkScene'
import './SignupPage.css'

type SignupPhase = 'form' | 'shooting' | 'success'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const seasons: SceneSeason[] = ['summer', 'fall', 'winter']
const OttawaRinkScene = lazy(() =>
  import('./OttawaRinkScene').then((module) => ({ default: module.OttawaRinkScene })),
)

export function SignupPage({
  onPreviewDashboard,
  onStartCombine,
}: {
  onPreviewDashboard: () => void
  onStartCombine: () => void
}) {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [phase, setPhase] = useState<SignupPhase>('form')
  const [render3D, setRender3D] = useState(() => window.matchMedia('(min-width: 781px)').matches)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('backboard-signup-theme') === 'dark')
  const [sceneMode, setSceneMode] = useState<RinkMode>('season')
  const [seasonIndex, setSeasonIndex] = useState(0)
  const [score, setScore] = useState({ player: 0, cpu: 0 })
  const timer = useRef<number | null>(null)
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const validEmail = emailPattern.test(email)
  const inputProgress = email.length === 0 ? 0 : validEmail ? 0.76 : Math.min(0.52, 0.12 + email.length / 45)
  const sceneProgress = phase === 'form' ? inputProgress : 1
  const season = seasons[seasonIndex]
  const matchResult = score.player >= 3 ? 'You win the rink!' : score.cpu >= 3 ? 'CPU takes this round.' : null

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    }
  }, [])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 781px)')
    const update3DPreference = () => {
      setRender3D(desktopQuery.matches)
      if (!desktopQuery.matches) setSceneMode('season')
    }
    desktopQuery.addEventListener('change', update3DPreference)
    return () => desktopQuery.removeEventListener('change', update3DPreference)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const seasonTimer = window.setInterval(() => {
      setSeasonIndex((current) => (current + 1) % seasons.length)
    }, 6200)
    return () => window.clearInterval(seasonTimer)
  }, [reducedMotion])

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setTouched(true)
    if (!validEmail || phase !== 'form') return

    setPhase('shooting')
    timer.current = window.setTimeout(
      () => {
        setPhase('success')
        timer.current = null
      },
      reducedMotion ? 80 : 1150,
    )
  }

  return (
    <div className={`signup-page ${darkMode ? 'signup-page--dark' : ''}`}>
      <header className="signup-header">
        <img src={darkMode ? '/backboard-logo-on-dark.png' : '/backboard-logo-dark.png'} alt="Backboard.io" />
        <div className="signup-header__actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            onClick={() => {
              const nextMode = !darkMode
              setDarkMode(nextMode)
              localStorage.setItem('backboard-signup-theme', nextMode ? 'dark' : 'light')
            }}
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button type="button" onClick={onPreviewDashboard}>
            Preview dashboard <ChevronRight size={15} />
          </button>
        </div>
      </header>

      <main className="signup-layout">
        <section className={`signup-scene signup-scene--${season} signup-scene--${sceneMode}`} aria-label="Interactive Ottawa hockey rink">
          <div className="signup-scene__top">
            <span><i /> Ottawa, Canada</span>
            <span>{season} season // 3D live</span>
          </div>
          <div className="signup-scene__modes" role="group" aria-label="Rink experience">
            <button
              className={sceneMode === 'season' ? 'is-active' : ''}
              type="button"
              onClick={() => setSceneMode('season')}
            >
              Season story
            </button>
            <button
              className={sceneMode === 'play' ? 'is-active' : ''}
              type="button"
              onClick={() => {
                setSceneMode('play')
                if (matchResult) setScore({ player: 0, cpu: 0 })
              }}
            >
              Play the rink
            </button>
          </div>
          {sceneMode === 'season' ? (
            <div className="signup-scene__hero">
              <p>Backboard Ambassador League</p>
              <h2>Build.<br />Ship.<br /><span>Level up.</span></h2>
              <div className="season-indicator" aria-live="polite">
                {seasons.map((item, index) => (
                  <span className={seasonIndex === index ? 'is-active' : ''} key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="rink-play-hud">
              <p>Keyboard rink // First to 3</p>
              <div><strong>{score.player}</strong><span>You</span><i>:</i><span>CPU</span><strong>{score.cpu}</strong></div>
              {matchResult ? (
                <button type="button" onClick={() => setScore({ player: 0, cpu: 0 })}>{matchResult} Play again</button>
              ) : (
                <small>WASD or arrows to move · Space to shoot</small>
              )}
            </div>
          )}
          <div className="signup-scene__ticker" aria-hidden="true">
            <span>Ottawa HQ</span>
            <span>Campus builders</span>
            <span>Season 01</span>
            <span>Build cool stuff</span>
          </div>
          {render3D && (
            <Suspense fallback={<div className="signup-canvas__loading">Preparing the rink…</div>}>
              <OttawaRinkScene
                progress={sceneProgress}
                scored={phase !== 'form'}
                reducedMotion={reducedMotion}
                darkMode={darkMode}
                season={season}
                mode={sceneMode}
                onGoal={(side) =>
                  setScore((current) =>
                    current.player >= 3 || current.cpu >= 3
                      ? current
                      : { ...current, [side]: Math.min(3, current[side] + 1) },
                  )
                }
              />
            </Suspense>
          )}
          <div className="signup-mobile-art" aria-hidden="true">
            <span className="mobile-art__skyline" />
            <span className="mobile-art__rink" />
            <span className="mobile-art__puck" style={{ left: `${13 + sceneProgress * 66}%` }} />
            <span className="mobile-art__goal" />
          </div>
          <div className="signup-scene__power" aria-label="Signup progress">
            <span className={email.length > 0 ? 'is-active' : ''}>Email detected</span>
            <span className={validEmail ? 'is-active' : ''}>Shot ready</span>
            <span className={phase === 'success' ? 'is-active' : ''}>Goal</span>
          </div>
          <div className="signup-scene__caption">
            <div>
              <span>01</span>
              <p>Enter your email</p>
            </div>
            <div>
              <span>02</span>
              <p>Take the combine</p>
            </div>
            <div>
              <span>03</span>
              <p>Join the clubhouse</p>
            </div>
          </div>
        </section>

        <section className="signup-panel">
          <div className="signup-panel__inner">
            {phase !== 'success' ? (
              <>
                <p className="signup-kicker"><Snowflake size={14} /> Backboard Campus Ambassadors</p>
                <h1>Join the <span>lineup.</span></h1>
                <p className="signup-lede">
                  Create your ambassador profile, find your team, and start building things worth sharing.
                </p>

                <form className="signup-form" onSubmit={submit} noValidate>
                  <label htmlFor="ambassador-email">Email address</label>
                  <div className={`email-field ${touched && !validEmail ? 'email-field--error' : ''}`}>
                    <AtSign size={17} aria-hidden="true" />
                    <input
                      id="ambassador-email"
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        if (touched) setTouched(false)
                      }}
                      onBlur={() => setTouched(true)}
                      placeholder="you@university.ca"
                      autoComplete="email"
                      aria-describedby={touched && !validEmail ? 'email-error' : 'signup-email-help'}
                      aria-invalid={touched && !validEmail}
                    />
                    {validEmail && <Check className="email-field__check" size={17} aria-label="Valid email" />}
                  </div>
                  {touched && !validEmail ? (
                    <p className="signup-form__error" id="email-error">Enter a valid email address to continue.</p>
                  ) : (
                    <p className="signup-form__help" id="signup-email-help">Use the email connected to your ambassador application.</p>
                  )}

                  <button className="signup-submit" type="submit" disabled={phase === 'shooting'}>
                    {phase === 'shooting' ? 'Taking the shot…' : 'Continue with email'}
                    <ArrowRight size={17} />
                  </button>
                </form>

                <p className="signup-terms">
                  By continuing, you confirm that you are an accepted Backboard ambassador.
                </p>

                <div className="signup-proof">
                  <span><ShieldCheck size={17} /></span>
                  <div>
                    <strong>Built for the ambassador community</strong>
                    <p>Track work, earn XP, discover missions, and unlock rewards.</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="signup-success" role="status">
                <span className="signup-success__badge"><Trophy size={26} /></span>
                <p className="signup-kicker">Goal confirmed // Account ready</p>
                <h1>You’re on the roster.</h1>
                <p>
                  We accepted <strong>{email}</strong>. The next step is your 60-second Scouting Combine.
                </p>
                <div className="signup-success__next">
                  <span>Next</span>
                  <div><strong>Find your house</strong><small>Four questions. One team reveal.</small></div>
                  <ArrowRight size={17} />
                </div>
                <button className="signup-submit" type="button" onClick={onStartCombine}>
                  Begin the scouting combine <ArrowRight size={17} />
                </button>
                <button
                  className="signup-success__reset"
                  type="button"
                  onClick={() => {
                    setPhase('form')
                    setTouched(false)
                    setEmail('')
                  }}
                >
                  Try another email
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
