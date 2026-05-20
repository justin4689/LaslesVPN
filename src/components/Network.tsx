import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, Objects } from 'topojson-specification'
import worldData from '../assets/world-110m.json'

const EASE = [0.16, 1, 0.3, 1] as const

const WIDTH  = 960
const HEIGHT = 500

type VpnMarker = { coordinates: [number, number] }

const vpnMarkers: VpnMarker[] = [
  { coordinates: [ -74.0,   40.7] }, // New York
  { coordinates: [-118.2,   34.0] }, // Los Angeles
  { coordinates: [ -79.4,   43.7] }, // Toronto
  { coordinates: [ -46.6,  -23.5] }, // São Paulo
  { coordinates: [  -0.1,   51.5] }, // London
  { coordinates: [   2.3,   48.9] }, // Paris
  { coordinates: [   4.9,   52.4] }, // Amsterdam
  { coordinates: [   8.7,   50.1] }, // Frankfurt
  { coordinates: [  28.0,  -26.0] }, // Johannesburg
  { coordinates: [  55.3,   25.2] }, // Dubai
  { coordinates: [  72.8,   19.1] }, // Mumbai
  { coordinates: [ 103.8,    1.3] }, // Singapore
  { coordinates: [ 126.9,   37.6] }, // Seoul
  { coordinates: [ 139.7,   35.7] }, // Tokyo
  { coordinates: [ 151.2,  -33.9] }, // Sydney
]

export default function Network() {
  const { paths, projectedMarkers } = useMemo(() => {
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

    const projectedMarkers = vpnMarkers.map(({ coordinates }) => {
      const [x, y] = projection(coordinates) ?? [0, 0]
      return { x, y }
    })

    return { paths, projectedMarkers }
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
            {/* Country fills */}
            {paths.map(({ d, id }) => (
              <path
                key={id}
                d={d}
                fill="#DDE1EB"
                stroke="#FFFFFF"
                strokeWidth={0.5}
              />
            ))}

            {/* VPN server markers */}
            {projectedMarkers.map(({ x, y }, i) => (
              <g key={i}>
                {/* Pulsing ring */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={6}
                  fill="#F53855"
                  style={{ transformOrigin: `${x}px ${y}px` }}
                  animate={{ scale: [1, 3.5], opacity: [0.5, 0] }}
                  transition={{
                    duration: 2.4,
                    ease: 'easeOut',
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
                {/* Solid dot */}
                <circle cx={x} cy={y} r={4} fill="#F53855" />
                <circle cx={x} cy={y} r={1.5} fill="white" />
              </g>
            ))}
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
