import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

function StarIcon({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M7 1l1.8 3.6L13 5.1l-3 2.9.7 4.1L7 10l-3.7 2.1.7-4.1-3-2.9 4.2-.5Z"
        fill={filled ? '#FEA500' : '#DDDFE2'}
        stroke={filled ? '#FEA500' : '#DDDFE2'}
        strokeWidth="0.5"
      />
    </svg>
  )
}

const testimonials = [
  {
    name: 'Viezh Robert', location: 'Warsaw, Poland', rating: 4.5,
    text: '"Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best."',
    initials: 'VR', avatarColor: '#4F9CF9',
  },
  {
    name: 'Yessica Christy', location: 'Shanxi, China', rating: 4.5,
    text: '"I like it because I like to travel far and still can connect with high speed."',
    initials: 'YC', avatarColor: '#F96565',
  },
  {
    name: 'Kim Young Jou', location: 'Gwangju, South Korea', rating: 4.5,
    text: '"This is very unusual for my business that currently requires a virtual private network that has high security."',
    initials: 'KY', avatarColor: '#65D36E',
  },
]

const PAGE_SIZE = 3

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function Testimonials() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / PAGE_SIZE)
  const visible = testimonials.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE)

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="section-title">Trusted by Thousands of<br />Happy Customer</h2>
          <p className="section-desc">
            These are the stories of our customers who have joined with great
            pleasure when using this cozy feature.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className="testimonials__track"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {visible.map((t, i) => (
              <motion.div
                key={t.name}
                variants={cardVariants}
                className={`testimonial-card${i === 0 ? ' testimonial-card--active' : ''}`}
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}
              >
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar" style={{ background: t.avatarColor, color: '#fff' }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="testimonial-card__name">{t.name}</div>
                    <div className="testimonial-card__location">{t.location}</div>
                  </div>
                  <div className="testimonial-card__rating">
                    {[1, 2, 3, 4, 5].map(n => <StarIcon key={n} filled={n <= Math.floor(t.rating)} />)}
                    <span style={{ marginLeft: 4 }}>{t.rating}</span>
                  </div>
                </div>
                <p className="testimonial-card__text">{t.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="testimonials__nav">
          <div className="testimonials__dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                className={`dot${i === page ? ' dot--active' : ''}`}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
          <div className="testimonials__arrows">
            {[
              { dir: 'prev', d: 'M13 16l-6-6 6-6', disabled: page === 0, action: () => setPage(p => Math.max(0, p - 1)) },
              { dir: 'next', d: 'M7 4l6 6-6 6',  disabled: page === totalPages - 1, action: () => setPage(p => Math.min(totalPages - 1, p + 1)) },
            ].map(({ dir, d, disabled, action }) => (
              <motion.button
                key={dir}
                className={`arrow-btn${!disabled ? ' arrow-btn--active' : ''}`}
                onClick={action}
                disabled={disabled}
                aria-label={dir}
                whileHover={disabled ? {} : { scale: 1.1 }}
                whileTap={disabled ? {} : { scale: 0.9 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
