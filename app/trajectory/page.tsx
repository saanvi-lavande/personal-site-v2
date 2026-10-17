import type { Metadata } from 'next'
import { ExperienceSection } from '@/components/experience-section'

export const metadata: Metadata = {
  title: 'Practice & Community',
  description: 'Research, operations, and community work.',
}

export default function TrajectoryPage() {
  return (
    <main>
      <ExperienceSection />
    </main>
  )
}
