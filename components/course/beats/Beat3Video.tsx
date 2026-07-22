'use client'

import React, { useEffect } from 'react'
import { Lock } from 'lucide-react'

interface Beat3Props {
  onProgress: (data: any) => void
  previousAnswer?: any
}

export default function Beat3Video({ onProgress, previousAnswer }: Beat3Props) {
  useEffect(() => {
    onProgress({ viewed: true })
  }, [onProgress])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">What is variation?</h2>
        <p className="text-sm text-muted-foreground">
          Duration: 1:30
        </p>
      </div>

      {/* Video Frame — styled to look like a real player, marked as full-course content */}
      <div className="relative w-full aspect-video border-2 border-border overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #EEE6D9 0%, #E4D9C9 100%)' }}
      >
        {/* Play button (recognisable video language) */}
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div
            className="relative flex items-center justify-center rounded-full shadow-md"
            style={{
              width: '76px',
              height: '76px',
              background: 'var(--wine)',
              opacity: 0.92,
            }}
          >
            {/* Play triangle */}
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '15px solid transparent',
                borderBottom: '15px solid transparent',
                borderLeft: '24px solid #F5EFE6',
                marginLeft: '6px',
              }}
            />
            {/* Small lock badge on the play button */}
            <div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                width: '26px',
                height: '26px',
                bottom: '-6px',
                right: '-6px',
                background: 'var(--cream-light)',
                border: '1.5px solid var(--wine)',
              }}
            >
              <Lock size={13} style={{ color: 'var(--wine)' }} />
            </div>
          </div>

          <div className="text-center px-6">
            <p className="text-sm font-semibold" style={{ color: 'var(--wine)' }}>
              Video lessons are included in the full course
            </p>
            <p className="text-xs mt-1 max-w-[44ch]" style={{ color: 'var(--muted-foreground)' }}>
              This concept is covered in full below through text and visuals. The complete course adds a guided video for each concept.
            </p>
          </div>
        </div>
      </div>

      {/* Content Description — kept, so the free learner still gets the substance */}
      <div className="space-y-4">
        <div className="p-4 bg-card border-2 border-border">
          <h3 className="text-sm font-semibold text-foreground mb-2">What you&apos;d see</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A simple animation of a process producing 30 outputs in a row. Most cluster around a target value; a few sit noticeably higher or lower. The takeaway: variation is normal — but some of it is routine, and some is a signal that something has changed.
          </p>
        </div>

        <div className="p-4 bg-secondary/10 border-2 border-secondary">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Insight</p>
          <p className="text-sm text-foreground">
            Telling routine variation apart from a real signal is the whole game — and you fix each one in a completely different way.
          </p>
        </div>
      </div>

      {/* Interactive Element */}
      <div className="p-4 bg-card border-2 border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Variation Distribution</h3>
        <div className="space-y-2">
          {[
            { label: 'High Variation', percent: 75, color: 'bg-primary' },
            { label: 'Moderate Variation', percent: 55, color: 'bg-accent' },
            { label: 'Low Variation', percent: 25, color: 'bg-secondary' }
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.percent}% spread</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${item.color} rounded-full`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
