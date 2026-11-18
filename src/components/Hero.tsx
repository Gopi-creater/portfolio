import { useEffect, useState } from 'react'
import { ArrowRight, Download, Mail, MapPin, Phone } from 'lucide-react'
import { profile, stats } from '../data'
import { GitHubIcon, LinkedInIcon, TechLogo, useLive } from './ui'
import { Depth, Tilt } from './Tilt'
import { motionDelay } from '../tech'

const BADGES = [
  { label: 'React', z: 110, dot: '#61dafb', pos: '-top-4 -left-4 sm:-left-8' },
  { label: '.NET', z: 70, dot: '#a78bfa', pos: '-top-4 right-2 sm:-right-6' },
  { label: 'Node.js', z: 95, dot: '#84cc16', pos: 'bottom-24 -left-4 sm:-left-10' },
  { label: 'Docker', z: 60, dot: '#2496ed', pos: 'bottom-24 -right-3 sm:-right-8' },
]

const WORDS = ['web apps', 'REST APIs', 'mobile apps', 'data pipelines', 'dashboards']

// Types and deletes WORDS one by one.
function useTyping() {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setText(WORDS[0]); return }
    const word = WORDS[i % WORDS.length]
    const done = !deleting && text === word
    const empty = deleting && text === ''
    const t = setTimeout(() => {
      if (done) setDeleting(true)
      else if (empty) { setDeleting(false); setI((n) => n + 1) }
      else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, done ? 1600 : deleting ? 45 : 85)
    return () => clearTimeout(t)
  }, [text, deleting, i])
  return text
}

export function Hero() {
  const typed = useTyping()
  const live = useLive<HTMLElement>()
  return (
    <section ref={live} id="top" className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="glow pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open to Full Stack / Software Engineer roles
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl">
            Hi, I'm {profile.name.split(' ')[0]}.<br />
            I build <span className="gradient-text">{typed}</span><span className="caret text-accent">|</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">
              View my work <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href={profile.resume} download className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 font-semibold transition-colors hover:bg-card-strong">
              <Download size={17} /> Download resume
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5"><MapPin size={15} /> {profile.location}</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink"><GitHubIcon size={15} /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink"><LinkedInIcon size={15} /> LinkedIn</a>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1.5 hover:text-ink"><Mail size={15} /> Email</a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-ink"><Phone size={15} /> {profile.phone}</a>
          </div>
        </div>

        {/* 3D portrait: tilts with the pointer; name plate and badges float at different depths. */}
        <div className="relative mx-auto w-full max-w-[300px] min-w-0 sm:max-w-[380px]">
          <div className="glow pointer-events-none absolute -inset-20" />
          <div className="float">
            <Tilt max={14} rest={{ x: 3, y: -9 }} rounded="rounded-[2rem]" className="sway-3d aspect-[4/5]">
              {/* Offset plate behind the photo for depth. */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent to-accent-2 opacity-70" style={{ transform: 'translate3d(16px, 16px, -50px)' }} />
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-line-strong bg-bg-soft shadow-2xl">
                <picture>
                  <source srcSet="/profile.webp" type="image/webp" />
                  <img src="/profile.jpg" alt={`${profile.name}, ${profile.role}`} width={900} height={900} className="h-full w-full object-cover object-[50%_28%]" />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              {/* Name plate — closest to the viewer. */}
              <Depth z={80} className="absolute inset-x-4 -bottom-7 sm:inset-x-6">
                <div className="rounded-2xl border border-white/15 bg-black/55 px-5 py-4 text-center shadow-2xl backdrop-blur-md">
                  <div className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{profile.name}</div>
                  <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300">{profile.role}</div>
                </div>
              </Depth>

              {/* Floating tech badges. */}
              {BADGES.map((b) => (
                <Depth key={b.label} z={b.z} className={`absolute ${b.pos}`}>
                  <span className="badge-3d inline-flex items-center gap-2 rounded-full border bg-black/65 py-1 pr-3 pl-1 text-xs font-semibold text-white shadow-xl backdrop-blur-md" style={{ borderColor: `${b.dot}88`, boxShadow: `0 10px 30px -8px ${b.dot}`, ...motionDelay(b.label) }}>
                    <TechLogo name={b.label} size={14} className="rounded-full" />{b.label}
                  </span>
                </Depth>
              ))}
            </Tilt>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-20 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:mt-24 sm:px-6 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card sway-3d px-5 py-5" style={motionDelay(s.label, 7)}>
            <div className="text-3xl font-extrabold tracking-tight sm:text-4xl"><span className="gradient-text">{s.value}</span></div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
