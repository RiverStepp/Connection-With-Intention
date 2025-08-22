<template>
  <section :class="sectionClass">
    <div :class="containerClass">
      <!-- Section Header -->
      <header
        v-if="title || subtitle || $slots.header"
        class="section-header text-center mb-12"
      >
        <slot name="header">
          <div v-if="subtitle" class="section-subtitle text-mh-accent font-medium mb-2">
            {{ subtitle }}
          </div>
          <h2 v-if="title" class="section-title font-serif font-bold text-mh-ink mb-4">
            {{ title }}
          </h2>
          <div
            v-if="description"
            class="section-description text-lg text-mh-muted max-w-3xl mx-auto"
          >
            {{ description }}
          </div>
        </slot>
      </header>

      <!-- Section Content -->
      <div class="section-content">
        <slot />
      </div>

      <!-- Section Footer -->
      <footer
        v-if="$slots.footer"
        class="section-footer mt-12"
      >
        <slot name="footer" />
      </footer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title?: string
  subtitle?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'muted' | 'primary' | 'accent'
  container?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  background: 'default',
  container: 'lg',
  class: ''
})

const sectionClass = computed(() => {
  const classes = ['section']
  
  // Size/spacing classes
  switch (props.size) {
    case 'sm':
      classes.push('py-12 md:py-16')
      break
    case 'lg':
      classes.push('py-20 md:py-28')
      break
    case 'xl':
      classes.push('py-24 md:py-32 lg:py-40')
      break
    default: // md
      classes.push('py-16 md:py-20 lg:py-24')
  }

  // Background classes
  switch (props.background) {
    case 'muted':
      classes.push('bg-mh-bg')
      break
    case 'primary':
      classes.push('bg-mh-primary text-white')
      break
    case 'accent':
      classes.push('bg-mh-accent text-white')
      break
    default:
      classes.push('bg-mh-surface')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

const containerClass = computed(() => {
  switch (props.container) {
    case 'sm':
      return 'container-sm'
    case 'md':
      return 'container-md'
    case 'xl':
      return 'container-xl'
    case 'full':
      return 'w-full px-4'
    default: // lg
      return 'container-lg'
  }
})</script>

<style scoped>
.section-title {
  @apply text-3xl md:text-4xl lg:text-5xl;
  line-height: 1.2;
  text-wrap: balance;
}

.section-subtitle {
  @apply text-sm md:text-base uppercase tracking-wider;
}

.section-description {
  text-wrap: balance;
  line-height: 1.6;
}

/* Dark background adjustments */
.section.bg-mh-primary .section-title,
.section.bg-mh-accent .section-title {
  @apply text-white;
}

.section.bg-mh-primary .section-subtitle,
.section.bg-mh-accent .section-subtitle {
  color: rgba(255, 255, 255, 0.8);
}

.section.bg-mh-primary .section-description,
.section.bg-mh-accent .section-description {
  color: rgba(255, 255, 255, 0.9);
}

/* Animation support */
.section-header {
  /* Animation will be handled by JavaScript if needed */
}

.section-content {
  /* Animation will be handled by JavaScript if needed */
}

.section-footer {
  /* Animation will be handled by JavaScript if needed */
}
</style>
