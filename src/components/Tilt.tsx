import { useRef, type CSSProperties, type ReactNode } from 'react'

// A 3D card that tilts towards the pointer, with a moving glare. Children can
// sit at different depths with <Depth z={…}>. `rest` is the resting angle
// (e.g. a perspective view that straightens on hover). No motion when the
// user prefers reduced motion; touch screens keep the resting angle.
export function Tilt({ children, max = 12, rest = { x: 0, y: 0 }, className = '', rounded = 'rounded-2xl', glare = true, perspective = 1100 }: {
  children: ReactNode
  max?: number
  rest?: { x: number; y: number }
  className?: string
  rounded?: string
  glare?: boolean
  perspective?: number
}) {
  const card = useRef<HTMLDivElement>(null)
  const shine = useRef<HTMLDivElement>(null)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const set = (x: number, y: number, gx = 50, gy = 50, glareOpacity = 0) => {
    if (card.current) card.current.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`
    if (shine.current) {
      shine.current.style.opacity = String(glareOpacity)
      shine.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.28), transparent 55%)`
    }
  }
  const move = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === 'touch' || !card.current) return
    const r = card.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    card.current.style.transition = 'transform 0.08s linear'
    set((0.5 - py) * max * 2, (px - 0.5) * max * 2, px * 100, py * 100, 1)
  }
  const leave = () => {
    if (!card.current) return
    card.current.style.transition = 'transform 0.7s cubic-bezier(.2,.8,.2,1)'
    set(rest.x, rest.y)
  }

  const style: CSSProperties = { transform: `rotateX(${rest.x}deg) rotateY(${rest.y}deg)`, transformStyle: 'preserve-3d', transition: 'transform 0.7s cubic-bezier(.2,.8,.2,1)' }
  return (
    <div className={className} style={{ perspective }} onPointerMove={move} onPointerLeave={leave}>
      <div ref={card} className={`relative h-full w-full will-change-transform ${rounded}`} style={style}>
        {children}
        {glare && <div ref={shine} className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300" style={{ transform: 'translateZ(1px)' }} />}
      </div>
    </div>
  )
}

// Lifts its content off the card by `z` pixels (needs a Tilt parent).
export function Depth({ z, className = '', children }: { z: number; className?: string; children: ReactNode }) {
  return <div className={className} style={{ transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}>{children}</div>
}
