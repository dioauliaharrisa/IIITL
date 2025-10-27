<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="border-8 border-[#009a44] h-full">
      <UHeader title="Nuxt UI" />
      <UMain>
        <UButton color="primary">Button</UButton>
        <UMarquee
          reverse="true"
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
        <!-- Team Rankings -->
        <div>
          <h2 class="text-2xl uppercase">Country Ranking</h2>
          <UTable :data="data" class="flex-1" />
        </div>
      </UMain>
      <UFooter>
        <template #left>
          <p class="text-muted text-sm">
            Copyright © {{ new Date().getFullYear() }}
          </p>
        </template>
      </UFooter>
    </div>
  </UApp>
</template>

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
const data = ref([
  {
    id: "4600",
    date: "2024-03-11T15:30:00",
    status: "paid",
    email: "james.anderson@example.com",
    amount: 594,
  },
  {
    id: "4599",
    date: "2024-03-11T10:10:00",
    status: "failed",
    email: "mia.white@example.com",
    amount: 276,
  },
  {
    id: "4598",
    date: "2024-03-11T08:50:00",
    status: "refunded",
    email: "william.brown@example.com",
    amount: 315,
  },
  {
    id: "4597",
    date: "2024-03-10T19:45:00",
    status: "paid",
    email: "emma.davis@example.com",
    amount: 529,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
]);
</script>
