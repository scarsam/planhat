<template>
  <button :type="type" :disabled="disabled" :class="mergedClass" v-bind="otherAttrs">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  class?: string
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost'
  size?: 'default' | 'xs' | 'sm' | 'lg'
}

const props = withDefaults(defineProps<BaseButtonProps>(), {
  type: 'button',
  disabled: false,
  class: undefined,
  variant: 'default',
  size: 'default',
})

const attrs = useAttrs()
const { class: incomingClass, ...otherAttrs } = attrs

const baseClasses =
  'inline-flex items-center justify-center rounded-md font-medium transition-colors outline-none disabled:opacity-60'

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'h-6 px-1 text-xs'
    case 'sm':
      return 'h-8 px-3 text-xs'
    case 'lg':
      return 'h-11 px-8 text-base'
    default:
      return 'h-9 px-4 text-sm'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
    case 'outline':
      return 'border border-zinc-200 dark:border-zinc-700 bg-transparent text-zinc-900 dark:text-zinc-100'
    case 'secondary':
      return 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
    case 'destructive':
      return 'bg-red-500 text-white'
    case 'ghost':
      return 'bg-transparent text-gray-900 dark:text-gray-100'
    default:
      return ''
  }
})

const mergedClass = computed(() =>
  twMerge(
    baseClasses,
    sizeClasses.value,
    variantClasses.value,
    props.class,
    typeof incomingClass === 'string' ? incomingClass : undefined,
  ),
)
</script>
