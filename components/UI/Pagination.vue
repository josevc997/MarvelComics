<script setup lang="ts">
const characterStore = useCharacterStore();
</script>
<template>
    <div class="flex justify-end gap-1 mt-4">
        <UIPaginationItem first />
        <UIPaginationItem v-for="index in 2" :index="-3 + index" />
        <button
            class="border ring-1 ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 bg-slate-200 text-sm font-medium"
        >
            {{ characterStore.offset / characterStore.limit + 1 }}
        </button>
        <UIPaginationItem v-for="index in 2" :index="index" />
        <UIPaginationItem last />
    </div>
</template>
