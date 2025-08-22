<template>
  <div class="testimonial-carousel relative" :aria-label="carouselLabel">
    <!-- Testimonials -->
    <div class="overflow-hidden">
      <div
        ref="slidesContainer"
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.id || index"
          class="w-full flex-shrink-0 px-4"
          :aria-hidden="index !== currentSlide"
        >
          <div class="card bg-mh-surface border border-mh-border p-8 text-center max-w-4xl mx-auto">
            <!-- Quote Icon -->
            <Icon
              icon="lucide:quote"
              class="w-12 h-12 text-mh-accent mx-auto mb-6 opacity-50"
              aria-hidden="true"
            />
            
            <!-- Testimonial Content -->
            <blockquote class="text-lg md:text-xl text-mh-ink leading-relaxed mb-6 font-serif italic">
              "{{ testimonial.content }}"
            </blockquote>
            
            <!-- Attribution -->
            <footer class="flex flex-col items-center gap-2">
              <div class="font-semibold text-mh-ink">
                {{ showFullNames ? testimonial.name : getInitials(testimonial.name) }}
              </div>
              <div v-if="testimonial.relationship" class="text-sm text-mh-muted">
                {{ testimonial.relationship }}
              </div>
              <div v-if="testimonial.location" class="text-sm text-mh-muted">
                {{ testimonial.location }}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div v-if="testimonials.length > 1" class="flex items-center justify-center gap-4 mt-8">
      <!-- Previous Button -->
      <button
        type="button"
        class="nav-button p-2 rounded-full bg-mh-surface border border-mh-border hover:bg-mh-bg hover:border-mh-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentSlide === 0 && !infinite"
        :aria-label="prevLabel"
        @click="goToPrevious"
      >
        <Icon
          icon="lucide:chevron-left"
          class="w-5 h-5 text-mh-ink"
          aria-hidden="true"
        />
      </button>

      <!-- Slide Indicators -->
      <div class="flex gap-2" role="tablist" :aria-label="indicatorsLabel">
        <button
          v-for="(_, index) in testimonials"
          :key="index"
          type="button"
          class="indicator w-3 h-3 rounded-full transition-colors"
          :class="{
            'bg-mh-primary': index === currentSlide,
            'bg-mh-border hover:bg-mh-muted': index !== currentSlide
          }"
          :aria-label="`Go to testimonial ${index + 1}`"
          :aria-selected="index === currentSlide"
          role="tab"
          @click="goToSlide(index)"
        />
      </div>

      <!-- Next Button -->
      <button
        type="button"
        class="nav-button p-2 rounded-full bg-mh-surface border border-mh-border hover:bg-mh-bg hover:border-mh-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="currentSlide === testimonials.length - 1 && !infinite"
        :aria-label="nextLabel"
        @click="goToNext"
      >
        <Icon
          icon="lucide:chevron-right"
          class="w-5 h-5 text-mh-ink"
          aria-hidden="true"
        />
      </button>
    </div>

    <!-- Auto-play Controls -->
    <div v-if="autoplay && testimonials.length > 1" class="flex justify-center mt-4">
      <button
        type="button"
        class="text-sm text-mh-muted hover:text-mh-primary transition-colors flex items-center gap-2"
        @click="toggleAutoplay"
      >
        <Icon
          :icon="isPlaying ? 'lucide:pause' : 'lucide:play'"
          class="w-4 h-4"
          aria-hidden="true"
        />
        {{ isPlaying ? 'Pause' : 'Play' }} slideshow
      </button>
    </div>

    <!-- Privacy Toggle -->
    <div v-if="allowNameToggle" class="text-center mt-6">
      <button
        type="button"
        class="text-sm text-mh-muted hover:text-mh-primary transition-colors underline"
        @click="toggleNames"
      >
        {{ showFullNames ? 'Show initials only' : 'Show full names' }}
      </button>
      <p class="text-xs text-mh-muted mt-1">
        Names are shown with client consent
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Icon from './Icon.vue'
import { getInitials } from '@/utils/formatters'

