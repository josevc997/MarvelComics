import { defineStore } from "pinia";
import { CustomResponse, CustomData } from "~/types/response";
import { Character, characterListResponse } from "~/types/characters";
import { Comic, ComicListResponse } from "~/types/comics";
import { Serie, Storie, Event } from "~/types/series";
import CharacterService from "~/services/Character.service";

export const useCharacterStore = defineStore("character", {
  state: () => ({
    count: 0,
    error: null as string | null,
    data: {} as characterListResponse,
    selectedCharacter: {
      character: {} as Character,
      comics: [] as Comic[],
      series: [] as Serie[],
      stories: [] as Storie[],
      events: [] as Event[],
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
      const response: CustomResponse<Character> =
        (await CharacterService.fetchCharacterList(
          offset
        )) as CustomResponse<Character>;
      this.data = response.data;
    },

    async fetchCharacterById(id: number) {
      const character = this.data.results?.find(
        (character) => character.id === id
      );
      if (!character) {
        try {
          const response: CustomResponse<Character> =
            (await CharacterService.fetchCharacterById(
              id
            )) as CustomResponse<Character>;
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
      const response: CustomResponse<Comic> =
        (await CharacterService.fetchComicsByCharacterId(
          id
        )) as CustomResponse<Comic>;
      this.selectedCharacter.comics = response.data.results;
    },

    async fetchSeriesByCharacterId(id: number) {
      const response: CustomResponse<Serie> =
        (await CharacterService.fetchSeriesByCharacterId(
          id
        )) as CustomResponse<Serie>;
      this.selectedCharacter.series = response.data.results;
    },

    async fetchStoriesByCharacterId(id: number) {
      const response: CustomResponse<Storie> =
        (await CharacterService.fetchStoriesByCharacterId(
          id
        )) as CustomResponse<Storie>;
      this.selectedCharacter.stories = response.data.results;
    },

    async fetchEventsByCharacterId(id: number) {
      const response: CustomResponse<Event> =
        (await CharacterService.fetchEventsByCharacterId(
          id
        )) as CustomResponse<Event>;
      this.selectedCharacter.events = response.data.results;
    },
  },
});
