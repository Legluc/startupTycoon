# Startup Tycoon

Projet front-only en React + TypeScript + Vite.

## Stack

- React 19
- React Router
- Vite 8
- TypeScript
- ESLint + Prettier

## Lancer le projet

1. Installer les dependances:
   npm install
2. Demarrer le serveur de dev:
   npm run dev
3. Ouvrir l'URL affichee dans le terminal.

## Scripts utiles

- npm run dev: lancement en local.
- npm run lint: verification ESLint.
- npm run typecheck: verification TypeScript.
- npm run build: build de production.
- npm run preview: previsualisation du build.
- npm run format: formatage Prettier.

## Variables d'environnement

Copier .env.example vers un .env local puis ajuster les valeurs:

- VITE_APP_NAME: nom de l'application.

## Structure principale

- src/pages: ecrans de l'application (jeu, boutique, stats, parametres, 404).
- src/state: gestion d'etat globale.
- src/services: acces au stockage local.
- src/components: composants reutilisables.
- src/styles: gèrele styles global.

## Qualite et CI

Le workflow GitHub Actions execute automatiquement:

1. lint
2. typecheck
3. build

Fichier: .github/workflows/ci.yml

## Deploiement statique

Le projet produit des assets statiques dans dist/.
Tu peux deployer sur Vercel, Netlify ou GitHub Pages.

Commande de build:

npm run build

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
