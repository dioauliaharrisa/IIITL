<script setup lang="ts">
import PublicGoogleSheetsParser from "public-google-sheets-parser";

import teams from "../../../../team-name-src.json";

const loading = ref(true);
const schedule = ref([]);
const options = { sheetName: "Display_Stream_Schedule", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options
);
parser.parse().then((data) => {
  schedule.value = data;

  console.log("🦆 ~ schedule:s", schedule);
  loading.value = false;
});

const teamMap = Object.fromEntries(teams.map((t) => [t.name, t.src]));

const getLogos = (item: any) =>
  item.listCountries
    .split(",")
    .map((t: string) => t.trim())
    .map((name: string) => ({
      name,
      src: teamMap[name] ?? "https://i.imgur.com/hChfMhT.png",
    }));
</script>

<template>
  <div>
    <ul class="flex flex-col gap-3">
      <li
        v-for="game in schedule"
        :key="game.id"
        tabindex="0"
        class="flex items-center gap-4 rounded-lg border p-3 hover:bg-gray-50 cursor-pointer"
      >
        <!-- Date -->
        <div class="text-center font-semibold text-sm w-12">
          <div>{{ game?.date }}</div>
          <div class="text-xs text-gray-500">{{ game.weekday }}</div>
        </div>

        <!-- Logos -->
        <div class="grid grid-cols-4 gap-2 flex-1">
          <UAvatar
            v-for="game in getLogos(game)"
            :key="game.alt"
            :src="game.src"
            :alt="game.alt"
            size="lg"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
