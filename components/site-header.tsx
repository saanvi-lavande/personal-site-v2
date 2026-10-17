import Link from 'next/link'
import { site } from '@/lib/content'
import { SiteNav } from './site-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-3 md:h-14 md:flex-row md:items-center md:justify-between md:py-0">
        <Link href="/" className="flex w-fit items-center gap-2.5 font-medium tracking-tight">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <rect x="0.5" y="0.5" width="17" height="17" fill="none" stroke="currentColor" />
            <circle cx="9" cy="9" r="4" className="fill-primary" />
          </svg>
          {site.name}
        </Link>
        <SiteNav />
      </div>
    </header>
  )
}
