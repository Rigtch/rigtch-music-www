<script setup lang="ts">
import { Artist } from '~/types'

const props = defineProps<{
  artists: Artist[]
}>()

const firstArtist = computed(() => props.artists[0])
const fourArtists = computed(() => props.artists.slice(1, 5))
const restArtists = computed(() => props.artists.slice(5))

const expandedCard = ref<number | undefined>(undefined)
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <div class="px-2 flex flex-col lg:grid grid-cols-2 lg:gap-4">
      <v-card class="mb-[2rem] lg:mb-0 pb-2 min-h-full">
        <div class="flex flex-col items-center gap-2 sm:gap-4">
          <v-img :src="firstArtist.image" class="w-[360px] h-[360px]" />

          <v-card-text class="!py-0 px-2 flex flex-col gap-4">
            <div class="flex flex-wrap items-center gap-2 justify-center">
              <h3 class="font-bold text-h3">#1</h3>
              <h4 class="text-h3">{{ firstArtist.name }}</h4>
            </div>

            <div>
              <div v-if="firstArtist.genres?.length === 0">No genres found</div>

              <div v-else>
                <p class="flex gap-2 flex-wrap">
                  <v-chip
                    v-for="genre in firstArtist.genres"
                    :key="genre"
                    color="secondary"
                    variant="outlined"
                  >
                    {{ genre }}
                  </v-chip>
                </p>
              </div>
            </div>
          </v-card-text>
        </div>
      </v-card>

      <div class="flex flex-col gap-2">
        <artist-card
          v-for="({ name, image, genres }, index) in fourArtists"
          :key="name"
          :name="name"
          :image="image"
          :genres="genres"
          :position="index + 2"
          :expanded-position="expandedCard"
          :set-expanded-position="
            position =>
              (expandedCard = position === expandedCard ? undefined : position)
          "
        />
      </div>
    </div>

    <div class="flex !flex-col gap-2">
      <v-expansion-panels>
        <list-item
          v-for="({ name, image, genres }, index) in restArtists"
          :key="name"
          :name="name"
          :image="image"
          :genres="genres"
          :position="index + 6"
        />
      </v-expansion-panels>
    </div>
  </div>
</template>
