import { useState, useMemo } from 'react'
import { SERVICES_DATA, SERVICE_CATEGORIES, SERVICES_FAQ } from '../data/servicesData'
import { ServiceModal } from '../components/ServiceModal'

const CARE_PROCESS_STEPS = [
  {
    step: '01',
    icon: 'calendar_month',
    title: 'Schedule Appointment',
    desc: 'Select your preferred dental service and convenient schedule.'
  },
  {
    step: '02',
    icon: 'description',
    title: 'Clinical Case Review',
    desc: 'Submit dental history, symptoms, or existing radiographs for preparation.'
  },
  {
    step: '03',
    icon: 'medical_services',
    title: 'Doctor Consultation',
    desc: 'Direct consultation with a licensed dentist for examination and diagnosis.'
  },
  {
    step: '04',
    icon: 'assignment_turned_in',
    title: 'Treatment & Care Plan',
    desc: 'Receive clear care guidance, valid prescriptions, or procedural scheduling.'
  }
]

export function ServicesPage({ onNavigate, onSelectServiceForBooking, initialSelectedService = null }) {
  const [selectedCategory, setSelectedCategory] = useState('All Services')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalService, setModalService] = useState(initialSelectedService)
  const [openFaq, setOpenFaq] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Dedicated consultation booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Comprehensive Dental Consultation',
    platform: 'In-Office Clinic Visit',
    preferredTime: 'Morning (09:00 AM - 12:00 PM)',
    message: ''
  })
  const [bookingStatus, setBookingStatus] = useState('')

  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Services' || service.category === selectedCategory
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.shortDescription.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  function handleCardBook(service) {
    setBookingForm((prev) => ({
      ...prev,
      service: service.title,
      message: `I would like to schedule a consultation for ${service.title}.`
    }))
    const formElement = document.getElementById('booking-section')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    } else {
      onSelectServiceForBooking(service.title)
    }
  }

  async function handleBookingSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setBookingStatus('Submitting your consultation request...')
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingForm.name.trim(),
          phone: bookingForm.phone.trim(),
          email: bookingForm.email.trim() || undefined,
          message: `[Service: ${bookingForm.service}] [Format: ${bookingForm.platform}] [Time: ${bookingForm.preferredTime}] ${bookingForm.message.trim()}`
        })
      })
      if (!response.ok) throw new Error('Request failed')
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        service: 'Comprehensive Dental Consultation',
        platform: 'In-Office Clinic Visit',
        preferredTime: 'Morning (09:00 AM - 12:00 PM)',
        message: ''
      })
      setBookingStatus('Your consultation request has been received. Our clinic team will contact you shortly to confirm the appointment.')
    } catch {
      setBookingStatus('Please call us directly at +1 (555) 123-4567 to confirm your appointment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Banner / Breadcrumb & Hero */}
      <section className="relative overflow-hidden bg-primary py-12 text-white md:py-16">
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-secondary-container">Clinical Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              Professional Dental Care & Consultations
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl">
              Comprehensive Dental Treatments & Consultations
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80">
              Explore our full range of clinical dental care, diagnostic second opinions, smile restorations, and patient consultations with certified practitioners.
            </p>
          </div>

          {/* Practice Highlights */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl border-t border-white/15 pt-6 text-xs text-white/85">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">verified</span>
              <span>Certified Specialists</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">prescriptions</span>
              <span>Legitimate Prescriptions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">schedule</span>
              <span>Structured Appointments</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">lock</span>
              <span>Confidential & Secure</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="relative flex items-center">
              <label htmlFor="service-search-input" className="sr-only">
                Search dental services
              </label>
              <span className="material-symbols-outlined absolute left-4 text-gray-400" aria-hidden="true">search</span>
              <input
                id="service-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dental services (e.g. consultation, root canal, second opinion, hygiene, aligners)..."
                className="w-full rounded-lg border border-white/20 bg-white/10 px-12 py-3 text-white placeholder-white/60 outline-none focus:border-white focus:bg-white/20 transition text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold uppercase text-white/70 hover:text-white cursor-pointer"
                  aria-label="Clear search query"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section aria-label="Service categories" className="sticky top-16 z-30 border-b border-surface-container bg-white shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 scrollbar-none md:px-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0 mr-2">
            Categories:
          </span>
          {SERVICE_CATEGORIES.map((cat) => (
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

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                {selectedCategory === 'All Services' ? 'Clinical Services Catalog' : selectedCategory}
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Showing {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-primary hover:text-primary-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Home
            </button>
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-xl border border-dashed border-surface-container-highest p-12 text-center bg-white">
              <span className="material-symbols-outlined text-5xl text-gray-400 mb-3" aria-hidden="true">search_off</span>
              <h3 className="font-heading text-lg font-semibold text-primary">No services match your criteria</h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                Try adjusting your search terms or selecting another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Services')
                  setSearchQuery('')
                }}
                className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-xs font-bold uppercase text-white hover:bg-primary-container transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="group flex flex-col justify-between rounded-xl border border-surface-container bg-white p-6 shadow-xs hover:border-primary/40 transition duration-150"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container-low text-primary">
                        <span className="material-symbols-outlined text-2xl" aria-hidden="true">{service.icon}</span>
                      </span>
                      <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 border border-slate-200">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-on-surface-variant">
                      {service.shortDescription}
                    </p>

                    {/* Highlights */}
                    {service.highlights && service.highlights.length > 0 && (
                      <div className="mt-4 space-y-1.5 border-t border-surface-container pt-3.5">
                        {service.highlights.slice(0, 3).map((item) => (
                          <div key={item} className="flex items-center gap-2 text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary text-sm" aria-hidden="true">check_circle</span>
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 border-t border-surface-container pt-3.5">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3.5">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">schedule</span>
                        {service.duration}
                      </span>
                      <span className="font-semibold text-primary">
                        {service.priceEstimate}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setModalService(service)}
                        className="rounded-lg border border-surface-container px-3 py-2 text-xs font-semibold text-on-surface-variant hover:border-primary hover:text-primary transition text-center cursor-pointer"
                      >
                        Clinical Details
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCardBook(service)}
                        className="rounded-lg bg-primary px-3 py-2 text-xs font-bold uppercase text-white hover:bg-primary-container transition text-center cursor-pointer"
                      >
                        Book Service
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-surface-container-low py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Structured Patient Protocol</span>
            <h2 className="font-heading text-3xl font-bold text-primary mt-1">Our Care Process</h2>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-secondary" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CARE_PROCESS_STEPS.map((item) => (
              <div key={item.step} className="relative rounded-xl bg-white p-6 border border-surface-container">
                <span className="text-2xl font-bold text-slate-300 font-heading absolute top-4 right-4">
                  {item.step}
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white mb-4">
                  <span className="material-symbols-outlined text-2xl" aria-hidden="true">{item.icon}</span>
                </span>
                <h3 className="font-heading font-bold text-base text-primary">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Clinical Guidance</span>
            <h2 className="font-heading text-3xl font-bold text-primary mt-1">Frequently Asked Questions</h2>
            <div className="mx-auto mt-3 h-0.5 w-16 bg-secondary" />
          </div>

          <div className="space-y-3">
            {SERVICES_FAQ.map((faq, idx) => {
              const isOpen = openFaq === faq.q
              const headerId = `faq-header-${idx}`
              const panelId = `faq-panel-${idx}`
              return (
                <div 
                  key={faq.q}
                  className="rounded-lg border border-surface-container overflow-hidden"
                >
                  <button
                    id={headerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? null : faq.q)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-primary hover:bg-surface-container-low transition cursor-pointer text-sm"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div 
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className="px-4 pb-4 text-xs leading-relaxed text-on-surface-variant bg-surface-container-low"
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Direct Booking Form */}
      <section id="booking-section" className="bg-surface-container-low py-14">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="rounded-xl bg-white p-8 md:p-10 shadow-sm border border-surface-container">
            <div className="text-center max-w-xl mx-auto mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                Appointment Desk
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-2">Request an Appointment</h2>
              <p className="mt-2 text-xs text-on-surface-variant">
                Submit your inquiry and our clinic reception will confirm your appointment details.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="booking-email" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    placeholder="patient@example.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="booking-service" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Dental Service *
                  </label>
                  <select
                    id="booking-service"
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-xs outline-primary focus:bg-white"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="booking-platform" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Format & Timing
                  </label>
                  <select
                    id="booking-platform"
                    value={bookingForm.platform}
                    onChange={(e) => setBookingForm({ ...bookingForm, platform: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-xs outline-primary focus:bg-white"
                  >
                    <option value="In-Office Clinic Visit">In-Office Clinic Visit</option>
                    <option value="Clinical Video Consultation">Clinical Video Consultation</option>
                    <option value="Phone Consultation">Telephone Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="booking-message" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Symptoms or Reason for Consultation *
                </label>
                <textarea
                  id="booking-message"
                  required
                  rows={3}
                  placeholder="Please describe your symptoms, tooth location, or specific treatment questions..."
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary-container cursor-pointer text-sm disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Consultation Request'}
              </button>

              {bookingStatus && (
                <p className="mt-3 text-center text-xs font-medium text-primary">
                  {bookingStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      {modalService && (
        <ServiceModal
          service={modalService}
          onClose={() => setModalService(null)}
          onBook={handleCardBook}
        />
      )}
    </div>
  )
}
