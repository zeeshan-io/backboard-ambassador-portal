import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
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
  RotateCcw,
  Send,
  Shield,
  ShoppingBag,
  Sparkles,
  Target,
  Trophy,
  UsersRound,
  X,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './App.css'

type NavItem = {
  label: string
  icon: LucideIcon
}

type CopyState = 'idle' | 'success' | 'error'

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Clubhouse',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Submit work', icon: Send },
      { label: 'Missions', icon: Target },
      { label: 'Calendar', icon: CalendarDays },
      { label: 'Referrals', icon: UsersRound },
      { label: 'Reward locker', icon: ShoppingBag },
    ],
  },
  {
    label: 'Community',
    items: [
      { label: 'Ambassadors', icon: Shield },
      { label: 'Leaderboard', icon: Trophy },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Opportunities', icon: BriefcaseBusiness },
      { label: 'Resources', icon: Library },
    ],
  },
]

const missions = [
  {
    id: 'portal-redesign',
    type: 'Featured quest',
    title: 'Redesign the Ambassador Portal',
    detail: 'Reimagine the experience while keeping every core workflow in play.',
    points: '500 XP',
    due: 'Sep 11',
    progress: 68,
    step: '2 of 3 checkpoints',
  },
  {
    id: 'cli-star',
    type: 'Open source',
    title: 'Star + fork the Backboard CLI',
    detail: 'Explore the project, leave a star, and help the repo reach new builders.',
    points: '25 XP',
    due: 'Anytime',
    progress: 0,
    step: 'Ready to start',
  },
  {
    id: 'linkedin-post',
    type: 'Community',
    title: 'Tell your Backboard story',
    detail: 'Share one useful thing you built or learned with the community.',
    points: '40 XP',
    due: 'Sep 09',
    progress: 0,
    step: 'Ready to start',
  },
]

const standings = [
  { rank: 1, initials: 'PW', name: 'Paul W.', campus: 'Waterloo', xp: '1,480' },
  { rank: 2, initials: 'SS', name: 'Sanika S.', campus: 'McMaster', xp: '1,320' },
  { rank: 3, initials: 'ZA', name: 'You', campus: 'McMaster', xp: '1,180' },
  { rank: 4, initials: 'DZ', name: 'David Z.', campus: 'Wilfrid Laurier', xp: '1,050' },
]

const week = [
  { day: 'M', complete: true },
  { day: 'T', complete: true },
  { day: 'W', complete: true },
  { day: 'T', complete: true },
  { day: 'F', complete: true },
  { day: 'S', complete: false },
  { day: 'S', complete: false },
]

const progressStyle: CSSProperties & { '--progress': string } = {
  '--progress': '68%',
}

