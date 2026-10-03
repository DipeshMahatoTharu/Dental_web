import { useState, useMemo } from 'react'
import { SERVICES_DATA, SERVICE_CATEGORIES, SERVICES_FAQ } from '../data/servicesData'
import { ServiceModal } from '../components/ServiceModal'

export function ServicesPage({ onNavigate, onSelectServiceForBooking, initialSelectedService = null }) {
  const [selectedCategory, setSelectedCategory] = useState('All Online Services')
  const [searchQuery, setSearchQuery] = useState('')
  const [modalService, setModalService] = useState(initialSelectedService)
  const [openFaq, setOpenFaq] = useState(null)
  
  // Dedicated online consultation booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Virtual Dental Consultation',
    platform: 'Google Meet',
    preferredTime: 'Morning (09:00 AM - 12:00 PM)',
    message: ''
  })
  const [bookingStatus, setBookingStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All Online Services' || service.category === selectedCategory
      const matchesSearch =
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  function handleCardBook(service) {
    setBookingForm((prev) => ({
      ...prev,
      service: service.title,
      message: `I would like to book a virtual session for ${service.title}.`
    }))
    const formElement = document.getElementById('online-booking-section')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    } else {
      onSelectServiceForBooking(service.title)
    }
  }

  async function handleBookingSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setBookingStatus('Submitting your virtual consultation request...')
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingForm.name.trim(),
          phone: bookingForm.phone.trim(),
          email: bookingForm.email.trim() || undefined,
          serviceInterest: bookingForm.service,
          preferredTime: bookingForm.preferredTime,
          message: `[Online Service: ${bookingForm.service}] [Platform: ${bookingForm.platform}] [Time: ${bookingForm.preferredTime}] ${bookingForm.message.trim()}`
        })
      })
      if (!response.ok) throw new Error('Request failed')
      setBookingForm({
        name: '',
        phone: '',
        email: '',
        service: 'Virtual Dental Consultation',
        platform: 'Google Meet',
        preferredTime: 'Morning (09:00 AM - 12:00 PM)',
        message: ''
      })
      setBookingStatus('Success! Your virtual consultation request is received. Our clinic team will send you the meeting link shortly.')
    } catch {
      setBookingStatus('Notice: Please call our clinical reception directly at +1 (555) 123-4567 while digital dispatch queues.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Banner / Breadcrumb & Hero */}
      <section className="relative overflow-hidden bg-primary py-12 text-white md:py-16">
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
            <span className="text-secondary-container">Online Clinical Services</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                <span className="material-symbols-outlined text-sm text-secondary-container" aria-hidden="true">videocam</span>
                Online Dental Telehealth & Specialist Consultations
              </div>
              <h1 className="mt-3 font-heading text-2xl font-bold leading-tight md:text-4xl lg:text-5xl">
                Virtual Dental Care & Diagnostic Consultations
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-white/80 md:text-base">
                Connect directly with licensed dental surgeons for oral exams, symptom analysis, radiograph review, and official electronic prescriptions without leaving home.
              </p>

              {/* Quick Clinical Guarantees */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/15 pt-5 text-xs text-white/85">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-container text-lg" aria-hidden="true">videocam</span>
                  <span>HD Video Calls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-container text-lg" aria-hidden="true">prescriptions</span>
                  <span>Digital e-Rx</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-container text-lg" aria-hidden="true">timer</span>
                  <span>Same-Day Slots</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-container text-lg" aria-hidden="true">lock</span>
                  <span>HIPAA Encrypted</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mt-6">
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-white/50 text-lg" aria-hidden="true">search</span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search clinical services (e.g. video consultation, second opinion, toothache triage)..."
                    aria-label="Search clinical services"
                    className="w-full rounded-lg border border-white/20 bg-white/10 pl-10 pr-16 py-2.5 text-white placeholder-white/60 outline-none focus:border-secondary-container focus:bg-white/20 transition text-xs md:text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 text-xs font-bold uppercase text-white/70 hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Video Consulting Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl border border-white/20 bg-white/5 p-2.5 shadow-2xl backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src="/images/video-consulting.jpg"
                    alt="Licensed dentist conducting live telehealth video consultation with patient"
                    className="h-64 sm:h-72 lg:h-80 w-full object-cover rounded-lg"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-primary/90 backdrop-blur px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white border border-white/20">
                    <span className="material-symbols-outlined text-sm text-secondary-container" aria-hidden="true">videocam</span>
                    Live Telehealth Consultation
                  </div>
                </div>

                <div className="p-3 bg-white/10 rounded-lg mt-2.5 border border-white/10 flex items-center justify-between text-xs text-white">
                  <div>
                    <strong className="block font-heading text-xs font-bold">Encrypted Telehealth Session</strong>
                    <span className="text-[10px] text-white/70">Dr. Robert Vance, DDS & Clinical Directors</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('consultation')}
                    className="rounded-md bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase text-white hover:bg-secondary-container transition cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">forum</span>
                    Doctor Portal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="sticky top-14 z-30 border-b border-surface-container bg-white/95 backdrop-blur shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3 scrollbar-none md:px-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 shrink-0 mr-2">
            Filter:
          </span>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-xs'
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
                {selectedCategory === 'All Online Services' ? 'Available Clinical Services' : selectedCategory}
              </h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Showing {filteredServices.length} online consultation {filteredServices.length === 1 ? 'service' : 'services'}
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-primary hover:text-primary-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_back</span>
              Back to Home
            </button>
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-xl border border-dashed border-surface-container-highest p-12 text-center bg-white">
              <span className="material-symbols-outlined text-4xl text-gray-400 mb-2" aria-hidden="true">search_off</span>
              <h3 className="font-heading text-base font-semibold text-primary">No clinical services match your query</h3>
              <p className="mt-1 text-xs text-on-surface-variant">
                Try adjusting your search keywords or selecting another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Online Services')
                  setSearchQuery('')
                }}
                className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs font-bold uppercase text-white hover:bg-primary-container transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredServices.map((service) => (
                <article
                  key={service.id}
                  className="flex flex-col justify-between rounded-xl border border-surface-container bg-white p-6 shadow-xs transition hover:border-primary/40 hover:shadow-sm"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container-low text-primary shadow-xs">
                        <span className="material-symbols-outlined text-2xl" aria-hidden="true">{service.icon}</span>
                      </span>
                      <span className="rounded-md bg-surface-container px-2 py-0.5 text-[10px] font-bold text-slate-600">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="font-heading text-base font-bold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">
                      {service.shortDescription}
                    </p>

                    {/* Highlights */}
                    {service.highlights && (
                      <div className="mt-4 space-y-1.5 border-t border-surface-container pt-3">
                        {service.highlights.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary text-sm" aria-hidden="true">check_circle</span>
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 border-t border-surface-container pt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-sm text-primary" aria-hidden="true">videocam</span>
                        {service.duration.split(' ')[0]} {service.duration.split(' ')[1]}
                      </span>
                      <span className="font-bold text-secondary">
                        {service.priceEstimate.split('/')[0]}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setModalService(service)}
                        className="rounded-lg border border-surface-container px-3 py-2 text-xs font-semibold text-on-surface-variant hover:border-primary hover:text-primary transition text-center cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCardBook(service)}
                        className="rounded-lg bg-primary px-3 py-2 text-xs font-bold uppercase text-white hover:bg-primary-container transition text-center shadow-xs cursor-pointer"
                      >
                        Book Virtual
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How Online Consulting Works */}
      <section className="bg-surface-container-low py-14 border-t border-surface-container">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Simple 4-Step Process</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">How Our Virtual Consultations Work</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                icon: 'calendar_month',
                title: 'Book Your Session',
                desc: 'Select your preferred online service, date, and meeting platform (Google Meet, Zoom, or WhatsApp).'
              },
              {
                step: '02',
                icon: 'upload_file',
                title: 'Share Info or Scans',
                desc: 'Upload dental X-rays, smile photos, or describe your symptoms beforehand so the doctor can prepare.'
              },
              {
                step: '03',
                icon: 'video_chat',
                title: '1-on-1 Video Call',
                desc: 'Join your secure video consultation with a senior dental surgeon for a live visual exam and clinical assessment.'
              },
              {
                step: '04',
                icon: 'assignment_turned_in',
                title: 'Rx & Care Summary',
                desc: 'Receive digital e-prescriptions, itemized second opinion reports, and care recommendations via PDF.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative rounded-xl bg-white p-6 shadow-xs border border-surface-container">
                <span className="text-2xl font-bold text-secondary/20 font-heading absolute top-4 right-4">
                  {item.step}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white mb-3 shadow-xs">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">{item.icon}</span>
                </span>
                <h3 className="font-heading font-bold text-sm text-primary">{item.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Telehealth Guidelines</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {SERVICES_FAQ.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-surface-container overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-primary hover:bg-surface-container-low transition cursor-pointer text-xs md:text-sm"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-secondary text-base" aria-hidden="true">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs leading-relaxed text-on-surface-variant bg-surface-container-low/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Direct Online Booking Form */}
      <section id="online-booking-section" className="bg-surface-container-low py-14 border-t border-surface-container">
        <div className="mx-auto max-w-3xl px-5 md:px-10">
          <div className="rounded-xl bg-white p-6 md:p-10 shadow-xs border border-surface-container">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">video_camera_front</span>
                Online Appointment
              </span>
              <h2 className="font-heading text-2xl font-bold text-primary mt-2">Schedule a Virtual Consultation</h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Select your service and preferred video meeting platform. Our team will email you the direct meeting link and confirmed time.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="service-book-name" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="service-book-name"
                    type="text"
                    required
                    placeholder="Your Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="service-book-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="service-book-phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="service-book-email" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="service-book-email"
                    type="email"
                    required
                    placeholder="patient@example.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="service-book-service" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Online Service *
                  </label>
                  <select
                    id="service-book-service"
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="service-book-platform" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                    Video Platform *
                  </label>
                  <select
                    id="service-book-platform"
                    value={bookingForm.platform}
                    onChange={(e) => setBookingForm({ ...bookingForm, platform: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="WhatsApp Video">WhatsApp Video</option>
                    <option value="Phone Call">Audio Phone Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="service-book-message" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
                  Describe Symptoms or Questions *
                </label>
                <textarea
                  id="service-book-message"
                  required
                  rows={3}
                  placeholder="Describe your symptoms, tooth location, pain level, or previous treatments. You can share radiographs during the call..."
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-primary py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition hover:bg-primary-container disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'Transmitting Booking...' : 'Schedule Virtual Consultation'}
              </button>

              {bookingStatus && (
                <p className="mt-2 text-center text-xs font-medium text-primary">
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
