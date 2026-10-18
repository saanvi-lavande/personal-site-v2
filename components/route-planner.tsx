'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Navigation, RotateCcw, Square } from 'lucide-react'

const N = 12
const CELL = 30
const PAD = 20
const SIZE = N * CELL + PAD * 2
const STEP_MS = 160

type Point = [number, number]
type Mode = 'goal' | 'wall'

const INITIAL_MAP = [
  '............',
  '..##....#...',
  '..#.....#...',
  '..#..##.#...',
  '......#.....',
  '.###..#..##.',
  '......#.....',
  '..#.......#.',
  '..#..####.#.',
  '..#.....#...',
  '........#...',
  '............',
]

const toKey = (x: number, y: number) => y * N + x
const fromKey = (k: number): Point => [k % N, Math.floor(k / N)]
const center = (v: number) => PAD + v * CELL + CELL / 2

const initialWalls = () => {
  const walls = new Set<number>()
  INITIAL_MAP.forEach((row, y) => [...row].forEach((c, x) => c === '#' && walls.add(toKey(x, y))))
  return walls
}

function aStar(walls: Set<number>, start: Point, goal: Point) {
  const startKey = toKey(...start)
  const goalKey = toKey(...goal)
  const h = (k: number) => {
    const [x, y] = fromKey(k)
    return Math.abs(x - goal[0]) + Math.abs(y - goal[1])
  }
  const open = new Set([startKey])
  const cost = new Map([[startKey, 0]])
  const cameFrom = new Map<number, number>()
  const explored: number[] = []

  while (open.size) {
    let current = -1
    let best = Infinity
    for (const k of open) {
      const f = (cost.get(k) ?? Infinity) + h(k)
      if (f < best) {
        best = f
        current = k
      }
    }
    open.delete(current)
    explored.push(current)

    if (current === goalKey) {
      const path: Point[] = [fromKey(current)]
      while (cameFrom.has(current)) {
        current = cameFrom.get(current)!
        path.unshift(fromKey(current))
      }
      return { path, explored }
    }

    const [cx, cy] = fromKey(current)
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = cx + dx
      const ny = cy + dy
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue
      const nk = toKey(nx, ny)
      if (walls.has(nk)) continue
      const next = (cost.get(current) ?? 0) + 1
      if (next < (cost.get(nk) ?? Infinity)) {
        cost.set(nk, next)
        cameFrom.set(nk, current)
        open.add(nk)
      }
    }
  }
  return { path: [] as Point[], explored }
}

