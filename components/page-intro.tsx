const rays = Array.from({ length: 13 }, (_, i) => i * (200 / 12))

export function PageIntro({
  index,
  title,
  description,
  name = 'Saanvi Lavande',
}: {
  index: string
  title: string
  description: string
  name?: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-16 md:pb-24 md:pt-28">
        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-primary">{index}</span> / {name}
        </p>
        <h1 className="text-balance text-5xl font-medium tracking-tight md:text-7xl">
          {title}
          <span className="text-primary">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <svg
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-foreground [mask-image:linear-gradient(to_right,transparent,black_70%)] md:block"
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        {rays.map((y, i) => (
          <line
            key={y}
            x1="300"
            y1="100"
            x2="0"
            y2={y}
            stroke="currentColor"
            strokeOpacity={i === 8 ? 1 : 0.14}
            className={i === 8 ? 'text-primary' : undefined}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </section>
  )
}
