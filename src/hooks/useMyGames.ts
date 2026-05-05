'use client'

import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/nextjs'
import { apiFetch } from '@/lib/api'
import type { MyGamesResponse } from '@/types/api'

export function useMyGames(limit = 50) {
  const { getToken, isSignedIn } = useAuth()

  return useQuery<MyGamesResponse>({
    queryKey: ['games', 'me'],
    queryFn: () =>
      apiFetch<MyGamesResponse>(`/api/games/me?limit=${limit}`, getToken),
    enabled: !!isSignedIn, // ne fetch que si l'utilisateur est connecté
  })
}
