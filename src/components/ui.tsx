import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motionDelay, techOf } from '../tech'

// Fades its children in when they scroll into view.
export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

// Adds the "live" class while the element is on screen, so its 3D motion
// only runs where the visitor is looking.
export function useLive<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('live'); return }
    // The dolphin letters leap (~3 s, then land) each time the section comes into view.
    const io = new IntersectionObserver(([e]) => {
      el.classList.toggle('live', e.isIntersecting)
      el.classList.toggle('dolphin-on', e.isIntersecting)
    }, { rootMargin: '100px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: ReactNode; children: ReactNode }) {
  const live = useLive<HTMLElement>()
  return (
    <section ref={live} id={id} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}

// A technology's logo on a light tile (so dark logos stay visible); falls
// back to its initial in its brand colour when there is no logo.
export function TechLogo({ name, size = 20, className = '' }: { name: string; size?: number; className?: string }) {
  const t = techOf(name)
  const [broken, setBroken] = useState(false)
  return (
    <span className={`badge-3d grid shrink-0 place-items-center rounded-lg bg-white shadow-sm ring-1 ring-black/5 ${className}`} style={{ width: size + 12, height: size + 12, ...motionDelay(name) }}>
      {t.logo && !broken
        ? <img src={t.logo} alt="" width={size} height={size} loading="lazy" onError={() => setBroken(true)} style={{ width: size, height: size, objectFit: 'contain' }} />
        : <span className="font-bold" style={{ color: t.color, fontSize: size * 0.62 }}>{name.replace(/[^A-Za-z#.]/g, '').slice(0, 2)}</span>}
    </span>
  )
}

// A technology tag tinted with its brand colour.
export function Chip({ children }: { children: string }) {
  const t = techOf(children)
  return (
    <span className="badge-3d inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold"
      style={{ borderColor: `${t.color}66`, background: `${t.color}1f`, color: 'var(--text)', ...motionDelay(children) }}>
      <span className="size-1.5 rounded-full" style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }} />
      {children}
    </span>
  )
}

// Text whose letters leap one after another, like a dolphin through waves.
// Words stay together (so long names wrap at spaces, not mid-word).
export function Dolphin({ text, offset = 0, className = '' }: { text: string; offset?: number; className?: string }) {
  let i = 0
  return (
    <span className={`dolphin-text ${className}`} aria-label={text}>
      {text.split(' ').map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {[...word].map((ch) => {
            const k = i++
            return <span key={k} className="dolphin" style={{ animationDelay: `${(offset + k * 0.05).toFixed(2)}s` }}>{ch}</span>
          })}
          {w < text.split(' ').length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}

// Brand marks drawn inline (no brand-icon dependency).
export const GitHubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 0 1 1.3-3.2c-.2-.3-.6-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2a4.6 4.6 0 0 1 1.3 3.2c0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
  </svg>
)
export const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.5H3.6V9h3.5v11.5ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0Z" />
  </svg>
)
