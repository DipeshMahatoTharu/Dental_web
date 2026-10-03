const DOCTORS = [
  {
    name: 'Dr. Robert Vance, DDS',
    title: 'Lead Dental Surgeon & Clinical Director',
    experience: '18+ Years Clinical Experience',
    specialty: 'Restorative Dentistry, Oral Surgery & Implantology',
    bio: 'Board-certified dental surgeon specialized in complex tooth restorations, dental implant placements, and surgical extractions with a focus on patient comfort.'
  },
  {
    name: 'Dr. Elena Rostova, DMD',
    title: 'Senior Endodontist & Diagnostics Specialist',
    experience: '14+ Years Clinical Experience',
    specialty: 'Microscopic Endodontics & Root Canal Therapy',
    bio: 'Specialist in microscopic root canal treatments, conservative tooth preservation, and comprehensive diagnostic review of digital 3D scans and dental radiographs.'
  },
  {
    name: 'Dr. Marcus Thorne, BDS, MSc',
    title: 'Orthodontic & Aesthetic Dental Consultant',
    experience: '12+ Years Clinical Experience',
    specialty: 'Clear Aligner Therapy & Dental Aesthetics',
    bio: 'Expert in adult and teen orthodontic alignment, clear aligner biomechanics, and conservative aesthetic smile planning.'
  }
]

const CLINICAL_VALUES = [
  {
    icon: 'verified',
    title: 'Evidence-Based Care',
    description: 'Every diagnosis and treatment recommendation is guided by proven clinical research and conservative dental preservation.'
  },
  {
    icon: 'sanitizer',
    title: 'Rigorous Sterilization',
    description: 'Our clinic follows hospital-grade infection control with Class-B vacuum autoclaves and single-use disposable barriers.'
  },
  {
    icon: 'receipt_long',
    title: 'Transparent Pricing',
    description: 'Patients receive an itemized, written cost estimate before any procedure begins, with no unexpected fees.'
  },
  {
    icon: 'lock',
    title: 'Patient Privacy',
    description: 'We safeguard all health records, radiographs, and personal contact details under strict medical confidentiality standards.'
  }
]

export function AboutPage({ onNavigate }) {
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
            <span className="text-secondary-container">About Practice</span>
          </nav>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
              Clinical Excellence & Patient Safety
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold md:text-5xl">
              About Rumidental Practice
            </h1>
            <p className="mt-4 text-base leading-7 text-white/80">
              Dedicated to clinical precision, modern diagnostic technology, and compassionate patient care for long-term oral health.
            </p>
          </div>
        </div>
      </section>

      {/* Practice Mission & History */}
      <section className="py-14 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-10 lg:grid-cols-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Our Foundation</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">
              Dedicated to Conservative, Patient-Centered Dental Care
            </h2>
            <div className="mt-2 h-0.5 w-16 bg-secondary" />
            <p className="mt-5 text-sm leading-7 text-on-surface-variant">
              Rumidental was established with a singular focus: to deliver hospital-grade clinical dental care in a welcoming, modern environment. We prioritize natural tooth preservation through conservative dentistry, preventive maintenance, and clear patient communication.
            </p>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant">
              Our clinical facility is equipped with modern low-radiation digital radiography, high-definition intraoral optical imaging, and sterile treatment suites designed to meet strict international standards.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-surface-container pt-6 text-xs text-on-surface-variant">
              <div>
                <strong className="block text-sm font-bold text-primary">Certified Practitioners</strong>
                <span>Licensed dental surgeons and specialist consultants.</span>
              </div>
              <div>
                <strong className="block text-sm font-bold text-primary">Sterile Standards</strong>
                <span>Hospital-grade Class-B autoclaving for all instruments.</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              className="h-72 w-full rounded-lg object-cover border border-surface-container" 
              src="/images/equipment.jpg" 
              alt="Sterile dental examination and diagnostic equipment" 
            />
            <img 
              className="mt-6 h-72 w-full rounded-lg object-cover border border-surface-container" 
              src="/images/dentist.jpg" 
              alt="Dental practitioner reviewing treatment plan with patient" 
            />
          </div>
        </div>
      </section>

      {/* Clinical Team */}
      <section className="py-14 bg-surface-container-low">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Our Clinicians</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">Licensed Clinical Specialists</h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-secondary" />
            <p className="mt-2 text-xs text-on-surface-variant">
              Meet our team of licensed dental surgeons and certified specialists.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {DOCTORS.map((doc) => (
              <div key={doc.name} className="rounded-xl border border-surface-container bg-white p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white mb-4">
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">person</span>
                  </div>
                  <h3 className="font-heading text-base font-bold text-primary">{doc.name}</h3>
                  <p className="text-xs font-semibold text-secondary mt-0.5">{doc.title}</p>
                  <p className="text-[11px] font-medium text-slate-500 mt-1">{doc.experience}</p>
                  <div className="my-3 border-t border-surface-container pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">Focus Area</span>
                    <p className="text-xs font-medium text-on-surface-variant">{doc.specialty}</p>
                  </div>
                  <p className="text-xs leading-relaxed text-on-surface-variant">{doc.bio}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="w-full rounded-lg bg-surface-container-low px-4 py-2 text-xs font-bold uppercase text-primary hover:bg-primary hover:text-white transition text-center cursor-pointer"
                  >
                    Consult With Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Values */}
      <section className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Core Principles</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mt-1">Our Practice Standards</h2>
            <div className="mx-auto mt-2 h-0.5 w-16 bg-secondary" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CLINICAL_VALUES.map((val) => (
              <div key={val.title} className="rounded-xl border border-surface-container bg-surface-container-low p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white mb-4">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">{val.icon}</span>
                </div>
                <h3 className="font-heading text-sm font-bold text-primary">{val.title}</h3>
                <p className="mt-2 text-xs leading-5 text-on-surface-variant">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center md:px-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Ready to Schedule Your Clinical Visit?
          </h2>
          <p className="mt-3 text-sm text-white/80 max-w-xl mx-auto">
            Contact our clinic reception to schedule a comprehensive examination or request an online consultation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="rounded-lg bg-white px-6 py-2.5 text-xs font-bold uppercase text-primary hover:bg-surface-container-low transition cursor-pointer"
            >
              Contact Reception
            </button>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="rounded-lg border border-white/40 px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-white/10 transition cursor-pointer"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
