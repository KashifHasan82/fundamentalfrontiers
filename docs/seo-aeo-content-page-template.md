# Fundamental Frontiers — Future SEO/AEO Content Page Template

Use this template only after a Fundamental Frontiers consultant approves the
technical content and every factual claim. It is a handover guide, not a live
page, and placeholder text must never be published.

## 1. Approval record

- Page owner:
- Reviewing consultant:
- Approval date:
- Approved source documents:
- Intended audience:
- Primary search question:
- Final URL slug:
- Planned publication date:

## 2. Evidence-controlled content

### Page title

`[Approved subject] | Fundamental Frontiers`

Keep the visible heading specific and natural. Do not add an unsupported
standard, credential, industry claim, outcome, statistic, client name, or
geography.

### One-sentence answer

`[Direct answer to the primary search question, using approved language.]`

### Context

`[What situation, requirement, or operational problem the page addresses.]`

### FF approach

`[Approved explanation of the method or engagement approach.]`

### Evidence or example

`[Approved case evidence, source reference, or clearly labelled illustrative
example.]`

### Practical next step

`[Approved action the reader can take or discuss with FF.]`

## 3. Metadata starter

```ts
import type { Metadata } from 'next'

const SITE_URL = 'https://www.fundamentalfrontiers.com'
const SLUG = '[approved-slug]'

export const metadata: Metadata = {
  title: '[Approved page title]',
  description: '[Approved description of approximately 140–160 characters]',
  alternates: {
    canonical: `${SITE_URL}/${SLUG}`,
  },
  openGraph: {
    type: 'article',
    url: `${SITE_URL}/${SLUG}`,
    title: '[Approved page title] | Fundamental Frontiers',
    description: '[Approved description]',
    siteName: 'Fundamental Frontiers',
  },
  twitter: {
    card: 'summary_large_image',
    title: '[Approved page title] | Fundamental Frontiers',
    description: '[Approved description]',
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

Do not leave placeholders in a deployed route. Use `noindex` during any private
review stage if the route is temporarily accessible.

## 4. Structured-data starter

Choose the schema type that matches the approved page. Do not use FAQ schema
unless the questions and answers are visible on the page. Do not use ratings,
reviews, authors, dates, or credentials that are not supported by the visible
content or an approved source.

```ts
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${SITE_URL}/${SLUG}#article`,
  url: `${SITE_URL}/${SLUG}`,
  headline: '[Approved page title]',
  description: '[Approved description]',
  datePublished: '[YYYY-MM-DD]',
  dateModified: '[YYYY-MM-DD]',
  inLanguage: 'en-US',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/${SLUG}`,
  },
  author: {
    '@id': `${SITE_URL}/#organization`,
  },
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
}
```

Render JSON-LD using the same safe pattern as the existing homepage, course,
and case-study pages.

## 5. Internal-link and sitemap requirements

- Link the new page from one relevant, already crawlable page.
- Add one useful link from the new page back to an existing FF page or section.
- Add the canonical URL to `app/sitemap.ts`.
- Use only the `https://www.fundamentalfrontiers.com` domain.
- Avoid creating multiple pages that answer the same primary question.

## 6. Pre-publication QA

- Consultant approval is recorded.
- Page returns HTTP 200 without login or consent requirements.
- One clear H1 is present.
- Title and description are unique.
- Canonical URL is self-referencing and uses `www`.
- Page is indexable and is not blocked by `robots.txt`.
- All visible claims match the approved source.
- Structured data matches the visible content.
- Internal links work.
- Mobile and desktop layouts are checked.
- Production build and TypeScript validation pass.
- Live URL, social metadata, sitemap entry, and structured data are rechecked.

