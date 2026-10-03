import { useEffect, useState } from 'react'
import { ServicesPage } from './pages/ServicesPage'
import { AboutPage } from './pages/AboutPage'
import { GalleryPage } from './pages/GalleryPage'
import { ArticlesPage } from './pages/ArticlesPage'
import { ContactPage } from './pages/ContactPage'
import { DoctorConsultationPage } from './pages/DoctorConsultationPage'
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage'
import { TermsConditionsPage } from './pages/TermsConditionsPage'
import { ServiceModal } from './components/ServiceModal'
import { SERVICES_DATA } from './data/servicesData'

const heroImage = '/images/hero-clinic.jpg'

const CLINICAL_PILLARS = [
  {
    icon: 'medical_services',
    title: 'Comprehensive General Dentistry',
    text: 'Preventive examinations, digital radiography, gentle cleanings, and conservative restorative treatments for patients of all ages.'
  },
  {
    icon: 'radiology',
    title: 'Digital Radiograph Triage',
    text: 'Low-radiation panoramic and periapical imaging combined with specialist second opinions on external scans.'
  },
  {
    icon: 'sanitizer',
    title: 'Hospital-Grade Sterilization',
    text: 'Class-B vacuum autoclaves, biological spore testing, and sealed surgical packaging for maximum patient safety.'
  },
  {
    icon: 'receipt_long',
    title: 'Transparent Written Estimates',
    text: 'Clear, itemized procedure estimates provided prior to any clinical intervention, with no unexpected fees.'
  }
]

const CLINICAL_DOCTORS_PREVIEW = [
  {
    name: 'Dr. Robert Vance, DDS',
    role: 'Lead Dental Surgeon & Clinical Director',
    specialty: 'Restorative Care & Dental Implants',
    exp: '18+ Years Experience'
  },
  {
    name: 'Dr. Elena Rostova, DMD',
    role: 'Senior Endodontist & Diagnostics',
    specialty: 'Microscopic Root Canal Therapy & Pain Triage',
    exp: '14+ Years Experience'
  },
  {
    name: 'Dr. Marcus Thorne, BDS, MSc',
    role: 'Orthodontic & Aesthetic Consultant',
    specialty: 'Clear Aligners & Conservative Aesthetics',
    exp: '12+ Years Experience'
  }
]

