<template>
  <textarea
    ref="textareaRef"
    :value="modelValue"
    :class="mergedClass"
    v-bind="otherAttrs"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydown"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { ref, useAttrs, computed } from 'vue'
import { twMerge } from 'tailwind-merge'

interface TextareaProps {
  modelValue?: string
  class?: string
}

defineOptions({ inheritAttrs: false })

const props = defineProps<TextareaProps>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
  change: [event: Event]
  keydown: [event: KeyboardEvent]
}>()

const textareaRef = ref<HTMLTextAreaElement>()

const defaultStyles = `
  p-1.5 w-full bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-white/[0.149] rounded-md
  resize-none outline-none text-body-sm
`

const attrs = useAttrs()
const { class: incomingClass, ...otherAttrs } = attrs

const mergedClass = computed(() =>
  twMerge(
    defaultStyles,
    props.class,
    typeof incomingClass === 'string' ? incomingClass : undefined,
  ),
)

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('input', event)
}
const onFocus = (event: FocusEvent) => emit('focus', event)
const onBlur = (event: FocusEvent) => emit('blur', event)
const onKeydown = (event: KeyboardEvent) => emit('keydown', event)
const onChange = (event: Event) => emit('change', event)

defineExpose({
  focus: () => textareaRef.value?.focus(),
  blur: () => textareaRef.value?.blur(),
  select: () => textareaRef.value?.select(),
  element: textareaRef,
})
</script>
