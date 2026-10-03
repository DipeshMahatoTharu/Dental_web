import { useEffect, useState } from 'react'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage } from './pages/AboutPage'
import { GalleryPage } from './pages/GalleryPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsConditionsPage } from './pages/TermsConditionsPage'
import { ServiceModal } from './components/ServiceModal'
import { SERVICES_DATA } from './data/servicesData'

const heroImage = '/images/hero-clinic.jpg'
const dentistImage = '/images/dentist.jpg'
const equipmentImage = '/images/equipment.jpg'
const receptionImage = '/images/reception.jpg'

const CLINICAL_STANDARDS = [
  {
    icon: 'verified',
    title: 'Certified Dental Specialists',
    description: 'All examinations and consultations are conducted by licensed, experienced dental surgeons and endodontic specialists.'
  },
  {
    icon: 'sanitizer',
    title: 'Hospital-Grade Sterilization',
    description: 'We follow rigorous infection control, autoclaving protocols, and single-use sterile disposables for patient safety.'
  },
  {
    icon: 'receipt_long',
    title: 'Transparent Treatment Estimates',
    description: 'Detailed breakdowns of treatment scope, material options, and itemized costs are provided before any procedure begins.'
  },
  {
    icon: 'lock',
    title: 'Confidential Patient Records',
    description: 'Your diagnostic radiographs, medical history, and personal details are handled under strict healthcare privacy standards.'
  }
]

const CLINICAL_ARTICLES = [
  {
    category: 'Preventive Dentistry',
    title: 'Early Caries Detection & Enamel Remineralization',
    description: 'Evidence-based approaches for detecting minor tooth decay before irreversible cavity damage occurs.',
    image: '/images/gum-care.jpg'
  },
  {
    category: 'Orthodontics',
    title: 'Clinical Considerations for Clear Aligner Therapy',
    description: 'Understanding biomechanics, tray wear compliance, and suitability criteria for adult orthodontics.',
    image: '/images/aligners.jpg'
  },
  {
    category: 'Pediatric Care',
    title: 'Managing Infant Teething & Primary Tooth Health',
    description: 'Practical clinical guidance for parents on soothing teething irritation and preventing early childhood cavities.',
    image: '/images/children-care.jpg'
  }
]

