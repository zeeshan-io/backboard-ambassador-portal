import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Copy,
  Gift,
  LayoutDashboard,
  Menu,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Target,
  Trophy,
  UsersRound,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PixelIcon } from './PixelIcon'
import './App.css'

type CopyState = 'idle' | 'success' | 'error'

type NavItem = {
  label: string
  icon: LucideIcon
}

const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: 'Program',
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
      { label: 'Ambassadors', icon: UsersRound },
      { label: 'Leaderboard', icon: Trophy },
    ],
  },
  {
    label: 'Library',
    items: [
      { label: 'Opportunities', icon: BriefcaseBusiness },
      { label: 'Resources', icon: BookOpen },
    ],
  },
]

const missions = [
  {
    number: '01',
    type: 'Featured quest',
    title: 'Redesign the Ambassador Portal',
    description: 'Reimagine the portal while preserving every core ambassador workflow.',
    due: 'Sep 11',
    points: 500,
    progress: 68,
    tone: 'blue',
  },
  {
    number: '02',
    type: 'Open source',
    title: 'Star + fork the Backboard CLI',
    description: 'Explore the repository and help more builders discover the project.',
    due: 'Anytime',
    points: 25,
    progress: 0,
    tone: 'green',
  },
  {
    number: '03',
    type: 'Community',
    title: 'Share your Backboard build',
    description: 'Post one useful thing you built or learned with the community.',
    due: 'Sep 09',
    points: 40,
    progress: 0,
    tone: 'coral',
  },
]

const submissions = [
  { title: 'CLI walkthrough', type: 'Educational content', date: 'Aug 26', status: 'Approved', points: '+150 XP' },
  { title: 'Campus builder meetup', type: 'Event', date: 'Aug 22', status: 'In review', points: '+250 XP' },
  { title: 'Backboard launch post', type: 'Awareness', date: 'Aug 19', status: 'Approved', points: '+50 XP' },
]

async function copyText(text: string) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Local previews can expose the API while denying clipboard permission.
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  textarea.remove()

  if (!copied) throw new Error('Clipboard permission was denied.')
}

function FireSprite({ size = 30 }: { size?: number }) {
  return (
    <svg
      className="fire-sprite"
      width={size}
      height={size}
      viewBox="0 0 12 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <g fill="#ff5a45">
        <rect x="5" y="0" width="2" height="2" />
        <rect x="3" y="2" width="4" height="3" />
        <rect x="7" y="3" width="2" height="4" />
        <rect x="1" y="5" width="9" height="7" />
        <rect x="2" y="12" width="7" height="2" />
        <rect x="4" y="14" width="4" height="2" />
      </g>
      <g fill="#ffd438">
        <rect x="5" y="4" width="2" height="3" />
        <rect x="3" y="7" width="5" height="4" />
        <rect x="4" y="11" width="3" height="3" />
      </g>
      <rect x="5" y="9" width="2" height="4" fill="#fff5c7" />
    </svg>
  )
}

