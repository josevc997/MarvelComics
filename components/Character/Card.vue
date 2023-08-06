<script setup lang="ts">
import { Character } from "~/types/characters";
defineProps<{
  character: Character;
}>();
</script>
<template>
  <NuxtLink
    class="grid col-span-4 sm:col-span-2 md:col-span-1 place-content-between border rounded-md border-slate-300 p-2 gap-2 hover:shadow-md transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
    :to="{ name: 'character-id', params: { id: character.id } }"
  >
    <h2 class="text-base font-medium">{{ character.name }}</h2>
    <NuxtImg
      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
      :alt="character.name"
      format="webp"
      class="w-full aspect-[1] object-fill rounded-md"
      loading="lazy"
    />
    <!-- sizes="xs:100vw sm:50vw md:223px" -->
  </NuxtLink>
</template>
