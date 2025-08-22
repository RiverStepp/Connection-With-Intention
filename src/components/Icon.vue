<template>
  <Icon 
    :icon="icon" 
    :class="iconClass"
    :style="iconStyle"
    :aria-hidden="!label"
    :aria-label="label"
    role="img"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  icon: string
  size?: string | number
  color?: string
  label?: string
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: '1em',
  color: 'currentColor',
  class: ''
})

const iconClass = computed(() => {
  const classes = ['inline-block']
  if (props.class) {
    classes.push(props.class)
  }
  return classes.join(' ')
})

const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color
}))</script>
