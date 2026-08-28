import { useState } from 'react'
import { DraftToquePage } from './DraftToquePage'
import { FacilityEntrance } from './FacilityEntrance'
import { PerformanceDashboard } from './PerformanceDashboard'
import { houses } from './spinoffData'
import type { House, ThemeMode } from './spinoffData'
import './Spinoff.css'

type AppView = 'entrance' | 'draft' | 'dashboard'

function viewFromHash(): AppView {
  if (window.location.hash === '#draft') return 'draft'
  if (window.location.hash === '#dashboard') return 'dashboard'
  return 'entrance'
}

function storedHouse(): House | null {
  const houseId = localStorage.getItem('backboard-spinoff-house')
  return houses.find((house) => house.id === houseId) ?? null
}

function App() {
  const [view, setView] = useState<AppView>(viewFromHash)
  const [theme, setThemeState] = useState<ThemeMode>(
    () => (localStorage.getItem('backboard-spinoff-theme') as ThemeMode | null) ?? 'day',
  )
  const [house, setHouse] = useState<House | null>(storedHouse)

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme)
    localStorage.setItem('backboard-spinoff-theme', nextTheme)
  }

  const navigate = (nextView: AppView) => {
    const hash = nextView === 'entrance' ? window.location.pathname : `#${nextView}`
    window.history.replaceState(null, '', hash)
    setView(nextView)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  if (view === 'entrance') {
    return (
      <FacilityEntrance
        theme={theme}
        onThemeChange={setTheme}
        onComplete={() => navigate('draft')}
        onPreview={() => navigate('dashboard')}
      />
    )
  }

  if (view === 'draft') {
    return (
      <DraftToquePage
        theme={theme}
        onThemeChange={setTheme}
        onAssigned={(assignedHouse) => {
          localStorage.setItem('backboard-spinoff-house', assignedHouse.id)
          setHouse(assignedHouse)
          navigate('dashboard')
        }}
        onBack={() => navigate('entrance')}
      />
    )
  }

  return (
    <PerformanceDashboard
      theme={theme}
      house={house ?? houses[0]}
      onThemeChange={setTheme}
      onRestart={() => navigate('entrance')}
    />
  )
}

export default App
