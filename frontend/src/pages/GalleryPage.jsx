import { useState, useMemo } from 'react'

const GALLERY_ITEMS = [
  {
    id: 'suite-1',
    title: 'Primary Examination & Consultation Suite',
    category: 'Consultation Suites',
    image: '/images/smile-gallery.jpg',
    description: 'Equipped with ergonomic patient chairs, adjustable LED surgical lighting, and dedicated monitor for radiograph review.'
  },
  {
    id: 'sterilization-1',
    title: 'Class-B Autoclave Sterilization Station',
    category: 'Sterilization & Lab',
    image: '/images/whitening.jpg',
    description: 'Hospital-standard vacuum autoclaves, instrument packaging verification, and biological spore test tracking.'
  },
  {
    id: 'reception-1',
    title: 'Patient Reception & Check-in Desk',
    category: 'Reception & Lounge',
    image: '/images/reception.jpg',
    description: 'Calm, sanitized patient reception area with private intake desks and contactless check-in.'
  },
  {
    id: 'equipment-1',
    title: 'High-Precision Restorative Dental Unit',
    category: 'Clinical Diagnostics',
    image: '/images/equipment.jpg',
    description: 'Precision electric handpieces, ultrasonic scalers, and intraoral illumination for restorative procedures.'
  },
  {
    id: 'dentist-consult',
    title: 'Doctor Diagnostic Workstation',
    category: 'Consultation Suites',
    image: '/images/dentist.jpg',
    description: 'Private doctor suite for reviewing 3D CBCT imaging, treatment options, and patient care planning.'
  },
  {
    id: 'clinic-hero',
    title: 'Modern Treatment Operatory',
    category: 'Consultation Suites',
    image: '/images/hero-clinic.jpg',
    description: 'Clean operatory layout with strict aerosol management, HEPA filtration, and medical-grade surfaces.'
  }
]

const GALLERY_CATEGORIES = [
  'All Photos',
  'Consultation Suites',
  'Sterilization & Lab',
  'Reception & Lounge',
  'Clinical Diagnostics'
]

export function GalleryPage({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All Photos')
  const [selectedImage, setSelectedImage] = useState(null)

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All Photos') return GALLERY_ITEMS
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory)
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
            <span className="text-secondary-container">Facility Gallery</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              Clean, Modern Clinical Facility
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              Clinic Facility & Operatory Gallery
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80">
              Tour our modern dental operatory suites, sterilization facilities, and diagnostic environments.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section aria-label="Gallery categories" className="sticky top-16 z-30 border-b border-surface-container bg-white shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 scrollbar-none md:px-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0 mr-2">
            Filter:
          </span>
          {GALLERY_CATEGORIES.map((cat) => (
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

      {/* Gallery Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary">
                {selectedCategory}
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Displaying {filteredItems.length} facility {filteredItems.length === 1 ? 'view' : 'views'}
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <article 
                key={item.id}
                className="overflow-hidden rounded-xl border border-surface-container bg-white shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="relative group cursor-pointer overflow-hidden" onClick={() => setSelectedImage(item)}>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-56 w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-3xl">zoom_in</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                      {item.category}
                    </span>
                    <h3 className="font-heading text-base font-bold text-primary mt-2">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Hygiene & Protocol Highlight */}
      <section className="bg-surface-container-low py-14 border-t border-surface-container">
        <div className="mx-auto max-w-5xl px-5 md:px-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Clinical Cleanliness Guarantee</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">
            Sterilization & Infection Control Standards
          </h2>
          <div className="mx-auto mt-2 h-0.5 w-16 bg-secondary" />
          <p className="mt-4 text-xs leading-relaxed text-on-surface-variant max-w-2xl mx-auto">
            Every operatory is disinfected with hospital-grade virucidal solutions between each patient appointment. All surgical handpieces and dental instruments undergo ultrasonic bath cleaning and Class-B autoclave vacuum sterilization cycles.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="rounded-lg bg-primary px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-primary-container transition cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-surface-container">
              <h3 className="font-heading text-sm font-bold text-primary">{selectedImage.title}</h3>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1 text-gray-500 hover:text-gray-800 rounded-md transition cursor-pointer"
                aria-label="Close image preview"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              className="max-h-[65vh] w-full object-contain bg-black/5"
            />
            <div className="p-4 bg-surface-container-low text-xs text-on-surface-variant">
              <span className="font-bold text-secondary mr-2">[{selectedImage.category}]</span>
              {selectedImage.description}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
