import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

function LogoIcon() {
  return (
    <svg width="26" height="32" viewBox="0 0 30 36" fill="none">
      <path d="M15 0C15 0 0 9 0 21C0 29.28 6.72 36 15 36C23.28 36 30 29.28 30 21C30 9 15 0Z" fill="#F53855" />
      <path d="M15 10C15 10 7 14.5 7 21C7 25.42 10.58 29 15 29C19.42 29 23 25.42 23 21C23 14.5 15 10Z" fill="white" opacity="0.75" />
    </svg>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}
const colVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export default function Footer() {
  return (
    <footer className="footer" id="help">
      <div className="container">
        <motion.div
          className="footer__inner"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={colVariants}>
            <div className="footer__logo">
              <LogoIcon />
              <span className="footer__brand">LaslesVPN</span>
            </div>
            <p className="footer__desc">
              LaslesVPN is a private virtual network that has unique features and has high security.
            </p>
            <div className="footer__social">
              {[
                <path d="M10.5 3h2V1h-2C9.12 1 8 2.12 8 3.5V5H6v2h2v8h2V7h2l.5-2H10V3.5c0-.28.22-.5.5-.5Z" />,
                <path d="M17 3c-.6.3-1.2.5-1.9.6.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2 .8A3.2 3.2 0 0 0 9 6c0 .3 0 .5.1.7C6.1 6.6 3.5 5.2 1.7 3c-.3.5-.4 1-.4 1.6 0 1.1.5 2 1.4 2.6-.5 0-1-.2-1.4-.4v.1c0 1.5 1.1 2.8 2.5 3.1-.3.1-.5.1-.8.1l-.5-.1c.4 1.2 1.5 2 2.8 2C4.3 13 3 13.5 1.6 13.5c-.3 0-.6 0-.9-.1C2.2 14.6 3.7 15 5.3 15c6.3 0 9.8-5.3 9.8-9.8v-.4c.7-.5 1.2-1.1 1.7-1.8H17Z" />,
                <><rect x="2" y="2" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" /><circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.8" /><circle cx="13" cy="5" r="1" fill="currentColor" /></>,
              ].map((icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="footer__social-link"
                  whileHover={{ scale: 1.1, borderColor: '#F53855', color: '#F53855' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">{icon}</svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {[
            { title: 'Product', links: ['Download', 'Pricing', 'Locations', 'Server', 'Countries', 'Blog'] },
            { title: 'Engage',  links: ['LaslesVPN ?', 'Tutorial', 'About Us', 'Privacy Policy', 'Terms of Service'] },
            { title: 'Earn Money', links: ['Affiliate', 'Become Partner'] },
          ].map(col => (
            <motion.div key={col.title} variants={colVariants}>
              <div className="footer__col-title">{col.title}</div>
              <ul className="footer__links">
                {col.links.map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span>©2025 LaslesVPN</span>
          <span>Privacy Policy · Terms of Service</span>
        </motion.div>
      </div>
    </footer>
  )
}
