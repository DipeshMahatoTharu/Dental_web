import { useState } from 'react'

export function ContactPage({ onNavigate }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    serviceInterest: 'General Dental Examination',
    preferredTime: 'Morning (08:00 AM - 12:00 PM)',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('Submitting your contact request...')
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          message: `[Service: ${form.serviceInterest}] [Time: ${form.preferredTime}] ${form.message.trim()}`
        })
      })
      if (!response.ok) throw new Error('Request failed')
      setForm({
        name: '',
        phone: '',
        email: '',
        serviceInterest: 'General Dental Examination',
        preferredTime: 'Morning (08:00 AM - 12:00 PM)',
        message: ''
      })
      setStatus('Your message has been received. Our clinic reception team will contact you shortly.')
    } catch {
      setStatus('Please call our clinic reception directly at +1 (555) 123-4567.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <span className="text-secondary-container">Contact & Location</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              Reception Desk & Patient Services
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              Contact & Appointment Scheduling
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80">
              Connect with our clinical desk for appointments, diagnostic inquiries, and treatment scheduling.
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-10 lg:grid-cols-12">
            
            {/* Left Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Get in Touch</span>
                <h2 className="font-heading text-2xl font-bold text-primary mt-1">
                  Clinic Information & Hours
                </h2>
                <div className="mt-2 h-0.5 w-16 bg-secondary" />
              </div>

              {/* Direct Details */}
              <div className="rounded-xl border border-surface-container bg-surface-container-low p-6 space-y-4 text-xs text-on-surface-variant">
                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">phone</span>
                  </span>
                  <div>
                    <strong className="block text-primary text-sm">Direct Telephone</strong>
                    <a href="tel:+15551234567" className="hover:text-primary transition font-medium">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">mail</span>
                  </span>
                  <div>
                    <strong className="block text-primary text-sm">Email Inquiries</strong>
                    <a href="mailto:appointments@rumidental.com" className="hover:text-primary transition font-medium">
                      appointments@rumidental.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shrink-0">
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">location_on</span>
                  </span>
                  <div>
                    <strong className="block text-primary text-sm">Practice Location</strong>
                    <p className="font-medium leading-relaxed">
                      Rumidental Dental Practice<br />
                      450 Healthcare Boulevard, Suite 300<br />
                      Central Medical District
                    </p>
                  </div>
                </div>
              </div>

              {/* Clinical Hours Table */}
              <div className="rounded-xl border border-surface-container bg-white p-6 shadow-xs">
                <h3 className="font-heading text-sm font-bold text-primary mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-base" aria-hidden="true">schedule</span>
                  Practice Operating Hours
                </h3>
                <div className="space-y-2 text-xs text-on-surface-variant">
                  <div className="flex justify-between py-1 border-b border-surface-container">
                    <span>Monday to Friday</span>
                    <strong className="text-primary">08:00 AM to 06:00 PM</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-surface-container">
                    <span>Saturday</span>
                    <strong className="text-primary">09:00 AM to 04:00 PM</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Sunday & Public Holidays</span>
                    <em className="text-slate-500">Closed (Emergency Triage On-Call)</em>
                  </div>
                </div>
              </div>

              {/* Emergency Guidance */}
              <div className="rounded-xl bg-amber-50 p-5 border border-amber-200 text-xs text-amber-900 space-y-1.5">
                <strong className="block text-sm font-bold text-amber-950 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base" aria-hidden="true">emergency</span>
                  Acute Dental Emergencies
                </strong>
                <p className="leading-relaxed">
                  For severe acute toothaches, fractured teeth, or facial swelling, please call our emergency triage line immediately for priority care guidance.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-surface-container bg-white p-8 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-primary mb-2">
                  Send an Inquiry or Appointment Request
                </h3>
                <p className="text-xs text-on-surface-variant mb-6">
                  Fill out the form below and our clinic reception will contact you to confirm scheduling.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="contact-form-name" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        required
                        placeholder="Your Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-form-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        id="contact-form-phone"
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label htmlFor="contact-form-email" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-form-service" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Reason for Visit *
                      </label>
                      <select
                        id="contact-form-service"
                        value={form.serviceInterest}
                        onChange={(e) => setForm({ ...form, serviceInterest: e.target.value })}
                        className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-xs outline-primary focus:bg-white"
                      >
                        <option value="General Dental Examination">General Dental Examination</option>
                        <option value="Teeth Cleaning & Hygiene">Teeth Cleaning & Hygiene</option>
                        <option value="Tooth Pain / Emergency Triage">Tooth Pain / Emergency Triage</option>
                        <option value="Root Canal / Endodontics">Root Canal / Endodontics</option>
                        <option value="Dental Implants & Surgery">Dental Implants & Surgery</option>
                        <option value="Orthodontics & Clear Aligners">Orthodontics & Clear Aligners</option>
                        <option value="Cosmetic Consultation">Cosmetic Consultation</option>
                        <option value="Pediatric Dental Visit">Pediatric Dental Visit</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="contact-form-time" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Preferred Time
                      </label>
                      <select
                        id="contact-form-time"
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-xs outline-primary focus:bg-white"
                      >
                        <option value="Morning (08:00 AM - 12:00 PM)">Morning (08:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                        <option value="Late Afternoon (03:00 PM - 06:00 PM)">Late Afternoon (03:00 PM - 06:00 PM)</option>
                        <option value="Saturday Morning">Saturday Morning</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-form-message" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                      Symptoms, Questions, or Additional Details *
                    </label>
                    <textarea
                      id="contact-form-message"
                      required
                      rows={4}
                      placeholder="Please describe your dental symptoms, previous treatments, or preferred doctor..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-lg border border-surface-container bg-surface-container-low px-4 py-2.5 text-sm outline-primary focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-primary py-3 font-semibold text-white transition hover:bg-primary-container cursor-pointer text-sm disabled:opacity-60"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Contact Request'}
                  </button>

                  {status && (
                    <p className="mt-3 text-center text-xs font-medium text-primary">
                      {status}
                    </p>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
