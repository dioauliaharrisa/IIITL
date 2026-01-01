<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
const { locales, setLocale } = useI18n();
const value = ref("en");

const route = useRoute();
const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "Teams",
    to: "/teams",
    icon: "i-lucide-book-open",
    active: route.path.startsWith("/teams"),
  },
]);
</script>

<template>
  <UHeader class="py-2" mode="drawer" :toggle="true">
    <template #title>
      <NuxtImg
        src="/LOGO_C.png"
        quality="70"
        format="webp"
        alt="Logo"
        class="w-[125px]"
        size="125px"
        loading="lazy"
        @click="$router.push('/')"
    /></template>
    <template #right
      ><USelect
        v-model="value"
        aria-label="Select language"
        :items="locales"
        value-key="code"
        label-key="name"
        @update:model-value="setLocale"
    /></template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
