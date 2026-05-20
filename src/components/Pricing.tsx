import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

function CheckIcon({ color = '#2FAB73' }: { color?: string }) {
  return (
    <svg className="check-icon" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill={color} />
      <path d="M5.5 10.5l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PackageIcon({ color = '#F53855' }: { color?: string }) {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="12" y="20" width="40" height="32" rx="4" fill={color} opacity="0.12" />
      <rect x="12" y="20" width="40" height="32" rx="4" stroke={color} strokeWidth="2" />
      <path d="M20 20v32M44 20v32" stroke={color} strokeWidth="2" opacity="0.4" />
      <rect x="24" y="10" width="16" height="10" rx="3" fill={color} opacity="0.3" />
      <rect x="24" y="10" width="16" height="10" rx="3" stroke={color} strokeWidth="2" />
      <circle cx="32" cy="36" r="4" fill={color} opacity="0.6" />
      <path d="M28 36h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

type Plan = {
  name: string
  price: string
  period?: string
  features: string[]
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: 'Free Plan', price: 'Free',
    features: ['Unlimited Bandwidth', 'Encrypted Connection', 'No Traffic Logs', 'Works on All Devices'],
  },
  {
    name: 'Standard Plan', price: '$9', period: '/ mo',
    features: ['Unlimited Bandwidth', 'Encrypted Connection', 'No Traffic Logs', 'Works on All Devices', 'Connect Anywhere'],
  },
  {
    name: 'Premium Plan', price: '$12', period: '/ mo', featured: true,
    features: ['Unlimited Bandwidth', 'Encrypted Connection', 'No Traffic Logs', 'Works on All Devices', 'Connect Anywhere', 'Get New Features'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="section-title">Choose Your Plan</h2>
          <p className="section-desc">
            Let's choose the package that is best for you and explore it happily and cheerfully.
          </p>
        </motion.div>

        <motion.div
          className="pricing__cards"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {plans.map(plan => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`pricing__card${plan.featured ? ' pricing__card--featured' : ''}`}
              whileHover={{ y: -6, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="pricing__icon">
                <PackageIcon color={plan.featured ? '#F53855' : '#2FAB73'} />
              </div>
              <div className="pricing__name">{plan.name}</div>
              <ul className="pricing__features">
                {plan.features.map(f => (
                  <li key={f} className="pricing__feature">
                    <CheckIcon color={plan.featured ? '#F53855' : '#2FAB73'} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="pricing__price">
                {plan.price}
                {plan.period && <span>{plan.period}</span>}
              </div>
              <button className="btn-outline-red">Select</button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
