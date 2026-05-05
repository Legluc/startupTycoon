# Startup Tycoon

Jeu inactif / clicker minimaliste construit avec React + TypeScript + Vite.
Gestion d'état globale via Context API, persistance localStorage, et optimisations de rendu.

## 🎮 Caractéristiques

- **Jeu inactif** : cliquez pour gagner de l'argent, achetez des upgrades pour générer des revenus automatiques
- **Persistance** : sauvegarde automatique toutes les 5 secondes + restauration au rechargement
- **Optimisé** : React.memo, useMemo, lazy loading, debounce pour éviter les re-renders inutiles
- **TypeScript** : typage strict pour plus de robustesse
- **Progressive** : chargement différé des pages lourdes (Shop, Stats)

## 📚 Stack Technique

- **React 19** : framework UI moderne avec hooks
- **React Router** : navigation SPA
- **TypeScript** : typage statique
- **Vite 8** : bundler ultra-rapide
- **ESLint + Prettier** : qualité de code
- **localStorage** : persistance sans backend

## 🚀 Démarrage Rapide

### Installation et développement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ouvrir l'URL affichée dans le terminal (ex: http://localhost:5173)
```

### Scripts utiles

```bash
npm run dev          # Serveur local avec rechargement automatique
npm run lint         # Vérification ESLint
npm run typecheck    # Vérification TypeScript
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run format       # Formatage Prettier
npm run lighthouse   # Audit de performance (si installé)
```

## 🔐 Configuration

### Variables d'environnement

Copier `.env.example` vers `.env.local` et ajuster les valeurs :

```bash
VITE_APP_NAME=Startup Tycoon
```

## 📁 Structure du Projet

```
src/
├── App.tsx                      # Configuration des routes
├── main.tsx                     # Point d'entrée
├── components/                  # Composants réutilisables
│   ├── AppLayout.tsx           # Layout principal (header, footer, outlet)
│   ├── AppHeader.tsx           # Navigation principale (mémorisé)
│   ├── AppFooter.tsx           # Footer (mémorisé)
│   ├── GameCounter.tsx         # Affichage money/income (mémorisé + useMemo)
│   ├── ClickButton.tsx         # Bouton principal (mémorisé)
│   ├── UpgradeCard.tsx         # Carte d'upgrade (mémorisé + custom comparator)
│   ├── SaveTimeDisplay.tsx     # Affichage date dernière sauvegarde
│   ├── MoneyDisplay.tsx        # Affichage argent (mémorisé)
│   ├── IncomeDisplay.tsx       # Affichage revenu/sec (mémorisé)
│   └── StatCard.tsx            # Carte statistique
├── pages/                       # Pages de l'application
│   ├── Game.tsx                # Page principale (clicker)
│   ├── Shop.tsx                # Boutique (lazy loaded)
│   ├── Stats.tsx               # Statistiques (lazy loaded)
│   ├── Settings.tsx            # Paramètres + gestion sauvegardes
│   └── NotFoundPage.tsx        # Page 404
├── lib/                         # Logique et contexte
│   ├── GameContext.tsx         # Context + Provider (état global)
│   ├── gameReducer.ts          # Reducer pour les actions
├── hooks/                       # Hooks personnalisés
│   ├── useAutoSave.ts          # Sauvegarde automatique (5s)
│   └── useDebounce.ts          # Debounce (recherche)
├── services/                    # Services métier
│   └── storage.ts              # Persistance localStorage (sauvegarde/chargement)
├── types/                       # Définitions TypeScript
│   ├── gameState.ts            # Types du state global
│   └── upgrade.ts              # Type Upgrade
├── data/                        # Données statiques
│   └── upgrades.ts             # Catalogue des upgrades
├── utils/                       # Fonctions utilitaires
│   ├── formatNumbers.ts        # Formatage (ex: 1000 → 1K)
│   └── calculateUpgradeCost.ts # Calcul coûts upgrades
├── styles/                      # CSS global
│   ├── theme.css               # Variables + styles globaux
│   ├── game-counter.css        # Styles compteur
│   ├── settings.css            # Styles settings
│   └── stats.css               # Styles stats
└── index.html                   # Point d'ancrage DOM (#root)
```

### Rôles des composants principaux

| Composant          | Rôle                              | Optimisation                       |
| ------------------ | --------------------------------- | ---------------------------------- |
| `GameCounter`      | Affiche money et income/sec       | React.memo + useMemo displayValues |
| `ClickButton`      | Bouton principal (augmente money) | React.memo                         |
| `UpgradeCard`      | Carte achetable (boutique)        | React.memo + custom comparator     |
| `AppHeader/Footer` | Navigation et footer              | React.memo (ne changent jamais)    |
| `SaveTimeDisplay`  | Affichage date sauvegarde         | React.memo + ticker interne        |

### Rôles des utilities

| Utilitaire               | Fonction                                             |
| ------------------------ | ---------------------------------------------------- |
| `formatNumbers()`        | Formate 1000 → "1K", 1000000 → "1M"                  |
| `calculateUpgradeCost()` | Calcule le coût d'un upgrade (formule exponentielle) |
| `useAutoSave()`          | Sauvegarde automatique toutes les 5 secondes         |
| `useDebounce()`          | Debounce pour la recherche (300ms)                   |

## ✅ Qualité et CI

Le workflow GitHub Actions exécute automatiquement :

1. **lint** : vérification ESLint (code styles)
2. **typecheck** : vérification TypeScript (typage)
3. **build** : build de production (détecte les erreurs)

Fichier : `.github/workflows/ci.yml`

Commande de build :

```bash
npm run build
npm run preview
```

---

## Dans quel fichier l’application est-elle “montée” dans le DOM ?

l'application est monté dans le fichier main.tsx

## Quel est le composant racine ?

c'est le composant App qui se trouve dans main.tsx

## Où est configuré le router ?

le router est configuré dans le App.tsx

## Quel élément HTML sert de point d’ancrage (id) ?

c'est une div d'id root dans index.html

## role des composants

- ClickButton est un bouton qui augmentera le moneyDisplay au click en fonction du clickValue.
- MoneyDisplay est un composant d'affichage du total de money qui a en props la money de base.
- IncomeDisplay est un composant d'affichage du total d'income qui a en props l'income de base.

## role des utils

- formatNumbers est une fonction de formatage des nombres qui format les milliers et millions.

## Où est créé l'interval ?

À l'intérieur du useEffect il est créé une fois quand le composant monte et recréé uniquement si l'incomePerSecond change.

## Quand est-il nettoyé ?

Grace à la fonction de clearInterval, dès que le composant est démonté lors de la navigation ou du reload et à chaque fois que le incomePerSecond change.

## Pourquoi c'est important ?

Si on ne clear pas a chaque tick on vas cumulé les intervals, lors de la navigation ou du reload l'interval est stopé sinon au chargement de la page on cumulerais les intervals également.

## Pourquoi un interval mal géré peut “accélérer le temps” du jeu ?

Car sans cleanup les intervals se cumul ce qui donne l'impression d'accélérer le temps en jeu

## setInterval met-il du code dans la Call Stack directement ?

Non le setInterval étant géré par une webApi il s'execute directement dans la Call Stack mais il retoune un id pour le timer.

## Où “attend” le callback du timer ?

Le callback du timer est planifié dans la macrotask queue.

## Pourquoi le timer peut-il être retardé si le thread principal est occupé ?

Le callback qui est dans la macrostack queue ne peut pas être éxécuté tant que la call stack n'est pas vide ce qui peut retardé le timer

## Où vivent money et incomePerSecond ?

Dans le composant AppLayout via useState. AppLayout est le parent de toutes les pages, donc c'est là qu'on centralise l'état du jeu.

## Shop et Game ont-ils besoin des mêmes données ?

Oui. Game les utilise pour :

- Afficher l'argent et le revenu/sec
- Générer de l'argent via le tick
- Augmenter l'argent au clic

Shop les utilise pour :

- Vérifier si on peut se permettre un upgrade
- Déduire le coût à l'achat
- Augmenter incomePerSecond

## Comment avez-vous fait pour partager ces données sans store global ?

Via React Context (GameContext). AppLayout possède l'état et le fournit à Game et Shop via le hook useGame().

## Qu'est-ce qui devient fragile dans votre solution actuelle ?

Le fait de ne pas avoir de persistence les données se réinitialisent au reload, les états locaux dans les pages Shop a son propre upgrades state, décalé avec AppLayout. Pas de sauvegarde possible donc le jeu ne peut pas continué après fermeture du navigateur.

## Schéma du flux

```
      (interaction utilisateur)
         clic / achat / tick
               │
               ▼
      View (Game, Shop, GameCounter)
               │
               │ dispatch(action)
               ▼
      Store (GameContext + useReducer)
               │
               │ action
               ▼
            gameReducer(state, action)
               │
               │ retourne un NOUVEL état
               ▼
              new GameState
   (money, clickValue, incomePerSecond, upgrades, stats)
               │
               │ propagation via Context
               ▼
      View (Game, Shop, GameCounter)
               │
               ▼
            render(View)