function WelcomeIntro({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="intro" role="dialog" aria-modal="true" aria-labelledby="intro-title">
      <button className="intro__skip" type="button" onClick={onDismiss}>
        Skip intro <ChevronRight size={15} />
      </button>
      <div className="intro__content">
        <img src="/backboard-logo-on-dark.png" alt="Backboard.io" />
        <div className="intro-rink" aria-hidden="true">
          <span className="intro-rink__blue" />
          <span className="intro-rink__red" />
          <span className="intro-rink__goal" />
          <span className="intro-rink__puck"><PixelIcon name="puck" size={20} /></span>
        </div>
        <p>Roster update // Season 01</p>
        <h2 id="intro-title">Ambassador unlocked</h2>
        <span>You made the lineup. Your next shift starts now.</span>
        <button className="intro__enter" type="button" onClick={onDismiss}>
          Enter the clubhouse <ArrowRight size={16} />
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
  const [toast, setToast] = useState<string | null>(null)
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!introVisible || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setIntroVisible(false), 3900)
    return () => window.clearTimeout(timer)
  }, [introVisible])

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    }
  }, [])

  const announce = (message: string) => {
    setToast(message)
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3000)
  }

  const handleNav = (label: string) => {
    setSidebarOpen(false)
    if (label !== 'Dashboard') announce(`${label} is mapped for the next screen.`)
  }

  const copyReferral = async () => {
    try {
      await copyText('https://app.backboard.io/signup?ref=3IOFUR7R')
      setCopyState('success')
      announce('Referral link copied. Assist incoming!')
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
          <button className="sidebar-scrim" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />
        )}

        <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
          <div className="sidebar__brand">
            <img src="/backboard-logo-dark.png" alt="Backboard.io" />
            <button className="icon-button sidebar__close" type="button" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}>
              <X size={19} />
            </button>
          </div>

          <div className="program-card">
            <span className="program-card__mark">MM</span>
            <div>
              <small>Your campus</small>
              <strong>McMaster</strong>
              <p><i /> Ambassador program</p>
            </div>
          </div>

          <nav className="sidebar__nav" aria-label="Primary navigation">
            {navGroups.map((group) => (
              <div className="nav-group" key={group.label}>
                <p>{group.label}</p>
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
                      <Icon size={17} strokeWidth={1.8} />
                      <span>{item.label}</span>
                      {item.label === 'Missions' && <b>3</b>}
                    </button>
                  )
                })}
              </div>
            ))}
          </nav>

          <div className="sidebar__progress">
            <div><span>Season XP</span><strong>1,180</strong></div>
            <div className="sidebar__bar"><span /></div>
            <small>Builder II · 320 XP to Captain</small>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div className="topbar__left">
              <button className="icon-button mobile-menu" type="button" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} />
              </button>
              <div>
                <p>Season 01 / Dashboard</p>
                <strong>Ambassador clubhouse</strong>
              </div>
            </div>

            <div className="topbar__actions">
              <button className="search-button" type="button" onClick={() => announce('Search is ready for the next design pass.')}>
                <Search size={16} /><span>Search</span><kbd>/</kbd>
              </button>
              <button className="icon-button replay-button" type="button" aria-label="Replay hockey welcome" onClick={() => setIntroVisible(true)}>
                <PixelIcon name="puck" size={17} />
              </button>
              <button className="icon-button notification" type="button" aria-label="Notifications">
                <Bell size={18} /><i />
              </button>
              <button className="profile-button" type="button" onClick={() => announce('Profile is mapped for the next screen.')}>
                <span>ZA</span>
                <div><strong>Builder II</strong><small>1,180 XP</small></div>
                <ChevronRight size={15} />
              </button>
            </div>
          </header>

          <div className="dashboard">
            <section className="page-heading">
              <div>
                <p><Sparkles size={14} /> Thursday, August 27</p>
                <h1>Good morning, Zain.</h1>
                <span>You have three active missions and one submission waiting for review.</span>
              </div>
              <div className="page-heading__actions">
                <button className="button button--secondary" type="button" onClick={() => document.getElementById('missions')?.scrollIntoView({ behavior: 'smooth' })}>
                  View missions
                </button>
                <button className="button button--primary" type="button" onClick={() => announce('Submission flow is ready for the next screen.')}>
                  <Send size={16} /> Submit work
                </button>
              </div>
            </section>

            <section className="overview-grid" aria-label="Ambassador overview">
              <article className="stat-card stat-card--xp">
                <div className="stat-card__heading"><span><PixelIcon name="coin" size={18} /></span><p>Season XP</p></div>
                <strong>1,180 <small>XP</small></strong>
                <div className="stat-card__progress"><span /></div>
                <small>320 XP until Captain</small>
              </article>
              <article className="stat-card stat-card--streak">
                <div className="stat-card__heading"><span><FireSprite size={23} /></span><p>Current streak</p></div>
                <strong>7 <small>days</small></strong>
                <div className="streak-days">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <i className={index < 5 ? 'is-done' : ''} key={`${day}-${index}`}>{day}</i>)}
                </div>
                <small>One action today keeps it alive</small>
              </article>
              <article className="stat-card">
                <div className="stat-card__heading"><span><ClipboardCheck size={18} /></span><p>Approved work</p></div>
                <strong>12 <small>total</small></strong>
                <div className="stat-card__delta">+3 this month</div>
                <small>Across content, events, and builds</small>
              </article>
              <article className="stat-card">
                <div className="stat-card__heading"><span><Trophy size={18} /></span><p>Campus rank</p></div>
                <strong>#3 <small>McMaster</small></strong>
                <div className="stat-card__delta">↑ 2 places</div>
                <small>Top 18% of ambassadors</small>
              </article>
            </section>

            <section className="primary-grid">
              <div className="panel missions-panel" id="missions">
                <SectionHeading eyebrow="Your next shift" title="Active missions" actionLabel="All missions" onAction={() => handleNav('Missions')} />
                <div className="mission-list">
                  {missions.map((mission) => (
                    <article className="mission" key={mission.number}>
                      <span className={`mission__number mission__number--${mission.tone}`}>{mission.number}</span>
                      <div className="mission__copy">
                        <div><span>{mission.type}</span><span><Clock3 size={12} /> {mission.due}</span></div>
                        <h3>{mission.title}</h3>
                        <p>{mission.description}</p>
                        <div className="mission__progress"><span style={{ width: `${mission.progress}%` }} /></div>
                      </div>
                      <div className="mission__reward">
                        <strong>+{mission.points} XP</strong>
                        <button type="button" aria-label={`Open ${mission.title}`} onClick={() => announce(`${mission.title} opened in concept mode.`)}>
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="panel progress-panel">
                <div className="progress-panel__header">
                  <div><p>Season progress</p><h2>Builder II</h2></div>
                  <span>Level 08</span>
                </div>
                <div className="rank-track">
                  <div><strong>1,180 XP</strong><span>1,500 XP</span></div>
                  <div><span /></div>
                </div>
                <div className="weekly-goals">
                  <p>Weekly goals</p>
                  <Goal label="Submit one contribution" complete />
                  <Goal label="Join one community event" complete />
                  <Goal label="Make one referral assist" />
                </div>
                <div className="next-unlock">
                  <span><Gift size={21} /></span>
                  <div><small>Next unlock</small><strong>Sticker supply drop</strong></div>
                  <PixelIcon name="lock" size={14} />
                </div>
              </aside>
            </section>

            <section className="secondary-grid">
              <div className="panel submissions-panel">
                <SectionHeading eyebrow="Work tracker" title="Recent submissions" actionLabel="View all work" onAction={() => handleNav('Submit work')} />
                <div className="submission-list">
                  {submissions.map((submission) => (
                    <article className="submission" key={submission.title}>
                      <span className={`submission__icon ${submission.status === 'Approved' ? 'is-approved' : ''}`}>
                        {submission.status === 'Approved' ? <Check size={15} /> : <Clock3 size={15} />}
                      </span>
                      <div><strong>{submission.title}</strong><small>{submission.type}</small></div>
                      <time>{submission.date}</time>
                      <span className={submission.status === 'Approved' ? 'is-approved' : ''}>{submission.status}</span>
                      <strong>{submission.points}</strong>
                    </article>
                  ))}
                </div>
              </div>

              <RideauChallenge onPlay={() => announce('Rideau Sprint is queued as the next interactive prototype.')} />
            </section>

            <section className="support-grid">
              <article className="support-card event-card">
                <span className="support-card__icon"><CalendarDays size={21} /></span>
                <div><p>Next event · Sep 04</p><h2>Builder power hour</h2><span>6:30 PM EDT · Community Discord</span></div>
                <button type="button" aria-label="Open event" onClick={() => announce('Event details opened in concept mode.')}><ChevronRight size={17} /></button>
              </article>

              <article className="support-card referral-card">
                <span className="support-card__icon"><UsersRound size={21} /></span>
                <div><p>Referral progress</p><h2>One assist from bonus XP.</h2><span>4 of 5 verified referrals</span></div>
                <button className={copyState === 'error' ? 'is-error' : ''} type="button" onClick={copyReferral}>
                  {copyState === 'success' ? <Check size={15} /> : <Copy size={15} />}
                  {copyState === 'success' ? 'Copied' : copyState === 'error' ? 'Try again' : 'Copy link'}
                </button>
              </article>

              <article className="support-card leaderboard-card">
                <span className="support-card__icon"><Trophy size={21} /></span>
                <div><p>Community leaderboard</p><h2>You’re ranked #12.</h2><span>80 XP behind the next ambassador</span></div>
                <button type="button" aria-label="Open leaderboard" onClick={() => handleNav('Leaderboard')}><ChevronRight size={17} /></button>
              </article>
            </section>

            <footer className="footer">
              <span>Backboard Ambassador Portal · Refined Game Edition</span>
              <span>Tiny Ski assets by Kenney · CC0</span>
            </footer>
          </div>
        </main>
      </div>

      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToast(null)}>×</button>
        </div>
      )}
    </>
  )
}

