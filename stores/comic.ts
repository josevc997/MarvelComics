import { defineStore } from "pinia";
import type { CustomResponse, CustomData } from "~/types/response";
import type { Character, characterListResponse } from "~/types/characters";
import type { Comic, ComicListResponse } from "~/types/comics";
import type { Serie, Storie, Event } from "~/types/series";
import ComicService from "~/services/Comic.service";

export const useComicStore = defineStore("comic", {
    state: () => ({
        count: 0,
        error: null as string | null,
        data: {} as ComicListResponse,
        selectedComic: {} as any,
    }),
    getters: {
        comicList: (state) => state.data.results,
        offset: (state) => state.data.offset,
        limit: (state) => state.data.limit,
        total: (state) => state.data.total,
        comicById: (state) => (id: number) => {
            if (state.data.results) {
                return state.data.results.find((comic) => comic.id === id);
            }
            return null;
        },
    },
    actions: {
        async fetchComicList(offset: number, name: string) {
            const response: CustomResponse<Comic> =
                (await ComicService.fetchComicList(
                    offset,
                    name
                )) as CustomResponse<Comic>;
            this.data = response.data;
        },

        async fetchComicById(id: number) {
            const comic = this.data.results?.find((comic) => comic.id === id);
            if (!comic) {
                try {
                    const response: CustomResponse<Comic> =
                        (await ComicService.fetchComicById(
                            id
                        )) as CustomResponse<Comic>;
                    this.data = response.data;
                    this.selectedComic.comic = this.data.results[0];
                } catch (error) {
                    this.error = error as string;
                }
            } else {
                this.selectedComic.comic = comic;
            }
        },

        // async fetchComicsByCharacterId(id: number) {
        //     const response: CustomResponse<Comic> =
        //         (await CharacterService.fetchComicsByCharacterId(
        //             id
        //         )) as CustomResponse<Comic>;
        //     this.selectedCharacter.comics = response.data.results;
        // },

        // async fetchSeriesByCharacterId(id: number) {
        //     const response: CustomResponse<Serie> =
        //         (await CharacterService.fetchSeriesByCharacterId(
        //             id
        //         )) as CustomResponse<Serie>;
        //     this.selectedCharacter.series = response.data.results;
        // },

        // async fetchStoriesByCharacterId(id: number) {
        //     const response: CustomResponse<Storie> =
        //         (await CharacterService.fetchStoriesByCharacterId(
        //             id
        //         )) as CustomResponse<Storie>;
        //     this.selectedCharacter.stories = response.data.results;
        // },

        // async fetchEventsByCharacterId(id: number) {
        //     const response: CustomResponse<Event> =
        //         (await CharacterService.fetchEventsByCharacterId(
        //             id
        //         )) as CustomResponse<Event>;
        //     this.selectedCharacter.events = response.data.results;
        // },
    },
});
