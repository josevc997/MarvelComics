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

        async fetchCharactersByComicId(id: number) {
            const response: CustomResponse<Character> =
                (await ComicService.fetchCharactersByComicId(
                    id
                )) as CustomResponse<Character>;
            this.selectedComic.characters = response.data.results;
        },

        async fetchSeriesByComicId(id: number) {
            const response: CustomResponse<Serie> =
                (await ComicService.fetchSeriesByComicId(
                    id
                )) as CustomResponse<Serie>;
            this.selectedComic.series = response.data.results;
        },

        async fetchStoriesByComicId(id: number) {
            const response: CustomResponse<Storie> =
                (await ComicService.fetchStoriesByComicId(
                    id
                )) as CustomResponse<Storie>;
            this.selectedComic.stories = response.data.results;
        },

        async fetchEventsByComicId(id: number) {
            const response: CustomResponse<Event> =
                (await ComicService.fetchEventsByComicId(
                    id
                )) as CustomResponse<Event>;
            this.selectedComic.events = response.data.results;
        },
    },
});
