import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, Objects } from 'topojson-specification'
import worldData from '../assets/world-110m.json'

const EASE = [0.16, 1, 0.3, 1] as const

const WIDTH  = 960
const HEIGHT = 500

// Bien répartis géographiquement — pas de cluster européen
const vpnMarkers: [number, number][] = [
  [ -122.4,  37.8],  // San Francisco
  [  -73.9,  40.7],  // New York
  [  -87.6,  41.9],  // Chicago
  [  -43.2, -22.9],  // Rio de Janeiro
  [   -3.7,  40.4],  // Madrid
  [   13.4,  52.5],  // Berlin
  [   37.6,  55.8],  // Moscou
  [   31.2,  30.1],  // Le Caire
  [   28.0, -26.2],  // Johannesburg
  [   55.3,  25.2],  // Dubaï
  [   72.8,  19.1],  // Mumbai
  [  104.0,  30.6],  // Chengdu
  [  139.7,  35.7],  // Tokyo
  [  103.8,   1.3],  // Singapour
  [  151.2, -33.9],  // Sydney
]

export default function Network() {
  const { paths, markers } = useMemo(() => {
    const projection = geoNaturalEarth1()
      .scale(153)
      .translate([WIDTH / 2, HEIGHT / 2])

    const pathGenerator = geoPath(projection)
    const topology = worldData as unknown as Topology<Objects>
    const countries = feature(topology, topology.objects.countries)

    const paths = (countries as GeoJSON.FeatureCollection).features.map(f => ({
      d: pathGenerator(f) ?? '',
      id: (f as any).id,
    }))

    const markers = vpnMarkers
      .map(coords => projection(coords))
      .filter(Boolean) as [number, number][]

    return { paths, markers }
  }, [])

  return (
    <section className="network" id="network">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="section-title">Huge Global Network<br />of Fast VPN</h2>
          <p className="section-desc">
            See LaslesVPN everywhere to make it easier for you when you move locations.
          </p>
        </motion.div>

        <motion.div
          className="network__map"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          >
            {/* Océan */}
            <rect width={WIDTH} height={HEIGHT} fill="#EEF2F7" />

            {/* Continents */}
            {paths.map(({ d, id }) => (
              <path
                key={id}
                d={d}
                fill="#C8CEDC"
                stroke="#FFFFFF"
                strokeWidth={0.7}
              />
            ))}

            {/* Marqueurs VPN */}
            {markers.map(([x, y], i) => (
              <g key={i}>
                {/* Anneau pulsant */}
                <motion.circle
                  cx={x} cy={y} r={7}
                  fill="#F53855"
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  animate={{ scale: [1, 3.2], opacity: [0.45, 0] }}
                  transition={{
                    duration: 2.4,
                    ease: 'easeOut',
                    repeat: Infinity,
                    delay: i * 0.22,
                  }}
                />
                {/* Point rouge */}
                <circle cx={x} cy={y} r={4.5} fill="#F53855" />
                {/* Centre blanc */}
                <circle cx={x} cy={y} r={1.8} fill="white" />
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
