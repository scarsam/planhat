import { defineStore } from 'pinia'
import { messages as seedMessages } from '@/utils/seed'
import type { Props as Message } from '@/components/CommentCard.vue'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [] as Message[],
  }),
  actions: {
    deleteMessage(date: string) {
      this.messages = this.messages.filter((msg) => msg.date !== date)
    },
    addMessage(userMessage: Message) {
      this.messages.push(userMessage)

      const random = seedMessages[Math.floor(Math.random() * seedMessages.length)]

      setTimeout(
        () => {
          this.messages.push({
            ...random,
            date: new Date().toISOString(),
          })
        },
        Math.random() * 1000 + 1000,
      )
    },
  },
})
