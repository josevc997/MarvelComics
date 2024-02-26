<script setup lang="ts">
import type { Event } from "~/types/series";

defineProps<{
    loading: Boolean;
    eventList: Event[];
}>();

const characterStore = useCharacterStore();
</script>
<template>
    <div>
        <h2 class="text-3xl font-medium my-4">Events</h2>
        <div
            class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            v-if="!loading"
        >
            <div v-for="item in eventList">
                <EventCard :eventItem="item" />
            </div>
        </div>
        <div v-else class="grid grid-cols-4 gap-4">
            <div
                v-for="i in 4"
                class="aspect-square bg-slate-300 animate-pulse rounded-md"
            ></div>
        </div>
    </div>
</template>
