<script setup lang="ts">
import { error } from "console";
import CharacterService from "~/services/Character.service";
import { characterListResponse } from "~/types/characters";
import { CustomResponse } from "~/types/response";

const route = useRoute();

const data = ref({} as CustomResponse<characterListResponse>);
const message = ref(null as string | null);

const offset = computed(() => {
  return route.query.offset;
});

const handleSearch = async () => {
  console.log("search");
  try {
    data.value = (await CharacterService.fetchCharacterList(
      Number(route.query.offset)
    )) as CustomResponse<characterListResponse>;
  } catch (error) {
    message.value = error as string;
  }
};

handleSearch();

watch(offset, async () => {
  handleSearch();
});

// onMounted(() => {
//   handleSearch();
// });
</script>
<template>
  <div>
    <template v-if="message !== null">
      <h1>{{ message }}</h1>
    </template>
    <template v-else>
      <h1 class="text-3xl font-medium mb-4">Characters</h1>
      <ClientOnly>
        <div v-if="data.status === 'Ok'" class="grid grid-cols-4 gap-4">
          <CharacterCard
            v-for="character in data.data.results"
            :key="character.id"
            :character="character"
          />
        </div>
        <div v-if="data.status === 'Ok'">
          {{ data.data.offset + data.data.limit }}
          <NuxtLink
            :to="{ query: { offset: data.data.offset + data.data.limit } }"
            >See more</NuxtLink
          >
        </div>
      </ClientOnly>
    </template>
  </div>
</template>
