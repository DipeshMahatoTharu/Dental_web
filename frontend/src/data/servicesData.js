export const SERVICES_DATA = [
  {
    id: 'digital-xray-diagnostics',
    icon: 'radiology',
    title: 'Digital X-Ray & Radiograph Diagnostic Review',
    category: 'Digital X-Ray & Radiography',
    shortDescription: 'High-precision evaluation of intraoral bitewing, periapical, and full-jaw digital radiographs for decay, bone loss, and root infections.',
    fullDescription: 'Transmit your dental radiographs directly to board-certified dental surgeons. We evaluate digital X-rays with clinical precision to identify hidden interproximal caries, periodontal bone resorption, apical abscesses, and structural tooth fractures that cannot be seen with the naked eye.',
    duration: '24-Hour Diagnostic Report + 20 mins Review',
    platform: 'Encrypted Radiograph Portal & Video Call',
    priceEstimate: '$39 / radiograph series',
    highlights: [
      'Comprehensive bitewing & periapical radiograph analysis',
      'Early interdental caries and bone level measurement',
      'Evaluation of root canals, pulp vitality, and periapical pathology',
      'Certified digital diagnostic report in PDF format'
    ],
    consultationSteps: [
      'Upload your digital X-ray files (JPG, PNG, PDF, or DICOM format)',
      'Clinical radiologist and dental surgeon inspect the radiograph series',
      'Receive structured diagnostic report outlining all findings',
      '1-on-1 video or live chat debrief with the specialist'
    ],
    idealFor: 'Patients with existing X-rays from prior clinic visits, individuals seeking confirmation on dental caries, or verifying root canal indications.'
  },
  {
    id: 'cbct-3d-scan-analysis',
    icon: 'view_in_ar',
    title: '3D CBCT & Dental Tomography Evaluation',
    category: 'Digital X-Ray & Radiography',
    shortDescription: 'In-depth volumetric analysis of 3D cone-beam computed tomography scans for implant planning, bone density, and nerve mapping.',
    fullDescription: '3D CBCT scans provide vital cross-sectional views of your maxillary and mandibular anatomy. Our senior implantologists and oral surgeons analyze 3D tomography datasets to verify bone height, measure cortical bone density, map the inferior alveolar nerve, and assess maxillary sinus health before surgical interventions.',
    duration: '24-Hour Comprehensive 3D Audit',
    platform: 'DICOM Viewer Portal & Specialist Debrief',
    priceEstimate: '$59 / volumetric scan',
    highlights: [
      'Volumetric bone width and height measurement',
      'Inferior alveolar nerve canal and mental foramen mapping',
      'Maxillary sinus floor and membrane evaluation',
      'Implant fixture feasibility and bone grafting recommendations'
    ],
    consultationSteps: [
      'Upload CBCT DICOM folder or panoramic radiograph',
      'Oral surgeon performs 3D volumetric slicing and nerve tracing',
      'Receive itemized surgical feasibility and bone report',
      'Video consultation to review 3D anatomical models together'
    ],
    idealFor: 'Patients planning dental implants, all-on-4/6 procedures, sinus lifts, or evaluating impacted wisdom teeth near major nerve pathways.'
  },
  {
    id: 'panoramic-radiograph-triage',
    icon: 'wb_twilight',
    title: 'Panoramic OPG Radiograph Full-Mouth Triage',
    category: 'Digital X-Ray & Radiography',
    shortDescription: 'Comprehensive full-mouth overview of upper and lower jaws, TMJ joints, impacted teeth, and asymptomatic cysts.',
    fullDescription: 'Orthopantomograms (OPG) capture all teeth, surrounding jawbones, and temporomandibular joints in a single panoramic view. Our specialists conduct a systematic full-jaw audit to check for impacted wisdom teeth, jaw cysts, asymmetric bone densities, and TMJ condyle positioning.',
    duration: 'Same-Day Assessment',
    platform: 'Secure Diagnostic Stream & Video Review',
    priceEstimate: '$45 / panoramic triage',
    highlights: [
      'Full-mouth tooth and root mapping',
      'Impacted wisdom teeth angulation and eruption prognosis',
      'Temporomandibular joint (TMJ) condyle symmetry check',
      'Identification of asymptomatic periapical lesions'
    ],
    consultationSteps: [
      'Submit digital panoramic OPG radiograph',
      'Specialist reviews tooth development, bone symmetry, and roots',
      'Receive actionable treatment priorities and triage summary',
      'Direct consultation chat to discuss urgent vs non-urgent needs'
    ],
    idealFor: 'Patients considering wisdom teeth extractions, adult orthodontic alignment, or full-mouth reconstructive rehabilitation.'
  },
  {
    id: 'radiograph-second-opinion',
    icon: 'policy',
    title: 'Independent X-Ray & Treatment Plan Second Opinion',
    category: 'Digital X-Ray & Radiography',
    shortDescription: 'Unbiased, independent review of external dental X-rays and expensive treatment proposals before committing to invasive surgery.',
    fullDescription: 'Before committing to invasive procedures or costly implants and root canals, get an independent, unbiased second opinion. Our senior consultants review your digital X-rays and treatment quotes to confirm if the procedure is necessary, offer conservative alternatives, and verify pricing fairness.',
    duration: '24-Hour Review + 20 mins Video Debrief',
    platform: 'Secure File Portal & Video Call',
    priceEstimate: '$49 / comprehensive audit',
    highlights: [
      'Expert review of proposed crowns, implants, or root canals against X-rays',
      'Exploration of conservative tooth-preserving alternatives',
      'Written audit of treatment scope and cost fairness',
      '1-on-1 video or live chat discussion with senior director'
    ],
    consultationSteps: [
      'Submit your X-rays and clinic quote or treatment plan',
      'Senior dental surgeon audits radiograph validity and procedure necessity',
      'Receive written second opinion breakdown in PDF',
      'Join 20-minute video discussion to ask all your clinical questions'
    ],
    idealFor: 'Patients recommended for major procedures wanting an independent, conflict-free professional audit.'
  },
  {
    id: 'virtual-consultation',
    icon: 'video_camera_front',
    title: 'Virtual Dental Consultation & Oral Exam',
    category: 'General & Emergency',
    shortDescription: '1-on-1 live HD video consultation with a certified dental specialist for oral exams, symptom analysis, and digital diagnoses.',
    fullDescription: 'Connect face-to-face with an experienced dentist from home. Whether experiencing sudden tooth pain, swollen gums, or tooth sensitivity, our dentist conducts a visual assessment, diagnoses the issue, and provides an official digital care plan and necessary e-prescriptions.',
    duration: '20 - 30 mins Live Video',
    platform: 'Zoom / Google Meet / WhatsApp Video',
    priceEstimate: '$35 / session',
    highlights: [
      'Live HD video assessment with licensed dental surgeon',
      'Electronic prescription (e-Rx) sent to your local pharmacy',
      'Personalized digital care roadmap in PDF',
      'Same-day appointment slots available'
    ],
    consultationSteps: [
      'Book your slot and select your preferred video platform',
      'Upload smile or symptom photos (optional)',
      'Join secure 1-on-1 video call with the dentist',
      'Receive official diagnosis, prescription, and care summary'
    ],
    idealFor: 'Anyone experiencing toothache, sensitive teeth, mouth sores, bleeding gums, or seeking professional medical advice.'
  },
  {
    id: 'emergency-triage',
    icon: 'emergency',
    title: 'Emergency Dental Triage & Pain Care',
    category: 'General & Emergency',
    shortDescription: 'Priority same-day virtual triage for acute toothaches, fractured teeth, facial swelling, and urgent prescriptions.',
    fullDescription: 'Dental emergencies happen without warning. Our priority triage connects you immediately with a dentist who assesses the severity of trauma or infection, advises on safe pain relief, prescribes antibiotics or analgesics if appropriate, and directs you to urgent local care.',
    duration: 'Priority 15 mins Connection',
    platform: 'Urgent Video / Voice Call',
    priceEstimate: '$40 / urgent session',
    highlights: [
      'Priority same-day connection within minutes',
      'Urgent pain management & home stabilization guidance',
      'Electronic prescriptions for antibiotics / analgesics',
      'Infection risk triage & hospital direction if needed'
    ],
    consultationSteps: [
      'Request priority emergency consultation',
      'Immediate connection with on-call dental surgeon',
      'Visual exam of infection, bleeding, or fractured tooth',
      'Immediate prescription & emergency action plan'
    ],
    idealFor: 'Severe sudden toothache, broken crowns, dental abscess, post-extraction complications, bleeding gums, or trauma.'
  },
  {
    id: 'virtual-smile-makeover',
    icon: 'sentiment_very_satisfied',
    title: 'Virtual Smile & Cosmetic Assessment',
    category: 'Cosmetic & Smile Design',
    shortDescription: 'Upload smile photos for a digital aesthetic evaluation of veneers, composite bonding, and clinical whitening options.',
    fullDescription: 'Discover how your smile can look before setting foot in a clinic. During this virtual aesthetic consultation, our cosmetic specialist evaluates your smile geometry, simulates veneer and whitening transformations, and customizes a smile plan to match your goals.',
    duration: '30 mins Video Consultation',
    platform: 'Interactive Screen Share & Video Call',
    priceEstimate: '$45 / consultation',
    highlights: [
      'Digital before/after smile simulation preview',
      'Custom cosmetic options (veneers, bonding, whitening)',
      'Itemized transparent price estimates',
      'Step-by-step treatment timeline breakdown'
    ],
    consultationSteps: [
      'Upload close-up photos of your smile and teeth',
      'Dentist prepares digital simulation preview',
      'Join live video call with screen-share to review options',
      'Receive customized aesthetic plan and clinic referral'
    ],
    idealFor: 'Individuals interested in teeth whitening, composite bonding, porcelain veneers, or repairing chipped front teeth.'
  },
  {
    id: 'remote-aligner-tracking',
    icon: 'straighten',
    title: 'Clear Aligners & Orthodontic Tele-Tracking',
    category: 'Orthodontic & Aligners',
    shortDescription: 'Remote tracking and progress reviews for clear aligners and braces patients without frequent clinic travel.',
    fullDescription: 'Save time and monitor your teeth straightening journey from anywhere. Check in with your orthodontist virtually, review teeth movement progression through photo updates, verify tray fitting accuracy, and receive authorization for your next aligner stages.',
    duration: '15 - 20 mins Check-in',
    platform: 'Video Call & Photo Upload',
    priceEstimate: '$30 / check-in',
    highlights: [
      'Virtual aligner fit & tracking evaluation',
      'Direct guidance from certified orthodontist',
      'Eliminates unnecessary in-person clinic travel',
      'Progress comparison with 3D treatment plan'
    ],
    consultationSteps: [
      'Take photos wearing your current aligner trays',
      'Orthodontist inspects tracking and tooth alignment',
      'Discuss bite comfort, wear time, and pressure points',
      'Receive approval to transition to the next tray set'
    ],
    idealFor: 'Aligner patients, retained orthodontic cases, and anyone considering clear aligners wanting a preliminary assessment.'
  },
  {
    id: 'pediatric-guidance',
    icon: 'child_care',
    title: 'Pediatric Dental Tele-Guidance for Parents',
    category: 'Pediatric & Family',
    shortDescription: 'Virtual consultations for parents regarding infant teething, early decay prevention, and child oral habits.',
    fullDescription: 'Get gentle, expert pediatric dental guidance without the stress of clinic visits. Our pediatric dental advisors help parents manage teething discomfort, bottle rot prevention, tongue ties, speech/bite alignment, and building positive brushing habits.',
    duration: '25 mins Video Call',
    platform: 'Family Friendly Video Session',
    priceEstimate: '$35 / session',
    highlights: [
      'Compassionate pediatric specialist guidance',
      'Teething relief strategies & safe soothing methods',
      'Nutritional counseling to prevent childhood cavities',
      'Stress-free habit transition (pacifiers, thumb-sucking)'
    ],
    consultationSteps: [
      'Schedule a convenient time around your child schedule',
      'Discuss developmental milestones, diet, and symptoms',
      'Dentist provides step-by-step parenting recommendations',
      'Receive child oral care guide and age-appropriate routine'
    ],
    idealFor: 'Parents of infants, toddlers, and young children seeking professional dental answers from home.'
  },
  {
    id: 'post-op-followup',
    icon: 'healing',
    title: 'Post-Procedure Virtual Follow-Up',
    category: 'General & Emergency',
    shortDescription: 'Remote recovery check-ins after tooth extractions, root canals, bone grafts, or dental implants.',
    fullDescription: 'Ensure your surgical site or restoration is healing properly without traveling back to the clinic. Show your healing tissue to the doctor via high-definition camera, review swelling resolution, and get instant answers regarding diet and medications.',
    duration: '15 mins Video Call',
    platform: 'Video Checkup',
    priceEstimate: '$25 / check-in (Free for clinic patients)',
    highlights: [
      'High-res visual inspection of healing tissue',
      'Evaluation of post-operative swelling and pain levels',
      'Adjustment of antibiotics or pain relief prescriptions',
      'Confirmation of full tissue recovery'
    ],
    consultationSteps: [
      'Connect via video in good lighting',
      'Doctor inspects surgical site and suture condition',
      'Review healing progress and daily comfort',
      'Receive clearance for normal diet and activity'
    ],
    idealFor: 'Patients recovering from wisdom tooth removal, root canal therapy, crown placements, or implant surgeries.'
  }
]

