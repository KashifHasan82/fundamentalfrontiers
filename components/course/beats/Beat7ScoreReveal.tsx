'use client'

import React, { useState, useEffect } from 'react'

interface Beat7Props {
  onProgress: (data: any) => void
  previousAnswer?: any
}

export default function Beat7ScoreReveal({ onProgress, previousAnswer }: Beat7Props) {
  const [showReplay, setShowReplay] = useState(previousAnswer?.showReplay || false)
  const [replayAnswers, setReplayAnswers] = useState(previousAnswer?.replayAnswers || { slider1: '', slider2: '', mcq: '' })

  useEffect(() => {
    onProgress({ showReplay, replayAnswers })
  }, [showReplay, replayAnswers, onProgress])

  const initialScore = {
    openingExerciseCorrect: false,
    knownsImprovement: 45,
    conceptsUnderstanding: 85,
    totalCompletion: 100
  }

  return (
    <div className="space-y-8">
      {/* Module Completion Header */}
      <div className="text-center py-8 px-6 bg-primary/10 border-2 border-primary">
        <h2 className="text-2xl font-bold text-foreground mb-2">Module Complete!</h2>
        <p className="text-sm text-muted-foreground">You&apos;ve learned about quality variation and why it matters.</p>
      </div>

      {/* Score Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card border-2 border-border text-center space-y-2">
          <div className="text-3xl font-bold text-primary">85%</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Concepts Understanding
          </div>
          <div className="text-xs text-muted-foreground">
            Strong grasp of variation principles
          </div>
        </div>

        <div className="p-4 bg-card border-2 border-border text-center space-y-2">
          <div className="text-3xl font-bold text-accent">+45%</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Knowledge Improvement
          </div>
          <div className="text-xs text-muted-foreground">
            Growth from pre-assessment
          </div>
        </div>

        <div className="p-4 bg-card border-2 border-border text-center space-y-2">
          <div className="text-3xl font-bold text-secondary">100%</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Module Completion
          </div>
          <div className="text-xs text-muted-foreground">
            All beats completed
          </div>
        </div>
      </div>

      {/* Key Learnings */}
      <div className="p-6 bg-card border-2 border-border space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Your Key Learnings</h3>
        <ul className="space-y-3">
          {[
            'Variation is inherent in all processes, but manageable',
            'Common cause variation requires systematic improvement',
            'Special cause variation requires immediate investigation',
            'Understanding variation guides better decision-making',
            'Six Sigma uses data to reduce variation strategically'
          ].map((learning, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-primary font-bold flex-shrink-0">✓</span>
              <span className="text-sm text-foreground">{learning}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Comparison with Opening Exercise */}
      <div className="p-6 bg-secondary/10 border-2 border-secondary space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Opening Exercise Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Let&apos;s see how your understanding has evolved. Here are your original answers compared to the concepts you&apos;ve learned.
        </p>

        <button
          onClick={() => setShowReplay(!showReplay)}
          className="px-4 py-2 text-sm font-medium border-2 border-secondary text-foreground hover:bg-secondary/20 transition-colors"
        >
          {showReplay ? 'Hide Comparison' : 'Show Comparison'}
        </button>

        {showReplay && (
          <div className="space-y-3 pt-4 border-t-2 border-secondary">
            <div className="p-3 bg-card border-2 border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Original Assessment: Process Consistency</p>
              <p className="text-sm text-foreground">
                You rated your process consistency at ~45%. After this module, you now understand that achieving perfect consistency is impossible—but reducing variation is achievable and valuable.
              </p>
            </div>

            <div className="p-3 bg-card border-2 border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Original Assessment: Quality Variation Importance</p>
              <p className="text-sm text-foreground">
                You correctly identified quality variation as critical (85-95%). This understanding is the foundation for everything you&apos;ll learn in Six Sigma.
              </p>
            </div>

            <div className="p-3 bg-card border-2 border-border">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Original Assessment: Why Quality Varies</p>
              <p className="text-sm text-foreground">
                You now know that quality varies due to systematic variations in materials, methods, and measurements—not just random factors or employee mistakes. This insight will guide your improvement efforts.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Next Steps */}
      <div className="p-6 bg-accent/10 border-2 border-accent space-y-4">
        <h3 className="text-lg font-semibold text-foreground">What&apos;s Next?</h3>
        <p className="text-sm text-muted-foreground">
          You&apos;ve completed Sub-Module 1.1: &quot;Why quality varies and why it matters.&quot; The next sub-modules will teach you:
        </p>
        <ul className="space-y-2 text-sm">
          <li className="flex gap-2">
            <span className="text-accent font-bold">▸</span>
            <span className="text-foreground">Sub-Module 1.2: Measuring Variation (Control Charts)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">▸</span>
            <span className="text-foreground">Sub-Module 1.3: Process Capability Analysis</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">▸</span>
            <span className="text-foreground">Module 2: Defining Problems and Opportunities</span>
          </li>
        </ul>
      </div>

      {/* Completion Certificate */}
      <div className="p-8 bg-card border-4 border-primary text-center space-y-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Certificate of Completion</p>
        <h3 className="text-2xl font-bold text-primary">Sub-Module 1.1</h3>
        <p className="text-sm text-foreground">Why Quality Varies and Why It Matters</p>
        <p className="text-xs text-muted-foreground">Completed on {new Date().toLocaleDateString()}</p>
        <div className="pt-4 border-t-2 border-border">
          <p className="text-xs text-muted-foreground">
            This learner has successfully completed all learning objectives and demonstrated understanding of variation concepts.
          </p>
        </div>
      </div>

      {/* Resources */}
      <div className="p-4 bg-muted/50 border-2 border-muted">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Additional Resources</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Download summary: Key Concepts in Variation Management</li>
          <li>• Reference guide: Common vs. Special Cause Variation</li>
          <li>• Video: Real-world examples of quality improvement</li>
        </ul>
      </div>
    </div>
  )
}
