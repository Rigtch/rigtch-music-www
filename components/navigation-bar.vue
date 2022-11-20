<script setup lang="ts">
import { useDisplay } from 'vuetify'

import { useAuthStore } from '~/stores'

const authStore = useAuthStore()
const { name } = useDisplay()

const isDrawer = computed(() => {
  switch (name.value) {
    case 'xs':
      return true
    case 'sm':
      return true
    case 'md':
      return true
    default:
      return false
  }
})

const showDrawer = ref(false)
</script>

<template>
  <div>
    <v-app-bar
      color="background-darker"
      density="compact"
      elevation="24"
      height="81"
    >
      <template v-if="isDrawer" #prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click="isDrawer && (showDrawer = !showDrawer)"
        />
      </template>

      <v-app-bar-title>
        <div class="flex items-center">
          <v-btn class="!p-0" @click="$router.push('/')">
            <div class="flex items-center gap-2">
              <img src="/rigtch-icon.png" alt="" width="32" height="32" />

              <p>Rigtch</p>
            </div>
          </v-btn>
        </div>
      </v-app-bar-title>

      <div v-if="!isDrawer" class="flex items-center">
        <v-spacer />

        <div
          v-if="authStore.isConnected"
          class="ml-4 p-2 flex items-center gap-2"
        >
          <nuxt-link
            class="flex items-center gap-4"
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
                icon="mdi-logout-variant"
                v-bind="props"
                @click="authStore.disconnect"
              />
            </template>
          </v-tooltip>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isDrawer"
      v-model="showDrawer"
      absolute
      temporary
      class="p-2"
    >
      <div class="mt-4">
        <v-btn>Hello</v-btn>
      </div>
    </v-navigation-drawer>
  </div>
</template>
