<template>
  <div class="resources-page">
    <!-- Hero Section -->
    <Hero
      title="Resources for Families"
      subtitle="Support & Education"
      description="Helpful resources, crisis support, and educational materials for parents and families."
      size="lg"
    />

    <!-- Crisis Resources -->
    <Section id="crisis" title="Crisis Resources" subtitle="Immediate Support">
      <div class="bg-mh-error-100 border-2 border-mh-error-200 rounded-xl p-6 mb-8">
        <div class="text-center mb-6">
          <Icon
            icon="lucide:phone"
            class="w-12 h-12 text-mh-error mx-auto mb-3"
            aria-hidden="true"
          />
          <h3 class="font-serif font-semibold text-xl text-mh-error mb-2">
            If you are in crisis, get help immediately
          </h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="text-center">
            <h4 class="font-semibold text-mh-error mb-2">Emergency Services</h4>
            <CTAButton
              href="tel:911"
              variant="primary"
              size="lg"
              icon-left="lucide:phone"
              class="w-full bg-mh-error hover:bg-mh-error-900"
            >
              Call 911
            </CTAButton>
          </div>
          
          <div class="text-center">
            <h4 class="font-semibold text-mh-error mb-2">Crisis Lifeline</h4>
            <CTAButton
              href="tel:988"
              variant="primary"
              size="lg"
              icon-left="lucide:heart-pulse"
              class="w-full bg-mh-error hover:bg-mh-error-900"
            >
              Call 988
            </CTAButton>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="resource in crisisResources"
          :key="resource.name"
          :title="resource.name"
          :description="resource.description"
          variant="elevated"
        >
          <template #actions>
            <div class="space-y-2">
              <CTAButton
                v-if="resource.phone"
                :href="`tel:${resource.phone}`"
                variant="primary"
                size="sm"
                icon-left="lucide:phone"
                class="w-full"
              >
                {{ resource.phone }}
              </CTAButton>
              
              <CTAButton
                v-if="resource.website"
                :href="resource.website"
                target="_blank"
                variant="outline"
                size="sm"
                icon-left="lucide:external-link"
                class="w-full"
              >
                Visit Website
              </CTAButton>
            </div>
          </template>
        </Card>
      </div>
    </Section>

    <!-- Parenting Resources -->
    <Section id="guides" title="Parenting Guides" subtitle="Educational Resources" background="muted">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="guide in parentingGuides"
          :key="guide.title"
          :title="guide.title"
          :description="guide.description"
          variant="elevated"
          hover
        >
          <template #header>
            <div class="flex items-center gap-3 mb-3">
              <Icon
                :icon="guide.icon"
                class="w-8 h-8 text-mh-primary"
                aria-hidden="true"
              />
              <div>
                <h3 class="font-serif font-semibold text-lg text-mh-ink">{{ guide.title }}</h3>
                <p class="text-sm text-mh-accent">{{ guide.ageRange }}</p>
              </div>
            </div>
          </template>

          <template #actions>
            <CTAButton
              :href="guide.link"
              target="_blank"
              variant="outline"
              size="sm"
              icon-right="lucide:external-link"
              class="w-full"
            >
              Read More
            </CTAButton>
          </template>
        </Card>
      </div>
    </Section>

    <!-- Professional Resources -->
    <Section title="Professional Resources" subtitle="For Providers">
      <div class="max-w-4xl mx-auto">
        <div class="bg-mh-surface border border-mh-border rounded-xl p-6">
          <h3 class="font-serif font-semibold text-xl text-mh-ink mb-4">For Healthcare Providers</h3>
          <p class="text-mh-muted mb-6">
            Resources and referral information for pediatricians, teachers, and other professionals 
            working with young children and families.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-mh-ink mb-3">Referral Process</h4>
              <ul class="space-y-2 text-sm text-mh-muted">
                <li class="flex items-start gap-2">
                  <Icon icon="lucide:check" class="w-4 h-4 text-mh-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  Call or email for consultation
                </li>
                <li class="flex items-start gap-2">
                  <Icon icon="lucide:check" class="w-4 h-4 text-mh-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  Collaborative care planning
                </li>
                <li class="flex items-start gap-2">
                  <Icon icon="lucide:check" class="w-4 h-4 text-mh-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  Regular progress updates
                </li>
                <li class="flex items-start gap-2">
                  <Icon icon="lucide:check" class="w-4 h-4 text-mh-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  School consultation available
                </li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold text-mh-ink mb-3">Contact Information</h4>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2">
                  <Icon icon="lucide:phone" class="w-4 h-4 text-mh-primary" aria-hidden="true" />
                  <a :href="`tel:${siteData.phone}`" class="text-mh-primary hover:text-mh-primary-800">
                    {{ siteData.phone }}
                  </a>
                </div>
                <div class="flex items-center gap-2">
                  <Icon icon="lucide:mail" class="w-4 h-4 text-mh-primary" aria-hidden="true" />
                  <a :href="`mailto:${siteData.email}`" class="text-mh-primary hover:text-mh-primary-800">
                    {{ siteData.email }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <!-- External Resources -->
    <Section title="Additional Resources" background="muted">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          v-for="resource in externalResources"
          :key="resource.name"
          :title="resource.name"
          :description="resource.description"
          variant="elevated"
        >
          <template #actions>
            <CTAButton
              :href="resource.website"
              target="_blank"
              variant="outline"
              size="sm"
              icon-right="lucide:external-link"
              class="w-full"
            >
              Visit {{ resource.name }}
            </CTAButton>
          </template>
        </Card>
      </div>
    </Section>

    <!-- Contact for More Resources -->
    <Section
      title="Need More Support?"
      description="Can't find what you're looking for? Contact us and we'll help connect you with additional resources."
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
import Hero from '@/components/Hero.vue'
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import CTAButton from '@/components/CTAButton.vue'
import Icon from '@/components/Icon.vue'
import { useSeo, generatePageMeta } from '@/composables/useSeo'
import { siteData, emergencyContacts } from '@/data/site'

// SEO Setup
const seoMeta = generatePageMeta(
  'Mental Health Resources',
  'Helpful resources for parents and families including crisis support, parenting guides, and educational materials.',
  '/resources',
  {
    keywords: 'parenting resources, crisis support, mental health resources, family guides, child development'
  }
)

useSeo(seoMeta)

// Crisis Resources
const crisisResources = [
  {
    name: 'Crisis Text Line',
    description: 'Free, 24/7 crisis support via text message',
    phone: '741741',
    website: 'https://www.crisistextline.org'
  },
  {
    name: 'National Child Abuse Hotline',
    description: 'Support for families and mandated reporting',
    phone: '1-800-4-A-CHILD',
    website: 'https://www.childhelp.org'
  },
  {
    name: 'Local Crisis Services',
    description: 'Community-based crisis intervention and support',
    phone: emergencyContacts.localCrisis,
    website: '#'
  }
]

// Parenting Guides
const parentingGuides = [
  {
    title: 'Understanding Tantrums',
    description: 'Why tantrums happen and how to respond with compassion and boundaries',
    ageRange: 'Ages 1-5',
    icon: 'lucide:heart',
    link: 'https://zerotothree.org/resource/tantrums'
  },
  {
    title: 'Building Emotional Vocabulary',
    description: 'Help your child identify and express their feelings',
    ageRange: 'Ages 2-8',
    icon: 'lucide:message-circle',
    link: 'https://www.healthychildren.org/English/healthy-living/emotional-wellness'
  },
  {
    title: 'Sleep Strategies',
    description: 'Creating healthy sleep routines for better family wellbeing',
    ageRange: 'All ages',
    icon: 'lucide:moon',
    link: 'https://www.sleepfoundation.org/children-and-sleep'
  },
  {
    title: 'Managing Screen Time',
    description: 'Balanced approach to technology and media use',
    ageRange: 'Ages 2-8',
    icon: 'lucide:smartphone',
    link: 'https://www.aap.org/en/patient-care/media-and-children'
  },
  {
    title: 'Preparing for School',
    description: 'Supporting your child\'s transition to educational settings',
    ageRange: 'Ages 3-6',
    icon: 'lucide:backpack',
    link: 'https://www.naeyc.org/our-work/families'
  },
  {
    title: 'Divorce and Separation',
    description: 'Helping children cope with family changes',
    ageRange: 'All ages',
    icon: 'lucide:users',
    link: 'https://www.healthychildren.org/English/family-life/family-dynamics'
  }
]

// External Resources
const externalResources = [
  {
    name: 'Zero to Three',
    description: 'National organization focused on infant and toddler development',
    website: 'https://zerotothree.org'
  },
  {
    name: 'American Academy of Pediatrics',
    description: 'Healthy Children resources for parents',
    website: 'https://www.healthychildren.org'
  },
  {
    name: 'Child Mind Institute',
    description: 'Mental health resources and educational materials',
    website: 'https://childmind.org'
  },
  {
    name: 'National Association for the Education of Young Children',
    description: 'Early childhood education resources and guidance',
    website: 'https://www.naeyc.org'
  }
]</script>