```

## Pourquoi ne pas sauvegarder à chaque tick sans throttle ?

Cela impacterais trop les performances les tick s'exécute toutes les 1 seconde, chaque TICK dispatch une action donc un nouvel état. Sans throttle = 1 sauvegarde localStorage par seconde, le localStorage étant synchrone il bloque le thread principal ce qui produit le ralentissement du jeu et des battements d'écran.

## Que se passe-t-il si le JSON est corrompu ?

J'ai fait une gestion d'erreur avec un try catch afin de vérifé si le JSON est corrompu ou incomplet. Si c'est le cas on renvoie simplement une nouvelle partie plutot que de crash.

## À quoi sert version dans la sauvegarde ?

La version sert en cas d'update du state si on rajoute, change ou supprime des données, dans ce cas on chargera une nouvelle partie plutot que de crash.

## Quelles données avez-vous choisi de sauvegarder, et pourquoi ?

j'ai choisie de sauvegardé les données suivante :
money: Le joueur a gagné cet argent, il faut le sauver
clickValue: Résultat d'achats (peut influencer futur earning)
incomePerSecond: Résultat d'achats (progression du joueur)
upgrades: Upgrades achetés = progression
totalClicks: part de la progression
totalEarned: part de la progression

C'est l'état complet du jeu. C'est le joueur qui l'a construit par ses actions. Si on perd ça le joueur perd tout son progrès.

## Qu'est-ce qui re-renderait "inutilement" avant optimisation ?

Le problème central : le TICK déclenche une réaction en chaîne de re-renders inutiles

- Chaque TICK déclenche un nouvel état dans GameContext
- GameContext change tous les composants abonnés re-rendrent
- Shop re-render tous les UpgradeCard re-rendrent même si leurs props n'ont pas changé
- GameCounter re-render recalcule formatNumber() 2 fois même si money/income n'ont pas changé
- ClickButton re-render recalcule formatNumber() même si clickValue n'a pas changé
- AppHeader et AppFooter re-render sans aucune raison
- Settings re-render toutes les secondes à cause du setState du useEffect

## Quelles optimisations ont eu un impact réel ?

Les 3 des optimisations avec un impact verifiable :
React.memo sur UpgradeCard + useMemo upgradesWithCosts avec 5 re-renders/TICK contre 0 re-renders/TICK si la props reste inchangées.
React.memo sur GameCounter + useMemo displayValues avec 1 re-renders/TICK contre 0 re-renders/TICK sauf si money/income changent réellement.
Lazy loading Shop + Stats qui lors du démarage de l'app divise casiment part 2 la charge.

## Quelle optimisation vous semble la plus rentable ?

React.memo sur UpgradeCard avec useMemo sur upgradesWithCosts car avec peut d'implémentation suplémentaire on élimine les re-render inutile ensuite le lazy load mais moins rentable car utile au chargement maus sur une app si petite c'est pas le plus rentable.

## Pourquoi le TICK est un bon révélateur de problèmes de perf ?

Le TICK est un bon révélateur de problèmes de perf car il est régulier et reproductible, pas d'aléatoire donc pour le controle c'est parfait. Il amplifie les problèmes, si un re-render inutile s'accumule toutes les 1s celà devient rapidement coûteux. Permet la mesure quantitative avec des console.log qui sont facilement identifiable.

## Quelles optimisations vous n'avez PAS faites, et pourquoi ?

La virtualisation des listes (windowing) pour les upgrades aurais pu etre faite mais au vue du petit nombre d'upgrade et du fait qu'elle ne soit pas re-render hormis dnas le cas ou elle devient achetable et ou elle est acheté ce n'est pas pertinent en rapport de gain / effort.
L'utilisation de Web worker pour faire du multi-thread mais il n'y a pas de calcul complexe à réalisé ici donc peut d'intéret ici aussi.

## Pourquoi le HTML est visible avant JS ?

Avec SSG (ou SSR), le serveur génère le HTML complet avant de l'envoyer au navigateur. Le navigateur reçoit un document déjà rempli : il peut l'afficher immédiatement, avant même de télécharger le moindre fichier JavaScript.

## Que fait l'hydration ?

L'hydration est l'étape où React prend le contrôle du HTML déjà rendu par le serveur. React ne re-render pas from scratch : il réconcilie le DOM existant avec son Virtual DOM. Si le HTML du serveur correspond exactement au rendu React attendu alors 0 modification du DOM. Si ça diverge "hydration mismatch" (warning ou erreur). Sur /public-stats, comme il n'y a aucun 'use client', il n'y a pas d'hydration — la page reste du HTML statique pur.

## Pourquoi SSR ≠ "pas de JS" ?

SSR/SSG détermine quand le HTML est produit, pas si JS est nécessaire. Une page Next.js avec des composants 'use client' envoie du HTML et du JS. Le JS sert à hydrater la page pour la rendre interactive.

## Qu’est-ce qui change pour le SEO ?

Je n'ai aucun changement dans lighthouse, j'ai 100% dans les deux cas. En revanche je sais qu'avec le SSG le html et les métadonnées étant rendu immédiatement à la différence du CSR donc le SSG est plus performant et plus sure dans une optique SEO.

## Qu’est-ce qui change pour FCP/LCP ?

En SSG le FCP est limité par la latence réseau uniquement (Time To First Byte). En CSR il est limité par TTFB + download JS + parse + execute + render. Donc on peut conclure que le SSG est plus performant et plus sure pour un rendu rapide.

## Quels sont les coûts côté serveur ?

SSG est le meilleur des deux mondes pour des données qui changent peu : coût serveur nul (CDN), HTML visible immédiatement. La contrepartie est que pour mettre à jour les stats, il faut rebuilder. C'est pourquoi public-stats.json serait idéalement alimenté par un script au moment du déploiement ou basculé sur une route api pour le rendre dynamique.

## Les cookies Clerk

ajs_user_id - .clerk.com - 2027-05-04T13:03:46.000Z - non HttpOnly - non Sécrusisé - Lax SameSite
ajs_anonymous_id - .clerk.com - 2027-05-04T13:03:46.000Z - non HttpOnly - non Sécrusisé - Lax SameSite
\_gcl_au - .clerk.com - 2026-08-02T12:46:11.000Z - non HttpOnly - non Sécrusisé - vide SameSite
\_ga_1WMF5X234K - .clerk.com - 2027-06-08T12:46:12.840Z - non HttpOnly - non Sécrusisé - vide SameSite
\_ga - .clerk.com - 2027-06-08T12:46:10.958Z - non HttpOnly - non Sécrusisé - vide SameSite
**client_uat - .clerk.com - 2027-06-08T13:14:05.100Z - non HttpOnly - oui Sécrusisé - Lax SameSite
**client_uat_DvIHvy3E - .clerk.com - 2027-06-08T13:14:05.100Z - non HttpOnly - oui Sécrusisé - Lax SameSite
ph_phc_q5TPT5kitT5x2OFKOo7yB3bLWm1ChE24asf8wJGM8cq_posthog - .clerk.com - 2027-05-04T13:03:58.000Z - non HttpOnly - oui Sécrusisé - Lax SameSite
\_\_cf_bm - .clerk.com - 2026-05-04T13:33:16.335Z - oui HttpOnly - oui Sécrusisé - Lax SameSite

## Quel est le rôle du cookie \_\_session ?

Le cookie \_\_session est un cookie HttpOnly géré par Clerk qui stocke la session utilisateur après authentification.

## Quels cookies voyez-vous ? Quels cookies ne voyez-vous pas ? Pourquoi ?

Visibles dans document.cookie :

**clerk_db_jwt (JWT pour le client)
clerk_active_context (contexte actif)
**client_uat (user access token côté client)
**next_hmr_refresh_hash** (internal Next.js)

Les cookies non visibles sont HttpOnly car ils sont intentionnellement invisibles au JavaScript. Le navigateur les envoie automatiquement dans les headers HTTP, mais aucun script JS ne peut les lire.

## Décrivez les 3 parties : header, payload, signature.

{
"alg": "RS256",
"cat": "cl_B7d4PD111AAA",
"kid": "ins_3DGC6RbgQaOglagDsLk6LCFM35J",
"typ": "JWT"
}

{
"azp": "http://localhost:3000",
"exp": 1777905667,
"fva": [
85,
-1
],
"iat": 1777905607,
"iss": "https://balanced-chamois-79.clerk.accounts.dev",
"nbf": 1777905597,
"sid": "sess_3DGFRsC6DifD8ixBMuzDhZ854TQ",
"sts": "active",
"sub": "user_3DGDPJWoHeW2vdGyTqRFP1g7ysm",
"v": 2
}

{
"e": "AQAB",
"kty": "RSA",
"n": "s2wq94ln9t_k0e5BnLrRqpI2iu3YD6-3vEVWztQ312iHO4OakrkmcIVlDmi6IML04XXPTwy_mVblMAHqH1e4z1MPkz_sHqh30_OML2zmxHMApWjUnwRid1_irKShBabql2RLDX1RxBJYlLtXytYXe-XtTqA8PFmFUdggvM0s_xb1dsH5biPky5OsC61Rf9Ck4G32PqHvk8D7I42ypyNubnczInY5pD6060fc7WgOvZVi2a0Hj7l5M7Ad8Knr8BRhZPclDnYuq5pGTgzJSjg8yvlWMCrdSSc8YFEzL7rGnBZ663KTeKgiCnzFh60CF5ZDn1vD1IftAwzSbu0_SsDUOw"
}

## Quel algorithme de signature est utilisé ?

c'est l'algorithme RS256 qui est utilisé

## Quelles informations sont dans le payload ?

Le payload contient les informations de session et d'identité :

sub : identifiant unique de l'utilisateur (user_3DGDPJWoHeW2vdGyTqRFP1g7ysm)
sid : identifiant de session (sess_3DGFRsC6DifD8ixBMuzDhZ854TQ)
iss : autorité émettrice (Clerk)
iat : timestamp d'émission (1777905607)
exp : timestamp d'expiration (1777905667)
nbf : not before - le token n'est valide qu'après ce timestamp
azp : authorized party - l'application autorisée (http://localhost:3000)
sts : statut de la session (active)
fva : facteurs de vérification d'authentification

## Peut-on modifier le payload côté client pour se faire passer pour un autre user ?

Non, c'est impossible la signature RS256 sera invalide. En modifiant le payload le serveur reçevrait le token modifié la signature ne correspondrais pas et le token serait rejeté.
RS256 utilise une clé privée (côté Clerk) pour signer et une clé publique (partagée) pour vérifier. Impossible de re-signer sans la clé privée.

## Quelle est la durée de vie du token ?

exp (expiration) : 1777905667
iat (issued at) : 1777905607
Durée = 60 secondes

## Quand votre application appelle un endpoint de votre API backend, quel header est ajouté pour l'authentification ?

On ajoute le header Authorization: Bearer token est ajouté.

## Où le token est-il stocké en mémoire côté client ?

Le token n'est pas stocké en mémoire côté client mais dans le cookie \_\_session ou dans la ram temporaire quand on appel getToken() le temps de l'execution de la fonction.

## Quel middleware vérifie le JWT ? Comment fonctionne-t-il ?

C'est le middleware requierAuth() il extrait le header Authorisation et l'envoie a verifyBearer(), si le JWT est valide alors il attache req.auth = { userID, claims } et appel ensuite next() et si il est invalide retroune une 401.

## Comment le serveur sait-il que le token est valide sans appeler Clerk à chaque requête ?

Le serveur utilise la clé publique de Clerk et un cache local. Avec createRemoteJWKSet() de la lib jose on télécharge les clés publiques une fois depuis https://<issuer>/.well-known/jwks.json, elles sont stockées dans \_jwks. Ensuite jwtVerify() utilise cette clé publique pour vérifier la signature RSA localement sans appel externe.

## Où est stocké le `user_id` une fois le token vérifié ?

Dans req.auth.userId, on extrait le claim payload.sub et le met dans la variable userId retournée, ensuite il est accessible.

## Que renvoie le serveur si on appelle `/api/games/me` sans header Authorization ?

Réponse 401 avec un message d'erreur, c'est verifyBearer() qui lance l'erreur.

## Y a-t-il une validation du `score` envoyé par le client (plafond, cohérence avec la durée) ? Quel problème ça pose si non ?

Non il validation de cohérence, on valide unique que le score existe et qu'il est >= 0 et que la duration est comprise entre 0 et 86400 secondes. Le probleme est la triche prossible, en faisant un call api avec un score démesuré le serveur accepterait en faisant confiance au client.

## Qu'est-ce qu'un state client ? Donnez 2 exemples dans votre projet actuel

Le state client est l'état géré dans le navigateur en js, qui n'existe que pour cette session utilisateur et ne persiste pas au-delà du rechargement sauf le localStorage.
Money en cours de partie fait partie de GameState, au click le reduceur met a jour money il est ensuite sauvegardé localement via useAutoSave dans le localStorage toutes les 5s.
Dans GameContext un setInterval() dispatche le Tick chaque seconde, c'est du state client il est géré en mémoire, pas de serveur impliqué et réactif instantanément.

## Qu'est-ce qu'un state serveur ? Donnez 2 exemples (leaderboard, historique).

Le state serveur est l'état qui vit sur le serveur/DB, partagé entre tous les utilisateurs, persistent au-delà d'une session. C'est du state serveur global, partagé entre tous les joueurs, persiste en DB, demande un call à /api/leaderboard pour être à jour.
C'est du state serveur chaque partie finalisée est insérée en DB, elle persiste, elle est accessible depuis n'importe quel appareil du même user.

## Pourquoi `useState` + `useEffect` + `fetch` (ou `ref` + `onMounted` + `fetch` en Vue) est un anti-pattern pour gérer les données serveur ?

Parce que cette approche naïve réinvente mal la roue et laisse plein de bugs. Pourquoi c'est mauvais ?
Gestion d'erreur manuelle ce qui créé des oublis fréquents.
Race conditions, si la requête prend 5s et l'utilisateur navigue ailleurs.
Pas de cache à chaque mount un fetch c'est ineficace.
Déduplication impossible, 2 composants = 2 fetches identiques.
Refetch manuel compliqué vérifier si les données sont "stale" c'est complexe.
Invalidation besoin d'un système maison pour dire "les données ont changé, refetch".

## Listez 3 problèmes que cette approche naïve ne résout pas : cache, déduplication, refetch en arrière-plan, gestion d'erreur, loading state, invalidation…

Problème 1 : Pas de cache, utiliser Leaderboard sur la page 1 puis naviguer ailleurs pour revenir engendre un refetch. Mauvaise UX cela génère du temps de chargement inutile en plus de la charge serveur. La solution serait un cache global qui persiste entre remontages.
Problème 2 : Déduplication impossible ce qui produit une charge inutile du réseau et un risque de désynchronisation (l'un des deux reçoit des données obsolètes). La solution dédupliquer automatiquement, si un fetch est déjà en cours on partage sa promesse.
Problème 3 : Pas d'invalidation = données stale. L'utilisateur ne voit pas son score sur le leaderboard immédiatement, les données peuvent être trompeuse et on a besoin de hard-refresh manuellement ou d'attendre un timeout. La solution serait d'invalidé quand on POST un score, dire au cache "la donnée /api/leaderboard a changé, refetch".

## Pouvez-vous voler le cookie de session Clerk ? Pourquoi pas ?

Non car il est HttpOnly ce qui signifie que ce cookie n'est accessible que via HTTP (côté serveur), JavaScript du navigateur ne peut pas le lire. L'attaquant ne peut voler que les cookies non-HttpOnly (client_uat, ajs_user_id), qui ne sont que des identifiants de tracking, pas la session d'authentification

## Imaginez que le cookie soit en `HttpOnly: false`. Quel serait l'impact ?

Session hijacking (usurpation d'identité)
Vol de données personnelles
Actions malveillantes en ton nom
Accès aux endpoints /api/games/me (privés)

## Clerk stocke-t-il le JWT en `localStorage` ? Vérifiez. Pourquoi est-ce un choix défensif ?

Non Clerk stocke la session dans le cookie \_\_session (HttpOnly), pas le JWT brut. Le JWT est temporaire et regénéré dynamiquement via getToken() au besoin.

## Si votre API acceptait un POST `/api/games` basé sur le cookie de session automatique, un site malveillant pourrait-il forcer votre navigateur à le déclencher ?

Oui. C'est exactement le risque CSRF (Cross-Site Request Forgery / falsification de requête intersite).

1. Vous êtes connecté à `http://localhost:3001` (Startup Tycoon)
2. Votre navigateur stocke le cookie `__session` (HttpOnly, mais envoyé automatiquement)
3. Vous ouvrez `file:///C:/attack.html` dans un nouvel onglet
4. Le formulaire se soumet vers `http://localhost:3000/api/games`
5. Le cookie `__session` est envoyé automatiquement avec la requête
6. Si l'API faisait confiance au cookie, la fake game serait enregistrée

