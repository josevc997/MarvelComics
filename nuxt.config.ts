import tailwindcss from "@tailwindcss/vite";
const path = require("path");
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/main.css"],
    modules: [
      "nuxt-headlessui",
      "@nuxt/content",
      "@nuxtjs/i18n",
      "@sidebase/nuxt-auth",
      "@pinia/nuxt",
      "@nuxt/devtools",
      "@nuxt/icon",
      "@nuxt/image",
    ],
    vite: {
        plugins: [
        tailwindcss(),
        ],
    },
    // Optionally change the default prefix.
    headlessui: {
        prefix: "",
    },
    content: {
        sources: {
            // overwrite default source AKA `content` directory
            content: {
                driver: "fs",
                prefix: "/docs", // All contents inside this source will be prefixed with `/docs`
                base: path.resolve(__dirname, "content"),
                dir: "content",
            },
        },
    },
    image: {
        dir: "assets/img",
    },
    // i18n: {
    //     /* module options */
    // },
    auth: {
        baseURL: "http://127.0.0.1:8000/api/users/",
        provider: {
            type: "local",
            endpoints: {
                signIn: { path: "/login/", method: "post" },
                signOut: { path: "/logout/", method: "post" },
                getSession: { path: "/session/", method: "get" },
            },
            pages: {
                login: "/login",
            },
            token: {
                maxAgeInSeconds: 60 * 60 * 24 * 7,
                headerName: "Authorization",
            },
        },
        globalAppMiddleware: true,
        isEnabled: true,
    },
    imports: {
        dirs: ["./stores"],
    },
    pinia: {
        storesDirs: ['./stores/**',],
    },
});