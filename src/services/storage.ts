import type { GameState } from '../types/gameState'
import { INITIAL_STATE } from '../types/gameState'
import { UPGRADES } from '../data/upgrades'

export type SaveFile = {
  version: number
  savedAt: number
  state: GameState
}

const STORAGE_KEY = 'startup-tycoon-save'
const CURRENT_VERSION = 1

/**
 * Valide la structure d'une sauvegarde
 */
function validateSaveFile(data: unknown): boolean {
  if (!data || typeof data !== 'object') return false

  const save = data as Record<string, unknown>

  // Vérifie les champs obligatoires
  if (save.version !== CURRENT_VERSION) return false
  if (typeof save.savedAt !== 'number') return false
  if (!save.state || typeof save.state !== 'object') return false

  const state = save.state as Record<string, unknown>

  // Vérifie les types des propriétés critiques du state
  if (typeof state.money !== 'number') return false
  if (typeof state.clickValue !== 'number') return false
  if (typeof state.incomePerSecond !== 'number') return false
  if (!Array.isArray(state.upgrades)) return false
  if (typeof state.totalClicks !== 'number') return false
  if (typeof state.totalEarned !== 'number') return false

  return true
}

/**
 * Sauvegarde l'état dans localStorage
 * Gère les erreurs
 */
export function saveGameState(state: GameState): void {
  try {
    const saveFile: SaveFile = {
      version: CURRENT_VERSION,
      savedAt: Date.now(),
      state,
    }
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveFile))
  } catch (error) {
    console.error('Failed to save game state:', error)
    // Silencieusement échouée (QuotaExceededError, etc.)
  }
}

/**
 * Charge l'état depuis localStorage
 * Retourne l'état sauvegardé ou null si absent/corrompu
 */
export function loadGameState(): GameState | null {
  try {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    let saveFile: unknown
    try {
      saveFile = JSON.parse(stored)
    } catch {
      console.warn('Corrupted save file (invalid JSON), ignoring')
      return null
    }

    // Validation stricte
    if (!validateSaveFile(saveFile)) {
      console.warn('Corrupted save file (invalid structure), ignoring')
      return null
    }

    const typedSave = saveFile as SaveFile

    // MAJ du INITIAL_STATE pour les champs manquants
    return {
      ...INITIAL_STATE,
      ...typedSave.state,
      upgrades: restoreUpgrades(typedSave.state.upgrades),
    }
  } catch (error) {
    console.error('Failed to load game state:', error)
    return null
  }
}

/**
 * Restaure les upgrades avec les données actuelles
 */
function restoreUpgrades(savedUpgrades: any[]): any[] {
  return UPGRADES.map((upgrade) => {
    const saved = savedUpgrades.find((u) => u.id === upgrade.id)
    return {
      ...upgrade,
      count: saved?.count ?? 0,
    }
  })
}

/**
 * Récupère la date de dernière sauvegarde
 * Retourne la date ou null si pas de sauvegarde
 */
export function getLastSaveTime(): Date | null {
  try {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const saveFile = JSON.parse(stored) as SaveFile
    if (!saveFile.savedAt) return null

    return new Date(saveFile.savedAt)
  } catch (error) {
    console.error('Failed to get last save time:', error)
    return null
  }
}

/**
 * Efface la sauvegarde
 */
export function clearGameSave(): void {
  try {
    if (typeof window === 'undefined') return
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear save:', error)
  }
}