## Pourquoi le cookie est envoyé ?

- Les cookies sont envoyés automatiquement par le navigateur avec chaque requête (même cross-origin)
- C'est la nature des cookies : ils sont attachés à chaque requête du même origin
- Même si la requête vient d'une autre page, le navigateur voit que c'est pour localhost:3000 le cookie correspond alors il l'envoie

## Quelle serait la différence si votre API utilisait le cookie `__session` au lieu du header `Authorization: Bearer` ?

Si l'API utilisait seulement le cookie `__session` :

Avec cookie automatique

- L'attaque CSRF marche
- Le formulaire HTML envoie le cookie automatiquement
- L'API accepte la fausse game
- Le score du faux joueur apparaît sur le leaderboard

Avec header `Authorization: Bearer`

- L'attaque CSRF échoue
- Le formulaire HTML ne peut pas ajouter le header `Authorization` (protection XHR Cross-Origin)
- La requête POST n'a pas de token valide
- L'API rejette avec 401 Unauthorized

## Qu'est-ce que `SameSite=Lax` et `SameSite=Strict` ? Regardez le cookie Clerk, quelle valeur est utilisée ?

`SameSite` est un attribut de cookie qui contrôle quand le cookie est envoyé lors de requêtes cross-site.

`SameSite=Strict` Le cookie n'est envoyé uniquement si la requête vient du même site (même URL).
Par contre l'utilisateur arrive sur votre site sans cookie, doit se reconnecter (mauvaise expérience)

