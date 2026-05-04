FF MOBILE PASS — PATCH 1
========================

Drop-replace these 12 files into your project. Folder structure mirrors
the project, so unzip and merge over `FF_Claude_WS/` and you're done.

Backup first: copy your project folder to FF_Claude_WS_backup before merging.

FILES IN THIS ZIP
-----------------
  app/globals.css
  app/page.tsx
  components/brand/about-modal.tsx
  components/brand/buttons.tsx
  components/brand/cta-strip.tsx
  components/brand/homepage-hero.tsx
  components/brand/modal-shell.tsx
  components/brand/principles-modal.tsx
  components/brand/request-modal.tsx
  components/brand/site-footer.tsx
  components/brand/site-header.tsx
  components/brand/tab-nav.tsx


WHAT CHANGED (mobile-only — desktop is bit-identical)
-----------------------------------------------------

site-header.tsx
  • Mobile (< lg): logo + hamburger only. Drawer slides down from header
    with all nav items + Book a call CTA + LinkedIn link.
  • Header height: h-20 mobile, h-24 desktop (locked).
  • Body scroll locks while drawer open. Esc closes.
  • Desktop layout completely unchanged.

tab-nav.tsx
  • Mobile: horizontal scroll strip, hidden scrollbar, partial-visible
    second tab for swipe affordance.
  • Smaller mobile padding (py-6 px-5) vs desktop (lg:py-8 lg:px-6).
  • Smaller mobile title (text-base) vs desktop (lg:text-lg).
  • Desktop 3-up flex-1 grid completely unchanged.

modal-shell.tsx
  • Top spacer responsive: pt-20 mobile / pt-24 desktop (clears the
    matching mobile / desktop header height).

homepage-hero.tsx
  • Mobile: pt-20 + pb-16, no min-h forcing.
  • Desktop: pt-24 + min-h-[78vh] (locked, unchanged).
  • Container padding: px-6 mobile / lg:px-16 desktop (locked).

buttons.tsx
  • PrimaryCTA + OutlineCTA: px-8 py-4 mobile / lg:px-10 lg:py-5 desktop.

cta-strip.tsx
  • Same mobile button padding pattern (px-8 py-4 / lg:px-10 lg:py-5).
  • Desktop visuals unchanged.

request-modal.tsx
  • Form padding: p-6 mobile / lg:p-10 desktop. Same for confirmation.

about-modal.tsx
  • Section padding: py-20 mobile / lg:py-32 desktop (3 sections).
  • Container padding: px-6 lg:px-16.
  • Hero: pt-20 + pb-16 mobile / lg:pt-24 + lg:min-h-[78vh] desktop.
  • Section header bottom margin: mb-10 mobile / lg:mb-16 desktop.
  • Card padding: p-6 mobile / lg:p-10 desktop.
  • Team detail panel: p-6 mobile / lg:p-12 desktop.
  • Body paragraph block gap: gap-6 mobile / lg:gap-20 desktop.

principles-modal.tsx
  • Same patterns as about-modal: hero pt-20+pb-16, section py-20 lg:py-32,
    container px-6 lg:px-16, header mb-10 lg:mb-16, cells p-6 lg:p-10.

site-footer.tsx
  • Container padding: px-6 lg:px-16.
  • Bottom row links use flex-wrap + justify-center on mobile so
    Principles/LinkedIn/Privacy/Terms don't overflow at narrow widths.

globals.css
  • Responsive scroll-padding-top: 6rem mobile (clears 80px header) /
    7rem desktop (clears 96px header).

app/page.tsx
  • Container padding everywhere: px-6 lg:px-16 (mobile breath +8px).
  • Accordion header: gap-5 mobile / lg:gap-12 desktop (number↔content).
  • Accordion plus button: w-12 h-12 mobile / lg:w-14 lg:h-14 desktop,
    flex-shrink-0 added so it doesn't squish at narrow widths.
  • Credential panels (Services + Programs tabs): p-6 mobile / lg:p-10.
  • Selected Work cards: p-8 mobile / lg:p-10 desktop.
  • Selected Work header: mb-10 mobile / lg:mb-16 desktop.
  • Accordion scroll offset: 80px mobile / 96px desktop (matches header).


TEST CHECKLIST
--------------
At ≤768px viewport:
  [ ] Hamburger opens drawer, drawer items work, body doesn't scroll
      while open, Esc + tap-outside (logo, nav-item) close drawer.
  [ ] Hero text fits without overflow at 320px viewport (iPhone SE).
  [ ] Accordion: tap to open, tap another to switch, scroll lands the
      header just under the (smaller) mobile header bar.
  [ ] Service / Programs tabs: swipe horizontally, active tab indicates,
      no scrollbar visible, content panel below works.
  [ ] Industries: 8 cards stacked, all readable.
  [ ] Selected Work: 3 cards stacked, request CTA tappable.
  [ ] CTA Strip: heading + 2 buttons stack, both buttons tappable.
  [ ] Request modal: opens, form fields work, no horizontal scroll.
  [ ] About / Principles modals: hero text-only (image hidden lg+),
      sections breathe, team showcase usable on phone.
  [ ] Footer: bottom-row links wrap cleanly, no overflow.

At ≥1024px viewport:
  [ ] Identical to before — flicker-test the homepage and modals.


PENDING (later passes)
----------------------
  • Tablet polish (768–1023px middle ground) if specific issues surface
  • Real device testing — anything that pops up on iOS Safari quirks
  • Touch-target audit (44px minimum) if any buttons feel tight
