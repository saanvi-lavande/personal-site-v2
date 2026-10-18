import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SectionHeading({ index, title, id }: { index: string; title: string; id: string }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className="font-mono text-xs text-primary">{index}</span>
      <h2 id={id} className="text-2xl font-medium tracking-tight md:text-3xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </div>
  )
}

export function SeeAllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary"
    >
      {label}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
