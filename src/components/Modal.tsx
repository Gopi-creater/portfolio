import { useEffect, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'

// Accessible dialog: Esc / backdrop closes, page scroll is locked while open.
export function Modal({ open, onClose, label, wide = false, children }: { open: boolean; onClose: () => void; label: string; wide?: boolean; children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = overflow }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div ref={panel} tabIndex={-1} role="dialog" aria-modal="true" aria-label={label}
        className={`relative max-h-full w-full overflow-y-auto rounded-2xl border border-line-strong bg-bg-soft shadow-2xl outline-none ${wide ? 'max-w-6xl' : 'max-w-md'}`}>
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 z-10 grid size-9 place-items-center rounded-lg border border-line bg-bg-soft/90 text-muted hover:text-ink">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}
