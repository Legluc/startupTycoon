'use client'

import { useState, useEffect } from 'react'

/**
 * Hook de debounce
 * Retarde l'exécution jusqu'à ce que l'utilisateur arrête de taper
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Programmer la mise à jour
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    // Cleanup : annuler le timeout si l'utilisateur tape à nouveau
    return () => clearTimeout(handler)
  }, [value, delayMs])

  return debouncedValue
}
