<script setup lang="ts">
const route = useRoute();
const characterStore = useCharacterStore();

const id = computed(() => {
    return route.params.id;
});

const character = computed(() => {
    return characterStore.characterById(Number(id.value));
});

const loading = ref(false);
const loadingComics = ref(false);
const loadingStories = ref(false);
const loadingEvents = ref(false);
const loadingSeries = ref(false);

const handleSearchSeries = async () => {
    await characterStore.fetchSeriesByCharacterId(Number(id.value));
};

const handleSearchEvents = async () => {
    await characterStore.fetchEventsByCharacterId(Number(id.value));
};

const handleSearchComics = async () => {
    await characterStore.fetchComicsByCharacterId(Number(id.value));
};

const handleSearchStories = async () => {
    await characterStore.fetchStoriesByCharacterId(Number(id.value));
};

const handleSearch = async () => {
    loading.value = true;
    loadingSeries.value = true;
    loadingEvents.value = true;
    loadingComics.value = true;
    loadingStories.value = true;
    await characterStore.fetchCharacterById(Number(id.value));
    loading.value = false;
    handleSearchComics();
    loadingComics.value = false;
    handleSearchStories();
    loadingStories.value = false;
    handleSearchEvents();
    loadingEvents.value = false;
    handleSearchSeries();
    loadingSeries.value = false;
};

useHead({
    title: "Character Detail",
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

handleSearch();
</script>
<template>
    <div>
        <template v-if="character">
            <div class="grid grid-cols-12 w-full gap-4">
                <div class="col-span-5 md:col-span-4">
                    <NuxtImg
                        :src="
                            character?.thumbnail.path.concat(
                                '.',
                                character?.thumbnail.extension
                            )
                        "
                        :alt="character?.name"
                        class="rounded-md aspect-square w-full"
                        loading="lazy"
                        format="webp"
                    />
                </div>
                <!-- sizes="sm:100vw md:50vw lg:400px" -->
                <div class="col-span-7 md:col-span-8">
                    <h1 class="text-3xl font-medium">
                        {{ character.name }}
                    </h1>
                    <p>
                        {{ character.description || "Description not found" }}
                    </p>
                </div>
            </div>
            <CharacterSerieList :loading="loadingSeries" />
            <CharacterEventList :loading="loadingEvents" />
            <CharacterComicList :loading="loadingComics" />
            <CharacterStoryList :loading="loadingStories" />
        </template>
        <template v-else>
            <h1>{{ characterStore.error }}</h1>
        </template>
    </div>
</template>
