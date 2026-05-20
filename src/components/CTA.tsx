import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <motion.div
          className="cta-box"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.h2
            className="cta-box__title"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            Subscribe Now for<br />Get Special Features!
          </motion.h2>

          <motion.div
            className="cta-box__btn"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          >
            <p style={{ color: '#4F5665', marginBottom: 24, fontSize: 16 }}>
              Let's subscribe with us and find the fun.
            </p>
            <motion.button
              className="btn-primary"
              animate={{
                boxShadow: [
                  '0 8px 24px rgba(245,56,85,0.35)',
                  '0 14px 42px rgba(245,56,85,0.6)',
                  '0 8px 24px rgba(245,56,85,0.35)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Subscribe Now
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9h10M10 5l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