function WelcomeIntro({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="intro" role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <div className="intro__scanlines" aria-hidden="true" />
      <button className="intro__skip" type="button" onClick={onDismiss}>
        Skip intro <ChevronRight size={15} aria-hidden="true" />
      </button>

      <div className="intro__content">
        <img
          className="intro__logo"
          src="/backboard-logo-on-dark.png"
          alt="Backboard.io"
        />
        <div className="intro__rink" aria-hidden="true">
          <span className="intro__blue-line intro__blue-line--left" />
          <span className="intro__center-line" />
          <span className="intro__blue-line intro__blue-line--right" />
          <span className="intro__puck" />
          <span className="intro__goal-light" />
        </div>
        <p className="intro__eyebrow">Roster update // Season 01</p>
        <h2 id="intro-title">Ambassador unlocked</h2>
        <p className="intro__message">
          You made the lineup. The next shift starts now.
        </p>
        <button className="button button--light intro__enter" type="button" onClick={onDismiss}>
          Enter the clubhouse
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [introVisible, setIntroVisible] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!introVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }
    const introTimer = window.setTimeout(() => setIntroVisible(false), 4200)
    return () => window.clearTimeout(introTimer)
  }, [introVisible])

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current)
      }
    }
  }, [])

  const announce = (message: string) => {
    setToast(message)
    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current)
    }
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }

  const handleNav = (label: string) => {
    setSidebarOpen(false)
    if (label !== 'Dashboard') {
      announce(`${label} is mapped for the next design pass.`)
    }
  }

  const copyReferral = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard access is unavailable in this browser.')
      }
      await navigator.clipboard.writeText('https://app.backboard.io/signup?ref=3IOFUR7R')
      setCopyState('success')
      announce('Referral link copied — assist incoming.')
    } catch (error) {
      setCopyState('error')
      announce(error instanceof Error ? error.message : 'Could not copy the referral link.')
    }
  }

  return (
    <>
      {introVisible && <WelcomeIntro onDismiss={() => setIntroVisible(false)} />}

      <div className="app-shell">
        {sidebarOpen && (
          <button
            className="sidebar-scrim"
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
          <div className="sidebar__top">
            <img
              className="sidebar__logo"
              src="/backboard-logo-on-dark.png"
              alt="Backboard.io"
            />
            <button
              className="icon-button sidebar__close"
              type="button"
              aria-label="Close navigation"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="program-card">
            <div className="program-card__crest" aria-hidden="true">
              <span>MM</span>
            </div>
            <div>
              <p className="program-card__label">Your campus</p>
              <p className="program-card__name">McMaster</p>
              <span className="program-card__status">
                <span aria-hidden="true" /> Ambassador program
              </span>
            </div>
          </div>

          <nav className="sidebar__nav" aria-label="Primary navigation">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.label}>
                <p className="nav-group__label">{group.label}</p>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const active = item.label === 'Dashboard'
                  return (
                    <button
                      className={`nav-item ${active ? 'nav-item--active' : ''}`}
                      type="button"
                      aria-current={active ? 'page' : undefined}
                      key={item.label}
                      onClick={() => handleNav(item.label)}
                    >
                      <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
                      <span>{item.label}</span>
                      {item.label === 'Missions' && <span className="nav-item__count">3</span>}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          <div className="sidebar__season">
            <div className="sidebar__season-row">
              <span>Season points</span>
              <strong>1,180</strong>
            </div>
            <div className="mini-progress" aria-label="1,180 of 1,500 experience points">
              <span />
            </div>
            <div className="sidebar__season-row sidebar__season-row--muted">
              <span>Builder II</span>
              <span>320 XP to rank up</span>
            </div>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div className="topbar__context">
              <button
                className="icon-button mobile-menu"
                type="button"
                aria-label="Open navigation"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={21} aria-hidden="true" />
              </button>
              <div>
                <p className="topbar__eyebrow">Season 01 / Dashboard</p>
                <p className="topbar__title">Ambassador clubhouse</p>
              </div>
            </div>

            <div className="topbar__actions">
              <span className="prototype-badge">
                <span aria-hidden="true" />
                Concept build · mock data
              </span>
              <button
                className="icon-button replay-button"
                type="button"
                aria-label="Replay welcome intro"
                onClick={() => setIntroVisible(true)}
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
              <button className="icon-button notification-button" type="button" aria-label="Notifications">
                <Bell size={18} aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
              <button className="profile-chip" type="button" onClick={() => announce('Profile view is mapped for the next design pass.')}>
                <span className="profile-chip__avatar">ZA</span>
                <span className="profile-chip__copy">
                  <strong>Ambassador</strong>
                  <small>Builder II</small>
                </span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </header>

          <div className="dashboard">
            <section className="season-hero" aria-labelledby="season-title">
              <div className="season-hero__rink-lines" aria-hidden="true">
                <span className="season-hero__line season-hero__line--blue" />
                <span className="season-hero__line season-hero__line--red" />
                <span className="season-hero__faceoff" />
              </div>

              <div className="season-hero__copy">
                <p className="pixel-label"><Sparkles size={14} aria-hidden="true" /> New shift available</p>
                <h1 id="season-title">Welcome to the lineup.</h1>
                <p className="season-hero__lede">
                  Pick a mission, make something useful, and move the whole community forward.
                </p>
                <div className="season-hero__actions">
                  <button className="button button--primary" type="button" onClick={() => document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' })}>
                    View active missions
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </button>
                  <button className="button button--ghost-dark" type="button" onClick={() => announce('Submission flow is ready for the next screen.')}>
                    <Send size={16} aria-hidden="true" />
                    Submit work
                  </button>
                </div>
              </div>

              <div className="player-card">
                <div className="player-card__header">
                  <div>
                    <p className="player-card__kicker">Current division</p>
                    <p className="player-card__rank">Builder II</p>
                  </div>
                  <span className="player-card__number">#03</span>
                </div>
                <div className="player-card__progress">
                  <div className="progress-ring" style={progressStyle}>
                    <span>68%</span>
                  </div>
                  <div>
                    <strong>1,180 <small>XP</small></strong>
                    <p>320 XP until Captain</p>
                  </div>
                </div>
                <div className="player-card__stats">
                  <span><Flame size={15} aria-hidden="true" /> 7 day streak</span>
                  <span><UsersRound size={15} aria-hidden="true" /> 4 assists</span>
                </div>
              </div>
            </section>

            <section className="dashboard-grid" aria-label="Season overview">
              <div className="panel mission-panel" id="missions">
                <div className="section-heading">
                  <div>
                    <p className="section-heading__kicker">Your next shift</p>
                    <h2>Active missions</h2>
                  </div>
                  <button className="text-link" type="button" onClick={() => handleNav('Missions')}>
                    All missions <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>

                <div className="mission-list">
                  {missions.map((mission, index) => (
                    <article className={`mission ${index === 0 ? 'mission--featured' : ''}`} key={mission.id}>
                      <div className="mission__index" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="mission__body">
                        <div className="mission__meta">
                          <span>{mission.type}</span>
                          <span><Clock3 size={13} aria-hidden="true" /> {mission.due}</span>
                        </div>
                        <h3>{mission.title}</h3>
                        <p>{mission.detail}</p>
                        <div className="mission__progress-row">
                          <div className="mission__progress" aria-label={`${mission.progress}% complete`}>
                            <span style={{ width: `${mission.progress}%` }} />
                          </div>
                          <span>{mission.step}</span>
                        </div>
                      </div>
                      <div className="mission__reward">
                        <span>{mission.points}</span>
                        <button
                          className="mission__open"
                          type="button"
                          aria-label={`Open ${mission.title}`}
                          onClick={() => announce(`${mission.title} opened in prototype mode.`)}
                        >
                          <ArrowUpRight size={18} aria-hidden="true" />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="panel streak-panel">
                <div className="streak-panel__icon" aria-hidden="true">
                  <Flame size={22} />
                </div>
                <p className="section-heading__kicker">Momentum meter</p>
                <h2>Seven-day hot streak</h2>
                <p className="streak-panel__copy">
                  One meaningful action each day keeps your season multiplier alive.
                </p>

                <div className="streak-week" aria-label="Five of seven days completed">
                  {week.map((day, index) => (
                    <div className="streak-day" key={`${day.day}-${index}`}>
                      <span className={day.complete ? 'streak-day__mark streak-day__mark--complete' : 'streak-day__mark'}>
                        {day.complete ? <Check size={15} aria-hidden="true" /> : index + 1}
                      </span>
                      <small>{day.day}</small>
                    </div>
                  ))}
                </div>

                <div className="streak-panel__action">
                  <Zap size={18} aria-hidden="true" />
                  <div>
                    <strong>Keep it alive</strong>
                    <span>Submit one update before midnight.</span>
                  </div>
                  <button type="button" aria-label="Submit an update" onClick={() => announce('Quick update flow is ready for the next design pass.')}>
                    <ChevronRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </aside>
            </section>

            <section className="lower-grid" aria-label="Community and rewards">
              <div className="panel standings-panel">
                <div className="section-heading">
                  <div>
                    <p className="section-heading__kicker">Community standings</p>
                    <h2>Top of the table</h2>
                  </div>
                  <span className="live-chip"><span aria-hidden="true" /> Live</span>
                </div>

                <div className="standings-table" role="table" aria-label="Ambassador standings">
                  <div className="standings-table__head" role="row">
                    <span role="columnheader">Rank</span>
                    <span role="columnheader">Ambassador</span>
                    <span role="columnheader">Campus</span>
                    <span role="columnheader">XP</span>
                  </div>
                  {standings.map((person) => (
                    <div className={`standings-row ${person.name === 'You' ? 'standings-row--you' : ''}`} role="row" key={person.rank}>
                      <span className="standings-row__rank" role="cell">{String(person.rank).padStart(2, '0')}</span>
                      <span className="standings-row__person" role="cell">
                        <span className="standings-row__avatar">{person.initials}</span>
                        <strong>{person.name}</strong>
                      </span>
                      <span className="standings-row__campus" role="cell">{person.campus}</span>
                      <strong className="standings-row__xp" role="cell">{person.xp}</strong>
                    </div>
                  ))}
                </div>
                <button className="panel-footer-link" type="button" onClick={() => handleNav('Leaderboard')}>
                  View full leaderboard <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </div>

              <div className="side-stack">
                <article className="panel event-card">
                  <div className="event-card__date" aria-hidden="true">
                    <span>SEP</span>
                    <strong>04</strong>
                  </div>
                  <div className="event-card__body">
                    <p className="section-heading__kicker">Next team event</p>
                    <h2>Builder power hour</h2>
                    <p><Clock3 size={14} aria-hidden="true" /> 6:30 PM – 7:30 PM EDT</p>
                    <p><MapPin size={14} aria-hidden="true" /> Community Discord</p>
                  </div>
                  <button type="button" aria-label="Open Builder power hour" onClick={() => announce('Event details opened in prototype mode.')}>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </button>
                </article>

                <article className="panel reward-card">
                  <div className="reward-card__visual" aria-hidden="true">
                    <div className="pixel-jersey">
                      <span className="pixel-jersey__logo">B</span>
                    </div>
                    <span className="reward-card__lock"><LockKeyhole size={13} /> Locked</span>
                  </div>
                  <div className="reward-card__copy">
                    <p className="section-heading__kicker">Next locker unlock</p>
                    <h2>Backboard team jersey</h2>
                    <p>Reach Captain division to add it to your locker.</p>
                    <div className="reward-progress">
                      <span />
                    </div>
                    <small>320 XP remaining</small>
                  </div>
                </article>
              </div>
            </section>

            <section className="referral-strip" aria-labelledby="referral-title">
              <div className="referral-strip__icon" aria-hidden="true">
                <ClipboardCheck size={22} />
              </div>
              <div className="referral-strip__copy">
                <p className="section-heading__kicker">Referral assists</p>
                <h2 id="referral-title">Bring the next builder onto the ice.</h2>
                <p>Four successful invites this season. One more unlocks a 100 XP team bonus.</p>
              </div>
              <div className="assist-pips" aria-label="Four of five referrals complete">
                {[1, 2, 3, 4, 5].map((item) => (
                  <span className={item < 5 ? 'assist-pips__pip assist-pips__pip--filled' : 'assist-pips__pip'} key={item}>
                    {item < 5 ? <Check size={13} aria-hidden="true" /> : item}
                  </span>
                ))}
              </div>
              <button className={`button button--referral ${copyState === 'error' ? 'button--error' : ''}`} type="button" onClick={copyReferral}>
                {copyState === 'success' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                {copyState === 'success' ? 'Link copied' : copyState === 'error' ? 'Try again' : 'Copy referral link'}
              </button>
            </section>

            <footer className="dashboard-footer">
              <span>Backboard Ambassador Portal · Concept 01</span>
              <span>Build cool stuff. Help others do the same.</span>
            </footer>
          </div>
        </main>
      </div>

      {toast && (
        <div className="toast" role="status">
          <Activity size={17} aria-hidden="true" />
          <span>{toast}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}>
            <X size={15} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  )
}

export default App
