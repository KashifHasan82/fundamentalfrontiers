'use client'

import { Linkedin, ExternalLink } from 'lucide-react'

const articles = [
  {
    id: 'audit-prep',
    title: 'The 72-Hour Audit Prep That Actually Works',
    excerpt: 'Most organizations spend weeks preparing for surveillance audits. Here\'s why focused preparation in the final 72 hours delivers better outcomes.',
    date: 'March 2024',
    readTime: '5 min read',
    url: 'https://www.linkedin.com/company/fundamental-frontiers',
  },
  {
    id: 'capa-effectiveness',
    title: 'Why Your CAPAs Keep Recurring',
    excerpt: 'Corrective actions that don\'t correct anything. A look at the root causes behind ineffective CAPA programs and how to fix them.',
    date: 'February 2024',
    readTime: '7 min read',
    url: 'https://www.linkedin.com/company/fundamental-frontiers',
  },
  {
    id: 'management-review',
    title: 'Management Review: More Than a Checkbox',
    excerpt: 'Transform your management review from a compliance exercise into a strategic planning session that drives real improvement.',
    date: 'January 2024',
    readTime: '6 min read',
    url: 'https://www.linkedin.com/company/fundamental-frontiers',
  },
]

export function Insights() {
  return (
    <section id="insights" className="section-padding bg-ff-cream">
      <div className="container-ff px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-ff-burgundy font-medium text-sm tracking-wide uppercase mb-3">
            Insights
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-ff-gray-900 mb-4 text-balance">
            Perspectives on quality and compliance.
          </h2>
          <p className="text-lg text-ff-gray-600 max-w-2xl mx-auto">
            Practical insights from our work with regulated organizations. Follow us on LinkedIn for regular updates.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl border border-ff-gray-200 p-6 card-hover"
            >
              <div className="flex items-center gap-2 text-sm text-ff-gray-500 mb-3">
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-ff-gray-400" />
                <span>{article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-ff-gray-900 mb-3 group-hover:text-ff-burgundy transition-colors">
                {article.title}
              </h3>
              
              <p className="text-sm text-ff-gray-600 leading-relaxed mb-4">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-ff-burgundy text-sm font-medium">
                Read on LinkedIn
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <div className="text-center">
          <a
            href="https://www.linkedin.com/company/fundamental-frontiers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A66C2] text-white font-medium rounded-lg hover:bg-[#004182] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Follow on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
