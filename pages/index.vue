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
    <div class="flex gap-4">
      <item-card
        name="Darkthrone"
        image="https://i.discogs.com/FZfOeoRlm1RAjMWJde6Ef4kNiuVFpBa2zgtyMJU-CIA/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTI1MjIx/MS0xNDE1ODc3NTQz/LTkyMDEuanBlZw.jpeg"
        href=""
      />

      <item-card
        name="Paragon Belial"
        artist="Darkthrone"
        image="http://gavetadebaguncas.com.br/wp-content/uploads/2020/10/Darkthrone-A-Blaze-in-the-Northern-Sky-1992-300x300.jpg"
        is-wide
      />
    </div>
  </div>
</template>
