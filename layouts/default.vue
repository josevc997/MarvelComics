<script setup lang="ts">
const { locale } = useI18n();
</script>
<template>
  <main class="min-h-screen h-full bg-slate-100 text-slate-800">
    <header class="sticky top-0 w-full shadow py-2 bg-slate-100 z-50">
      <div class="max-w-5xl mx-auto flex justify-between px-4 items-center">
        <NuxtLink to="/">
          <Icon name="logos:nuxt-icon" class="h-8 w-8" />
        </NuxtLink>
        <!-- <form class="text-lg">
          <select v-model="locale" class="bg-slate-100 shadow rounded">
            <option value="en">en</option>
            <option value="es">es</option>
          </select>
        </form> -->
      </div>
    </header>
    <div class="max-w-5xl mx-auto px-2 py-4">
      <slot />
    </div>
  </main>
</template>
