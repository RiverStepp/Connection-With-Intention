<template>
  <section
    :class="heroClass"
    :style="backgroundStyle"
  >
    <div class="container-xl relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Subtitle/Eyebrow -->
        <div
          v-if="subtitle"
          class="inline-flex items-center gap-2 px-4 py-2 bg-mh-accent-100 text-mh-accent rounded-full text-sm font-medium mb-6"
        >
          <Icon
            v-if="subtitleIcon"
            :icon="subtitleIcon"
            class="w-4 h-4"
            aria-hidden="true"
          />
          {{ subtitle }}
        </div>

        <!-- Main Title -->
        <h1 class="hero-title font-serif font-bold text-mh-ink mb-6">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>

        <!-- Description -->
        <div
          v-if="description || $slots.description"
          class="hero-description text-lg md:text-xl text-mh-muted mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>

        <!-- Actions -->
        <div
          v-if="$slots.actions || (primaryAction || secondaryAction)"
          class="hero-actions flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <slot name="actions">
            <CTAButton
              v-if="primaryAction"
              v-bind="primaryAction"
              size="lg"
              class="min-w-48"
            >
              {{ primaryAction.text }}
            </CTAButton>
            
            <CTAButton
              v-if="secondaryAction"
              v-bind="secondaryAction"
              variant="secondary"
              size="lg"
              class="min-w-48"
            >
              {{ secondaryAction.text }}
            </CTAButton>
          </slot>
        </div>

        <!-- Features/Stats -->
        <div
          v-if="features?.length || $slots.features"
          class="hero-features mt-12 pt-8 border-t border-mh-border opacity-50"
        >
          <slot name="features">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div
                v-for="feature in features"
                :key="feature.title"
                class="text-center"
              >
                <Icon
                  v-if="feature.icon"
                  :icon="feature.icon"
                  class="w-8 h-8 text-mh-primary mx-auto mb-2"
                  aria-hidden="true"
                />
                <div class="font-semibold text-mh-ink">{{ feature.title }}</div>
                <div class="text-sm text-mh-muted">{{ feature.description }}</div>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <!-- Background Decoration -->
    <div
      v-if="showDecoration"
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-5"
      aria-hidden="true"
    >
      <svg
        class="absolute -top-40 -right-40 w-80 h-80 text-mh-primary"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
      <svg
        class="absolute -bottom-40 -left-40 w-60 h-60 text-mh-accent"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'
import CTAButton from './CTAButton.vue'

interface Feature {
  title: string
  description: string
  icon?: string
}

interface ActionProps {
  text: string
  to?: string
  href?: string
  target?: string
  iconLeft?: string
  iconRight?: string
}

interface Props {
  title?: string
  subtitle?: string
  subtitleIcon?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'gradient' | 'image'
  backgroundImage?: string
  primaryAction?: ActionProps
  secondaryAction?: ActionProps
  features?: Feature[]
  showDecoration?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'lg',
  variant: 'default',
  showDecoration: true,
  class: ''
})

const heroClass = computed(() => {
  const classes = ['hero', 'relative', 'overflow-hidden']
  
  // Size classes
  switch (props.size) {
    case 'sm':
      classes.push('py-12 md:py-16')
      break
    case 'md':
      classes.push('py-16 md:py-20')
      break
    case 'xl':
      classes.push('py-24 md:py-32 lg:py-40')
      break
    default: // lg
      classes.push('py-20 md:py-28 lg:py-32')
  }

  // Variant classes
  switch (props.variant) {
    case 'gradient':
      classes.push('bg-gradient-to-br from-mh-bg via-mh-surface to-mh-accent/5')
      break
    case 'image':
      classes.push('bg-cover bg-center bg-no-repeat')
      if (!props.backgroundImage) {
        classes.push('bg-mh-bg')
      }
      break
    default:
      classes.push('bg-mh-bg')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

const backgroundStyle = computed(() => {
  if (props.variant === 'image' && props.backgroundImage) {
    return {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${props.backgroundImage})`
    }
  }
  return {}
})</script>

<style scoped>
.hero-title {
  @apply text-4xl md:text-5xl lg:text-6xl;
  line-height: 1.1;
}

.hero-description {
  text-wrap: balance;
}

.hero-actions {
  @apply animate-fade-in;
  animation-delay: 0.2s;
  animation-fill-mode: both;
}

.hero-features {
  @apply animate-fade-in;
  animation-delay: 0.4s;
  animation-fill-mode: both;
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .hero-title {
    @apply text-3xl;
  }
  
  .hero-description {
    @apply text-base;
  }
}

/* Ensure good contrast when using image variant */
.hero.bg-cover .hero-title,
.hero.bg-cover .hero-description {
  @apply text-white drop-shadow-lg;
}

.hero.bg-cover .hero-features {
  @apply rounded-xl p-6;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
