<script setup lang="ts">
import { Character } from "~/types/characters";
defineProps<{
  character: Character;
}>();
</script>
<template>
  <NuxtLink
    class="grid place-content-between border rounded-md border-slate-300 p-2 gap-2 hover:shadow-md transition hover:scale-105 duration-300 ease-in-out cursor-pointer"
    :to="{ name: 'character-id', params: { id: character.id } }"
  >
    <h2 class="text-base font-medium">{{ character.name }}</h2>
    <NuxtImg
      :src="character.thumbnail.path + '.' + character.thumbnail.extension"
      :alt="character.name"
      format="webp"
      class="w-full aspect-[1] object-fill rounded-md"
    />
  </NuxtLink>
</template>
