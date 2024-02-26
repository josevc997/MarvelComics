<script setup lang="ts">
import { useComicStore } from "~/stores/comic";

const route = useRoute();
const router = useRouter();
const comicStore = useComicStore();

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
    comicStore.fetchComicList(Number(route.query.offset), searchText.value);
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
</script>
<template>
    <h1 class="text-3xl font-medium mb-4">Comics</h1>
    <div class="grid gap-y-1 pt-1 pb-4">
        <label for="searchText">Comic Name</label>
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
            v-if="comicStore.comicList?.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
            <ComicCard
                v-for="comic in comicStore.comicList"
                :key="comic.id"
                :comic="comic"
            />
        </div>
        <UIComicPagination />
    </ClientOnly>
</template>
