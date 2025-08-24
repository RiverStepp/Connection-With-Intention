<template>
  <header class="sticky top-0 z-40 bg-mh-surface border-b border-mh-border header-backdrop">
    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="skip-link sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-mh-primary text-white px-4 py-2 rounded transition-transform"
    >
      Skip to main content
    </a>

    <nav class="container-xl py-4" role="navigation" aria-label="Main navigation">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <router-link
          to="/"
          class="flex items-center gap-3 text-mh-ink hover:text-mh-primary transition-colors no-underline logo-link"
          aria-label="Connection With Intention - Home"
        >
          <div class="w-10 h-10 bg-mh-primary rounded-lg flex items-center justify-center transition-colors">
            <Icon
              icon="lucide:heart-handshake"
              class="w-6 h-6 text-white"
              aria-hidden="true"
            />
          </div>
          <div class="hidden sm:block">
            <div class="font-serif font-semibold text-xl text-mh-ink">
              {{ siteData.name }}
            </div>
            <div class="text-sm text-mh-muted -mt-1">
              {{ siteData.tagline }}
            </div>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-8">
          <ul class="flex items-center gap-6" role="menubar">
            <li
              v-for="link in navigationLinks"
              :key="link.path"
              role="none"
            >
              <router-link
                :to="link.path"
                :class="navLinkClass"
                role="menuitem"
                :aria-current="$route.path === link.path ? 'page' : undefined"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>

          <!-- CTA Buttons -->
          <div class="flex items-center gap-3">
            <CTAButton
              :href="`tel:${siteData.phone}`"
              variant="outline"
              size="sm"
              icon-left="lucide:phone"
              :aria-label="`Call ${siteData.phone}`"
            >
              Call Now
            </CTAButton>
            
            <CTAButton
              to="/contact"
              variant="primary"
              size="sm"
              icon-left="lucide:calendar"
            >
              Book Consultation
            </CTAButton>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="lg:hidden p-2 text-mh-ink hover:text-mh-primary hover:bg-mh-bg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-mh-primary"
          aria-label="Toggle mobile menu"
          :aria-expanded="isMobileMenuOpen"
          :aria-controls="mobileMenuId"
          @click="toggleMobileMenu"
        >
          <Icon
            :icon="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
            class="w-6 h-6"
            aria-hidden="true"
          />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isMobileMenuOpen"
          :id="mobileMenuId"
          class="lg:hidden mt-4 py-4 border-t border-mh-border"
        >
          <ul class="space-y-2" role="menu">
            <li
              v-for="link in navigationLinks"
              :key="link.path"
              role="none"
            >
              <router-link
                :to="link.path"
                class="block px-3 py-2 text-mh-ink hover:text-mh-primary hover:bg-mh-bg rounded-lg transition-colors no-underline"
                role="menuitem"
                :aria-current="$route.path === link.path ? 'page' : undefined"
                @click="closeMobileMenu"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>

          <!-- Mobile CTA Buttons -->
          <div class="mt-4 pt-4 border-t border-mh-border space-y-3">
            <CTAButton
              :href="`tel:${siteData.phone}`"
              variant="outline"
              size="md"
              icon-left="lucide:phone"
              class="w-full justify-center"
              :aria-label="`Call ${siteData.phone}`"
              @click="closeMobileMenu"
            >
              Call {{ siteData.phone }}
            </CTAButton>
            
            <CTAButton
              to="/contact"
              variant="primary"
              size="md"
              icon-left="lucide:calendar"
              class="w-full justify-center"
              @click="closeMobileMenu"
            >
              Book Consultation
            </CTAButton>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Icon from './Icon.vue'
import CTAButton from './CTAButton.vue'
import { siteData, navigationLinks } from '@/data/site'
import { generateId } from '@/utils/formatters'

const route = useRoute()
const isMobileMenuOpen = ref(false)
const mobileMenuId = generateId('mobile-menu')

const navLinkClass = computed(() => [
  'nav-link text-mh-ink hover:text-mh-primary transition-colors font-medium no-underline relative',
  'focus:outline-none focus:ring-2 focus:ring-mh-primary focus:ring-offset-2 rounded'
])

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
function handleRouteChange() {
  closeMobileMenu()
}

// Close mobile menu when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as Element
  const mobileMenu = document.getElementById(mobileMenuId)
  const mobileMenuButton = document.querySelector('[aria-controls="' + mobileMenuId + '"]')
  
  if (isMobileMenuOpen.value && mobileMenu && !mobileMenu.contains(target) && 
      mobileMenuButton && !mobileMenuButton.contains(target)) {
    closeMobileMenu()
  }
}

// Close mobile menu on escape key
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})

// Watch for route changes
import { watch } from 'vue'
watch(() => route.path, handleRouteChange)</script>
