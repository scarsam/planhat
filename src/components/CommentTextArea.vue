<template>
  <div :class="containerClass">
    <TextArea
      v-bind="$attrs"
      :model-value="modelValue"
      :class="textAreaClass"
      :tabindex="props.tabindex"
      aria-label="Comment input"
      @update:modelValue="(val) => emit('update:modelValue', val)"
      @focus="(e) => emit('focus', e)"
      @blur="(e) => emit('blur', e)"
      @input="(e) => emit('input', e)"
      @change="(e) => emit('change', e)"
      @keydown="(e) => emit('keydown', e)"
    />

    <div
      v-if="hasButtonGroup"
      :class="buttonGroupContainerClass"
      role="group"
      aria-label="Comment actions"
    >
      <slot name="button-group" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, onMounted } from 'vue'
import { twMerge } from 'tailwind-merge'
import TextArea from './base/BaseTextArea.vue'

interface Props {
  modelValue?: string
  class?: string
  tabindex?: string | number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  input: [event: Event]
  change: [event: Event]
  keydown: [event: KeyboardEvent]
}>()

const slots = useSlots()

const hasButtonGroup = computed(() => !!slots['button-group'])

const containerClass = computed(() =>
  twMerge(
    `flex flex-col rounded-md border border-zinc-300 dark:border-white/[0.149] outline-zinc -300 has-[:focus]:outline-offset-2 has-[:focus]:outline-1 has-[:focus]:outline-zinc-300`,
    props.class,
  ),
)

const textAreaClass = computed(() => twMerge('rounded-t-md border-0 rounded-b-none'))

const buttonGroupContainerClass = computed(() =>
  twMerge('flex justify-end gap-2 bg-white dark:bg-zinc-800 rounded-b-md px-1.5 pb-1.5'),
)

onMounted(() => {
  if (!hasButtonGroup.value) {
    console.warn('[CommentTextArea] requires a <template #button-group> slot to be provided.')
  }
})
</script>
