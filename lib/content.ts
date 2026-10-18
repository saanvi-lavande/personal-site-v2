export const site = {
  name: 'Saanvi Lavande',
  role: 'IEOR @ UC Berkeley',
  tagline:
    'Welcome to my little corner of the internet, where I share the ideas I believe in, the things I build, and the problems I’m excited to solve.',
  location: 'Berkeley, CA',
  email: 'saanvi.lavande@berkeley.edu',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/saanvi-lavande/' },
  ],
}

export const about = {
  paragraphs: [
    'I chose to enroll in Berkeley because I wanted to be somewhere that did more than teach me how the world works. I wanted to learn how to *change* it.',
    "From making healthcare more human to making the world more accessible through technologies like autonomous vehicles, I'm invested in ideas that do more than solve problems; they change the systems that shape our lives. Outside of engineering, I love poetry, architecture, and art, especially surrealism. I’m fascinated by the familiar made strange, and the ordinary made beautiful.",
    'Whether through engineering or art, I seek out new ways of perceiving the world, and the ideas that emerge when we learn to look at it differently.',
  ],
}

export const projects = [
  {
    index: '01',
    title: 'Route Lattice',
    year: '2026',
    description:
      'A fleet routing engine that re-solves vehicle routing problems in milliseconds as new orders and traffic arrive.',
    tags: ['Optimization', 'VRP', 'Rust'],
    href: '#',
  },
  {
    index: '02',
    title: 'Occupancy',
    year: '2025',
    description:
      'An open-source occupancy grid visualizer for lidar point clouds, built to debug perception stacks.',
    tags: ['Perception', 'Lidar', 'WebGL'],
    href: '#',
  },
  {
    index: '03',
    title: 'Pick Path',
    year: '2024',
    description:
      'A scheduling layer for warehouse robots that cut idle time by assigning tasks with mixed-integer programming.',
    tags: ['Robotics', 'MILP', 'Python'],
    href: '#',
  },
  {
    index: '04',
    title: 'Form System',
    year: '2023',
    description:
      'A geometric design system and component library for complex operational dashboards.',
    tags: ['Design', 'Systems', 'React'],
    href: '#',
  },
]

export const experience = [
  {
    period: '2024 — Now',
    role: 'Founder & CEO',
    company: 'Your Company',
    location: 'Berkeley, CA',
    description:
      'Building optimization infrastructure for autonomous fleets. Leading product, design, and go-to-market.',
    highlights: [
      'Took the product from idea to first paying pilot customers.',
      'Built the founding team and the core routing engine.',
    ],
  },
  {
    period: '2023 — 2024',
    role: 'Supply Chain Optimization Intern',
    company: 'Logistics Inc.',
    location: 'San Francisco, CA',
    description:
      'Modeled network flows and inventory placement for a regional distribution network.',
    highlights: [
      'Built a mixed-integer model that cut projected transport costs by 8%.',
      'Turned model outputs into dashboards operators actually used.',
    ],
  },
  {
    period: '2022 — 2023',
    role: 'Research Assistant, Drug Discovery',
    company: 'Chemical Biology Lab',
    location: 'Berkeley, CA',
    description:
      'Screened small-molecule candidates and automated parts of the lab’s data pipeline.',
    highlights: [
      'Wrote analysis scripts that turned days of manual work into minutes.',
      'Co-authored a poster presented at a university research symposium.',
    ],
  },
  {
    period: '2021 — 2022',
    role: 'Product Design Fellow',
    company: 'Berkeley Startup Ecosystem',
    location: 'Berkeley, CA',
    description:
      'Designed interfaces for early-stage healthcare and mobility startups.',
    highlights: [
      'Shipped design systems for two seed-stage teams.',
      'Ran user interviews with clinicians and fleet operators.',
    ],
  },
]

export { posts } from './posts'

export const photos = [
  { src: '/view/bridge.png', alt: 'Suspension bridge cables converging against a pale sky', caption: 'Tension', place: 'San Francisco' },
  { src: '/view/stairs.png', alt: 'Concrete staircase from above with long diagonal shadows', caption: 'Descent', place: 'Lisbon' },
  { src: '/view/highway.png', alt: 'Light trails curving through a highway interchange at night', caption: 'Flow', place: 'Los Angeles' },
  { src: '/view/facade.png', alt: 'White modernist facade with a repeating window grid', caption: 'Grid', place: 'Berlin' },
  { src: '/view/robot.png', alt: 'Industrial robotic arm casting geometric shadows in a white lab', caption: 'Actuator', place: 'Pittsburgh' },
  { src: '/view/desert.png', alt: 'Empty desert road vanishing into the horizon under a pink sky', caption: 'Vanishing Point', place: 'Nevada' },
]
