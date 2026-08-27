import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  Bird,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Copy,
  Flame,
  LayoutDashboard,
  Library,
  LockKeyhole,
  MapPin,
  Menu,
  Mountain,
  RotateCcw,
  Send,
  Shield,
  ShoppingBag,
  Sparkles,
  Target,
  Trees,
  Trophy,
  UsersRound,
  Waves,
  X,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './App.css'

type HouseId = 'rideau' | 'atlantic' | 'redwood' | 'hudson'
type DraftPhase = 'idle' | 'shuffling' | 'revealed'
type CopyState = 'idle' | 'success' | 'error'

type House = {
  id: HouseId
  name: string
  members: string
  location: string
  specialty: string
  motto: string
  color: string
  soft: string
  ink: string
  icon: LucideIcon
}

const houses: House[] = [
  {
    id: 'rideau',
    name: 'Rideau Ravens',
    members: 'Ravens',
    location: 'Ottawa, Canada',
    specialty: 'Playmakers',
    motto: 'See the lane before it opens.',
    color: '#6557e8',
    soft: '#e8e4ff',
    ink: '#20185e',
    icon: Bird,
  },
  {
    id: 'atlantic',
    name: 'Atlantic Puffins',
    members: 'Puffins',
    location: 'Atlantic Canada',
    specialty: 'Snipers',
    motto: 'Pick the moment. Hit the mark.',
    color: '#ff6f61',
    soft: '#ffe2dc',
    ink: '#6d201d',
    icon: Waves,
  },
  {
    id: 'redwood',
    name: 'Redwood Foxes',
    members: 'Foxes',
    location: 'Silicon Valley, USA',
    specialty: 'Defenders',
    motto: 'Stay sharp. Protect the work.',
    color: '#2aaf7a',
    soft: '#d9f5e8',
    ink: '#10573e',
    icon: Trees,
  },
  {
    id: 'hudson',
    name: 'Hudson Hawks',
    members: 'Hawks',
    location: 'New York, USA',
    specialty: 'Finishers',
    motto: 'Take the shot. Finish strong.',
    color: '#f1ad1b',
    soft: '#fff0bf',
    ink: '#614008',
    icon: Mountain,
  },
]

const navGroups: { label: string; items: { label: string; icon: LucideIcon }[] }[] = [
  {
    label: 'Clubhouse',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Submit work', icon: Send },
      { label: 'Missions', icon: Target },
      { label: 'Calendar', icon: CalendarDays },
      { label: 'Referrals', icon: UsersRound },
      { label: 'Reward shop', icon: ShoppingBag },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Ambassadors', icon: Shield },
      { label: 'Club standings', icon: Trophy },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Opportunities', icon: Zap },
      { label: 'Resources', icon: Library },
    ],
  },
]

const missions = [
  {
    number: '01',
    type: 'Featured quest',
    title: 'Redesign the Ambassador Portal',
    detail: 'Turn the clubhouse into a place ambassadors want to return to.',
    points: 500,
    due: 'Sep 11',
    color: 'purple',
    progress: 68,
  },
  {
    number: '02',
    type: 'Open source',
    title: 'Star + fork the Backboard CLI',
    detail: 'Explore the project and help more builders discover it.',
    points: 25,
    due: 'Anytime',
    color: 'green',
    progress: 0,
  },
  {
    number: '03',
    type: 'Community',
    title: 'Tell your Backboard story',
    detail: 'Share one useful thing you built or learned.',
    points: 40,
    due: 'Sep 09',
    color: 'coral',
    progress: 0,
  },
]

const clubScores: Record<HouseId, number> = {
  rideau: 8420,
  atlantic: 7910,
  redwood: 7640,
  hudson: 7180,
}

const clubWidths: Record<HouseId, string> = {
  rideau: '94%',
  atlantic: '86%',
  redwood: '80%',
  hudson: '72%',
}

