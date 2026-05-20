import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import heroImg from '../assets/hero.png'
import { useCountUp } from '../hooks/useCountUp'

const EASE = [0.16, 1, 0.3, 1] as const

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  }
}

function UsersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="9" cy="7" r="4" stroke="#F53855" strokeWidth="1.8" />
      <path d="M2 19c0-4 3-6 7-6" stroke="#F53855" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M14 13c3 0 6 2 6 6" stroke="#F53855" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="15" cy="9" r="3" stroke="#F53855" strokeWidth="1.8" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M11 2C7.69 2 5 4.69 5 8c0 5 6 12 6 12s6-7 6-12c0-3.31-2.69-6-6-6Z" stroke="#F53855" strokeWidth="1.8" />
      <circle cx="11" cy="8" r="2" stroke="#F53855" strokeWidth="1.8" />
    </svg>
  )
}

function ServerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2" y="3" width="18" height="5" rx="2" stroke="#F53855" strokeWidth="1.8" />
      <rect x="2" y="10" width="18" height="5" rx="2" stroke="#F53855" strokeWidth="1.8" />
      <circle cx="17" cy="5.5" r="1" fill="#F53855" />
      <circle cx="17" cy="12.5" r="1" fill="#F53855" />
    </svg>
  )
}

function StatItem({
  icon, target, label, delay,
}: {
  icon: React.ReactNode
  target: number
  label: string
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const count = useCountUp(target, 1600, inView)

  return (
    <motion.div
      ref={ref}
      className="hero__stat"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <div className="hero__stat-icon">{icon}</div>
      <div>
        <div className="hero__stat-value">{count}+</div>
        <div className="hero__stat-label">{label}</div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="about">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <motion.h1 className="hero__title" {...fadeUp(0.05)}>
              Want anything to be easy with <strong>LaslesVPN.</strong>
            </motion.h1>

            <motion.p className="hero__desc" {...fadeUp(0.2)}>
              Provide a network for all your needs with ease and fun using{' '}
              <strong>LaslesVPN</strong> discover interesting features from us.
            </motion.p>

            <motion.button
              className="btn-primary"
              initial={{ opacity: 0, y: 32 }}
              animate={{
                opacity: 1,
                y: 0,
                boxShadow: [
                  '0 8px 24px rgba(245,56,85,0.35)',
                  '0 14px 42px rgba(245,56,85,0.6)',
                  '0 8px 24px rgba(245,56,85,0.35)',
                ],
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.35, ease: EASE },
                y:       { duration: 0.7, delay: 0.35, ease: EASE },
                boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              }}
            >
              Get Started
            </motion.button>
          </div>

          <motion.div
            className="hero__image"
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          >
            <motion.img
              src={heroImg}
              alt="Person using LaslesVPN"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.div>
        </div>

        <div className="hero__stats">
          <StatItem icon={<UsersIcon />}    target={90} label="Users"     delay={0}    />
          <StatItem icon={<LocationIcon />} target={30} label="Locations" delay={0.15} />
          <StatItem icon={<ServerIcon />}   target={50} label="Servers"   delay={0.3}  />
        </div>
      </div>
    </section>
  )
}