export function RoutePlanner() {
  const [walls, setWalls] = useState(initialWalls)
  const [pos, setPos] = useState<Point>([0, 11])
  const [goal, setGoal] = useState<Point>([11, 0])
  const [heading, setHeading] = useState(-90)
  const [mode, setMode] = useState<Mode>('goal')
  const [plan, setPlan] = useState(() => aStar(initialWalls(), [0, 11], [11, 0]))
  const [step, setStep] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const replan = useCallback((w: Set<number>, from: Point, to: Point) => {
    const result = aStar(w, from, to)
    setPlan(result)
    setStep(0)
    return result
  }, [])

  useEffect(() => {
    const { path } = plan
    if (step >= path.length - 1) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = window.setTimeout(
      () => {
        const target = reduce ? path.length - 1 : step + 1
        const [px, py] = path[target - 1]
        const [nx, ny] = path[target]
        setHeading((Math.atan2(ny - py, nx - px) * 180) / Math.PI)
        setPos(path[target])
        setStep(target)
      },
      reduce ? 0 : STEP_MS,
    )
    return () => window.clearTimeout(id)
  }, [plan, step])

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.floor((((e.clientX - rect.left) / rect.width) * SIZE - PAD) / CELL)
    const y = Math.floor((((e.clientY - rect.top) / rect.height) * SIZE - PAD) / CELL)
    if (x < 0 || y < 0 || x >= N || y >= N) return
    const k = toKey(x, y)
    const isPos = x === pos[0] && y === pos[1]

    if (mode === 'goal') {
      if (walls.has(k) || isPos) return
      setGoal([x, y])
      replan(walls, pos, [x, y])
    } else {
      if (isPos || (x === goal[0] && y === goal[1])) return
      const next = new Set(walls)
      next.has(k) ? next.delete(k) : next.add(k)
      setWalls(next)
      replan(next, pos, goal)
    }
  }

  const shuffle = () => {
    for (let attempt = 0; attempt < 30; attempt++) {
      const next = new Set<number>()
      for (let k = 0; k < N * N; k++) if (Math.random() < 0.24) next.add(k)
      next.delete(toKey(...pos))
      let target: Point
      do target = [Math.floor(Math.random() * N), Math.floor(Math.random() * N)]
      while (next.has(toKey(...target)) || (target[0] === pos[0] && target[1] === pos[1]))
      if (aStar(next, pos, target).path.length > 8) {
        setWalls(next)
        setGoal(target)
        replan(next, pos, target)
        return
      }
    }
  }

  const exploredSet = useMemo(() => new Set(plan.explored), [plan])
  const pathD = plan.path
    .slice(step)
    .map(([x, y], i) => `${i ? 'L' : 'M'}${center(x)} ${center(y)}`)
    .join(' ')
  const noRoute = plan.path.length === 0
  const arrived = !noRoute && step >= plan.path.length - 1
  const status = noRoute ? 'no route' : arrived ? 'arrived' : 'en route'

  return (
    <figure className="mx-auto -mt-8 flex w-full max-w-md flex-col gap-4">
      <div className="relative border border-line bg-background/60">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block h-auto w-full cursor-crosshair touch-manipulation text-foreground"
          onClick={handleClick}
          role="img"
          aria-label={`Interactive path planner. A robot is ${status}; its route explored ${plan.explored.length} cells. Click the grid to ${mode === 'goal' ? 'set a destination' : 'add or remove obstacles'}.`}
        >
          {Array.from({ length: N + 1 }, (_, i) => (
            <g key={i} stroke="currentColor" strokeOpacity="0.1">
              <line x1={PAD + i * CELL} y1={PAD} x2={PAD + i * CELL} y2={SIZE - PAD} />
              <line x1={PAD} y1={PAD + i * CELL} x2={SIZE - PAD} y2={PAD + i * CELL} />
            </g>
          ))}

          {[...exploredSet].map((k) => {
            const [x, y] = fromKey(k)
            return (
              <rect
                key={`e${k}`}
                x={PAD + x * CELL + 1}
                y={PAD + y * CELL + 1}
                width={CELL - 2}
                height={CELL - 2}
                className="fill-primary"
                fillOpacity="0.07"
              />
            )
          })}

          {[...walls].map((k) => {
            const [x, y] = fromKey(k)
            const x0 = PAD + x * CELL + 5
            const y0 = PAD + y * CELL + 5
            return (
              <g key={`w${k}`} stroke="currentColor" strokeOpacity="0.55">
                <rect x={x0} y={y0} width={CELL - 10} height={CELL - 10} fill="none" />
                <line x1={x0} y1={y0 + CELL - 10} x2={x0 + CELL - 10} y2={y0} strokeOpacity="0.3" />
              </g>
            )
          })}

          {pathD && <path d={pathD} className="stroke-primary" strokeWidth="2" strokeDasharray="4 4" fill="none" />}

          <g transform={`translate(${center(goal[0])} ${center(goal[1])})`}>
            <circle r="9" className="stroke-primary" fill="none" />
            <circle r="3" className="fill-primary" />
            <line x1="-14" x2="-10" stroke="currentColor" strokeOpacity="0.6" />
            <line x1="10" x2="14" stroke="currentColor" strokeOpacity="0.6" />
            <line y1="-14" y2="-10" stroke="currentColor" strokeOpacity="0.6" />
            <line y1="10" y2="14" stroke="currentColor" strokeOpacity="0.6" />
          </g>

          <g
            style={{
              transform: `translate(${center(pos[0])}px, ${center(pos[1])}px)`,
              transition: `transform ${STEP_MS}ms linear`,
            }}
          >
            <g style={{ transform: `rotate(${heading}deg)`, transition: 'transform 200ms ease-out' }}>
              <path d="M0 0 L46 -20 A50 50 0 0 1 46 20 Z" className="fill-primary" fillOpacity="0.12" />
              <rect x="-8" y="-6" width="16" height="12" className="fill-background stroke-foreground" strokeWidth="1.5" />
              <rect x="3" y="-3" width="4" height="6" className="fill-primary" />
            </g>
          </g>

          <g className="font-mono" fill="currentColor" fillOpacity="0.5" fontSize="9">
            <text x={PAD} y={PAD - 7}>{`pos (${pos[0]}, ${pos[1]})`}</text>
            <text x={SIZE - PAD} y={PAD - 7} textAnchor="end">{`goal (${goal[0]}, ${goal[1]})`}</text>
          </g>
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex border border-line" role="group" aria-label="Click mode">
          <button
            type="button"
            onClick={() => setMode('goal')}
            aria-pressed={mode === 'goal'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs transition-colors aria-pressed:bg-foreground aria-pressed:text-background hover:text-primary aria-pressed:hover:text-background"
          >
            <Navigation className="size-3" aria-hidden="true" />
            destination
          </button>
          <button
            type="button"
            onClick={() => setMode('wall')}
            aria-pressed={mode === 'wall'}
            className="inline-flex items-center gap-1.5 border-l border-line px-3 py-1.5 font-mono text-xs transition-colors aria-pressed:bg-foreground aria-pressed:text-background hover:text-primary aria-pressed:hover:text-background"
          >
            <Square className="size-3" aria-hidden="true" />
            obstacle
          </button>
        </div>
        <button
          type="button"
          onClick={shuffle}
          className="inline-flex items-center gap-1.5 px-2 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <RotateCcw className="size-3" aria-hidden="true" />
          new city
        </button>
      </div>

      <figcaption className="flex flex-col gap-1.5 font-mono text-xs text-muted-foreground">
        <span aria-live="polite">
          {`A* · explored ${plan.explored.length} · cost ${Math.max(plan.path.length - 1, 0)} · `}
          <span className={noRoute ? 'text-primary' : arrived ? 'text-foreground' : 'text-primary'}>{status}</span>
        </span>
        <span className="font-sans text-pretty leading-relaxed">
          Click the grid to send the robot somewhere, or drop obstacles in its way. It finds a new shortest route
          every time, which is the same basic idea behind how self-driving cars plan their paths.
        </span>
      </figcaption>
    </figure>
  )
}
