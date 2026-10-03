import { useEffect, useState } from 'react'
import { ServicesPage } from './pages/ServicesPage'
import { ServiceModal } from './components/ServiceModal'
import { SERVICES_DATA } from './data/servicesData'

const heroImage = '/images/hero-clinic.jpg'
const dentistImage = '/images/dentist.jpg'
const equipmentImage = '/images/equipment.jpg'
const receptionImage = '/images/reception.jpg'

const benefits = [
  ['videocam', 'Online Teledentistry Specialists', 'Connect 1-on-1 with certified senior dental consultants via private video call.'],
  ['prescriptions', 'Digital e-Prescriptions', 'Receive certified digital prescriptions for pain relief, antibiotics, and special mouthwashes.'],
  ['policy', 'Independent Second Opinions', 'Unbiased review of external dental X-rays, 3D scans, and treatment plans before surgery.'],
  ['speed', 'Fast & Convenient Care', 'Zero clinic travel or waiting room delays. Same-day virtual appointments available.'],
]

const testimonials = [
  ['SH', 'Sarah Henderson', 'Second Opinion Consultation', 'Got an online second opinion for a recommended root canal. The specialist saved me $1,200 by suggesting a conservative alternative.'],
  ['MJ', 'Marcus Johnson', 'Emergency Teledentistry', 'Had intense tooth pain on a Sunday evening. Connected via video call in 10 minutes and had an e-prescription sent to my local pharmacy.'],
  ['DL', 'David Lee', 'Virtual Smile Makeover', 'The 3D smile preview was incredible. I knew exactly what veneers would look like before making my decision.'],
]

const posts = [
  ['Telehealth', 'How Online Dental Consultations Save You Time & Money', 'Learn how virtual triage works and when teledentistry is the smartest first step.', '/images/gum-care.jpg'],
  ['Technology', 'The Future of Digital Smile Previews', 'How 3D simulation tools are changing aesthetic dentistry planning from home.', '/images/aligners.jpg'],
  ['Parenting', 'Teething & Early Oral Habits: A Virtual Guide for Parents', 'Expert pediatric advice for managing teething discomfort and cavity prevention.', '/images/children-care.jpg'],
]

