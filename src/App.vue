<template>
  <div id="app" class="min-h-screen flex flex-col bg-mh-bg">
    <!-- Emergency Banner -->
    <EmergencyBanner />
    
    <!-- Cookie Consent -->
    <CookieConsentLite 
      ref="cookieConsent"
      @analytics-consent="handleAnalyticsConsent"
      @preferences-updated="handlePreferencesUpdated"
    />
    
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main id="main-content" class="flex-1" role="main">
      <router-view v-slot="{ Component, route }">
        <transition
          name="page"
          mode="out-in"
          appear
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    
    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onErrorCaptured } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import EmergencyBanner from '@/components/EmergencyBanner.vue'
import CookieConsentLite from '@/components/CookieConsentLite.vue'

const router = useRouter()
const cookieConsent = ref<InstanceType<typeof CookieConsentLite>>()

// Analytics state
const analyticsEnabled = ref(false)

function handleAnalyticsConsent(enabled: boolean) {
  analyticsEnabled.value = enabled
  
  if (enabled) {
    initializeAnalytics()
  } else {
    disableAnalytics()
  }
}

function handlePreferencesUpdated(preferences: any) {
  console.log('Cookie preferences updated:', preferences)
  // Here you could send preferences to your analytics service
}

function initializeAnalytics() {
  // TODO: Initialize your analytics service here
  // Example for Google Analytics:
  /*
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
  */
  
  // Example for Plausible Analytics:
  /*
  if (window.plausible) {
    window.plausible = window.plausible || function() { 
      (window.plausible.q = window.plausible.q || []).push(arguments) 
    }
  }
  */
  
  console.log('Analytics initialized')
}

function disableAnalytics() {
  // TODO: Disable analytics tracking
  // Example for Google Analytics:
  /*
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      analytics_storage: 'denied'
    });
  }
  */
  
  console.log('Analytics disabled')
}

// Error handling
onErrorCaptured((error, _instance, info) => {
  console.error('App error:', error, info)
  
  // TODO: Send error to monitoring service
  // Example: Sentry.captureException(error)
  
  return false // Let error propagate
})

// Initialize app
onMounted(() => {
  // Set up any global app state
  console.log('Sprout & Star Mental Health app initialized')
  
  // Track initial page view if analytics are enabled
  if (analyticsEnabled.value) {
    // TODO: Track page view
  }
})

// Track route changes for analytics
router.afterEach((to) => {
  if (analyticsEnabled.value) {
    // TODO: Track page view
    // Example: gtag('config', 'GA_MEASUREMENT_ID', { page_path: to.path })
    console.log('Page view tracked:', to.path)
  }
})</script>

<style>
/* Page transition styles */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.1s ease-in-out;
  }
  
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}

/* Global focus styles */
*:focus-visible {
  outline: 2px solid var(--mh-primary);
  outline-offset: 2px;
}

/* Improve text rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Ensure proper stacking contexts */
#app {
  position: relative;
  z-index: 0;
}

/* Print styles */
@media print {
  .no-print {
    display: none !important;
  }
}
</style>
