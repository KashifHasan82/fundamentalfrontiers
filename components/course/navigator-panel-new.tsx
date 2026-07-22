'use client'

import { useState, useMemo } from 'react'
import { ChevronDown, X } from 'lucide-react'

interface NavigatorPanelNewProps {
  currentBeat: number
  totalBeats: number
  completedBeats: number[]
  onBeatSelect: (beat: number) => void
  capturedNotes: Array<{ id: string; text: string; beatId: number }>
  onDeleteNote: (noteId: string) => void
  takeaways: Array<{ id: string; text: string; beatId: number }>
}

const SUBMODULES = [
  { id: '1.1', title: 'Why quality varies and why it matters', locked: false },
  { id: '1.2', title: 'What "Six Sigma" actually means', locked: true },
  { id: '1.3', title: 'Where it came from and why it works', locked: true },
  { id: '1.4', title: 'The belt system', locked: true },
  { id: '1.5', title: 'What you\'ll be able to do', locked: true },
]

export default function NavigatorPanelNew({
  currentBeat,
  totalBeats,
  completedBeats,
  onBeatSelect,
  capturedNotes,
  onDeleteNote,
  takeaways,
}: NavigatorPanelNewProps) {
  const [expandedTakeaways, setExpandedTakeaways] = useState(false)
  const progressPercent = Math.round((completedBeats.length / totalBeats) * 100)

  // Deduplicate takeaways by id to prevent display duplicates
  const uniqueTakeaways = useMemo(() => {
    const seen = new Set<string>()
    return takeaways.filter(t => {
      if (seen.has(t.id)) return false
      seen.add(t.id)
      return true
    })
  }, [takeaways])

  return (
    <div className="flex flex-col h-full">
      {/* Progress Section */}
      <div className="p-4 border-b border-[var(--border)]">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)]">Progress</h3>
            <span className="text-xs font-medium text-[var(--ink)]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[color:rgba(23,27,36,0.10)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--wine)] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <p className="text-xs text-[var(--ink-mute)]">
          <span className="font-medium text-[var(--ink)]">{completedBeats.length}</span> of{' '}
          <span className="font-medium">{totalBeats}</span> concepts complete
        </p>
      </div>

      {/* Submodules Section */}
      <div className="p-4 border-b border-[var(--border)]">
        <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)] mb-3">Sub-modules</h3>
        <div className="space-y-1.5">
          {SUBMODULES.map((sub) => (
            <div
              key={sub.id}
              className={`text-xs p-2 rounded-[2px] border transition-colors ${
                sub.locked
                  ? 'bg-[color:rgba(23,27,36,0.03)] border-[var(--border)] text-[var(--dormant)] cursor-not-allowed'
                  : 'bg-[var(--cream)] border-[var(--wine)] text-[var(--ink)] cursor-pointer hover:bg-[color:rgba(122,31,43,0.05)]'
              }`}
            >
              <div className="font-medium">{sub.id}</div>
              <div className="text-xs text-[var(--ink-mute)]">{sub.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Captured Notes Section */}
      {capturedNotes.length > 0 && (
        <div className="p-4 border-b border-[var(--border)]">
          <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)] mb-2">Notes</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {capturedNotes.map((note) => (
              <div key={note.id} className="text-xs p-2 bg-[color:rgba(122,31,43,0.05)] border border-[var(--border)] rounded-[2px] group hover:bg-[color:rgba(122,31,43,0.08)] transition-colors">
                <div className="flex items-start gap-2">
                  <p className="flex-1 text-[var(--ink-soft)] leading-snug">{note.text}</p>
                  <button
                    onClick={() => onDeleteNote(note.id)}
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--dormant)] hover:text-[var(--wine)]"
                    aria-label="Delete note"
                  >
                    <X size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Takeaways Section */}
      {uniqueTakeaways.length > 0 && (
        <div className="p-4 border-b border-[var(--border)]">
          <button
            onClick={() => setExpandedTakeaways(!expandedTakeaways)}
            className="w-full flex items-center justify-between gap-2 mb-2 hover:opacity-70 transition-opacity"
          >
            <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)]">
              What you've learned
            </h3>
            <ChevronDown
              size={14}
              className={`transition-transform ${expandedTakeaways ? 'rotate-180' : ''}`}
            />
          </button>

          {expandedTakeaways && (
            <div className="space-y-1.5">
              {uniqueTakeaways.map((takeaway) => (
                <div key={takeaway.id} className="text-xs text-[var(--ink-soft)] pl-3 py-1 border-l-2 border-[var(--gold)]">
                  • {takeaway.text}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-auto p-4 border-t border-[var(--border)] bg-[color:rgba(122,31,43,0.02)]">
        <p className="text-xs text-[var(--ink-mute)] text-center">
          {completedBeats.length === totalBeats
            ? '✓ Sub-module complete!'
            : `${totalBeats - completedBeats.length} concept${totalBeats - completedBeats.length !== 1 ? 's' : ''} remaining`}
        </p>
      </div>
    </div>
  )
}
