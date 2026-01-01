<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";

import teams from "../../../../team-name-src.json";
const teamMap = Object.fromEntries(teams.map((t) => [t.name, t.src]));

const loading = ref(true);
const schedule = ref([]);
const options = { sheetName: "Display_Stream_Schedule", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options
);
parser.parse().then((data) => {
  schedule.value = data.slice(0, 6);

  console.log("🦆 ~ schedule:s", schedule);
  loading.value = false;
});
</script>

<template>
  <div class="min-h-[500px]">
    <USkeleton v-if="loading" class="h-40 w-[250px]" />
    <UCarousel
      v-else
      v-slot="{ item }"
      dots
      :items="schedule"
      class="w-full max-w-xs mx-auto"
    >
      <p class="font-semibold">{{ item.schedule }}</p>
      <div class="grid grid-cols-2 gap-4 text-xs h-[375px]">
        <UCard
          v-for="key in item.listCountries?.split(',').map((k) => k.trim())"
          :key="key"
          variant="solid"
          class="flex flex-col justify-between"
          :ui="{
            body: 'p-0',
            footer: 'p-2 bg-red-500',
          }"
          @click="$router.push(`/team/${key}`)"
        >
          <NuxtImg
            :src="teamMap[key] ?? 'https://i.imgur.com/hChfMhT.png'"
            format="webp"
            alt="Logo"
            class="mx-auto"
            sizes="150px"
            width="150"
            height="150"
            quality="70"
            :modifiers="{ w: 150, h: 150 }"
          />
          <template #footer>
            <p class="text-center">{{ key }}</p>
          </template>
        </UCard>
      </div>
    </UCarousel>
  </div>
</template>
