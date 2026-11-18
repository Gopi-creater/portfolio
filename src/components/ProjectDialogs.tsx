import { useCallback, useEffect, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, ExternalLink, Eye, Loader2 } from 'lucide-react'
import { project } from '../data'
import { Modal } from './Modal'

// The free server sleeps when idle: start waking it as soon as the dialog
// opens, and show whether it has answered yet.
function useServerWake(open: boolean) {
  const [state, setState] = useState<'waking' | 'ready'>('waking')
  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    if (!open) return
    let done = false
    setState('waking')
    setSeconds(0)
    const started = Date.now()
    const tick = setInterval(() => setSeconds(Math.round((Date.now() - started) / 1000)), 1000)
    // no-cors: we only need to know the server answered, not read the reply.
    fetch(project.healthUrl, { mode: 'no-cors', cache: 'no-store' })
      .then(() => { if (!done) setState('ready') })
      .catch(() => { /* still waking — the link works anyway */ })
      .finally(() => clearInterval(tick))
    return () => { done = true; clearInterval(tick) }
  }, [open])
  return { state, seconds }
}

function WakeNotice({ state, seconds }: { state: 'waking' | 'ready'; seconds: number }) {
  if (state === 'ready') {
    return (
      <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-500 text-white"><Check size={17} /></span>
        <span><strong>Server is awake</strong> — the demo will open instantly.</span>
      </div>
    )
  }
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-amber-300 bg-amber-50 text-sm text-amber-900">
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="relative grid size-8 shrink-0 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/50" />
          <span className="relative grid size-8 place-items-center rounded-full bg-amber-400 text-white"><Loader2 size={17} className="animate-spin" /></span>
        </span>
        <span>
          <strong>Waking up the server{'.'.repeat((seconds % 3) + 1)}</strong>
          <span className="block text-xs text-amber-800">It sleeps when idle — the first visit can take ~30 seconds. {seconds > 0 && <span className="font-mono">({seconds}s)</span>}</span>
        </span>
      </div>
      <div className="h-1 w-full bg-amber-200"><div className="wake-bar h-full bg-amber-500" /></div>
    </div>
  )
}

// "Live demo": opens the app straight into its read-only demo.
export function DemoDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const wake = useServerWake(open)
  return (
    <Modal open={open} onClose={onClose} label="RoutesTrader live demo">
      <div className="p-6 sm:p-7">
        <div className="grid size-11 place-items-center rounded-xl bg-accent/10 text-accent"><Eye size={20} /></div>
        <h3 className="mt-4 text-xl font-bold">Try {project.name} live</h3>
        <p className="mt-1.5 text-sm text-muted">No sign-in needed — you go straight into the administrator view of the real app.</p>
        <ul className="mt-4 space-y-2 text-sm text-muted">
          <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" /> Dashboard, market prices, map, intelligence and trades</li>
          <li className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-accent" /> Read-only: look around freely, nothing can be changed</li>
        </ul>
        <WakeNotice state={wake.state} seconds={wake.seconds} />
        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 font-semibold text-accent-ink transition-opacity hover:opacity-90">
          Open the live demo <ExternalLink size={16} />
        </a>
      </div>
    </Modal>
  )
}

// "Take a look": screenshot gallery with arrows, thumbnails and keyboard support.
export function GalleryDialog({ open, start = 0, onClose }: { open: boolean; start?: number; onClose: () => void }) {
  const [i, setI] = useState(start)
  const n = project.screens.length
  useEffect(() => { if (open) setI(start) }, [open, start])
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])
  const s = project.screens[i]
  return (
    <Modal open={open} onClose={onClose} label={`${project.name} screenshots`} wide>
      <div className="p-3 sm:p-5">
        <div className="pr-12">
          <div className="font-mono text-xs text-accent">{i + 1} / {n}</div>
          <h3 className="mt-1 text-lg font-bold sm:text-xl">{s.title}</h3>
          <p className="text-sm text-muted">{s.text}</p>
        </div>
        <div className="relative mt-4 overflow-hidden rounded-xl border border-line bg-bg">
          <img src={s.src} alt={`${project.name} — ${s.title}`} className="mx-auto block max-h-[62vh] w-full object-contain" />
          <button onClick={() => go(-1)} aria-label="Previous screenshot" className="absolute top-1/2 left-2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg-soft/90 text-ink shadow-lg hover:bg-bg-soft">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(1)} aria-label="Next screenshot" className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg-soft/90 text-ink shadow-lg hover:bg-bg-soft">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {project.screens.map((t, k) => (
            <button key={t.src} onClick={() => setI(k)} aria-label={t.title}
              className={`w-24 shrink-0 overflow-hidden rounded-lg border-2 transition sm:w-32 ${k === i ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'}`}>
              <img src={t.src} alt="" loading="lazy" className="block aspect-[16/10] w-full object-cover object-top" />
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}
