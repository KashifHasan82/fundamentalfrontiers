'use client'

import React, { useState, useEffect } from 'react'

interface Beat4Props {
  onProgress: (data: any) => void
  previousAnswer?: any
}

export default function Beat4Infographic({ onProgress, previousAnswer }: Beat4Props) {
  const [activeLayer, setActiveLayer] = useState(previousAnswer?.activeLayer || 0)

  useEffect(() => {
    onProgress({ activeLayer })
  }, [activeLayer, onProgress])

  const layers = [
    {
      title: 'Common cause',
      label: 'Foundation of natural variation',
      description: 'The everyday scatter that\'s always there.',
      examples: ['Material differences', 'Operator skill', 'Environment', 'Measurement precision'],
      action: 'Accept it and work within the natural limits, while seeking gradual improvement.',
      color: 'bg-muted'
    },
    {
      title: 'Special cause',
      label: 'Disruptions and unusual events',
      description: 'Unusual events that push the process off its normal pattern.',
      examples: ['Equipment failure', 'New supplier', 'Process change', 'Unusual request'],
      action: 'Investigate immediately. Find and remove the root cause to restore normal operation.',
      color: 'bg-accent/20'
    },
    {
      title: 'Total process variation',
      label: 'What we actually see',
      description: 'The combined effect of common and special causes together.',
      examples: [],
      action: 'Use data to separate the routine scatter from the real signals, and focus effort where it matters.',
      color: 'bg-primary/10'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">The two kinds of variation</h2>
        <p className="text-sm text-muted-foreground">
          Click each tab to explore how common cause and special cause variation work differently.
        </p>
      </div>

      {/* Layer Selector */}
      <div className="grid grid-cols-3 gap-2">
        {layers.map((layer, idx) => (
          <button
            key={idx}
            onClick={() => setActiveLayer(idx)}
            className={`p-3 text-xs font-medium border-2 transition-all ${
              activeLayer === idx
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-foreground hover:border-primary'
            }`}
            aria-label={`Layer ${idx + 1}: ${layer.title}`}
          >
            <div className="text-[10px] leading-tight">{layer.title}</div>
          </button>
        ))}
      </div>

      {/* Layered Visualization */}
      <div className="relative p-6 bg-card border-2 border-border space-y-4">
        {/* Layer 1 - Base */}
        <div className="relative">
          <div className="absolute inset-0 bg-muted/30 border-2 border-muted" />
          <div className="relative p-4 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground">LAYER 1: Common Cause</div>
            <div className="h-12 bg-muted/50 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-muted-foreground">Foundation of Natural Variation</span>
            </div>
          </div>
        </div>

        {/* Layer 2 - Overlay when selected */}
        {activeLayer >= 1 && (
          <div className="relative animate-in fade-in slide-in-from-top-2">
            <div className="absolute inset-0 bg-accent/20 border-2 border-accent" />
            <div className="relative p-4 space-y-2">
              <div className="text-xs font-semibold text-accent">LAYER 2: Special Cause</div>
              <div className="h-12 bg-accent/30 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-foreground">Disruptions & Unusual Events</span>
              </div>
            </div>
          </div>
        )}

        {/* Layer 3 - Final */}
        {activeLayer >= 2 && (
          <div className="relative animate-in fade-in slide-in-from-top-2">
            <div className="absolute inset-0 bg-primary/10 border-2 border-primary" />
            <div className="relative p-4 space-y-2">
              <div className="text-xs font-semibold text-primary">TOTAL: Combined Variation</div>
              <div className="h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-foreground">What We See in Real Processes</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Layer Details */}
      <div className="p-6 bg-card border-2 border-border space-y-4">
        <div>
          <h3 className="text-base font-semibold text-foreground mb-1">
            {layers[activeLayer].title}
          </h3>
          <p className="text-xs font-medium text-muted-foreground mb-3">
            {layers[activeLayer].label}
          </p>
          <p className="text-sm text-foreground">
            {layers[activeLayer].description}
          </p>
        </div>

        {layers[activeLayer].examples.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Common examples
            </p>
            <div className="flex flex-wrap gap-2">
              {layers[activeLayer].examples.map((example, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-muted/50 border border-border text-xs text-foreground"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Action */}
        <div className="p-3 bg-muted/50 border-l-2 border-primary">
          <p className="text-xs font-semibold text-foreground mb-1">Action required</p>
          <p className="text-xs text-foreground">
            {layers[activeLayer].action}
          </p>
        </div>
      </div>
    </div>
  )
}
