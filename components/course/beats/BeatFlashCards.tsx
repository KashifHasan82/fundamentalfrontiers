'use client'

import { useState } from 'react'

interface BeatFlashCardsProps {
  onProgress: (data: any) => void
  previousAnswer?: any
}

interface FlashCard {
  id: number
  term: string
  definition: string
}

export default function BeatFlashCards({ onProgress, previousAnswer }: BeatFlashCardsProps) {
  const cards: FlashCard[] = [
    {
      id: 1,
      term: 'Variation',
      definition: 'No two outputs of a process are ever exactly identical.'
    },
    {
      id: 2,
      term: 'Common cause',
      definition: 'Everyday scatter always present — materials, methods, environment, measurement.'
    },
    {
      id: 3,
      term: 'Special cause',
      definition: 'An unusual, one-off event that disrupts the normal pattern and needs investigation.'
    },
    {
      id: 4,
      term: 'Why it matters',
      definition: 'Variation costs money as waste, rework, and defects. Reducing it improves quality and profit.'
    }
  ]

  const [flipped, setFlipped] = useState<Record<number, boolean>>({})
  const [allReviewed, setAllReviewed] = useState(false)

  const toggleFlip = (cardId: number) => {
    const newFlipped = { ...flipped, [cardId]: !flipped[cardId] }
    setFlipped(newFlipped)

    // Check if all cards have been flipped
    const reviewedCount = Object.values(newFlipped).filter(Boolean).length
    if (reviewedCount === cards.length && !allReviewed) {
      setAllReviewed(true)
      onProgress({ cardsReviewed: cards.length, timestamp: new Date() })
    }
  }

  const reviewedCount = Object.values(flipped).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-condensed font-bold text-[var(--ink)] mb-1">Flash Cards</h2>
        <p className="text-sm text-[var(--ink-mute)]">
          Tap each card to reveal the definition. Review all cards to continue.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => toggleFlip(card.id)}
            className="relative h-48 bg-[var(--cream-light)] border border-[color:rgba(23,27,36,0.18)] rounded-[2px] p-4 cursor-pointer transition-all duration-300 hover:border-[var(--wine)] group"
            aria-label={`Flash card: ${card.term}`}
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              {flipped[card.id] ? (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)]">Definition</p>
                  <p className="text-sm text-[var(--ink-soft)] leading-relaxed">{card.definition}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--ink-mute)]">Term</p>
                  <p className="text-base font-condensed font-bold text-[var(--ink)]">{card.term}</p>
                  <p className="text-xs text-[var(--dormant)] mt-4">Tap to reveal</p>
                </div>
              )}
            </div>

            {/* Flip indicator */}
            {flipped[card.id] && (
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 rounded-full bg-[var(--done)]" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="p-3 bg-[var(--cream-soft)] border border-[color:rgba(23,27,36,0.10)] rounded-[2px]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--ink-mute)]">
            <span className="font-medium text-[var(--ink)]">{reviewedCount}</span> of{' '}
            <span className="font-medium">{cards.length}</span> cards reviewed
          </p>
          {allReviewed && (
            <p className="text-xs text-[var(--done)] font-medium">✓ Ready to continue</p>
          )}
        </div>
        <div className="w-full h-1 bg-[color:rgba(23,27,36,0.10)] rounded-full mt-2">
          <div
            className="h-full bg-[var(--wine)] rounded-full transition-all duration-300"
            style={{ width: `${(reviewedCount / cards.length) * 100}%` }}
          />
        </div>
      </div>

      {!allReviewed && (
        <div className="p-3 border-l-[3px] border-[var(--partial)] bg-[color:rgba(201,168,124,0.05)] rounded-[2px]">
          <p className="text-sm text-[var(--ink-soft)]">
            Review all cards before moving forward.
          </p>
        </div>
      )}
    </div>
  )
}
