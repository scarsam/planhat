<script setup lang="ts">
import CommentTextArea from './components/CommentTextArea.vue'
import CommentCard from './components/CommentCard.vue'
import { useMessagesStore } from '@/stores/messages.ts'
import memo1 from '@/assets/avatars/memo_1.png'
import { Link, AtSign, SendHorizontal, Lightbulb, Moon } from 'lucide-vue-next'
import BaseButton from './components/base/BaseButton.vue'
import BaseBadge from './components/base/BaseBadge.vue'
import { ref, onMounted, nextTick } from 'vue'
import { focusElementByTabindex, getTabbableElements } from './utils/focus'
import planhatLogoBlack from '@/assets/planhat-black.svg'
import planhatLogoWhite from '@/assets/planhat-white.svg'

const messagesStore = useMessagesStore()
const input = ref('')
const isDark = ref(document.documentElement.classList.contains('dark'))

function sendMessage() {
  if (!input.value.trim()) return
  messagesStore.addMessage({
    author: 'You',
    avatar: memo1,
    date: new Date().toISOString(),
    reactions: [],
    text: input.value,
  })
  input.value = ''

  nextTick(() => {
    focusElementByTabindex(1)
  })
}

onMounted(() => {
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const activeEl = document.activeElement as HTMLElement | null
    if (!activeEl) return

    const tabindexAttr = activeEl.getAttribute('tabindex')
    if (!tabindexAttr) return

    const tabindex = Number(tabindexAttr)
    if (isNaN(tabindex)) return

    // Cmd+Enter or Ctrl+Enter submits form
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
      return
    }

    // Left and Right arrow navigation between tabindex elements
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const elems = getTabbableElements()
      if (elems.length === 0) return

      let currentIndex = elems.findIndex((el) => el === activeEl)
      if (currentIndex === -1) return

      if (e.key === 'ArrowRight') {
        // Move forward, loop after last
        currentIndex = (currentIndex + 1) % elems.length
      } else if (e.key === 'ArrowLeft') {
        // Move backward, loop before first
        currentIndex = (currentIndex - 1 + elems.length) % elems.length
      }
      elems[currentIndex].focus()
    }
  })
})

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark')
  isDark.value = !isDark.value
}
</script>

<template>
  <body class="bg-zinc-50 dark:bg-zinc-900">
    <div class="flex flex-col min-h-screen max-w-lg mx-auto py-24 px-4">
      <div class="flex flex-col flex-grow min-h-0 w-full justify-end gap-y-2">
        <TransitionGroup
          name="slide"
          tag="div"
          class="flex flex-col flex-grow min-h-0 w-full justify-end gap-y-2"
        >
          <CommentCard
            v-for="msg in messagesStore.messages"
            :class="msg.author === 'You' ? 'border-1 border-blue-200' : ''"
            :key="msg.date + msg.author"
            v-bind="msg"
            :tabindex="messagesStore.messages.indexOf(msg) + 5"
            :reactions="msg.reactions"
            :onDelete="
              () =>
                messagesStore.deleteMessage(
                  typeof msg.date === 'string' ? msg.date : msg.date.toISOString(),
                )
            "
          />
        </TransitionGroup>
      </div>
      <div class="flex flex-col min-h-0 w-full justify-center mt-6">
        <form @submit.prevent="sendMessage" class="flex gap-2 mt-4">
          <CommentTextArea
            v-model="input"
            placeholder="Add a comment..."
            class="flex-1"
            tabindex="1"
          >
            <template #button-group>
              <BaseButton
                size="xs"
                tabindex="4"
                class="border-1 border-transparent focus:border-blue-400 text-black dark:text-white"
                ><Link :size="16"
              /></BaseButton>
              <BaseButton
                size="xs"
                tabindex="3"
                class="border-1 border-transparent focus:border-blue-400 text-black dark:text-white"
                ><AtSign :size="16"
              /></BaseButton>
              <BaseButton
                size="xs"
                tabindex="2"
                type="submit"
                class="border-1 border-gray-100 shadow-md focus:border-1 focus:border-blue-400 text-black dark:text-white"
                ><SendHorizontal :size="16"
              /></BaseButton>
            </template>
          </CommentTextArea>
        </form>
      </div>

      <div class="flex justify-between mt-2">
        <BaseButton
          variant="outline"
          @click="toggleDarkMode"
          class="text-sm px-3 py-1 rounded w-fit text-black dark:text-white"
        >
          <component :is="isDark ? Lightbulb : Moon" :size="16" />
        </BaseButton>
        <BaseBadge variant="outline">
          <p class="font-mono text-xs">
            Press
            <kbd
              class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
              >⌘</kbd
            >
            +
            <kbd
              class="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600"
              >↵</kbd
            >
            to send
          </p>
        </BaseBadge>
      </div>
      <div class="flex justify-center flex-col items-center mt-8">
        <p class="text-xs text-zinc-500 dark:text-zinc-400">
          Made with ❤️ by
          <a href="https://github.com/scarsam" class="text-zinc-900 dark:text-zinc-100"> Sam </a>
        </p>
        <img
          :src="isDark ? planhatLogoWhite : planhatLogoBlack"
          alt="Planhat"
          class="max-w-12 mt-2"
        />
      </div>
    </div>
  </body>
</template>
