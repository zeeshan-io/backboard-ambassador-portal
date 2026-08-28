import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  Activity,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  Gamepad2,
  Gift,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Send,
  Settings,
  Sun,
  Target,
  Trophy,
  UserPlus,
  UsersRound,
  X,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { HouseCrest } from './HouseCrest'
import type { House, ThemeMode } from './spinoffData'

type PerformanceDashboardProps = {
  theme: ThemeMode
  house: House
  onThemeChange: (theme: ThemeMode) => void
  onRestart: () => void
}

type NavigationItem = {
  label: string
  icon: LucideIcon
  badge?: string
}

const navigation: { label: string; items: NavigationItem[] }[] = [
  {
    label: 'Performance',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard },
      { label: 'Submit work', icon: Send },
      { label: 'Missions', icon: Target, badge: '3' },
      { label: 'Work history', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Season',
    items: [
      { label: 'Calendar', icon: CalendarDays },
      { label: 'Referrals', icon: UserPlus },
      { label: 'Ambassadors', icon: UsersRound },
      { label: 'Standings', icon: Trophy },
      { label: 'Rewards', icon: Gift },
    ],
  },
  {
    label: 'Explore',
    items: [
      { label: 'Arcade', icon: Gamepad2, badge: '2' },
      { label: 'Resources', icon: BookOpen },
    ],
  },
]

const standings = [
  { rank: '01', name: 'Maya Chen', campus: 'Waterloo', xp: '2,480' },
  { rank: '02', name: 'Noah Williams', campus: 'McGill', xp: '2,220' },
  { rank: '03', name: 'Avery Singh', campus: 'UBC', xp: '2,060' },
  { rank: '12', name: 'You', campus: 'McMaster', xp: '1,180', current: true },
]

const submissions = [
  { title: 'CLI walkthrough', type: 'Educational content', date: 'Aug 26', status: 'Approved', xp: '+150 XP' },
  { title: 'Campus builder meetup', type: 'Event', date: 'Aug 22', status: 'In review', xp: '+250 XP' },
  { title: 'Backboard launch post', type: 'Awareness', date: 'Aug 19', status: 'Approved', xp: '+50 XP' },
]

