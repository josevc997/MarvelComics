<script setup lang="ts">
defineProps<{
    character: Character;
}>();
</script>
<template>
    <NuxtLink
        :to="`/character/${character.id}`"
        class="relative group shadow rounded-md shadow-black/60 overflow-hidden"
    >
        <NuxtImg
            :src="
                character?.thumbnail.path.concat(
                    '.',
                    character?.thumbnail.extension
                )
            "
            :alt="character?.name"
            format="webp"
            loading="lazy"
            class="rounded-md object-cover aspect-[2/3] w-full z-0 group-hover:scale-105 transition-all duration-300"
        />
        <div
            class="absolute bottom-0 left-0 bg-black/60 z-10 text-white p-2 w-full rounded-b-md font-medium text-xl md:text-base"
        >
            {{ character.name }}
        </div>
    </NuxtLink>
</template>
