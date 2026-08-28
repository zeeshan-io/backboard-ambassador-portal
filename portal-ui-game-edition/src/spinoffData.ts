export type ThemeMode = 'day' | 'arena'
export type HouseId = 'rideau' | 'atlantic' | 'redwood' | 'hudson'

export type House = {
  id: HouseId
  name: string
  shortName: string
  initials: string
  number: string
  role: string
  region: string
  motto: string
  color: string
  ink: string
  soft: string
}

export const houses: House[] = [
  {
    id: 'rideau',
    name: 'Rideau Ravens',
    shortName: 'Ravens',
    initials: 'RR',
    number: '07',
    role: 'Strategy & playmaking',
    region: 'Ottawa / Rideau',
    motto: 'See the lane before it opens.',
    color: '#7467f0',
    ink: '#191343',
    soft: '#e5e1ff',
  },
  {
    id: 'atlantic',
    name: 'Atlantic Storm',
    shortName: 'Storm',
    initials: 'AS',
    number: '19',
    role: 'Community & momentum',
    region: 'Atlantic Canada',
    motto: 'Bring energy to every shift.',
    color: '#21a6d8',
    ink: '#052d40',
    soft: '#d9f5ff',
  },
  {
    id: 'redwood',
    name: 'Redwood Foxes',
    shortName: 'Foxes',
    initials: 'RF',
    number: '28',
    role: 'Building & problem solving',
    region: 'Northern California',
    motto: 'Build smart. Move fast.',
    color: '#df6a3f',
    ink: '#4d190c',
    soft: '#ffe5db',
  },
  {
    id: 'hudson',
    name: 'Hudson Hawks',
    shortName: 'Hawks',
    initials: 'HH',
    number: '44',
    role: 'Leadership & follow-through',
    region: 'New York / Hudson',
    motto: 'Find the opening. Finish strong.',
    color: '#d5a52a',
    ink: '#3d2b03',
    soft: '#fff1c4',
  },
]
