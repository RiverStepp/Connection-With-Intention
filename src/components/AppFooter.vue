<template>
  <footer class="bg-mh-surface border-t border-mh-border mt-auto">
    <div class="container-xl py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Contact Information -->
        <div class="col-span-1 lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 bg-mh-primary rounded-lg flex items-center justify-center">
              <Icon
                icon="lucide:heart-handshake"
                class="w-5 h-5 text-white"
                aria-hidden="true"
              />
            </div>
            <div>
              <div class="font-serif font-semibold text-lg text-mh-ink">
                {{ siteData.name }}
              </div>
              <div class="text-sm text-mh-muted -mt-1">
                {{ siteData.tagline }}
              </div>
            </div>
          </div>
          
          <p class="text-mh-muted mb-6 max-w-md">
            {{ siteData.description }}
          </p>

          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <Icon
                icon="lucide:phone"
                class="w-5 h-5 text-mh-primary flex-shrink-0"
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
                class="w-5 h-5 text-mh-primary flex-shrink-0"
                aria-hidden="true"
              />
              <a
                :href="`mailto:${siteData.email}`"
                class="text-mh-ink hover:text-mh-primary transition-colors no-underline"
              >
                {{ siteData.email }}
              </a>
            </div>
            
            <div class="flex items-start gap-3">
              <Icon
                icon="lucide:map-pin"
                class="w-5 h-5 text-mh-primary flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <address class="text-mh-muted not-italic leading-relaxed">
                {{ formatAddress(siteData.address) }}
              </address>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-serif font-semibold text-mh-ink mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.main" :key="link.path">
              <router-link
                :to="link.path"
                class="text-mh-muted hover:text-mh-primary transition-colors no-underline"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="font-serif font-semibold text-mh-ink mb-4">Resources</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.resources" :key="link.path">
              <router-link
                :to="link.path"
                class="text-mh-muted hover:text-mh-primary transition-colors no-underline"
              >
                {{ link.name }}
              </router-link>
            </li>
          </ul>
          
          <div class="mt-6">
            <h4 class="font-medium text-mh-ink mb-3">Office Hours</h4>
            <div class="space-y-1 text-sm text-mh-muted">
              <div v-for="(hours, day) in siteData.hours" :key="day" class="flex justify-between">
                <span>{{ day }}:</span>
                <span>{{ hours }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Media & Legal -->
      <div class="border-t border-mh-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex items-center gap-4">
          <!-- Social Media Links -->
          <div v-if="hasSocialLinks" class="flex items-center gap-3">
            <span class="text-sm text-mh-muted">Follow us:</span>
            <div class="flex gap-2">
              <a
                v-if="siteData.social.facebook"
                :href="siteData.social.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-mh-muted hover:text-mh-primary hover:bg-mh-bg rounded-lg transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Icon icon="lucide:facebook" class="w-5 h-5" />
              </a>
              
              <a
                v-if="siteData.social.instagram"
                :href="siteData.social.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-mh-muted hover:text-mh-primary hover:bg-mh-bg rounded-lg transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Icon icon="lucide:instagram" class="w-5 h-5" />
              </a>
              
              <a
                v-if="siteData.social.linkedin"
                :href="siteData.social.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-mh-muted hover:text-mh-primary hover:bg-mh-bg rounded-lg transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Icon icon="lucide:linkedin" class="w-5 h-5" />
              </a>
              
              <a
                v-if="siteData.social.twitter"
                :href="siteData.social.twitter"
                target="_blank"
                rel="noopener noreferrer"
                class="p-2 text-mh-muted hover:text-mh-primary hover:bg-mh-bg rounded-lg transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Icon icon="lucide:twitter" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- Legal Links -->
        <div class="flex flex-wrap items-center gap-4 text-sm">
          <router-link
            v-for="link in footerLinks.legal"
            :key="link.path"
            :to="link.path"
            class="text-mh-muted hover:text-mh-primary transition-colors no-underline"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-mh-border mt-6 pt-6 text-center">
        <p class="text-sm text-mh-muted">
          © {{ currentYear }} {{ siteData.name }}. All rights reserved.
        </p>
        <p class="text-xs text-mh-muted mt-1">
          This website does not provide medical advice and is for informational purposes only.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import { siteData, footerLinks } from '@/data/site'
import { formatAddress } from '@/utils/formatters'

const currentYear = new Date().getFullYear()

const hasSocialLinks = computed(() => {
  return Object.values(siteData.social).some(link => Boolean(link))
})</script>
