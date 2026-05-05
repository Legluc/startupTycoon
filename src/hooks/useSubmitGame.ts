'use client'

// Hook useMutation pour soumettre une partie solo terminée.
//
// Optimistic updates :
//  - onMutate  → snapshot + mise à jour immédiate du cache local
//  - onError   → rollback vers le snapshot si le serveur rejette
//  - onSettled → invalidation pour re-fetch propre (leaderboard + mes parties)

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth, useUser } from '@clerk/nextjs'
import { apiFetch } from '@/lib/api'
import type {
  Game,
  LeaderboardEntry,
  LeaderboardResponse,
  MyGamesResponse,
  SubmitGamePayload,
} from '@/types/api'

export function useSubmitGame() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  const { user } = useUser()

  return useMutation<Game, Error, SubmitGamePayload>({
    mutationFn: (payload) =>
      apiFetch<Game>('/api/games', getToken, {
        method: 'POST',
        body: JSON.stringify({
          ...payload,
          displayName: payload.displayName ?? user?.fullName ?? undefined,
        }),
      }),

    // ── Étape 1 : snapshot + update optimiste ──────────────────────────────
    onMutate: async (payload) => {
      // Annuler les refetch en cours pour ne pas écraser notre update optimiste
      await queryClient.cancelQueries({ queryKey: ['leaderboard'] })
      await queryClient.cancelQueries({ queryKey: ['games', 'me'] })

      const prevLeaderboard = queryClient.getQueryData<LeaderboardResponse>([
        'leaderboard',
      ])
      const prevMyGames = queryClient.getQueryData<MyGamesResponse>([
        'games',
        'me',
      ])

      // — Optimistic : ajout en tête de l'historique personnel —
      const optimisticGame: Game = {
        id: -1, // marqueur local
        userId: user?.id ?? 'optimistic',
        displayName: user?.fullName ?? '',
        mode: payload.mode,
        score: payload.score,
        duration: payload.duration,
        clicks: payload.clicks,
        upgrades: payload.upgrades,
        createdAt: Date.now(),
      }

      if (prevMyGames) {
        queryClient.setQueryData<MyGamesResponse>(['games', 'me'], {
          ...prevMyGames,
          count: prevMyGames.count + 1,
          games: [optimisticGame, ...prevMyGames.games],
        })
      }

      // — Optimistic : injecter dans le leaderboard si le score est compétitif —
      if (prevLeaderboard) {
        const entries = prevLeaderboard.entries
        const lowestScore = entries[entries.length - 1]?.score ?? 0

        if (
          payload.score > lowestScore ||
          entries.length < prevLeaderboard.limit
        ) {
          const optimisticEntry: LeaderboardEntry = {
            userId: user?.id ?? 'optimistic',
            displayName: user?.fullName ?? '',
            score: payload.score,
            duration: payload.duration,
            clicks: payload.clicks,
            upgrades: payload.upgrades,
            achievedAt: Date.now(),
          }

          // Retirer l'entrée existante du même user + insérer la nouvelle
          const withoutMe = entries.filter(
            (e) => e.userId !== (user?.id ?? 'optimistic')
          )
          const updated = [...withoutMe, optimisticEntry]
            .sort((a, b) => b.score - a.score)
            .slice(0, prevLeaderboard.limit)

          queryClient.setQueryData<LeaderboardResponse>(['leaderboard'], {
            ...prevLeaderboard,
            count: updated.length,
            entries: updated,
          })
        }
      }

      // Retourner le snapshot pour le rollback éventuel
      return { prevLeaderboard, prevMyGames }
    },

    // ── Étape 2 : rollback si le serveur renvoie une erreur ────────────────
    onError: (_err, _payload, context) => {
      const ctx = context as
        | {
            prevLeaderboard?: LeaderboardResponse
            prevMyGames?: MyGamesResponse
          }
        | undefined

      if (ctx?.prevLeaderboard) {
        queryClient.setQueryData(['leaderboard'], ctx.prevLeaderboard)
      }
      if (ctx?.prevMyGames) {
        queryClient.setQueryData(['games', 'me'], ctx.prevMyGames)
      }
    },

    // ── Étape 3 : invalider pour re-fetch propre (succès ou erreur) ────────
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] })
      queryClient.invalidateQueries({ queryKey: ['games', 'me'] })
    },
  })
}
