<script setup lang="ts">
import type { Serie } from "~/types/series";

defineProps<{
    serie: Serie;
}>();
</script>
<template>
    <div
        class="relative group shadow rounded-md shadow-black/60 overflow-hidden"
    >
        <NuxtImg
            :src="serie?.thumbnail.path.concat('.', serie?.thumbnail.extension)"
            :alt="serie?.title"
            format="webp"
            loading="lazy"
            class="rounded-md object-fill aspect-[2/3] w-full z-0 group-hover:scale-105 transition-all duration-300"
        />
        <div
            class="absolute bottom-0 left-0 bg-black/60 z-10 text-white p-2 w-full rounded-b-md font-medium text-xl md:text-base"
        >
            {{ serie.title }}
        </div>
    </div>
</template>