`SameSite=Lax` le cookie est envoyé sauf pour les mutations cross-site (POST, PUT, DELETE),

Cas autorisés

- Navigation (lien cliqué) - cookie envoyé
- GET cross-origin - cookie envoyé
  L'utilisateur peut cliquer sur un lien de votre app depuis un autre site, arrive avec session intacte.

Le cookie est en Lax pour Clerk

### Vérification — Quel attribut Clerk utilise-t-il ?

Pour Clerk la valeur est `Lax` par défaut, ce qui signifie que les Liens/navigation cross-site = cookie envoyé et que les formulaires POST cross-site = cookie bloqué

## Pourquoi notre API est-elle protégée par design en utilisant `Authorization: Bearer` plutôt qu'un cookie automatique ?

Les cookies sont envoyés automatiquement, les headers ne sont jamais envoyés cross-origin (par défaut) et pour envoyer un header cross-origin, il faut :

1. CORS preflight : `OPTIONS` request pour demander permission
2. Server accepte : `Access-Control-Allow-Origin: *` OU `Access-Control-Allow-Headers: Authorization`
3. Seulement alors : le navigateur envoie la vraie requête

Le backend ne fait pas de `Access-Control-Allow-Headers: Authorization` pour les cross-origin, donc impossible d'envoyer le header !

