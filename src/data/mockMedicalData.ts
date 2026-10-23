export interface DoctorProfile {
  name: string;
  title: string;
  specialization: string;
  degrees: string;
  experienceYears: number;
  registrationNumber: string;
  bio: string;
  philosophy: string;
  clinicalExpertise: string[];
  languages: string[];
  clinicAffiliation: string;
  portraitUrl: string;
  consultationFeeBase: number;
  clinicName: string;
  clinicAddress: string;
  cityStateZip: string;
  phone: string;
  email: string;
  emergencyNote: string;
  education: {
    degree: string;
    institution: string;
    year: string;
    honors?: string;
  }[];
  certifications: string[];
  workingHours: {
    days: string;
    hours: string;
    isOpen: boolean;
  }[];
}

export interface Specialization {
  id: string;
  title: string;
  iconName: string;
  category: 'general' | 'preventive' | 'chronic' | 'acute';
  description: string;
  commonSymptoms: string[];
  keyTreatments: string[];
  diagnosticApproach: string;
  preparationTips: string;
}

export interface MedicalService {
  id: string;
  name: string;
  category: 'Consultations' | 'Preventive' | 'Chronic Care' | 'Assessments';
  shortDesc: string;
  forWho: string;
  format: 'In-Person' | 'Telehealth' | 'In-Person & Telehealth';
  duration: string;
  price: number;
  featured?: boolean;
}

export interface PatientReview {
  id: string;
  patientName: string;
  rating: number;
  date: string;
  verifiedVisit: boolean;
  treatment: string;
  reviewText: string;
  category: 'general' | 'preventive' | 'chronic' | 'telehealth';
}

