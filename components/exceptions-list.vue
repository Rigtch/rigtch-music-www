<script setup lang="ts">
import { ExceptionCollection, useExceptionStore } from '~/stores'

export interface ExceptionListProperties {
  collection?: ExceptionCollection
}

const exceptionStore = useExceptionStore()

const properties = withDefaults(defineProps<ExceptionListProperties>(), {
  collection: ExceptionCollection.Global,
})

const exceptions = computed(() =>
  exceptionStore.exceptions.filter(
    exception => exception.collection === properties.collection
  )
)
</script>

<template>
  <div>
    <div
      v-for="{ message, type } in exceptions"
      :key="message"
      class="flex flex-col gap-4 items-center"
    >
      <v-alert :type="type">
        <div class="flex flex-col gap-2 items-start">
          <div>{{ message }}</div>
        </div>
      </v-alert>
    </div>
  </div>
</template>
