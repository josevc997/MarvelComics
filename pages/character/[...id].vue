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
          class="aspect-square w-[200px] rounded-md"
          format="webp"
        />
        <div>
          <h1 class="text-3xl font-medium">
            {{ character.name }}
          </h1>
          <p>{{ character.description || "Description not found" }}</p>
        </div>
      </div>
      <h2 class="text-3xl font-medium my-4">Comics</h2>
      <div class="grid grid-cols-4 gap-4" v-if="!loadingComics">
        <NuxtImg
          v-for="comic in characterStore.selectedCharacter.comics"
          :src="comic?.thumbnail.path.concat('.', comic?.thumbnail.extension)"
          :alt="comic?.title"
          format="webp"
          class="aspect-square rounded-md"
        />
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
