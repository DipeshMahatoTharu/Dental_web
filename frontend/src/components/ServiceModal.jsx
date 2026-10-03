import { useEffect } from 'react'

export function ServiceModal({ service, onClose, onBook }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!service) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-surface-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-surface-container bg-white/95 backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-11 h-11 text-white rounded-xl bg-primary shadow-sm">
              <span className="material-symbols-outlined text-2xl">{service.icon}</span>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                  {service.category || 'Online Consultation'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online Only
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary">{service.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 text-gray-400 hover:text-gray-700 rounded-full hover:bg-surface-container transition"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Service Overview</h4>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              {service.fullDescription || service.description || service.shortDescription}
            </p>
          </div>

          {/* Consultation Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-surface-container-low border border-surface-container">
            <div>
              <span className="text-[11px] font-semibold text-gray-500 block">Session Format</span>
              <span className="font-medium text-xs text-on-background flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-primary text-sm">videocam</span>
                {service.duration || 'Live Video Session'}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-500 block">Supported Channels</span>
              <span className="font-medium text-xs text-on-background flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-secondary text-sm">devices</span>
                {service.platform ? service.platform.split('&')[0] : 'Zoom / Meet / WhatsApp'}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-gray-500 block">Consultation Fee</span>
              <span className="font-bold text-xs text-secondary flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-sm">payments</span>
                {service.priceEstimate || 'Consultation Rate'}
              </span>
            </div>
          </div>

          {/* Highlights */}
          {service.highlights && service.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">Key Consultation Features</h4>
              <ul className="grid sm:grid-cols-2 gap-2.5">
                {service.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-base shrink-0">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Step-by-Step Consultation Flow */}
          {service.consultationSteps && service.consultationSteps.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-3">How Your Online Session Works</h4>
              <ol className="space-y-2.5">
                {service.consultationSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-on-surface-variant bg-surface-container-low/50 p-2.5 rounded-lg border border-surface-container">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Who is this ideal for */}
          {service.idealFor && (
            <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">person_pin</span>
                Recommended For
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {service.idealFor}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-surface-container bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-surface-container rounded-lg transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose()
              onBook(service)
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase text-white bg-primary hover:bg-primary-container rounded-lg shadow-md transition cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">video_call</span>
            Book Online Consultation
          </button>
        </div>
      </div>
    </div>
  )
}
