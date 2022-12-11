<script setup lang="ts">
defineProps<{
  image: string
  name: string
  genres?: string[]
}>()
</script>

<template>
  <v-card class="mb-[2rem] lg:mb-0 py-4 !rounded-lg">
    <div class="flex flex-col items-center gap-2 sm:gap-4">
      <v-img
        :src="image"
        class="w-[360px] h-[360px] rounded-lg mt-4 shadow-xl"
      />

      <v-card-text class="!py-0 px-2 flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-2 justify-center">
          <h3 class="font-bold text-h3">#1</h3>
          <h4 class="text-h3">{{ name }}</h4>
        </div>

        <div>
          <div v-if="genres?.length === 0">No genres found</div>

          <div v-else>
            <p class="flex gap-2 flex-wrap justify-center">
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
      </v-card-text>
    </div>
  </v-card>
</template>
