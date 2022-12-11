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

    <v-tooltip v-if="!isDrawer" text="Disconnect" location="bottom">
      <template #activator="{ props }">
        <v-btn
          icon="mdi-logout-variant"
          v-bind="props"
          @click="authStore.disconnect"
        />
      </template>
    </v-tooltip>

    <v-btn v-else @click="authStore.disconnect">disconnect</v-btn>
  </div>
</template>
