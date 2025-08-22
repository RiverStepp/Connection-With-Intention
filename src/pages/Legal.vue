<template>
  <div class="legal-page">
    <!-- Hero Section -->
    <Hero
      title="Legal Information"
      subtitle="Privacy & Terms"
      description="Important legal information about our website, privacy practices, and terms of use."
      size="md"
    />

    <!-- Legal Sections -->
    <Section size="lg">
      <div class="max-w-4xl mx-auto space-y-8">
        <!-- Privacy Policy -->
        <Card id="privacy" variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Privacy Policy</h2>
            <p class="text-sm text-mh-muted">Last updated: {{ lastUpdated }}</p>
          </template>
          
          <div class="space-y-6 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Information We Collect</h3>
              <p class="mb-3">We may collect the following types of information when you visit our website:</p>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number when you contact us voluntarily</li>
                <li><strong>Usage Data:</strong> Information about how you use our website (with your consent)</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information for site functionality</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">How We Use Your Information</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>To respond to your inquiries and provide information about our services</li>
                <li>To improve our website and user experience (with your consent)</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Information Sharing</h3>
              <p class="mb-3">We do not sell, trade, or share your personal information with third parties except:</p>
              <ul class="list-disc pl-5 space-y-2">
                <li>With your explicit consent</li>
                <li>As required by law</li>
                <li>To protect our rights and safety</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Cookies and Analytics</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Essential cookies are required for basic website functionality</li>
                <li>Analytics cookies are optional and require your consent</li>
                <li>You can manage cookie preferences using our cookie settings</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibent text-mh-ink mb-3">Data Security</h3>
              <p>
                We implement appropriate security measures to protect your personal information. 
                However, no transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Your Rights</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Access and review personal information we have about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Withdraw consent for optional data processing</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Important Notes</h3>
              <div class="bg-mh-bg border border-mh-border rounded-lg p-4">
                <ul class="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>No PHI Collection:</strong> This website does not collect Protected Health Information (PHI)</li>
                  <li><strong>Not for Emergencies:</strong> This website is not monitored 24/7 and should not be used for emergencies</li>
                  <li><strong>Professional Services:</strong> Information on this website is not a substitute for professional medical advice</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <!-- Terms of Use -->
        <Card id="terms" variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Terms of Use</h2>
            <p class="text-sm text-mh-muted">Last updated: {{ lastUpdated }}</p>
          </template>
          
          <div class="space-y-6 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Acceptance of Terms</h3>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms 
                and provisions of this agreement.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Website Use</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>This website is for informational purposes only</li>
                <li>Content is not intended as medical or professional advice</li>
                <li>Use of this website does not create a therapist-client relationship</li>
                <li>Information should not be used for diagnosing or treating medical conditions</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Prohibited Uses</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Using the website for any unlawful purpose</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Transmitting harmful or malicious code</li>
                <li>Infringing on intellectual property rights</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Content Accuracy</h3>
              <p>
                While we strive to provide accurate and up-to-date information, we make no 
                warranties about the completeness, reliability, or accuracy of this information.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">External Links</h3>
              <p>
                Our website may contain links to external sites. We are not responsible for 
                the content or privacy practices of these external websites.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Limitation of Liability</h3>
              <p>
                {{ siteData.name }} shall not be liable for any damages arising from the use 
                of this website or inability to use this website.
              </p>
            </div>
          </div>
        </Card>

        <!-- Accessibility Statement -->
        <Card id="accessibility" variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Accessibility Statement</h2>
          </template>
          
          <div class="space-y-6 text-mh-muted">
            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Our Commitment</h3>
              <p>
                {{ siteData.name }} is committed to ensuring digital accessibility for people 
                with disabilities. We continually improve the user experience for everyone and 
                apply the relevant accessibility standards.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Standards</h3>
              <p>
                This website aims to conform to WCAG 2.1 Level AA standards. These guidelines 
                explain how to make web content more accessible for people with disabilities.
              </p>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Accessibility Features</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Semantic HTML structure for screen readers</li>
                <li>Keyboard navigation support</li>
                <li>Alt text for images</li>
                <li>Sufficient color contrast ratios</li>
                <li>Resizable text up to 200% without loss of functionality</li>
                <li>Skip navigation links</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Feedback</h3>
              <p class="mb-3">
                If you encounter accessibility barriers on our website, please contact us:
              </p>
              <div class="bg-mh-bg border border-mh-border rounded-lg p-4">
                <ul class="space-y-2 text-sm">
                  <li><strong>Email:</strong> <a :href="`mailto:${siteData.email}`" class="text-mh-primary">{{ siteData.email }}</a></li>
                  <li><strong>Phone:</strong> <a :href="`tel:${siteData.phone}`" class="text-mh-primary">{{ siteData.phone }}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <!-- Disclaimer -->
        <Card id="disclaimer" variant="elevated">
          <template #header>
            <h2 class="font-serif font-semibold text-2xl text-mh-ink mb-4">Non-Emergency Disclaimer</h2>
          </template>
          
          <div class="space-y-4 text-mh-muted">
            <div class="bg-mh-error-100 border border-mh-error-200 rounded-lg p-4">
              <div class="flex items-start gap-3">
                <Icon
                  icon="lucide:alert-triangle"
                  class="w-6 h-6 text-mh-error flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 class="font-semibold text-mh-error mb-2">Emergency Notice</h3>
                  <p class="text-mh-error">
                    <strong>This website is not monitored 24/7 and should not be used for mental health emergencies.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">In Case of Emergency</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li><strong>Immediate danger:</strong> Call 911</li>
                <li><strong>Mental health crisis:</strong> Call 988 (Suicide & Crisis Lifeline)</li>
                <li><strong>Crisis text support:</strong> Text HOME to 741741</li>
                <li><strong>Local crisis services:</strong> Contact your local emergency room</li>
              </ul>
            </div>

            <div>
              <h3 class="font-semibold text-mh-ink mb-3">Medical Disclaimer</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Information on this website is for educational purposes only</li>
                <li>Content is not intended to replace professional medical advice</li>
                <li>Always consult with qualified healthcare providers for medical concerns</li>
                <li>Do not delay seeking medical attention based on website content</li>
              </ul>
            </div>
          </div>
        </Card>

        <!-- Contact Information -->
        <div class="bg-mh-bg border border-mh-border rounded-lg p-6 text-center">
          <Icon
            icon="lucide:shield-check"
            class="w-8 h-8 text-mh-primary mx-auto mb-3"
            aria-hidden="true"
          />
          <h3 class="font-semibold text-mh-ink mb-2">Questions About These Policies?</h3>
          <p class="text-sm text-mh-muted mb-4">
            If you have questions about our privacy practices, terms of use, or accessibility, 
            please contact us.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton
              :href="`mailto:${siteData.email}`"
              variant="outline"
              size="sm"
              icon-left="lucide:mail"
            >
              {{ siteData.email }}
            </CTAButton>
            
            <CTAButton
              :href="`tel:${siteData.phone}`"
              variant="outline"
              size="sm"
              icon-left="lucide:phone"
            >
              {{ siteData.phone }}
            </CTAButton>
          </div>
          
          <p class="text-xs text-mh-muted mt-4">
            <strong>TODO:</strong> Review and customize all legal documents with a qualified attorney 
            to ensure compliance with local laws and regulations.
          </p>
        </div>
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
  'Legal Information',
  'Privacy policy, terms of use, accessibility statement, and other legal information.',
  '/legal',
  {
    keywords: 'privacy policy, terms of use, legal, accessibility, HIPAA, disclaimer'
  }
)

useSeo(seoMeta)

const lastUpdated = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})</script>
