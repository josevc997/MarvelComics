import { defineStore } from "pinia";
import { CustomResponse } from "~/types/response";
import { Character, characterListResponse } from "~/types/characters";
import { Comic, ComicListResponse } from "~/types/comics";
import CharacterService from "~/services/Character.service";

export const useCharacterStore = defineStore("character", {
  state: () => ({
    count: 0,
    error: null as string | null,
    data: {} as characterListResponse,
    selectedCharacter: {
      character: {} as Character,
      comics: [] as Comic[],
    },
  }),
  getters: {
    characterList: (state) => state.data.results,
    offset: (state) => state.data.offset,
    limit: (state) => state.data.limit,
    total: (state) => state.data.total,
    characterById: (state) => (id: number) => {
      if (state.data.results) {
        return state.data.results.find((character) => character.id === id);
      }
      return null;
    },
  },
  actions: {
    async fetchCharacterList(offset: number) {
      const response: CustomResponse<characterListResponse> =
        (await CharacterService.fetchCharacterList(
          offset
        )) as CustomResponse<characterListResponse>;
      this.data = response.data;
    },

    async fetchCharacterById(id: number) {
      const character = this.data.results?.find(
        (character) => character.id === id
      );
      if (!character) {
        try {
          const response: CustomResponse<characterListResponse> =
            (await CharacterService.fetchCharacterById(
              id
            )) as CustomResponse<characterListResponse>;
          this.data = response.data;
          this.selectedCharacter.character = this.data.results[0];
        } catch (error) {
          this.error = error as string;
        }
      } else {
        this.selectedCharacter.character = character;
      }
    },

    async fetchComicsByCharacterId(id: number) {
      const response: CustomResponse<ComicListResponse> =
        (await CharacterService.fetchComicsByCharacterId(
          id
        )) as CustomResponse<ComicListResponse>;
      this.selectedCharacter.comics = response.data.results;
    },
  },
});
