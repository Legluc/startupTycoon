// lib/api.ts
// Client HTTP authentifié.
//
// apiFetch(path, getToken, options?) :
//   1. Récupère le JWT Clerk via getToken() (null si non connecté)
//   2. Ajoute automatiquement `Authorization: Bearer <token>` quand disponible
//   3. 401 → redirige vers /sign-in
//   4. 4xx / 5xx → throw avec le message d'erreur du backend

import { appConfig } from './config'

type GetToken = (() => Promise<string | null>) | null

export async function apiFetch<T = unknown>(
  path: string,
  getToken: GetToken,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  }

  if (getToken) {
    const token = await getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  const res = await fetch(`${appConfig.apiUrl}${path}`, {
    ...options,
    headers,
  })

  if (res.status === 401) {
    throw new Error('Non authentifié (401) — token absent ou expiré')
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(
      (body as { error?: string }).error ?? `Erreur HTTP ${res.status}`
    )
  }

  return res.json() as Promise<T>
}
