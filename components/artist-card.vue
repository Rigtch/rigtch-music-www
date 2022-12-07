<script setup lang="ts">
const props = defineProps<{
  position: number
  image: string
  name: string
  genres?: string[]
  expandedPosition?: number
  setExpandedPosition: (position: number) => void
}>()

const isExpanded = computed(() => props.expandedPosition === props.position)
</script>

<template>
  <v-card
    variant="tonal"
    class="!py-4 !px-2"
    @click="setExpandedPosition(position)"
  >
    <div
      :class="['grid', genres ? 'grid-cols-[50px,120px,2fr]' : 'grid-cols-2']"
    >
      <div class="flex items-center justify-center">
        <p class="text-h4">#{{ position }}</p>
      </div>

      <div class="flex items-center justify-center px-2">
        <v-img :src="image" width="80" height="80" max-width="80" cover />
      </div>

      <div>
        <v-card-title class="!px-2">
          <p class="text-h5">{{ name }}</p>
        </v-card-title>

        <v-card-actions v-if="genres" class="flex justify-end">
          <v-btn :icon="isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
        </v-card-actions>
      </div>
    </div>

    <v-expand-transition>
      <div v-show="isExpanded">
        <v-divider />

        <v-card-text class="!px-2">
          <div v-if="genres?.length === 0">No genres found</div>

          <div v-else>
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
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>
