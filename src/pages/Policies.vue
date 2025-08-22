<template>
  <div class="policies-page">
    <!-- Hero Section -->
    <Hero
      title="Practice Policies"
      subtitle="Important Information"
      description="Please review our practice policies to understand our procedures and expectations."
      size="md"
    />

    <!-- Policies Content -->
    <Section size="lg">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Appointment Policies -->
        <Card variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Appointment Policies</h2>
          </template>
          
          <div class="space-y-4 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Scheduling</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Appointments can be scheduled by calling {{ siteData.phone }} or emailing {{ siteData.email }}</li>
                <li>We typically respond to scheduling requests within 24 hours during business days</li>
                <li>Regular appointment times are recommended for consistency</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Cancellation Policy</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>24-hour notice is required for all cancellations or rescheduling</li>
                <li>Appointments cancelled with less than 24 hours notice will be charged the full session fee</li>
                <li>Emergency situations and illness are considered on a case-by-case basis</li>
                <li>Repeated late cancellations may result in termination of services</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Late Arrivals</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Please arrive 5-10 minutes before your scheduled appointment</li>
                <li>Sessions will end at the scheduled time regardless of late arrival</li>
                <li>You will be charged for the full session time</li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Payment & Insurance -->
        <Card variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Payment & Insurance</h2>
          </template>
          
          <div class="space-y-4 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Payment</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Payment is due at the time of service unless other arrangements have been made</li>
                <li>We accept cash, check, and credit cards</li>
                <li>Returned checks will incur a $35 processing fee</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Insurance</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>We are an out-of-network provider for most insurance plans</li>
                <li>We will provide documentation for insurance reimbursement upon request</li>
                <li>Clients are responsible for understanding their insurance benefits</li>
                <li>Payment is still due at time of service regardless of insurance coverage</li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Confidentiality -->
        <Card variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Confidentiality & Privacy</h2>
          </template>
          
          <div class="space-y-4 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-2">General Confidentiality</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>All therapy sessions and records are confidential and protected by law</li>
                <li>Information will not be shared without written consent except as required by law</li>
                <li>Parents/guardians have access to their minor children's treatment information</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Legal Exceptions</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Suspected child abuse or neglect must be reported to authorities</li>
                <li>If there is serious risk of harm to self or others</li>
                <li>If ordered by a court of law</li>
                <li>For emergency medical treatment</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Communication</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Email and text messages are not considered confidential</li>
                <li>Please do not send sensitive information via email or text</li>
                <li>Voicemail messages should not contain detailed personal information</li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Emergency Procedures -->
        <Card variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Emergency Procedures</h2>
          </template>
          
          <div class="space-y-4 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Mental Health Emergencies</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Call 911 for immediate danger to self or others</li>
                <li>Call 988 (Suicide & Crisis Lifeline) for crisis support</li>
                <li>Go to your nearest emergency room if needed</li>
                <li>This practice does not provide 24-hour crisis services</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">After-Hours Contact</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Non-emergency messages can be left on our voicemail</li>
                <li>Messages will be returned during the next business day</li>
                <li>For urgent matters, please call your physician or crisis services</li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Professional Standards -->
        <Card variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Professional Standards</h2>
          </template>
          
          <div class="space-y-4 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Dual Relationships</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>We maintain professional boundaries to ensure effective treatment</li>
                <li>Social or business relationships outside therapy are not appropriate</li>
                <li>Gifts should be minimal and symbolic only</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Records</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Clinical records are maintained according to professional standards</li>
                <li>Records are kept for 7 years after termination of services</li>
                <li>Clients have the right to access their records</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Termination of Services</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Either party may terminate services with appropriate notice</li>
                <li>Referrals will be provided when terminating services</li>
                <li>Records will be transferred to new providers upon written request</li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Office Policies -->
        <Card variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Office Policies</h2>
          </template>
          
          <div class="space-y-4 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Office Environment</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Please supervise your children in the waiting area at all times</li>
                <li>Food and drinks are allowed but please clean up after yourselves</li>
                <li>Cell phones should be silenced during sessions</li>
                <li>Smoking is not permitted anywhere on the premises</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-2">Health & Safety</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Please reschedule if you or your child are feeling unwell</li>
                <li>Let us know about any contagious illnesses in advance</li>
                <li>Follow any current health guidelines or protocols</li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Acknowledgment -->
        <div class="bg-mh-bg border border-mh-border rounded-lg p-6 text-center">
          <Icon
            icon="lucide:file-text"
            class="w-8 h-8 text-mh-primary mx-auto mb-3"
            aria-hidden="true"
          />
          <h3 class="font-semibold text-mh-ink mb-2">Policy Acknowledgment</h3>
          <p class="text-sm text-mh-muted mb-4">
            By scheduling and attending appointments, you acknowledge that you have read, 
            understood, and agree to these policies. These policies will be reviewed 
            during your first appointment.
          </p>
          <p class="text-xs text-mh-muted">
            <strong>TODO:</strong> Customize policies according to your specific practice requirements and local regulations.
          </p>
        </div>
      </div>
    </Section>

    <!-- Questions -->
    <Section
      title="Questions About Our Policies?"
      description="If you have any questions about our policies, please don't hesitate to contact us."
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
import { siteData } from '@/data/site'

// SEO Setup
const seoMeta = generatePageMeta(
  'Practice Policies',
  'Important information about our practice policies, cancellation procedures, and guidelines.',
  '/policies',
  {
    keywords: 'practice policies, cancellation policy, guidelines, procedures, confidentiality'
  }
)

useSeo(seoMeta)</script>
