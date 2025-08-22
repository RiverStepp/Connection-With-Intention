<template>
  <div class="about-page">
    <!-- Hero Section -->
    <Hero
      title="About Our Practice"
      subtitle="Meet Your Therapist"
      description="Learn about our approach to early childhood mental health and our commitment to supporting families."
      size="lg"
    />

    <!-- Practitioner Bio -->
    <Section title="Your Mental Health Partner" size="lg">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Photo & Contact -->
        <div class="lg:col-span-1">
          <div class="bg-mh-surface rounded-2xl p-6 text-center shadow-lg">
            <!-- Placeholder for practitioner photo -->
            <div class="w-48 h-48 bg-mh-accent-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Icon
                icon="lucide:user"
                class="w-24 h-24 text-mh-accent"
                aria-hidden="true"
              />
            </div>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-2">
              Dr. Jane Smith, LCSW
            </h2>
            <p class="text-mh-muted mb-6">
              Licensed Clinical Social Worker<br>
              Early Childhood Mental Health Specialist
            </p>
            
            <div class="space-y-3">
              <CTAButton
                :href="`tel:${siteData.phone}`"
                variant="primary"
                size="sm"
                icon-left="lucide:phone"
                class="w-full"
              >
                {{ siteData.phone }}
              </CTAButton>
              
              <CTAButton
                :href="`mailto:${siteData.email}`"
                variant="outline"
                size="sm"
                icon-left="lucide:mail"
                class="w-full"
              >
                Email
              </CTAButton>
            </div>
          </div>
        </div>

        <!-- Bio Content -->
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h3 class="font-serif font-semibold text-xl text-mh-ink mb-3">My Approach</h3>
            <p class="text-mh-muted leading-relaxed mb-4">
              I believe that every child and family has inherent strengths and the capacity for growth and healing. 
              My approach is grounded in attachment theory, trauma-informed care, and culturally responsive practice. 
              I work collaboratively with families to understand their unique story and develop interventions that 
              honor their values and support their goals.
            </p>
            <p class="text-mh-muted leading-relaxed">
              <strong>TODO:</strong> Replace with actual practitioner bio, photo, and credentials. 
              Include specific therapeutic modalities, years of experience, and personal philosophy.
            </p>
          </div>

          <div>
            <h3 class="font-serif font-semibold text-xl text-mh-ink mb-3">Training & Specializations</h3>
            <p class="text-mh-muted leading-relaxed mb-4">
              I hold a Master's degree in Clinical Social Work and have specialized training in several 
              evidence-based interventions for children and families. My areas of expertise include:
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="specialty in siteData.specialties"
                :key="specialty"
                class="flex items-center gap-3"
              >
                <Icon
                  icon="lucide:check-circle"
                  class="w-5 h-5 text-mh-success flex-shrink-0"
                  aria-hidden="true"
                />
                <span class="text-mh-ink">{{ specialty }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-serif font-semibold text-xl text-mh-ink mb-3">Professional Philosophy</h3>
            <p class="text-mh-muted leading-relaxed">
              I am committed to creating a safe, welcoming space where children and families can explore, 
              learn, and grow together. I believe in the power of play, the importance of relationships, 
              and the resilience that exists within every family system.
            </p>
          </div>
        </div>
      </div>
    </Section>

    <!-- Credentials & Certifications -->
    <Section
      title="Professional Credentials"
      background="muted"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="credential in siteData.credentials"
          :key="credential"
          variant="elevated"
          class="text-center"
        >
          <Icon
            icon="lucide:award"
            class="w-12 h-12 text-mh-primary mx-auto mb-4"
            aria-hidden="true"
          />
          <h3 class="font-semibold text-mh-ink">{{ credential }}</h3>
        </Card>
      </div>
    </Section>

    <!-- Therapeutic Approaches -->
    <Section title="Therapeutic Approaches">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="approach in therapeuticApproaches"
          :key="approach.name"
          class="text-center"
        >
          <div class="w-16 h-16 bg-mh-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon
              :icon="approach.icon"
              class="w-8 h-8 text-mh-accent"
              aria-hidden="true"
            />
          </div>
          <h3 class="font-serif font-semibold text-lg text-mh-ink mb-2">{{ approach.name }}</h3>
          <p class="text-mh-muted text-sm leading-relaxed">{{ approach.description }}</p>
        </div>
      </div>
    </Section>

    <!-- Professional Associations -->
    <Section
      title="Professional Associations"
      subtitle="Continuing Education & Community"
      background="muted"
      size="sm"
    >
      <div class="text-center space-y-4">
        <p class="text-mh-muted max-w-2xl mx-auto">
          I maintain active memberships in professional organizations to stay current with 
          best practices and connect with the broader mental health community.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4 text-sm text-mh-ink">
          <span class="bg-mh-surface px-4 py-2 rounded-lg border border-mh-border">
            American Professional Society on the Abuse of Children (APSAC)
          </span>
          <span class="bg-mh-surface px-4 py-2 rounded-lg border border-mh-border">
            National Association of Social Workers (NASW)
          </span>
          <span class="bg-mh-surface px-4 py-2 rounded-lg border border-mh-border">
            Zero to Three: National Center for Infants, Toddlers, and Families
          </span>
        </div>
        
        <p class="text-xs text-mh-muted">
          <strong>TODO:</strong> Update with actual professional associations and memberships
        </p>
      </div>
    </Section>

    <!-- Call to Action -->
    <Section
      title="Ready to Connect?"
      description="I would be honored to support your family on this journey. Reach out to schedule a consultation."
      background="primary"
      size="md"
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
          to="/services"
          variant="accent"
          size="lg"
          icon-left="lucide:heart-handshake"
        >
          Learn About Services
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
  'About Our Practice',
  'Learn about our approach to early childhood mental health, credentials, and commitment to supporting children and families.',
  '/about',
  {
    keywords: 'child therapist, credentials, experience, early childhood development, family-centered care, LCSW'
  }
)

useSeo(seoMeta)
const { generateAboutPageSchema, addSchema } = useSchemaOrg()

// Add About page specific schema
addSchema(generateAboutPageSchema())

// Therapeutic Approaches
const therapeuticApproaches = [
  {
    name: 'Play Therapy',
    description: 'Using play as the natural language of children to process emotions and experiences.',
    icon: 'lucide:gamepad-2'
  },
  {
    name: 'Parent-Child Interaction Therapy (PCIT)',
    description: 'Evidence-based treatment that strengthens parent-child relationships and reduces behavioral problems.',
    icon: 'lucide:users'
  },
  {
    name: 'Trauma-Focused CBT',
    description: 'Specialized approach for children who have experienced trauma, helping them process and heal.',
    icon: 'lucide:shield-heart'
  },
  {
    name: 'Attachment-Based Therapy',
    description: 'Focusing on building secure relationships between children and their caregivers.',
    icon: 'lucide:heart'
  },
  {
    name: 'Family Systems Therapy',
    description: 'Understanding and addressing patterns within the family system to promote healing.',
    icon: 'lucide:home'
  },
  {
    name: 'Mindfulness-Based Interventions',
    description: 'Age-appropriate techniques to help children develop emotional regulation skills.',
    icon: 'lucide:brain'
  }
]</script>
