'use client'

import { Home, Lock } from 'lucide-react'
import Link from 'next/link'

interface CourseHeaderProps {
  currentBeat: number
  totalBeats: number
  onHome: () => void
  onGetCourse: () => void
}

const MODULES = [
  { id: 1, title: 'What Six Sigma is' },
  { id: 2, title: 'Variation & cost of poor quality' },
  { id: 3, title: 'DMAIC — the method' },
  { id: 4, title: 'The basic toolkit' },
  { id: 5, title: 'Being a Yellow Belt on a team' },
]

const SUBMODULES = [
  { id: '1.1', title: 'Why quality varies and why it matters' },
  { id: '1.2', title: 'What "Six Sigma" actually means' },
  { id: '1.3', title: 'Where it came from and why it works' },
  { id: '1.4', title: 'The belt system' },
  { id: '1.5', title: "What you'll be able to do" },
]

const CURRENT_MODULE = 1
const CURRENT_SUBMODULE = '1.1'

export default function CourseHeader({ currentBeat, totalBeats, onHome, onGetCourse }: CourseHeaderProps) {
  const completionPercent = Math.round(((currentBeat + 1) / totalBeats) * 100)

  return (
    <div className="bg-[var(--cream-soft)] border-b border-[var(--border)]">
      {/* Top header bar */}
      <div className="px-6 py-3 flex items-center justify-between gap-4 border-b border-[color:rgba(23,27,36,0.08)]">
        {/* Left: Course home + FF wordmark */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button
            onClick={onHome}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--wine)] border border-[var(--wine)] rounded-[2px] hover:bg-[var(--wine)] hover:text-[var(--cream)] transition-colors"
            aria-label="Course home"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Course home</span>
          </button>
          <Link
            href="/"
            className="hidden md:block px-3 py-1.5 rounded-[2px] border border-[var(--wine)] leading-tight hover:bg-[var(--wine)] hover:text-[var(--cream)] transition-colors group"
            title="Back to Fundamental Frontiers"
          >
            <div className="text-xs font-bold font-condensed text-[var(--wine)] group-hover:text-[var(--cream)]">Fundamental Frontiers</div>
            <div className="text-[10px] text-[var(--ink-mute)] group-hover:text-[var(--cream)]">← back to main website</div>
          </Link>
        </div>

        {/* Center: title */}
        <div className="text-center">
          <h1 className="text-lg font-bold font-condensed text-[var(--ink)]">Six Sigma Yellow Belt</h1>
          <p className="text-xs text-[var(--ink-mute)] mt-0.5">
            Module {CURRENT_MODULE} of {MODULES.length} — {MODULES[CURRENT_MODULE - 1].title}
          </p>
        </div>

        {/* Right: Get the full course CTA + progress */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--ink-mute)]">Beat {currentBeat + 1} of {totalBeats}</div>
            <div className="text-sm font-semibold text-[var(--wine)] mt-1">{completionPercent}% complete</div>
          </div>
          <button
            onClick={onGetCourse}
            className="px-3 py-2 text-sm font-semibold bg-[var(--wine)] text-[var(--cream)] rounded-[2px] hover:bg-[var(--wine-dim)] transition-colors whitespace-nowrap"
          >
            Get the full course
          </button>
        </div>
      </div>

      {/* Course roadmap: all 5 modules as a path */}
      <div className="px-6 py-4 bg-[var(--cream)] border-b border-[color:rgba(23,27,36,0.08)]">
        <div className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--ink-mute)] mb-3">Course roadmap</div>
        <div className="flex items-stretch gap-2 overflow-x-auto pb-1">
          {MODULES.map((module, idx) => {
            const isActive = module.id === CURRENT_MODULE
            const isLocked = module.id > CURRENT_MODULE
            return (
              <div key={module.id} className="flex items-stretch gap-2 flex-shrink-0">
                <div
                  className={`px-3 py-2 rounded-[2px] border text-sm min-w-[130px] max-w-[160px] ${
                    isActive
                      ? 'bg-[var(--wine)] text-[var(--cream)] border-[var(--wine)]'
                      : 'bg-[var(--cream-soft)] text-[var(--dormant)] border-[color:rgba(23,27,36,0.12)]'
                  }`}
                >
                  <div className={`text-[10px] uppercase tracking-[0.12em] font-bold flex items-center gap-1 ${isActive ? 'text-[var(--cream)] opacity-80' : 'text-[var(--dormant)]'}`}>
                    {isLocked && <Lock size={9} className="flex-shrink-0" />}
                    Module {module.id}
                    {isActive && <span className="ml-1 normal-case tracking-normal opacity-90">· you are here</span>}
                  </div>
                  <div className="font-condensed leading-tight mt-0.5">{module.title}</div>
                </div>
                {idx < MODULES.length - 1 && (
                  <div className="flex items-center text-[var(--dormant)] text-lg flex-shrink-0">→</div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Sub-module path for the active module */}
      <div className="px-6 py-3 bg-[var(--cream-soft)]">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--wine)] flex-shrink-0">Module 1 · sub-modules</div>
          <div className="flex items-center gap-2 overflow-x-auto">
            {SUBMODULES.map((sub, idx) => {
              const isActive = sub.id === CURRENT_SUBMODULE
              return (
                <div key={sub.id} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`px-2 py-1 rounded-[2px] text-xs flex items-center gap-1 ${
                      isActive
                        ? 'bg-[var(--wine)] text-[var(--cream)] font-medium'
                        : 'bg-[var(--cream)] text-[var(--dormant)] border border-[color:rgba(23,27,36,0.10)]'
                    }`}
                    title={sub.title}
                  >
                    {!isActive && <Lock size={9} className="flex-shrink-0" />}
                    <span className="font-condensed">{sub.id}</span>
                  </div>
                  {idx < SUBMODULES.length - 1 && (
                    <div className="text-[var(--dormant)] text-xs flex-shrink-0">·</div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-xs text-[var(--ink-mute)] flex-shrink-0 ml-auto hidden sm:block">
            Currently: 1.1 — {SUBMODULES[0].title}
          </div>
        </div>
      </div>
    </div>
  )
}
