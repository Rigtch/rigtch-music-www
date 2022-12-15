<template>
  <div>
    <v-app class="bg-background !min-h-screen">
      <v-layout class="flex flex-col min-h-screen">
        <exceptions-view />

        <navigation-bar />

        <v-main>
          <div class="p-4">
            <slot />
          </div>
        </v-main>

        <the-footer class="justify-self-end" />
      </v-layout>
    </v-app>
  </div>
</template>
