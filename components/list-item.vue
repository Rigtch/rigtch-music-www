<script setup lang="ts">
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Artist } from '~/types'

const props = defineProps<{
  position?: number
  name: string
  href?: string
  artists?: Artist[]
  genres?: string[]
  artistHref?: string
  albumName?: string
  image: string
  playedAt?: string
}>()

dayjs.extend(relativeTime)

const playedAgo = dayjs(props.playedAt).fromNow()
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <div class="flex w-full items-center justify-between">
        <div class="flex items-center gap-4">
          <div v-if="position" class="text-h5 md:w-[50px] flex justify-center">
            #{{ position }}
          </div>

          <v-img :src="image" height="50" width="50" max-width="50" cover />

          <div class="flex flex-col">
            <p class="text-lg md:text-xl">{{ name }}</p>

            <p class="text-neutral-500">
              {{ artists?.map(artist => artist.name).join(', ') }}
            </p>
          </div>
        </div>

        <p v-if="playedAt" class="text-neutral-500 px-2 hidden md:block">
          {{ playedAgo }}
        </p>
      </div>
    </v-expansion-panel-title>

    <v-expansion-panel-text>
      <v-row>
        <v-col v-if="albumName" class="flex gap-2 flex-col">
          <p class="text-h5 !font-bold">From album:</p>

          <div class="flex gap-4">
            <v-img :src="image" height="80" width="80" max-width="80" cover />

            <div class="flex flex-col">
              <p class="text-h6">{{ albumName }}</p>

              <p v-if="artists && artists.length > 0" class="text-neutral-500">
                {{ artists?.map(artist => artist.name).join(', ') }}
              </p>
            </div>
          </div>
        </v-col>

        <v-col v-if="artists && artists.length > 0" class="flex gap-2 flex-col">
          <p class="text-h5 !font-bold">
            From {{ artists && artists.length > 1 ? 'artists' : 'artist' }}
          </p>

          <div class="flex flex-col gap-2">
            <div
              v-for="artist in artists"
              :key="artist.name"
              class="flex gap-4"
            >
              <v-img
                :src="artist.image"
                height="80"
                width="80"
                max-width="80"
                cover
              />

              <div>
                <p class="text-h6">{{ artist.name }}</p>
              </div>
            </div>
          </div>
        </v-col>

        <v-col
          v-if="
            (artists && artists?.map(({ genres }) => genres).length > 0) ||
            (genres && genres.length > 0)
          "
        >
          <div class="flex gap-2 flex-col">
            <p class="text-h5 !font-bold">Genres:</p>

            <div
              v-if="artists && artists?.map(({ genres }) => genres).length > 0"
            >
              <div
                v-for="{ genres: artistGenres, name: artistName } in artists"
                :key="artistName"
                class="flex gap-2 flex-wrap"
              >
                <div v-if="artistGenres.length === 0 || genres?.length === 0">
                  No genres found
                </div>

                <div v-else-if="artistGenres.length > 0">
                  <v-chip
                    v-for="genre in artistGenres"
                    :key="genre"
                    color="secondary"
                    variant="outlined"
                  >
                    {{ genre }}
                  </v-chip>
                </div>
              </div>
            </div>

            <div v-else-if="genres && genres.length > 0">
              <p class="flex gap-2 flex-wrap">
                <v-chip
                  v-for="genre in genres"
                  :key="genre"
                  color="secondary"
                  variant="outlined"
                >
                  {{ genre }}
                </v-chip>
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="flex justify-end">
          <p v-if="playedAt" class="text-neutral-500 px-2 block md:hidden">
            {{ playedAgo }}
          </p>
        </v-col>
      </v-row>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