export const SERVICE_CATEGORIES = [
  'All Online Services',
  'Digital X-Ray & Radiography',
  'General & Emergency',
  'Cosmetic & Smile Design',
  'Orthodontic & Aligners',
  'Pediatric & Family'
]

export const SERVICES_FAQ = [
  {
    q: 'How do I upload and transmit my dental X-rays for review?',
    a: 'You can upload digital X-rays (periapical, bitewing, panoramic OPG, or 3D CBCT DICOM files) directly on our Doctor Consultation Portal (#/consultation) or during booking. Our diagnostic imaging system encrypts all files under strict medical confidentiality guidelines.'
  },
  {
    q: 'What types of dental X-rays can the specialists evaluate?',
    a: 'Our doctors review digital bitewings, periapical radiographs, panoramic OPG scans, cephalometric tracings, and 3D Cone Beam CT (CBCT) tomography datasets. We provide full analysis of bone levels, tooth roots, nerve canals, and caries depth.'
  },
  {
    q: 'Can a dentist prescribe medication through an online consultation?',
    a: 'Yes. When medically indicated, our licensed dentists can issue valid electronic prescriptions for antibiotics, therapeutic mouthwashes, and pain relief medications directly to your local pharmacy.'
  },
  {
    q: 'What if my X-ray shows an urgent infection or surgical need?',
    a: 'If our specialists identify acute periapical pathology, root fractures, or severe abscesses on your radiographs, we provide an immediate emergency triage report, prescribe emergency medications where appropriate, and provide direct referral instructions for immediate in-clinic treatment.'
  }
]
