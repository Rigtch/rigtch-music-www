<script setup lang="ts">
import { useAuthStore } from '~/stores'

const authStore = useAuthStore()

onMounted(() => {
  authStore.connect()

  if (authStore.isConnected) return navigateTo('/')
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
