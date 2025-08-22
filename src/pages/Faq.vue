<template>
  <div class="faq-page">
    <!-- Hero Section -->
    <Hero
      title="Frequently Asked Questions"
      subtitle="Common Questions"
      description="Find answers to common questions about our services, insurance, and what to expect."
      size="md"
    />

    <!-- FAQ Categories -->
    <Section size="lg">
      <div class="max-w-4xl mx-auto">
        <!-- Category Navigation -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button
            v-for="category in faqCategories"
            :key="category.id"
            type="button"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeCategory === category.id 
                ? 'bg-mh-primary text-white' 
                : 'bg-mh-surface text-mh-ink hover:bg-mh-bg border border-mh-border'
            ]"
            @click="activeCategory = category.id"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- FAQ Items -->
        <div class="space-y-4">
          <div
            v-for="faq in filteredFAQs"
            :key="faq.id"
            class="bg-mh-surface border border-mh-border rounded-lg overflow-hidden"
          >
            <button
              type="button"
              class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-mh-bg transition-colors"
              :aria-expanded="openFAQ === faq.id"
              @click="toggleFAQ(faq.id)"
            >
              <h3 class="font-semibold text-mh-ink pr-4">{{ faq.question }}</h3>
              <Icon
                :icon="openFAQ === faq.id ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                class="w-5 h-5 text-mh-muted flex-shrink-0"
                aria-hidden="true"
              />
            </button>
            
            <div
              v-show="openFAQ === faq.id"
              class="px-6 pb-4 text-mh-muted leading-relaxed"
              v-html="faq.answer"
            ></div>
          </div>
        </div>
      </div>
    </Section>

    <!-- Still Have Questions -->
    <Section
      title="Still Have Questions?"
      description="Can't find what you're looking for? We're here to help answer any questions you may have."
      background="primary"
    >
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <CTAButton
          to="/contact"
          variant="secondary"
          size="lg"
          icon-left="lucide:message-circle"
        >
          Contact Us
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
import { ref, computed } from 'vue'
import Hero from '@/components/Hero.vue'
import Section from '@/components/Section.vue'
import CTAButton from '@/components/CTAButton.vue'
import Icon from '@/components/Icon.vue'
import { useSeo, generatePageMeta } from '@/composables/useSeo'
import { useSchemaOrg } from '@/composables/useSchemaOrg'
import { siteData } from '@/data/site'

// SEO Setup
const seoMeta = generatePageMeta(
  'Frequently Asked Questions',
  'Common questions about our services, insurance, appointments, and what to expect during therapy.',
  '/faq',
  {
    keywords: 'FAQ, questions, insurance, appointments, therapy process, what to expect'
  }
)

useSeo(seoMeta)
const { generateFAQSchema, addSchema } = useSchemaOrg()

const activeCategory = ref('all')
const openFAQ = ref<string | null>(null)

const faqCategories = [
  { id: 'all', name: 'All Questions' },
  { id: 'services', name: 'Services' },
  { id: 'insurance', name: 'Insurance & Payment' },
  { id: 'appointments', name: 'Appointments' },
  { id: 'therapy', name: 'Therapy Process' }
]

