<template>
  <div class="services-page">
    <!-- Hero Section -->
    <Hero
      title="Comprehensive Mental Health Services"
      subtitle="Early Childhood Focus"
      description="Evidence-based therapeutic services designed specifically for children birth to 8 years and their families."
      size="lg"
      :primary-action="{
        text: 'Schedule Consultation',
        to: '/contact',
        iconLeft: 'lucide:calendar'
      }"
    />

    <!-- Age Range & Overview -->
    <Section
      title="Serving Children Birth to 8 Years"
      subtitle="Developmental Focus"
      description="Our services are specifically designed to meet the unique developmental needs of young children and support healthy growth."
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div class="text-center">
          <div class="w-16 h-16 bg-mh-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="lucide:baby" class="w-8 h-8 text-mh-primary" aria-hidden="true" />
          </div>
          <h3 class="font-serif font-semibold text-lg text-mh-ink mb-2">Infants & Toddlers</h3>
          <p class="text-mh-muted text-sm">Birth to 3 years</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-mh-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="lucide:smile" class="w-8 h-8 text-mh-primary" aria-hidden="true" />
          </div>
          <h3 class="font-serif font-semibold text-lg text-mh-ink mb-2">Preschoolers</h3>
          <p class="text-mh-muted text-sm">3 to 5 years</p>
        </div>
        
        <div class="text-center">
          <div class="w-16 h-16 bg-mh-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="lucide:graduation-cap" class="w-8 h-8 text-mh-primary" aria-hidden="true" />
          </div>
          <h3 class="font-serif font-semibold text-lg text-mh-ink mb-2">School Age</h3>
          <p class="text-mh-muted text-sm">5 to 8 years</p>
        </div>
      </div>

      <div class="bg-mh-bg rounded-xl p-6 text-center">
        <h3 class="font-semibold text-mh-ink mb-2">Common Concerns We Address:</h3>
        <div class="flex flex-wrap justify-center gap-2 text-sm">
          <span v-for="concern in commonConcerns" :key="concern" 
                class="bg-mh-surface px-3 py-1 rounded-full border border-mh-border text-mh-muted">
            {{ concern }}
          </span>
        </div>
      </div>
    </Section>

    <!-- Core Services -->
    <Section title="Our Services" background="muted">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card
          v-for="service in coreServices"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          variant="elevated"
          class="h-full"
        >
          <template #header>
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 bg-mh-primary-100 rounded-xl flex items-center justify-center">
                <Icon
                  :icon="service.icon"
                  class="w-6 h-6 text-mh-primary"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 class="font-serif font-semibold text-xl text-mh-ink">{{ service.title }}</h3>
                <p class="text-sm text-mh-accent">{{ service.duration }}</p>
              </div>
            </div>
          </template>

          <div class="space-y-4">
            <div>
              <h4 class="font-semibold text-mh-ink mb-2">What to Expect:</h4>
              <ul class="space-y-1 text-sm text-mh-muted">
                <li v-for="item in service.whatToExpect" :key="item" class="flex items-start gap-2">
                  <Icon icon="lucide:check" class="w-4 h-4 text-mh-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="service.approaches">
              <h4 class="font-semibold text-mh-ink mb-2">Therapeutic Approaches:</h4>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="approach in service.approaches"
                  :key="approach"
                  class="text-xs bg-mh-accent-100 text-mh-accent px-2 py-1 rounded"
                >
                  {{ approach }}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>

    <!-- Specialized Programs -->
    <Section title="Specialized Programs">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="program in specializedPrograms"
          :key="program.title"
          :title="program.title"
          :description="program.description"
          variant="outlined"
          hover
        >
          <template #header>
            <div class="text-center mb-4">
              <Icon
                :icon="program.icon"
                class="w-12 h-12 text-mh-accent mx-auto mb-2"
                aria-hidden="true"
              />
              <h3 class="font-serif font-semibold text-lg text-mh-ink">{{ program.title }}</h3>
            </div>
          </template>

          <template #actions>
            <div class="pt-4 border-t border-mh-border">
              <div class="text-sm text-mh-muted">
                <strong>Ages:</strong> {{ program.ages }}<br>
                <strong>Format:</strong> {{ program.format }}
              </div>
            </div>
          </template>
        </Card>
      </div>
    </Section>

    <!-- Service Options -->
    <Section
      title="Flexible Service Options"
      subtitle="How We Meet Your Needs"
      background="muted"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- In-Person Services -->
        <Card variant="elevated">
          <template #header>
            <div class="flex items-center gap-3 mb-4">
              <Icon icon="lucide:building" class="w-8 h-8 text-mh-primary" aria-hidden="true" />
              <h3 class="font-serif font-semibold text-xl text-mh-ink">In-Person Services</h3>
            </div>
          </template>

          <div class="space-y-3">
            <p class="text-mh-muted">
              Our welcoming office space is designed with children and families in mind, featuring:
            </p>
            <ul class="space-y-2 text-sm text-mh-muted">
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Child-friendly play therapy room
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Comfortable family meeting space
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Easy parking and accessibility
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Sensory-friendly environment
              </li>
            </ul>
          </div>
        </Card>

        <!-- Telehealth Services -->
        <Card variant="elevated" v-if="siteData.services.telehealth">
          <template #header>
            <div class="flex items-center gap-3 mb-4">
              <Icon icon="lucide:video" class="w-8 h-8 text-mh-primary" aria-hidden="true" />
              <h3 class="font-serif font-semibold text-xl text-mh-ink">Telehealth Services</h3>
            </div>
          </template>

          <div class="space-y-3">
            <p class="text-mh-muted">
              Secure, HIPAA-compliant video sessions available for:
            </p>
            <ul class="space-y-2 text-sm text-mh-muted">
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Parent consultation and coaching
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Family therapy sessions
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Follow-up and check-in appointments
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                School consultation meetings
              </li>
            </ul>
          </div>
        </Card>
      </div>
    </Section>

    <!-- FAQ Section -->
    <Section title="Frequently Asked Questions">
      <div class="max-w-4xl mx-auto space-y-6">
        <div
          v-for="faq in serviceFAQs"
          :key="faq.question"
          class="bg-mh-surface border border-mh-border rounded-lg p-6"
        >
          <h3 class="font-semibold text-mh-ink mb-2">{{ faq.question }}</h3>
          <p class="text-mh-muted leading-relaxed">{{ faq.answer }}</p>
        </div>
      </div>

      <template #footer>
        <div class="text-center">
          <CTAButton
            to="/faq"
            variant="outline"
            icon-right="lucide:arrow-right"
          >
            View All FAQs
          </CTAButton>
        </div>
      </template>
    </Section>

    <!-- Pricing & Insurance -->
    <Section
      title="Investment in Your Family's Wellbeing"
      subtitle="Pricing & Insurance"
      background="muted"
    >
      <div class="max-w-4xl mx-auto">
        <Card variant="elevated">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="font-serif font-semibold text-xl text-mh-ink mb-4">Insurance & Payment</h3>
              <p class="text-mh-muted mb-4">{{ siteData.insurance.note }}</p>
              
              <div class="space-y-2">
                <h4 class="font-semibold text-mh-ink">Insurance Accepted:</h4>
                <ul class="space-y-1">
                  <li
                    v-for="insurance in siteData.insurance.accepted"
                    :key="insurance"
                    class="flex items-center gap-2 text-sm"
                  >
                    <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                    {{ insurance }}
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 class="font-serif font-semibold text-xl text-mh-ink mb-4">Session Information</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between">
                  <span class="text-mh-muted">Initial Consultation:</span>
                  <span class="text-mh-ink font-medium">90 minutes</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-mh-muted">Individual Therapy:</span>
                  <span class="text-mh-ink font-medium">50 minutes</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-mh-muted">Family Sessions:</span>
                  <span class="text-mh-ink font-medium">60 minutes</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-mh-muted">Group Programs:</span>
                  <span class="text-mh-ink font-medium">60-90 minutes</span>
                </div>
              </div>
              
              <div class="mt-6 p-4 bg-mh-bg rounded-lg">
                <p class="text-xs text-mh-muted">
                  <strong>TODO:</strong> Add actual pricing information, insurance details, 
                  and payment policies specific to your practice.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>

    <!-- Call to Action -->
    <Section
      title="Ready to Begin?"
      description="Take the first step toward supporting your child and family. Contact us to schedule your initial consultation."
      background="primary"
    >
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <CTAButton
          to="/contact"
          variant="secondary"
          size="lg"
          icon-left="lucide:calendar"
        >
          Schedule Consultation
        </CTAButton>
        
        <CTAButton
          :href="`tel:${siteData.phone}`"
          variant="accent"
          size="lg"
          icon-left="lucide:phone"
        >
          Call {{ siteData.phone }}
        </CTAButton>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import Hero from '@/components/Hero.vue'
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import CTAButton from '@/components/CTAButton.vue'
import Icon from '@/components/Icon.vue'
import { useSeo, generatePageMeta } from '@/composables/useSeo'
import { useSchemaOrg } from '@/composables/useSchemaOrg'
import { siteData } from '@/data/site'

