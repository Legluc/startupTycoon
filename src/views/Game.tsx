'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { ClickButton } from '../components/ClickButton'
import { MultiplayerButton } from '../components/MultiplayerButton'
import { useGame, GAME_DURATION_S } from '../lib/GameContext'
import { useSubmitGame } from '../hooks/useSubmitGame'

export function HomePage() {
  const { state, dispatch, sessionSeconds, isGameOver } = useGame()
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  const submitGame = useSubmitGame()
  const hasSubmitted = useRef(false)

  const handleClick = useCallback(() => {
    dispatch({ type: 'CLICK' })
  }, [dispatch])

  // Déclencher la mutation une seule fois quand la partie se termine,
  // seulement si l'utilisateur est connecté.
  useEffect(() => {
    if (!isGameOver) return
    if (!isLoaded) return // attendre que Clerk soit prêt
    if (!isSignedIn) return // pas connecté → on n'essaie pas
    if (hasSubmitted.current) return
    if (submitGame.isPending) return
    hasSubmitted.current = true

    const totalUpgrades = state.upgrades.reduce((sum, u) => sum + u.count, 0)
    submitGame.mutate({
      mode: 'solo',
      score: state.totalEarned,
      duration: GAME_DURATION_S,
      clicks: state.totalClicks,
      upgrades: totalUpgrades,
      displayName: user?.fullName ?? undefined,
    })
  }, [isGameOver, isLoaded, isSignedIn]) // eslint-disable-line react-hooks/exhaustive-deps

  const remaining = Math.max(0, GAME_DURATION_S - sessionSeconds)
  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  return (
    <section className="hero hero-game">
      <div className="gameboard">
        <h1>Startup Tycoon</h1>

        {/* Timer de partie */}
        {!isGameOver ? (
          <p className="game-timer">
            ⏱ {minutes}:{String(seconds).padStart(2, '0')} restant
          </p>
        ) : (
          <div className="game-over">
            <p>⏰ Partie terminée !</p>
            {!isSignedIn && isLoaded && (
              <p className="game-over__status">
                <a href="/sign-in">Connectez-vous</a> pour sauvegarder votre
                score.
              </p>
            )}
            {isSignedIn && submitGame.isPending && (
              <p className="game-over__status">Envoi du score…</p>
            )}
            {isSignedIn && submitGame.isSuccess && (
              <p className="game-over__status game-over__status--success">
                ✅ Score enregistré !
              </p>
            )}
            {isSignedIn && submitGame.isError && (
              <p className="game-over__status game-over__status--error">
                ❌ Erreur : {submitGame.error?.message}
              </p>
            )}
          </div>
        )}
      </div>

      <ClickButton clickValue={state.clickValue} onClick={handleClick} />
      <MultiplayerButton />
    </section>
  )
}
