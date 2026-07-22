'use client'

interface MentalMapRichProps {
  completedBeats: number[]
}

export default function MentalMapRich({ completedBeats }: MentalMapRichProps) {
  // Beat to node mapping for lighting
  const beatNodeMapping: Record<number, string[]> = {
    0: ['root', 'variation'],
    1: ['common', 'special'],
    2: [],
    3: ['cost'],
    4: [],
    5: [],
    6: ['reducing']
  }

  // Get all lit nodes
  const litNodes = new Set<string>()
  completedBeats.forEach(beat => {
    beatNodeMapping[beat]?.forEach(node => litNodes.add(node))
  })

  const getBoxClass = (nodeId: string) => {
    if (nodeId === 'root') return 'root-box'
    if (litNodes.has(nodeId)) return 'l-box'
    return 'd-box'
  }

  const getTxtClass = (nodeId: string) => {
    if (nodeId === 'root') return 'root-txt'
    if (litNodes.has(nodeId)) return 'l-txt'
    return 'd-txt'
  }

  const getLineClass = (nodeIds: string[]) => {
    const allLit = nodeIds.every(n => litNodes.has(n))
    return allLit ? 'l-line' : 'd-line'
  }

  return (
    <div className="w-full h-full overflow-auto bg-[var(--cream-soft)] p-4">
      <h3 className="text-xs uppercase tracking-[0.18em] font-bold text-[var(--ink)] mb-4">Your mental map</h3>
      <svg width="100%" viewBox="0 0 520 720" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Module 1 concept map" style={{ minWidth: '400px' }}>
        <style>{`
          .l-line{stroke:#7A1F2B;stroke-width:2;fill:none}
          .d-line{stroke:#C9B9A8;stroke-width:1.2;stroke-dasharray:4 4;fill:none}
          .l-box{fill:#7A1F2B;stroke:#5C1620;stroke-width:1}
          .root-box{fill:#5C1620;stroke:#3A0E15;stroke-width:1}
          .d-box{fill:#F0E7DA;stroke:#C9B9A8;stroke-width:1}
          .l-txt{fill:#FAF6EE;font-family:'Barlow',system-ui,sans-serif;font-size:12.5px;font-weight:500}
          .root-txt{fill:#FAF6EE;font-family:'Barlow Condensed',system-ui,sans-serif;font-size:14px;font-weight:600;letter-spacing:.03em}
          .d-txt{fill:#8A7C69;font-family:'Barlow',system-ui,sans-serif;font-size:11.5px;font-weight:400}
          .tag{fill:#B8893D;font-family:'Barlow Condensed',system-ui,sans-serif;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase}
        `}</style>

        {/* Lines */}
        <line className={getLineClass(['root', 'variation'])} data-line="root-variation" x1="120" y1="66" x2="120" y2="96"/>
        <line className={getLineClass(['variation', 'common'])} data-line="variation-common" x1="120" y1="132" x2="60" y2="166"/>
        <line className={getLineClass(['variation', 'special'])} data-line="variation-special" x1="120" y1="132" x2="180" y2="166"/>
        <line className={getLineClass(['common', 'cost'])} data-line="common-cost" x1="60" y1="202" x2="120" y2="236"/>
        <line className={getLineClass(['special', 'cost'])} data-line="special-cost" x1="180" y1="202" x2="120" y2="236"/>
        <line className={getLineClass(['cost', 'reducing'])} data-line="cost-reducing" x1="120" y1="272" x2="120" y2="306"/>

        {/* Dashed lines to locked modules */}
        <path className="d-line" d="M175 40 Q320 40 320 130"/>
        <line className="d-line" x1="320" y1="166" x2="320" y2="196"/>
        <line className="d-line" x1="320" y1="166" x2="420" y2="196"/>
        <path className="d-line" d="M178 45 Q340 60 340 290"/>
        <line className="d-line" x1="340" y1="326" x2="440" y2="326"/>
        <path className="d-line" d="M178 50 Q360 80 360 420"/>
        <line className="d-line" x1="360" y1="456" x2="440" y2="456"/>
        <path className="d-line" d="M150 55 Q250 90 250 560"/>
        <line className="d-line" x1="250" y1="596" x2="250" y2="626"/>
        <line className="d-line" x1="250" y1="596" x2="360" y2="626"/>

        {/* Nodes - Module 1.1 */}
        <g><rect className={getBoxClass('root')} data-node="root" x="72" y="30" width="96" height="36" rx="8"/>
           <text className={getTxtClass('root')} x="120" y="52" textAnchor="middle">Six Sigma</text></g>

        <text className="tag" x="20" y="120" textAnchor="start">Sub-module 1.1</text>

        <g><rect className={getBoxClass('variation')} data-node="variation" x="66" y="98" width="108" height="34" rx="7"/>
           <text className={getTxtClass('variation')} x="120" y="119" textAnchor="middle">Variation</text></g>

        <g><rect className={getBoxClass('common')} data-node="common" x="6" y="168" width="108" height="34" rx="7"/>
           <text className={getTxtClass('common')} x="60" y="189" textAnchor="middle">Common cause</text></g>

        <g><rect className={getBoxClass('special')} data-node="special" x="126" y="168" width="108" height="34" rx="7"/>
           <text className={getTxtClass('special')} x="180" y="189" textAnchor="middle">Special cause</text></g>

        <g><rect className={getBoxClass('cost')} data-node="cost" x="60" y="238" width="120" height="34" rx="7"/>
           <text className={getTxtClass('cost')} x="120" y="259" textAnchor="middle">Cost of variation</text></g>

        <g><rect className={getBoxClass('reducing')} data-node="reducing" x="54" y="308" width="132" height="34" rx="7"/>
           <text className={getTxtClass('reducing')} x="120" y="329" textAnchor="middle">Reducing variation</text></g>

        {/* Locked Modules 1.2-1.5 */}
        <text className="tag" x="286" y="118" textAnchor="start">1.2 · locked</text>
        <g><rect className="d-box" data-node="sigma" x="276" y="128" width="88" height="32" rx="7"/>
           <text className="d-txt" x="320" y="148" textAnchor="middle">Sigma (σ)</text></g>
        <g><rect className="d-box" data-node="permillion" x="276" y="198" width="88" height="32" rx="7"/>
           <text className="d-txt" x="320" y="218" textAnchor="middle">3.4 / million</text></g>
        <g><rect className="d-box" data-node="scale" x="384" y="198" width="88" height="32" rx="7"/>
           <text className="d-txt" x="428" y="218" textAnchor="middle">Sigma scale</text></g>

        <text className="tag" x="306" y="284" textAnchor="start">1.3 · locked</text>
        <g><rect className="d-box" data-node="motorola" x="296" y="294" width="98" height="32" rx="7"/>
           <text className="d-txt" x="345" y="314" textAnchor="middle">Where it began</text></g>
        <g><rect className="d-box" data-node="mrs" x="404" y="310" width="104" height="32" rx="7"/>
           <text className="d-txt" x="456" y="330" textAnchor="middle">Measure–reduce</text></g>

        <text className="tag" x="326" y="414" textAnchor="start">1.4 · locked</text>
        <g><rect className="d-box" data-node="belts" x="316" y="424" width="88" height="32" rx="7"/>
           <text className="d-txt" x="360" y="444" textAnchor="middle">Belt levels</text></g>
        <g><rect className="d-box" data-node="yellow" x="414" y="440" width="94" height="32" rx="7"/>
           <text className="d-txt" x="461" y="460" textAnchor="middle">Yellow Belt</text></g>

        <text className="tag" x="216" y="554" textAnchor="start">1.5 · locked</text>
        <g><rect className="d-box" data-node="waste" x="206" y="564" width="88" height="32" rx="7"/>
           <text className="d-txt" x="250" y="584" textAnchor="middle">Spot waste</text></g>
        <g><rect className="d-box" data-node="data" x="196" y="628" width="88" height="32" rx="7"/>
           <text className="d-txt" x="240" y="648" textAnchor="middle">Gather data</text></g>
        <g><rect className="d-box" data-node="improve" x="304" y="628" width="112" height="32" rx="7"/>
           <text className="d-txt" x="360" y="648" textAnchor="middle">Run improvements</text></g>
      </svg>
    </div>
  )
}
