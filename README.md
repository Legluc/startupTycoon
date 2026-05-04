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

ajs_user_id                                                 - .clerk.com - 2027-05-04T13:03:46.000Z - non HttpOnly - non Sécrusisé - Lax SameSite
ajs_anonymous_id                                            - .clerk.com - 2027-05-04T13:03:46.000Z - non HttpOnly - non Sécrusisé - Lax SameSite
_gcl_au                                                     - .clerk.com - 2026-08-02T12:46:11.000Z - non HttpOnly - non Sécrusisé - vide SameSite
_ga_1WMF5X234K                                              - .clerk.com - 2027-06-08T12:46:12.840Z - non HttpOnly - non Sécrusisé - vide SameSite
_ga                                                         - .clerk.com - 2027-06-08T12:46:10.958Z - non HttpOnly - non Sécrusisé - vide SameSite
__client_uat                                                - .clerk.com - 2027-06-08T13:14:05.100Z - non HttpOnly - oui Sécrusisé - Lax SameSite
__client_uat_DvIHvy3E                                       - .clerk.com - 2027-06-08T13:14:05.100Z - non HttpOnly - oui Sécrusisé - Lax SameSite
ph_phc_q5TPT5kitT5x2OFKOo7yB3bLWm1ChE24asf8wJGM8cq_posthog  - .clerk.com - 2027-05-04T13:03:58.000Z - non HttpOnly - oui Sécrusisé - Lax SameSite
__cf_bm                                                     - .clerk.com - 2026-05-04T13:33:16.335Z - oui HttpOnly - oui Sécrusisé - Lax SameSite

## Quel est le rôle du cookie __session ?

Le cookie __session est un cookie HttpOnly géré par Clerk qui stocke la session utilisateur après authentification.

## Quels cookies voyez-vous ? Quels cookies ne voyez-vous pas ? Pourquoi ?

Visibles dans document.cookie :

__clerk_db_jwt (JWT pour le client)
clerk_active_context (contexte actif)
__client_uat (user access token côté client) 
__next_hmr_refresh_hash__ (internal Next.js)

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

Le token n'est pas stocké en mémoire côté client mais dans le cookie __session ou dans la ram temporaire quand on appel getToken() le temps de l'execution de la fonction.