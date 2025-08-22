<template>
  <div class="home-page">
    <!-- Hero Section -->
    <Hero
      title="Nurturing Young Minds, Supporting Families"
      subtitle="Early Childhood Mental Health"
      subtitle-icon="lucide:heart"
      description="Professional, compassionate mental health services for children birth to 8 years. We help families build stronger connections and support healthy development."
      size="xl"
      variant="gradient"
      :primary-action="{
        text: 'Book a Consultation',
        to: '/contact',
        iconLeft: 'lucide:calendar'
      }"
      :secondary-action="{
        text: 'Learn About Services',
        to: '/services',
        iconLeft: 'lucide:heart-handshake'
      }"
      :features="heroFeatures"
    />

    <!-- Services Overview -->
    <Section
      title="Our Services"
      subtitle="How We Help"
      description="Comprehensive early childhood mental health services tailored to your family's unique needs."
      size="lg"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          v-for="service in servicesOverview"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          variant="elevated"
          hover
          class="h-full"
        >
          <template #header>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-12 h-12 bg-mh-primary-100 rounded-xl flex items-center justify-center">
                <Icon
                  :icon="service.icon"
                  class="w-6 h-6 text-mh-primary"
                  aria-hidden="true"
                />
              </div>
              <h3 class="font-serif font-semibold text-xl text-mh-ink">
                {{ service.title }}
              </h3>
            </div>
          </template>
          
          <template #actions>
            <CTAButton
              to="/services"
              variant="ghost"
              size="sm"
              icon-right="lucide:arrow-right"
              class="w-full justify-center"
            >
              Learn More
            </CTAButton>
          </template>
        </Card>
      </div>
      
      <template #footer>
        <div class="text-center">
          <CTAButton
            to="/services"
            variant="primary"
            size="lg"
            icon-right="lucide:arrow-right"
          >
            View All Services
          </CTAButton>
        </div>
      </template>
    </Section>

    <!-- Why Choose Us -->
    <Section
      title="Why Families Choose Us"
      subtitle="Our Approach"
      description="We believe in family-centered care that honors your unique strengths and cultural values."
      background="muted"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div
            v-for="feature in whyChooseUs"
            :key="feature.title"
            class="flex items-start gap-4"
          >
            <div class="w-12 h-12 bg-mh-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon
                :icon="feature.icon"
                class="w-6 h-6 text-mh-accent"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 class="font-semibold text-mh-ink mb-2">{{ feature.title }}</h3>
              <p class="text-mh-muted leading-relaxed">{{ feature.description }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-mh-surface rounded-2xl p-8 shadow-lg">
          <h3 class="font-serif font-semibold text-2xl text-mh-ink mb-6">Our Credentials</h3>
          <ul class="space-y-3">
            <li
              v-for="credential in siteData.credentials"
              :key="credential"
              class="flex items-center gap-3"
            >
              <Icon
                icon="lucide:check-circle"
                class="w-5 h-5 text-mh-success flex-shrink-0"
                aria-hidden="true"
              />
              <span class="text-mh-ink">{{ credential }}</span>
            </li>
          </ul>
        </div>
      </div>
    </Section>

    <!-- Testimonials -->
    <Section
      title="What Families Say"
      subtitle="Testimonials"
      description="Read about the experiences of families we've had the privilege to support."
    >
      <TestimonialCarousel
        :testimonials="featuredTestimonials"
        :autoplay="true"
        :autoplay-interval="6000"
      />
      
      <template #footer>
        <div class="text-center">
          <CTAButton
            to="/testimonials"
            variant="outline"
            icon-right="lucide:arrow-right"
          >
            Read More Testimonials
          </CTAButton>
        </div>
      </template>
    </Section>

    <!-- Insurance & Practical Info -->
    <Section
      title="Insurance & Getting Started"
      subtitle="Practical Information"
      background="muted"
      size="md"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Insurance -->
        <Card variant="elevated" class="h-full">
          <template #header>
            <div class="flex items-center gap-3 mb-4">
              <Icon
                icon="lucide:shield-check"
                class="w-8 h-8 text-mh-primary"
                aria-hidden="true"
              />
              <h3 class="font-serif font-semibold text-xl text-mh-ink">
                Insurance & Payment
              </h3>
            </div>
          </template>
          
          <div class="space-y-4">
            <p class="text-mh-muted">{{ siteData.insurance.note }}</p>
            
            <div>
              <h4 class="font-semibold text-mh-ink mb-2">Insurance Accepted:</h4>
              <ul class="space-y-1">
                <li
                  v-for="insurance in siteData.insurance.accepted"
                  :key="insurance"
                  class="flex items-center gap-2"
                >
                  <Icon
                    icon="lucide:check"
                    class="w-4 h-4 text-mh-success"
                    aria-hidden="true"
                  />
                  <span class="text-mh-ink">{{ insurance }}</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Contact Info -->
        <Card variant="elevated" class="h-full">
          <template #header>
            <div class="flex items-center gap-3 mb-4">
              <Icon
                icon="lucide:phone"
                class="w-8 h-8 text-mh-primary"
                aria-hidden="true"
              />
              <h3 class="font-serif font-semibold text-xl text-mh-ink">
                Contact Information
              </h3>
            </div>
          </template>
          
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Icon
                icon="lucide:phone"
                class="w-5 h-5 text-mh-accent"
                aria-hidden="true"
              />
              <a
                :href="`tel:${siteData.phone}`"
                class="text-mh-ink hover:text-mh-primary transition-colors no-underline font-medium"
              >
                {{ siteData.phone }}
              </a>
            </div>
            
            <div class="flex items-center gap-3">
              <Icon
                icon="lucide:mail"
                class="w-5 h-5 text-mh-accent"
                aria-hidden="true"
              />
              <a
                :href="`mailto:${siteData.email}`"
                class="text-mh-ink hover:text-mh-primary transition-colors no-underline"
              >
                {{ siteData.email }}
              </a>
            </div>
            
            <div class="pt-4 border-t border-mh-border">
              <h4 class="font-semibold text-mh-ink mb-2">Office Hours:</h4>
              <div class="space-y-1 text-sm">
                <div v-for="(hours, day) in siteData.hours" :key="day" class="flex justify-between">
                  <span class="text-mh-muted">{{ day }}:</span>
                  <span class="text-mh-ink">{{ hours }}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Section>

    <!-- Call to Action -->
    <Section
      title="Ready to Get Started?"
      description="Take the first step toward supporting your child's mental health and your family's wellbeing."
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
import { onMounted } from 'vue'
import Hero from '@/components/Hero.vue'
import Section from '@/components/Section.vue'
import Card from '@/components/Card.vue'
import CTAButton from '@/components/CTAButton.vue'
import Icon from '@/components/Icon.vue'
import TestimonialCarousel from '@/components/TestimonialCarousel.vue'
import { useSeo, generatePageMeta } from '@/composables/useSeo'
import { useSchemaOrg } from '@/composables/useSchemaOrg'
import { siteData } from '@/data/site'

// SEO Setup
const seoMeta = generatePageMeta(
  'Early Childhood Mental Health Services',
  'Professional mental health services specializing in early childhood development. Compassionate, evidence-based therapy for children and families.',
  '/',
  {
    keywords: 'early childhood mental health, child therapy, family therapy, child psychologist, developmental therapy, parent coaching',
    ogType: 'website'
  }
)

useSeo(seoMeta)
useSchemaOrg()

// Hero Features
const heroFeatures = [
  {
    title: 'Ages Birth-8',
    description: 'Specialized in early childhood',
    icon: 'lucide:baby'
  },
  {
    title: 'Family-Centered',
    description: 'Supporting the whole family',
    icon: 'lucide:users'
  },
  {
    title: 'Evidence-Based',
    description: 'Proven therapeutic approaches',
    icon: 'lucide:award'
  }
]

// Services Overview
const servicesOverview = [
  {
    title: 'Individual Therapy',
    description: 'One-on-one therapy sessions tailored to your child\'s developmental stage and needs.',
    icon: 'lucide:user'
  },
  {
    title: 'Parent Coaching',
    description: 'Support and strategies for parents to strengthen family relationships and manage challenges.',
    icon: 'lucide:users'
  },
  {
    title: 'Comprehensive Assessments',
    description: 'Thorough evaluations to understand your child\'s strengths and areas for growth.',
    icon: 'lucide:clipboard-list'
  },
  {
    title: 'Family Therapy',
    description: 'Sessions focused on improving communication and connection within the family system.',
    icon: 'lucide:home'
  },
  {
    title: 'Group Programs',
    description: 'Social skills groups and parent support groups to build community connections.',
    icon: 'lucide:users-round'
  },
  {
    title: 'School Collaboration',
    description: 'Working with educators to support your child\'s success in educational settings.',
    icon: 'lucide:graduation-cap'
  }
]

// Why Choose Us
const whyChooseUs = [
  {
    title: 'Specialized Expertise',
    description: 'Advanced training in early childhood mental health with a deep understanding of developmental needs.',
    icon: 'lucide:brain'
  },
  {
    title: 'Family-Centered Approach',
    description: 'We work with the whole family system, recognizing that children thrive when families are supported.',
    icon: 'lucide:heart'
  },
  {
    title: 'Cultural Responsiveness',
    description: 'We honor and integrate your family\'s cultural values and traditions into our therapeutic approach.',
    icon: 'lucide:globe'
  },
  {
    title: 'Flexible Service Options',
    description: 'In-person and telehealth options available to meet your family\'s needs and preferences.',
    icon: 'lucide:settings'
  }
]

// Featured Testimonials
const featuredTestimonials = [
  {
    id: '1',
    content: 'The support we received helped our family through a very difficult time. Our therapist understood our child\'s needs and gave us practical tools that really worked.',
    name: 'Sarah M.',
    relationship: 'Parent of 4-year-old',
    location: 'Local Family'
  },
  {
    id: '2',
    content: 'I was worried about finding someone who would understand our family\'s cultural background. The care we received was respectful and tailored to our values.',
    name: 'Maria G.',
    relationship: 'Parent of 6-year-old',
    location: 'Local Family'
  },
  {
    id: '3',
    content: 'The play therapy sessions helped our daughter express her feelings in ways she couldn\'t with words. We saw positive changes within just a few weeks.',
    name: 'Jennifer L.',
    relationship: 'Parent of 3-year-old',
    location: 'Local Family'
  }
]

onMounted(() => {
  console.log('Home page loaded')
})</script>
