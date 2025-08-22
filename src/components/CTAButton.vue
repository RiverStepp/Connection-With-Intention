<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :target="target"
    :rel="rel"
    :type="type"
    :disabled="disabled"
    :class="buttonClass"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <Icon
      v-if="iconLeft"
      :icon="iconLeft"
      :class="iconClass"
      :aria-hidden="true"
    />
    
    <span v-if="$slots.default" class="button-content">
      <slot />
    </span>
    
    <Icon
      v-if="iconRight"
      :icon="iconRight"
      :class="iconClass"
      :aria-hidden="true"
    />
    
    <span v-if="loading" class="loading-spinner" aria-hidden="true">
      <Icon icon="lucide:loader-2" class="animate-spin" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  to?: string
  href?: string
  target?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  iconLeft?: string
  iconRight?: string
  ariaLabel?: string
  class?: string
}

interface Emits {
  click: [event: MouseEvent]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  class: ''
})

const emit = defineEmits<Emits>()

const tag = computed(() => {
  if (props.to) return 'router-link'
  if (props.href) return 'a'
  return 'button'
})

const rel = computed(() => {
  if (props.target === '_blank') {
    return 'noopener noreferrer'
  }
  return undefined
})

const buttonClass = computed(() => {
  const classes = [
    'btn',
    `btn-${props.variant}`,
    `btn-${props.size}`,
    'transition-all duration-200 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
  ]

  if (props.loading) {
    classes.push('opacity-75 cursor-wait')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

const iconClass = computed(() => {
  const classes = []
  
  // Icon sizing based on button size
  switch (props.size) {
    case 'sm':
      classes.push('w-4 h-4')
      break
    case 'lg':
      classes.push('w-6 h-6')
      break
    default:
      classes.push('w-5 h-5')
  }

  // Icon spacing
  if (props.iconLeft && props.iconRight) {
    classes.push('mx-1')
  } else if (props.iconLeft) {
    classes.push('mr-2')
  } else if (props.iconRight) {
    classes.push('ml-2')
  }

  return classes.join(' ')
})

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault()
    return
  }
  
  emit('click', event)
}</script>

<style scoped>
.button-content {
  @apply flex items-center;
}

.loading-spinner {
  @apply ml-2 flex items-center;
}

/* Variant styles are handled in CSS */
.btn-primary {
  @apply bg-mh-primary text-white hover:bg-mh-primary-900 focus-visible:ring-mh-primary;
}

.btn-secondary {
  @apply bg-mh-surface text-mh-primary border-2 border-mh-primary hover:bg-mh-primary hover:text-white focus-visible:ring-mh-primary;
}

.btn-accent {
  @apply bg-mh-accent text-white hover:bg-mh-accent-900 focus-visible:ring-mh-accent;
}

.btn-outline {
  @apply bg-transparent text-mh-ink border border-mh-border hover:bg-mh-bg focus-visible:ring-mh-primary;
}

.btn-ghost {
  @apply bg-transparent text-mh-ink hover:bg-mh-bg focus-visible:ring-mh-primary;
}

/* Size styles */
.btn-sm {
  @apply px-3 py-1.5 text-sm;
}

.btn-md {
  @apply px-4 py-2 text-base;
}

.btn-lg {
  @apply px-6 py-3 text-lg;
}
</style>
