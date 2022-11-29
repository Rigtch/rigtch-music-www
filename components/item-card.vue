<script setup lang="ts">
defineProps<{
  position?: number
  name: string
  href?: string
  genres?: string[]
  image: string
  isWide?: boolean
  isOutlined?: boolean
}>()
</script>

<template>
  <v-card
    :class="
      isWide
        ? '<md:w-[12.5rem] md:max-w-120 md:h-[200px]'
        : 'w-[12.5rem] h-[200px]'
    "
    :variant="isOutlined ? 'outlined' : 'elevated'"
  >
    <div
      :class="[isWide ? 'flex-col md:flex-row-reverse' : 'flex-row', 'flex']"
    >
      <v-img
        :src="image"
        :class="isWide && 'm-2 rounded-[4px]'"
        :cover="!isWide"
        :width="isWide ? '184' : '200'"
        :height="isWide ? '184' : '200'"
      >
        <div class="flex justify-end flex-col h-full">
          <div class="backdrop-filter backdrop-brightness-60">
            <h3 v-if="position && !isWide" class="text-h4 px-4">
              #{{ position }}
            </h3>

            <v-card-title v-if="!isWide" class="!py-0">
              <a :href="href" target="_blank" class="whitespace-normal">
                {{ name }}
              </a>
            </v-card-title>
          </div>
        </div>
      </v-img>

      <div>
        <v-card-title v-if="isWide" class="text-h5 cursor-pointer">
          <h3 v-if="position" class="text-h4">#{{ position }}</h3>

          <a
            :href="href"
            target="_blank"
            :class="[position && 'py-2', 'whitespace-normal']"
          >
            {{ name }}
          </a>
        </v-card-title>

        <v-card-text
          v-if="isWide && genres && genres.length > 0"
          class="px-4 pb-4 md:pb-0 flex gap-1 flex-wrap"
        >
          <v-chip
            v-for="genre in genres"
            :key="genre"
            color="secondary"
            size="x-small"
            variant="outlined"
          >
            {{ genre }}
          </v-chip>
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>
