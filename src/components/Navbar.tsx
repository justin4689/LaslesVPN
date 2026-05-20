import { useState } from 'react'
import { motion } from 'framer-motion'

function LogoIcon() {
  return (
    <svg width="30" height="36" viewBox="0 0 30 36" fill="none">
      <path d="M15 0C15 0 0 9 0 21C0 29.28 6.72 36 15 36C23.28 36 30 29.28 30 21C30 9 15 0Z" fill="#F53855" />
      <path d="M15 10C15 10 7 14.5 7 21C7 25.42 10.58 29 15 29C19.42 29 23 25.42 23 21C23 14.5 15 10Z" fill="white" opacity="0.75" />
    </svg>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <motion.header
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container navbar__inner">
        <div className="navbar__logo">
          <LogoIcon />
          <span className="navbar__brand">LaslesVPN</span>
        </div>

        <nav className={`navbar__nav${menuOpen ? ' open' : ''}`}>
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#help">Help</a>
        </nav>

        <div className="navbar__actions">
          <button className="btn-signin">Sign In</button>
          <button className="btn-signup">Sign Up</button>
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </motion.header>
  )
}
