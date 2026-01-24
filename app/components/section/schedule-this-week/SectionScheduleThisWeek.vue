<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";

import teams from "../../../../team-name-src.json";
const teamMap = Object.fromEntries(teams.map((t) => [t.name, t.src]));

const loading = ref(true);
const schedule = ref([]);
const options = { sheetName: "Display_Stream_Schedule", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options,
);
parser.parse().then((data) => {
  schedule.value = data.slice(0, 6);

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
      <p class="font-semibold text-xl py-2">{{ item.schedule }}</p>
      <div class="grid grid-cols-2 gap-4 text-xs h-[375px]">
        <div
          v-for="key in item.listCountries?.split(',').map((k) => k.trim())"
          :key="key"
          class="flex flex-col overflow-hidden rounded-lg bg-[#0b132b] cursor-pointer"
          @click="$router.push(`/team/${key}`)"
        >
          <div class="w-full aspect-square overflow-hidden">
            <NuxtImg
              :src="teamMap[key] || ''"
              class="w-full h-full object-cover"
              format="webp"
              quality="70"
            />
          </div>

          <div class="p-2 bg-red-500 text-center">
            <p class="text-xs text-white">{{ key }}</p>
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>
