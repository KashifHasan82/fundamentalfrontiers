'use client'

import React, { useState, useEffect } from 'react'

interface Beat6Props {
  onProgress: (data: any) => void
  previousAnswer?: any
}

export default function Beat6MCQs({ onProgress, previousAnswer }: Beat6Props) {
  const [answers, setAnswers] = useState<Record<string, string>>(previousAnswer?.answers || { q1: '', q2: '' })
  const [submitted, setSubmitted] = useState(previousAnswer?.submitted || false)

  useEffect(() => {
    onProgress({ answers, submitted })
  }, [answers, submitted, onProgress])

  const questions = [
    {
      id: 'q1',
      question: 'Which of these is an example of COMMON cause variation?',
      options: [
        { id: 'a', label: 'A supplier sends a batch of defective parts', feedback: 'This is special cause variation—an unexpected disruption.' },
        { id: 'b', label: 'Natural differences in material, within specification, from approved suppliers', feedback: 'Correct — that\'s normal variation within expected limits.' },
        { id: 'c', label: 'A machine breaks down unexpectedly', feedback: 'This is special cause variation—an equipment failure.' },
        { id: 'd', label: 'A new, untrained employee makes more errors than usual', feedback: 'This is special cause variation—an unusual event.' }
      ],
      correct: 'b'
    },
    {
      id: 'q2',
      question: 'Why does understanding variation matter in Six Sigma?',
      options: [
        { id: 'a', label: 'To eliminate every difference in output (impossible)', feedback: 'Not practical or possible—some variation is always present.' },
        { id: 'b', label: 'To tell normal process behaviour apart from unusual events that need investigation', feedback: 'Correct — this lets teams respond appropriately and avoid over-correcting.' },
        { id: 'c', label: 'To assign blame for poor quality', feedback: 'Understanding variation helps us see systematic issues, not just assign blame.' },
        { id: 'd', label: 'To justify why problems exist', feedback: 'Six Sigma uses this understanding to reduce problems, not justify them.' }
      ],
      correct: 'b'
    }
  ]

  const handleAnswerChange = (questionId: string, optionId: string) => {
    if (!submitted) {
      setAnswers(prev => ({
        ...prev,
        [questionId]: optionId
      }))
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  const allAnswered = Object.values(answers).every(a => a !== '')

  const correctCount = questions.filter(q => answers[q.id] === q.correct).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground">
          Answer these questions to reinforce your understanding of quality variation.
        </p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => (
          <div key={q.id} className="p-6 bg-card border-2 border-border space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Question {qIdx + 1} of {questions.length}
            </h3>
            <p className="text-base font-medium text-foreground">{q.question}</p>

            <div className="space-y-2">
              {q.options.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-3 p-3 border-2 cursor-pointer transition-all ${
                    answers[q.id] === option.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-muted-foreground'
                  } ${submitted && answers[q.id] === option.id && option.id === q.correct ? 'bg-primary/20' : ''}`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={option.id}
                    checked={answers[q.id] === option.id}
                    onChange={() => handleAnswerChange(q.id, option.id)}
                    disabled={submitted}
                    className="w-4 h-4 mt-0.5 cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{option.label}</div>
                    {submitted && answers[q.id] === option.id && (
                      <div className={`text-xs mt-2 p-2 border-l-2 ${
                        option.id === q.correct
                          ? 'border-primary text-primary-foreground bg-primary/10'
                          : 'border-accent text-accent-foreground bg-accent/10'
                      }`}>
                        {option.feedback}
                      </div>
                    )}
                  </div>
                  {submitted && option.id === q.correct && (
                    <span className="text-primary font-bold text-lg">✓</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="w-full px-4 py-3 bg-primary text-primary-foreground font-medium border-2 border-primary disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          Submit Answers
        </button>
      )}

      {/* Results */}
      {submitted && (
        <div className={`p-6 border-2 space-y-4 animate-in fade-in ${
          correctCount === questions.length
            ? 'border-primary bg-primary/10'
            : correctCount >= 1
            ? 'border-secondary bg-secondary/10'
            : 'border-accent bg-accent/10'
        }`}>
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold text-foreground">Results</h3>
            <span className="text-2xl font-bold text-primary">{correctCount}/{questions.length}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {correctCount === questions.length
              ? 'Excellent! You have a solid understanding of variation concepts.'
              : correctCount >= 1
              ? 'Good effort! Review the feedback above to strengthen your understanding.'
              : 'Keep learning! Review the course material and try again.'}
          </p>
          <button
            onClick={() => {
              setAnswers({ q1: '', q2: '' })
              setSubmitted(false)
            }}
            className="mt-4 px-4 py-2 text-sm border-2 border-muted text-foreground hover:border-primary transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
