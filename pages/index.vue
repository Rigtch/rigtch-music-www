<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex justify-center pt-8 md:pt-16">
    <example />
  </div>
</template>
