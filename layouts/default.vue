<script setup lang="ts">
const { locale } = useI18n();
</script>
<template>
    <main class="min-h-screen h-full bg-slate-100 text-slate-800">
        <!-- <header class="sticky top-0 w-full shadow py-2 bg-slate-100 z-50">
            <div
                class="max-w-5xl mx-auto flex justify-between px-4 items-center"
            >
                <NuxtLink to="/">
                    <Icon name="logos:nuxt-icon" class="h-8 w-8" />
                </NuxtLink>
                <div class="text-sm font-medium">
                    <NuxtLink to="/index"> Characters </NuxtLink>
                </div>
            </div>
        </header> -->
        <ClientOnly>
            <TheNavbar />
        </ClientOnly>
        <div class="max-w-5xl mx-auto px-2 py-4">
            <slot />
        </div>
    </main>
</template>
