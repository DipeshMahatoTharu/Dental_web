export function PrivacyPolicyPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Header Banner */}
      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <nav className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Home
            </button>
            <span>/</span>
            <span className="text-secondary-container">Privacy Policy</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-white/80">
            Effective Date: October 1, 2026. Last Updated: October 3, 2026.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-5 md:px-10">
          <div className="rounded-xl border border-surface-container bg-white p-8 md:p-12 shadow-sm space-y-8 text-sm leading-relaxed text-on-surface-variant">
            
            <div>
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                1. Overview and Commitment to Patient Confidentiality
              </h2>
              <p>
                Rumidental Dental Practice operates with strict adherence to patient confidentiality and healthcare data protection laws. This Privacy Policy outlines our standards regarding the collection, storage, handling, and safeguarding of your personal contact information and health details when you use our website or schedule appointments.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                We only collect information necessary to provide clinical dental care, coordinate appointments, and communicate treatment plans. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Contact Information:</strong> Full name, telephone/WhatsApp number, email address, and preferred consultation schedule.
                </li>
                <li>
                  <strong>Clinical Notes and History:</strong> Information you voluntarily share during consultation requests, such as descriptions of symptoms, dental discomfort history, previous treatments, or dental scans.
                </li>
                <li>
                  <strong>Technical Data:</strong> Basic browser metadata, IP address, and standard session logs used solely for secure website operation.
                </li>
              </ul>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                3. Purpose of Data Processing
              </h2>
              <p className="mb-3">
                Your data is processed strictly for clinical and operational purposes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Scheduling, confirming, and coordinating your clinical or virtual dental consultations.</li>
                <li>Providing clinical treatment recommendations, diagnostic summaries, and legitimate electronic prescriptions.</li>
                <li>Direct communication regarding appointment reminders, triage preparation, or post-treatment follow-up.</li>
                <li>Maintaining compliance with statutory medical record-keeping requirements.</li>
              </ul>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                4. Data Security & Storage Standards
              </h2>
              <p>
                All data submitted through our forms is transmitted via secure HTTPS encryption (TLS 1.3). We enforce strict administrative, technical, and physical access controls to prevent unauthorized access, loss, or disclosure. We never sell, lease, or monetize patient personal or medical information to third-party advertisers.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                5. Third-Party Service Providers
              </h2>
              <p>
                We only share necessary contact or appointment data with reputable, HIPAA/GDPR-compliant infrastructure providers (such as secure cloud hosting and secure email services) strictly bound by confidentiality agreements.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                6. Your Rights Regarding Your Data
              </h2>
              <p className="mb-3">
                As a patient, you hold specific rights regarding your personal and medical information:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The right to request a copy of your stored contact and appointment records.</li>
                <li>The right to correct inaccurate or outdated personal details.</li>
                <li>The right to request the deletion of non-statutory personal data, subject to mandatory medical record retention laws.</li>
              </ul>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                7. Contact Information for Privacy Matters
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or your personal health information, please contact our clinic privacy team:
              </p>
              <div className="mt-4 rounded-lg bg-surface-container-low p-4 border border-surface-container space-y-1">
                <p><strong>Rumidental Dental Practice</strong></p>
                <p>Email: privacy@rumidental.com</p>
                <p>Direct Helpline: +1 (555) 123-4567</p>
                <p>Hours: Monday to Saturday, 08:00 AM to 06:00 PM</p>
              </div>
            </div>

            <div className="border-t border-surface-container pt-6 flex justify-between items-center">
              <button
                onClick={() => onNavigate('home')}
                className="rounded-lg bg-primary px-6 py-2.5 text-xs font-bold uppercase text-white hover:bg-primary-container transition cursor-pointer"
              >
                Return to Home
              </button>
              <button
                onClick={() => onNavigate('terms')}
                className="rounded-lg border border-surface-container px-6 py-2.5 text-xs font-semibold text-primary hover:bg-surface-container-low transition cursor-pointer"
              >
                View Terms & Conditions
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
