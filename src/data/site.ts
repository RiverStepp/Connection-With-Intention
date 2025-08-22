export interface SiteData {
  name: string
  tagline: string
  description: string
  url: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  hours: {
    [key: string]: string
  }
  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    twitter?: string
  }
  services: {
    telehealth: boolean
    inPerson: boolean
    ageRange: string
    languages: string[]
  }
  insurance: {
    accepted: string[]
    note: string
  }
  credentials: string[]
  specialties: string[]
}

// TODO: Update with actual practice information
export const siteData: SiteData = {
  name: 'Sprout & Star Mental Health',
  tagline: 'Nurturing Young Minds, Supporting Families',
  description: 'Professional mental health services specializing in early childhood development. Compassionate, evidence-based therapy for children and families.',
  url: 'https://sproutandstar.com', // TODO: Update with actual domain
  phone: '(555) 123-4567', // TODO: Update with actual phone number
  email: 'hello@sproutandstar.com', // TODO: Update with actual email
  
  address: {
    street: '123 Healing Way, Suite 200', // TODO: Update with actual address
    city: 'Wellness City',
    state: 'CA',
    zip: '12345',
    country: 'United States'
  },
  
  hours: {
    'Monday': '9:00 AM - 5:00 PM',
    'Tuesday': '9:00 AM - 7:00 PM',
    'Wednesday': '9:00 AM - 5:00 PM',
    'Thursday': '9:00 AM - 7:00 PM',
    'Friday': '9:00 AM - 4:00 PM',
    'Saturday': 'By Appointment',
    'Sunday': 'Closed'
  },
  
  social: {
    // TODO: Add actual social media links if applicable
    facebook: 'https://facebook.com/sproutandstar',
    instagram: 'https://instagram.com/sproutandstar',
    linkedin: 'https://linkedin.com/company/sproutandstar'
  },
  
  services: {
    telehealth: true,
    inPerson: true,
    ageRange: 'Birth to 8 years',
    languages: ['English', 'Spanish'] // TODO: Update with actual languages offered
  },
  
  insurance: {
    accepted: [
      'Aetna',
      'Blue Cross Blue Shield',
      'Cigna',
      'UnitedHealthcare',
      'Self-Pay'
    ], // TODO: Update with actual insurance accepted
    note: 'We are an out-of-network provider but can provide documentation for reimbursement. Please contact your insurance to verify your out-of-network benefits.'
  },
  
  credentials: [
    'Licensed Clinical Social Worker (LCSW)',
    'Certified in Parent-Child Interaction Therapy (PCIT)',
    'Trauma-Focused Cognitive Behavioral Therapy (TF-CBT)',
    'Child Development Associate (CDA)'
  ], // TODO: Update with actual credentials
  
  specialties: [
    'Early Childhood Mental Health',
    'Attachment and Bonding',
    'Developmental Trauma',
    'Behavioral Challenges',
    'Parent-Child Relationships',
    'Social-Emotional Development',
    'Autism Spectrum Support',
    'ADHD Assessment and Treatment'
  ]
}

export const emergencyContacts = {
  crisis: '988', // Suicide & Crisis Lifeline
  emergency: '911',
  localCrisis: '(555) 987-6543', // TODO: Update with local crisis line
  text: 'Text HOME to 741741' // Crisis Text Line
}

export const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Resources', path: '/resources' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' }
]

export const footerLinks = {
  main: [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Resources', path: '/resources' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ],
  legal: [
    { name: 'Privacy Policy', path: '/legal#privacy' },
    { name: 'Terms of Use', path: '/legal#terms' },
    { name: 'Accessibility', path: '/legal#accessibility' },
    { name: 'Policies', path: '/policies' }
  ],
  resources: [
    { name: 'Crisis Resources', path: '/resources#crisis' },
    { name: 'Parenting Guides', path: '/resources#guides' },
    { name: 'Testimonials', path: '/testimonials' }
  ]
}
