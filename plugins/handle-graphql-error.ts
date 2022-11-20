/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from '~/stores'

export default defineNuxtPlugin(() => {
  useGqlError((error: any) => {
    const authStore = useAuthStore()

    const tokenExpired = error.gqlErrors.some((graphqlError: any) =>
      graphqlError.message.includes('id-token-expired')
    )

    if (tokenExpired) authStore.refreshAccessToken()
  })
})
/* eslint-enable @typescript-eslint/no-explicit-any */