interface Testimonial {
  id?: string
  content: string
  name: string
  relationship?: string
  location?: string
}

interface Props {
  testimonials: Testimonial[]
  autoplay?: boolean
  autoplayInterval?: number
  infinite?: boolean
  allowNameToggle?: boolean
  showFullNames?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  autoplay: false,
  autoplayInterval: 5000,
  infinite: true,
  allowNameToggle: true,
  showFullNames: false
})

const currentSlide = ref(0)
const isPlaying = ref(props.autoplay)
const showFullNames = ref(props.showFullNames)
const autoplayTimer = ref<ReturnType<typeof setTimeout> | null>(null)
const slidesContainer = ref<HTMLElement>()

const carouselLabel = computed(() => 
  `Testimonials carousel with ${props.testimonials.length} testimonials`
)

const prevLabel = computed(() => 
  `Previous testimonial (${currentSlide.value} of ${props.testimonials.length})`
)

const nextLabel = computed(() => 
  `Next testimonial (${currentSlide.value + 2} of ${props.testimonials.length})`
)

const indicatorsLabel = computed(() => 
  'Testimonial navigation'
)

function goToSlide(index: number) {
  if (index >= 0 && index < props.testimonials.length) {
    currentSlide.value = index
    resetAutoplay()
  }
}

function goToNext() {
  if (currentSlide.value < props.testimonials.length - 1) {
    currentSlide.value++
  } else if (props.infinite) {
    currentSlide.value = 0
  }
  resetAutoplay()
}

function goToPrevious() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else if (props.infinite) {
    currentSlide.value = props.testimonials.length - 1
  }
  resetAutoplay()
}

function toggleAutoplay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
}

function startAutoplay() {
  if (props.testimonials.length <= 1) return
  
  stopAutoplay()
  autoplayTimer.value = setInterval(() => {
    goToNext()
  }, props.autoplayInterval)
}

function stopAutoplay() {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

function resetAutoplay() {
  if (isPlaying.value) {
    startAutoplay()
  }
}

function toggleNames() {
  showFullNames.value = !showFullNames.value
}

function handleKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowLeft':
      event.preventDefault()
      goToPrevious()
      break
    case 'ArrowRight':
      event.preventDefault()
      goToNext()
      break
    case ' ':
      if (props.autoplay && event.target === document.body) {
        event.preventDefault()
        toggleAutoplay()
      }
      break
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    stopAutoplay()
  } else if (isPlaying.value) {
    startAutoplay()
  }
}

// Watch for reduced motion preference
function respectsReducedMotion() {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (mediaQuery.matches) {
    isPlaying.value = false
    stopAutoplay()
  }
}

// Lifecycle hooks
onMounted(() => {
  if (props.autoplay && props.testimonials.length > 1) {
    // Check for reduced motion preference
    respectsReducedMotion()
    
    if (isPlaying.value) {
      startAutoplay()
    }
  }

  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  // Listen for reduced motion changes
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  mediaQuery.addEventListener('change', respectsReducedMotion)
})

onUnmounted(() => {
  stopAutoplay()
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

// Watch for testimonials changes
watch(() => props.testimonials.length, (newLength) => {
  if (currentSlide.value >= newLength) {
    currentSlide.value = Math.max(0, newLength - 1)
  }
  
  if (newLength <= 1) {
    stopAutoplay()
    isPlaying.value = false
  }
})</script>

<style scoped>
.testimonial-carousel {
  @apply select-none;
}

.nav-button {
  @apply focus:outline-none focus:ring-2 focus:ring-mh-primary focus:ring-offset-2;
}

.indicator {
  @apply focus:outline-none focus:ring-2 focus:ring-mh-primary focus:ring-offset-2;
}

/* Smooth transitions */
.flex {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .flex {
    transition-duration: 0.1s !important;
  }
}

/* Improve touch interactions on mobile */
@media (max-width: 768px) {
  .testimonial-carousel {
    @apply touch-pan-x;
  }
}
</style>
