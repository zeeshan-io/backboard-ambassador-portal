import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bird,
  Check,
  Moon,
  Mountain,
  Sparkles,
  Sun,
  Trees,
  Waves,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import './HouseAssignmentPage.css'

type HouseId = 'rideau' | 'atlantic' | 'redwood' | 'hudson'
type CombinePhase = 'questions' | 'scouting' | 'result'

type House = {
  id: HouseId
  name: string
  shortName: string
  initials: string
  region: string
  role: string
  motto: string
  color: string
  soft: string
  icon: LucideIcon
  reasons: [string, string]
}

type Option = {
  title: string
  detail: string
  trait: string
  house: HouseId
}

type Question = {
  eyebrow: string
  prompt: string
  options: Option[]
}

const houses: House[] = [
  {
    id: 'rideau',
    name: 'Rideau Ravens',
    shortName: 'Ravens',
    initials: 'RR',
    region: 'Ottawa / Rideau',
    role: 'Strategists & playmakers',
    motto: 'See the lane before it opens.',
    color: '#6557e8',
    soft: '#e8e4ff',
    icon: Bird,
    reasons: ['You look for the smartest route through a challenge.', 'You make the people around you more effective.'],
  },
  {
    id: 'atlantic',
    name: 'Atlantic Puffins',
    shortName: 'Puffins',
    initials: 'AP',
    region: 'Atlantic Canada',
    role: 'Communicators & community builders',
    motto: 'Bring energy to every shift.',
    color: '#e9554a',
    soft: '#ffe2dc',
    icon: Waves,
    reasons: ['You turn ideas into stories people want to join.', 'You build momentum by bringing people together.'],
  },
  {
    id: 'redwood',
    name: 'Redwood Foxes',
    shortName: 'Foxes',
    initials: 'RF',
    region: 'Northern California',
    role: 'Builders & problem solvers',
    motto: 'Build smart. Move fast.',
    color: '#16865e',
    soft: '#d9f5e8',
    icon: Trees,
    reasons: ['You prefer useful prototypes over long debates.', 'You stay curious when the path is not obvious.'],
  },
  {
    id: 'hudson',
    name: 'Hudson Hawks',
    shortName: 'Hawks',
    initials: 'HH',
    region: 'New York / Hudson',
    role: 'Finishers & opportunity makers',
    motto: 'Find the opening. Finish strong.',
    color: '#bc7c00',
    soft: '#fff0bf',
    icon: Mountain,
    reasons: ['You keep the finish line visible when pressure rises.', 'You are comfortable turning an opening into action.'],
  },
]

const questions: Question[] = [
  {
    eyebrow: 'Opening shift',
    prompt: 'Which ambassador mission would you choose first?',
    options: [
      { title: 'Build a technical demo', detail: 'Make the product tangible through a working prototype.', trait: 'Hands-on builder', house: 'redwood' },
      { title: 'Explain a difficult concept', detail: 'Turn complexity into a story anyone can follow.', trait: 'Clear communicator', house: 'atlantic' },
      { title: 'Design a campus launch plan', detail: 'Find the right sequence, people, and timing.', trait: 'Strategic thinker', house: 'rideau' },
      { title: 'Open a new partnership', detail: 'Spot an opportunity and move it forward.', trait: 'Opportunity maker', house: 'hudson' },
    ],
  },
  {
    eyebrow: 'Under pressure',
    prompt: 'A team project is slipping behind schedule. What is your move?',
    options: [
      { title: 'Simplify the plan', detail: 'Protect the outcome by cutting low-value work.', trait: 'Focused planner', house: 'rideau' },
      { title: 'Rally the team', detail: 'Restore energy and make ownership feel shared.', trait: 'Team catalyst', house: 'atlantic' },
      { title: 'Solve the hardest blocker', detail: 'Get close to the work and unblock progress.', trait: 'Practical problem solver', house: 'redwood' },
      { title: 'Drive the final push', detail: 'Create urgency and carry the work across the line.', trait: 'Reliable finisher', house: 'hudson' },
    ],
  },
  {
    eyebrow: 'Your reputation',
    prompt: 'What do teammates most often rely on you for?',
    options: [
      { title: 'Strategy', detail: 'Reading the situation and finding the best route.', trait: 'Field vision', house: 'rideau' },
      { title: 'Energy', detail: 'Helping everyone feel included and motivated.', trait: 'Community energy', house: 'atlantic' },
      { title: 'Craft', detail: 'Turning rough ideas into polished, useful work.', trait: 'Strong craft', house: 'redwood' },
      { title: 'Follow-through', detail: 'Keeping promises and finishing what was started.', trait: 'Follow-through', house: 'hudson' },
    ],
  },
  {
    eyebrow: 'Season goal',
    prompt: 'What would make your ambassador year feel successful?',
    options: [
      { title: 'Shipped projects', detail: 'A portfolio of useful experiments and tools.', trait: 'Ships useful work', house: 'redwood' },
      { title: 'A stronger community', detail: 'More students learning and building together.', trait: 'Community builder', house: 'atlantic' },
      { title: 'A smarter program', detail: 'Systems that make every ambassador more effective.', trait: 'Systems thinker', house: 'rideau' },
      { title: 'New opportunities', detail: 'Partnerships, events, and doors that did not exist before.', trait: 'Creates openings', house: 'hudson' },
    ],
  },
]

