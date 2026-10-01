import { useEffect, useState } from 'react'

const heroImage = '/images/hero-clinic.jpg'
const dentistImage = '/images/dentist.jpg'
const equipmentImage = '/images/equipment.jpg'
const receptionImage = '/images/reception.jpg'

const fallbackServices = [
  ['dentistry', 'General Dentistry', 'Comprehensive exams, cleanings, and preventive care for all ages.'],
  ['clean_hands', 'Teeth Cleaning', 'Professional plaque removal and oral hygiene maintenance.'],
  ['auto_fix_high', 'Teeth Whitening', 'Brighten your smile with advanced whitening systems.'],
  ['medical_services', 'Dental Implants', 'Permanent solutions for missing teeth with a natural look.'],
  ['merge', 'Root Canal', 'Expert endodontic treatment to save your natural teeth.'],
  ['straighten', 'Orthodontics', 'Braces and clear aligners for perfectly aligned smiles.'],
  ['sentiment_very_satisfied', 'Cosmetic Dentistry', 'Veneers and bonding to create the smile of your dreams.'],
  ['emergency', 'Emergency Care', 'Urgent care for toothaches, accidents, and dental injuries.'],
].map(([icon, title, description]) => ({ icon, title, description }))

const benefits = [
  ['medical_information', 'Experienced Dental Professionals', 'Our team brings decades of combined expertise across dental specialties.'],
  ['precision_manufacturing', 'Advanced Dental Technology', 'Digital imaging, scanners, and modern planning for precise treatment.'],
  ['spa', 'Comfortable Patient Experience', 'A calm environment and gentle care for patients with dental anxiety.'],
  ['payments', 'Affordable Care', 'Flexible payment options and clear treatment plans before care begins.'],
]

const testimonials = [
  ['SH', 'Sarah Henderson', 'Implants Patient', 'The team at Rumidental is exceptional. My new implants look and feel amazing.'],
  ['MJ', 'Marcus Johnson', 'Family Dentistry', 'Modern, clean, and professional. The staff was patient and friendly with my kids.'],
  ['DL', 'David Lee', 'Emergency Care', 'They fit me in the same afternoon for a cracked tooth. Fast and professional.'],
]

const posts = [
  ['Preventive Care', '5 Tips for Maintaining Healthy Gums', 'Learn daily habits that prevent gingivitis and keep your gums strong.', '/images/gum-care.jpg'],
  ['Technology', 'The Future of Invisible Aligners', 'How 3D scanning is changing the way we straighten teeth.', '/images/aligners.jpg'],
  ['Oral Hygiene', 'Oral Care Guide for Children', 'Expert advice for building healthy routines from the first tooth.', '/images/children-care.jpg'],
]

