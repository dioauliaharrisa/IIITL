<script setup lang="ts">
import teams from "../../../../team-name-src.json";
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const route = useRoute();
const playerName = computed(() =>
  decodeURIComponent(route.params.name as string)
);

const options = { sheetName: "Stat_Individual", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options
);

const profile = ref();

parser.parse().then((data) => {
  const filteredProfile = data.find(
    (item) => item["discordId"] === playerName.value
  );
  profile.value = filteredProfile;
});

const currentTeam = computed(() =>
  teams.find((t) => t.membersSrc?.some((m) => m.name === profile.value?.nick))
);

const playerSrc = computed(() => {
  if (profile.value) {
    const keys = [
      "displayPicture",
      "Display Picture",
      "avatar",
      "Avatar",
      "img",
      "image",
      "profileImage",
      "Profile Image",
      "profile_image",
      "display_picture",
    ];
    for (const k of keys) {
      const v = profile.value[k];
      if (v) return v;
    }
  }

  const members = currentTeam.value?.membersSrc ?? [];
  const found = members.find((m: any) => m.name === profile.value?.nick);
  if (found?.src) return found.src;

  return "";
});

const mainStatLabels = [
  "Number of Games",
  "Number of Hands",
  "Win Rate",
  "Average Points",
  "Deal In Rate",
  "Riichi Rate",
  "Tsumo Rate",
  "Average Rank",
];

const otherStatLabels = [
  "Average Dora",
  "Dora",
  "Ura Dora",
  "Ippatsu Rate",
  "Fuuro Rate",
  "Riichi Win Rate",
];

const classContainerHeading =
  "font-heading font-bold h-24 flex items-center justify-center";
</script>

<template>
  <div class="p-4">
    <div class="flex gap-4">
      <div class="relative w-[120px] h-[120px]">
        <div class="rounded-full overflow-hidden w-full h-full">
          <NuxtImg
            :src="playerSrc"
            alt="X"
            width="120"
            height="120"
            class="object-cover w-full h-full"
          />
        </div>

        <NuxtImg
          class="absolute bottom-0 right-2 bg-[#ca9654] z-9999 shadow-md"
          width="30"
          :alt="'Indonesia'"
          :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${profile?.['Country Code']}.svg`"
        />
      </div>
      <div>
        <h3 class="text-xl font-semibold">
          {{ profile?.["Player Name"] ?? "Player" }}
        </h3>
        <h4 class="text-lg">{{ profile?.["Team Name"] ?? "Team" }}</h4>
        <h4 class="text-lg flex items-center gap-2">
          <Icon name="ic:baseline-discord" class="w-5 h-5 text-[#5865F2]" />
          {{ profile?.discordId ?? "Discord ID" }}
        </h4>
      </div>
    </div>
    <div class="py-4">
      <div class="flex-1 text-center">
        <p :class="classContainerHeading">Placings Records</p>
        <p class="">
          {{ profile?.["1st"] }}/{{ profile?.["2nd"] }}/{{
            profile?.["3rd"]
          }}/{{ profile?.["4th"] }}
        </p>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>Total Individual Points</p>
          </div>
          <div>
            <p
              class="font-bold text-xl"
              :class="
                profile?.['Total'] > 0 ? 'text-green-600' : 'text-red-600'
              "
            >
              <span v-if="profile?.['Total'] > 0">+</span>
              <span v-else-if="profile?.['Total'] < 0">▲</span>
              {{ profile?.["Total"] }}
            </p>
          </div>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>Highest Score</p>
          </div>
          <p class="font-bold text-xl">
            {{ profile?.["Highest Score"] }}
          </p>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>4th Avoidance rate</p>
          </div>
          <p class="font-bold text-xl">
            {{ profile?.["4th Avoidance Rate"] }}
          </p>
        </div>
      </div>
    </div>
    <!-- <div class="grid grid-cols-2 gap-4 mt-6"> -->
    <!-- <div class="mt-6 space-y-2"> -->

    <!-- Main Statistics -->
    <h3 class="mt-6 mb-2 text-lg font-semibold">Main Statistics</h3>
    <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
      <template v-for="label in mainStatLabels" :key="label">
        <span class="text-sm text-gray-500">{{ label }}</span>
        <span class="font-semibold text-right">
          {{ profile?.[label] ?? "-" }}
        </span>
      </template>
    </div>

    <!-- Other Statistics -->
    <h3 class="mt-6 mb-2 text-lg font-semibold">Other Statistics</h3>
    <div class="mt-6 grid grid-cols-2 gap-x-6 gap-y-2">
      <template v-for="label in otherStatLabels" :key="label">
        <span class="text-sm text-gray-500">{{ label }}</span>
        <span class="font-semibold text-right">
          {{ profile?.[label] ?? "-" }}
        </span>
      </template>
    </div>

    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>
