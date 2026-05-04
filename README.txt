FF — NAVIGATION SYSTEM (foundation for every future page)
=========================================================

WHAT'S NEW (5 new files):
  lib/nav-context.tsx                    Global modal state + scroll lock
  components/brand/site-header.tsx       Master nav (used everywhere)
  components/brand/site-footer.tsx       Master footer (used everywhere)
  components/brand/modal-shell.tsx       Locked modal chrome wrapper
  components/brand/principles-modal.tsx  Principles refactored to use shell

WHAT'S CHANGED (2 files):
  app/layout.tsx                         Wraps everything in NavProvider, mounts header + Principles modal globally
  app/page.tsx                           Old inline header / footer / principles modal removed (now global)

INSTALL:
1. In your project root, DELETE these (clean removal, no OneDrive collisions):
     - app/layout.tsx
     - app/page.tsx
2. Extract this zip.
3. Drag "app", "components", "lib" into your project root.
   When asked, choose: Merge folders, Replace files.
4. Hard refresh browser (Ctrl + Shift + R).

NO npm install needed.
NO server restart needed (hot-reload picks it up automatically).

WHAT YOU'LL SEE:
  - Top nav: Services · Deliverables · Programs · Selected work · Principles
  - LinkedIn round button + Book a call pill on right
  - Click Principles → modal opens, scroll locks, header stays sticky
  - Inside modal: "← Home" appears next to FF logo (only visible when in modal)
  - Click any nav item from inside modal → modal closes, scrolls to that section
  - Click FF logo from inside modal → modal closes, returns to homepage top
  - Click footer's Principles link from anywhere → opens Principles modal

ARCHITECTURE NOTE:
This is the foundation for every future modal. To add About, Services, etc.:
  1. Create a new file in components/brand/ that follows principles-modal.tsx pattern
  2. Wrap content in <ModalShell modalKey="about">
  3. Mount it in app/layout.tsx alongside <PrinciplesModal />
  4. Add a trigger somewhere via setOpenModal('about')

The chrome (header, footer, scroll, transitions) is handled automatically
by ModalShell + the global SiteHeader/SiteFooter. Zero risk of drift.
