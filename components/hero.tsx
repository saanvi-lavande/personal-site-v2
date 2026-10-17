import { ArrowDownRight } from 'lucide-react'
import { site } from '@/lib/content'
import { RoutePlanner } from './route-planner'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true"><div className="absolute right-[8%] top-[12%] h-48 w-48 rounded-full border border-line md:h-72 md:w-72" /><div className="absolute right-[14%] top-[20%] h-36 w-36 rounded-full border border-primary/40 md:h-56 md:w-56" /></div>
      <div className="relative mx-auto grid max-w-[80rem] gap-14 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-28">
        <div className="flex flex-col gap-8">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            <span className="text-primary">{site.name}</span>
            <span>· {site.role} · {site.location}</span>
          </p>
          <div className="flex flex-col gap-5">
            <h1 className="text-balance text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">
              <span className="block">“To see a World in a Grain of Sand</span>
              <span className="my-3 block font-mono text-primary">/</span>
              <span className="block">And a Heaven in a Wild Flower”</span>
            </h1>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              William Blake <span className="text-primary">/</span> Auguries of Innocence
            </p>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              <strong className="font-semibold italic text-primary">Meaningful innovation</strong>{' '}
              begins with the ability to see{' '}
              <strong className="font-semibold italic text-primary">beyond the obvious</strong>{' '}
              and recognize possibilities others overlook.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/trajectory#experience"
              className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm text-background transition-colors hover:bg-primary"
            >
              See my work
              <ArrowDownRight className="size-4" aria-hidden="true" />
            </a>
            <a
              href="mailto:saanvi.lavande@berkeley.edu"
              className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              Get in touch
            </a>
          </div>
        </div>
        <RoutePlanner />
      </div>
    </section>
  )
}
