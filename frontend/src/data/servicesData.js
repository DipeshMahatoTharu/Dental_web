export const SERVICES_DATA = [
  {
    id: 'virtual-consultation',
    icon: 'video_camera_front',
    title: 'Virtual Dental Consultation',
    category: 'General & Emergency',
    shortDescription: '1-on-1 live HD video consultation with a certified dental specialist for oral exams, symptom analysis, and instant digital diagnosis.',
    fullDescription: 'Connect face-to-face with an experienced dentist from the comfort of your home. Whether you are experiencing sudden tooth pain, swollen gums, or tooth sensitivity, our dentist will conduct a visual assessment, diagnose the issue, and provide an official digital treatment roadmap and necessary e-prescriptions.',
    duration: '20 - 30 mins Live Video',
    platform: 'Zoom / Google Meet / WhatsApp Video',
    priceEstimate: '$35 / session',
    highlights: [
      'Live HD video assessment with licensed dentist',
      'Electronic prescription (e-Rx) sent to your pharmacy',
      'Personalized digital care plan in PDF',
      'Same-day appointment slots available'
    ],
    consultationSteps: [
      'Book your slot and select your preferred video platform',
      'Upload smile/symptom photos or dental history (optional)',
      'Join secure 1-on-1 video call with the dentist',
      'Receive official diagnosis, prescription, and treatment summary'
    ],
    idealFor: 'Anyone experiencing toothache, sensitive teeth, mouth sores, bleeding gums, or seeking professional medical advice before visiting a clinic in person.'
  },
  {
    id: 'second-opinion',
    icon: 'policy',
    title: 'Digital Second Opinion & Scan Review',
    category: 'Second Opinion & Scans',
    shortDescription: 'Upload your dental X-rays, CBCT scans, or treatment quotes from other clinics for an unbiased specialist review.',
    fullDescription: 'Before committing to invasive procedures or costly implants and root canals, get an independent, unbiased second opinion. Our senior consultants review your digital X-rays and treatment quotes to confirm if the procedure is necessary, offer conservative alternatives, and verify pricing fairness.',
    duration: '24-Hour Review + 20 mins Video Debrief',
    platform: 'Secure File Portal & Video Call',
    priceEstimate: '$49 / comprehensive review',
    highlights: [
      'Expert analysis of digital X-rays and 3D scans',
      'Evaluation of proposed treatment necessity & costs',
      'Exploration of less invasive dental alternatives',
      'Detailed written PDF report + 1-on-1 video debrief'
    ],
    consultationSteps: [
      'Submit your X-ray images, scans, or existing doctor recommendations',
      'Specialist endodontist/implantologist performs in-depth case review',
      'Receive written second opinion breakdown',
      'Join 20-minute video discussion to ask all your questions'
    ],
    idealFor: 'Patients recommended for major procedures (implants, root canals, extractions, braces) wanting a trusted, independent opinion.'
  },
  {
    id: 'virtual-smile-makeover',
    icon: 'sentiment_very_satisfied',
    title: 'Virtual Smile & Cosmetic Assessment',
    category: 'Cosmetic & Smile Design',
    shortDescription: 'Upload your smile photos for a digital aesthetic simulation of veneers, bonding, and teeth whitening options.',
    fullDescription: 'Discover how your dream smile could look before setting foot in a clinic. During this virtual aesthetic consultation, our cosmetic dental specialist evaluates your smile geometry, simulates veneer and whitening transformations, and customizes a smile makeover plan to match your budget.',
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
    idealFor: 'Individuals interested in teeth whitening, composite bonding, porcelain veneers, or repairing chipped and discolored front teeth.'
  },
  {
    id: 'remote-aligner-tracking',
    icon: 'straighten',
    title: 'Clear Aligners & Orthodontic Tele-Tracking',
    category: 'Orthodontic & Aligners',
    shortDescription: 'Remote tracking and progress reviews for clear aligners and braces patients without frequent clinic visits.',
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
      'Discuss bite comfort, wear time, and any pressure points',
      'Receive approval to transition to the next tray set'
    ],
    idealFor: 'Aligner patients, retained orthodontic cases, and anyone considering clear aligners wanting a preliminary eligibility assessment.'
  },
  {
    id: 'emergency-triage',
    icon: 'emergency',
    title: 'Emergency Teledentistry & Pain Triage',
    category: 'General & Emergency',
    shortDescription: 'Immediate same-day virtual triage for acute toothaches, broken teeth, facial swelling, and urgent prescription needs.',
    fullDescription: 'Dental emergencies happen without warning. Our priority teledentistry triage connects you immediately with a dentist who can assess the severity of trauma or infection, advise on safe pain relief, prescribe antibiotics or analgesics if appropriate, and direct you to urgent local care.',
    duration: 'Immediate / Priority 15 mins',
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
      'Immediate connection with on-call dentist',
      'Visual exam of infection, bleeding, or fractured tooth',
      'Immediate prescription & emergency action plan'
    ],
    idealFor: 'Severe sudden toothache, broken crowns, dental abscess, post-extraction complications, bleeding gums, or trauma.'
  },
  {
    id: 'pediatric-guidance',
    icon: 'child_care',
    title: 'Pediatric Dental Tele-Guidance for Parents',
    category: 'Pediatric & Family',
    shortDescription: 'Virtual consultations for parents regarding infant teething, early decay prevention, thumb-sucking, and child oral habits.',
    fullDescription: 'Get gentle, expert pediatric dental guidance without the stress of taking an anxious toddler to a clinic. Our pediatric dental advisors help parents manage teething discomfort, bottle rot prevention, tongue ties, speech/bite alignment, and building positive brushing habits.',
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
      'Schedule a convenient time around your child’s routine',
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
    fullDescription: 'Ensure your surgical site or restoration is healing perfectly without traveling back to the clinic. Show your healing tissue to the doctor via high-definition camera, review swelling resolution, and get instant answers regarding diet, medications, and healing milestones.',
    duration: '15 mins Video Call',
    platform: 'Video Checkup',
    priceEstimate: '$25 / check-in (Free for our clinic patients)',
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
  },
  {
    id: 'hygiene-coaching',
    icon: 'clean_hands',
    title: 'Preventive Oral Hygiene & Diet Coaching',
    category: 'Pediatric & Family',
    shortDescription: 'Personalized virtual coaching on brushing techniques, flossing routines, enamel protection, and halitosis elimination.',
    fullDescription: 'Upgrade your daily oral hygiene routine with personalized 1-on-1 coaching. Our dental hygienists inspect your brushing and flossing technique on camera, recommend the ideal toothbrushes and water flossers for your mouth, and create a remineralization diet plan.',
    duration: '30 mins Interactive Workshop',
    platform: 'Interactive 1-on-1 Video Workshop',
    priceEstimate: '$30 / session',
    highlights: [
      'Live demonstration and technique feedback on camera',
      'Personalized oral care product recommendations',
      'Custom plan for bad breath and plaque prevention',
      'Acid-erosion and enamel strengthening dietary tips'
    ],
    consultationSteps: [
      'Bring your current toothbrush and dental products to the call',
      'Hygienist reviews your current habits and areas of concern',
      'Interactive demonstration of modified Bass brushing & flossing',
      'Receive custom product list and habit checklist'
    ],
    idealFor: 'Anyone wanting fresher breath, healthier pink gums, cavity prevention, and professional guidance on dental products.'
  }
]

