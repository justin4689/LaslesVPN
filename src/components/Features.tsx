import { motion } from 'framer-motion'
import heroImg from '../assets/hero.png'

const EASE = [0.16, 1, 0.3, 1] as const

function CheckIcon() {
  return (
    <svg className="check-icon" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#2FAB73" />
      <path d="M5.5 10.5l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const featuresList = [
  'Powerful online protection.',
  'Internet without borders.',
  'Supercharged VPN.',
  'No specific time limits.',
]

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}

const itemVariants = {
  hidden:  { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features__inner">
          <motion.div
            className="features__image"
            initial={{ opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <img src={heroImg} alt="Features illustration" />
          </motion.div>

          <div className="features__content">
            <motion.h2
              className="features__title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              We Provide Many Features You Can Use
            </motion.h2>

            <motion.p
              className="features__desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              You can explore the features that we provide with fun and have
              their own functions each feature.
            </motion.p>

            <motion.ul
              className="features__list"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {featuresList.map(feat => (
                <motion.li key={feat} variants={itemVariants} className="features__item">
                  <CheckIcon />
                  {feat}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  )
}
