// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/ui",
    "@nuxt/scripts",
    "@vueuse/nuxt",
    "nuxt-charts",
    "@nuxt/fonts",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "tertiary",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
  fonts: {
    // families: [
    //   { name: "Noto Sans", provider: "google" },
    //   { name: "Noto Sans SC", provider: "google" }, // Simplified Chinese (SC)
    //   { name: "Noto Sans TC", provider: "google" }, // Traditional Chinese (TC)
    //   // Optional: Add a serif version if needed
    //   // { name: "Noto Serif TC", provider: "google" },
    // ],
    // defaults: {
    //   weights: [400],
    //   styles: ["normal", "italic"],
    //   subsets: [
    //     "cyrillic-ext",
    //     "cyrillic",
    //     "greek-ext",
    //     "greek",
    //     "vietnamese",
    //     "latin-ext",
    //     "latin",
    //   ],
    // },
  },
  i18n: {
    strategy: "no_prefix",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "tw",
        name: "Traditional Chinese",
        file: "tw.json",
      },
      // {
      //   code: "cn",
      //   name: "Simplified Chinese",
      //   file: "cn.json",
      // },
    ],
  },
  app: {
    head: {
      title: "IIITL 2026",
      meta: [
        {
          name: "description",
          content:
            "IIITL 2026 tournament stats, player rankings, individual scores, and records.",
        },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "preconnect", href: "https://docs.google.com" },
      ],
      htmlAttrs: {
        lang: "en", // or 'id' for Indonesian
      },
    },
  },
  nitro: {
    compressPublicAssets: {
      brotli: true,
    },
  },
  image: {
    domains: ["i.imgur.com"],
  },
});
