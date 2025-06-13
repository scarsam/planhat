<template>
  <span
    class="inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium overflow-hidden w-9 h-9"
    :class="avatarClass"
  >
    <img
      v-if="src && !imgError"
      :src="src"
      :alt="alt"
      class="object-cover w-full h-full"
      @error="imgError = true"
    />
    <span v-else>
      <slot>
        {{ fallback }}
      </slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  src?: string
  alt?: string
  fallback?: string
  class?: string
}>()

const imgError = ref(false)

const avatarClass = computed(() => props.class)
</script>
