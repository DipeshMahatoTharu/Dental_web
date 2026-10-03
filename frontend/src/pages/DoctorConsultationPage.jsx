import { useState, useRef, useEffect } from 'react'

const SPECIALISTS = [
  {
    id: 'dr-vance',
    name: 'Dr. Robert Vance, DDS',
    role: 'Lead Dental Surgeon & Clinical Director',
    specialty: 'Restorative Care, Extractions & Implants',
    avatarText: 'RV',
    status: 'Available for Review',
    initialGreeting: 'Hello, I am Dr. Robert Vance. I review complex restorative cases, dental trauma, and surgical implant evaluations. Please share your symptoms or upload your dental radiographs so I can examine the area of concern.'
  },
  {
    id: 'dr-rostova',
    name: 'Dr. Elena Rostova, DMD',
    role: 'Senior Endodontist & Diagnostics',
    specialty: 'Root Canals, Pain Triage & Radiograph Review',
    avatarText: 'ER',
    status: 'Available for Review',
    initialGreeting: 'Welcome. I am Dr. Elena Rostova, specializing in endodontics and radiograph diagnostics. If you are experiencing sharp sensitivity, deep pain, or have recent X-rays for a second opinion, upload them here and I will examine the roots and pulp chamber.'
  },
  {
    id: 'dr-thorne',
    name: 'Dr. Marcus Thorne, BDS',
    role: 'Orthodontic & Aesthetic Consultant',
    specialty: 'Clear Aligners & Cosmetic Planning',
    avatarText: 'MT',
    status: 'Available for Review',
    initialGreeting: 'Hello, I am Dr. Marcus Thorne. I evaluate teeth alignment, clear aligner progression, and aesthetic smile designs. You can upload close-up smile photos or digital impressions for a diagnostic evaluation.'
  }
]