export function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'General Dental Examination', message: '' })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedHomeModalService, setSelectedHomeModalService] = useState(null)

  // Listen to URL hash for direct links and browser back/forward buttons
  useEffect(() => {
    function handleHashChange() {
      const hash = (window.location.hash || '').toLowerCase()
      if (hash.includes('services')) {
        setCurrentPage('services')
      } else if (hash.includes('about')) {
        setCurrentPage('about')
      } else if (hash.includes('gallery')) {
        setCurrentPage('gallery')
      } else if (hash.includes('articles') || hash.includes('blog')) {
        setCurrentPage('articles')
      } else if (hash.includes('contact')) {
        setCurrentPage('contact')
      } else if (hash.includes('consultation') || hash.includes('portal') || hash.includes('xray')) {
        setCurrentPage('consultation')
      } else if (hash.includes('privacy')) {
        setCurrentPage('privacy')
      } else if (hash.includes('terms')) {
        setCurrentPage('terms')
      } else {
        setCurrentPage('home')
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function navigateTo(target) {
    setMobileMenuOpen(false)
    const pageMap = {
      home: '#/home',
      services: '#/services',
      about: '#/about',
      gallery: '#/gallery',
      articles: '#/articles',
      blog: '#/articles',
      contact: '#/contact',
      consultation: '#/consultation',
      privacy: '#/privacy',
      terms: '#/terms'
    }

    const nextHash = pageMap[target] || '#/home'
    window.location.hash = nextHash
    setCurrentPage(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSelectServiceForBooking(serviceTitle) {
    navigateTo('contact')
    setForm((prev) => ({
      ...prev,
      service: serviceTitle,
      message: `I would like to schedule a consultation appointment for: ${serviceTitle}.`
    }))
  }

  function handleHomeServiceCardClick(service) {
    setSelectedHomeModalService(service)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus('Submitting your consultation inquiry...')
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          serviceInterest: form.service,
          message: form.message.trim()
        }),
      })
      if (!response.ok) throw new Error('Request failed')
      setForm({ name: '', phone: '', email: '', service: 'General Dental Examination', message: '' })
      setStatus('Thank you. Your consultation request has been received. Our clinical desk will contact you shortly.')
    } catch {
      setStatus('Notice: Please call our clinic directly at +1 (555) 123-4567 while digital dispatch queues.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Clinical Announcement Bar */}
      <div className="bg-tertiary text-white py-2 px-5 text-xs border-b border-white/10 hidden sm:block">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/80">
              <span className="material-symbols-outlined text-sm text-secondary-container" aria-hidden="true">location_on</span>
              1420 Medical Center Parkway, Suite 400
            </span>
            <span className="text-white/40">|</span>
            <span className="flex items-center gap-1.5 text-white/80">
              <span className="material-symbols-outlined text-sm text-secondary-container" aria-hidden="true">schedule</span>
              Mon - Fri: 08:00 AM - 06:00 PM | Sat: 09:00 AM - 02:00 PM
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/80">Clinical Desk:</span>
            <a href="tel:+15551234567" className="font-bold text-secondary-container hover:underline">
              +1 (555) 123-4567
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-surface-container bg-white/95 backdrop-blur">
        <nav aria-label="Main Navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-10">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="font-heading text-xl font-bold text-primary flex items-center gap-2 cursor-pointer text-left"
          >
            <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">dentistry</span>
            <div>
              <span className="block leading-tight">Rumidental</span>
              <span className="block text-[10px] font-sans font-semibold uppercase tracking-wider text-slate-500">Dental Practice & Diagnostics</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`text-xs font-bold uppercase tracking-wider transition cursor-pointer py-1.5 ${
                currentPage === 'home'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigateTo('services')}
              className={`text-xs font-bold uppercase tracking-wider transition cursor-pointer py-1.5 ${
                currentPage === 'services'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => navigateTo('about')}
              className={`text-xs font-bold uppercase tracking-wider transition cursor-pointer py-1.5 ${
                currentPage === 'about'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              About Practice
            </button>
            <button
              type="button"
              onClick={() => navigateTo('gallery')}
              className={`text-xs font-bold uppercase tracking-wider transition cursor-pointer py-1.5 ${
                currentPage === 'gallery'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Facility Gallery
            </button>
            <button
              type="button"
              onClick={() => navigateTo('articles')}
              className={`text-xs font-bold uppercase tracking-wider transition cursor-pointer py-1.5 ${
                currentPage === 'articles'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Articles
            </button>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className={`text-xs font-bold uppercase tracking-wider transition cursor-pointer py-1.5 ${
                currentPage === 'contact'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigateTo('consultation')}
              className={`rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 border ${
                currentPage === 'consultation'
                  ? 'bg-secondary text-white border-secondary'
                  : 'bg-surface-container-low text-primary border-surface-container hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">upload_file</span>
              Doctor Chat & X-Ray
            </button>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-primary-container flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">calendar_month</span>
              Book Visit
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 text-primary lg:hidden rounded-lg hover:bg-surface-container transition cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="border-b border-surface-container bg-white px-6 py-5 lg:hidden shadow-md">
            <div className="flex flex-col gap-3 text-xs font-bold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`text-left py-2 border-b border-surface-container ${
                  currentPage === 'home' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => navigateTo('services')}
                className={`text-left py-2 border-b border-surface-container ${
                  currentPage === 'services' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                Clinical Services
              </button>
              <button
                type="button"
                onClick={() => navigateTo('about')}
                className={`text-left py-2 border-b border-surface-container ${
                  currentPage === 'about' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                About Practice & Doctors
              </button>
              <button
                type="button"
                onClick={() => navigateTo('gallery')}
                className={`text-left py-2 border-b border-surface-container ${
                  currentPage === 'gallery' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                Facility Gallery
              </button>
              <button
                type="button"
                onClick={() => navigateTo('articles')}
                className={`text-left py-2 border-b border-surface-container ${
                  currentPage === 'articles' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                Oral Health Articles
              </button>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className={`text-left py-2 border-b border-surface-container ${
                  currentPage === 'contact' ? 'text-primary' : 'text-gray-600'
                }`}
              >
                Contact & Hours
              </button>
              <button
                type="button"
                onClick={() => navigateTo('consultation')}
                className="mt-2 text-center rounded-lg bg-secondary py-2.5 text-xs font-bold uppercase text-white shadow-xs flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">upload_file</span>
                Doctor Chat & X-Ray Portal
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Multi-Page Switcher */}
      <main>
        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={navigateTo}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage onNavigate={navigateTo} />
        )}

        {currentPage === 'articles' && (
          <ArticlesPage onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {currentPage === 'consultation' && (
          <DoctorConsultationPage onNavigate={navigateTo} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={navigateTo} />
        )}

        {currentPage === 'terms' && (
          <TermsConditionsPage onNavigate={navigateTo} />
        )}

        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="relative min-h-[75vh] overflow-hidden bg-primary text-white flex items-center">
              <img
                className="absolute inset-0 h-full w-full object-cover opacity-20"
                src={heroImage}
                alt="Modern dental operatory room"
              />
              <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20 mb-4">
                    <span className="material-symbols-outlined text-sm text-secondary-container" aria-hidden="true">verified</span>
                    Licensed Healthcare Facility
                  </div>
                  <h1 className="font-heading text-3xl font-bold leading-tight md:text-5xl">
                    Comprehensive Dental Care & Diagnostic Precision
                  </h1>
                  <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
                    Rumidental provides preventive dentistry, advanced restorative treatments, and digital radiograph second opinions delivered by certified dental practitioners.
                  </p>
                  
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigateTo('consultation')}
                      className="rounded-lg bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary shadow-sm transition hover:bg-surface-container-low cursor-pointer flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">upload_file</span>
                      Doctor Chat & X-Ray Transmission
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('services')}
                      className="rounded-lg border border-white/30 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/20 cursor-pointer flex items-center gap-2"
                    >
                      <span>Explore All Services</span>
                      <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 4 Clinical Pillars */}
            <section className="bg-surface-container-low py-12 border-b border-surface-container">
              <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {CLINICAL_PILLARS.map((pillar) => (
                    <div key={pillar.title} className="rounded-xl border border-surface-container bg-white p-6 shadow-xs">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white mb-4">
                        <span className="material-symbols-outlined text-xl" aria-hidden="true">{pillar.icon}</span>
                      </div>
                      <h2 className="font-heading text-sm font-bold text-primary mb-2">{pillar.title}</h2>
                      <p className="text-xs leading-relaxed text-on-surface-variant">{pillar.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Featured Clinical Services */}
            <section className="bg-white py-14 md:py-18">
              <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Clinical Procedures</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">
                      Featured Dental Treatments
                    </h2>
                    <p className="mt-2 text-xs text-on-surface-variant max-w-xl leading-relaxed">
                      All procedures follow standardized clinical protocols and conservative tooth preservation guidelines.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('services')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-surface-container transition cursor-pointer self-start md:self-auto"
                  >
                    <span>View All Services</span>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                  </button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {SERVICES_DATA.slice(0, 4).map((service) => (
                    <article
                      key={service.id}
                      onClick={() => handleHomeServiceCardClick(service)}
                      className="rounded-xl border border-surface-container bg-surface-container-low p-6 transition hover:border-primary/40 hover:bg-white shadow-xs cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">{service.icon}</span>
                          <span className="rounded-md bg-surface-container px-2 py-0.5 text-[10px] font-bold text-slate-600">
                            {service.category}
                          </span>
                        </div>
                        <h3 className="font-heading text-sm font-bold text-primary mb-2">{service.title}</h3>
                        <p className="text-xs leading-relaxed text-on-surface-variant">{service.shortDescription}</p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between text-xs font-semibold text-primary">
                        <span>Clinical Details</span>
                        <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Doctors & Clinical Directors Preview */}
            <section className="bg-surface-container-low py-14 md:py-18 border-t border-surface-container">
              <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Clinical Staff</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">
                      Our Licensed Dental Surgeons
                    </h2>
                    <p className="mt-2 text-xs text-on-surface-variant max-w-xl leading-relaxed">
                      Meet the certified practitioners responsible for diagnostics, operative care, and treatment planning.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('about')}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-surface-container bg-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-surface-container-low transition cursor-pointer self-start md:self-auto"
                  >
                    <span>Read Doctor Profiles</span>
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_forward</span>
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {CLINICAL_DOCTORS_PREVIEW.map((doc) => (
                    <div key={doc.name} className="rounded-xl border border-surface-container bg-white p-6 shadow-xs">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                          {doc.name.split(' ')[1]?.[0] || 'D'}
                        </div>
                        <div>
                          <h3 className="font-heading text-sm font-bold text-primary">{doc.name}</h3>
                          <p className="text-[11px] text-secondary font-semibold">{doc.role}</p>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-xs text-on-surface-variant border-t border-surface-container pt-3">
                        <p><strong className="text-gray-600">Specialty:</strong> {doc.specialty}</p>
                        <p><strong className="text-gray-600">Credential:</strong> {doc.exp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Diagnostic X-Ray & Doctor Chat Callout Banner */}
            <section className="bg-primary py-12 text-white">
              <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="rounded-xl border border-white/20 bg-white/5 p-8 md:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary-container mb-2">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">lock</span>
                      Encrypted Patient Healthcare Portal
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold">
                      Need an X-Ray Review or Direct Specialist Consultation?
                    </h2>
                    <p className="mt-2 text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed">
                      Upload digital radiographs, panoramic scans, or clinical case records. Consult directly with our dental specialists in an encrypted 1-on-1 session.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('consultation')}
                    className="rounded-lg bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm transition hover:bg-surface-container-low shrink-0 cursor-pointer flex items-center justify-center gap-2 self-start lg:self-auto"
                  >
                    <span className="material-symbols-outlined text-base" aria-hidden="true">upload_file</span>
                    Access Doctor Portal & Chat
                  </button>
                </div>
              </div>
            </section>

            {/* Fast Appointment Request Form */}
            <section className="bg-white py-14 md:py-18">
              <div className="mx-auto max-w-7xl px-5 md:px-10">
                <div className="grid gap-10 lg:grid-cols-12 items-start">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Appointments & Triage</span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                      Schedule a Clinical Consultation
                    </h2>
                    <p className="text-xs leading-relaxed text-on-surface-variant">
                      Submit an appointment request for a comprehensive dental examination, routine cleaning, or specialist diagnostic evaluation.
                    </p>

                    <div className="rounded-xl border border-surface-container bg-surface-container-low p-5 space-y-3 text-xs text-on-surface-variant">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">call</span>
                        <span>Clinical Desk: +1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">mail</span>
                        <span>reception@rumidentalcare.com</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-base" aria-hidden="true">location_on</span>
                        <span>1420 Medical Center Parkway, Suite 400</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="lg:col-span-7 rounded-xl border border-surface-container bg-surface-container-low p-6 md:p-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="home-name" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Full Name *
                        </label>
                        <input
                          id="home-name"
                          type="text"
                          required
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-white px-3.5 py-2.5 text-xs outline-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="home-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Phone Number *
                        </label>
                        <input
                          id="home-phone"
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-white px-3.5 py-2.5 text-xs outline-primary"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="home-email" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Email Address
                        </label>
                        <input
                          id="home-email"
                          type="email"
                          placeholder="patient@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-white px-3.5 py-2.5 text-xs outline-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="home-service" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                          Procedure Interest *
                        </label>
                        <select
                          id="home-service"
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-white px-3.5 py-2.5 text-xs outline-primary"
                        >
                          <option value="General Dental Examination">General Dental Examination</option>
                          <option value="Teeth Cleaning & Scaling">Teeth Cleaning & Scaling</option>
                          <option value="Root Canal Therapy">Root Canal Therapy</option>
                          <option value="Dental Implants Consultation">Dental Implants Consultation</option>
                          <option value="Orthodontics & Clear Aligners">Orthodontics & Clear Aligners</option>
                          <option value="Emergency Toothache Care">Emergency Toothache Care</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="home-message" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                        Clinical Symptoms or Inquiry Notes *
                      </label>
                      <textarea
                        id="home-message"
                        required
                        rows={3}
                        placeholder="Please describe symptoms, affected tooth area, or preferred appointment dates..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-lg border border-surface-container bg-white px-3.5 py-2.5 text-xs outline-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-primary-container disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? 'Transmitting Request...' : 'Submit Appointment Request'}
                    </button>

                    {status && (
                      <p className="mt-2 text-center text-xs font-medium text-primary">
                        {status}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Modal for Service Information */}
      {selectedHomeModalService && (
        <ServiceModal
          service={selectedHomeModalService}
          onClose={() => setSelectedHomeModalService(null)}
          onBook={() => {
            const title = selectedHomeModalService.title
            setSelectedHomeModalService(null)
            handleSelectServiceForBooking(title)
          }}
        />
      )}

      {/* Global Clinical Footer */}
      <footer className="bg-tertiary py-12 text-white border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-8 border-b border-white/10 text-xs">
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-heading text-lg font-bold">
                <span className="material-symbols-outlined text-2xl text-secondary-container" aria-hidden="true">dentistry</span>
                Rumidental Dental Practice
              </div>
              <p className="text-white/70 leading-relaxed">
                Licensed healthcare facility providing comprehensive preventive, restorative, and diagnostic dental services under statutory clinical standards.
              </p>
              <div className="pt-2 text-white/50 text-[11px]">
                Facility Registration No: MED-DEN-2026-9941
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-white mb-3 uppercase tracking-wider text-xs">Clinical Pages</h3>
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
                  <button type="button" onClick={() => navigateTo('gallery')} className="hover:text-white transition cursor-pointer">Facility & Clinic Gallery</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('articles')} className="hover:text-white transition cursor-pointer">Oral Health Articles</button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('contact')} className="hover:text-white transition cursor-pointer">Contact & Appointments</button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-white mb-3 uppercase tracking-wider text-xs">Patient Resources</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <button type="button" onClick={() => navigateTo('consultation')} className="hover:text-white transition font-semibold text-secondary-container cursor-pointer">
                    Doctor Chat & X-Ray Portal
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('privacy')} className="hover:text-white transition cursor-pointer">
                    Privacy Policy & Medical Records
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => navigateTo('terms')} className="hover:text-white transition cursor-pointer">
                    Terms & Conditions of Service
                  </button>
                </li>
                <li className="pt-2 text-white/50 text-[11px]">
                  Emergency Toothache Triage Available
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-white mb-3 uppercase tracking-wider text-xs">Clinic Contact</h3>
              <p className="text-white/70 leading-relaxed">
                1420 Medical Center Parkway, Suite 400
              </p>
              <a href="tel:+15551234567" className="mt-2 inline-block font-bold text-secondary-container text-sm hover:underline">
                +1 (555) 123-4567
              </a>
              <p className="mt-1 text-white/50 text-[11px]">Direct reception line during clinical hours.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-3">
            <p>(c) 2026 Rumidental Dental Practice. All rights reserved.</p>
            <p>Certified Healthcare Facility. Strict Patient Confidentiality.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
