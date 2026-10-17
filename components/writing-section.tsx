import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { posts } from '@/lib/content'
import { SectionHeading, SeeAllLink } from './section-heading'

type Post = (typeof posts)[number]

export function PostList({ items, showExcerpt = false }: { items: Post[]; showExcerpt?: boolean }) {
  return (
    <ul className="border-t border-line">
      {items.map((post) => (
        <li key={post.slug} className="border-b border-line">
          <Link
            href={`/thoughts/${post.slug}`}
            className="group grid grid-cols-[1fr_auto] items-center gap-4 py-6 md:grid-cols-[120px_1fr_80px_auto]"
          >
            <span className="col-span-2 font-mono text-xs uppercase tracking-widest text-muted-foreground md:col-span-1">
              {post.date}
            </span>
            <span className="flex flex-col gap-2">
              <span className="text-pretty text-lg font-medium tracking-tight transition-colors group-hover:text-primary md:text-xl">
                {post.title}
              </span>
              {showExcerpt && (
                <span className="max-w-xl text-pretty leading-relaxed text-muted-foreground">{post.excerpt}</span>
              )}
            </span>
            <span className="hidden font-mono text-xs text-muted-foreground md:block">{post.readTime}</span>
            <ArrowRight
              className="size-5 transition-transform group-hover:translate-x-1 group-hover:text-primary"
              aria-hidden="true"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function WritingSection() {
  return (
    <section aria-labelledby="writing" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl scroll-mt-14 px-6 py-24">
        <SectionHeading index="04" title="Thoughts" id="writing" />
        <PostList items={posts.slice(0, 3)} />
        <SeeAllLink href="/thoughts" label="All thoughts" />
      </div>
    </section>
  )
}
