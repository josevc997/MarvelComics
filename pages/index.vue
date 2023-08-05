<script setup lang="ts">
import { error } from "console";
import CharacterService from "~/services/Character.service";
import { characterListResponse } from "~/types/characters";
import { CustomResponse } from "~/types/response";

const route = useRoute();
const characterStore = useCharacterStore();

const data = ref({} as CustomResponse<characterListResponse>);
const message = ref(null as string | null);

const offset = computed(() => {
  return route.query.offset;
});

const handleSearch = async () => {
  characterStore.fetchCharacterList(Number(route.query.offset));
};

handleSearch();

watch(offset, async () => {
  handleSearch();
});
</script>
<template>
  <div>
    <template v-if="message !== null">
      <h1>{{ message }}</h1>
    </template>
    <template v-else>
      <h1 class="text-3xl font-medium mb-4">Characters</h1>
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
        <div>
          {{ characterStore.offset + characterStore.limit }}
          <NuxtLink
            :to="{
              query: { offset: characterStore.offset + characterStore.limit },
            }"
            >See more</NuxtLink
          >
        </div>
      </ClientOnly>
    </template>
  </div>
</template>
