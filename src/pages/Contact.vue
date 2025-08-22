<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <Hero
      title="Get in Touch"
      subtitle="Contact Us"
      description="Ready to take the first step? We're here to answer your questions and help you get started."
      size="md"
    />

    <!-- Contact Information & Form -->
    <Section size="lg">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <div>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-6">Contact Information</h2>
            
            <div class="space-y-6">
              <!-- Phone -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-mh-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon icon="lucide:phone" class="w-6 h-6 text-mh-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="font-semibold text-mh-ink mb-1">Phone</h3>
                  <a
                    :href="`tel:${siteData.phone}`"
                    class="text-mh-primary hover:text-mh-primary-800 transition-colors no-underline text-lg font-medium"
                  >
                    {{ siteData.phone }}
                  </a>
                  <p class="text-sm text-mh-muted mt-1">
                    Call for immediate assistance or to schedule an appointment
                  </p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-mh-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon icon="lucide:mail" class="w-6 h-6 text-mh-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="font-semibold text-mh-ink mb-1">Email</h3>
                  <a
                    :href="`mailto:${siteData.email}`"
                    class="text-mh-primary hover:text-mh-primary-800 transition-colors no-underline"
                  >
                    {{ siteData.email }}
                  </a>
                  <p class="text-sm text-mh-muted mt-1">
                    Send us a message (please note: no PHI via email)
                  </p>
                </div>
              </div>

              <!-- Address -->
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-mh-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon icon="lucide:map-pin" class="w-6 h-6 text-mh-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="font-semibold text-mh-ink mb-1">Office Location</h3>
                  <address class="text-mh-muted not-italic leading-relaxed">
                    {{ formatAddress(siteData.address) }}
                  </address>
                  <p class="text-sm text-mh-muted mt-1">
                    <strong>TODO:</strong> Update with actual office address
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Office Hours -->
          <div>
            <h3 class="font-serif font-semibold text-xl text-mh-ink mb-4">Office Hours</h3>
            <div class="bg-mh-surface border border-mh-border rounded-lg p-4">
              <div class="space-y-2">
                <div v-for="(hours, day) in siteData.hours" :key="day" class="flex justify-between">
                  <span class="text-mh-muted">{{ day }}:</span>
                  <span class="text-mh-ink font-medium">{{ hours }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Emergency Notice -->
          <div class="bg-mh-error-100 border border-mh-error-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <Icon
                icon="lucide:alert-triangle"
                class="w-6 h-6 text-mh-error flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h4 class="font-semibold text-mh-error mb-2">Emergency Notice</h4>
                <p class="text-sm text-mh-error">
                  If you are experiencing a mental health emergency, please call 911 or 
                  <a href="tel:988" class="underline font-medium">988 (Suicide & Crisis Lifeline)</a> 
                  immediately. This website is not monitored 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-6">Send Us a Message</h2>
          <ContactFormLite />
        </div>
      </div>
    </Section>

    <!-- Map Section -->
    <Section
      title="Find Our Office"
      subtitle="Location"
      background="muted"
    >
      <div class="max-w-4xl mx-auto">
        <MapEmbed
          :height="400"
          :show-address="true"
          :auto-load="false"
        />
        
        <!-- Directions & Parking -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card variant="elevated">
            <template #header>
              <div class="flex items-center gap-3 mb-4">
                <Icon icon="lucide:car" class="w-6 h-6 text-mh-primary" aria-hidden="true" />
                <h3 class="font-semibold text-mh-ink">Parking & Access</h3>
              </div>
            </template>
            
            <ul class="space-y-2 text-sm text-mh-muted">
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Free parking available on-site
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Wheelchair accessible entrance
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Elevator access to second floor
              </li>
              <li class="flex items-center gap-2">
                <Icon icon="lucide:check" class="w-4 h-4 text-mh-success" aria-hidden="true" />
                Family-friendly waiting area
              </li>
            </ul>
            
            <p class="text-xs text-mh-muted mt-4">
              <strong>TODO:</strong> Update with actual parking and accessibility information
            </p>
          </Card>

          <Card variant="elevated">
            <template #header>
              <div class="flex items-center gap-3 mb-4">
                <Icon icon="lucide:directions" class="w-6 h-6 text-mh-primary" aria-hidden="true" />
                <h3 class="font-semibold text-mh-ink">Getting Here</h3>
              </div>
            </template>
            
            <div class="space-y-3 text-sm text-mh-muted">
              <p>Our office is conveniently located with easy access from major highways.</p>
              
              <div>
                <h4 class="font-medium text-mh-ink mb-1">Public Transportation:</h4>
                <p>Bus routes available nearby (check local transit for current schedules)</p>
              </div>
              
              <div>
                <h4 class="font-medium text-mh-ink mb-1">From Downtown:</h4>
                <p>Approximately 15-minute drive via Main Street</p>
              </div>
            </div>
            
            <p class="text-xs text-mh-muted mt-4">
              <strong>TODO:</strong> Add specific directions and transportation options
            </p>
          </Card>
        </div>
      </div>
    </Section>

    <!-- What to Expect -->
    <Section
      title="What to Expect"
      subtitle="Your First Visit"
    >
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-mh-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-mh-accent">1</span>
            </div>
            <h3 class="font-serif font-semibold text-lg text-mh-ink mb-2">Initial Contact</h3>
            <p class="text-mh-muted text-sm leading-relaxed">
              Call or email to schedule your initial consultation. We'll discuss your concerns and answer any questions.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-mh-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-mh-accent">2</span>
            </div>
            <h3 class="font-serif font-semibold text-lg text-mh-ink mb-2">First Appointment</h3>
            <p class="text-mh-muted text-sm leading-relaxed">
              During your 90-minute consultation, we'll discuss your family's needs and develop a personalized treatment plan.
            </p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-mh-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-mh-accent">3</span>
            </div>
            <h3 class="font-serif font-semibold text-lg text-mh-ink mb-2">Ongoing Support</h3>
            <p class="text-mh-muted text-sm leading-relaxed">
              Regular sessions and ongoing support to help your child and family reach your goals.
            </p>
          </div>
        </div>

        <!-- What to Bring -->
        <div class="mt-12 bg-mh-bg rounded-xl p-6">
          <h3 class="font-serif font-semibold text-xl text-mh-ink mb-4 text-center">What to Bring</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-mh-ink mb-2">For Your Child:</h4>
              <ul class="space-y-1 text-sm text-mh-muted">
                <li>• Comfort item if needed</li>
                <li>• Any recent school reports</li>
                <li>• List of current medications</li>
                <li>• Previous evaluation reports</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-mh-ink mb-2">For Parents:</h4>
              <ul class="space-y-1 text-sm text-mh-muted">
                <li>• Insurance cards</li>
                <li>• Photo identification</li>
                <li>• Questions or concerns list</li>
                <li>• Completed intake forms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>

    <!-- Call to Action -->
    <Section
      title="Ready to Schedule?"
      description="We're here to support your family's journey toward greater wellbeing and connection."
      background="primary"
    >
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <CTAButton
          :href="`tel:${siteData.phone}`"
          variant="secondary"
          size="lg"
          icon-left="lucide:phone"
        >
          Call {{ siteData.phone }}
        </CTAButton>
        
        <CTAButton
          :href="`mailto:${siteData.email}`"
          variant="accent"
          size="lg"
          icon-left="lucide:mail"
        >
          Send Email
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
import ContactFormLite from '@/components/ContactFormLite.vue'
import MapEmbed from '@/components/MapEmbed.vue'
import { useSeo, generatePageMeta } from '@/composables/useSeo'
import { useSchemaOrg } from '@/composables/useSchemaOrg'
import { siteData } from '@/data/site'
import { formatAddress } from '@/utils/formatters'

// SEO Setup
const seoMeta = generatePageMeta(
  'Contact Us',
  'Get in touch to schedule a consultation or learn more about our early childhood mental health services.',
  '/contact',
  {
    keywords: 'contact, appointment, consultation, schedule, phone, email, office location'
  }
)

useSeo(seoMeta)
const { generateContactPageSchema, addSchema } = useSchemaOrg()

// Add Contact page specific schema
addSchema(generateContactPageSchema())</script>
