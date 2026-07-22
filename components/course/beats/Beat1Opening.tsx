'use client'

import React, { useState, useEffect } from 'react'

interface Beat1Props {
  onProgress: (data: any) => void
  previousAnswer?: any
}

export default function Beat1Opening({ onProgress, previousAnswer }: Beat1Props) {
  const [slider1, setSlider1] = useState(previousAnswer?.slider1 || 50)
  const [slider2, setSlider2] = useState(previousAnswer?.slider2 || 50)
  const [mcq, setMcq] = useState(previousAnswer?.mcq || '')
  const [showComparison, setShowComparison] = useState(previousAnswer?.showComparison || false)

  useEffect(() => {
    onProgress({ slider1, slider2, mcq, showComparison })
  }, [slider1, slider2, mcq, showComparison, onProgress])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Initial Assessment</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Before we begin, let&apos;s test your instinct. Answer honestly — we&apos;ll come back to this at the end and see how your thinking has sharpened.
        </p>
        <p className="text-sm text-foreground mb-4">
          A small coffee shop sells 300 cups a day. The owner prides herself on consistency — but no two lattes are ever truly identical. Some cups are a little fuller, some a little hotter, some take longer to make. Most customers never notice. Yet across a whole year, those small differences add up to wasted milk, wasted time, and the occasional complaint.
        </p>
      </div>

      {/* Slider 1 */}
      <div className="space-y-3 p-4 bg-card border-2 border-border">
        <label className="text-sm font-medium text-foreground">
          How consistent do you think a well-run process usually is?
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={slider1}
            onChange={(e) => setSlider1(parseInt(e.target.value))}
            className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer"
            aria-label="Process consistency rating"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Not at all consistent</span>
            <span className="font-semibold text-primary">{slider1}%</span>
            <span>Highly consistent</span>
          </div>
        </div>
      </div>

      {/* Slider 2 */}
      <div className="space-y-3 p-4 bg-card border-2 border-border">
        <label className="text-sm font-medium text-foreground">
          How much do you think everyday variation matters to a business?
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={slider2}
            onChange={(e) => setSlider2(parseInt(e.target.value))}
            className="w-full h-1 bg-muted rounded-full appearance-none cursor-pointer"
            aria-label="Quality variation importance"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Doesn&apos;t matter</span>
            <span className="font-semibold text-primary">{slider2}%</span>
            <span>Critical</span>
          </div>
        </div>
      </div>

      {/* MCQ */}
      <div className="space-y-3 p-4 bg-card border-2 border-border">
        <label className="text-sm font-medium text-foreground">
          Which best describes why quality varies in processes?
        </label>
        <div className="space-y-2">
          {[
            { id: 'a', label: 'Only random, unpredictable factors' },
            { id: 'b', label: 'Systematic differences in materials, methods, machines, people, and measurement' },
            { id: 'c', label: 'Only employee mistakes' },
            { id: 'd', label: 'Only external factors beyond our control' }
          ].map((option) => (
            <label key={option.id} className="flex items-center gap-3 p-2 border-2 border-border cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="radio"
                name="mcq"
                value={option.id}
                checked={mcq === option.id}
                onChange={(e) => setMcq(e.target.value)}
                className="w-4 h-4 cursor-pointer"
              />
              <span className="text-sm text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Show Comparison Button */}
      <button
        onClick={() => setShowComparison(!showComparison)}
        className="w-full px-4 py-3 bg-primary text-primary-foreground font-medium border-2 border-primary hover:opacity-90 transition-opacity"
      >
        {showComparison ? 'Hide Comparison' : 'Reveal Comparison'}
      </button>

      {/* Comparison Results */}
      {showComparison && (
        <div className="p-4 bg-secondary/10 border-2 border-secondary space-y-3">
          <h3 className="font-semibold text-foreground">Your Assessment vs. Expected Results</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Process consistency:</span>
              <span className="font-medium">{slider1}% (Expected: 35-45%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Quality variation importance:</span>
              <span className="font-medium">{slider2}% (Expected: 85-95%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Correct MCQ answer:</span>
              <span className="font-medium">{mcq === 'b' ? '✓ Correct' : '✗ Incorrect (Answer: B)'}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Don&apos;t worry if your instinct differed — that&apos;s exactly what this section will sharpen.
          </p>
        </div>
      )}
    </div>
  )
}
