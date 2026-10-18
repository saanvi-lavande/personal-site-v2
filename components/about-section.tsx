import Image from 'next/image'
import { about } from '@/lib/content'
import { SectionHeading } from './section-heading'

function renderParagraph(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, index) =>
    part.startsWith('*') && part.endsWith('*')
      ? <em key={index} className="italic text-foreground">{part.slice(1, -1)}</em>
      : part,
  )
}

export function AboutSection() {
  return (
    <section aria-labelledby="about" className="mx-auto max-w-6xl scroll-mt-14 px-6 py-14 md:py-16">
      <SectionHeading index="01" title="About Me" id="about" />
      <div className="grid items-center gap-7 md:grid-cols-[1.25fr_0.75fr] md:gap-10">
        <div className="flex max-w-3xl flex-col gap-4 text-base leading-relaxed">
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 20)} className="text-pretty text-muted-foreground">
              {renderParagraph(p)}
            </p>
          ))}
        </div>
        <div className="relative mx-auto w-full max-w-xs pb-8 pl-6 md:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-card">
            <Image src="/view/facade.png" alt="Geometric modernist architecture with repeating windows and lines" fill sizes="(min-width: 768px) 28vw, 80vw" className="object-cover grayscale-[18%] contrast-[0.95]" />
          </div>
          <div className="absolute bottom-0 left-0 w-[48%] border-4 border-background bg-background">
            <div className="relative aspect-square overflow-hidden">
              <Image src="/view/desert.png" alt="A road disappearing into a pink desert horizon" fill sizes="(min-width: 768px) 14vw, 40vw" className="object-cover" />
            </div>
          </div>
          <p className="-mr-12 absolute bottom-1 right-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">The familiar, made strange</p>
        </div>
      </div>
    </section>
  )
}
