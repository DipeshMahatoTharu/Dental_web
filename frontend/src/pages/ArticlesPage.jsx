import { useState, useMemo } from 'react'

const ARTICLES_DATA = [
  {
    id: 'caries-prevention',
    category: 'Preventive Dentistry',
    title: 'Early Caries Detection & Enamel Remineralization',
    readTime: '4 Min Read',
    image: '/images/gum-care.jpg',
    summary: 'Evidence-based approaches for identifying early microscopic enamel demineralization before irreversible cavitation occurs.',
    content: [
      'Early enamel demineralization occurs when acids from bacterial biofilm strip calcium and phosphate minerals from the protective tooth enamel layer.',
      'In its earliest stages (white spot lesions), enamel damage is reversible through structured fluoride varnish therapy, CPP-ACP remineralizing pastes, and dietary adjustments reducing acidic exposures.',
      'Regular clinical checkups utilizing digital low-radiation imaging allow our practitioners to detect interdental lesions years before physical symptoms arise.'
    ]
  },
  {
    id: 'clear-aligners-guide',
    category: 'Orthodontics',
    title: 'Clinical Considerations for Clear Aligner Therapy',
    readTime: '5 Min Read',
    image: '/images/aligners.jpg',
    summary: 'Understanding biomechanics, tray wear compliance, and suitability criteria for adult orthodontics.',
    content: [
      'Clear aligners use sequential sets of medical-grade polyurethane trays to apply gentle, continuous orthodontic forces to specific tooth roots.',
      'Successful tooth movement requires consistent compliance, with patients wearing trays 20 to 22 hours daily, removing them only for meals and oral hygiene.',
      'Complex cases involving severe skeletal discrepancies or impacted teeth may require combined orthodontic approaches or traditional bracket systems.'
    ]
  },
  {
    id: 'infant-teething-health',
    category: 'Pediatric Care',
    title: 'Managing Infant Teething & Primary Tooth Health',
    readTime: '4 Min Read',
    image: '/images/children-care.jpg',
    summary: 'Practical clinical guidance for parents on soothing teething irritation and preventing early childhood cavities.',
    content: [
      'Primary teeth begin erupting between 6 and 10 months of age, often causing localized gum swelling, mild fussiness, and increased salivation.',
      'Safe soothing techniques include chilled (not frozen) solid silicone teething rings, gentle gum massages with clean gauze, and avoiding homeopathic numbing gels containing benzocaine.',
      'The American Academy of Pediatric Dentistry recommends scheduling your child’s first dental visit when their first tooth emerges or by their first birthday.'
    ]
  },
  {
    id: 'restorative-implants',
    category: 'Restorative Dentistry',
    title: 'Modern Dental Implants & Long-Term Bone Preservation',
    readTime: '6 Min Read',
    image: '/images/equipment.jpg',
    summary: 'How biocompatible titanium implants integrate with jawbone tissue to restore masticatory function and prevent facial bone loss.',
    content: [
      'Unlike traditional dental bridges or removable dentures, dental implants fuse directly with alveolar bone through osseointegration, replacing the tooth root.',
      'Replacing missing teeth promptly prevents adjacent teeth from drifting and arrests the gradual resorption of jawbone tissue beneath empty tooth sockets.',
      'With proper daily flossing, hygiene maintenance, and routine clinical follow-ups, modern dental implants achieve success rates exceeding 95% over decades.'
    ]
  }
]

const ARTICLE_CATEGORIES = [
  'All Topics',
  'Preventive Dentistry',
  'Orthodontics',
  'Pediatric Care',
  'Restorative Dentistry'
]

export function ArticlesPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All Topics')
  const [activeArticle, setActiveArticle] = useState(null)

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All Topics') return ARTICLES_DATA
    return ARTICLES_DATA.filter((a) => a.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Header Banner */}
      <section className="bg-primary py-12 text-white md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">home</span>
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-secondary-container">Patient Education</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              Clinical Knowledge & Oral Health Guides
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              Oral Health Articles & Patient Guides
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80">
              Evidence-based information to help you protect enamel, maintain healthy gums, and make informed dental care decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section aria-label="Article categories" className="sticky top-16 z-30 border-b border-surface-container bg-white shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 scrollbar-none md:px-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0 mr-2">
            Topics:
          </span>
          {ARTICLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                {selectedCategory}
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Showing {filteredArticles.length} clinical {filteredArticles.length === 1 ? 'article' : 'articles'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="overflow-hidden rounded-xl border border-surface-container bg-white p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <img
                    src={article.image}
                    alt={`Clinical photograph for ${article.title}`}
                    className="h-48 w-full rounded-lg object-cover"
                  />
                  <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                    <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs text-primary" aria-hidden="true">schedule</span>
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary mt-2.5">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="w-full rounded-lg bg-surface-container-low px-4 py-2 text-xs font-bold uppercase text-primary hover:bg-primary hover:text-white transition text-center cursor-pointer"
                  >
                    Read Full Article
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto bg-white rounded-xl shadow-xl border border-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-surface-container bg-white">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                  {activeArticle.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-primary">{activeArticle.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-md transition cursor-pointer"
                aria-label="Close article"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs leading-relaxed text-on-surface-variant">
              <img 
                src={activeArticle.image} 
                alt={activeArticle.title} 
                className="h-56 w-full rounded-lg object-cover mb-4 border border-surface-container"
              />
              {activeArticle.content.map((paragraph, idx) => (
                <p key={idx} className="text-sm leading-relaxed">{paragraph}</p>
              ))}
              
              <div className="rounded-lg bg-surface-container-low p-4 border border-surface-container text-xs text-slate-600 mt-6">
                <strong>Medical Notice:</strong> This article is published solely for general patient education and does not constitute a formal diagnosis. Always consult with a licensed dental practitioner for personal treatment recommendations.
              </div>
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 px-6 py-4 border-t border-surface-container bg-white">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-surface-container rounded-lg transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveArticle(null)
                  onNavigate('contact')
                }}
                className="rounded-lg bg-primary px-5 py-2 text-xs font-bold uppercase text-white hover:bg-primary-container transition cursor-pointer"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
