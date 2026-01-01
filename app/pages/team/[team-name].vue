<script setup lang="ts">
import PublicGoogleSheetsParser from "public-google-sheets-parser";

import teams from "../../../../team-name-src.json";
const teamMap = Object.fromEntries(teams.map((t) => [t.name, t.src]));

const route = useRoute();
const options = { sheetName: "Display_Individual_Score", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options
);

const teamName = route.params.teamname as string;
const teamSrc = computed(
  () => teamMap[teamName] ?? "https://i.imgur.com/hChfMhT.png"
);

const profile = ref();

parser.parse().then((data) => {
  const name = decodeURIComponent(route.params.name as string);
  const filteredProfile = data.find((item) => item["discord name"] === name);
  profile.value = filteredProfile;
});

const classContainerHeading =
  "font-heading font-bold h-24 flex items-center justify-center";
</script>

<template>
  <div class="p-4">
    <div class="flex gap-4">
      <div class="relative w-[120px] h-[120px]">
        <div class="rounded-full overflow-hidden w-full h-full">
          <NuxtImg
            :src="teamSrc ?? 'https://i.imgur.com/hChfMhT.png'"
            alt="mandarinduck"
            width="120"
            height="120"
            class="object-cover w-full h-full"
          />
        </div>
      </div>
      <div>
        <h3 class="text-xl font-semibold">
          {{ teamName ?? "Player" }}
        </h3>
        <h4 class="text-lg">{{ profile?.["team name"] ?? "Team" }}</h4>
      </div>
    </div>
    <div class="py-4">
      <div class="flex-1 text-center">
        <p :class="classContainerHeading">Members</p>
        <div class="flex justify-center gap-2 mt-2">
          <NuxtImg
            v-for="(src, i) in team?.membersSrc ?? []"
            :key="i"
            :src="src"
            width="40"
            height="40"
            class="rounded-full"
            alt="member"
          />
        </div>
      </div>
      <div class="flex-1 text-center">
        <p :class="classContainerHeading">Placings Records</p>
        <p class="">1/2/3/4</p>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>Total Individual Points</p>
          </div>
          <div>
            <p class="font-bold text-lg text-green-600">+339.8</p>
          </div>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>Highest Score</p>
          </div>
          <p class="font-bold text-lg">59,400</p>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>4th Avoidance rate</p>
          </div>
          <p class="font-bold text-lg text-blue-600">89.47%</p>
        </div>
      </div>
    </div>
  </div>
</template>
