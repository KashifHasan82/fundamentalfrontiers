'use client'

import React, { useState, useEffect } from 'react'

interface Beat5Props {
  onProgress: (data: any) => void
  previousAnswer?: any
}

export default function Beat5Matching({ onProgress, previousAnswer }: Beat5Props) {
  const [matches, setMatches] = useState<Record<number, string>>(
    previousAnswer?.matches || { 0: '', 1: '', 2: '' }
  )
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    onProgress({ matches })
  }, [matches, onProgress])

  const pairs = [
    {
      id: 0,
      term: 'Common cause variation',
      options: [
        'Natural fluctuation always present in a process',
        'A sudden disruption to normal process operation',
        'Reducing everyday scatter and removing unusual disruptions to improve quality'
      ]
    },
    {
      id: 1,
      term: 'Special cause variation',
      options: [
        'A sudden disruption to normal process operation',
        'Natural fluctuation always present in a process',
        'Reducing everyday scatter and removing unusual disruptions to improve quality'
      ]
    },
    {
      id: 2,
      term: 'Managing variation',
      options: [
        'Reducing everyday scatter and removing unusual disruptions to improve quality',
        'Natural fluctuation always present in a process',
        'A sudden disruption to normal process operation'
      ]
    }
  ]

  const correctMatches: Record<number, string> = {
    0: 'Natural fluctuation always present in a process',
    1: 'A sudden disruption to normal process operation',
    2: 'Reducing everyday scatter and removing unusual disruptions to improve quality'
  }

  const handleMatch = (termId: number, definition: string) => {
    setMatches(prev => ({
      ...prev,
      [termId]: definition
    }))
    setSelected(null)
  }

  const allMatched = Object.values(matches).every(m => m !== '')
  const correctCount = Object.entries(matches).filter(
    ([key, value]) => correctMatches[parseInt(key)] === value
  ).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Match Concepts</h2>
        <p className="text-sm text-muted-foreground">
          Connect each term on the left with its correct definition on the right. Click a term, then click a definition to match them.
        </p>
      </div>

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Terms */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Terms</h3>
          {pairs.map((pair) => (
            <div key={pair.id}>
              <button
                onClick={() => setSelected(selected === `term-${pair.id}` ? null : `term-${pair.id}`)}
                className={`w-full p-3 text-sm font-medium border-2 text-left transition-all ${
                  selected === `term-${pair.id}`
                    ? 'border-primary bg-primary text-primary-foreground'
                    : matches[pair.id]
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-foreground hover:border-primary'
                }`}
                aria-label={`Select term: ${pair.term}`}
              >
                {pair.term}
                {matches[pair.id] && (
                  <div className="text-xs opacity-75 mt-1">✓ Matched</div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Definitions */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Definitions</h3>
          <div className="space-y-3">
            {[
              'Natural fluctuations always present in a process',
              'Sudden disruption to normal process operation',
              'When only common cause variation is present'
            ].map((definition, idx) => {
              const usedBy = Object.entries(matches).find(([_, val]) => val === definition)?.[0]
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (selected?.startsWith('term-')) {
                      const termId = parseInt(selected.split('-')[1])
                      handleMatch(termId, definition)
                    }
                  }}
                  disabled={selected === null || !selected.startsWith('term-')}
                  className={`w-full p-3 text-sm text-left border-2 transition-all ${
                    usedBy !== undefined
                      ? 'border-primary bg-primary/10 text-foreground cursor-default'
                      : selected?.startsWith('term-')
                      ? 'border-secondary cursor-pointer hover:bg-secondary/10 text-foreground'
                      : 'border-border text-muted-foreground cursor-not-allowed opacity-50'
                  }`}
                  aria-label={`Definition: ${definition}`}
                >
                  {definition}
                  {usedBy !== undefined && (
                    <div className="text-xs opacity-75 mt-1">↑ Matched to term {parseInt(usedBy) + 1}</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="p-4 bg-card border-2 border-border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-muted-foreground">Matches Complete</span>
          <span className="text-sm font-bold text-primary">{Object.values(matches).filter(m => m !== '').length}/3</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(Object.values(matches).filter(m => m !== '').length / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Results */}
      {allMatched && (
        <div className={`p-4 border-2 space-y-2 animate-in fade-in ${
          correctCount === 3
            ? 'border-primary bg-primary/10'
            : 'border-accent bg-accent/10'
        }`}>
          <p className="text-sm font-semibold text-foreground">
            {correctCount === 3 ? '✓ Perfect Match!' : `✓ ${correctCount}/3 Correct`}
          </p>
          <p className="text-xs text-muted-foreground">
            {correctCount === 3
              ? 'Excellent understanding of key variation concepts!'
              : 'Review the definitions and try again to improve your understanding.'}
          </p>
        </div>
      )}
    </div>
  )
}
