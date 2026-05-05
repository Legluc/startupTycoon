'use client'

// Wrapper client qui installe QueryClientProvider.
// Doit être un Client Component car QueryClient n'est pas sérialisable.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRef } from 'react'
import type { ReactNode } from 'react'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000, // 30 s — données considérées fraîches pendant 30 s
        retry: 2, // 2 tentatives en cas d'erreur réseau
      },
    },
  })
}

export function QueryProvider({ children }: { children: ReactNode }) {
  // useRef évite de recréer le client à chaque rendu (SSR safe)
  const clientRef = useRef<QueryClient | null>(null)
  if (clientRef.current === null) {
    clientRef.current = makeQueryClient()
  }

  return (
    <QueryClientProvider client={clientRef.current}>
      {children}
    </QueryClientProvider>
  )
}