function Icon({ children, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home' | 'services' | 'about' | 'gallery' | 'articles' | 'contact' | 'privacy' | 'terms'
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedHomeModalService, setSelectedHomeModalService] = useState(null)

  // URL hash navigation listener for direct links, bookmarks, and back/forward browser buttons
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('privacy')) {
        setCurrentPage('privacy')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.includes('terms')) {
        setCurrentPage('terms')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.includes('services')) {
        setCurrentPage('services')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.includes('about')) {
        setCurrentPage('about')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.includes('gallery')) {
        setCurrentPage('gallery')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.includes('articles') || hash.includes('blog')) {
        setCurrentPage('articles')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.includes('contact')) {
        setCurrentPage('contact')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setCurrentPage('home')
        if (hash && hash !== '#' && hash !== '#home') {
          const targetId = hash.replace('#', '')
          setTimeout(() => {
            const el = document.getElementById(targetId)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 80)
        }
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function navigateTo(target, sectionId = null) {
    setMobileMenuOpen(false)
    const validPages = ['services', 'about', 'gallery', 'articles', 'contact', 'privacy', 'terms']
    if (validPages.includes(target)) {
      window.location.hash = `#/${target}`
      setCurrentPage(target)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      if (sectionId && sectionId !== 'home') {
        window.location.hash = `#${sectionId}`
        setCurrentPage('home')
        setTimeout(() => {
          const el = document.getElementById(sectionId)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      } else {
        window.location.hash = '#home'
        setCurrentPage('home')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  function handleSelectServiceForBooking(serviceTitle) {
    navigateTo('contact')
    setForm((prev) => ({
      ...prev,
      message: `I would like to request an appointment for: ${serviceTitle}.`
    }))
  }

  function handleHomeServiceCardClick(service) {
    setSelectedHomeModalService(service)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('Submitting your request...')
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          message: form.message.trim()
        }),
      })
      if (!response.ok) throw new Error('Request failed')
      setForm({ name: '', phone: '', message: '' })
      setStatus('Thank you. Our clinic team will contact you shortly to confirm your appointment.')
    } catch {
      setStatus('Please call our clinic directly at +1 (555) 123-4567.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Header Navigation */}
      <header className="fixed top-0 z-50 w-full border-b border-surface-container bg-white">
        <nav aria-label="Main Navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-10">
          <button 
            type="button"
            onClick={() => navigateTo('home')} 
            className="font-heading text-xl font-bold text-primary flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl text-secondary" aria-hidden="true">dentistry</span>
            Rumidental
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:gap-7 md:flex">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`text-sm font-semibold transition cursor-pointer ${
                currentPage === 'home'
                  ? 'text-primary border-b-2 border-primary pb-0.5 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateTo('services')}
              className={`text-sm font-semibold transition cursor-pointer ${
                currentPage === 'services'
                  ? 'text-primary border-b-2 border-primary pb-0.5 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className={`text-sm font-semibold transition cursor-pointer ${
                currentPage === 'about'
                  ? 'text-primary border-b-2 border-primary pb-0.5 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => navigateTo('gallery')}
              className={`text-sm font-semibold transition cursor-pointer ${
                currentPage === 'gallery'
                  ? 'text-primary border-b-2 border-primary pb-0.5 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => navigateTo('articles')}
              className={`text-sm font-semibold transition cursor-pointer ${
                currentPage === 'articles'
                  ? 'text-primary border-b-2 border-primary pb-0.5 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Articles
            </button>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className={`text-sm font-semibold transition cursor-pointer ${
                currentPage === 'contact'
                  ? 'text-primary border-b-2 border-primary pb-0.5 font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('services')}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary-container cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">calendar_month</span>
              Book Appointment
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 text-primary md:hidden rounded-md hover:bg-surface-container transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-navigation-menu" className="border-b border-surface-container bg-white px-6 py-4 md:hidden shadow-md">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`text-left text-sm font-semibold ${
                  currentPage === 'home' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => navigateTo('services')}
                className={`text-left text-sm font-semibold ${
                  currentPage === 'services' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => navigateTo('about')}
                className={`text-left text-sm font-semibold ${
                  currentPage === 'about' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                About Practice
              </button>
              <button
                type="button"
                onClick={() => navigateTo('gallery')}
                className={`text-left text-sm font-semibold ${
                  currentPage === 'gallery' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Facility Gallery
              </button>
              <button
                type="button"
                onClick={() => navigateTo('articles')}
                className={`text-left text-sm font-semibold ${
                  currentPage === 'articles' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Patient Articles
              </button>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className={`text-left text-sm font-semibold ${
                  currentPage === 'contact' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Contact & Hours
              </button>
              <button
                type="button"
                onClick={() => navigateTo('privacy')}
                className="text-left text-sm font-semibold text-on-surface-variant"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => navigateTo('terms')}
                className="text-left text-sm font-semibold text-on-surface-variant"
              >
                Terms & Conditions
              </button>
              <button
                type="button"
                onClick={() => navigateTo('services')}
                className="mt-2 text-center rounded-lg bg-primary py-2.5 text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">calendar_month</span>
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Routed Page Content */}
      {currentPage === 'services' ? (
        <main className="pt-14">
          <ServicesPage
            onNavigate={(page) => navigateTo(page)}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        </main>
      ) : currentPage === 'about' ? (
        <main className="pt-14">
          <AboutPage onNavigate={(page) => navigateTo(page)} />
        </main>
      ) : currentPage === 'gallery' ? (
        <main className="pt-14">
          <GalleryPage onNavigate={(page) => navigateTo(page)} />
        </main>
      ) : currentPage === 'articles' ? (
        <main className="pt-14">
          <ArticlesPage onNavigate={(page) => navigateTo(page)} />
        </main>
      ) : currentPage === 'contact' ? (
        <main className="pt-14">
          <ContactPage onNavigate={(page) => navigateTo(page)} />
        </main>
      ) : currentPage === 'privacy' ? (
        <main className="pt-14">
          <PrivacyPolicyPage onNavigate={(page) => navigateTo(page)} />
        </main>
      ) : currentPage === 'terms' ? (
        <main className="pt-14">
          <TermsConditionsPage onNavigate={(page) => navigateTo(page)} />
        </main>
      ) : (
        <main className="pt-14">
          {/* Grounded Clinical Hero Section */}
          <section className="hero-photo relative min-h-[75vh] overflow-hidden" id="home">
            <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="Modern clinical dental examination room with sterile instruments and dental chair" />
            <div className="hero-overlay absolute inset-0" />
            <div className="relative mx-auto flex min-h-[75vh] max-w-7xl items-center px-5 py-16 md:px-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-white/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary mb-4 border border-surface-container">
                  <span className="material-symbols-outlined text-sm text-secondary" aria-hidden="true">verified</span>
                  Licensed Dental Practice & Specialist Consultations
                </div>
                <h1 className="font-heading text-3xl font-bold leading-tight text-primary md:text-5xl">
                  Comprehensive Dental Care & Certified Consultations
                </h1>
                <p className="mt-4 text-base leading-7 text-on-surface-variant">
                  We provide preventative, restorative, and diagnostic dental treatments with an emphasis on clinical accuracy, patient comfort, and transparent treatment plans.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button 
                    type="button"
                    onClick={() => navigateTo('contact')}
                    className="rounded-lg bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary-container cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">calendar_month</span>
                    Schedule Appointment
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigateTo('services')}
                    className="rounded-lg border border-primary/30 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary transition hover:bg-surface-container-low cursor-pointer flex items-center gap-2"
                  >
                    View All Services
                    <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Core Services Overview */}
          <section className="bg-white py-14" id="services">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Clinical Excellence</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">
                    Dental Care & Treatment Programs
                  </h2>
                  <div className="mt-2 h-0.5 w-16 bg-secondary" />
                  <p className="mt-2 text-xs text-on-surface-variant">
                    From routine preventive cleanings to specialized endodontic and restorative procedures.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-container-low px-4 py-2.5 text-xs font-bold uppercase text-primary hover:bg-primary hover:text-white transition border border-surface-container cursor-pointer"
                >
                  View Full Services Catalog
                  <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES_DATA.slice(0, 4).map((service) => (
                  <article 
                    onClick={() => handleHomeServiceCardClick(service)}
                    className="flex flex-col justify-between rounded-xl border border-surface-container bg-surface-container-low p-6 transition duration-150 hover:border-primary/40 cursor-pointer group" 
                    key={service.id}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="text-2xl text-primary">{service.icon}</Icon>
                        <span className="rounded-sm bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                          {service.category}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-primary group-hover:text-primary-container">{service.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-on-surface-variant">{service.shortDescription}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between text-xs font-bold text-primary">
                      <span>Clinical Details</span>
                      <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Clinical Quality Standards Section */}
          <section className="bg-surface-container-low py-14" id="standards">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Quality & Compliance</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">Our Practice Standards</h2>
                <div className="mx-auto mt-2 h-0.5 w-16 bg-secondary" />
                <p className="mt-2 text-xs text-on-surface-variant">
                  We maintain strict clinical governance and transparent patient protocols.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {CLINICAL_STANDARDS.map((item) => (
                  <div className="rounded-xl border border-surface-container bg-white p-6" key={item.title}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white mb-4">
                      <Icon>{item.icon}</Icon>
                    </div>
                    <h3 className="font-heading text-sm font-bold text-primary">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-on-surface-variant">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Practice Teaser Section */}
          <section className="bg-white py-14" id="about">
            <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-10 lg:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">About Rumidental</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">
                  Modern Dental Facility & Diagnostics
                </h2>
                <p className="mt-4 text-sm leading-6 text-on-surface-variant">
                  At Rumidental, our dental team combines clinical experience with modern diagnostic equipment to provide patient-focused care. We emphasize preventive measures, conservative restorations, and evidence-based procedures.
                </p>
                <div className="mt-6 space-y-3 text-xs text-on-surface-variant">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base shrink-0" aria-hidden="true">check_circle</span>
                    <span>Digital low-radiation radiography and high-resolution intraoral imaging.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base shrink-0" aria-hidden="true">check_circle</span>
                    <span>Class-B autoclave sterilization cycles meeting international standards.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-base shrink-0" aria-hidden="true">check_circle</span>
                    <span>Dedicated consultation suites for private treatment planning.</span>
                  </div>
                </div>
                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-primary-container transition cursor-pointer"
                  >
                    Learn More About Our Team
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <img className="h-64 w-full rounded-lg object-cover border border-surface-container" src={equipmentImage} alt="State-of-the-art dental clinical equipment" />
                <img className="h-64 w-full rounded-lg object-cover border border-surface-container" src={dentistImage} alt="Licensed dentist consulting with a patient in clinical office" />
              </div>
            </div>
          </section>

          {/* Facility Gallery Teaser */}
          <section className="bg-surface-container-low py-14" id="gallery">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Clinical Environment</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">Practice Gallery</h2>
                  <div className="mt-2 h-0.5 w-16 bg-secondary" />
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('gallery')}
                  className="rounded-lg bg-white px-4 py-2 text-xs font-bold uppercase text-primary border border-surface-container hover:bg-surface-container-low transition cursor-pointer"
                >
                  View Full Gallery
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="overflow-hidden rounded-lg border border-surface-container bg-white md:col-span-2">
                  <img className="h-72 w-full object-cover" src="/images/smile-gallery.jpg" alt="Clinical examination suite and treatment planning station" />
                  <div className="p-3 text-xs font-medium text-on-surface-variant">Examination & Consultation Suite</div>
                </div>
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-lg border border-surface-container bg-white">
                    <img className="h-32 w-full object-cover" src={receptionImage} alt="Rumidental clinic patient reception and welcoming lounge" />
                    <div className="p-2 text-xs font-medium text-on-surface-variant">Reception & Check-in Area</div>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-surface-container bg-white">
                    <img className="h-32 w-full object-cover" src="/images/whitening.jpg" alt="Sterilization room and restorative dental tools" />
                    <div className="p-2 text-xs font-medium text-on-surface-variant">Sterilization & Treatment Area</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Educational Articles Teaser */}
          <section className="bg-white py-14" id="articles">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Patient Education</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">Oral Health Articles</h2>
                  <div className="mt-2 h-0.5 w-16 bg-secondary" />
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('articles')}
                  className="rounded-lg bg-surface-container-low px-4 py-2 text-xs font-bold uppercase text-primary border border-surface-container hover:bg-primary hover:text-white transition cursor-pointer"
                >
                  View All Articles
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {CLINICAL_ARTICLES.map((article) => (
                  <article className="bg-white p-4 rounded-xl border border-surface-container flex flex-col justify-between" key={article.title}>
                    <div>
                      <img className="h-48 w-full rounded-lg object-cover" src={article.image} alt={`Illustrative clinical image for article on ${article.title}`} />
                      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-secondary">{article.category}</p>
                      <h3 className="mt-1 font-heading text-base font-bold text-primary">{article.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-on-surface-variant">{article.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Contact Desk */}
          <section className="bg-surface-container-low py-14" id="contact">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-10 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Clinic Desk</span>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">Contact & Practice Hours</h2>
                <div className="mt-6 space-y-3.5 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-container text-primary">
                      <Icon className="text-lg">phone</Icon>
                    </span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-container text-primary">
                      <Icon className="text-lg">mail</Icon>
                    </span>
                    <span>appointments@rumidental.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-surface-container text-primary">
                      <Icon className="text-lg">location_on</Icon>
                    </span>
                    <span>Rumidental Clinic, Central Healthcare District</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-surface-container pt-4 text-xs space-y-2">
                  <p className="flex justify-between"><span>Monday to Friday</span><strong>08:00 AM to 06:00 PM</strong></p>
                  <p className="flex justify-between"><span>Saturday</span><strong>09:00 AM to 04:00 PM</strong></p>
                  <p className="flex justify-between"><span>Sunday & Public Holidays</span><em>Closed</em></p>
                </div>
              </div>

              <form className="rounded-xl border border-surface-container bg-white p-6 lg:col-span-3 space-y-3" onSubmit={handleSubmit}>
                <h3 className="font-heading text-base font-bold text-primary">Quick Appointment Inquiry</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label htmlFor="home-contact-name" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Full Name *
                    </label>
                    <input 
                      id="home-contact-name"
                      className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 outline-primary text-xs" 
                      placeholder="Your Name" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div>
                    <label htmlFor="home-contact-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                      Phone Number *
                    </label>
                    <input 
                      id="home-contact-phone"
                      type="tel"
                      className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 outline-primary text-xs" 
                      placeholder="Phone or WhatsApp" 
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="home-contact-message" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Message or Consultation Request *
                  </label>
                  <textarea 
                    id="home-contact-message"
                    className="min-h-24 w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 outline-primary text-xs" 
                    placeholder="How can our clinical team assist you? Describe your questions or preferred appointment schedule..." 
                    value={form.message} 
                    onChange={(e) => setForm({ ...form, message: e.target.value })} 
                    required 
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-primary px-5 py-2.5 font-bold uppercase tracking-wider text-white transition hover:bg-primary-container cursor-pointer text-xs disabled:opacity-60" 
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
                {status && <p className="mt-2 text-xs font-medium text-primary">{status}</p>}
              </form>
            </div>
          </section>
        </main>
      )}

      {/* Modal for Service from Home */}
      {selectedHomeModalService && (
        <ServiceModal
          service={selectedHomeModalService}
          onClose={() => setSelectedHomeModalService(null)}
          onBook={() => {
            setSelectedHomeModalService(null)
            navigateTo('services')
          }}
        />
      )}

      {/* Global Clinical Footer */}
      <footer className="bg-tertiary py-10 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-8 md:grid-cols-4 pb-8 border-b border-white/10 text-xs">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-heading text-lg font-bold">
                <span className="material-symbols-outlined text-2xl text-secondary-container" aria-hidden="true">dentistry</span>
                Rumidental Dental Practice
              </div>
              <p className="mt-2 text-white/70 max-w-sm leading-relaxed">
                Licensed dental practice providing preventive care, diagnostic second opinions, restorative dentistry, and professional patient consultations.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white mb-3 uppercase tracking-wider">Practice Navigation</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button type="button" onClick={() => navigateTo('home')} className="hover:text-white transition cursor-pointer">Home</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('services')} className="hover:text-white transition cursor-pointer">Clinical Services</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('about')} className="hover:text-white transition cursor-pointer">About Practice & Doctors</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('gallery')} className="hover:text-white transition cursor-pointer">Facility Gallery</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('articles')} className="hover:text-white transition cursor-pointer">Oral Health Articles</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('contact')} className="hover:text-white transition cursor-pointer">Contact & Hours</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white mb-3 uppercase tracking-wider">Legal & Compliance</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button type="button" onClick={() => navigateTo('privacy')} className="hover:text-white transition cursor-pointer">Privacy Policy</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('terms')} className="hover:text-white transition cursor-pointer">Terms & Conditions</button>
                </li>
                <li className="pt-2 text-white/50">
                  Direct Line: +1 (555) 123-4567
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-3">
            <p>(c) 2026 Rumidental Dental Practice. All rights reserved.</p>
            <p>Certified Healthcare Facility.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
