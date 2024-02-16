<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const characterStore = useCharacterStore();

const message = ref(null as string | null);
const searchText = ref(route.query.name ? String(route.query.name) : "");
const awaitingSearch = ref(false);

const offset = computed(() => {
    return route.query.offset;
});

const name = computed(() => {
    return route.query.name;
});

const handleSearch = async () => {
    characterStore.fetchCharacterList(
        Number(route.query.offset),
        searchText.value
    );
};

handleSearch();

watch([offset, name], async () => {
    handleSearch();
});

watch(searchText, () => {
    if (!awaitingSearch.value) {
        setTimeout(() => {
            // handleSearch();
            if (searchText.value) {
                router.push({
                    query: {
                        name: searchText.value,
                    },
                });
            } else {
                router.push({
                    query: {},
                });
            }
            awaitingSearch.value = false;
        }, 1000); // 1 sec delay
    }
    awaitingSearch.value = true;
});

useHead({
    title: "Character List",
    meta: [
        {
            hid: "description",
            name: "description",
            content: "Characters from Marvel API",
        },
    ],
    htmlAttrs: {
        lang: "en",
    },
});
</script>
<template>
    <div>
        <template v-if="message !== null">
            <h1>{{ message }}</h1>
        </template>
        <template v-else>
            <h1 class="text-3xl font-medium mb-4">Characters</h1>
            <div class="grid gap-y-1 pt-1 pb-4">
                <label for="searchText">Character Name</label>
                <input
                    type="text"
                    name="searchText"
                    id="searchText"
                    v-model="searchText"
                    class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-400 sm:text-sm sm:leading-6 focus:outline-none"
                />
            </div>
            <ClientOnly>
                <div
                    v-if="characterStore.characterList.length > 0"
                    class="grid grid-cols-4 gap-4"
                >
                    <CharacterCard
                        v-for="character in characterStore.characterList"
                        :key="character.id"
                        :character="character"
                    />
                </div>
                <UICharacterPagination />
            </ClientOnly>
        </template>
    </div>
</template>
