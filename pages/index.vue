<script setup lang="ts">
import CharacterService from "~/services/Character.service";
import type { characterListResponse } from "~/types/characters";
import type { CustomResponse } from "~/types/response";

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
useHead({
    title: "Character List",
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
                <div class="flex justify-end gap-1 mt-4">
                    <NuxtLink
                        :to="{
                            query: {},
                        }"
                    >
                        <button
                            class="border flex items-center justify-center hover:ring-1 hover:ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 hover:bg-slate-200"
                        >
                            <Icon
                                name="heroicons:chevron-double-left-20-solid"
                                class="size-6"
                            />
                        </button>
                    </NuxtLink>
                    <NuxtLink
                        v-if="
                            0 <=
                            characterStore.offset - characterStore.limit * 2
                        "
                        :to="{
                            query: {
                                offset:
                                    characterStore.offset -
                                    characterStore.limit * 2,
                            },
                        }"
                    >
                        <button
                            class="border hover:ring-1 hover:ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 hover:bg-slate-200"
                        >
                            {{
                                characterStore.offset / characterStore.limit - 1
                            }}
                        </button>
                    </NuxtLink>
                    <NuxtLink
                        v-if="
                            0 <=
                            characterStore.offset - characterStore.limit * 1
                        "
                        :to="{
                            query: {
                                offset:
                                    characterStore.offset -
                                    characterStore.limit * 1,
                            },
                        }"
                    >
                        <button
                            class="border hover:ring-1 hover:ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 hover:bg-slate-200"
                        >
                            {{ characterStore.offset / characterStore.limit }}
                        </button>
                    </NuxtLink>
                    <button
                        class="border ring-1 ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 bg-slate-200"
                    >
                        {{ characterStore.offset / characterStore.limit + 1 }}
                    </button>
                    <!-- </NuxtLink> -->
                    <NuxtLink
                        v-if="
                            characterStore.total >
                            characterStore.offset + characterStore.limit * 1
                        "
                        :to="{
                            query: {
                                offset:
                                    characterStore.offset +
                                    characterStore.limit * 1,
                            },
                        }"
                    >
                        <button
                            class="border hover:ring-1 hover:ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 hover:bg-slate-200"
                        >
                            {{
                                characterStore.offset / characterStore.limit + 2
                            }}
                        </button>
                    </NuxtLink>
                    <NuxtLink
                        v-if="
                            characterStore.total >
                            characterStore.offset + characterStore.limit * 2
                        "
                        :to="{
                            query: {
                                offset:
                                    characterStore.offset +
                                    characterStore.limit * 2,
                            },
                        }"
                    >
                        <button
                            class="border hover:ring-1 hover:ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 hover:bg-slate-200"
                        >
                            {{
                                characterStore.offset / characterStore.limit + 3
                            }}
                        </button>
                    </NuxtLink>
                    <NuxtLink
                        :disabled="
                            characterStore.total <
                            characterStore.offset + characterStore.limit
                        "
                        :to="{
                            query: {
                                offset:
                                    Math.trunc(
                                        characterStore.total /
                                            characterStore.limit
                                    ) * characterStore.limit,
                            },
                        }"
                    >
                        <button
                            :disabled="
                                characterStore.total <
                                characterStore.offset + characterStore.limit
                            "
                            class="border disabled:ring-0 hover:ring-1 hover:ring-green-600/60 border-slate-400 px-1 py-1 aspect-square rounded size-9 hover:bg-slate-200 disabled:bg-transparent"
                        >
                            <Icon
                                name="heroicons:chevron-double-right-20-solid"
                                class="size-6"
                            />
                        </button>
                    </NuxtLink>
                </div>
            </ClientOnly>
        </template>
    </div>
</template>
