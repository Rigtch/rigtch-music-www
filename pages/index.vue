<script setup lang="ts">
import { useAuthStore, useStatisticsStore } from '~/stores'

const authStore = useAuthStore()
const statisticsStore = useStatisticsStore()

definePageMeta({
  middleware: 'auth',
})

onMounted(async () => {
  await authStore.refreshAccessToken()

  if (!statisticsStore.topArtists) statisticsStore.fetchTopArtists()
  if (!statisticsStore.topTracks) statisticsStore.fetchTopTracks()
  if (!statisticsStore.lastTracks) statisticsStore.fetchLastTracks()
})

watch(
  () => authStore.isConnected,
  isConnected => {
    if (!isConnected) navigateTo('/about')
  }
)
</script>

<template>
  <div class="flex flex-col pt-8 md:pt-16">
    <section class="flex flex-col gap-8 w-full p-4">
      <header>
        <h2 class="text-h4">Top Artists</h2>
      </header>

      <main>
        <div
          v-if="statisticsStore.topArtists"
          class="flex flex-col items-center md:flex-row gap-4 flex-wrap"
        >
          <item-card
            v-for="(artist, index) in statisticsStore.topArtists"
            :key="artist.name"
            :name="artist.name"
            :image="artist.image"
            :href="artist.href"
            :genres="artist.genres"
            :position="index + 1"
            :is-wide="index === 0"
            :is-outlined="index === 0"
          />
        </div>

        <div v-else>
          <v-progress-circular indeterminate color="secondary" />
        </div>
      </main>
    </section>

    <v-divider />

    <section class="flex flex-col gap-8 w-full p-4 pt-12">
      <header>
        <h2 class="text-h4">Top Tracks</h2>
      </header>

      <main>
        <div
          v-if="statisticsStore.topTracks"
          class="flex flex-col items-center md:flex-row gap-4 flex-wrap"
        >
          <item-card
            v-for="(track, index) in statisticsStore.topTracks"
            :key="track.name"
            :name="track.name"
            :image="track.image"
            :href="track.href"
            :artists="track.artists"
            :position="index + 1"
            :is-wide="index === 0"
            :is-outlined="index === 0"
          />
        </div>

        <div v-else>
          <v-progress-circular indeterminate color="secondary" />
        </div>
      </main>
    </section>

    <v-divider />

    <section class="flex flex-col gap-8 w-full p-4 pt-12">
      <header>
        <h2 class="text-h4">Last Tracks</h2>
      </header>

      <main>
        <div
          v-if="statisticsStore.lastTracks"
          class="flex flex-col items-center md:flex-row gap-4 flex-wrap"
        >
          <item-card
            v-for="track in statisticsStore.lastTracks"
            :key="track.name"
            :name="track.name"
            :image="track.image"
            :href="track.href"
            :artists="track.artists"
            :played-at="track.playedAt"
          />
        </div>

        <div v-else>
          <v-progress-circular indeterminate color="secondary" />
        </div>
      </main>
    </section>
  </div>
</template>
