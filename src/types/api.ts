// Types correspondant aux réponses du backend Express (BackEndStartUpTycoon)

export type LeaderboardEntry = {
  userId: string
  displayName: string
  score: number
  duration: number
  clicks: number
  upgrades: number
  achievedAt: number
}

export type LeaderboardResponse = {
  limit: number
  count: number
  entries: LeaderboardEntry[]
}

export type Game = {
  id: number
  userId: string
  displayName: string
  mode: 'solo' | 'multi'
  score: number
  duration: number
  clicks: number
  upgrades: number
  createdAt: number
}

export type MyGamesResponse = {
  limit: number
  count: number
  games: Game[]
}

export type SubmitGamePayload = {
  mode: 'solo' | 'multi'
  score: number
  duration: number
  clicks: number
  upgrades: number
  displayName?: string
}
