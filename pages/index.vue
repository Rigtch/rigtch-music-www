<script setup lang="ts">
import {
  ExceptionCollection,
  useAuthStore,
  useExceptionStore,
  useStatisticsStore,
} from '~/stores'

const authStore = useAuthStore()
const statisticsStore = useStatisticsStore()
const exceptionStore = useExceptionStore()

const hasTopArtistsExceptions = computed(() =>
  exceptionStore.exceptions.some(
    exception => exception.collection === ExceptionCollection.TopArtists
  )
)
const hasTopTracksExceptions = computed(() =>
  exceptionStore.exceptions.some(
    exception => exception.collection === ExceptionCollection.TopTracks
  )
)

const hasLastTracksExceptions = computed(() =>
  exceptionStore.exceptions.some(
    exception => exception.collection === ExceptionCollection.LastTracks
  )
)

definePageMeta({
  middleware: 'auth',
})

onMounted(async () => {
  if (!statisticsStore.topArtists) await statisticsStore.fetchTopArtists()
  if (!statisticsStore.topTracks) await statisticsStore.fetchTopTracks()
  if (!statisticsStore.lastTracks) await statisticsStore.fetchLastTracks()
})

watch(
  () => authStore.isConnected,
  isConnected => {
    if (!isConnected) navigateTo('/about')
  }
)
</script>

<template>
  <div class="flex flex-col items-center">
    <section
      class="flex flex-col gap-8 w-full md:py-12 max-w-[720px] lg:max-w-[1200px] items-center"
    >
      <header>
        <h2 class="text-h4">Top Artists</h2>
      </header>

      <main class="flex justify-center w-full">
        <exceptions-list
          v-if="hasTopArtistsExceptions"
          :collection="ExceptionCollection.TopArtists"
        />

        <top-artists
          v-else-if="
            statisticsStore.topArtists && statisticsStore.topArtists?.length > 0
          "
          :artists="statisticsStore.topArtists"
        />

        <div v-else>
          <v-progress-circular indeterminate color="secondary" />
        </div>
      </main>
    </section>

    <v-divider />

    <section
      class="flex flex-col gap-8 w-full py-12 max-w-[720px] lg:max-w-[1200px] items-center"
    >
      <header>
        <h2 class="text-h4">Top Tracks</h2>
      </header>

      <main>
        <exceptions-list
          v-if="hasTopTracksExceptions"
          :collection="ExceptionCollection.TopTracks"
        />

        <div
          v-else-if="
            statisticsStore.topTracks && statisticsStore.topTracks?.length > 0
          "
          class="flex flex-col items-center md:flex-row gap-4 flex-wrap"
        >
          <v-expansion-panels>
            <list-item
              v-for="(track, index) in statisticsStore.topTracks"
              :key="track.name"
              :name="track.name"
              :image="track.image"
              :href="track.href"
              :artists="track.artists"
              :album-name="track.albumName"
              :position="index + 1"
            />
          </v-expansion-panels>
        </div>

        <div v-else>
          <v-progress-circular indeterminate color="secondary" />
        </div>
      </main>
    </section>

    <v-divider />

    <section
      class="flex flex-col gap-8 w-full h-full py-12 max-w-[720px] lg:max-w-[1200px] items-center"
    >
      <header>
        <h2 class="text-h4">Last Tracks</h2>
      </header>

      <main>
        <exceptions-list
          v-if="hasLastTracksExceptions"
          :collection="ExceptionCollection.LastTracks"
        />

        <div
          v-else-if="statisticsStore.lastTracks"
          class="flex flex-col items-center md:flex-row gap-4 flex-wrap"
        >
          <v-expansion-panels>
            <list-item
              v-for="track in statisticsStore.lastTracks"
              :key="track.name"
              :name="track.name"
              :image="track.image"
              :href="track.href"
              :artists="track.artists"
              :album-name="track.albumName"
              :played-at="track.playedAt"
            />
          </v-expansion-panels>
        </div>

        <div v-else>
          <v-progress-circular indeterminate color="secondary" />
        </div>
      </main>
    </section>
  </div>
</template>
