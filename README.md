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
3. tests
4. build

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
