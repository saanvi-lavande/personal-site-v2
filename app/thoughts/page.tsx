import type { Metadata } from 'next'
import { posts } from '@/lib/content'
import { PageIntro } from '@/components/page-intro'
import { PostList } from '@/components/writing-section'

export const metadata: Metadata = {
  title: 'Thoughts',
  description: 'Essays on entrepreneurship, healthcare, technology, robotics, and the ideas worth pursuing.',
}

export default function ThoughtsPage() {
  return (
    <main>
      <PageIntro
        index="04"
        name="Saanvi"
        title="Thoughts"
        description="Notes and essays on entrepreneurship, healthcare, autonomous systems, and the ideas I keep coming back to."
      />
      <section aria-label="All posts" className="mx-auto max-w-6xl px-6 py-20">
        <PostList items={posts} showExcerpt />
      </section>
    </main>
  )
}