function SectionHeading({ eyebrow, title, actionLabel, onAction }: { eyebrow: string; title: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="section-heading">
      <div><p>{eyebrow}</p><h2>{title}</h2></div>
      <button type="button" onClick={onAction}>{actionLabel} <ArrowRight size={14} /></button>
    </div>
  )
}

function Goal({ label, complete = false }: { label: string; complete?: boolean }) {
  return (
    <div className={`goal ${complete ? 'goal--complete' : ''}`}>
      <span>{complete && <Check size={13} />}</span><p>{label}</p>
    </div>
  )
}

function RideauChallenge({ onPlay }: { onPlay: () => void }) {
  return (
    <article className="rideau-card">
      <div className="rideau-card__heading">
        <div><p>Weekly arcade</p><h2>Rideau Sprint</h2></div>
        <span><PixelIcon name="trophy" size={14} /> Best: 62 WPM</span>
      </div>
      <p className="rideau-card__description">A short typing race across Ottawa’s frozen canal.</p>
      <div className="ski-scene" aria-label="Pixel skiers racing on an icy trail">
        <span className="ski-scene__cloud" />
        <img className="ski-scene__tree ski-scene__tree--one" src="/assets/tiny-ski/tile_0018.png" alt="" />
        <img className="ski-scene__tree ski-scene__tree--two" src="/assets/tiny-ski/tile_0030.png" alt="" />
        <img className="ski-scene__lift" src="/assets/tiny-ski/tile_0042.png" alt="" />
        <img className="ski-scene__snowman" src="/assets/tiny-ski/tile_0069.png" alt="" />
        <span className="ski-track ski-track--one" />
        <span className="ski-track ski-track--two" />
        <img className="ski-scene__skier ski-scene__skier--one" src="/assets/tiny-ski/tile_0082.png" alt="" />
        <img className="ski-scene__skier ski-scene__skier--two" src="/assets/tiny-ski/tile_0083.png" alt="" />
        <span className="ski-scene__label">You</span>
      </div>
      <button type="button" onClick={onPlay}>Play 60-second sprint <ArrowRight size={15} /></button>
    </article>
  )
}

export default App
