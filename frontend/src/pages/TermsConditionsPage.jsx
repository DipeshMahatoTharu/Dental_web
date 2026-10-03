export function TermsConditionsPage({ onNavigate }) {
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
            <span className="text-secondary-container">Terms & Conditions</span>
          </nav>
          <h1 className="font-heading text-3xl font-bold md:text-4xl">
            Terms & Conditions of Service
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
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website, requesting an appointment, or using our consultation services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using this website and our online booking tools.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                2. Scope of Services & Clinical Assessment
              </h2>
              <p className="mb-3">
                Rumidental provides professional dental healthcare, preventive education, clinical consultations, and triage assessments.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Consultations & Triage:</strong> Remote or preliminary consultations are designed to evaluate symptoms, provide second opinions on existing diagnostics, and offer conservative care guidance.
                </li>
                <li>
                  <strong>In-Person Care Requirement:</strong> Where physical interventions (such as dental restorations, extractions, deep scaling, or surgical procedures) are clinically indicated, patients will be advised to receive direct in-clinic treatment.
                </li>
              </ul>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                3. Medical & Emergency Disclaimer
              </h2>
              <p className="rounded-lg bg-amber-50 p-4 border border-amber-200 text-amber-900 font-medium">
                IMPORTANT: This website and its virtual consultation features do not replace immediate emergency medical intervention. If you are experiencing severe uncontrolled bleeding, breathing difficulties due to facial swelling, or major acute physical trauma, you must call emergency medical services or proceed immediately to the nearest hospital emergency department.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                4. Patient Responsibilities
              </h2>
              <p className="mb-3">
                To ensure safe and accurate clinical assessments, patients agree to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Provide accurate, truthful, and complete details regarding medical history, existing prescriptions, and current allergies.</li>
                <li>Ensure a quiet, well-lit environment with a stable network connection when attending video triage sessions.</li>
                <li>Follow professional medical guidance and seek timely in-person evaluation when advised by our dental practitioners.</li>
              </ul>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                5. Appointment Scheduling, Cancellations, and Rescheduling
              </h2>
              <p>
                Appointments scheduled through our platform are reserved exclusively for the designated patient. If you need to reschedule or cancel a session, we request at least 12 hours advance notification to enable our practitioners to reallocate clinical availability to other patients.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                6. Electronic Prescriptions and Pharmacy Policy
              </h2>
              <p>
                Prescriptions are issued solely at the clinical discretion of the evaluating licensed dentist when medically warranted. Medications are sent directly to licensed pharmacies according to applicable pharmaceutical regulations.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                Rumidental and its clinical practitioners shall not be liable for complications arising from undisclosed medical conditions, failure to follow prescribed treatment advice, or delays in seeking urgent emergency intervention when directed.
              </p>
            </div>

            <div className="border-t border-surface-container pt-6">
              <h2 className="font-heading text-xl font-bold text-primary mb-3">
                8. Contact for Terms & Administrative Inquiries
              </h2>
              <p>
                For questions regarding these Terms and Conditions or practice policies, please contact our administration:
              </p>
              <div className="mt-4 rounded-lg bg-surface-container-low p-4 border border-surface-container space-y-1">
                <p><strong>Rumidental Clinical Administration</strong></p>
                <p>Email: terms@rumidental.com</p>
                <p>Telephone: +1 (555) 123-4567</p>
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
                onClick={() => onNavigate('privacy')}
                className="rounded-lg border border-surface-container px-6 py-2.5 text-xs font-semibold text-primary hover:bg-surface-container-low transition cursor-pointer"
              >
                View Privacy Policy
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
