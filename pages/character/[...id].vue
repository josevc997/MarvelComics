<script setup lang="ts">
import { Character } from "types/characters";
import { CustomResponse } from "types/response";
import CharacterService from "~/services/Character.service";

const route = useRoute();
const id = computed(() => {
  return route.params.id;
});

const data = ref({} as CustomResponse<Character>);
// const data = ref({} as CustomResponse<characterListResponse>);

data.value = (await CharacterService.fetchCharacterById(
  Number(id.value)
)) as CustomResponse<Character>;
</script>
<template>
  <pre>{{ data }}</pre>
</template>
