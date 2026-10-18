import Image from 'next/image'
import { photos } from '@/lib/content'
import { SectionHeading, SeeAllLink } from './section-heading'

type Photo = (typeof photos)[number]

const layout = ['md:col-span-2 md:row-span-2 md:aspect-auto']

export function PhotoGrid({ items }: { items: Photo[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {items.map((photo, i) => (
        <li
          key={photo.src}
          className={`group relative aspect-square overflow-hidden border border-line ${layout[i] ?? ''}`}
        >
          <figure className="h-full w-full">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover grayscale-[40%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/90 px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest backdrop-blur transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 md:opacity-0">
              <span>{photo.caption}</span>
              <span className="text-primary">{photo.place}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

export function ViewSection() {
  return (
    <section aria-labelledby="view" className="mx-auto max-w-6xl scroll-mt-14 px-6 py-14 md:py-16">
      <SectionHeading index="05" title="My View" id="view" />
      <p className="-mt-6 mb-10 max-w-md text-muted-foreground">
        Digitally hoarding the things I find beautiful.
      </p>
      <PhotoGrid items={photos.slice(0, 3)} />
      <SeeAllLink href="/view" label="See the full gallery" />
    </section>
  )
}
