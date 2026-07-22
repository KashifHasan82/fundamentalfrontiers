'use client'

import React, { useCallback, useState, useEffect } from 'react'
import Beat1Opening from './beats/Beat1Opening'
import Beat2Segmented from './beats/Beat2Segmented'
import Beat3Video from './beats/Beat3Video'
import Beat4Infographic from './beats/Beat4Infographic'
import Beat5Matching from './beats/Beat5Matching'
import BeatFlashCards from './beats/BeatFlashCards'
import Beat6MCQs from './beats/Beat6MCQs'
import Beat7ScoreReveal from './beats/Beat7ScoreReveal'

interface LearningFlowProps {
  currentBeat: number
  totalBeats: number
  onBeatProgress: (beatIndex: number, data: any) => void
  onNext: () => void
  onPrevious: () => void
  beatAnswers: Record<number, any>
  capturedNotes: Array<{id: string; text: string; beatId: number}>
  onAddNote: (text: string) => void
  completedBeats: number[]
  moduleComplete?: boolean
}

export default function LearningFlow({
  currentBeat,
  totalBeats,
  onBeatProgress,
  onNext,
  onPrevious,
  beatAnswers,
  capturedNotes,
  onAddNote,
  completedBeats,
  moduleComplete = false
}: LearningFlowProps) {
  const [selectedText, setSelectedText] = useState('')

  useEffect(() => {
    // Handle text selection for auto-capture
    const handleMouseUp = () => {
      const selection = window.getSelection()
      if (selection && selection.toString().length > 0) {
        setSelectedText(selection.toString())
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const beats = [
    { component: Beat1Opening, title: 'Opening Exercise', subtitle: 'Test your initial understanding' },
    { component: Beat2Segmented, title: 'Understanding Variation', subtitle: 'Why quality varies in processes' },
    { component: Beat3Video, title: 'Video Content', subtitle: 'Visual explanation of key concepts' },
    { component: Beat4Infographic, title: 'Process Insights', subtitle: 'Layered infographic breakdown' },
    { component: Beat5Matching, title: 'Concept Matching', subtitle: 'Connect related terms' },
    { component: BeatFlashCards, title: 'Flash Cards', subtitle: 'Reinforce key definitions' },
    { component: Beat6MCQs, title: 'Knowledge Check', subtitle: 'Test your understanding' },
    { component: Beat7ScoreReveal, title: 'Module Complete', subtitle: 'Review your progress' }
  ]

  const CurrentBeatComponent = beats[currentBeat]?.component
  const beatTitle = beats[currentBeat]?.title
  const beatSubtitle = beats[currentBeat]?.subtitle

  const handleCurrentBeatProgress = useCallback(
    (data: any) => onBeatProgress(currentBeat, data),
    [currentBeat, onBeatProgress]
  )

  // Calculate progress correctly: (completed beats / total beats) * 100, capped at 100%
  const progressPercentage = Math.min(Math.round((completedBeats.length / totalBeats) * 100), 100)
  const conceptsComplete = Math.min(completedBeats.length, totalBeats)

  return (
    <div className="min-h-full bg-[var(--cream)]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[var(--cream-light)] border-b border-[var(--border)] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-2xl font-condensed font-bold text-[var(--ink)]">{beatTitle}</h2>
              <p className="text-sm text-[var(--ink-mute)]">{beatSubtitle}</p>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--ink-mute)]">
                Beat {currentBeat + 1} of {totalBeats}
              </div>
              <div className="w-40 h-1.5 bg-[color:rgba(23,27,36,0.10)] rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-[var(--wine)] transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="text-xs text-[var(--ink-mute)] mt-1">{conceptsComplete} of {totalBeats} concepts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Selection Hint */}
      {selectedText && (
        <div className="sticky top-14 z-9 bg-[var(--wine)] bg-opacity-90 text-[var(--cream)] px-6 py-2 text-xs">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <span>✓ "{selectedText.substring(0, 50)}{selectedText.length > 50 ? '...' : ''}"</span>
            <button
              onClick={() => {
                onAddNote(selectedText)
                setSelectedText('')
              }}
              className="underline hover:opacity-80 transition-opacity"
            >
              Add to notes
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {CurrentBeatComponent && (
            <CurrentBeatComponent
              onProgress={handleCurrentBeatProgress}
              previousAnswer={beatAnswers[currentBeat]}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-[var(--border)]">
            <button
              onClick={onPrevious}
              disabled={currentBeat === 0}
              className="flex-1 px-4 py-3 text-sm font-medium border border-[var(--border)] text-[var(--ink)] rounded-[2px] disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--wine)] transition-colors"
              aria-label="Previous beat"
            >
              ← Previous
            </button>

            <button
              onClick={onNext}
              disabled={moduleComplete}
              className="flex-1 px-4 py-3 text-sm font-medium bg-[var(--wine)] text-[var(--cream)] rounded-[2px] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--wine-dim)] transition-colors"
              aria-label="Next beat"
            >
              {currentBeat === totalBeats - 1 ? 'Complete Module →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
