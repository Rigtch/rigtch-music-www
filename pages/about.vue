<script setup lang="ts">
import { useAuthStore } from '~/stores'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.connect()

  if (authStore.isConnected) return navigateTo('/')

  const { accessToken, refreshToken } = route.query

  if (accessToken && refreshToken)
    authStore.login(accessToken as string, refreshToken as string)
})

watch(
  () => authStore.isConnected,
  isConnected => {
    if (isConnected) navigateTo('/')
  }
)
</script>

<template>
  <div class="flex justify-center pt-8 md:pt-16">
    <connect-card />
  </div>
</template>
