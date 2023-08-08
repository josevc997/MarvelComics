<script setup lang="ts">
defineProps({
  loading: Boolean,
});

const characterStore = useCharacterStore();
</script>
<template>
  <div>
    <h2 class="text-3xl font-medium my-4">Stories</h2>
    <ul
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 list-disc list-inside text-sm"
      v-if="!loading"
    >
      <li
        v-for="item in characterStore.selectedCharacter.stories"
        class="hover:font-medium"
      >
        {{ item.title }}
      </li>
      <!-- sizes="sm:100vw md:50vw lg:400px" -->
    </ul>
    <div v-else class="grid grid-cols-4 gap-4">
      <div
        v-for="i in 4"
        class="aspect-square bg-slate-300 animate-pulse rounded-md"
      ></div>
    </div>
  </div>
</template>