export const SERVICE_CATEGORIES = [
  'All Online Services',
  'General & Emergency',
  'Second Opinion & Scans',
  'Cosmetic & Smile Design',
  'Orthodontic & Aligners',
  'Pediatric & Family'
]

export const SERVICES_FAQ = [
  {
    q: 'How does an online dental consultation work?',
    a: 'You simply choose your consultation type, pick a convenient time, and select your preferred platform (Zoom, Google Meet, or WhatsApp Video). During the call, our certified dentist will speak with you, inspect your teeth on camera, review any uploaded X-rays or photos, provide an accurate diagnosis, and send your treatment plan and digital prescription directly to your phone or email.'
  },
  {
    q: 'Can a dentist prescribe medication through an online consultation?',
    a: 'Yes! When medically indicated, our licensed dentists can issue valid electronic prescriptions for antibiotics, therapeutic mouthwashes, and pain relief medications directly to your local pharmacy.'
  },
  {
    q: 'What equipment or preparation do I need for the video call?',
    a: 'You only need a smartphone, tablet, or laptop with a working camera and microphone, good lighting, and an internet connection. If you have dental X-rays, photos of your teeth, or previous treatment notes, you can upload or share them during the session.'
  },
  {
    q: 'What if my condition requires an in-person dental procedure?',
    a: 'If our dentist determines during your virtual consultation that you require hands-on clinical treatment (such as a filling, extraction, or deep cleaning), we will provide you with a clear triage report, emergency stabilization guidance, and help connect you with trusted local clinical providers.'
  }
]