export interface AppointmentRecord {
  id: string;
  referenceCode: string;
  serviceId: string;
  serviceName: string;
  format: string;
  date: string;
  timeSlot: string;
  patientName: string;
  email: string;
  phone: string;
  isNewPatient: boolean;
  reasonForVisit: string;
  createdAt: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export const DEFAULT_DOCTOR_PROFILE: DoctorProfile = {
  name: "Dr. Sarah Jenkins",
  title: "MD, FACP",
  specialization: "Internal Medicine & Preventive Healthcare",
  degrees: "MD, Harvard Medical School · Residency: Johns Hopkins Hospital",
  experienceYears: 14,
  registrationNumber: "State Medical License #MD-48921-CA · NPI: 1849204912",
  bio: "Dr. Sarah Jenkins is a board-certified internist dedicated to providing comprehensive, patient-centered adult medical care. With over 14 years of clinical practice in academic medical centers and private practice, she emphasizes proactive preventive medicine, compassionate listening, and evidence-based management of both acute illnesses and complex chronic conditions.",
  philosophy: "I believe the best medical outcomes happen when doctor and patient work as trusted partners. My clinical philosophy centers on listening closely to your concerns, explaining diagnoses and lab findings in plain language, and crafting tailored care plans that fit your lifestyle and long-term health goals.",
  clinicalExpertise: [
    "Comprehensive Adult Preventive Care & Screenings",
    "Hypertension & Cardiovascular Risk Assessment",
    "Type 2 Diabetes Mellitus & Metabolic Health",
    "Thyroid Disorders & Endocrine Evaluation",
    "Respiratory Infections, Allergies & Asthma",
    "Evidence-Based Lifestyle & Longevity Counseling"
  ],
  languages: ["English (Native)", "Spanish (Professional Clinical)"],
  clinicAffiliation: "AuraCare Medical Group · Attending Physician at MetroHealth Academic Hospital",
  portraitUrl: "/src/assets/images/doctor_portrait_1792776876062.jpg",
  consultationFeeBase: 150,
  clinicName: "AuraCare Medical Center",
  clinicAddress: "450 Medical Heights Plaza, Suite 320",
  cityStateZip: "San Francisco, CA 94102",
  phone: "(555) 234-5678",
  email: "care@auracarehealth.com",
  emergencyNote: "For life-threatening medical emergencies (severe chest pain, difficulty breathing, acute stroke symptoms), immediately call 911 or visit your nearest emergency room.",
  education: [
    {
      degree: "Doctor of Medicine (MD)",
      institution: "Harvard Medical School",
      year: "2010",
      honors: "Magna Cum Laude · Alpha Omega Alpha Honor Society"
    },
    {
      degree: "Internal Medicine Residency",
      institution: "Johns Hopkins Hospital",
      year: "2010 - 2013",
      honors: "Chief Resident in Internal Medicine (2013)"
    },
    {
      degree: "Bachelor of Science in Human Biology",
      institution: "Stanford University",
      year: "2006",
      honors: "Distinction in Undergraduate Research"
    }
  ],
  certifications: [
    "American Board of Internal Medicine (ABIM) - Board Certified",
    "Fellow of the American College of Physicians (FACP)",
    "Advanced Cardiac Life Support (ACLS) Certified",
    "California State Medical Board Active License"
  ],
  workingHours: [
    { days: "Monday – Thursday", hours: "8:00 AM – 5:00 PM", isOpen: true },
    { days: "Friday", hours: "8:00 AM – 3:30 PM", isOpen: true },
    { days: "Saturday", hours: "9:00 AM – 1:00 PM (Urgent Care & Virtual Only)", isOpen: true },
    { days: "Sunday", hours: "Closed (On-Call Triage Available)", isOpen: false }
  ]
};

export const DEFAULT_SPECIALIZATIONS: Specialization[] = [
  {
    id: "general-consultation",
    title: "General Health Consultations",
    iconName: "Stethoscope",
    category: "general",
    description: "Thorough diagnostic evaluations for new symptoms, unexplained fatigue, medication reviews, and ongoing health concerns.",
    commonSymptoms: ["Fatigue & lethargy", "Mild dizziness", "Persistent cough", "Digestive irregularities", "General malaise"],
    keyTreatments: ["Physical examinations", "Diagnostic lab work", "Prescription adjustments", "Specialist referral coordination"],
    diagnosticApproach: "Detailed history taking followed by targeted vital assessments, systemic review, and point-of-care laboratory workups.",
    preparationTips: "Bring your current prescription bottles, past lab reports, and a written bullet list of symptoms."
  },
  {
    id: "preventive-healthcare",
    title: "Preventive Healthcare & Screenings",
    iconName: "ShieldCheck",
    category: "preventive",
    description: "Proactive annual wellness exams, age-appropriate cancer screenings, cardiovascular risk profiling, and immunization updates.",
    commonSymptoms: ["Routine wellness check", "Family history of heart disease", "Vaccine booster needs", "Cholesterol review"],
    keyTreatments: ["Full lipid panel & blood glucose", "Cardiovascular risk scoring (ASCVD)", "Immunizations", "Cancer screening referrals (mammogram, colonoscopy)"],
    diagnosticApproach: "Evidence-based United States Preventive Services Task Force (USPSTF) guidelines customized to individual family history.",
    preparationTips: "Fast for 8 to 12 hours prior if your visit includes fasting cholesterol or metabolic lipid panels."
  },
  {
    id: "fever-acute-illness",
    title: "Fever & Acute Illness Care",
    iconName: "Thermometer",
    category: "acute",
    description: "Prompt diagnosis and symptomatic relief for respiratory infections, seasonal influenza, strep throat, sinusitis, and urinary tract infections.",
    commonSymptoms: ["High fever & chills", "Sore throat & difficulty swallowing", "Sinus pressure", "Severe acute cough", "Dysuria / UTI symptoms"],
    keyTreatments: ["Rapid PCR/antigen viral testing", "Antibiotic stewardship", "Nebulizer breathing treatments", "Hydration and symptom relief"],
    diagnosticApproach: "Same-day rapid in-clinic diagnostics paired with lung auscultation and clinical triage.",
    preparationTips: "Wear a protective mask if experiencing respiratory symptoms and record your home temperature readings."
  },
  {
    id: "diabetes-management",
    title: "Diabetes & Metabolic Management",
    iconName: "Activity",
    category: "chronic",
    description: "Personalized care protocols for Type 2 diabetes, prediabetes, and insulin resistance, focusing on glycemic control and complication prevention.",
    commonSymptoms: ["Elevated HbA1c", "Excessive thirst & urination", "Unexplained weight fluctuation", "Peripheral tingling"],
    keyTreatments: ["Continuous glucose monitoring (CGM) setup", "Modern pharmacotherapy (GLP-1s, SGLT2s)", "Nutritional guidance", "Annual microvascular screening"],
    diagnosticApproach: "Quarterly HbA1c tracking, renal function panels (eGFR/uACR), and retinal exam coordination.",
    preparationTips: "Bring your glucometer logbook or sync your CGM app before entering the examination room."
  },
  {
    id: "blood-pressure-cardio",
    title: "Blood Pressure & Heart Health",
    iconName: "HeartPulse",
    category: "chronic",
    description: "Comprehensive management of hypertension, high cholesterol, and atherosclerotic cardiovascular disease prevention.",
    commonSymptoms: ["Elevated home BP readings", "Occasional morning headaches", "Palpitations", "Shortness of breath with exertion"],
    keyTreatments: ["24-hour ambulatory BP monitoring", "Antihypertensive regimen titration", "Electrocardiogram (ECG/EKG)", "Sodium & lifestyle counseling"],
    diagnosticApproach: "Multiple rested automated blood pressure measurements, 12-lead ECG review, and renal/electrolyte checks.",
    preparationTips: "Avoid caffeine, smoking, and strenuous exercise for at least 30 minutes before your clinic visit."
  },
  {
    id: "routine-health-checkups",
    title: "Routine Health Checkups",
    iconName: "ClipboardList",
    category: "preventive",
    description: "Complete physical exams required for employment, pre-operative clearances, sports participation, and general baseline wellness.",
    commonSymptoms: ["Annual employer biometric check", "Surgical pre-clearance", "Insurance health examination"],
    keyTreatments: ["Biometric screening (BMI, vitals)", "Organ system auscultation", "Pre-op clearance documentation", "Vision & reflex testing"],
    diagnosticApproach: "Standardized physical examination covering neurological, respiratory, cardiovascular, and abdominal systems.",
    preparationTips: "Bring any required employer or surgical clearance forms with patient sections pre-completed."
  },
  {
    id: "womens-mens-health",
    title: "Adult Health & Wellness",
    iconName: "Users",
    category: "general",
    description: "Holistic care addressing adult health stages, hormonal transitions, bone density (osteoporosis) screening, and mental health screening.",
    commonSymptoms: ["Sleep disturbances", "Mood changes or anxiety", "Hormonal shifts", "Joint aches & stiffness"],
    keyTreatments: ["PHQ-9/GAD-7 mental wellness screening", "DEXA scan ordering", "Hormone level panels", "Bone density support"],
    diagnosticApproach: "Integrated physical and psycho-social review with confidential, non-judgmental discussion.",
    preparationTips: "Write down any questions about sleep, mood, or lifestyle changes you wish to discuss privately."
  },
  {
    id: "gastro-digestive-health",
    title: "Digestive & Gastrointestinal Health",
    iconName: "Flame",
    category: "general",
    description: "Evaluation and management of acid reflux (GERD), irritable bowel syndrome (IBS), dyspepsia, and chronic abdominal discomfort.",
    commonSymptoms: ["Acid reflux & heartburn", "Abdominal bloating", "Irregular bowel habits", "Food intolerances"],
    keyTreatments: ["H. pylori breath testing", "Dietary elimination protocols", "Reflux medication management", "Gastroenterology referral"],
    diagnosticApproach: "Symptom chronology mapping, exclusion of red-flag symptoms, and targeted non-invasive testing.",
    preparationTips: "Keep a simple 3-day food and symptom journal to review during the consultation."
  }
];

export const DEFAULT_SERVICES: MedicalService[] = [
  {
    id: "in-person-consultation",
    name: "Comprehensive In-Person Consultation",
    category: "Consultations",
    shortDesc: "In-depth one-on-one medical consultation covering new symptoms, thorough physical examination, and customized care plan.",
    forWho: "New or existing patients with specific symptoms or seeking a new primary physician.",
    format: "In-Person",
    duration: "45 minutes",
    price: 150,
    featured: true
  },
  {
    id: "annual-wellness-physical",
    name: "Executive Annual Wellness Physical",
    category: "Preventive",
    shortDesc: "Extensive full-body physical exam, complete diagnostic bloodwork review, cardiovascular risk scoring, and preventive health roadmap.",
    forWho: "Adults seeking proactive preventive care, cancer screening updates, and longevity planning.",
    format: "In-Person",
    duration: "60 minutes",
    price: 240,
    featured: true
  },
  {
    id: "routine-follow-up",
    name: "Follow-Up Consultation & Care Review",
    category: "Consultations",
    shortDesc: "Focused appointment to evaluate treatment response, review diagnostic lab results, and adjust prescriptions.",
    forWho: "Existing patients following up on previous diagnoses, lab results, or medication changes.",
    format: "In-Person & Telehealth",
    duration: "25 minutes",
    price: 85
  },
  {
    id: "chronic-disease-management",
    name: "Chronic Condition Management & Care Plan",
    category: "Chronic Care",
    shortDesc: "Structured longitudinal care for hypertension, Type 2 diabetes, thyroid conditions, or cholesterol management.",
    forWho: "Patients managing long-term conditions who need ongoing physician oversight and lab monitoring.",
    format: "In-Person & Telehealth",
    duration: "45 minutes",
    price: 180,
    featured: true
  },
  {
    id: "secure-telehealth",
    name: "Secure Teleconsultation / Video Visit",
    category: "Consultations",
    shortDesc: "High-definition HIPAA-compliant video consultation from the comfort of your home or office for non-emergency medical care.",
    forWho: "Busy professionals, minor acute ailments, follow-up lab reviews, or prescription renewals.",
    format: "Telehealth",
    duration: "30 minutes",
    price: 110
  },
  {
    id: "second-opinion-review",
    name: "Second Opinion & Medical Record Review",
    category: "Assessments",
    shortDesc: "Comprehensive examination of complex outside medical charts, specialist recommendations, and treatment options.",
    forWho: "Patients seeking an independent, thorough review before major procedures or complex medication regimens.",
    format: "In-Person & Telehealth",
    duration: "50 minutes",
    price: 210
  }
];

export const DEFAULT_REVIEWS: PatientReview[] = [
  {
    id: "rev-1",
    patientName: "Marcus Thorne",
    rating: 5,
    date: "October 14, 2026",
    verifiedVisit: true,
    treatment: "Annual Physical & Hypertension Care",
    reviewText: "Dr. Jenkins is by far the most thorough and attentive doctor I have ever had. She did not rush our appointment, explained every single lab marker clearly, and helped me lower my blood pressure without heavy medication. The clinic staff is courteous and running right on time.",
    category: "chronic"
  },
  {
    id: "rev-2",
    patientName: "Elena Rodriguez",
    rating: 5,
    date: "September 28, 2026",
    verifiedVisit: true,
    treatment: "Preventive Wellness Exam",
    reviewText: "From the moment you walk into the clinic, you feel in good hands. The space is spotless and calming. Dr. Jenkins took time to understand my family history of heart disease and created a realistic prevention plan. Online booking was seamless.",
    category: "preventive"
  },
  {
    id: "rev-3",
    patientName: "David Sterling",
    rating: 5,
    date: "September 19, 2026",
    verifiedVisit: true,
    treatment: "Telehealth Video Consultation",
    reviewText: "Used the video consultation when I was feeling unwell with severe bronchitis symptoms. The video connection was crystal clear, Dr. Jenkins called in my prescription to my local pharmacy within 20 minutes, and followed up two days later. First rate care.",
    category: "telehealth"
  },
  {
    id: "rev-4",
    patientName: "Patricia Howard",
    rating: 5,
    date: "August 30, 2026",
    verifiedVisit: true,
    treatment: "Type 2 Diabetes Optimization",
    reviewText: "My previous doctor spent 7 minutes with me. Dr. Jenkins spent 45 minutes walking through my glucose trends and continuous monitor data. In 4 months, my HbA1c dropped from 8.2 to 6.7. I feel energetic and truly cared for.",
    category: "chronic"
  },
  {
    id: "rev-5",
    patientName: "James Henderson",
    rating: 5,
    date: "August 12, 2026",
    verifiedVisit: true,
    treatment: "Acute Sinus Infection & Diagnostic Review",
    reviewText: "Managed to get a same-day morning slot. The front desk was lovely, Dr. Jenkins quickly diagnosed the infection and advised me on recovery. Clear instructions and no unnecessary tests. Highly recommended.",
    category: "general"
  }
];

export const FAQS = [
  {
    question: "How do I schedule an appointment with Dr. Jenkins?",
    answer: "You can book directly using the online 'Book Appointment' button on this website in under 2 minutes. Choose your preferred service, consultation format (in-person or telehealth), and select an available date and time. You can also call our reception desk at (555) 234-5678 during clinic hours.",
    category: "Appointments"
  },
  {
    question: "Do you accept insurance or offer self-pay pricing?",
    answer: "We accept most major PPO insurance plans (Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare). For self-pay patients and high-deductible plans, we provide transparent flat-rate fees listed directly on our services page with no hidden charges. We also provide detailed itemized superbills for insurance reimbursement upon request.",
    category: "Billing & Insurance"
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Please bring a valid photo ID, your insurance card (if applicable), a current list of all medications/supplements with dosages, and any relevant recent laboratory or imaging reports from the past 12 months.",
    category: "Patient Prep"
  },
  {
    question: "How do telehealth video consultations work?",
    answer: "Our video visits are conducted over a secure, encrypted HIPAA-compliant medical portal. Once you book, you receive an email and SMS confirmation containing a single-click link. No software download is required—it runs directly in your web browser on your phone, tablet, or computer.",
    category: "Telehealth"
  },
  {
    question: "What is your cancellation or rescheduling policy?",
    answer: "We understand unexpected schedule conflicts arise. We kindly request at least 24 hours notice for cancellations or rescheduling so we can offer the slot to other patients in need. Late cancellations within 24 hours may incur a modest administrative fee.",
    category: "Appointments"
  },
  {
    question: "What should I do in an emergency situation?",
    answer: "Our clinic is designed for outpatient general and preventive medical care. If you are experiencing chest pain, signs of stroke (facial drooping, arm weakness, slurred speech), severe shortness of breath, uncontrolled bleeding, or sudden neurological deficits, please call 911 or proceed to the nearest hospital emergency department immediately.",
    category: "Emergency"
  }
];
