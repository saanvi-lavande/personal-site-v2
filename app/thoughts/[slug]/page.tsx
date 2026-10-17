import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { posts } from '@/lib/content'
import type { ReactNode } from 'react'

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

function inlineMarkdown(text: string): ReactNode[] {
  const pattern = /(\*\*.*?\*\*|\[[^\]]+\]\([^)]+\))/g
  const parts = text.split(pattern)
  return parts.map((part, index) => {
    const bold = part.match(/^\*\*(.*?)\*\*$/)
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (bold) return <strong key={index} className="font-medium text-foreground">{bold[1]}</strong>
    if (link) return <a key={index} href={link[2]} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">{link[1]}</a>
    return part
  })
}

function ArticleBody({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) { i++; continue }
    if (line.startsWith('#')) {
      const level = Math.min(line.match(/^#+/)?.[0].length ?? 2, 3)
      const title = line.replace(/^#+\s*/, '')
      if (level === 2) blocks.push(<h2 key={i} className="pt-5 text-2xl font-medium tracking-tight text-foreground md:text-3xl">{title}</h2>)
      else blocks.push(<h3 key={i} className="pt-3 text-xl font-medium tracking-tight text-foreground">{title}</h3>)
      i++; continue
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s*/, '')); i++ }
      blocks.push(<ol key={`ol-${i}`} className="list-decimal space-y-2 pl-6">{items.map((item, j) => <li key={j}>{inlineMarkdown(item)}</li>)}</ol>)
      continue
    }
    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('- ')) { items.push(lines[i].trim().slice(2)); i++ }
      blocks.push(<ul key={`ul-${i}`} className="list-disc space-y-2 pl-6">{items.map((item, j) => <li key={j}>{inlineMarkdown(item)}</li>)}</ul>)
      continue
    }
    const paragraphs = [line]
    i++
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith('#') && !/^\d+\.\s/.test(lines[i].trim()) && !lines[i].trim().startsWith('- ')) {
      paragraphs.push(lines[i].trim()); i++
    }
    blocks.push(<p key={`p-${i}`} className="text-pretty">{inlineMarkdown(paragraphs.join(' '))}</p>)
  }
  return <div className="flex flex-col gap-5 pt-10 text-base leading-relaxed text-muted-foreground md:text-lg">{blocks}</div>
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const post = posts[index]
  const next = posts[index + 1]

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link href="/thoughts" className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        All thoughts
      </Link>
      <article className="mt-12">
        <header className="border-b border-line pb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{post.date} <span className="text-primary">/</span> {post.readTime} read</p>
          <h1 className="mt-5 text-balance text-4xl font-medium leading-tight tracking-tight md:text-5xl">{post.title}</h1>
          <ul className="mt-6 flex flex-wrap gap-2">{post.tags.map((tag) => <li key={tag} className="border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{tag}</li>)}</ul>
        </header>
        <ArticleBody markdown={post.body} />
      </article>
      {next && <Link href={`/thoughts/${next.slug}`} className="group mt-20 flex flex-col gap-2 border-t border-line pt-8"><span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Next thought</span><span className="flex items-center justify-between gap-4 text-xl font-medium tracking-tight transition-colors group-hover:text-primary">{next.title}<ArrowRight className="size-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span></Link>}
    </main>
  )
}