// SEO Setup
const seoMeta = generatePageMeta(
  'Mental Health Services',
  'Comprehensive early childhood mental health services including assessments, individual therapy, parent coaching, and family support.',
  '/services',
  {
    keywords: 'child assessment, individual therapy, parent coaching, family therapy, behavioral support, autism support, play therapy'
  }
)

useSeo(seoMeta)
const { generateServiceSchema, addSchema } = useSchemaOrg()

// Add Service page specific schema
addSchema(generateServiceSchema())

// Common concerns addressed
const commonConcerns = [
  'Anxiety & Fears',
  'Behavioral Challenges',
  'Emotional Regulation',
  'Social Skills',
  'Sleep Issues',
  'Separation Anxiety',
  'Developmental Delays',
  'Trauma & Stress',
  'Autism Support',
  'ADHD Management',
  'Family Transitions',
  'School Readiness'
]

// Core services
const coreServices = [
  {
    title: 'Comprehensive Assessments',
    description: 'Thorough evaluation to understand your child\'s strengths, challenges, and developmental needs.',
    duration: '2-3 sessions over 2-3 weeks',
    icon: 'lucide:clipboard-list',
    whatToExpect: [
      'Clinical interviews with parents/caregivers',
      'Developmental and behavioral assessments',
      'Play-based observation sessions',
      'Comprehensive written report with recommendations',
      'Feedback session to discuss findings and next steps'
    ],
    approaches: ['Standardized assessments', 'Clinical observation', 'Developmental screening']
  },
  {
    title: 'Individual Therapy',
    description: 'One-on-one therapeutic sessions tailored to your child\'s age, development, and specific needs.',
    duration: '45-50 minute sessions',
    icon: 'lucide:user',
    whatToExpect: [
      'Play-based therapy appropriate for child\'s age',
      'Skill-building activities and interventions',
      'Regular parent check-ins and updates',
      'Home practice suggestions and resources',
      'Collaboration with other providers as needed'
    ],
    approaches: ['Play Therapy', 'CBT for Children', 'Expressive Arts', 'Mindfulness']
  },
  {
    title: 'Parent Coaching & Support',
    description: 'Guidance and strategies to help parents support their child\'s emotional and behavioral development.',
    duration: '50-60 minute sessions',
    icon: 'lucide:users',
    whatToExpect: [
      'Individualized parenting strategies',
      'Behavior management techniques',
      'Communication skill development',
      'Stress reduction and self-care planning',
      'Connection with community resources'
    ],
    approaches: ['PCIT', 'Positive Parenting', 'Attachment-based strategies']
  },
  {
    title: 'Family Therapy',
    description: 'Sessions focused on strengthening family relationships and improving communication patterns.',
    duration: '60 minute sessions',
    icon: 'lucide:home',
    whatToExpect: [
      'Whole family or dyadic sessions as appropriate',
      'Communication skill building',
      'Conflict resolution strategies',
      'Strengthening family bonds and routines',
      'Addressing family transitions and changes'
    ],
    approaches: ['Family Systems', 'Attachment Theory', 'Solution-Focused']
  }
]

