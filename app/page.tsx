import { Hero } from '@/components/hero'
import { AboutSection } from '@/components/about-section'
import { ExperienceSection } from '@/components/experience-section'
import { WritingSection } from '@/components/writing-section'
import { ViewSection } from '@/components/view-section'

export default function Page() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <WritingSection />
      <ViewSection />
    </main>
  )
}