const faqs = [
  {
    id: '1',
    category: 'services',
    question: 'What ages do you serve?',
    answer: 'We specialize in early childhood mental health, serving children from birth to 8 years old and their families.'
  },
  {
    id: '2',
    category: 'insurance',
    question: 'Do you accept insurance?',
    answer: `We are an out-of-network provider but can provide documentation for insurance reimbursement. We accept: ${siteData.insurance.accepted.join(', ')}. Please contact your insurance to verify your out-of-network benefits.`
  },
  {
    id: '3',
    category: 'appointments',
    question: 'How do I schedule an appointment?',
    answer: `You can call us at <a href="tel:${siteData.phone}" class="text-mh-primary">${siteData.phone}</a> or email us at <a href="mailto:${siteData.email}" class="text-mh-primary">${siteData.email}</a>. We typically respond within 24 hours during business days.`
  },
  {
    id: '4',
    category: 'therapy',
    question: 'What happens during the first session?',
    answer: 'The first session is a 90-minute consultation where we discuss your family\'s concerns, your child\'s history, and develop a treatment plan. Children may engage in play activities while we talk.'
  },
  {
    id: '5',
    category: 'therapy',
    question: 'How long does therapy typically take?',
    answer: 'The length of therapy varies based on each child\'s needs and goals. Some families see improvement in a few months, while others benefit from longer-term support. We regularly review progress and adjust treatment plans.'
  },
  {
    id: '6',
    category: 'appointments',
    question: 'What is your cancellation policy?',
    answer: 'We require 24-hour notice for cancellations. Appointments cancelled with less than 24 hours notice may be charged the full session fee unless due to emergency or illness.'
  },
  {
    id: '7',
    category: 'services',
    question: 'Do you offer telehealth services?',
    answer: siteData.services.telehealth 
      ? 'Yes, we offer secure telehealth sessions for parent consultations, family therapy, and follow-up appointments. Individual child therapy is typically conducted in-person for optimal effectiveness.'
      : 'Currently, all our services are provided in-person to ensure the best therapeutic outcomes for young children.'
  },
  {
    id: '8',
    category: 'therapy',
    question: 'Do parents participate in therapy sessions?',
    answer: 'Parent involvement is crucial for successful outcomes. Depending on your child\'s age and needs, parents may participate directly in sessions or receive regular updates and coaching on supporting their child at home.'
  },
  {
    id: '9',
    category: 'services',
    question: 'What should I bring to appointments?',
    answer: 'Please bring your insurance cards, a photo ID, any completed intake forms, and any recent reports or evaluations. Your child may bring a comfort item if needed.'
  },
  {
    id: '10',
    category: 'therapy',
    question: 'How do you work with schools?',
    answer: 'With your consent, we collaborate with teachers and school staff to ensure consistent support across settings. We can attend IEP meetings, provide consultation, and develop strategies for school success.'
  },
  {
    id: '11',
    category: 'insurance',
    question: 'What forms of payment do you accept?',
    answer: 'We accept cash, check, and credit cards. Payment is due at the time of service unless other arrangements have been made in advance.'
  },
  {
    id: '12',
    category: 'therapy',
    question: 'Is therapy confidential?',
    answer: 'Yes, therapy is confidential with some exceptions required by law (such as child abuse reporting). We will discuss confidentiality and any limits during your first session.'
  },
  {
    id: '13',
    category: 'appointments',
    question: 'What are your office hours?',
    answer: `Our office hours are: ${Object.entries(siteData.hours).map(([day, hours]) => `${day}: ${hours}`).join(', ')}`
  },
  {
    id: '14',
    category: 'services',
    question: 'What therapeutic approaches do you use?',
    answer: 'We use evidence-based approaches including play therapy, Parent-Child Interaction Therapy (PCIT), trauma-focused CBT, and attachment-based interventions, tailored to each child\'s developmental stage and needs.'
  },
  {
    id: '15',
    category: 'therapy',
    question: 'What if my child doesn\'t want to come to therapy?',
    answer: 'This is common and normal. We use developmentally appropriate, play-based approaches that feel natural to children. We work with families to make therapy a positive experience and address any resistance with patience and understanding.'
  }
]

const filteredFAQs = computed(() => {
  if (activeCategory.value === 'all') {
    return faqs
  }
  return faqs.filter(faq => faq.category === activeCategory.value)
})

function toggleFAQ(id: string) {
  openFAQ.value = openFAQ.value === id ? null : id
}

// Add FAQ schema for SEO
const faqData = faqs.map(faq => ({
  question: faq.question,
  answer: faq.answer.replace(/<[^>]*>/g, '') // Remove HTML tags for schema
}))

addSchema(generateFAQSchema(faqData))</script>
