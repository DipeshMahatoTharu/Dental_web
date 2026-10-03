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
    setBookingStatus('Submitting your virtual consultation request...')
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingForm.name,
          phone: bookingForm.phone,
          email: bookingForm.email || undefined,
          message: `[Online Service: ${bookingForm.service}] [Platform: ${bookingForm.platform}] [Time: ${bookingForm.preferredTime}] ${bookingForm.message}`
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
      setBookingStatus('Please call us directly at +1 (555) 123-4567 while the server is unavailable.')
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background animate-fadeIn">
      {/* Top Banner / Breadcrumb & Hero */}
      <section className="relative overflow-hidden bg-primary py-16 text-white md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <nav className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <button 
              onClick={() => onNavigate('home')} 
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Home
            </button>
            <span>/</span>
            <span className="text-secondary-container">Online Services</span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary-container border border-secondary-container/30">
              <span className="h-2 w-2 rounded-full bg-secondary-container animate-ping"></span>
              100% Online Dental Telehealth & Consultations
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Virtual Dental Care & Expert Consultations
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80 md:text-lg">
              Get professional diagnoses, second opinions, digital smile evaluations, and electronic prescriptions directly from certified dentists — without leaving home.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl border-t border-white/15 pt-6 text-xs text-white/85">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">videocam</span>
              <span>HD Video Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">prescriptions</span>
              <span>Valid e-Prescriptions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">timer</span>
              <span>Same-Day Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-container text-xl">lock</span>
              <span>HIPAA Compliant & Private</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-gray-400">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search online services (e.g. video consultation, second opinion, emergency triage, aligners)..."
                className="w-full rounded-xl border border-white/20 bg-white/10 px-12 py-3.5 text-white placeholder-white/60 backdrop-blur-md outline-none focus:border-secondary-container focus:bg-white/20 transition text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold uppercase text-white/70 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="sticky top-16 z-30 border-b border-surface-container bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-5 py-3.5 scrollbar-none md:px-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400 shrink-0 mr-2">
            Filter:
          </span>
          {SERVICE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-14 md:py-18">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                {selectedCategory === 'All Online Services' ? 'Available Online Consultations' : selectedCategory}
              </h2>
              <p className="mt-1 text-sm text-on-surface-variant">
                Showing {filteredServices.length} online consultation {filteredServices.length === 1 ? 'service' : 'services'}
              </p>
            </div>
            
            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-primary hover:text-primary-container cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Home
            </button>
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-surface-container-highest p-12 text-center bg-white">
              <span className="material-symbols-outlined text-5xl text-gray-400 mb-3">search_off</span>
              <h3 className="font-heading text-lg font-semibold text-primary">No online services found</h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                Try adjusting your search keywords or selecting another category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All Online Services')
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
                  className="group flex flex-col justify-between rounded-2xl border border-surface-container bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-container-low text-primary transition duration-300 group-hover:bg-primary group-hover:text-white shadow-xs">
                        <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                        Online Consultation
                      </span>
                    </div>

                    <h3 className="font-heading text-lg font-bold text-primary group-hover:text-primary-container transition">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-on-surface-variant">
                      {service.shortDescription}
                    </p>

                    {/* Highlights */}
                    {service.highlights && (
                      <div className="mt-4 space-y-1.5 border-t border-surface-container pt-3.5">
                        {service.highlights.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 border-t border-surface-container pt-3.5">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3.5">
                      <span className="flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-sm text-primary">videocam</span>
                        {service.duration.split(' ')[0]} {service.duration.split(' ')[1]}
                      </span>
                      <span className="font-bold text-secondary">
                        {service.priceEstimate.split('/')[0]}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setModalService(service)}
                        className="rounded-lg border border-surface-container px-3 py-2 text-xs font-semibold text-on-surface-variant hover:border-primary hover:text-primary transition text-center cursor-pointer"
                      >
                        Learn More
                      </button>
                      <button
                        onClick={() => handleCardBook(service)}
                        className="rounded-lg bg-primary px-3 py-2 text-xs font-bold uppercase text-white hover:bg-primary-container transition text-center shadow-xs cursor-pointer"
                      >
                        Book Online
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
      <section className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Simple 4-Step Process</span>
            <h2 className="font-heading text-3xl font-bold text-primary mt-2">How Our Online Consultations Work</h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-secondary" />
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
                title: 'Share Info / Scans',
                desc: 'Upload dental X-rays, smile photos, or describe your symptoms beforehand so the dentist can prepare.'
              },
              {
                step: '03',
                icon: 'video_chat',
                title: '1-on-1 Video Call',
                desc: 'Join your secure video consultation with a senior dentist for a live visual exam and expert diagnosis.'
              },
              {
                step: '04',
                icon: 'assignment_turned_in',
                title: 'Rx & Treatment Plan',
                desc: 'Receive digital prescriptions, itemized second opinion reports, and care recommendations via PDF.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative rounded-2xl bg-white p-6 shadow-sm border border-surface-container">
                <span className="text-3xl font-black text-secondary/20 font-heading absolute top-4 right-4">
                  {item.step}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white mb-4 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </span>
                <h3 className="font-heading font-bold text-base text-primary">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Telehealth FAQ</span>
            <h2 className="font-heading text-3xl font-bold text-primary mt-2">Frequently Asked Questions</h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-secondary" />
          </div>

          <div className="space-y-3.5">
            {SERVICES_FAQ.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-surface-container overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-4.5 text-left font-semibold text-primary hover:bg-surface-container-low transition cursor-pointer text-sm"
                  >
                    <span>{faq.q}</span>
                    <span className="material-symbols-outlined text-secondary transition-transform duration-300 transform">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs leading-relaxed text-on-surface-variant bg-surface-container-low/40">
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
      <section id="online-booking-section" className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <div className="rounded-2xl bg-white p-8 md:p-12 shadow-xl border border-surface-container">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/30 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary">
                <span className="material-symbols-outlined text-sm">video_camera_front</span>
                Online Appointment
              </span>
              <h2 className="font-heading text-3xl font-bold text-primary mt-2">Book Your Online Consultation</h2>
              <p className="mt-2 text-xs text-on-surface-variant">
                Select your service and preferred video meeting platform. Our team will email you the direct meeting link and confirmed time.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-4 py-3 text-sm outline-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-4 py-3 text-sm outline-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-4 py-3 text-sm outline-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Online Service *
                  </label>
                  <select
                    value={bookingForm.service}
                    onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-4 py-3 text-xs outline-primary focus:bg-white"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                    Video Platform *
                  </label>
                  <select
                    value={bookingForm.platform}
                    onChange={(e) => setBookingForm({ ...bookingForm, platform: e.target.value })}
                    className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-4 py-3 text-xs outline-primary focus:bg-white"
                  >
                    <option value="Google Meet">Google Meet (Link sent via email)</option>
                    <option value="Zoom">Zoom (Meeting ID & Passcode)</option>
                    <option value="WhatsApp Video">WhatsApp Video Call</option>
                    <option value="Phone Call">Audio Phone Call</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                  Describe Symptoms, Questions, or Dental History *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your symptoms, tooth location, pain level, or previous treatments. You can share scans during the call..."
                  value={bookingForm.message}
                  onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                  className="w-full rounded-lg border border-surface-container bg-surface-container-low/30 px-4 py-3 text-sm outline-primary focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-primary py-3.5 font-semibold text-white shadow-lg transition hover:bg-primary-container cursor-pointer text-sm"
              >
                Schedule Virtual Consultation
              </button>

              {bookingStatus && (
                <p className="mt-3 text-center text-xs font-semibold text-secondary">
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
