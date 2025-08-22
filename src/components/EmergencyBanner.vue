<template>
  <div
    v-if="!isDismissed"
    class="emergency-banner bg-mh-error text-white py-2 px-4 text-sm relative z-50"
    role="alert"
    aria-live="polite"
  >
    <div class="container-xl flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Icon
          icon="lucide:alert-circle"
          class="w-4 h-4 flex-shrink-0"
          aria-hidden="true"
        />
        <span class="font-medium">
          Emergency:
        </span>
        <span>
          Call
          <a
            href="tel:911"
            class="underline hover:no-underline font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            911
          </a>
          or
          <a
            href="tel:988"
            class="underline hover:no-underline font-semibold focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            988 (Crisis Lifeline)
          </a>
        </span>
      </div>
      
      <button
        type="button"
        class="ml-4 flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Dismiss emergency banner"
        @click="dismiss"
      >
        <Icon
          icon="lucide:x"
          class="w-4 h-4"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Icon from './Icon.vue'

const isDismissed = ref(false)
const STORAGE_KEY = 'emergency-banner-dismissed'

function dismiss() {
  isDismissed.value = true
  
  // Store dismissal state in localStorage with expiration (24 hours)
  const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000)
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    dismissed: true,
    expiresAt: expirationTime
  }))
}

function checkDismissalState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const { dismissed, expiresAt } = JSON.parse(stored)
      const now = new Date().getTime()
      
      if (dismissed && expiresAt > now) {
        isDismissed.value = true
      } else {
        // Expired or invalid, remove from storage
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  } catch (error) {
    // Handle localStorage errors gracefully
    console.warn('Could not access localStorage for emergency banner state:', error)
  }
}

onMounted(() => {
  checkDismissalState()
})</script>
