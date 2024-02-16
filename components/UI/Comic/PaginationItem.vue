<script setup lang="ts">
const NuxtLink = resolveComponent("nuxt-link");
const props = defineProps<{
    index?: number;
    first?: boolean;
    last?: boolean;
}>();

const route = useRoute();

const comicStore = useComicStore();

const disabled = computed(() => {
    if (props.first) {
        return comicStore.offset - comicStore.limit < 0;
    }
    if (props.last) {
        return comicStore.total < comicStore.offset + comicStore.limit;
    }
    return false;
});

const offset = computed(() => {
    if (props.index) {
        return comicStore.offset + comicStore.limit * props.index;
    }
    if (props.last) {
        return (
            Math.trunc(comicStore.total / comicStore.limit) * comicStore.limit
        );
    }
});

const showItem = computed(() => {
    if (props.first || props.last) {
        return true;
    }
    if (props.index) {
        if (props.index > 0) {
            return (
                comicStore.total >
                comicStore.offset + comicStore.limit * props.index
            );
        } else {
            return 0 <= comicStore.offset + comicStore.limit * props.index;
        }
    }
});
const pageNumber = computed(() => {
    if (props.index) {
        return comicStore.offset / comicStore.limit + props.index + 1;
    }
});
</script>
<template>
    <component
        :is="disabled ? 'div' : NuxtLink"
        :to="{
            query: {
                ...route.query,
                offset: offset,
            },
        }"
        v-if="showItem"
        :disabled="disabled"
    >
        <button
            :disabled="disabled"
            class="border flex items-center justify-center hover:ring-1 hover:ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 hover:bg-slate-200 disabled:ring-0 disabled:bg-transparent text-sm font-medium"
        >
            <template v-if="first || last">
                <Icon
                    :name="
                        first
                            ? 'heroicons:chevron-double-left-20-solid'
                            : 'heroicons:chevron-double-right-20-solid'
                    "
                    class="size-6"
                />
            </template>
            <template v-else>
                {{ pageNumber }}
            </template>
        </button>
    </component>
</template>
