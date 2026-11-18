import { useCallback, useState } from 'react'
import { ArrowRight, Briefcase, Building2, MapPin, Cloud, Code2, Database, ExternalLink, GraduationCap, Images, Layers, Mail, Phone, Server, Sparkles } from 'lucide-react'
import { DemoDialog, GalleryDialog } from './ProjectDialogs'
import { Tilt } from './Tilt'
import { about, education, experience, focus, profile, project, skills } from '../data'
import { Chip, Dolphin, GitHubIcon, LinkedInIcon, Reveal, Section, TechLogo } from './ui'
import { CORE, motionDelay, techOf } from '../tech'

const FOCUS_ICONS = [Code2, Server, Database, Cloud]

export function About() {
  return (
    <Section id="about" eyebrow="01 · About" title={<>Engineer who owns the <span className="gradient-text">whole feature</span>.</>}>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-2">
          {focus.map((f, i) => {
            const Icon = FOCUS_ICONS[i]
            return (
              <Reveal key={f.title} delay={i * 80}>
                <div className="card h-full p-5">
                  <div className="grid size-10 place-items-center rounded-xl bg-accent/10 text-accent"><Icon size={19} /></div>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

// "1 yr 1 mo" from a start date (YYYY-MM-DD) to today.
function experienceLength(start: string) {
  const from = new Date(`${start}T00:00:00`)
  const now = new Date()
  const months = Math.max(0, (now.getFullYear() - from.getFullYear()) * 12 + now.getMonth() - from.getMonth())
  const y = Math.floor(months / 12)
  const m = months % 12
  const parts = [y ? `${y} yr${y > 1 ? 's' : ''}` : '', m ? `${m} mo${m > 1 ? 's' : ''}` : ''].filter(Boolean)
  return parts.length ? parts.join(' ') : 'Less than a month'
}

export function Experience() {
  return (
    <Section id="experience" eyebrow="02 · Experience" title="Where I've been building.">
      <div className="relative">
        <div className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-accent via-line to-transparent sm:left-[19px]" />
        {experience.map((e) => (
          <Reveal key={e.role + e.period} className="relative pl-12 sm:pl-16">
            <div className="absolute top-1 left-0 grid size-8 place-items-center rounded-full border border-accent/50 bg-bg text-accent sm:size-10">
              <Briefcase size={16} />
            </div>
            <div className="card p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold">{e.role}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-1.5 text-lg font-bold"><Building2 size={18} className="company-icon text-blue-600" /> <span className="company-shine">{e.company}</span>
                    <span className="ml-2 inline-flex items-center gap-1 text-sm font-medium text-muted"><MapPin size={14} className="text-blue-600" /> {e.location}</span></p>
                  <p className="mt-1 text-sm text-muted">{e.context}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="badge-3d rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent" style={motionDelay(e.period)}>{e.period}</span>
                  <span className="badge-3d rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink" style={motionDelay(e.start)}>{experienceLength(e.start)}</span>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {e.points.map((p) => (
                  <li key={p.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                    <ArrowRight size={15} className="mt-1 shrink-0 text-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">{e.tech.map((t) => <Chip key={t}>{t}</Chip>)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Projects() {
  const [demo, setDemo] = useState(false)
  const [shot, setShot] = useState<number | null>(null)
  const closeDemo = useCallback(() => setDemo(false), [])
  const closeShot = useCallback(() => setShot(null), [])
  return (
    <Section id="projects" eyebrow="03 · Featured project" title="Built from zero to production.">
      <Reveal>
        <article className="card relative overflow-hidden p-6 sm:p-10">
          <div className="glow pointer-events-none absolute -top-32 -right-32 size-96" />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-3d inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"><Sparkles size={13} /> Personal project</span>
              <span className="font-mono text-xs text-faint">{project.year}</span>
            </div>
            <h3 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{project.name}</h3>
            <p className="mt-1 text-lg font-medium text-muted">{project.subtitle}</p>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted">{project.summary}</p>

            {/* Screenshot preview in a browser frame — opens the gallery. */}
            <div className="mt-8 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              <Tilt max={7} rest={{ x: 5, y: 7 }} perspective={1600} rounded="rounded-xl" className="sway-3d min-w-0">
              <button onClick={() => setShot(0)} className="group block w-full overflow-hidden rounded-xl border border-line-strong bg-bg-soft text-left shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]" aria-label="Open screenshots">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
                  <span className="size-2.5 rounded-full bg-red-400/80" /><span className="size-2.5 rounded-full bg-yellow-400/80" /><span className="size-2.5 rounded-full bg-green-400/80" />
                  <span className="ml-2 truncate font-mono text-[11px] text-faint">{project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                </div>
                <div className="relative overflow-hidden">
                  <img src={project.screens[0].src} alt={`${project.name} dashboard`} loading="lazy" className="block aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
                  <span className="absolute inset-0 grid place-items-center bg-black/0 transition-colors group-hover:bg-black/40">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink opacity-0 transition-opacity group-hover:opacity-100"><Images size={16} /> Take a look</span>
                  </span>
                </div>
              </button>
              </Tilt>
              <div className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-1">
                {project.screens.slice(1, 3).map((s, k) => (
                  <Tilt key={s.src} max={10} rest={{ x: 4, y: -6 }} rounded="rounded-xl" className="sway-3d min-w-0">
                  <button onClick={() => setShot(k + 1)} className="group relative block w-full overflow-hidden rounded-xl border border-line-strong bg-bg-soft shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]" aria-label={`Open ${s.title}`}>
                    <img src={s.src} alt={`${project.name} — ${s.title}`} loading="lazy" className="block aspect-[16/10] h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pt-6 pb-2 text-left text-xs font-semibold text-white">{s.title}</span>
                  </button>
                  </Tilt>
                ))}
              </div>
            </div>

            {/* Architecture at a glance. */}
            <div className="mt-8 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              {project.flow.map((f, i) => (
                <div key={f.label} className="flex flex-1 flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                  <div className="flex-1 rounded-xl border border-line-strong bg-bg-soft px-4 py-3 text-center">
                    <div className="text-sm font-semibold">{f.label}</div>
                    <div className="font-mono text-[11px] text-faint">{f.note}</div>
                  </div>
                  {i < project.flow.length - 1 && <span className="self-center font-mono text-accent sm:px-1"><span className="sm:hidden">↓</span><span className="hidden sm:inline">⇄</span></span>}
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map((h, i) => (
                <Reveal key={h.title} delay={i * 60}>
                  <div className="h-full rounded-xl border border-line bg-bg-soft/60 p-5 transition-colors hover:border-accent/50">
                    <h4 className="flex items-center gap-2 font-semibold"><Layers size={15} className="text-accent" />{h.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">{project.tech.map((t) => <Chip key={t}>{t}</Chip>)}</div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => setDemo(true)} className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">
                <ExternalLink size={16} /> Live demo
              </button>
              <button onClick={() => setShot(0)} className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold transition-colors hover:bg-card-strong">
                <Images size={16} /> Take a look
              </button>
              <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-semibold transition-colors hover:bg-card-strong">
                <GitHubIcon size={16} /> GitHub
              </a>
            </div>
          </div>
        </article>
      </Reveal>
      <DemoDialog open={demo} onClose={closeDemo} />
      <GalleryDialog open={shot !== null} start={shot ?? 0} onClose={closeShot} />
    </Section>
  )
}

const GROUP_STYLE: Record<string, { color: string; Icon: typeof Code2 }> = {
  Languages: { color: '#f7df1e', Icon: Code2 },
  Frontend: { color: '#61dafb', Icon: Layers },
  Backend: { color: '#8b5cf6', Icon: Server },
  Databases: { color: '#47a248', Icon: Database },
  'Cloud & DevOps': { color: '#2496ed', Icon: Cloud },
  'Tools & Practices': { color: '#f05032', Icon: Sparkles },
}

export function Skills() {
  const strip = [...CORE, ...CORE]
  return (
    <Section id="skills" eyebrow="04 · Skills" title={<>Technologies I <span className="gradient-text">work with</span>.</>}>
      {/* Moving strip of the core stack. */}
      <Reveal>
        <div className="marquee relative -mx-4 overflow-hidden py-2 sm:mx-0">
          <div className="marquee-track flex w-max gap-3">
            {strip.map((name, k) => (
              <div key={`${name}-${k}`} className="flex items-center gap-2.5 rounded-2xl border px-3 py-2"
                style={{ borderColor: `${techOf(name).color}55`, background: `linear-gradient(135deg, ${techOf(name).color}22, transparent)` }}>
                <TechLogo name={name} size={22} />
                <span className="text-sm font-semibold whitespace-nowrap">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => {
          const st = GROUP_STYLE[g.group] ?? { color: '#34d399', Icon: Code2 }
          return (
            <Reveal key={g.group} delay={(i % 3) * 80}>
              <div className="card relative h-full overflow-hidden p-6">
                <div className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full opacity-25 blur-3xl" style={{ background: st.color }} />
                <div className="relative flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl" style={{ background: `${st.color}26`, color: st.color }}><st.Icon size={19} /></span>
                  <h3 className="dolphin-host font-bold"><Dolphin text={g.group} offset={i * 0.1} /></h3>
                  <span className="ml-auto rounded-full px-2 py-0.5 font-mono text-[11px]" style={{ background: `${st.color}1f`, color: st.color }}>{g.items.length}</span>
                </div>
                <div className="relative mt-5 grid grid-cols-2 gap-2">
                  {g.items.map((t) => (
                    <div key={t} className="skill-tile dolphin-host group flex min-w-0 items-center gap-2 rounded-xl border border-line bg-bg-soft/60 p-2"
                      style={{ ['--c' as string]: techOf(t).color }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${techOf(t).color}aa`; e.currentTarget.style.boxShadow = `0 8px 24px -10px ${techOf(t).color}` }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = '' }}>
                      <TechLogo name={t} size={18} />
                      <Dolphin text={t} offset={((i * 7 + g.items.indexOf(t)) * 0.13) % 0.8} className="min-w-0 text-[13px] leading-tight font-medium" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

export function Education() {
  return (
    <Section id="education" eyebrow="05 · Education" title="Academic foundation.">
      <Reveal>
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-accent-ink">
            <GraduationCap size={30} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{education.degree}</h3>
            <p className="mt-1 text-muted">{education.school} · {education.place}</p>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
            <span className="badge-3d rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-xs text-accent" style={motionDelay(education.period)}>{education.period}</span>
            <span className="badge-3d rounded-full border border-line px-3 py-1 font-mono text-xs text-muted" style={motionDelay(education.score)}>{education.score}</span>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export function Contact() {
  return (
    <Section id="contact" eyebrow="06 · Contact" title="Let's build something together.">
      <Reveal>
        <div className="card relative overflow-hidden p-8 text-center sm:p-14">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative">
            <p className="mx-auto max-w-xl text-muted sm:text-lg">
              I'm open to Full Stack and Software Engineer roles. If you have a role, a project or just a question, my inbox is open.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">
                <Mail size={18} /> {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-6 py-3.5 font-semibold transition-colors hover:bg-card-strong">
                <Phone size={18} /> {profile.phone}
              </a>
            </div>
            <div className="mt-6 flex justify-center gap-3">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-accent hover:text-ink"><LinkedInIcon /></a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-accent hover:text-ink"><GitHubIcon /></a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl justify-center px-4 py-8 text-sm text-faint sm:px-6">
        <span>© {new Date().getFullYear()} {profile.name}</span>
      </div>
    </footer>
  )
}
