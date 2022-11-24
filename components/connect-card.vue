<script setup lang="ts">
import { useAuthStore } from '~/stores'

const authStore = useAuthStore()

function onClick() {
  authStore.setIsLoading(true)
  navigateTo(`http://${window.location.host}/api/auth/spotify/login`, {
    external: true,
    replace: true,
  })
}
</script>

<template>
  <v-card>
    <div class="flex flex-col md:flex-row align-center p-4">
      <v-icon size="200" color="green-darken-2"> mdi-spotify </v-icon>

      <div class="flex flex-col align-center text-center gap-3">
        <div class="text-h4 md:text-h3">Connect to Spotify</div>

        <div class="text-subtitle-1 md:text-h6">
          See all of your statistic in one place.
        </div>

        <v-btn
          variant="outlined"
          rounded="pill"
          color="green-darken-2"
          append-icon="mdi-music-note-eighth"
          :loading="authStore.isLoading"
          @click="onClick"
        >
          Connect
        </v-btn>
      </div>
    </div>
  </v-card>
</template>