function Icon({ children, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{children}</span>
}

function App() {
  const [services, setServices] = useState(fallbackServices)
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    fetch('/api/services/')
      .then((response) => (response.ok ? response.json() : fallbackServices))
      .then((data) => setServices(data.length ? data : fallbackServices))
      .catch(() => setServices(fallbackServices))
  }, [])

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
      setStatus('Thanks. We will contact you shortly.')
    } catch {
      setStatus('Please call us directly while the API is unavailable.')
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      <header className="fixed top-0 z-50 w-full border-b border-surface-container bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a className="font-heading text-2xl font-bold text-primary" href="#home">Rumidental</a>
          <div className="hidden items-center gap-8 md:flex">
            {['Home', 'Services', 'About', 'Gallery', 'Blog'].map((item) => (
              <a className="text-sm font-semibold text-on-surface-variant transition hover:text-primary" href={`#${item.toLowerCase()}`} key={item}>
                {item}
              </a>
            ))}
          </div>
          <a className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-container" href="tel:+15551234567">
            Call Now
          </a>
        </nav>
      </header>

      <main className="pt-16">
        <section className="hero-photo relative min-h-[86vh] overflow-hidden" id="home">
          <img className="absolute inset-0 h-full w-full object-cover" src={heroImage} alt="Modern dental clinic treatment room" />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[86vh] max-w-7xl items-center px-5 py-20 md:px-10">
            <div className="reveal max-w-2xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-secondary">Clinical excellence with human warmth</p>
              <h1 className="font-heading text-4xl font-bold leading-tight text-primary md:text-6xl">
                Healthy Smiles Begin with Rumidental
              </h1>
              <p className="mt-6 text-lg leading-8 text-on-surface-variant">
                Professional dental care using modern technology in a comfortable and welcoming environment.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a className="rounded-lg bg-primary px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-primary-container" href="tel:+15551234567">Call Now</a>
                <a className="rounded-lg border-2 border-secondary px-7 py-4 font-semibold text-secondary transition hover:bg-secondary hover:text-white" href="#contact">Get Directions</a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16" id="services">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionTitle title="Our Services" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article className="reveal rounded-lg border border-transparent bg-surface-container-low p-7 transition hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl" key={service.title}>
                  <Icon className="mb-5 text-4xl text-primary">{service.icon}</Icon>
                  <h3 className="font-heading text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">Why Choose Rumidental</h2>
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

        <section className="bg-white py-16" id="about">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <img className="h-72 w-full rounded-lg object-cover shadow-md" src={equipmentImage} alt="Dental equipment" />
              <img className="mt-10 h-72 w-full rounded-lg object-cover shadow-md" src={receptionImage} alt="Dental clinic reception" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">Leading Dental Care with a Human Touch</h2>
              <p className="mt-5 text-lg leading-8 text-on-surface-variant">
                Rumidental combines advanced diagnostic tools with a compassionate approach. We do not just treat teeth; we care for people.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-8">
                <Stat value="15+" label="Years Experience" />
                <Stat value="10k+" label="Happy Smiles" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-low py-16" id="gallery">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionTitle title="Smile Gallery" subtitle="Real results from happy patients." />
            <div className="grid gap-6 md:grid-cols-3">
              <GalleryCard className="md:col-span-2" image="/images/smile-gallery.jpg" title="Full Smile Rejuvenation" />
              <div className="grid gap-6">
                <GalleryCard image="/images/whitening.jpg" title="Whitening Treatment" compact />
                <GalleryCard image="/images/equipment.jpg" title="Restorative Care" compact />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionTitle title="Patient Stories" subtitle="Trusted by thousands of happy patients." />
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

        <section className="bg-surface-container-low py-16" id="blog">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <SectionTitle title="Dental Health Tips & News" subtitle="Stay informed about your oral health." />
            <div className="grid gap-7 md:grid-cols-3">
              {posts.map(([category, title, text, image]) => (
                <article className="group" key={title}>
                  <img className="h-56 w-full rounded-lg object-cover transition group-hover:scale-[1.02]" src={image} alt="" />
                  <p className="mt-5 text-xs font-bold uppercase tracking-widest text-secondary">{category}</p>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-primary">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16" id="contact">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-heading text-3xl font-semibold text-primary">Contact Us</h2>
              <div className="mt-7 space-y-4">
                <ContactLine icon="phone" text="+1 (555) 123-4567" />
                <ContactLine icon="mail" text="care@rumidental.com" />
                <ContactLine icon="location_on" text="123 Health Ave, Suite 400, Clinic City" />
              </div>
              <div className="mt-8 border-t border-surface-container pt-5 text-sm">
                <p className="flex justify-between"><span>Monday - Friday</span><strong>08:00 AM - 07:00 PM</strong></p>
                <p className="mt-3 flex justify-between"><span>Saturday</span><strong>09:00 AM - 04:00 PM</strong></p>
                <p className="mt-3 flex justify-between"><span>Sunday</span><em>Emergency Only</em></p>
              </div>
            </div>
            <form className="rounded-lg border border-surface-container bg-surface-container-low p-6 lg:col-span-3" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-lg border border-surface-container bg-white px-4 py-3 outline-primary" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="rounded-lg border border-surface-container bg-white px-4 py-3 outline-primary" placeholder="Phone number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <textarea className="mt-4 min-h-36 w-full rounded-lg border border-surface-container bg-white px-4 py-3 outline-primary" placeholder="How can we help?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
              <button className="mt-4 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-container" type="submit">Send Request</button>
              {status && <p className="mt-3 text-sm text-on-surface-variant">{status}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-tertiary py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <div className="font-heading text-2xl font-bold">Rumidental</div>
            <p className="mt-2 text-sm text-white/70">Providing exceptional dental care with patient comfort.</p>
          </div>
          <p className="text-sm text-white/60">(c) 2026 Rumidental Clinic. Certified Dental Practice.</p>
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