function HouseCrest({ house, size = 'medium' }: { house: House; size?: 'small' | 'medium' | 'large' }) {
  const Icon = house.icon
  return (
    <span
      className={`house-crest house-crest--${size}`}
      style={{ '--crest-color': house.color } as CSSProperties}
      aria-hidden="true"
    >
      <Icon strokeWidth={2.2} />
      <span>{house.members.slice(0, 2).toUpperCase()}</span>
    </span>
  )
}

function DraftCeremony({
  assignedHouse,
  onAssign,
  onClose,
}: {
  assignedHouse: House | null
  onAssign: (house: House) => void
  onClose: () => void
}) {
  const [phase, setPhase] = useState<DraftPhase>('idle')
  const [activeIndex, setActiveIndex] = useState(
    assignedHouse ? houses.findIndex((house) => house.id === assignedHouse.id) : 0,
  )
  const timerRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)
  const selectedHouse = houses[activeIndex]

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    }
  }, [])

  const beginDraft = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finalIndex = Math.floor(Math.random() * houses.length)

    if (reducedMotion) {
      setActiveIndex(finalIndex)
      setPhase('revealed')
      return
    }

    setPhase('shuffling')
    let steps = 0
    intervalRef.current = window.setInterval(() => {
      steps += 1
      setActiveIndex((current) => (current + 1) % houses.length)
      if (steps >= 17 && intervalRef.current !== null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
        setActiveIndex(finalIndex)
      }
    }, 105)

    timerRef.current = window.setTimeout(() => {
      setPhase('revealed')
      timerRef.current = null
    }, 2050)
  }

  return (
    <div className="draft" role="dialog" aria-modal="true" aria-labelledby="draft-title">
      <div className="draft__topline">
        <img src="/backboard-logo-dark.png" alt="Backboard.io" />
        <span>International ambassador draft · Concept</span>
      </div>

      <div className="draft__board">
        <section className="draft__copy">
          <p className="eyebrow"><Sparkles size={14} /> Season 01 onboarding</p>
          <h2 id="draft-title">
            {phase === 'revealed' ? `You're a ${selectedHouse.members.slice(0, -1)}.` : 'Find your line.'}
          </h2>
          <p>
            {phase === 'revealed'
              ? `${selectedHouse.name} is your crew for team quests, club points, and friendly competition.`
              : 'Four clubs. One shared mission. Let the draft match you with a crew for the season.'}
          </p>

          <div className="draft__actions">
            {phase === 'idle' && (
              <button className="button button--ink" type="button" onClick={beginDraft}>
                Draft my club <Zap size={17} />
              </button>
            )}
            {phase === 'shuffling' && (
              <button className="button button--ink" type="button" disabled>
                Scouting the league…
              </button>
            )}
            {phase === 'revealed' && (
              <>
                <button className="button button--ink" type="button" onClick={() => onAssign(selectedHouse)}>
                  Join {selectedHouse.members} <ArrowUpRight size={17} />
                </button>
                <button className="button button--paper" type="button" onClick={beginDraft}>
                  Spin again <RotateCcw size={16} />
                </button>
              </>
            )}
            <button className="draft__skip" type="button" onClick={onClose}>
              {assignedHouse ? 'Keep my current club' : 'Explore before drafting'}
            </button>
          </div>
        </section>

        <section
          className={`draft-machine draft-machine--${phase}`}
          style={
            {
              '--active-color': selectedHouse.color,
              '--active-soft': selectedHouse.soft,
              '--active-ink': selectedHouse.ink,
            } as CSSProperties
          }
          aria-live="polite"
        >
          <div className="draft-machine__lights" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>
          <div className="draft-machine__screen">
            <span className="draft-machine__status">
              {phase === 'idle' ? 'Ready' : phase === 'shuffling' ? 'Drafting' : 'Match found'}
            </span>
            <HouseCrest house={selectedHouse} size="large" />
            <p className="draft-machine__name">{selectedHouse.name}</p>
            <p className="draft-machine__specialty">{selectedHouse.specialty}</p>
          </div>
          <div className="draft-machine__puck" aria-hidden="true">B</div>
        </section>
      </div>

      <div className="draft__clubs" aria-label="Available ambassador clubs">
        {houses.map((house, index) => (
          <article
            className={`draft-club ${index === activeIndex ? 'draft-club--active' : ''}`}
            style={{ '--club-color': house.color, '--club-soft': house.soft } as CSSProperties}
            key={house.id}
          >
            <HouseCrest house={house} size="small" />
            <div>
              <strong>{house.name}</strong>
              <span>{house.location}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [toast, setToast] = useState<string | null>(null)
  const [assignedHouse, setAssignedHouse] = useState<House | null>(() => {
    const savedHouse = localStorage.getItem('backboard-club-v1')
    return houses.find((house) => house.id === savedHouse) ?? null
  })
  const [draftOpen, setDraftOpen] = useState(() => {
    const hasHouse = houses.some((house) => house.id === localStorage.getItem('backboard-club-v1'))
    return !hasHouse && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
  const toastTimer = useRef<number | null>(null)
  const activeHouse = assignedHouse ?? houses[0]

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!draftOpen) return

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [draftOpen])

  const announce = (message: string) => {
    setToast(message)
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3000)
  }

  const handleAssign = (house: House) => {
    localStorage.setItem('backboard-club-v1', house.id)
    setAssignedHouse(house)
    setDraftOpen(false)
    announce(`Welcome to ${house.name}. Your season starts now.`)
  }

  const handleNav = (label: string) => {
    setSidebarOpen(false)
    if (label !== 'Dashboard') announce(`${label} is queued for the next screen design.`)
  }

  const copyReferral = async () => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard access is unavailable.')
      await navigator.clipboard.writeText('https://app.backboard.io/signup?ref=3IOFUR7R')
      setCopyState('success')
      announce('Referral link copied.')
    } catch (error) {
      setCopyState('error')
      announce(error instanceof Error ? error.message : 'Could not copy the referral link.')
    }
  }

  const appStyle = {
    '--house-color': activeHouse.color,
    '--house-soft': activeHouse.soft,
    '--house-ink': activeHouse.ink,
  } as CSSProperties

  return (
    <div className="app" style={appStyle}>
      {draftOpen && (
        <DraftCeremony assignedHouse={assignedHouse} onAssign={handleAssign} onClose={() => setDraftOpen(false)} />
      )}

      {sidebarOpen && <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__brand">
          <img src="/backboard-logo-dark.png" alt="Backboard.io" />
          <button className="icon-button sidebar__close" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}>
            <X size={19} />
          </button>
        </div>

        <div className="season-stamp">
          <span>Campus ambassadors</span>
          <strong>Season 01</strong>
          <small>2026 / 2027</small>
        </div>

        <nav className="sidebar__nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const Icon = item.icon
                const active = item.label === 'Dashboard'
                return (
                  <button className={`nav-item ${active ? 'nav-item--active' : ''}`} type="button" aria-current={active ? 'page' : undefined} key={item.label} onClick={() => handleNav(item.label)}>
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.label}</span>
                    {item.label === 'Missions' && <b>3</b>}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <button className="sidebar-house" type="button" onClick={() => setDraftOpen(true)}>
          <HouseCrest house={activeHouse} size="small" />
          <span>
            <small>{assignedHouse ? 'Your club' : 'Draft pending'}</small>
            <strong>{assignedHouse ? activeHouse.name : 'Find your club'}</strong>
          </span>
          <ChevronRight size={17} />
        </button>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar__context">
            <button className="icon-button mobile-menu" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <div>
              <p>Ambassador clubhouse</p>
              <span>Dashboard / Season 01</span>
            </div>
          </div>
          <div className="topbar__actions">
            <span className="concept-chip"><i /> Concept data</span>
            <button className="draft-again" type="button" onClick={() => setDraftOpen(true)}>
              <RotateCcw size={15} /> {assignedHouse ? 'Revisit draft' : 'Join a club'}
            </button>
            <button className="icon-button notification-button" type="button" aria-label="Notifications">
              <Bell size={18} /><i />
            </button>
            <button className="profile-button" type="button" onClick={() => announce('Profile screen is queued for the next design pass.')}>
              <span>ZA</span><strong>Builder II</strong><ChevronRight size={15} />
            </button>
          </div>
        </header>

        <div className="dashboard">
          <section className="welcome-board" aria-labelledby="welcome-title">
            <div className="welcome-board__copy">
              <p className="eyebrow"><Sparkles size={14} /> Thursday, August 27</p>
              <h1 id="welcome-title">Make your next shift count.</h1>
              <p>Three new ways to build, share, and move your club up the table.</p>
              <div className="welcome-board__actions">
                <button className="button button--ink" type="button" onClick={() => document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' })}>
                  Pick a mission <ArrowUpRight size={17} />
                </button>
                <button className="button button--paper" type="button" onClick={() => announce('Submission flow is queued for the next screen.')}>
                  <Send size={16} /> Submit work
                </button>
              </div>
            </div>

            <div className="welcome-board__poster">
              <div className="poster-tape poster-tape--top" aria-hidden="true" />
              <div className="poster-tape poster-tape--bottom" aria-hidden="true" />
              <HouseCrest house={activeHouse} size="large" />
              <p>{assignedHouse ? 'You were drafted to' : 'Club preview'}</p>
              <h2>{activeHouse.name}</h2>
              <span>{activeHouse.specialty} · {activeHouse.location}</span>
              <blockquote>“{activeHouse.motto}”</blockquote>
              {!assignedHouse && <button type="button" onClick={() => setDraftOpen(true)}>Run the draft</button>}
            </div>
          </section>

          <section className="stat-row" aria-label="Season snapshot">
            <StatCard className="blue" icon={Zap} label="Season XP" value="1,180" unit="XP" note="320 to level up" />
            <StatCard className="yellow" icon={Flame} label="Current streak" value="7" unit="days" note="Personal best" />
            <StatCard className="green" icon={UsersRound} label="Referral assists" value="4" unit="people" note="1 to team bonus" />
            <StatCard className="coral" icon={Trophy} label="Club position" value="#1" unit="of 4" note={`${activeHouse.members} lead`} />
          </section>

          <section className="content-grid">
            <div className="panel mission-panel" id="missions">
              <SectionHeading eyebrow="Your quest log" title="Active missions" action={() => handleNav('Missions')} />
              <div className="mission-list">
                {missions.map((mission) => (
                  <article className="mission" key={mission.number}>
                    <span className={`mission__number mission__number--${mission.color}`}>{mission.number}</span>
                    <div className="mission__copy">
                      <div className="mission__meta">
                        <span>{mission.type}</span>
                        <span><Clock3 size={12} /> {mission.due}</span>
                      </div>
                      <h3>{mission.title}</h3>
                      <p>{mission.detail}</p>
                      <div className="mission__progress" aria-label={`${mission.progress}% complete`}>
                        <span style={{ width: `${mission.progress}%` }} />
                      </div>
                    </div>
                    <div className="mission__reward">
                      <strong>+{mission.points} XP</strong>
                      <button type="button" aria-label={`Open ${mission.title}`} onClick={() => announce(`${mission.title} opened in concept mode.`)}>
                        <ArrowUpRight size={17} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="panel clubs-panel">
              <div className="section-heading">
                <div><p className="eyebrow">Club championship</p><h2>House standings</h2></div>
                <span className="live-tag"><i /> Live</span>
              </div>
              <p className="clubs-panel__intro">Every approved contribution adds points to the whole club.</p>
              <div className="club-table">
                {[...houses].sort((a, b) => clubScores[b.id] - clubScores[a.id]).map((house, index) => (
                  <article className={`club-row ${assignedHouse?.id === house.id ? 'club-row--current' : ''}`} key={house.id}>
                    <span className="club-row__rank">{index + 1}</span>
                    <HouseCrest house={house} size="small" />
                    <div className="club-row__copy">
                      <strong>{house.name}</strong>
                      <div className="club-row__bar"><span style={{ width: clubWidths[house.id], background: house.color }} /></div>
                    </div>
                    <span className="club-row__score">{clubScores[house.id].toLocaleString()}</span>
                  </article>
                ))}
              </div>
              <button className="panel-button" type="button" onClick={() => handleNav('Club standings')}>
                Open club championship <ChevronRight size={16} />
              </button>
            </aside>
          </section>

          <section className="lower-grid">
            <article className="event-card">
              <div className="event-card__date"><span>SEP</span><strong>04</strong></div>
              <div className="event-card__copy">
                <p className="eyebrow">Next team event</p>
                <h2>Builder power hour</h2>
                <span><Clock3 size={14} /> 6:30 PM – 7:30 PM EDT</span>
                <span><MapPin size={14} /> Community Discord</span>
              </div>
              <button type="button" aria-label="Open event" onClick={() => announce('Event details opened in concept mode.')}><ArrowUpRight size={18} /></button>
            </article>

            <article className="reward-card">
              <div className="jersey" aria-hidden="true"><span>B</span></div>
              <div className="reward-card__copy">
                <p className="eyebrow">Next shop unlock</p>
                <h2>Backboard team jersey</h2>
                <p>Reach Captain division to unlock this reward.</p>
                <div className="reward-card__progress"><span /></div>
                <small><LockKeyhole size={12} /> 320 XP remaining</small>
              </div>
            </article>

            <article className="referral-card">
              <span className="referral-card__icon"><ClipboardCheck size={22} /></span>
              <div className="referral-card__copy">
                <p className="eyebrow">Referral assists</p>
                <h2>Bring a builder onto the ice.</h2>
                <p>One more verified invite unlocks a club bonus.</p>
              </div>
              <div className="referral-pips" aria-label="Four of five referrals complete">
                {[1, 2, 3, 4, 5].map((step) => <span className={step < 5 ? 'referral-pips__done' : ''} key={step}>{step < 5 ? <Check size={13} /> : step}</span>)}
              </div>
              <button className={`button button--ink ${copyState === 'error' ? 'button--error' : ''}`} type="button" onClick={copyReferral}>
                {copyState === 'success' ? <Check size={16} /> : <Copy size={16} />}
                {copyState === 'success' ? 'Link copied' : copyState === 'error' ? 'Try again' : 'Copy link'}
              </button>
            </article>
          </section>

          <footer className="footer">
            <span>Backboard Ambassador Portal · House Edition</span>
            <span>Build cool stuff. Bring your club with you.</span>
          </footer>
        </div>
      </main>

      {toast && (
        <div className="toast" role="status">
          <Activity size={17} /><span>{toast}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}><X size={15} /></button>
        </div>
      )}
    </div>
  )
}

function StatCard({ className, icon: Icon, label, value, unit, note }: { className: string; icon: LucideIcon; label: string; value: string; unit: string; note: string }) {
  return (
    <article className={`stat-card stat-card--${className}`}>
      <span className="stat-card__icon"><Icon size={19} /></span>
      <div><p>{label}</p><strong>{value} <small>{unit}</small></strong></div>
      <span className="stat-card__note">{note}</span>
    </article>
  )
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action: () => void }) {
  return (
    <div className="section-heading">
      <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      <button className="text-link" type="button" onClick={action}>See everything <ArrowUpRight size={15} /></button>
    </div>
  )
}

export default App
