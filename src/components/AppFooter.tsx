import { memo } from 'react'

export const AppFooter = memo(function AppFooter() {
  const currentYear = new Date().getFullYear()

  return <footer className="site-footer">Startup Tycoon {currentYear}</footer>
})