// Specialized programs
const specializedPrograms = [
  {
    title: 'Social Skills Groups',
    description: 'Small group programs focused on developing peer interaction skills and social confidence.',
    ages: '4-8 years',
    format: '6-8 week groups',
    icon: 'lucide:users-round'
  },
  {
    title: 'Parent Support Groups',
    description: 'Peer support groups for parents facing similar challenges with their children.',
    ages: 'All ages',
    format: 'Monthly meetings',
    icon: 'lucide:coffee'
  },
  {
    title: 'School Consultation',
    description: 'Collaboration with teachers and school staff to support your child\'s success in educational settings.',
    ages: '3-8 years',
    format: 'As needed',
    icon: 'lucide:graduation-cap'
  },
  {
    title: 'Crisis Support',
    description: 'Immediate support and intervention during family crises or acute mental health concerns.',
    ages: 'All ages',
    format: 'Emergency sessions',
    icon: 'lucide:heart-pulse'
  },
  {
    title: 'Autism Spectrum Support',
    description: 'Specialized services for children on the autism spectrum and their families.',
    ages: '2-8 years',
    format: 'Individualized',
    icon: 'lucide:puzzle'
  },
  {
    title: 'Trauma-Informed Care',
    description: 'Specialized treatment for children who have experienced trauma or adverse events.',
    ages: '3-8 years',
    format: 'Individual & family',
    icon: 'lucide:shield-heart'
  }
]

// Service FAQs
const serviceFAQs = [
  {
    question: 'How long does therapy typically take?',
    answer: 'The length of therapy varies depending on your child\'s needs and goals. Some families see improvements in a few months, while others benefit from longer-term support. We regularly review progress and adjust treatment plans accordingly.'
  },
  {
    question: 'What should I expect during the first session?',
    answer: 'The first session is an opportunity for us to get to know your family and understand your concerns. We\'ll discuss your child\'s history, current challenges, and goals for therapy. Children often spend time playing or engaging in activities while we talk.'
  },
  {
    question: 'Do parents participate in therapy sessions?',
    answer: 'Yes! Parent involvement is crucial for successful outcomes. Depending on your child\'s age and needs, parents may participate in sessions directly or receive regular updates and coaching on how to support their child at home.'
  },
  {
    question: 'How do you work with schools and other providers?',
    answer: 'With your consent, we collaborate closely with teachers, pediatricians, and other professionals involved in your child\'s care. This team approach ensures consistent support across all environments.'
  }
]</script>
