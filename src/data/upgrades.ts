import type { Upgrade } from '../types/upgrade'

export const UPGRADES: Upgrade[] = [
  // ── $5 ──────────────────────────────────────────────────────────────
  {
    id: 'coffee',
    name: 'Café Serré',
    baseCost: 5,
    incomePerSecondGain: 0,
    clickValueGain: 1,
    count: 0,
    description: 'Un expresso bien tassé — +$1 par clic',
  },

  // ── $90 ─────────────────────────────────────────────────────────────
  {
    id: 'ergonomic-mouse',
    name: 'Souris Ergonomique',
    baseCost: 90,
    incomePerSecondGain: 0,
    clickValueGain: 3,
    count: 0,
    description: 'Précision chirurgicale — +$4 par clic',
  },

  // ── $120 ─────────────────────────────────────────────────────────────
  {
    id: 'intern',
    name: 'Stagiaire',
    baseCost: 120,
    incomePerSecondGain: 1,
    clickValueGain: 0,
    count: 0,
    description: 'Motivé mais peu payé — +$1/sec',
  },

  // ── $200 ────────────────────────────────────────────────────────────
  {
    id: 'mechanical-keyboard',
    name: 'Clavier Mécanique',
    baseCost: 200,
    incomePerSecondGain: 0,
    clickValueGain: 10,
    count: 0,
    description: "Le son des clics vaut de l'or — +$12 par clic",
  },

  // ── $400 ────────────────────────────────────────────────────────────
  {
    id: 'freelance',
    name: 'Freelance',
    baseCost: 400,
    incomePerSecondGain: 5,
    clickValueGain: 0,
    count: 0,
    description: 'Un indépendant sérieux — +$4/sec',
  },

  // ── $900 ────────────────────────────────────────────────────────────
  {
    id: 'dual-screen',
    name: 'Double Écran',
    baseCost: 900,
    incomePerSecondGain: 0,
    clickValueGain: 25,
    count: 0,
    description: 'Deux écrans = deux fois plus de productivité — +$35 par clic',
  },

  // ── $2 000 ──────────────────────────────────────────────────────────
  {
    id: 'developer',
    name: 'Développeur Junior',
    baseCost: 2000,
    incomePerSecondGain: 18,
    clickValueGain: 0,
    count: 0,
    description: 'Il code vite, parfois bien — +$18/sec',
  },

  // ── $5 000 ──────────────────────────────────────────────────────────
  {
    id: 'growth-hack',
    name: 'Growth Hack',
    baseCost: 5000,
    incomePerSecondGain: 0,
    clickValueGain: 110,
    count: 0,
    description: 'Chaque clic devient viral — +$110 par clic',
  },

  // ── $12 000 ─────────────────────────────────────────────────────────
  {
    id: 'dev-team',
    name: 'Équipe de Développement',
    baseCost: 12000,
    incomePerSecondGain: 90,
    clickValueGain: 0,
    count: 0,
    description: 'Une squad complète — +$90/sec',
  },

  // ── $30 000 ─────────────────────────────────────────────────────────
  {
    id: 'gaming-setup',
    name: 'Station Gaming Pro',
    baseCost: 30000,
    incomePerSecondGain: 0,
    clickValueGain: 380,
    count: 0,
    description: 'Setup à 30k$ pour des clics à 380$ — +$380 par clic',
  },

  // ── $70 000 ─────────────────────────────────────────────────────────
  {
    id: 'startup',
    name: 'Startup Junior',
    baseCost: 70000,
    incomePerSecondGain: 420,
    clickValueGain: 0,
    count: 0,
    description: 'Pivot, iterate, disrupt — +$420/sec',
  },

  // ── $180 000 ────────────────────────────────────────────────────────
  {
    id: 'ergonomics-lab',
    name: "Laboratoire d'Ergonomie",
    baseCost: 180000,
    incomePerSecondGain: 0,
    clickValueGain: 1400,
    count: 0,
    description: 'Recherche appliquée au doigt — +$1 400 par clic',
  },

  // ── $400 000 ────────────────────────────────────────────────────────
  {
    id: 'scaleup',
    name: 'Scale-up',
    baseCost: 400000,
    incomePerSecondGain: 2200,
    clickValueGain: 0,
    count: 0,
    description: 'On scale, baby — +$2 200/sec',
  },

  // ── $1 000 000 ──────────────────────────────────────────────────────
  {
    id: 'streamer-setup',
    name: 'Setup Streamer 8K',
    baseCost: 1000000,
    incomePerSecondGain: 0,
    clickValueGain: 6000,
    count: 0,
    description: 'Chaque clic est un event mondial — +$6 000 par clic',
  },

  // ── $2 500 000 ──────────────────────────────────────────────────────
  {
    id: 'unicorn',
    name: 'Licorne',
    baseCost: 2500000,
    incomePerSecondGain: 12000,
    clickValueGain: 0,
    count: 0,
    description: 'Valorisation fantasmagorique — +$12 000/sec',
  },

  // ── $8 000 000 ──────────────────────────────────────────────────────
  {
    id: 'neural-interface',
    name: 'Interface Neurale',
    baseCost: 8000000,
    incomePerSecondGain: 0,
    clickValueGain: 28000,
    count: 0,
    description: 'La pensée devient clic — +$28 000 par clic',
  },

  // ── $20 000 000 ─────────────────────────────────────────────────────
  {
    id: 'gafam-partnership',
    name: 'Partenariat GAFAM',
    baseCost: 20000000,
    incomePerSecondGain: 65000,
    clickValueGain: 0,
    count: 0,
    description: 'Les géants travaillent pour toi — +$65 000/sec',
  },

  // ── $80 000 000 ─────────────────────────────────────────────────────
  {
    id: 'digital-monopoly',
    name: 'Monopole Numérique',
    baseCost: 80000000,
    incomePerSecondGain: 180000,
    clickValueGain: 80000,
    count: 0,
    description: "Tu possèdes l'internet — +$180 000/sec & +$80 000 par clic",
  },

  // ── $400 000 000 ────────────────────────────────────────────────────
  {
    id: 'global-domination',
    name: 'Domination Globale',
    baseCost: 400000000,
    incomePerSecondGain: 600000,
    clickValueGain: 0,
    count: 0,
    description: 'Chaque pays paie sa redevance — +$600 000/sec',
  },

  // ── $2 000 000 000 ──────────────────────────────────────────────────
  {
    id: 'ai-singularity',
    name: 'Singularité IA',
    baseCost: 2000000000,
    incomePerSecondGain: 2000000,
    clickValueGain: 500000,
    count: 0,
    description:
      "L'IA autopilote l'économie mondiale — +$2M/sec & +$500k par clic",
  },
]
