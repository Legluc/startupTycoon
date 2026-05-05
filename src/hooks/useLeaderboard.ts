'use client'

import { useQuery } from '@tanstack/react-query'
import { apiFetch } from '@/lib/api'
import type { LeaderboardResponse } from '@/types/api'

export function useLeaderboard(limit = 20) {
  return useQuery<LeaderboardResponse>({
    queryKey: ['leaderboard'],
    queryFn: () =>
      apiFetch<LeaderboardResponse>(`/api/leaderboard?limit=${limit}`, null),
    staleTime: 10_000, // 10 s — le leaderboard se rafraîchit plus souvent
  })
}
