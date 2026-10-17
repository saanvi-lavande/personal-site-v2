import type { Metadata } from 'next'
import { photos } from '@/lib/content'
import { PageIntro } from '@/components/page-intro'
import { PhotoGrid } from '@/components/view-section'

export const metadata: Metadata = {
  title: 'My View',
  description: 'Digitally hoarding the things I find beautiful.',
}

export default function ViewPage() {
  return (
    <main>
      <PageIntro
        index="05"
        name="Saanvi"
        title="My View"
        description="Digitally hoarding the things I find beautiful."
      />
      <section aria-label="Photo gallery" className="mx-auto max-w-6xl px-6 py-20">
        <PhotoGrid items={photos} />
      </section>
    </main>
  )
}
