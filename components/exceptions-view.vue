<script setup lang="ts">
import { useExceptionStore } from '~/stores'

const exceptionStore = useExceptionStore()
</script>

<template>
  <div>
    <div
      v-for="{ message, type } in exceptionStore.exceptions"
      :key="message"
      class="absolute w-screen h-screen z-50 flex justify-center items-center backdrop-filter backdrop-blur-xl"
    >
      <v-alert :type="type" class="absolute max-w-1/2">
        <div class="flex flex-col gap-2 items-start">
          <div>{{ message }}</div>

          <v-divider class="self-stretch" />

          <v-btn
            variant="outlined"
            @click="exceptionStore.removeException(message)"
          >
            Okay
          </v-btn>
        </div>
      </v-alert>
    </div>
  </div>
</template>
