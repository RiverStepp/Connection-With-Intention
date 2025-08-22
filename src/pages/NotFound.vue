<template>
  <div class="not-found-page">
    <!-- 404 Content -->
    <Section size="xl" class="text-center">
      <div class="max-w-2xl mx-auto">
        <!-- 404 Visual -->
        <div class="mb-8">
          <div class="text-8xl md:text-9xl font-bold text-mh-primary-200 mb-4">404</div>
          <Icon
            icon="lucide:map-pin-off"
            class="w-24 h-24 text-mh-muted mx-auto"
            aria-hidden="true"
          />
        </div>

        <!-- Error Message -->
        <h1 class="font-serif font-bold text-3xl md:text-4xl text-mh-ink mb-4">
          Page Not Found
        </h1>
        
        <p class="text-lg text-mh-muted mb-8 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved. 
          Let's help you find what you're looking for.
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <CTAButton
            to="/"
            variant="primary"
            size="lg"
            icon-left="lucide:home"
          >
            Go Home
          </CTAButton>
          
          <CTAButton
            to="/contact"
            variant="outline"
            size="lg"
            icon-left="lucide:message-circle"
          >
            Contact Us
          </CTAButton>
        </div>

        <!-- Helpful Links -->
        <div class="bg-mh-bg border border-mh-border rounded-xl p-6">
          <h2 class="font-serif font-semibold text-xl text-mh-ink mb-4">
            Popular Pages
          </h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <router-link
              v-for="link in popularPages"
              :key="link.path"
              :to="link.path"
              class="flex items-center gap-3 p-3 bg-mh-surface border border-mh-border rounded-lg hover:border-mh-primary hover:bg-mh-primary-50 transition-colors page-link no-underline"
            >
              <Icon
                :icon="link.icon"
                class="w-5 h-5 text-mh-primary"
                aria-hidden="true"
              />
              <div class="text-left">
                <div class="font-medium text-mh-ink">
                  {{ link.name }}
                </div>
                <div class="text-sm text-mh-muted">
                  {{ link.description }}
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Emergency Notice -->
        <div class="mt-8 bg-mh-error-100 border border-mh-error-200 rounded-lg p-4">
          <div class="flex items-center justify-center gap-3">
            <Icon
              icon="lucide:alert-circle"
              class="w-5 h-5 text-mh-error"
              aria-hidden="true"
            />
            <span class="text-sm text-mh-error">
              <strong>Emergency?</strong> Call 
              <a href="tel:911" class="underline font-semibold">911</a> or 
              <a href="tel:988" class="underline font-semibold">988</a>
            </span>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Section from '@/components/Section.vue'
import CTAButton from '@/components/CTAButton.vue'
import Icon from '@/components/Icon.vue'
import { useSeo, generatePageMeta } from '@/composables/useSeo'

// SEO Setup
const seoMeta = generatePageMeta(
  'Page Not Found',
  'The page you are looking for could not be found.',
  '/404',
  {
    robots: 'noindex, nofollow'
  }
)

useSeo(seoMeta)

const popularPages = [
  {
    name: 'Our Services',
    description: 'Learn about our therapy services',
    path: '/services',
    icon: 'lucide:heart-handshake'
  },
  {
    name: 'About Us',
    description: 'Meet your therapist',
    path: '/about',
    icon: 'lucide:user'
  },
  {
    name: 'Contact',
    description: 'Schedule a consultation',
    path: '/contact',
    icon: 'lucide:phone'
  },
  {
    name: 'Resources',
    description: 'Helpful family resources',
    path: '/resources',
    icon: 'lucide:book-open'
  },
  {
    name: 'FAQ',
    description: 'Common questions answered',
    path: '/faq',
    icon: 'lucide:help-circle'
  },
  {
    name: 'Testimonials',
    description: 'What families say',
    path: '/testimonials',
    icon: 'lucide:star'
  }
]

onMounted(() => {
  // Track 404 errors for analytics
  console.log('404 page viewed:', window.location.pathname)
  
  // Could send to analytics service
  // gtag('event', 'page_not_found', { page_path: window.location.pathname })
})</script>

<style scoped>
/* Add some animation to make the 404 less jarring */
.not-found-page {
  animation: fadeIn 0.5s ease-in-out;
}

/* Page link hover effects */
.page-link:hover .font-medium {
  color: var(--mh-primary);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure 404 number doesn't break on small screens */
.text-8xl {
  line-height: 0.8;
}

.text-9xl {
  line-height: 0.8;
}
</style>
