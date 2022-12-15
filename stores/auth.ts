import { defineStore } from 'pinia'

import { useExceptionStore } from '.'

import { User } from '~/types'

export interface AuthState {
  accessToken?: string
  refreshToken?: string
  isConnected: boolean
  user?: User
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
    isConnected: false,
  }),
  actions: {
    login(accessToken: string, refreshToken: string) {
      useGqlToken(accessToken)

      this.accessToken = accessToken
      this.refreshToken = refreshToken

      this.connect()
    },
    disconnect() {
      useGqlToken(null)

      this.accessToken = undefined
      this.refreshToken = undefined
      this.user = undefined
      this.isConnected = false

      navigateTo('/about')
    },
    async refreshAccessToken() {
      if (!this.refreshToken) return

      useGqlToken(this.refreshToken, {
        config: {
          type: 'Basic',
        },
      })

      const {
        refresh: { accessToken },
      } = await GqlRefresh()

      useGqlToken(accessToken, {
        config: {
          type: 'Bearer',
        },
      })

      this.accessToken = accessToken
    },
    async connect() {
      if (!this.accessToken) return

      await this.refreshAccessToken()

      try {
        const {
          profile: {
            displayName,
            href,
            images: [{ url: image }],
          },
        } = await GqlProfile()

        if (displayName) this.isConnected = true

        this.user = {
          displayName,
          href,
          image,
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
  persist: true,
})
