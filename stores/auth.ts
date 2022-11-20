import { defineStore } from 'pinia'

export interface AuthState {
  accessToken?: string
  refreshToken?: string
  isConnected: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: undefined,
    refreshToken: undefined,
    isConnected: false,
  }),
  actions: {
    login(accessToken: string, refreshToken: string) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.isConnected = true
    },
  },
})
