'use client'

import React, { useState, useEffect } from 'react'

interface Beat2Props {
  onProgress: (data: any) => void
  previousAnswer?: any
}

export default function Beat2Segmented({ onProgress, previousAnswer }: Beat2Props) {
  const [stage, setStage] = useState(previousAnswer?.stage || 1)

  useEffect(() => {
    onProgress({ stage })
  }, [stage, onProgress])

  return (
    <div className="space-y-6">
      {/* Segment 1 */}
      <div className="p-6 bg-card border-2 border-border space-y-4">
        <h3 className="text-base font-semibold text-foreground">The nature of quality variation</h3>
        <p className="text-sm leading-relaxed text-foreground">
          Here is the single most important idea in all of Six Sigma: everything varies. Whether you&apos;re making car parts, serving coffee, filling out forms, or writing software, no two outputs are ever exactly the same. This isn&apos;t a sign that something is broken — it&apos;s a basic property of how any real process works.
        </p>
      </div>

      {/* Continue Button to Stage 2 */}
      {stage === 1 && (
        <button
          onClick={() => setStage(2)}
          className="w-full px-4 py-3 bg-primary text-primary-foreground font-medium border-2 border-primary hover:opacity-90 transition-opacity"
        >
          Continue Reading →
        </button>
      )}

      {/* Segment 2 */}
      {stage >= 2 && (
        <div className="p-6 bg-card border-2 border-border space-y-4 animate-in fade-in">
          <h3 className="text-base font-semibold text-foreground">Sources of variation</h3>
          <p className="text-sm leading-relaxed text-foreground">
            That variation is not free. Every difference between one output and the next shows up somewhere — as waste, as rework, as a defect, or as a customer who didn&apos;t get quite what they expected. Small variations, repeated thousands of times, become real money and real problems. Six Sigma exists to understand that variation, measure it, and reduce it.
          </p>
          <p className="text-sm leading-relaxed text-foreground mt-4 font-medium">Variation comes from two kinds of sources:</p>
          <div className="space-y-3 ml-4">
            <div className="border-l-2 border-primary pl-3">
              <p className="text-sm font-medium text-foreground">Common cause variation</p>
              <p className="text-xs text-muted-foreground mt-1">
                The natural, everyday scatter that is always present in a process: differences in raw materials, operator skill, environmental conditions, and measurement precision.
              </p>
            </div>
            <div className="border-l-2 border-accent pl-3">
              <p className="text-sm font-medium text-foreground">Special cause variation</p>
              <p className="text-xs text-muted-foreground mt-1">
                An unusual, one-off event that disrupts the normal pattern: an equipment fault, a new supplier, a process change, or an unusual request.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Continue Button to Stage 3 */}
      {stage === 2 && (
        <button
          onClick={() => setStage(3)}
          className="w-full px-4 py-3 bg-primary text-primary-foreground font-medium border-2 border-primary hover:opacity-90 transition-opacity"
        >
          Continue Reading →
        </button>
      )}

      {/* Segment 3 */}
      {stage >= 3 && (
        <div className="p-6 bg-card border-2 border-border space-y-4 animate-in fade-in">
          <h3 className="text-base font-semibold text-foreground">Why It Matters</h3>
          <p className="text-sm leading-relaxed text-foreground">
            Recognizing and managing variation is why Six Sigma exists. By reducing variation, organizations:
          </p>
          <ul className="space-y-2 ml-4 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Improve consistency and predictability of outcomes</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Reduce costs associated with rework, waste, and defects</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Enhance customer satisfaction through reliable products and services</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span className="text-foreground">Make better decisions based on data rather than intuition</span>
            </li>
          </ul>
        </div>
      )}

      {/* Summary */}
      {stage >= 3 && (
        <div className="p-4 bg-muted/50 border-2 border-muted space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Takeaway</p>
          <p className="text-sm text-foreground">
            Variation is inevitable, but it&apos;s also manageable. The first step in quality improvement is understanding where variation comes from, then using tools to measure, analyze, and reduce it strategically.
          </p>
        </div>
      )}
    </div>
  )
}
