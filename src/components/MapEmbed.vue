<template>
  <div class="map-embed relative">
    <div
      v-if="!isLoaded && !loadError"
      class="map-placeholder bg-mh-bg border-2 border-dashed border-mh-border rounded-lg flex items-center justify-center"
      :style="{ height: `${height}px` }"
    >
      <button
        type="button"
        class="flex flex-col items-center gap-3 p-6 text-mh-muted hover:text-mh-primary transition-colors"
        @click="loadMap"
      >
        <Icon
          icon="lucide:map-pin"
          class="w-12 h-12"
          aria-hidden="true"
        />
        <div class="text-center">
          <div class="font-medium">Load Interactive Map</div>
          <div class="text-sm">Click to load Google Maps</div>
        </div>
      </button>
    </div>

    <div
      v-else-if="loadError"
      class="map-error bg-mh-error-100 border border-mh-error-200 text-mh-error rounded-lg p-6 text-center"
      :style="{ height: `${height}px` }"
    >
      <Icon
        icon="lucide:map-pin-off"
        class="w-12 h-12 mx-auto mb-3"
        aria-hidden="true"
      />
      <div class="font-medium mb-2">Unable to load map</div>
      <div class="text-sm">
        Please visit us at:<br>
        <address class="not-italic mt-2 font-medium">
          {{ formattedAddress }}
        </address>
      </div>
    </div>

    <div
      v-else-if="isLoaded"
      class="map-container relative rounded-lg overflow-hidden"
      :style="{ height: `${height}px` }"
    >
      <iframe
        :src="mapUrl"
        :title="mapTitle"
        :style="{ height: `${height}px` }"
        class="w-full border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        @load="handleMapLoad"
        @error="handleMapError"
      ></iframe>
      
      <!-- Overlay for accessibility -->
      <div
        v-if="showOverlay"
        class="absolute inset-0 bg-transparent cursor-pointer"
        @click="enableInteraction"
        @keydown.enter="enableInteraction"
        @keydown.space.prevent="enableInteraction"
        tabindex="0"
        role="button"
        :aria-label="overlayLabel"
      >
        <div class="absolute inset-0 flex items-center justify-center bg-black/20">
          <div class="bg-white rounded-lg p-4 shadow-lg text-center">
            <Icon
              icon="lucide:mouse-pointer-click"
              class="w-8 h-8 mx-auto mb-2 text-mh-primary"
              aria-hidden="true"
            />
            <div class="font-medium">Click to interact with map</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Information -->
    <div v-if="showAddress" class="mt-4 p-4 bg-mh-bg rounded-lg">
      <div class="flex items-start gap-3">
        <Icon
          icon="lucide:map-pin"
          class="w-5 h-5 text-mh-primary flex-shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <div class="font-medium text-mh-ink mb-1">{{ siteData.name }}</div>
          <address class="text-mh-muted not-italic leading-relaxed">
            {{ formattedAddress }}
          </address>
          <div class="mt-2 flex flex-wrap gap-3 text-sm">
            <a
              :href="directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-mh-primary hover:text-mh-primary-800 transition-colors"
            >
              Get Directions
            </a>
            <a
              :href="`tel:${siteData.phone}`"
              class="text-mh-primary hover:text-mh-primary-800 transition-colors"
            >
              {{ siteData.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Icon from './Icon.vue'
import { siteData } from '@/data/site'
import { formatAddress } from '@/utils/formatters'

interface Props {
  height?: number
  zoom?: number
  showAddress?: boolean
  autoLoad?: boolean
  enableScrollWheel?: boolean
  apiKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: 400,
  zoom: 15,
  showAddress: true,
  autoLoad: false,
  enableScrollWheel: false
})

const isLoaded = ref(false)
const loadError = ref(false)
const showOverlay = ref(true)

const formattedAddress = computed(() => formatAddress(siteData.address))

const encodedAddress = computed(() => 
  encodeURIComponent(formattedAddress.value)
)

const mapUrl = computed(() => {
  const params = new URLSearchParams({
    q: formattedAddress.value,
    z: props.zoom.toString(),
    output: 'embed'
  })

  // Add API key if provided
  if (props.apiKey) {
    params.append('key', props.apiKey)
  }

  // Disable scroll wheel if specified
  if (!props.enableScrollWheel) {
    params.append('gestureHandling', 'cooperative')
  }

  return `https://www.google.com/maps/embed/v1/place?${params.toString()}`
})

const directionsUrl = computed(() => 
  `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress.value}`
)

const mapTitle = computed(() => 
  `Map showing location of ${siteData.name} at ${formattedAddress.value}`
)

const overlayLabel = computed(() => 
  `Click to enable map interaction for ${siteData.name} location`
)

function loadMap() {
  isLoaded.value = true
  loadError.value = false
}

function enableInteraction() {
  showOverlay.value = false
}

function handleMapLoad() {
  // Map loaded successfully
  loadError.value = false
}

function handleMapError() {
  loadError.value = true
  isLoaded.value = false
}

onMounted(() => {
  if (props.autoLoad) {
    loadMap()
  }
})
</script>

<style scoped>
.map-container iframe {
  display: block;
}

/* Improve map accessibility */
.map-embed iframe {
  outline: none;
}

.map-embed iframe:focus {
  outline: 2px solid var(--mh-primary);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .map-embed {
    margin-left: -1rem;
    margin-right: -1rem;
  }
  
  .map-container,
  .map-placeholder,
  .map-error {
    border-radius: 0;
  }
}
</style>
