import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="status">404</p>
      <h1>Erreur 404</h1>
      <p>Cette URL n'existe pas dans l'application.</p>
      <Link to="/" className="back-link">
        Retour a la page de jeu
      </Link>
    </section>
  )
}
