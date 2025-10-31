<script setup>
const { locales, setLocale } = useI18n();
//  <button v-for="locale in locales" @click="setLocale(locale.code)">
//         {{ locale.name }}
//       </button>
const value = ref("en");
</script>

<template>
  <UHeader :toggle="false">
    <template #title>
      <NuxtImg
        src="/logo_full.svg"
        alt="Logo"
        class="w-[125px]"
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
  </UHeader>
</template>
