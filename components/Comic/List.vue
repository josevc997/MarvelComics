<script setup lang="ts">
import type { Comic } from "~/types/comics";

defineProps<{
    loading: Boolean;
    comicList: Comic[];
}>();
</script>
<template>
    <div>
        <h2 class="text-3xl font-medium my-4">Comics</h2>
        <div
            class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            v-if="!loading"
        >
            <template v-for="comic in comicList">
                <ComicCard :comic="comic" />
            </template>
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
