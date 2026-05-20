import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

function NetflixLogo() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
      <text x="0" y="26" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="28" fill="#E50914" letterSpacing="-1">NETFLIX</text>
    </svg>
  )
}
function RedditLogo() {
  return (
    <svg width="110" height="32" viewBox="0 0 110 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#FF4500" />
      <path d="M27 16c0-1.38-1.12-2.5-2.5-2.5-.65 0-1.24.25-1.68.65C21.1 13.05 19.1 12.5 17 12.35l1.1-5.15 3.55.75c.05.9.8 1.62 1.72 1.62 1 0 1.78-.8 1.78-1.78S24.37 6 23.37 6c-.72 0-1.35.43-1.63 1.05l-4-.82c-.2-.04-.4.1-.44.32l-1.2 5.7c-2.15.1-4.2.65-5.88 1.73-.43-.4-1.03-.65-1.68-.65-1.38 0-2.5 1.12-2.5 2.5 0 1.02.6 1.9 1.5 2.3-.04.28-.06.56-.06.85 0 4.3 5 7.77 11.12 7.77 6.12 0 11.12-3.47 11.12-7.77 0-.29-.02-.57-.06-.85.9-.4 1.5-1.28 1.5-2.3Z" fill="white" />
      <circle cx="13.5" cy="17" r="1.5" fill="#FF4500" />
      <circle cx="18.5" cy="17" r="1.5" fill="#FF4500" />
      <text x="36" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="18" fill="#FF4500">reddit</text>
    </svg>
  )
}
function AmazonLogo() {
  return (
    <svg width="110" height="32" viewBox="0 0 110 32" fill="none">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="22" fill="#232F3E">amazon</text>
      <path d="M4 28 Q30 36 60 28" stroke="#FF9900" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M58 24 L62 28 L60 28" stroke="#FF9900" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function DiscordLogo() {
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
      <path d="M22.7 7.4A19.4 19.4 0 0 0 17.7 6c-.2.4-.5 1-.7 1.4a18.1 18.1 0 0 0-5.4 0C11.4 7 11.1 6.4 10.9 6a19.4 19.4 0 0 0-5 1.4C2.6 12.9 1.8 18.3 2.2 23.5c2.1 1.5 4.2 2.5 6.2 3.1.5-.7 1-1.4 1.4-2.2-.7-.3-1.4-.6-2.1-1l.5-.4c4 1.9 8.5 1.9 12.5 0l.5.4c-.7.4-1.4.7-2.1 1 .4.8.9 1.5 1.4 2.2 2-.6 4.1-1.6 6.2-3.1.5-5.9-1-11.2-4.1-16.1ZM9.3 20.3c-1.2 0-2.2-1.1-2.2-2.5 0-1.4 1-2.5 2.2-2.5 1.2 0 2.3 1.1 2.2 2.5 0 1.4-1 2.5-2.2 2.5Zm8.1 0c-1.2 0-2.2-1.1-2.2-2.5 0-1.4 1-2.5 2.2-2.5 1.2 0 2.3 1.1 2.2 2.5 0 1.4-1 2.5-2.2 2.5Z" fill="#5865F2" />
      <text x="30" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="17" fill="#5865F2">Discord</text>
    </svg>
  )
}
function SpotifyLogo() {
  return (
    <svg width="110" height="32" viewBox="0 0 110 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#1DB954" />
      <path d="M8 12.5c4.5-1.3 9.5-.4 13 2" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9 17c3.8-1 7.8-.2 10.5 1.8" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 21c2.8-.7 5.7 0 7.5 1.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <text x="36" y="22" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="17" fill="#1DB954">Spotify</text>
    </svg>
  )
}

const logos = [<NetflixLogo />, <RedditLogo />, <AmazonLogo />, <DiscordLogo />, <SpotifyLogo />]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const logoVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 0.5, y: 0, transition: { duration: 0.5, ease: EASE } },
}

export default function Partners() {
  return (
    <section className="partners">
      <div className="container">
        <motion.div
          className="partners__inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {logos.map((logo, i) => (
            <motion.div
              key={i}
              className="partner-logo"
              variants={logoVariants}
              whileHover={{ opacity: 1, scale: 1.05, filter: 'grayscale(0%)' }}
              style={{ filter: 'grayscale(100%)' }}
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
