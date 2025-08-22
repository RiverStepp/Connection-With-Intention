<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 transform translate-y-full"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform translate-y-full"
  >
    <div
      v-if="showBanner"
      class="cookie-consent fixed bottom-0 left-0 right-0 z-50 bg-mh-surface border-t border-mh-border shadow-lg"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div class="container-xl py-4">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 id="cookie-consent-title" class="font-semibold text-mh-ink mb-2">
              Privacy & Cookies
            </h3>
            <p id="cookie-consent-description" class="text-sm text-mh-muted leading-relaxed">
              We use cookies to improve your browsing experience and understand how our website is used. 
              Analytics cookies are disabled by default and require your consent.
              <button
                type="button"
                class="text-mh-primary hover:text-mh-primary-800 underline ml-1"
                @click="showDetails = !showDetails"
              >
                {{ showDetails ? 'Hide details' : 'Learn more' }}
              </button>
            </p>
            
            <!-- Detailed Information -->
            <div
              v-show="showDetails"
              class="mt-3 p-3 bg-mh-bg rounded-lg text-xs text-mh-muted space-y-2"
            >
              <div>
                <strong>Essential cookies:</strong> Required for basic website functionality (always enabled)
              </div>
              <div>
                <strong>Analytics cookies:</strong> Help us understand website usage (optional, disabled by default)
              </div>
              <div>
                You can change your preferences anytime by clicking "Cookie Settings" in the footer.
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <CTAButton
              variant="outline"
              size="sm"
              class="order-2 sm:order-1"
              @click="acceptEssential"
            >
              Essential Only
            </CTAButton>
            
            <CTAButton
              variant="primary"
              size="sm"
              class="order-1 sm:order-2"
              @click="acceptAll"
            >
              Accept All
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Cookie Settings Modal (simplified) -->
  <teleport to="body">
    <div
      v-if="showSettings"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
      @click.self="closeSettings"
    >
      <div
        class="bg-mh-surface rounded-xl border border-mh-border p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="cookie-settings-title"
      >
        <header class="mb-4">
          <h2 id="cookie-settings-title" class="font-serif font-semibold text-xl text-mh-ink">
            Cookie Settings
          </h2>
        </header>

        <div class="space-y-4">
          <!-- Essential Cookies -->
          <div class="p-4 border border-mh-border rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-mh-ink">Essential Cookies</h3>
              <span class="text-xs text-mh-muted bg-mh-bg px-2 py-1 rounded">Always On</span>
            </div>
            <p class="text-sm text-mh-muted">
              Required for basic website functionality, navigation, and security.
            </p>
          </div>

          <!-- Analytics Cookies -->
          <div class="p-4 border border-mh-border rounded-lg">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-semibold text-mh-ink">Analytics Cookies</h3>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="analyticsEnabled"
                  type="checkbox"
                  class="sr-only toggle-input"
                />
                <div class="toggle-slider w-11 h-6 bg-mh-border rounded-full relative transition-colors duration-200">
                  <div class="toggle-thumb absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform duration-200"></div>
                </div>
              </label>
            </div>
            <p class="text-sm text-mh-muted">
              Help us understand how visitors interact with our website by collecting anonymous information.
            </p>
          </div>
        </div>

        <footer class="flex gap-3 mt-6 pt-4 border-t border-mh-border">
          <CTAButton
            variant="outline"
            size="sm"
            class="flex-1"
            @click="closeSettings"
          >
            Cancel
          </CTAButton>
          
          <CTAButton
            variant="primary"
            size="sm"
            class="flex-1"
            @click="saveSettings"
          >
            Save Settings
          </CTAButton>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CTAButton from './CTAButton.vue'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  timestamp: number
  version: string
}

const STORAGE_KEY = 'cookie-preferences'
const CONSENT_VERSION = '1.0'
const CONSENT_DURATION = 365 * 24 * 60 * 60 * 1000 // 1 year in milliseconds

const showBanner = ref(false)
const showDetails = ref(false)
const showSettings = ref(false)
const analyticsEnabled = ref(false)

interface Emits {
  'analytics-consent': [enabled: boolean]
  'preferences-updated': [preferences: CookiePreferences]
}

const emit = defineEmits<Emits>()

function getStoredPreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const preferences = JSON.parse(stored) as CookiePreferences
      
      // Check if consent is still valid (not expired and correct version)
      const now = Date.now()
      const isValid = 
        preferences.timestamp + CONSENT_DURATION > now &&
        preferences.version === CONSENT_VERSION
      
      return isValid ? preferences : null
    }
  } catch (error) {
    console.warn('Could not parse stored cookie preferences:', error)
  }
  return null
}

function savePreferences(preferences: CookiePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    emit('preferences-updated', preferences)
    emit('analytics-consent', preferences.analytics)
  } catch (error) {
    console.warn('Could not save cookie preferences:', error)
  }
}

function acceptEssential() {
  const preferences: CookiePreferences = {
    essential: true,
    analytics: false,
    timestamp: Date.now(),
    version: CONSENT_VERSION
  }
  
  savePreferences(preferences)
  showBanner.value = false
  analyticsEnabled.value = false
}

function acceptAll() {
  const preferences: CookiePreferences = {
    essential: true,
    analytics: true,
    timestamp: Date.now(),
    version: CONSENT_VERSION
  }
  
  savePreferences(preferences)
  showBanner.value = false
  analyticsEnabled.value = true
}

function openSettings() {
  showSettings.value = true
  // Load current preferences into the modal
  const stored = getStoredPreferences()
  analyticsEnabled.value = stored?.analytics ?? false
}

function closeSettings() {
  showSettings.value = false
}

function saveSettings() {
  const preferences: CookiePreferences = {
    essential: true,
    analytics: analyticsEnabled.value,
    timestamp: Date.now(),
    version: CONSENT_VERSION
  }
  
  savePreferences(preferences)
  showSettings.value = false
  showBanner.value = false
}

// Expose methods for external use
defineExpose({
  openSettings,
  getPreferences: getStoredPreferences,
  resetConsent: () => {
    localStorage.removeItem(STORAGE_KEY)
    showBanner.value = true
  }
})

onMounted(() => {
  // Check if user has already given consent
  const storedPreferences = getStoredPreferences()
  
  if (storedPreferences) {
    // User has valid consent, apply preferences
    analyticsEnabled.value = storedPreferences.analytics
    emit('analytics-consent', storedPreferences.analytics)
    emit('preferences-updated', storedPreferences)
  } else {
    // Show consent banner
    showBanner.value = true
  }
})</script>

<style scoped>
/* Custom toggle switch styles */
.toggle-input:checked + .toggle-slider {
  @apply bg-mh-primary;
}

.toggle-input:checked + .toggle-slider .toggle-thumb {
  transform: translateX(1.25rem);
}

.toggle-input:focus + .toggle-slider {
  @apply ring-4 ring-mh-primary-200;
}

/* Improved mobile layout */
@media (max-width: 640px) {
  .cookie-consent .container-xl {
    @apply px-4;
  }
}

/* Modal backdrop */
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Ensure proper stacking */
.cookie-consent {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.95);
}

@supports (backdrop-filter: blur(8px)) {
  .cookie-consent {
    background-color: rgba(255, 255, 255, 0.9);
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .cookie-consent {
    background-color: rgba(26, 32, 31, 0.95);
  }
  
  @supports (backdrop-filter: blur(8px)) {
    .cookie-consent {
      background-color: rgba(26, 32, 31, 0.9);
    }
  }
}
</style>
