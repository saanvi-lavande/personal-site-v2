import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/content'
import { SectionHeading } from './section-heading'

export function ProjectsSection() {
  return (
    <section aria-labelledby="projects" className="border-y border-line bg-card">
      <div className="mx-auto max-w-6xl scroll-mt-14 px-6 py-24">
        <SectionHeading index="02" title="Projects" id="projects" />
        <ul className="grid border-l border-t border-line sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.title} className="border-b border-r border-line">
              <a
                href={project.href}
                className="group relative flex h-full flex-col gap-6 p-8 transition-colors hover:bg-accent"
              >
                <span
                  className="absolute left-0 top-0 h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-full"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between font-mono text-xs text-muted-foreground">
                  <span>
                    {project.index} / {project.year}
                  </span>
                  <ArrowUpRight
                    className="size-5 text-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-medium tracking-tight">{project.title}</h3>
                  <p className="text-pretty leading-relaxed text-muted-foreground">{project.description}</p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider">
                      {tag}
                    </li>
                  ))}
                </ul>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
