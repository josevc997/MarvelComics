<script setup lang="ts">
defineProps({
  loading: Boolean,
});

const characterStore = useCharacterStore();
</script>
<template>
  <div>
    <h2 class="text-3xl font-medium my-4">Events</h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      v-if="!loading"
    >
      <NuxtImg
        v-for="item in characterStore.selectedCharacter.events"
        :src="item?.thumbnail.path.concat('.', item?.thumbnail.extension)"
        :alt="item?.title"
        format="webp"
        loading="lazy"
        class="rounded-md object-fill aspect-[2/3] w-full"
      />
      <!-- sizes="sm:100vw md:50vw lg:400px" -->
    </div>
    <div v-else class="grid grid-cols-4 gap-4">
      <div
        v-for="i in 4"
        class="aspect-square bg-slate-300 animate-pulse rounded-md"
      ></div>
    </div>
  </div>
</template>
