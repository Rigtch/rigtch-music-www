<script setup lang="ts">
import { useAuthStore } from '~/stores'

const authStore = useAuthStore()

defineProps<{
  isDrawer?: boolean
}>()
</script>

<template>
  <div
    v-if="authStore.isConnected"
    class="ml-4 p-2 flex <md:flex-col <md:gap-4 <md:items-start items-center gap-2"
  >
    <nuxt-link
      class="flex flex-row-reverse items-center gap-4"
      :to="authStore.user?.href"
      target="_blank"
    >
      <p class="text-h6">
        {{ authStore.user?.displayName }}
      </p>

      <v-avatar :image="authStore.user?.image" />
    </nuxt-link>

    <v-tooltip text="Disconnect" location="bottom">
      <template #activator="{ props }">
        <v-btn
          v-if="!isDrawer"
          icon="mdi-logout-variant"
          v-bind="props"
          @click="authStore.disconnect"
        />

        <v-btn v-else v-bind="props" @click="authStore.disconnect">
          disconnect
        </v-btn>
      </template>
    </v-tooltip>
  </div>
</template>