function HouseCrest({ house, compact = false }: { house: House; compact?: boolean }) {
  const Icon = house.icon

  return (
    <span
      className={`combine-crest ${compact ? 'combine-crest--compact' : ''}`}
      style={{ '--house-color': house.color, '--house-soft': house.soft } as CSSProperties}
      aria-hidden="true"
    >
      <Icon size={compact ? 20 : 32} strokeWidth={2.1} />
      <strong>{house.initials}</strong>
    </span>
  )
}

export function HouseAssignmentPage({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: () => void
}) {
  const [phase, setPhase] = useState<CombinePhase>('questions')
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(HouseId | null)[]>(Array(questions.length).fill(null))
  const [resultId, setResultId] = useState<HouseId | null>(null)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('backboard-signup-theme') === 'dark')
  const revealTimer = useRef<number | null>(null)
  const reducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const question = questions[step]
  const selectedHouseId = answers[step]
  const result = houses.find((house) => house.id === resultId) ?? null

  useEffect(() => {
    return () => {
      if (revealTimer.current !== null) window.clearTimeout(revealTimer.current)
    }
  }, [])

  const selectedTraits = useMemo(() => {
    if (!resultId) return []
    return answers
      .map((answer, index) => questions[index].options.find((option) => option.house === answer))
      .filter((option): option is Option => Boolean(option))
      .sort((a, b) => Number(b.house === resultId) - Number(a.house === resultId))
      .slice(0, 2)
      .map((option) => option.trait)
  }, [answers, resultId])

  const runScoutingReport = () => {
    const scores: Record<HouseId, number> = { rideau: 0, atlantic: 0, redwood: 0, hudson: 0 }
    answers.forEach((answer) => {
      if (answer) scores[answer] += 1
    })
    const winner = [...houses].sort((a, b) => {
      const scoreDifference = scores[b.id] - scores[a.id]
      if (scoreDifference !== 0) return scoreDifference
      return answers.lastIndexOf(b.id) - answers.lastIndexOf(a.id)
    })[0]

    setResultId(winner.id)
    setPhase('scouting')
    localStorage.setItem('backboard-house-v2', winner.id)
    revealTimer.current = window.setTimeout(
      () => {
        setPhase('result')
        revealTimer.current = null
      },
      reducedMotion ? 80 : 1800,
    )
  }

  const goForward = () => {
    if (!selectedHouseId) return
    if (step < questions.length - 1) {
      setStep((current) => current + 1)
      return
    }
    runScoutingReport()
  }

  const toggleTheme = () => {
    const nextMode = !darkMode
    setDarkMode(nextMode)
    localStorage.setItem('backboard-signup-theme', nextMode ? 'dark' : 'light')
  }

  return (
    <div className={`combine-page ${darkMode ? 'combine-page--dark' : ''}`}>
      <header className="combine-header">
        <img src={darkMode ? '/backboard-logo-on-dark.png' : '/backboard-logo-dark.png'} alt="Backboard.io" />
        <div className="combine-header__meta">
          <span>Onboarding</span>
          <strong>02 / 03</strong>
          <button type="button" onClick={toggleTheme} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {phase === 'questions' && (
        <main className="combine-layout">
          <section className="combine-quiz">
            <button className="combine-back" type="button" onClick={step === 0 ? onBack : () => setStep((current) => current - 1)}>
              <ArrowLeft size={18} /> {step === 0 ? 'Back to signup' : 'Previous question'}
            </button>

            <div className="combine-progress" aria-label={`Question ${step + 1} of ${questions.length}`}>
              <div>
                <span>Scouting combine</span>
                <strong>{String(step + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</strong>
              </div>
              <i><span style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></i>
            </div>

            <p className="combine-eyebrow">{question.eyebrow}</p>
            <h1>{question.prompt}</h1>
            <p className="combine-instruction">Choose the response that feels most like you. There are no wrong answers.</p>

            <div className="combine-options" role="radiogroup" aria-label={question.prompt}>
              {question.options.map((option, index) => {
                const selected = selectedHouseId === option.house
                return (
                  <button
                    className={selected ? 'is-selected' : ''}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setAnswers((current) => current.map((answer, answerIndex) => answerIndex === step ? option.house : answer))}
                    key={option.title}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    <div>
                      <strong>{option.title}</strong>
                      <p>{option.detail}</p>
                    </div>
                    <Check size={19} aria-hidden="true" />
                  </button>
                )
              })}
            </div>

            <button className="combine-next" type="button" disabled={!selectedHouseId} onClick={goForward}>
              {step === questions.length - 1 ? 'Generate my scouting report' : 'Next question'}
              <ArrowRight size={19} />
            </button>
          </section>

          <aside className="combine-sidebar">
            <p className="combine-sidebar__kicker">Why houses?</p>
            <h2>A crew, not a category.</h2>
            <p>
              Your house gives you a smaller team for friendly challenges, shared goals, and seasonal standings.
            </p>
            <div className="combine-house-list">
              {houses.map((house) => (
                <div key={house.id}>
                  <HouseCrest house={house} compact />
                  <span><strong>{house.name}</strong><small>{house.role}</small></span>
                </div>
              ))}
            </div>
            <div className="combine-note">
              <Sparkles size={19} />
              <p><strong>Your house never limits your work.</strong> Every mission, event, and reward remains open to every ambassador.</p>
            </div>
          </aside>
        </main>
      )}

      {phase === 'scouting' && result && (
        <main className="combine-scouting" aria-live="polite">
          <p>Combine complete</p>
          <h1>Reviewing your game tape...</h1>
          <div className="combine-scouting__crests" aria-hidden="true">
            {houses.map((house) => <HouseCrest house={house} key={house.id} />)}
          </div>
          <span>Matching strengths · Checking team fit · Preparing your player card</span>
          <button type="button" onClick={() => setPhase('result')}>Skip animation</button>
        </main>
      )}

      {phase === 'result' && result && (
        <main className="combine-result" aria-live="polite">
          <section className="combine-result__card" style={{ '--house-color': result.color, '--house-soft': result.soft } as CSSProperties}>
            <p className="combine-eyebrow">Scouting report // Match confirmed</p>
            <div className="combine-result__identity">
              <HouseCrest house={result} />
              <div><span>You have been drafted to</span><h1>{result.name}</h1></div>
            </div>
            <p className="combine-result__role">{result.role} · {result.region}</p>
            <blockquote>“{result.motto}”</blockquote>

            <div className="combine-result__report">
              <div>
                <span>Your top traits</span>
                {selectedTraits.map((trait) => <strong key={trait}>{trait}</strong>)}
              </div>
              <div>
                <span>Why this match</span>
                {result.reasons.map((reason) => <p key={reason}><Check size={17} /> {reason}</p>)}
              </div>
            </div>

            <button className="combine-next" type="button" onClick={onComplete}>
              Enter the ambassador dashboard <ArrowRight size={19} />
            </button>
          </section>

          <aside className="combine-result__next">
            <span>Up next</span>
            <h2>Your first shift</h2>
            <ol>
              <li><strong>Explore your dashboard</strong><small>See missions, XP, work status, and upcoming events.</small></li>
              <li><strong>Complete your profile</strong><small>Add your campus and the skills you want to grow.</small></li>
              <li><strong>Choose a first mission</strong><small>Start contributing when you are ready.</small></li>
            </ol>
          </aside>
        </main>
      )}
    </div>
  )
}
