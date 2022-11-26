<script setup lang="ts">
defineProps<{
  name: string
  href?: string
  artist?: string
  artistHref?: string
  image: string
  isWide?: boolean
}>()
</script>

<template>
  <v-card :class="!isWide && '!w-50'">
    <div :class="[isWide ? 'flex-row-reverse' : 'flex-row', 'flex']">
      <v-img
        :src="image"
        :class="[isWide && 'm-2 rounded-[4px]', 'flex items-end']"
        :cover="!isWide"
        :width="isWide ? '192' : '200'"
      >
        <v-card-title v-if="!isWide">
          <a :href="href" target="_blank">{{ name }}</a>
        </v-card-title>
      </v-img>

      <div>
        <v-card-title v-if="isWide" class="text-h5 cursor-pointer">
          <a :href="href" target="_blank">{{ name }}</a>
        </v-card-title>

        <v-card-subtitle v-if="artist" :class="!isWide && 'py-2'">
          <a
            class="cursor-pointer hover:text-white"
            :href="artistHref"
            target="_blank"
          >
            {{ artist }}
          </a>
        </v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>