## Qu'est-ce qu'un double-submit token ? Dans quels cas est-il nécessaire ?

Un double-submit token (aussi appelé "CSRF token" ou "state token") est une valeur aléatoire que le serveur génère pour l'utilisateur, puis valide sur chaque mutation.

Attaquant ne peut pas :

- Lire le CSRF token (stocké en server-side session, pas en cookie)
- Générer un token valide (le serveur connaît seulement les tokens qu'il a émis)
- Envoyer une requête sans token (le backend refuse)

| Cas                                              | Nécessaire | Raison                                                      |
| ------------------------------------------------ | ---------- | ----------------------------------------------------------- |
| Mutations basées sur cookies (POST, PUT, DELETE) | OUI        | Cookie envoyé auto, besoin de double-check                  |
| Mutations avec Authorization: Bearer             | NON        | Header ne peut pas être envoyé cross-origin                 |
| GET requests                                     | NON        | GET ne doit pas modifier, mais + sûr = faire `SameSite=Lax` |
| SPA (React) + Bearer token                       | NON        | Même raison que Bearer (header ≠ cookie)                    |

## Que bloque `default-src 'self'` ?

`default-src 'self'` bloque tout ce qui ne provient pas du même origin : scripts cross-origin, stylesheets, iframes, fonts, images, fetch/XHR vers des domaines externes. C'est la directive par défaut pour tout ce qui n'est pas explicitement autorisé. Concrètement, un `<script src="https://cdn.example.com/lib.js"></script>` sera refusé, un CDN non whitelist ne charge pas, un `fetch()` vers un domaine étranger échoue.

## Pourquoi `connect-src` inclut `http://localhost:3000` et `ws://localhost:3000` ? (anticipation TP 14)

`connect-src` contrôle où les requêtes fetch/XHR/WebSocket peuvent aller. En dev, l'app (localhost:3001) doit pouvoir appeler l'API backend (localhost:3000) en HTTP. Le `ws://` est anticipation pour TP 14 où l'on implémenteras WebSockets pour le multijoueur temps réel — sans cette directive, le handshake WebSocket serait bloqué.

## Qu'est-ce que `'unsafe-inline'` pour `style-src` ? Pourquoi est-ce un compromis courant mais problématique ?

`'unsafe-inline'` permet les styles inline directement dans le HTML (`<div style="color: red">`). C'est un compromis parce que Next.js/Tailwind/styled-components injectent du CSS dynamiquement et c'est plus facile que de tout refactoriser. Le problème : XSS devient dévastateur. Si un attaquant inject `<div style="background: url('javascript:alert(1)')">`, il peut exécuter du JS.

## Tentez d'ajouter un `<script>alert(1)</script>` inline dans votre HTML. Que se passe-t-il avec la CSP activée ?

Le script est bloqué silencieusement. Aucune erreur, aucun alert. Le navigateur refuse son exécution et log dans la console : `Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-...'), or a nonce ('nonce-...') is required to enable inline execution.` C'est la force de CSP : pas de breakage, juste du silent-fail qui empêche l'XSS.

## Quel header préférer en production : `Content-Security-Policy` ou `Content-Security-Policy-Report-Only` ? Dans quel ordre les déployer ?

En production : `Content-Security-Policy` (le vrai header, qui bloque). L'ordre de déploiement idéal : d'abord déployer en `Report-Only` pendant 1-2 jours pour observer les violations et éventuellement ajuster. Puis basculer sur le header strict. Si vous déployez directement `Content-Security-Policy` sans test, vous risquez de casser votre app (une police mal configurée peut bloquer vos propres ressources).

## Citez 3 choses que Clerk vous a économisées (vs auth maison)

1. Gestion de sessions complexe : Clerk gère les cookies HttpOnly, les JWTs, les refresh tokens, le logout global, les multiples appareils — vous auriez dû implémenter tout ça avec des bugs potentiels (race conditions, invalidations manquées).
2. TOTP et MFA : Authentification multifacteurs avec codes temps réel est complexe à sécuriser. Clerk le fait nativement via l'UI composable.
3. Récupération de compte et changement d'email : Vérification d'email, réinitialisation de mot de passe avec liens temporaires, rotation de secrets — Clerk centralise tout, vous n'aviez qu'à l'appeler.

## Citez 3 choses que vous n'avez pas apprises à cause de Clerk

1. Hachage de mot de passe : Vous n'avez jamais utilisé bcrypt ou Argon2, vous ne savez pas pourquoi `password === userPassword` est une faille critique, vous ne connaissiez pas les itérations/coûts.
2. Génération et invalidation de sessions : Vous n'avez jamais écrit le code qui crée un cookie, le valide, le retire, gère l'expiration. C'est une boîte noire pour vous.
3. Chiffrement de tokens et key rotation : Vous ne savez pas comment Clerk signe les JWTs avec RS256, comment les clés publiques sont rotées, pourquoi la signature RSA est importante.

## Si vous deviez implémenter l'auth sans Clerk, quels seraient les 5 points critiques ?

1. Hachage sécurisé des mots de passe : bcrypt/Argon2 avec cost factor approprié, jamais de plaintext ou SHA-1.
2. Génération de sessions : UUID v4 ou token cryptographiquement sûr, stocké en DB, lié à userId, avec expiration.
3. Refresh tokens et access tokens : Deux lifetimes différents (access = 15min, refresh = 7 jours), rotation des refresh tokens.
4. HTTPS obligatoire : Les cookies de session DOIVENT être Secure (HTTPS only), HttpOnly, SameSite=Strict.
5. Invalider les sessions à la déconnexion : Supprimer la row en DB, nettoyer les cookies, et aussi du côté client (localStorage, etc.).

## Pourquoi TanStack Query n'est pas "un fetch plus pratique" ?

TanStack Query n'est pas un wrapper sur fetch. C'est une machine à états complète pour les données serveur. Il gère le cache global (pas de fetch inutile), la déduplication (si 2 composants demandent la même data pendant qu'elle charge, une seule requête), la staleTime/gcTime (quand invalider les données), les background refetch (rafraîchir sans UI loader), l'optimistic update (afficher le changement avant serveur). Un "fetch plus pratique" serait juste ajouter une UI loader. TanStack Query vous force à penser aux états de données : fresh, stale, invalidated, loading, error, success — c'est fondamentalement différent.

## Quelle est la différence entre authentification et autorisation ? Votre app gère-t-elle les deux ?

Authentification = "Qui êtes-vous ?" (vérifier l'identité). Votre app le fait avec Clerk : qui êtes-vous ? OK, vous êtes user_3DGD..., on vous délivre un JWT.
Autorisation = "Vous avez le droit de faire ça ?" (vérifier les permissions). Votre app le fait partiellement : `/api/games` ne demande qu'une auth valide, mais elle ne distingue pas les rôles (admin vs joueur normal). Techniquement, tout utilisateur authentifié peut appeler `/api/games` et `/api/leaderboard`.

Au TP 14, vous allez implémenter l'autorisation : certains joueurs seront modérateurs, ils pourront supprimer des scores frauduleux.

## Le backend fourni fait-il confiance au score envoyé par le client ? Pourquoi ce sera différent au TP 14 ?

Actuellement : Oui, le backend valide que score ≥ 0 et duration ≤ 86400, mais il n'y a aucune cohérence. Un client peut envoyer score=999999 et duration=1 (physiquement impossible), le backend accepte parce qu'il fait confiance. C'est volontaire pour TP 13 — le TP se concentre sur l'authentification/XSS, pas la validation métier complète.

Au TP 14 : Vous allez implémenter une cohérence score/duration. Si un joueur a un clickValue maximal de 10/click et joue 300 secondes sans upgrades, le score max physiquement possible est ~3000. Si le client envoie 999999, le backend rejette car c'est impossible. Cela prévient la triche simple. Vous apprendrez aussi à implémenter un système d'anti-cheat (serveur trace les patterns, calcule les probabilités, etc.).
