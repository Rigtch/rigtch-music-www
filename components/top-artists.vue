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
    <div class="px-2 flex flex-col lg:grid lg:grid-cols-2 lg:gap-4">
      <large-artist-card
        :image="firstArtist.image"
        :name="firstArtist.name"
        :genres="firstArtist.genres"
      />

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
