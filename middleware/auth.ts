import { useAuthStore } from '~/stores'

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  if (!authStore.isConnected)
    navigateTo(to.path !== from.path ? from : '/about')
})