export function PerformanceDashboard({
  theme,
  house,
  onThemeChange,
  onRestart,
}: PerformanceDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [selectedTrophy, setSelectedTrophy] = useState('First Shift')
  const toastTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    }
  }, [])

  const announce = (message: string) => {
    setToast(message)
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => {
      setToast(null)
      toastTimer.current = null
    }, 2600)
  }

  const shallowNavigate = (label: string) => {
    setSidebarOpen(false)
    if (label === 'Dashboard') {
      announce('You are already in the Performance Centre.')
      return
    }
    announce(`${label} is reserved for the next prototype phase.`)
  }

  return (
    <div
      className={`performance-app performance-app--${theme}`}
      style={
        {
          '--house-color': house.color,
          '--house-soft': house.soft,
          '--house-ink': house.ink,
        } as CSSProperties
      }
    >
      <aside className={`performance-sidebar ${sidebarOpen ? 'is-open' : ''}`}>
        <div className="performance-sidebar__brand">
          <img src="/backboard-logo-on-dark.png" alt="Backboard.io" />
          <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <button className="performance-profile" type="button" onClick={() => announce('Player profile shortcut selected.')}>
          <HouseCrest house={house} size="small" showLabel={false} />
          <span><small>Your house</small><strong>{house.name}</strong><em>Locker 07</em></span>
          <ChevronRight size={17} />
        </button>

        <nav className="performance-nav" aria-label="Primary navigation">
          {navigation.map((group) => (
            <div key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    className={item.label === 'Dashboard' ? 'is-active' : ''}
                    type="button"
                    onClick={() => shallowNavigate(item.label)}
                    key={item.label}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    {item.badge && <em>{item.badge}</em>}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="performance-sidebar__footer">
          <div><span>Season XP</span><strong>1,180</strong></div>
          <i><span /></i>
          <p>320 XP to Captain</p>
          <button type="button" onClick={() => shallowNavigate('Settings')}><Settings size={17} /> Settings</button>
        </div>
      </aside>

      {sidebarOpen && <button className="performance-scrim" type="button" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}

      <main className="performance-main">
        <header className="performance-topbar">
          <div>
            <button className="performance-menu" type="button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation">
              <Menu size={21} />
            </button>
            <span className="performance-topbar__facility"><i /> Ottawa Performance Centre</span>
          </div>
          <div className="performance-topbar__actions">
            <button className="performance-search" type="button" onClick={() => announce('Search will be connected in the full portal build.')}>
              <Search size={18} /> <span>Search facility</span>
            </button>
            <div className="performance-theme" role="group" aria-label="Facility atmosphere">
              <button className={theme === 'day' ? 'is-active' : ''} type="button" onClick={() => onThemeChange('day')} aria-label="Daylight mode">
                <Sun size={17} />
              </button>
              <button className={theme === 'arena' ? 'is-active' : ''} type="button" onClick={() => onThemeChange('arena')} aria-label="Arena night mode">
                <Moon size={17} />
              </button>
            </div>
            <button type="button" onClick={() => announce('No new alerts.')} aria-label="Notifications"><Bell size={19} /></button>
            <button className="performance-avatar" type="button" onClick={() => announce('Player profile shortcut selected.')}>ZA</button>
          </div>
        </header>

        <div className="performance-content">
          <section className="performance-heading">
            <div>
              <p>Thursday, August 28 · Facility report 07</p>
              <h1>Good morning, Zain. Your locker is ready.</h1>
              <span>One submission is in review and three missions are available for your next shift.</span>
            </div>
            <div>
              <button type="button" onClick={() => shallowNavigate('Missions')}>View missions</button>
              <button type="button" onClick={() => shallowNavigate('Submit work')}>Submit work <ArrowRight size={18} /></button>
            </div>
          </section>

          <section className="performance-centre" aria-label="Interactive Hockey Performance Centre">
            <div className="performance-centre__roof" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <div className="performance-centre__header">
              <div><span>Player bay 07</span><strong>Backboard Ambassador Performance Centre</strong></div>
              <div><Activity size={17} /><span>All systems ready</span></div>
            </div>

            <div className="performance-centre__grid">
              <article className="mission-board">
                <div className="facility-module-label"><span>Next shift</span><strong>Mission board</strong></div>
                <span className="mission-board__tag">Featured · +500 XP</span>
                <h2>Redesign the Ambassador Portal</h2>
                <p>Build a distinctive ambassador experience while keeping every core workflow clear.</p>
                <div className="mission-board__meta">
                  <span><Clock3 size={16} /> Due Sep 11</span>
                  <span><Zap size={16} /> High impact</span>
                </div>
                <div className="mission-board__progress">
                  <div><span>Mission progress</span><strong>64%</strong></div>
                  <i><span /></i>
                </div>
                <button type="button" onClick={() => shallowNavigate('Missions')}>Open mission <ArrowRight size={17} /></button>
              </article>

              <button className="player-locker" type="button" onClick={() => announce('Your personalized locker opens the player profile.')}>
                <span className="player-locker__light" />
                <span className="player-locker__rail" />
                <span className="player-locker__jersey">
                  <small>BACKBOARD</small>
                  <strong>07</strong>
                  <em>ZAIN</em>
                  <i className="player-locker__sleeve player-locker__sleeve--left" />
                  <i className="player-locker__sleeve player-locker__sleeve--right" />
                </span>
                <span className="player-locker__crest"><HouseCrest house={house} size="small" showLabel={false} /></span>
                <span className="player-locker__plate"><small>PLAYER STATUS</small><strong>BUILDER II</strong><em>LOCKER 07</em></span>
                <span className="player-locker__floor" />
              </button>

              <article className="standings-screen">
                <div className="facility-module-label"><span>Live season</span><strong>Standings</strong></div>
                <div className="standings-screen__rank">
                  <span>Your position</span>
                  <strong>#12</strong>
                  <em>↑ 3 this month</em>
                </div>
                <div className="standings-list">
                  {standings.map((row) => (
                    <div className={row.current ? 'is-current' : ''} key={`${row.rank}-${row.name}`}>
                      <span>{row.rank}</span>
                      <p><strong>{row.name}</strong><small>{row.campus}</small></p>
                      <em>{row.xp}</em>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => shallowNavigate('Standings')}>Full standings <ArrowRight size={17} /></button>
              </article>
            </div>

            <div className="performance-floor-strip">
              <span>Locker 07</span>
              <i />
              <span>{house.name}</span>
              <i />
              <span>Season 01</span>
            </div>
          </section>

          <section className="performance-metrics" aria-label="Ambassador progress">
            <article><span><Zap size={18} /> Season XP</span><strong>1,180</strong><p>320 XP until Captain</p></article>
            <article><span><Target size={18} /> Active missions</span><strong>03</strong><p>One due within 14 days</p></article>
            <article><span><CheckCircle2 size={18} /> Approved work</span><strong>12</strong><p>+3 contributions this month</p></article>
            <article><span><Activity size={18} /> Current streak</span><strong>07 days</strong><p>One action keeps it alive</p></article>
          </section>

          <section className="performance-lower">
            <article className="trophy-cabinet">
              <div className="performance-section-heading">
                <div><p>Achievement room</p><h2>Trophy cabinet</h2></div>
                <button type="button" onClick={() => shallowNavigate('Rewards')}>View collection <ChevronRight size={17} /></button>
              </div>
              <div className="trophy-cabinet__body">
                <div className="trophy-shelf">
                  {['First Shift', 'Community Builder', 'Seven-Day Streak'].map((name, index) => (
                    <button
                      className={selectedTrophy === name ? 'is-active' : ''}
                      type="button"
                      onClick={() => setSelectedTrophy(name)}
                      key={name}
                    >
                      <span className={`trophy-shape trophy-shape--${index + 1}`}><Trophy size={index === 1 ? 30 : 25} /></span>
                      <strong>{name}</strong>
                      <small>{index === 0 ? 'First approved contribution' : index === 1 ? 'Hosted a campus meetup' : 'Active seven days running'}</small>
                    </button>
                  ))}
                </div>
                <div className="trophy-detail">
                  <span>Selected achievement</span>
                  <strong>{selectedTrophy}</strong>
                  <p>Unlocked this season. Select another trophy to inspect its story.</p>
                </div>
              </div>
            </article>

            <article className="work-console">
              <div className="performance-section-heading">
                <div><p>Review desk</p><h2>Recent work</h2></div>
                <button type="button" onClick={() => shallowNavigate('Work history')}>View history <ChevronRight size={17} /></button>
              </div>
              <div className="work-console__rows">
                {submissions.map((submission) => (
                  <div key={submission.title}>
                    <span className={submission.status === 'Approved' ? 'is-approved' : 'is-review'} />
                    <p><strong>{submission.title}</strong><small>{submission.type}</small></p>
                    <time>{submission.date}</time>
                    <em>{submission.status}</em>
                    <strong>{submission.xp}</strong>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="performance-quick">
            <article>
              <CalendarDays size={21} />
              <div><span>Next event · Sep 04</span><strong>Builder Power Hour</strong><p>6:30 PM EDT · Community Discord</p></div>
              <button type="button" onClick={() => shallowNavigate('Calendar')}><ArrowRight size={18} /></button>
            </article>
            <article>
              <UsersRound size={21} />
              <div><span>Referral progress</span><strong>One assist from bonus XP</strong><p>4 of 5 verified referrals</p></div>
              <button type="button" onClick={() => shallowNavigate('Referrals')}><ArrowRight size={18} /></button>
            </article>
            <article>
              <Gamepad2 size={21} />
              <div><span>Facility Arcade</span><strong>Air Hockey + Rideau Sprint</strong><p>Game prototypes are next on the build list</p></div>
              <button type="button" onClick={() => shallowNavigate('Arcade')}><ArrowRight size={18} /></button>
            </article>
          </section>

          <footer className="performance-footer">
            <span>Backboard Ambassador Portal · Design Spinoff 01</span>
            <button type="button" onClick={onRestart}>Replay onboarding</button>
          </footer>
        </div>
      </main>

      {toast && <div className="performance-toast" role="status">{toast}</div>}
    </div>
  )
}