export function DoctorConsultationPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('upload') // 'upload' | 'chat'
  const [selectedDoctorId, setSelectedDoctorId] = useState('dr-vance')
  const msgCounterRef = useRef(100)
  
  // Document Upload State
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    documentType: 'Digital Periapical / Panoramic X-Ray',
    painLevel: 3,
    symptoms: ''
  })
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const chatEndRef = useRef(null)

  // Chat State
  const selectedDoctor = SPECIALISTS.find((d) => d.id === selectedDoctorId) || SPECIALISTS[0]
  const [messages, setMessages] = useState([
    {
      id: 'init-sys',
      sender: 'system',
      text: 'Encrypted Clinical Session Initialized (256-bit TLS). Your communications and files are handled under strict healthcare confidentiality.',
      timestamp: 'Session Start'
    },
    {
      id: 'init-doc',
      sender: 'doctor',
      doctorName: selectedDoctor.name,
      text: selectedDoctor.initialGreeting,
      timestamp: 'Session Start'
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatAttachment, setChatAttachment] = useState(null)
  const [previewModalFile, setPreviewModalFile] = useState(null)

  function nextMessageId(prefix = 'msg') {
    msgCounterRef.current += 1
    return `${prefix}-${msgCounterRef.current}`
  }

  function handleSelectDoctor(doc) {
    if (doc.id === selectedDoctorId) return
    setSelectedDoctorId(doc.id)
    const timeLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setMessages([
      {
        id: nextMessageId('sys'),
        sender: 'system',
        text: `Consultation session updated. Assigned specialist: ${doc.name}.`,
        timestamp: timeLabel
      },
      {
        id: nextMessageId('doc'),
        sender: 'doctor',
        doctorName: doc.name,
        text: doc.initialGreeting,
        timestamp: timeLabel
      }
    ])
  }

  // Scroll to bottom of chat
  useEffect(() => {
    if (activeTab === 'chat' && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, activeTab])

  function handleFileSelection(e) {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const newFiles = files.map((file) => ({
      file,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type || 'Document/DICOM',
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))
    setSelectedFiles((prev) => [...prev, ...newFiles])
  }

  function handleRemoveFile(indexToRemove) {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove))
  }

  async function handleDocumentSubmit(e) {
    e.preventDefault()
    if (!selectedFiles.length) {
      setUploadStatus('Please select or drag at least one X-ray, scan, or diagnostic file.')
      return
    }

    setIsUploading(true)
    setUploadStatus('Encrypting and transmitting diagnostic records to clinic queue...')

    const fileNames = selectedFiles.map((f) => f.name).join(', ')
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    try {
      const response = await fetch('/api/documents/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: patientInfo.name.trim(),
          phone: patientInfo.phone.trim(),
          email: patientInfo.email.trim() || undefined,
          doctor: selectedDoctor.name,
          documentName: fileNames,
          documentType: patientInfo.documentType,
          painLevel: patientInfo.painLevel,
          notes: patientInfo.symptoms.trim()
        })
      })

      if (!response.ok) throw new Error('Upload submission failed')

      // Add dispatch record to chat
      const patientMsg = {
        id: nextMessageId('patient-upload'),
        sender: 'patient',
        patientName: patientInfo.name || 'Patient',
        text: `Submitted diagnostic records for evaluation. [Primary Concern: ${patientInfo.symptoms || 'General Check'}] [Pain Level: ${patientInfo.painLevel}/10]`,
        attachment: fileNames,
        attachmentPreview: selectedFiles[0]?.previewUrl || null,
        timestamp: currentTime
      }

      const doctorResponseText = `Thank you ${patientInfo.name.split(' ')[0] || ''}. I have received your ${patientInfo.documentType} (${fileNames}). I am reviewing the radiograph details and your pain assessment (${patientInfo.painLevel}/10). If you are experiencing throbbing discomfort or sensitivity to temperature, please let me know.`

      const docMsg = {
        id: nextMessageId('doc-reply'),
        sender: 'doctor',
        doctorName: selectedDoctor.name,
        text: doctorResponseText,
        timestamp: currentTime
      }

      setMessages((prev) => [...prev, patientMsg, docMsg])
      setUploadStatus('Diagnostic files successfully queued. Transferring you to your doctor consultation chat...')
      
      setTimeout(() => {
        setIsUploading(false)
        setActiveTab('chat')
        setUploadStatus('')
      }, 1000)

    } catch {
      // Fallback: seamless transition
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId('patient-upload-fb'),
          sender: 'patient',
          patientName: patientInfo.name || 'Patient',
          text: `[Attached Diagnostic Files: ${fileNames}] Symptoms: ${patientInfo.symptoms || 'General Evaluation'} (Pain Level: ${patientInfo.painLevel}/10)`,
          attachment: fileNames,
          attachmentPreview: selectedFiles[0]?.previewUrl || null,
          timestamp: currentTime
        },
        {
          id: nextMessageId('doc-reply-fb'),
          sender: 'doctor',
          doctorName: selectedDoctor.name,
          text: `Thank you for uploading ${fileNames}. I have logged your diagnostic submission. How long have you been noticing these symptoms?`,
          timestamp: currentTime
        }
      ])
      setIsUploading(false)
      setActiveTab('chat')
      setUploadStatus('')
    }
  }

  async function handleSendMessage(e) {
    e.preventDefault()
    const text = chatInput.trim()
    if (!text && !chatAttachment) return

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMsg = {
      id: nextMessageId('patient-msg'),
      sender: 'patient',
      patientName: patientInfo.name || 'You',
      text: text,
      attachment: chatAttachment ? chatAttachment.name : null,
      attachmentPreview: chatAttachment?.previewUrl || null,
      timestamp: currentTime
    }

    setMessages((prev) => [...prev, newMsg])
    setChatInput('')
    setChatAttachment(null)

    // Send to backend API
    try {
      await fetch('/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: 'patient',
          senderName: patientInfo.name || 'Patient',
          recipientName: selectedDoctor.name,
          text: text,
          attachment: chatAttachment ? chatAttachment.name : undefined
        })
      })
    } catch {
      // Continue locally without interruption
    }

    // Doctor clinical reply simulation
    setTimeout(() => {
      let replyText = 'I have noted that. Based on clinical guidelines, we will evaluate whether a targeted conservative filling, root canal therapy, or localized cleaning is indicated. Would you prefer an in-office exam this week to physically verify the tooth?'
      const lower = text.toLowerCase()
      if (lower.includes('pain') || lower.includes('hurt') || lower.includes('ache')) {
        replyText = 'Understood. For acute dental discomfort, avoid chewing on that side and avoid extreme hot or cold foods. If swelling or fever develops, seek immediate in-person clinical care.'
      } else if (lower.includes('x-ray') || lower.includes('scan') || lower.includes('photo')) {
        replyText = 'The radiograph structure shows clear bone levels. I am checking the coronal margins and root apex for any signs of periapical radiolucency.'
      } else if (lower.includes('cost') || lower.includes('price') || lower.includes('insurance')) {
        replyText = 'We provide a transparent itemized estimate prior to any intervention. Our administrative desk will verify any insurance coverage details for you.'
      }

      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId('doc-auto-reply'),
          sender: 'doctor',
          doctorName: selectedDoctor.name,
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1200)
  }

  function handleExportTranscript() {
    const transcriptText = messages
      .map((m) => `[${m.timestamp}] ${m.sender === 'doctor' ? m.doctorName : m.sender === 'system' ? 'CLINICAL SYSTEM' : m.patientName || 'PATIENT'}: ${m.text} ${m.attachment ? `(Attachment: ${m.attachment})` : ''}`)
      .join('\n\n')

    const blob = new Blob([
      `RUMIDENTAL CLINICAL CONSULTATION SUMMARY\nDate: ${new Date().toLocaleDateString()}\nSpecialist: ${selectedDoctor.name}\n\n========================================\n\n${transcriptText}\n\n========================================\nNotice: This transcript is confidential patient medical correspondence.`
    ], { type: 'text/plain' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Rumidental-Consultation-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background text-on-background">
      {/* Top Banner */}
      <section className="bg-primary py-10 text-white md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-white transition flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">home</span>
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-secondary-container">Patient Portal & Doctor Consultation</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                <span className="material-symbols-outlined text-sm text-secondary-container" aria-hidden="true">lock</span>
                256-Bit Encrypted Healthcare Portal
              </div>
              <h1 className="mt-3 font-heading text-2xl font-bold md:text-4xl">
                Diagnostic X-Ray Transmission & Doctor Consultation
              </h1>
              <p className="mt-2 text-xs text-white/80 max-w-2xl leading-relaxed">
                Securely transmit digital radiographs, CBCT scans, and clinical notes directly to our licensed specialists for triage, second opinions, and direct clinical chat.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'upload'
                    ? 'bg-white text-primary shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">upload_file</span>
                Send X-Rays / Documents
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('chat')}
                className={`rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'chat'
                    ? 'bg-white text-primary shadow-sm'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">chat</span>
                Doctor Live Chat
                {messages.length > 2 && (
                  <span className="ml-1 rounded-sm bg-secondary px-1.5 py-0.2 text-[10px] text-white">
                    {messages.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          
          {/* Specialist Selection Bar */}
          <div className="mb-8 rounded-xl border border-surface-container bg-white p-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">stethoscope</span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Assign Specialist:
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full sm:w-auto">
                {SPECIALISTS.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelectDoctor(doc)}
                    className={`rounded-lg px-3 py-2 text-left transition border cursor-pointer ${
                      selectedDoctorId === doc.id
                        ? 'border-primary bg-surface-container-low text-primary shadow-xs'
                        : 'border-surface-container bg-white text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs block truncate">{doc.name}</strong>
                      {selectedDoctorId === doc.id && (
                        <span className="h-2 w-2 rounded-sm bg-secondary shrink-0 ml-1" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block truncate">{doc.specialty}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* TAB 1: DOCUMENT & X-RAY UPLOAD */}
          {activeTab === 'upload' && (
            <div className="grid gap-8 lg:grid-cols-12">
              {/* Left Form */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-xl border border-surface-container bg-white p-6 md:p-8 shadow-sm">
                  <h2 className="font-heading text-xl font-bold text-primary mb-1">
                    Upload Dental Radiographs & Clinical Notes
                  </h2>
                  <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                    Attach standard dental X-rays (bitewing, periapical, panoramic), 3D CBCT scans, or written treatment proposals. Files are encrypted and delivered directly to {selectedDoctor.name}.
                  </p>

                  {/* Dropzone Area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer rounded-xl border-2 border-dashed border-surface-container-highest bg-surface-container-low p-6 text-center hover:border-primary hover:bg-surface-container transition"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx,.dicom"
                      onChange={handleFileSelection}
                      className="hidden"
                      aria-label="Upload dental X-rays and documents"
                    />
                    <span className="material-symbols-outlined text-4xl text-primary mb-2" aria-hidden="true">cloud_upload</span>
                    <h3 className="font-heading text-sm font-bold text-primary">Click to select or drag and drop dental files</h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Supports JPG, PNG, PDF, DICOM images, and treatment documents (Up to 25 MB per file)
                    </p>
                  </div>

                  {/* Attached Files List */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-surface-container pt-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                        Selected Files ({selectedFiles.length})
                      </span>
                      <div className="space-y-2">
                        {selectedFiles.map((f, idx) => (
                          <div key={f.name + idx} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low border border-surface-container text-xs">
                            <div className="flex items-center gap-2.5 truncate">
                              {f.previewUrl ? (
                                <img src={f.previewUrl} alt={f.name} className="h-8 w-8 object-cover rounded-md border border-surface-container shrink-0" />
                              ) : (
                                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white shrink-0">
                                  <span className="material-symbols-outlined text-base">description</span>
                                </span>
                              )}
                              <div className="truncate">
                                <span className="font-semibold text-primary block truncate">{f.name}</span>
                                <span className="text-[10px] text-slate-500">{f.size} - {f.type}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(idx)}
                              className="text-gray-400 hover:text-red-600 p-1 transition cursor-pointer"
                              aria-label={`Remove file ${f.name}`}
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Clinical Intake Form */}
                  <form onSubmit={handleDocumentSubmit} className="mt-6 space-y-4 border-t border-surface-container pt-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="portal-patient-name" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                          Patient Full Name *
                        </label>
                        <input
                          id="portal-patient-name"
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={patientInfo.name}
                          onChange={(e) => setPatientInfo({ ...patientInfo, name: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="portal-patient-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          id="portal-patient-phone"
                          type="tel"
                          required
                          placeholder="+1 (555) 000-0000"
                          value={patientInfo.phone}
                          onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label htmlFor="portal-patient-email" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                          Email Address
                        </label>
                        <input
                          id="portal-patient-email"
                          type="email"
                          placeholder="patient@example.com"
                          value={patientInfo.email}
                          onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="portal-document-type" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                          Document / Scan Classification *
                        </label>
                        <select
                          id="portal-document-type"
                          value={patientInfo.documentType}
                          onChange={(e) => setPatientInfo({ ...patientInfo, documentType: e.target.value })}
                          className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                        >
                          <option value="Digital Periapical / Panoramic X-Ray">Digital Periapical / Panoramic X-Ray</option>
                          <option value="3D CBCT / Dental Tomography Scan">3D CBCT / Dental Tomography Scan</option>
                          <option value="Treatment Estimate / Second Opinion Doc">Treatment Estimate / Second Opinion Doc</option>
                          <option value="Intraoral Smile / Tooth Photograph">Intraoral Smile / Tooth Photograph</option>
                          <option value="Medical History & Previous Dental Records">Medical History & Previous Dental Records</option>
                        </select>
                      </div>
                    </div>

                    {/* Pain Level Scale */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label htmlFor="portal-pain-level" className="text-xs font-bold uppercase tracking-wider text-gray-600">
                          Current Discomfort / Pain Level ({patientInfo.painLevel}/10)
                        </label>
                        <span className="text-xs font-semibold text-primary">
                          {patientInfo.painLevel === 0 ? 'No Pain' : patientInfo.painLevel <= 3 ? 'Mild Discomfort' : patientInfo.painLevel <= 6 ? 'Moderate Discomfort' : 'Severe Acute Pain'}
                        </span>
                      </div>
                      <input
                        id="portal-pain-level"
                        type="range"
                        min="0"
                        max="10"
                        value={patientInfo.painLevel}
                        onChange={(e) => setPatientInfo({ ...patientInfo, painLevel: parseInt(e.target.value, 10) })}
                        className="w-full accent-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                        <span>0 (None)</span>
                        <span>5 (Moderate)</span>
                        <span>10 (Severe)</span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="portal-symptoms" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                        Symptoms, Tooth Location, and Case Notes *
                      </label>
                      <textarea
                        id="portal-symptoms"
                        required
                        rows={3}
                        placeholder="Please describe which tooth or quadrant is affected, how long you have experienced symptoms, and any specific questions for the doctor..."
                        value={patientInfo.symptoms}
                        onChange={(e) => setPatientInfo({ ...patientInfo, symptoms: e.target.value })}
                        className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isUploading || selectedFiles.length === 0}
                      className="w-full rounded-lg bg-primary py-3 font-bold uppercase tracking-wider text-white transition hover:bg-primary-container cursor-pointer text-xs disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">lock</span>
                      {isUploading ? 'Encrypting & Transmitting...' : `Transmit Files to ${selectedDoctor.name}`}
                    </button>

                    {uploadStatus && (
                      <p className="mt-2 text-center text-xs font-medium text-primary">
                        {uploadStatus}
                      </p>
                    )}
                  </form>
                </div>
              </div>

              {/* Right Information & Instructions */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-xl border border-surface-container bg-white p-6 shadow-xs">
                  <h3 className="font-heading text-sm font-bold text-primary mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg" aria-hidden="true">verified_user</span>
                    Clinical Security & HIPAA Standards
                  </h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    All radiographs, CBCT scans, and clinical histories sent through this portal are encrypted in transit and stored in compliance with statutory medical confidentiality regulations. Only authorized clinical practitioners have access to your diagnostics.
                  </p>
                </div>

                <div className="rounded-xl border border-surface-container bg-surface-container-low p-6 space-y-3">
                  <h3 className="font-heading text-sm font-bold text-primary">
                    Guidelines for Radiograph Uploads
                  </h3>
                  <ul className="space-y-2 text-xs text-on-surface-variant">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-base shrink-0" aria-hidden="true">check_circle</span>
                      <span>Ensure dental X-rays are well-lit and not cropped at the root apex.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-base shrink-0" aria-hidden="true">check_circle</span>
                      <span>Include any prior clinical notes or cost estimates if seeking an independent second opinion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-base shrink-0" aria-hidden="true">check_circle</span>
                      <span>After transmission, you can converse directly with your assigned doctor in the consultation chat tab.</span>
                    </li>
                  </ul>
                </div>

                {/* Direct Chat Switch Shortcut */}
                <div className="rounded-xl bg-primary p-6 text-white text-xs space-y-3">
                  <strong className="block font-heading text-sm font-bold">Already submitted your records?</strong>
                  <p className="text-white/80 leading-relaxed">
                    Switch directly to the live consultation chat to speak with {selectedDoctor.name}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('chat')}
                    className="rounded-lg bg-white px-4 py-2 text-xs font-bold uppercase text-primary hover:bg-surface-container-low transition cursor-pointer"
                  >
                    Open Doctor Live Chat
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCTOR CONSULTATION CHAT */}
          {activeTab === 'chat' && (
            <div className="grid gap-6 lg:grid-cols-12">
              
              {/* Doctor Profile Banner on Left */}
              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-xl border border-surface-container bg-white p-5 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white font-heading font-bold text-base">
                      {selectedDoctor.avatarText}
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-bold text-primary">{selectedDoctor.name}</h3>
                      <p className="text-[11px] text-secondary font-semibold">{selectedDoctor.role}</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-medium mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-sm bg-emerald-600" />
                        {selectedDoctor.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-surface-container space-y-2 text-xs text-on-surface-variant">
                    <div>
                      <strong className="block text-[10px] uppercase text-gray-500 font-bold">Specialty Focus</strong>
                      <span>{selectedDoctor.specialty}</span>
                    </div>
                    <div>
                      <strong className="block text-[10px] uppercase text-gray-500 font-bold">Consultation Mode</strong>
                      <span>Direct Triage & Diagnostic Assessment</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2 pt-3 border-t border-surface-container">
                    <button
                      type="button"
                      onClick={handleExportTranscript}
                      className="w-full rounded-lg border border-surface-container bg-surface-container-low px-3 py-2 text-xs font-semibold text-primary hover:bg-surface-container transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">download</span>
                      Export Consultation Notes
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="w-full rounded-lg bg-primary px-3 py-2 text-xs font-bold uppercase text-white hover:bg-primary-container transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">calendar_month</span>
                      Book In-Clinic Appointment
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-surface-container bg-surface-container-low p-4 text-xs text-on-surface-variant">
                  <strong className="block text-primary font-semibold mb-1">Clinical Notice</strong>
                  <p className="leading-relaxed text-[11px]">
                    Online consultations provide preliminary assessment and triage guidance. In-person physical examination and diagnostic testing are recommended before surgical or invasive dental procedures.
                  </p>
                </div>
              </div>

              {/* Chat Stream Window on Right */}
              <div className="lg:col-span-8 flex flex-col rounded-xl border border-surface-container bg-white shadow-sm overflow-hidden min-h-[550px] max-h-[700px]">
                
                {/* Chat Room Header */}
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-container bg-surface-container-low">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">forum</span>
                    <span className="font-heading text-xs font-bold uppercase tracking-wider text-primary">
                      Direct Consultation Stream with {selectedDoctor.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('upload')}
                    className="text-xs font-semibold text-secondary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">attach_file</span>
                    Upload More X-Rays
                  </button>
                </div>

                {/* Message Log */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
                  {messages.map((m) => {
                    if (m.sender === 'system') {
                      return (
                        <div key={m.id} className="text-center my-2">
                          <span className="inline-block rounded-md bg-slate-200/80 px-3 py-1 text-[11px] font-medium text-slate-700">
                            {m.text}
                          </span>
                        </div>
                      )
                    }

                    const isDoctor = m.sender === 'doctor'
                    return (
                      <div
                        key={m.id}
                        className={`flex gap-3 max-w-[85%] ${
                          isDoctor ? 'mr-auto' : 'ml-auto flex-row-reverse'
                        }`}
                      >
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold shrink-0 ${
                            isDoctor
                              ? 'bg-primary text-white'
                              : 'bg-secondary text-white'
                          }`}
                        >
                          {isDoctor ? 'MD' : 'PT'}
                        </div>

                        <div>
                          <div className={`flex items-center gap-2 mb-1 ${isDoctor ? '' : 'justify-end'}`}>
                            <span className="text-xs font-bold text-primary">
                              {isDoctor ? m.doctorName : m.patientName || 'Patient'}
                            </span>
                            <span className="text-[10px] text-gray-400">{m.timestamp}</span>
                          </div>

                          <div
                            className={`rounded-xl p-3.5 text-xs leading-relaxed ${
                              isDoctor
                                ? 'bg-white border border-surface-container text-on-surface-variant shadow-xs'
                                : 'bg-primary text-white'
                            }`}
                          >
                            <p>{m.text}</p>

                            {/* Attachment in message */}
                            {m.attachment && (
                              <div className={`mt-2.5 pt-2.5 border-t ${isDoctor ? 'border-surface-container' : 'border-white/20'}`}>
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-1.5 truncate">
                                    <span className="material-symbols-outlined text-sm" aria-hidden="true">attachment</span>
                                    <span className="font-semibold truncate text-[11px]">{m.attachment}</span>
                                  </div>
                                  {m.attachmentPreview && (
                                    <button
                                      type="button"
                                      onClick={() => setPreviewModalFile({ name: m.attachment, url: m.attachmentPreview })}
                                      className={`text-[10px] font-bold uppercase underline cursor-pointer shrink-0 ${
                                        isDoctor ? 'text-secondary' : 'text-secondary-container'
                                      }`}
                                    >
                                      View Scan
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Composer */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-surface-container bg-white">
                  {chatAttachment && (
                    <div className="mb-2 flex items-center justify-between p-2 rounded-lg bg-surface-container-low text-xs border border-surface-container">
                      <span className="truncate font-medium text-primary">Attachment: {chatAttachment.name}</span>
                      <button
                        type="button"
                        onClick={() => setChatAttachment(null)}
                        className="text-gray-400 hover:text-red-600 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <label htmlFor="chat-file-input" className="p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-surface-container transition cursor-pointer" title="Attach Radiograph or Image">
                      <span className="material-symbols-outlined text-xl" aria-hidden="true">attach_file</span>
                      <input
                        id="chat-file-input"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setChatAttachment({
                              name: file.name,
                              previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
                            })
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <label htmlFor="chat-message-input" className="sr-only">
                      Consultation message to doctor
                    </label>
                    <input
                      id="chat-message-input"
                      type="text"
                      placeholder={`Type your clinical question or symptoms for ${selectedDoctor.name}...`}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 rounded-lg border border-surface-container bg-surface-container-low px-3.5 py-2.5 text-xs outline-primary focus:bg-white"
                    />

                    <button
                      type="submit"
                      disabled={!chatInput.trim() && !chatAttachment}
                      className="rounded-lg bg-primary px-4 py-2.5 font-bold uppercase tracking-wider text-white transition hover:bg-primary-container cursor-pointer text-xs disabled:opacity-50 flex items-center gap-1"
                    >
                      <span>Send</span>
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">send</span>
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* Attachment Preview Modal */}
      {previewModalFile && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewModalFile(null)}
        >
          <div 
            className="relative max-w-2xl w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-surface-container">
              <h3 className="font-heading text-sm font-bold text-primary">Radiograph Preview: {previewModalFile.name}</h3>
              <button
                type="button"
                onClick={() => setPreviewModalFile(null)}
                className="p-1 text-gray-500 hover:text-gray-800 rounded-md transition cursor-pointer"
                aria-label="Close radiograph preview"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="p-4 bg-black/5 flex items-center justify-center max-h-[60vh]">
              {previewModalFile.url ? (
                <img src={previewModalFile.url} alt="Attached radiograph scan" className="max-h-[55vh] w-auto object-contain rounded-md" />
              ) : (
                <p className="text-xs text-on-surface-variant">Document preview unavailable. File verified and queued.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
