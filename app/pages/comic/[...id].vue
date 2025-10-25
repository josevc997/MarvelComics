<script setup lang="ts">
const route = useRoute();
const comicStore = useComicStore();

const id = computed(() => {
    return route.params.id;
});

const comic = computed(() => {
    return comicStore.comicById(Number(id.value));
});

const loading = ref(false);
const loadingCharacters = ref(false);
const loadingStories = ref(false);
const loadingEvents = ref(false);
const loadingSeries = ref(false);

const handleSearchSeries = async () => {
    await comicStore.fetchSeriesByComicId(Number(id.value));
};

const handleSearchEvents = async () => {
    await comicStore.fetchEventsByComicId(Number(id.value));
};

// const handleSearchComics = async () => {
//     await comicStore.fetchComicsByComicId(Number(id.value));
// };

const handleSearchCharacter = async () => {
    await comicStore.fetchCharactersByComicId(Number(id.value));
};

const handleSearchStories = async () => {
    await comicStore.fetchStoriesByComicId(Number(id.value));
};

const handleSearch = async () => {
    loading.value = true;
    loadingSeries.value = true;
    loadingEvents.value = true;
    loadingCharacters.value = true;
    loadingStories.value = true;
    await comicStore.fetchComicById(Number(id.value));
    loading.value = false;
    handleSearchCharacter();
    loadingCharacters.value = false;
    handleSearchStories();
    loadingStories.value = false;
    handleSearchEvents();
    loadingEvents.value = false;
    // handleSearchSeries();
    // loadingSeries.value = false;
};

useHead({
    title: "Comic Detail",
    meta: [
        {
            hid: "description",
            name: "description",
            content: "Comics from Marvel API",
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
        <template v-if="comic">
            <div class="grid grid-cols-12 w-full gap-4">
                <div class="col-span-5 md:col-span-4">
                    <NuxtImg
                        :src="
                            comic?.thumbnail.path.concat(
                                '.',
                                comic?.thumbnail.extension
                            )
                        "
                        :alt="comic?.title"
                        class="rounded-md aspect-square w-full"
                        loading="lazy"
                        format="webp"
                    />
                </div>
                <!-- sizes="sm:100vw md:50vw lg:400px" -->
                <div class="col-span-7 md:col-span-8">
                    <h1 class="text-3xl font-medium">
                        {{ comic.title }}
                    </h1>
                    <p>
                        {{ comic.description || "Description not found" }}
                    </p>
                </div>
            </div>
            <CharacterList
                :loading="loadingCharacters"
                :character-list="comicStore.selectedComic.characters"
            />
            <EventList
                :loading="loadingEvents"
                :event-list="comicStore.selectedComic.events"
            />
            <StoryList
                :loading="loadingStories"
                :story-list="comicStore.selectedComic.stories"
            />
        </template>
        <template v-else>
            <h1>{{ comicStore.error }}</h1>
        </template>
    </div>
</template>
