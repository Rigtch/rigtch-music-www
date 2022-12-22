import { defineStore } from 'pinia'

import { useExceptionStore } from '.'

import { User } from '~/types'

export interface AuthState {
  isConnected: boolean
  user?: User
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: undefined,
    isConnected: false,
  }),
  actions: {
    async disconnect() {
      await GqlLogout()

      this.user = undefined
      this.isConnected = false

      navigateTo('/about')
    },
    async refresh() {
      return await GqlRefresh()
    },
    async connect() {
      try {
        const {
          profile: {
            displayName,
            href,
            images: [image],
          },
        } = await GqlProfile()

        if (displayName) this.isConnected = true

        this.user = {
          displayName,
          href,
          ...(image && {
            image: image.url,
          }),
        }
      } catch ({ gqlErrors: [{ message }] }) {
        if (message === 'User not registered in the Developer Dashboard') {
          const exceptionStore = useExceptionStore()

          exceptionStore.addException('User is not registered in private beta')

          this.disconnect()
        }
      }
    },
  },
})
