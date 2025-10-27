<script setup>
const countries = [
  { name: "Indonesia", code: "ID" },
  { name: "Australia", code: "AU" },
  { name: "Brazil", code: "BR" },
  { name: "Canada", code: "CA" },
  { name: "Chinese Taipei", code: "TW" },
  { name: "France", code: "FR" },
  { name: "Hong Kong", code: "HK" },
  { name: "Japan", code: "JP" },
  { name: "Poland", code: "PL" },
  { name: "Russia", code: "RU" },
  { name: "Sweden", code: "SE" },
  { name: "Singapore", code: "SG" },
  { name: "South Korea", code: "KR" },
  { name: "USA", code: "US" },
  { name: "Norway", code: "NO" },
  { name: "Ukraine", code: "UA" },
  { name: "Vietnam", code: "VN" },
];
</script>

<template>
  <UMarquee
    :reverse="true"
    :ui="{ root: '[--gap:--spacing(4)]', content: 'w-auto py-1' }"
  >
    <NuxtImg
      v-for="country in countries"
      :key="country.code"
      width="30"
      :alt="country.name"
      :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`"
    />
  </UMarquee>
</template>
