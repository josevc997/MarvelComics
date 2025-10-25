<script setup lang="ts">
const NuxtLink = resolveComponent("nuxt-link");
const props = defineProps<{
    index?: number;
    first?: boolean;
    last?: boolean;
}>();

const route = useRoute();

const characterStore = useCharacterStore();

const disabled = computed(() => {
    if (props.first) {
        return characterStore.offset - characterStore.limit < 0;
    }
    if (props.last) {
        return (
            characterStore.total < characterStore.offset + characterStore.limit
        );
    }
    return false;
});

const offset = computed(() => {
    if (props.index) {
        return characterStore.offset + characterStore.limit * props.index;
    }
    if (props.last) {
        return (
            Math.trunc(characterStore.total / characterStore.limit) *
            characterStore.limit
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
                characterStore.total >
                characterStore.offset + characterStore.limit * props.index
            );
        } else {
            return (
                0 <= characterStore.offset + characterStore.limit * props.index
            );
        }
    }
});
const pageNumber = computed(() => {
    if (props.index) {
        return characterStore.offset / characterStore.limit + props.index + 1;
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
