import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { profile } from '../data'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section in view.
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter((s): s is Element => !!s)
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`)
    }, { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? 'border-b border-line bg-bg/80 backdrop-blur-xl' : 'border-b border-transparent'}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm font-bold text-accent-ink">GV</span>
          <span className="hidden sm:inline">Gopinesh<span className="text-accent">.</span></span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`rounded-lg px-3 py-2 text-sm transition-colors ${active === l.href ? 'text-ink' : 'text-muted hover:text-ink'}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.resume} download className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 sm:flex">
            <Download size={15} /> Resume
          </a>
          <button onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}
            className="grid size-9 place-items-center rounded-lg border border-line text-muted md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-muted hover:bg-card hover:text-ink">{l.label}</a>
            </li>
          ))}
          <li>
            <a href={profile.resume} download className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-semibold text-accent-ink">
              <Download size={16} /> Download resume
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
