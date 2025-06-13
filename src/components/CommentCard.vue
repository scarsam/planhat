<template>
  <div
    class="group relative flex items-start gap-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-white/[0.149] rounded-[6px] shadow-[0px_4px_4px_-1px_rgba(0,0,0,0.02),0px_1px_1px_rgba(0,0,0,0.07)] py-2 px-3 focus:outline-1 focus:outline-offset-2 focus:outline-zinc-300"
    role="article"
    :aria-label="`Comment by ${author}`"
  >
    <BaseAvatar
      :src="avatar"
      :alt="author"
      :fallback="initials"
      class="w-9 h-9 flex-shrink-0"
      aria-label="User avatar"
    >
      {{ initials }}
    </BaseAvatar>

    <div class="flex-1">
      <div class="flex items-center gap-2">
        <p class="font-medium text-zinc-900 dark:text-white text-body-sm">{{ author }}</p>
        <p class="text-xs text-zinc-400 dark:text-white/[0.5] font-normal">{{ formattedDate }}</p>
      </div>
      <div class="text-zinc-800 dark:text-white text-body-sm">
        {{ text }}
      </div>
      <template v-if="reactions?.length">
        <div class="flex items-center gap-2 mt-1.5">
          <BaseBadge variant="outline" v-for="(reaction, index) in props.reactions" :key="index">
            {{ reaction }}
          </BaseBadge>

          <button class="hover:opacity-70 transition-opacity text-black dark:text-white">
            <Smile :size="14" />
          </button>
        </div>
      </template>
    </div>

    <div
      class="flex items-center gap-2 absolute right-0 top-0 py-2 px-3 peer-text:bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <BaseButton @click="deleteMessage">
        <Trash color="gray" :size="16" />
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import { computed } from 'vue'
import { Smile, Trash } from 'lucide-vue-next'

// Props
export interface Props {
  author: string
  avatar: string
  date: string | Date
  text: string
  reactions?: string[]
  onDelete?: () => void
}

const props = defineProps<Props>()

// Initials fallback
const initials = computed(() =>
  props.author
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase(),
)

// Date formatting
const formattedDate = computed(() => {
  if (!props.date) return ''
  const d = typeof props.date === 'string' ? new Date(props.date) : props.date
  const now = new Date()
  const diffInMs = now.getTime() - d.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    return diffInMinutes === 0 ? 'just now' : `${diffInMinutes} minutes ago`
  }
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`
  }
  if (diffInHours < 48) {
    return 'yesterday'
  }

  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d)
})

const deleteMessage = () => {
  props.onDelete?.()
}
</script>
