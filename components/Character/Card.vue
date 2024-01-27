<script setup lang="ts">
import type { Character } from "~/types/characters";
defineProps<{
    character: any;
}>();
</script>
<template>
    <NuxtLink
        class="grid grid-cols-1 col-span-4 xs:col-span-2 md:col-span-1 place-content-between border rounded-md border-slate-300 p-2 gap-2 hover:shadow-md transition group duration-300 ease-in-out cursor-pointer"
        :to="{ name: 'character-id', params: { id: character.id } }"
    >
        <div class="overflow-hidden rounded-md w-full col-span-1 border">
            <NuxtImg
                :src="
                    character.thumbnail.path +
                    '.' +
                    character.thumbnail.extension
                "
                :alt="character.name"
                format="webp"
                class="w-full aspect-[1] object-fill rounded-md group-hover:scale-105 transition duration-300 ease-in-out"
                loading="lazy"
            />
        </div>
        <h2 class="text-lg font-medium">{{ character.name }}</h2>
    </NuxtLink>
</template>