function Icon({ children, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>
}

function App() {
  const [currentPage, setCurrentPage] = useState('home') // 'home' | 'services'
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedHomeModalService, setSelectedHomeModalService] = useState(null)

  // Listen to URL hash for direct links and browser back/forward buttons
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('services')) {
        setCurrentPage('services')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setCurrentPage('home')
        if (hash && hash !== '#' && hash !== '#home') {
          const targetId = hash.replace('#', '')
          setTimeout(() => {
            const el = document.getElementById(targetId)
            if (el) el.scrollIntoView({ behavior: 'smooth' })
          }, 100)
        }
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function navigateTo(target, sectionId = null) {
    setMobileMenuOpen(false)
    if (target === 'services') {
      window.location.hash = '#/services'
      setCurrentPage('services')
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
    navigateTo('home', 'contact')
    setForm((prev) => ({
      ...prev,
      message: `I would like to book an online consultation for: ${serviceTitle}.`
    }))
  }

  function handleHomeServiceCardClick(service) {
    setSelectedHomeModalService(service)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('Sending...')
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error('Request failed')
      setForm({ name: '', phone: '', message: '' })
      setStatus('Thanks. Our dental consultant will contact you shortly.')
    } catch {
      setStatus('Please call us directly while the API is unavailable.')
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Fixed Navigation Header */}
      <header className="fixed top-0 z-50 w-full border-b border-surface-container bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <button 
            onClick={() => navigateTo('home')} 
            className="font-heading text-2xl font-bold text-primary flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-3xl text-secondary">dentistry</span>
            Rumidental
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => navigateTo('home')}
              className={`text-sm font-semibold transition cursor-pointer ${
                currentPage === 'home'
                  ? 'text-primary border-b-2 border-primary pb-0.5'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              Home
            </button>
            <button
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
              onClick={() => navigateTo('home', 'about')}
              className="text-sm font-semibold text-on-surface-variant transition hover:text-primary cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => navigateTo('home', 'gallery')}
              className="text-sm font-semibold text-on-surface-variant transition hover:text-primary cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => navigateTo('home', 'blog')}
              className="text-sm font-semibold text-on-surface-variant transition hover:text-primary cursor-pointer"
            >
              Blog
            </button>
            <button
              onClick={() => navigateTo('home', 'contact')}
              className="text-sm font-semibold text-on-surface-variant transition hover:text-primary cursor-pointer"
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigateTo('services')}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-container flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">video_camera_front</span>
              Book Online
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center p-2 text-primary md:hidden rounded-lg hover:bg-surface-container transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-surface-container bg-white px-6 py-5 md:hidden shadow-lg animate-fadeIn">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigateTo('home')}
                className={`text-left text-base font-semibold ${
                  currentPage === 'home' ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('services')}
                className={`text-left text-base font-semibold ${
                  currentPage === 'services' ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => navigateTo('home', 'about')}
                className="text-left text-base font-semibold text-on-surface-variant"
              >
                About Us
              </button>
              <button
                onClick={() => navigateTo('home', 'gallery')}
                className="text-left text-base font-semibold text-on-surface-variant"
              >
                Smile Gallery
              </button>
              <button
                onClick={() => navigateTo('home', 'blog')}
                className="text-left text-base font-semibold text-on-surface-variant"
              >
                Blog & News
              </button>
              <button
                onClick={() => navigateTo('home', 'contact')}
                className="text-left text-base font-semibold text-on-surface-variant"
              >
                Contact & Support
              </button>
              <button
                onClick={() => navigateTo('services')}
                className="mt-2 text-center rounded-lg bg-primary py-3 text-sm font-semibold text-white shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">video_camera_front</span>
                Book Online Consultation
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      {currentPage === 'services' ? (
        <main className="pt-16">
          <ServicesPage
            onNavigate={(page) => navigateTo(page)}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        </main>
      ) : (
        <main className="pt-16">
          {/* Hero Section */}
          <section className="hero-photo relative min-h-[86vh] overflow-hidden" id="home">
            <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="Modern dental clinic treatment room" />
            <div className="hero-overlay absolute inset-0" />
            <div className="relative mx-auto flex min-h-[86vh] max-w-7xl items-center px-5 py-20 md:px-10">
              <div className="reveal max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary-container/80 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary mb-4 border border-secondary/20">
                  <span className="h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                  Online Dental Consultations & Telehealth
                </div>
                <h1 className="font-heading text-4xl font-bold leading-tight text-primary md:text-6xl">
                  Expert Dental Care From Anywhere
                </h1>
                <p className="mt-6 text-lg leading-8 text-on-surface-variant">
                  Speak directly with licensed dental specialists over secure video call. Get quick diagnoses, digital prescriptions, and expert second opinions from home.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button 
                    onClick={() => navigateTo('services')}
                    className="rounded-lg bg-primary px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-primary-container cursor-pointer flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-xl">video_camera_front</span>
                    Book Online Consultation
                  </button>
                  <button 
                    onClick={() => navigateTo('services')}
                    className="rounded-lg border-2 border-secondary px-7 py-4 font-semibold text-secondary transition hover:bg-secondary hover:text-white cursor-pointer flex items-center gap-2"
                  >
                    Explore Online Services
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Home Services Preview Section */}
          <section className="bg-white py-16" id="services">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
                    <span className="material-symbols-outlined text-sm">wifi</span>
                    100% Virtual Telehealth Services
                  </div>
                  <h2 className="font-heading text-3xl md:text-4xl font-semibold text-primary mt-1">
                    Online Dental Consultations
                  </h2>
                  <div className="mt-3 h-1 w-20 rounded-full bg-secondary" />
                  <p className="mt-3 text-on-surface-variant">
                    Convenient, confidential, and certified virtual consultations on Zoom, Google Meet, or WhatsApp.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center gap-2 rounded-xl bg-surface-container-low px-5 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-white transition shadow-sm cursor-pointer"
                >
                  View All Online Services
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES_DATA.slice(0, 4).map((service) => (
                  <article 
                    onClick={() => handleHomeServiceCardClick(service)}
                    className="reveal rounded-xl border border-surface-container bg-surface-container-low p-6 transition duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-xl cursor-pointer group flex flex-col justify-between" 
                    key={service.title}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Icon className="text-3xl text-primary group-hover:scale-110 transition duration-300">{service.icon}</Icon>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                          Online
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-bold group-hover:text-primary transition">{service.title}</h3>
                      <p className="mt-2.5 text-xs leading-5 text-on-surface-variant">{service.shortDescription}</p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-surface-container flex items-center justify-between text-xs font-bold text-primary group-hover:text-secondary">
                      <span>Learn More</span>
                      <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition">arrow_forward</span>
                    </div>
                  </article>
                ))}
              </div>

              {/* Bottom Telehealth Banner */}
              <div className="mt-12 rounded-2xl bg-gradient-to-r from-primary to-primary-container p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary-container">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Same-Day Appointments
                  </div>
                  <h3 className="font-heading text-2xl font-bold mt-1">Need urgent dental advice or a second opinion?</h3>
                  <p className="mt-2 text-sm text-white/80 max-w-xl">
                    Connect with a licensed dentist right now. Review X-rays, discuss cosmetic goals, or get emergency prescriptions from home.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('services')}
                  className="rounded-xl bg-white px-7 py-3.5 font-bold text-primary shadow-lg transition hover:bg-secondary-container hover:text-secondary shrink-0 cursor-pointer flex items-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined text-lg">videocam</span>
                  Start Online Consultation
                </button>
              </div>
            </div>
          </section>

          {/* Why Choose Telehealth */}
          <section className="bg-surface-container-low py-16" id="about">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Virtual Healthcare Advantages</span>
                <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl mt-1">Why Consult Online With Rumidental</h2>
                <div className="mt-8 space-y-6">
                  {benefits.map(([icon, title, text]) => (
                    <div className="flex gap-4" key={title}>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                        <Icon>{icon}</Icon>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-on-surface-variant">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img className="aspect-square w-full rounded-xl object-cover shadow-2xl" src={dentistImage} alt="Smiling dentist in clinic" />
                <div className="absolute -bottom-5 -right-5 -z-10 h-36 w-36 rounded-xl bg-secondary-container" />
              </div>
            </div>
          </section>

          {/* Clinical Excellence */}
          <section className="bg-white py-16">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
              <div className="grid grid-cols-2 gap-4">
                <img className="h-72 w-full rounded-lg object-cover shadow-md" src={equipmentImage} alt="Dental equipment" />
                <img className="mt-10 h-72 w-full rounded-lg object-cover shadow-md" src={receptionImage} alt="Dental clinic reception" />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">Certified Doctors & Digital Diagnostics</h2>
                <p className="mt-5 text-lg leading-8 text-on-surface-variant">
                  Rumidental brings hospital-grade clinical expertise directly to your screen. Our licensed practitioners use secure high-definition telemedicine technology to provide compassionate, accurate dental advice.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <Stat value="15k+" label="Virtual Sessions" />
                  <Stat value="99.2%" label="Patient Satisfaction" />
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section className="bg-surface-container-low py-16" id="gallery">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <SectionTitle title="Smile Transformation Gallery" subtitle="Real results planned and guided by our virtual specialists." />
              <div className="grid gap-6 md:grid-cols-3">
                <GalleryCard className="md:col-span-2" image="/images/smile-gallery.jpg" title="Full Smile Rejuvenation" />
                <div className="grid gap-6">
                  <GalleryCard image="/images/whitening.jpg" title="Whitening Treatment" compact />
                  <GalleryCard image="/images/equipment.jpg" title="Restorative Care" compact />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <SectionTitle title="Patient Experiences" subtitle="Trusted by thousands of online patients worldwide." />
              <div className="grid gap-6 md:grid-cols-3">
                {testimonials.map(([initials, name, treatment, quote]) => (
                  <article className="rounded-lg border border-surface-container-highest bg-white p-7 shadow-sm" key={name}>
                    <div className="mb-5 flex text-secondary">{Array.from({ length: 5 }).map((_, index) => <Icon key={index}>star</Icon>)}</div>
                    <p className="leading-7 text-on-surface-variant">"{quote}"</p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container font-bold text-primary">{initials}</div>
                      <div>
                        <h3 className="font-bold">{name}</h3>
                        <p className="text-sm text-on-surface-variant">{treatment}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Blog */}
          <section className="bg-surface-container-low py-16" id="blog">
            <div className="mx-auto max-w-7xl px-5 md:px-10">
              <SectionTitle title="Telehealth Articles & Dental Tips" subtitle="Stay informed about oral health and virtual diagnostics." />
              <div className="grid gap-7 md:grid-cols-3">
                {posts.map(([category, title, text, image]) => (
                  <article className="group bg-white p-4 rounded-xl border border-surface-container" key={title}>
                    <img className="h-56 w-full rounded-lg object-cover transition group-hover:scale-[1.02]" src={image} alt="" />
                    <p className="mt-5 text-xs font-bold uppercase tracking-widest text-secondary">{category}</p>
                    <h3 className="mt-2 font-heading text-xl font-semibold text-primary">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Contact Section */}
          <section className="bg-white py-16" id="contact">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Get In Touch</span>
                <h2 className="font-heading text-3xl font-semibold text-primary mt-1">Virtual Clinic Support</h2>
                <div className="mt-7 space-y-4">
                  <ContactLine icon="phone" text="+1 (555) 123-4567" />
                  <ContactLine icon="mail" text="consult@rumidental.com" />
                  <ContactLine icon="devices" text="Online Telehealth: Global Access" />
                </div>
                <div className="mt-8 border-t border-surface-container pt-5 text-sm">
                  <p className="flex justify-between"><span>Online Hours (Mon - Fri)</span><strong>08:00 AM - 09:00 PM</strong></p>
                  <p className="mt-3 flex justify-between"><span>Saturday & Sunday</span><strong>09:00 AM - 06:00 PM</strong></p>
                  <p className="mt-3 flex justify-between"><span>Emergency Tele-triage</span><em>24/7 On-Call</em></p>
                </div>
              </div>
              <form className="rounded-lg border border-surface-container bg-surface-container-low p-6 lg:col-span-3" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <input className="rounded-lg border border-surface-container bg-white px-4 py-3 outline-primary text-sm" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <input className="rounded-lg border border-surface-container bg-white px-4 py-3 outline-primary text-sm" placeholder="Phone or WhatsApp number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <textarea className="mt-4 min-h-32 w-full rounded-lg border border-surface-container bg-white px-4 py-3 outline-primary text-sm" placeholder="How can our online dental consultants assist you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                <button className="mt-4 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-container cursor-pointer text-sm" type="submit">Submit Inquiry</button>
                {status && <p className="mt-3 text-sm text-on-surface-variant">{status}</p>}
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

      {/* Global Footer */}
      <footer className="bg-tertiary py-12 text-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-8 md:grid-cols-4 pb-8 border-b border-white/10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-heading text-2xl font-bold">
                <span className="material-symbols-outlined text-3xl text-secondary-container">dentistry</span>
                Rumidental
              </div>
              <p className="mt-3 text-sm text-white/70 max-w-sm">
                Certified virtual dental consultations, digital e-prescriptions, second opinions, and cosmetic smile designs.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white mb-3 text-sm uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>
                  <button onClick={() => navigateTo('home')} className="hover:text-white transition cursor-pointer">Home</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('services')} className="hover:text-white transition text-secondary-container font-semibold cursor-pointer">Services</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('home', 'about')} className="hover:text-white transition cursor-pointer">About</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('home', 'gallery')} className="hover:text-white transition cursor-pointer">Gallery</button>
                </li>
                <li>
                  <button onClick={() => navigateTo('home', 'contact')} className="hover:text-white transition cursor-pointer">Contact</button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-white mb-3 text-sm uppercase tracking-wider">Virtual Helpline</h4>
              <p className="text-sm text-white/70">Urgent dental assistance & video triage:</p>
              <a href="tel:+15551234567" className="mt-2 inline-block font-bold text-secondary-container text-base hover:underline">
                +1 (555) 123-4567
              </a>
              <p className="mt-2 text-xs text-white/50">Online consultations available daily.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4">
            <p>(c) 2026 Rumidental Virtual Clinic. Certified Telehealth Practice.</p>
            <p>Private, HIPAA-compliant online consultations.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-secondary" />
      {subtitle && <p className="mt-4 text-on-surface-variant">{subtitle}</p>}
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-heading text-4xl font-bold text-secondary">{value}</div>
      <div className="mt-1 text-sm font-bold uppercase tracking-wide">{label}</div>
    </div>
  )
}

function GalleryCard({ image, title, compact = false, className = '' }) {
  return (
    <article className={`group relative overflow-hidden rounded-lg shadow-lg ${className}`}>
      <img className={`${compact ? 'h-52' : 'h-[28rem]'} w-full object-cover transition duration-500 group-hover:scale-105`} src={image} alt={title} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <h3 className="font-heading text-xl font-semibold">{title}</h3>
      </div>
    </article>
  )
}

function ContactLine({ icon, text }) {
  return (
    <p className="flex items-center gap-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container text-primary"><Icon>{icon}</Icon></span>
      <span>{text}</span>
    </p>
  )
}

export default App
