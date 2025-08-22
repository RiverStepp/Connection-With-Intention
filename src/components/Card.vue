<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :class="cardClass"
    :role="role"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <!-- Card Image -->
    <div
      v-if="image || $slots.image"
      class="card-image"
      :class="imageClass"
    >
      <slot name="image">
        <img
          v-if="image"
          :src="image"
          :alt="imageAlt || title || ''"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </slot>
    </div>

    <!-- Card Content -->
    <div class="card-content" :class="contentClass">
      <!-- Header -->
      <header v-if="title || subtitle || $slots.header" class="card-header mb-4">
        <slot name="header">
          <div v-if="subtitle" class="card-subtitle text-sm text-mh-accent font-medium mb-1">
            {{ subtitle }}
          </div>
          <h3 v-if="title" class="card-title font-serif font-semibold text-mh-ink">
            {{ title }}
          </h3>
        </slot>
      </header>

      <!-- Body -->
      <div v-if="description || $slots.default" class="card-body">
        <slot>
          <p v-if="description" class="text-mh-muted leading-relaxed">
            {{ description }}
          </p>
        </slot>
      </div>

      <!-- Footer/Actions -->
      <footer
        v-if="$slots.footer || $slots.actions"
        class="card-footer mt-6 pt-4"
        :class="{ 'border-t border-mh-border': showFooterBorder }"
      >
        <slot name="footer">
          <slot name="actions" />
        </slot>
      </footer>
    </div>

    <!-- Interactive indicator -->
    <div
      v-if="isInteractive"
      class="card-indicator absolute top-4 right-4 w-6 h-6 bg-mh-primary-100 rounded-full flex items-center justify-center opacity-0 transition-opacity"
      aria-hidden="true"
    >
      <Icon
        icon="lucide:arrow-right"
        class="w-4 h-4 text-mh-primary"
      />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

interface Props {
  title?: string
  subtitle?: string
  description?: string
  image?: string
  imageAlt?: string
  to?: string
  href?: string
  target?: string
  variant?: 'default' | 'outlined' | 'elevated' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  imagePosition?: 'top' | 'left' | 'right'
  imageRatio?: 'square' | 'video' | 'portrait' | 'landscape'
  hover?: boolean
  showFooterBorder?: boolean
  class?: string
  ariaLabel?: string
}

interface Emits {
  click: [event: MouseEvent]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  imagePosition: 'top',
  imageRatio: 'landscape',
  hover: true,
  showFooterBorder: true,
  class: ''
})

const emit = defineEmits<Emits>()

const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'div'
})

const rel = computed(() => {
  if (props.target === '_blank') {
    return 'noopener noreferrer'
  }
  return undefined
})

const role = computed(() => {
  if (isInteractive.value && !props.to && !props.href) {
    return 'button'
  }
  return undefined
})

const isInteractive = computed(() => {
  return Boolean(props.to || props.href)
})

const cardClass = computed(() => {
  const classes = ['card', 'group', 'relative', 'overflow-hidden']

  // Base variant styles
  switch (props.variant) {
    case 'outlined':
      classes.push('bg-transparent border-2 border-mh-border')
      break
    case 'elevated':
      classes.push('bg-mh-surface border border-mh-border shadow-lg')
      break
    case 'minimal':
      classes.push('bg-transparent')
      break
    default: // default
      classes.push('bg-mh-surface border border-mh-border shadow-sm')
  }

  // Size classes
  switch (props.size) {
    case 'sm':
      classes.push('p-4')
      break
    case 'lg':
      classes.push('p-8')
      break
    default: // md
      classes.push('p-6')
  }

  // Layout classes based on image position
  if (props.imagePosition === 'left' || props.imagePosition === 'right') {
    classes.push('flex')
    if (props.imagePosition === 'right') {
      classes.push('flex-row-reverse')
    }
  }

  // Interactive styles
  if (isInteractive.value && props.hover) {
    classes.push('cursor-pointer transition-all duration-200')
    classes.push('hover:shadow-lg hover:-translate-y-1')
    
    if (props.variant !== 'minimal') {
      classes.push('hover:border-mh-primary-500')
    }
  }

  // Focus styles for interactive cards
  if (isInteractive.value) {
    classes.push('focus:outline-none focus:ring-2 focus:ring-mh-primary focus:ring-offset-2')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

const imageClass = computed(() => {
  const classes = ['relative', 'overflow-hidden']

  // Position-based classes
  if (props.imagePosition === 'top') {
    classes.push('mb-4')
  } else if (props.imagePosition === 'left') {
    classes.push('mr-4 flex-shrink-0')
  } else if (props.imagePosition === 'right') {
    classes.push('ml-4 flex-shrink-0')
  }

  // Aspect ratio classes
  switch (props.imageRatio) {
    case 'square':
      classes.push('aspect-square')
      break
    case 'video':
      classes.push('aspect-video')
      break
    case 'portrait':
      classes.push('aspect-[3/4]')
      break
    default: // landscape
      classes.push('aspect-[4/3]')
  }

  // Size adjustments for side positions
  if (props.imagePosition === 'left' || props.imagePosition === 'right') {
    classes.push('w-32 md:w-40')
  }

  classes.push('rounded-lg')

  return classes.join(' ')
})

const contentClass = computed(() => {
  const classes = []

  if (props.imagePosition === 'left' || props.imagePosition === 'right') {
    classes.push('flex-1 min-w-0') // min-w-0 for text truncation
  }

  return classes.join(' ')
})

function handleClick(event: MouseEvent) {
  if (!props.to && !props.href) {
    emit('click', event)
  }
}</script>

<style scoped>
.card-title {
  @apply text-lg md:text-xl;
  line-height: 1.3;
}

.card-subtitle {
  @apply uppercase tracking-wider;
}

.card-body {
  line-height: 1.6;
}

/* Ensure good spacing in flex layouts */
.card.flex .card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Animation support */
.card {
  /* Animation will be handled by JavaScript if needed */
}

/* Hover animations */
.card:hover .card-image img {
  @apply scale-105;
  transition: transform 0.3s ease-out;
}

.card:hover .card-indicator {
  opacity: 1;
}

.card-image img {
  transition: transform 0.3s ease-out;
}
</style>
