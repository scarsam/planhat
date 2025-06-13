<template>
  <component
    :is="asChild ? $slots.default?.()?.[0]?.type || 'div' : 'div'"
    :class="classes"
    v-bind="asChild ? $slots.default?.()?.[0]?.props || {} : {}"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { twMerge } from 'tailwind-merge'

interface Props {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive'
  asChild?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  asChild: false,
  class: undefined,
})

const attrs = useAttrs()
const { class: incomingClass } = attrs

const baseClasses =
  'inline-flex items-center gap-1 px-1.5 py-[0.188rem] rounded-full font-medium text-xs dark:text-white'

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'default':
      return 'bg-zinc-100 dark:bg-zinc-800 '
    case 'outline':
      return 'border border-zinc-200 dark:border-zinc-700 bg-transparent'
    case 'secondary':
      return 'bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
    case 'destructive':
      return 'bg-red-500 text-white'
    default:
      return ''
  }
})

const classes = computed(() =>
  twMerge(
    baseClasses,
    variantClasses.value,
    props.class,
    typeof incomingClass === 'string' ? incomingClass : undefined,
  ),
)
</script>
