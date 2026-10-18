import { site } from '@/lib/content'

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-foreground text-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:-translate-x-8">
        <div className="flex flex-col gap-6">
          <p className="text-balance text-4xl font-medium tracking-tight md:text-6xl md:-translate-x-8">Let&apos;s grab coffee :) My treat!</p>
          <a
            href={`mailto:${site.email}`}
            className="w-fit font-mono text-sm tracking-wide text-background/75 transition-colors hover:text-primary md:text-base"
          >
            {site.email}
          </a>
        </div>
        <div className="flex flex-col justify-between gap-6 border-t border-background/20 pt-6 font-mono text-xs uppercase tracking-widest text-background/60 md:flex-row">
          <ul className="flex gap-6">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
      <svg
        className="pointer-events-none absolute -right-20 -top-20 size-80 text-primary md:size-[28rem]"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        {[90, 70, 50, 30].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" strokeOpacity={r / 150} />
        ))}
      </svg>
    </footer>
  )
}
