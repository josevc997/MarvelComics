<script setup lang="ts">
const route = useRoute();
const characterStore = useCharacterStore();

const id = computed(() => {
  return route.params.id;
});

characterStore.fetchCharacterById(Number(id.value));

const loadingComics = ref(false);

const handleSearchComics = async () => {
  loadingComics.value = true;
  await characterStore.fetchComicsByCharacterId(Number(id.value));
  loadingComics.value = false;
};

handleSearchComics();

const character = computed(() => {
  return characterStore.characterById(Number(id.value));
});

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
</script>
<template>
  <div>
    <template v-if="character">
      <div class="flex gap-4">
        <NuxtImg
          :src="
            character?.thumbnail.path.concat(
              '.',
              character?.thumbnail.extension
            )
          "
          :alt="character?.name"
          class="rounded-md w-[400px]"
          loading="lazy"
          format="webp"
        />
        <!-- sizes="sm:100vw md:50vw lg:400px" -->
        <div>
          <h1 class="text-3xl font-medium">
            {{ character.name }}
          </h1>
          <p>{{ character.description || "Description not found" }}</p>
        </div>
      </div>
      <h2 class="text-3xl font-medium my-4">Comics</h2>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        v-if="!loadingComics"
      >
        <NuxtImg
          v-for="comic in characterStore.selectedCharacter.comics"
          :src="comic?.thumbnail.path.concat('.', comic?.thumbnail.extension)"
          :alt="comic?.title"
          format="webp"
          loading="lazy"
          class="rounded-md object-fill aspect-[9-16] w-full"
        />
        <!-- sizes="sm:100vw md:50vw lg:400px" -->
      </div>
      <div v-else class="grid grid-cols-4 gap-4">
        <div
          v-for="i in 4"
          class="aspect-square bg-slate-300 animate-pulse rounded-md"
        ></div>
      </div>
    </template>
    <template v-else>
      <h1>{{ characterStore.error }}</h1>
    </template>
  </div>
</template>
