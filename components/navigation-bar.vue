<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { name } = useDisplay()

const isDrawer = computed(() => {
  switch (name.value) {
    case 'xs':
      return true
    case 'sm':
      return true
    default:
      return false
  }
})

const showDrawer = ref(false)
</script>

<template>
  <div class="fixed top-0 z-50 w-full">
    <v-app-bar
      color="background-darker"
      density="compact"
      elevation="24"
      height="81"
      fixed
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

        <user-info />
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-if="isDrawer"
      v-model="showDrawer"
      temporary
      class="p-2 min-h-screen"
    >
      <user-info is-drawer />
    </v-navigation-drawer>
  </div>
</template>
