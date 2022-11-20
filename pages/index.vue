<script setup lang="ts">
import { useAuthStore } from '~/stores'

const authStore = useAuthStore()

definePageMeta({
  middleware: 'auth',
})

watch(
  () => authStore.isConnected,
  isConnected => {
    if (!isConnected) navigateTo('/about')
  }
)
</script>

<template>
  <div class="flex justify-center pt-8 md:pt-16">
    <example />
  </div>
</template>
