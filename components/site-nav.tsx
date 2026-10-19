'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Me' },
  { href: '/trajectory#experience', label: 'Experience' },
  { href: '/trajectory#community', label: 'Community' },
  { href: '/thoughts', label: 'Thoughts' },
  { href: '/view', label: 'My View' },
]

export function SiteNav() {
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [pathname])

  return (
    <nav aria-label="Main" className="w-full md:w-auto">
      <ul className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:justify-start sm:gap-7 md:text-xs">
        {links.map((link) => {
          const hrefPath = link.href.split('#')[0] || '/'
          const targetHash = link.href.includes('#') ? `#${link.href.split('#')[1]}` : ''
          const active = link.href === '/'
            ? pathname === '/' && hash === ''
            : targetHash && hrefPath === '/'
              ? pathname === '/' && hash === targetHash
              : targetHash
                ? pathname.startsWith(hrefPath) && hash === targetHash
                : pathname.startsWith(hrefPath)
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-2 transition-colors hover:text-primary ${
                  active ? 'text-foreground' : ''
                }`}
              >
                <span
                  className={`size-1.5 rotate-45 transition-colors ${active ? 'bg-primary' : 'bg-transparent'}`}
                  aria-hidden="true"
                />
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
