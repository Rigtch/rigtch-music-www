import { defineStore } from 'pinia'

export interface User {
  id?: string
  displayName: string
  image: string
  href: string
}

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
          type: 'bearer',
        },
      })

      this.accessToken = accessToken
    },
    async connect() {
      if (!this.accessToken) return

      await this.refreshAccessToken()

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
    },
  },
  persist: true,
})
