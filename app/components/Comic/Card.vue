<script setup lang="ts">
defineProps<{
    comic: Comic;
}>();
</script>
<template>
    <NuxtLink
        :to="`/comic/${comic.id}`"
        class="relative group shadow rounded-md shadow-black/60 overflow-hidden"
    >
        <NuxtImg
            :src="comic?.thumbnail.path.concat('.', comic?.thumbnail.extension)"
            :alt="comic?.title"
            format="webp"
            loading="lazy"
            class="rounded-md object-fill aspect-[2/3] w-full z-0 group-hover:scale-105 transition-all duration-300"
        />
        <div
            class="absolute bottom-0 left-0 bg-black/60 z-10 text-white p-2 w-full rounded-b-md font-medium text-xl md:text-base"
        >
            {{ comic.title }}
        </div>
    </NuxtLink>
</template>
