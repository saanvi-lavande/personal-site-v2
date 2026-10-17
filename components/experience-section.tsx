import { SectionHeading } from './section-heading'

const practice = [
  {
    title: 'Research',
    place: 'Meta',
    period: '2025–2026',
    bullets: [
      <>Identified bottlenecks and evaluated workflow improvements to accelerate <strong className="font-medium text-primary">model benchmarking and performance evaluation</strong>.</>,
    ],
  },
  {
    title: 'Research',
    place: 'Innovative Genomics Institute',
    period: '2024–2026',
    bullets: [
      <>Helped develop a <strong className="font-medium text-primary">patented therapeutic for colon cancer</strong> under <strong className="font-medium text-primary">Nobel laureate Jennifer Doudna</strong>.</>,
    ],
  },
  {
    title: 'Research',
    place: 'AI Explainability and Accountability Lab',
    period: '2026–Now',
    bullets: [<>Stay tuned :)</>],
  },
  {
    title: 'Global Operations',
    place: 'Western Digital',
    period: '2026',
    bullets: [
      <>Developed an intelligence system to automate <strong className="font-medium text-primary">lane analytics and optimization</strong>.</>,
      <>Automated daily workflows, returning <strong className="font-medium text-primary">20% of employee time</strong> across WD organizations globally.</>,
    ],
  },
]

const impact = [
  { title: 'Executive Chair', place: 'Venture Capital Investment Competition', period: '2026–Now' },
  { title: 'Undergraduate Fellow', place: 'Free Ventures', period: '2026–Now' },
  { title: 'Youth Ambassador', place: 'Special Olympics', period: '2021–2024' },
]

export function ExperienceSection() {
  return (
    <section aria-label="Experience and community" className="mx-auto max-w-6xl scroll-mt-14 px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <div>
          <SectionHeading index="02" title="Practice" id="experience" />
          <ol className="relative ml-1.5 border-l border-line">
            {practice.map((item, i) => (
              <li key={`${item.place}-${item.period}`} className="relative grid gap-2 pb-10 pl-8 last:pb-0 md:grid-cols-[125px_1fr] md:gap-6">
                <span className={`absolute -left-[5px] top-1.5 size-2.5 rotate-45 border ${i === 0 ? 'border-primary bg-primary' : 'border-foreground bg-background'}`} aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground md:pt-1">{item.period}</p>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium tracking-tight">{item.title} <span className="text-primary">@</span> {item.place}</h3>
                  <ul className="flex flex-col gap-2">
                    {item.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <SectionHeading index="03" title="Community" id="community" />
          <ol className="relative ml-1.5 border-l border-line">
            {impact.map((item, i) => (
              <li key={item.place} className="relative grid gap-2 pb-10 pl-8 last:pb-0">
                <span className={`absolute -left-[5px] top-1.5 size-2.5 rotate-45 border ${i === 0 ? 'border-primary bg-primary' : 'border-foreground bg-background'}`} aria-hidden="true" />
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{item.period}</p>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.place}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
