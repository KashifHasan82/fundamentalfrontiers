'use client'

import { useCallback, useState } from 'react'
import { Map as MapIcon } from 'lucide-react'
import MentalMapRich from '@/components/course/mental-map-rich'
import LearningFlow from '@/components/course/learning-flow'
import NavigatorPanelNew from '@/components/course/navigator-panel-new'
import CourseHeader from '@/components/course/course-header'

function ModuleCompletionScreen({ completedBeats, onReserve }: { completedBeats: number[]; onReserve: () => void }) {
  // Static list of 6 core takeaways - no duplicates, no state-based accumulation
  const staticTakeaways = [
    'All processes vary — it\'s normal, not a defect.',
    'Common cause is everyday scatter; special cause is an unusual event.',
    'The two are fixed in completely different ways.',
    'Variation costs money as waste, rework, and defects.',
    'Reducing variation is how quality and profit improve.',
    'Telling the two types apart is the foundation of Six Sigma.'
  ]

  return (
    <div className="min-h-full bg-[var(--cream)] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Accomplishment */}
        <div className="text-center mb-8">
          <div className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)] mb-3">Module 1 of 5</div>
          <h2 className="text-3xl md:text-4xl font-bold font-condensed text-[var(--ink)] mb-3">Module complete</h2>
          <p className="text-lg text-[var(--ink-mute)] max-w-xl mx-auto">
            You&apos;ve worked through the foundations of quality variation — why processes vary, the difference between common and special cause, and why distinguishing them matters. This is where structured improvement begins.
          </p>
        </div>

        {/* What you've learned */}
        <div className="bg-[var(--cream-soft)] border border-[var(--border)] rounded-[2px] p-6 mb-6">
          <h3 className="text-base font-bold font-condensed text-[var(--ink)] mb-3">What you&apos;ve learned</h3>
          <ul className="space-y-2">
            {staticTakeaways.map((text, idx) => (
              <li key={idx} className="text-[var(--ink-mute)] text-sm flex items-start gap-3">
                <span className="text-[var(--wine)] font-bold flex-shrink-0 mt-0.5">•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bridge + value + offer */}
        <div className="border-2 border-[var(--wine)] rounded-[2px] p-6 mb-6 bg-[var(--cream-light)]">
          <p className="text-[var(--ink)] font-medium mb-3">This is one module of the full course.</p>
          <p className="text-sm text-[var(--ink-mute)] leading-relaxed mb-4">
            The complete Yellow Belt comprises 20 modules covering the full DMAIC method, the core toolkit, and the role of a Yellow Belt within an improvement team. On completion, participants receive a Fundamental Frontiers certificate of completion.
          </p>
          <p className="text-sm text-[var(--ink-mute)] leading-relaxed mb-4">
            The course is not accredited by an external body. It is priced accordingly, and focused on the quality of instruction rather than a credential.
          </p>

          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-3xl font-bold font-condensed text-[var(--wine)]">$60</span>
            <span className="text-sm text-[var(--ink-mute)]">for all 20 modules</span>
          </div>

          <div className="text-sm text-[var(--ink-mute)] mb-5 p-3 bg-[var(--cream-soft)] rounded-[2px] border-l-2 border-[var(--wine)]">
            Enrollment is open. We&apos;ll place you in the next available cohort. Each participant is assigned a trainer for questions, with an individual response within 24 hours.
          </div>

          <button
            onClick={onReserve}
            className="block w-full text-center px-6 py-3 text-base font-semibold bg-[var(--wine)] text-[var(--cream)] rounded-[2px] hover:bg-[var(--wine-dim)] transition-colors"
          >
            Enroll in the full course
          </button>
          <p className="text-center text-[11px] text-[var(--ink-mute)] mt-2">A trainer will follow up within 24 hours</p>
        </div>

        {/* Secondary: LinkedIn recommendation */}
        <div className="border border-[var(--border)] rounded-[2px] p-5 bg-[var(--cream-soft)] text-center">
          <p className="text-sm text-[var(--ink)] font-medium mb-1">Feedback</p>
          <p className="text-sm text-[var(--ink-mute)] mb-4 max-w-md mx-auto">
            If this module was useful, we welcome your feedback as a comment on the pinned post on our LinkedIn page. We periodically offer complimentary access to upcoming material for participants who provide substantive feedback; this is at our discretion and not guaranteed.
          </p>
          <a
            href="https://www.linkedin.com/company/fundamental-frontiers/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--wine)] border border-[var(--wine)] rounded-[2px] hover:bg-[var(--wine)] hover:text-[var(--cream)] transition-colors"
          >
            <span className="font-bold">in</span>
            Leave feedback on LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}

export default function CourseClient() {
  const [currentBeat, setCurrentBeat] = useState(0)
  const [moduleComplete, setModuleComplete] = useState(false)
  const [completedBeats, setCompletedBeats] = useState<number[]>([])
  const [beatAnswers, setBeatAnswers] = useState<Record<number, any>>({})
  const [capturedNotes, setCapturedNotes] = useState<Array<{id: string; text: string; beatId: number}>>([])
  const [takeaways, setTakeaways] = useState<Array<{id: string; text: string; beatId: number}>>([])
  const [showLeftPanel, setShowLeftPanel] = useState(false)
  const [showRightPanel, setShowRightPanel] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showReserve, setShowReserve] = useState(false)
  const [reserveName, setReserveName] = useState('')
  const [reserveEmail, setReserveEmail] = useState('')
  const [reserveType, setReserveType] = useState('individual')
  const [reserveStatus, setReserveStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const totalBeats = 7

  const handleReserveSubmit = async () => {
    if (!reserveName.trim() || !reserveEmail.trim()) return
    setReserveStatus('sending')
    try {
      const res = await fetch('https://formspree.io/f/xgopzknd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          full_name: reserveName,
          email: reserveEmail,
          reservation_type: reserveType,
          _subject: `Full Course Reservation (${reserveType}) — Yellow Belt`,
          _source: 'Training Module — Yellow Belt',
        }),
      })
      if (res.ok) {
        setReserveStatus('done')
      } else {
        setReserveStatus('error')
      }
    } catch {
      setReserveStatus('error')
    }
  }

  const handleBeatProgress = useCallback((beatIndex: number, data: any) => {
    setBeatAnswers(prev => ({
      ...prev,
      [beatIndex]: data
    }))

    setCompletedBeats(prev => (
      prev.includes(beatIndex) ? prev : [...prev, beatIndex]
    ))

    const beatTakeaways: Record<number, string> = {
      0: 'All processes vary — it\'s normal, not a defect.',
      1: 'Common cause is everyday scatter; special cause is an unusual event.',
      2: 'The two are fixed in completely different ways.',
      3: 'Variation costs money as waste, rework, and defects.',
      4: 'Reducing variation is how quality and profit improve.',
      5: 'Telling the two types apart is the foundation of Six Sigma.',
      6: 'You can now spot variation and support real improvement.'
    }

    const text = beatTakeaways[beatIndex]
    if (text) {
      setTakeaways(prev => (
        prev.some(item => item.beatId === beatIndex)
          ? prev
          : [...prev, { id: `beat-${beatIndex}`, text, beatId: beatIndex }]
      ))
    }
  }, [])

  const handleNextBeat = () => {
    if (currentBeat < totalBeats - 1) {
      setCurrentBeat(currentBeat + 1)
    } else if (currentBeat === totalBeats - 1) {
      // On the last beat, advance to module completion
      setModuleComplete(true)
    }
  }

  const handlePreviousBeat = () => {
    if (currentBeat > 0) {
      setCurrentBeat(currentBeat - 1)
    }
  }

  const handleJumpToBeat = (beatIndex: number) => {
    setCurrentBeat(beatIndex)
    setShowLeftPanel(false)
    setShowRightPanel(false)
  }

  const handleAddNote = (text: string) => {
    setCapturedNotes(prev => [...prev, {
      id: Date.now().toString(),
      text,
      beatId: currentBeat
    }])
  }

  const handleDeleteNote = (noteId: string) => {
    setCapturedNotes(prev => prev.filter(n => n.id !== noteId))
  }

  const handleCourseHome = () => {
    setCurrentBeat(0)
    setModuleComplete(false)
    setCompletedBeats([])
  }

  return (
    <div className="course-shell min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      {/* Welcome Modal */}
      {showWelcome && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          style={{ background: 'rgba(23,27,36,0.55)' }}
          onClick={() => setShowWelcome(false)}
        >
          <div
            className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-[2px] p-7 md:p-8"
            style={{ background: 'var(--cream-light)', border: '1px solid var(--wine)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-[2px] text-[var(--ink-mute)] hover:bg-[var(--cream-soft)] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)] mb-2">Welcome</div>
            <h2 className="text-2xl font-bold font-condensed text-[var(--ink)] mb-3 pr-6">
              Six Sigma Yellow Belt — free module
            </h2>
            <p className="text-sm text-[var(--ink-mute)] leading-relaxed mb-5">
              This is the first module of a 20-module course, offered free so you can assess the approach and the quality of instruction before enrolling.
            </p>

            <div className="text-xs uppercase tracking-[0.16em] font-bold text-[var(--ink-mute)] mb-3">How this works</div>
            <ul className="space-y-2.5 mb-5">
              <li className="text-sm text-[var(--ink-mute)] flex items-start gap-2.5">
                <span className="text-[var(--wine)] font-bold mt-0.5">•</span>
                <span><span className="font-semibold text-[var(--ink)]">Top bar</span> — indicates your position within the course</span>
              </li>
              <li className="text-sm text-[var(--ink-mute)] flex items-start gap-2.5">
                <span className="text-[var(--wine)] font-bold mt-0.5">•</span>
                <span><span className="font-semibold text-[var(--ink)]">Left panel</span> — a concept map that builds as you progress, showing how the ideas connect</span>
              </li>
              <li className="text-sm text-[var(--ink-mute)] flex items-start gap-2.5">
                <span className="text-[var(--wine)] font-bold mt-0.5">•</span>
                <span><span className="font-semibold text-[var(--ink)]">Right panel</span> — your progress and notes. Select any line of text and choose &ldquo;Add note&rdquo; to save it</span>
              </li>
              <li className="text-sm text-[var(--ink-mute)] flex items-start gap-2.5">
                <span className="text-[var(--wine)] font-bold mt-0.5">•</span>
                <span>A short assessment appears at the start and again at the end, so you can see how your understanding has developed</span>
              </li>
            </ul>

            <p className="text-sm text-[var(--ink-mute)] leading-relaxed mb-6">
              The module is interactive throughout and takes approximately 10 minutes. Enrollment information for the full course is available via &ldquo;Get the full course&rdquo; in the header and at the end of the module.
            </p>

            <button
              onClick={() => setShowWelcome(false)}
              className="w-full text-center px-6 py-3 text-base font-semibold bg-[var(--wine)] text-[var(--cream)] rounded-[2px] hover:bg-[var(--wine-dim)] transition-colors"
            >
              Begin
            </button>
          </div>
        </div>
      )}

      {/* Reservation Form Modal */}
      {showReserve && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: 'rgba(23,27,36,0.55)' }}
          onClick={() => { setShowReserve(false); setReserveStatus('idle') }}
        >
          <div
            className="relative max-w-md w-full rounded-[2px] p-7"
            style={{ background: 'var(--cream-light)', border: '1px solid var(--wine)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setShowReserve(false); setReserveStatus('idle') }}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-[2px] text-[var(--ink-mute)] hover:bg-[var(--cream-soft)] transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {reserveStatus === 'done' ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">✓</div>
                <h3 className="text-xl font-bold font-condensed text-[var(--ink)] mb-2">Thank you</h3>
                <p className="text-sm text-[var(--ink-mute)]">
                  We&apos;ve received your details, {reserveName.split(' ')[0]}. A trainer will be in touch with enrollment information within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <div className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)] mb-2">Enrollment</div>
                <h3 className="text-xl font-bold font-condensed text-[var(--ink)] mb-1">Full course — Yellow Belt</h3>
                <p className="text-sm text-[var(--ink-mute)] mb-5">
                  20 modules, $60. Enrollment is open. We&apos;ll place you in the next available cohort. Each participant is assigned a trainer for questions, with an individual response within 24 hours. Leave your details and we&apos;ll follow up with enrollment information.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">Name</label>
                    <input
                      type="text"
                      value={reserveName}
                      onChange={(e) => setReserveName(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-[2px] border border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] focus:outline-none focus:border-[var(--wine)]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">Email</label>
                    <input
                      type="email"
                      value={reserveEmail}
                      onChange={(e) => setReserveEmail(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-[2px] border border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] focus:outline-none focus:border-[var(--wine)]"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink)] mb-1">I&apos;m reserving as</label>
                    <select
                      value={reserveType}
                      onChange={(e) => setReserveType(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-[2px] border border-[var(--border)] bg-[var(--cream)] text-[var(--ink)] focus:outline-none focus:border-[var(--wine)]"
                    >
                      <option value="individual">An individual learner</option>
                      <option value="business">A team / business</option>
                    </select>
                  </div>
                </div>

                {reserveStatus === 'error' && (
                  <p className="text-xs text-[var(--wine)] mt-3">Something went wrong — please try again, or email us directly.</p>
                )}

                <button
                  onClick={handleReserveSubmit}
                  disabled={reserveStatus === 'sending' || !reserveName.trim() || !reserveEmail.trim()}
                  className="w-full mt-5 text-center px-6 py-3 text-base font-semibold bg-[var(--wine)] text-[var(--cream)] rounded-[2px] hover:bg-[var(--wine-dim)] transition-colors disabled:opacity-50"
                >
                  {reserveStatus === 'sending' ? 'Reserving…' : 'Reserve my spot'}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Course Header */}
      <CourseHeader
        currentBeat={currentBeat}
        totalBeats={totalBeats}
        onHome={handleCourseHome}
        onGetCourse={() => setShowReserve(true)}
      />

      {/* Mobile-only FF website link (header) */}
      <a
        href="/"
        className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--wine)] text-[var(--cream)] hover:bg-[var(--wine-dim)] transition-colors border-b border-[var(--border)]"
      >
        <span className="text-[10px] uppercase tracking-[0.18em] font-bold opacity-75">Fundamental Frontiers</span>
        <span className="text-sm font-semibold">Back to main website →</span>
      </a>

      {/* Desktop Layout */}
      <div className="hidden md:grid min-h-[calc(100vh-200px)] grid-cols-[33%_44%_23%] gap-px border-t border-[var(--border)]">
        {/* Left Panel: Mental Map (33%) */}
        <div className="border-r border-[var(--border)] overflow-y-auto bg-[var(--cream-soft)] relative">
          <MentalMapRich
            completedBeats={completedBeats}
          />
          {/* Always-visible FF burgundy box */}
          <div className="sticky bottom-0 left-0 right-0 px-4 pb-4 pt-6"
            style={{ background: 'linear-gradient(to top, var(--cream-soft) 60%, transparent)' }}
          >
            <a
              href="/"
              className="block max-w-[240px] mx-auto rounded-[2px] px-5 py-3 text-center transition-opacity hover:opacity-90"
              style={{ background: 'var(--wine)' }}
            >
              <div className="text-[9px] uppercase tracking-[0.18em] font-bold" style={{ color: 'rgba(245,239,230,0.7)' }}>Fundamental Frontiers</div>
              <div className="text-sm font-semibold mt-0.5" style={{ color: 'var(--cream)' }}>Back to main website →</div>
            </a>
          </div>
        </div>

        {/* Center Panel: Learning Flow */}
        <div className="overflow-y-auto border-r border-[var(--border)] bg-[var(--cream)]">
          {moduleComplete ? (
            <ModuleCompletionScreen completedBeats={completedBeats} onReserve={() => setShowReserve(true)} />
          ) : (
            <LearningFlow
              currentBeat={currentBeat}
              totalBeats={totalBeats}
              onBeatProgress={handleBeatProgress}
              onNext={handleNextBeat}
              onPrevious={handlePreviousBeat}
              beatAnswers={beatAnswers}
              capturedNotes={capturedNotes}
              onAddNote={handleAddNote}
              completedBeats={completedBeats}
              moduleComplete={moduleComplete}
            />
          )}
        </div>

        {/* Right Panel: Navigator & Notes */}
        <div className="overflow-y-auto bg-[var(--cream-soft)]">
          <NavigatorPanelNew
            currentBeat={currentBeat}
            totalBeats={totalBeats}
            completedBeats={completedBeats}
            onBeatSelect={handleJumpToBeat}
            capturedNotes={capturedNotes}
            onDeleteNote={handleDeleteNote}
            takeaways={takeaways}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col min-h-[calc(100vh-120px)]">
        {/* Mobile Overlays */}
        {showLeftPanel && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowLeftPanel(false)}
            aria-hidden="true"
          />
        )}
        {showRightPanel && (
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setShowRightPanel(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Drawers */}
        <div className={`fixed left-0 top-0 bottom-0 w-64 bg-[var(--cream-soft)] border-r border-[var(--border)] transform transition-transform z-50 overflow-hidden ${showLeftPanel ? 'translate-x-0' : '-translate-x-full'}`}>
          <MentalMapRich
            completedBeats={completedBeats}
          />
        </div>

        <div className={`fixed right-0 top-0 bottom-0 w-64 bg-[var(--cream-soft)] border-l border-[var(--border)] transform transition-transform z-50 overflow-y-auto ${showRightPanel ? 'translate-x-0' : 'translate-x-full'}`}>
          <NavigatorPanelNew
            currentBeat={currentBeat}
            totalBeats={totalBeats}
            completedBeats={completedBeats}
            onBeatSelect={handleJumpToBeat}
            capturedNotes={capturedNotes}
            onDeleteNote={handleDeleteNote}
            takeaways={takeaways}
          />
        </div>

        {/* Mobile Nav */}
        <div className="sticky top-0 z-30 bg-[var(--cream-light)] border-b border-[var(--border)]">
          {/* Prominent mental-map trigger */}
          <button
            onClick={() => setShowLeftPanel(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--wine)] text-[var(--cream)] font-semibold text-sm hover:bg-[var(--wine-dim)] transition-colors"
            aria-label="Open the mental map"
          >
            <MapIcon size={18} className="flex-shrink-0" />
            Click here for the mental map
          </button>
          {/* Secondary row: progress + notes */}
          <div className="px-3 py-2 flex items-center justify-between gap-2">
            <div className="text-xs font-medium text-[var(--ink-mute)]">
              Beat {currentBeat + 1} / {totalBeats}
            </div>
            <button
              onClick={() => setShowRightPanel(!showRightPanel)}
              className="px-3 py-1.5 text-xs rounded-[2px] border border-[var(--border)] hover:border-[var(--wine)] transition-colors"
              aria-label="Toggle notes"
            >
              Notes
            </button>
          </div>
        </div>

        {/* Mobile Center Content */}
        <div className="flex-1 overflow-y-auto bg-[var(--cream)]">
          {moduleComplete ? (
            <ModuleCompletionScreen completedBeats={completedBeats} onReserve={() => setShowReserve(true)} />
          ) : (
            <LearningFlow
              currentBeat={currentBeat}
              totalBeats={totalBeats}
              onBeatProgress={handleBeatProgress}
              onNext={handleNextBeat}
              onPrevious={handlePreviousBeat}
              beatAnswers={beatAnswers}
              capturedNotes={capturedNotes}
              onAddNote={handleAddNote}
              completedBeats={completedBeats}
              moduleComplete={moduleComplete}
            />
          )}
        </div>

        {/* Mobile-only FF website link (footer) */}
        <a
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-[var(--wine)] text-[var(--cream)] hover:bg-[var(--wine-dim)] transition-colors border-t border-[var(--border)]"
        >
          <span className="text-[10px] uppercase tracking-[0.18em] font-bold opacity-75">Fundamental Frontiers</span>
          <span className="text-sm font-semibold">Back to main website →</span>
        </a>
      </div>
    </div>
  )
}
