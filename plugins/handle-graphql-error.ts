import { useAuthStore } from '~/stores'
import { GraphqlError } from '~/types'

export default defineNuxtPlugin(() => {
  useGqlError((error: GraphqlError) => {
    const authStore = useAuthStore()

    const tokenExpired = error.statusCode === 401

    if (tokenExpired) authStore.refreshAccessToken()
  })
})
