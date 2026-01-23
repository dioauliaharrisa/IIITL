<script setup lang="ts">
import ChartRanking from "./components/chart-ranking/ChartRanking.vue";
import teams from "../../../../team-name-src.json";
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const route = useRoute();
const playerName = computed(() => {
  const name = route.params.name;
  return typeof name === "string" ? decodeURIComponent(name) : "";
});

const options = { sheetName: "Stat_Individual", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options,
);

const profile = ref();
const listProfiles = ref<any[]>([]);

const profileVS = computed(() => {
  if (!value.value) return undefined;
  return listProfiles.value.find(
    (p: any) =>
      p["discord name"] === value.value ||
      p.discordId === value.value ||
      p.nick === value.value,
  );
});

const clearVS = () => {
  value.value = "";
};

parser.parse().then((data) => {
  listProfiles.value = data;
  const filteredProfile = data.find(
    (item) => item["discordId"] === playerName.value,
  );
  console.log("🦆 ~ filteredProfile:", filteredProfile);
  profile.value = filteredProfile;
});

const currentTeam = computed(() =>
  teams.find((t) => t.membersSrc?.some((m) => m.name === profile.value?.nick)),
);

const avatarKeys = [
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

const playerSrc = computed(() => {
  if (profile.value) {
    for (const k of avatarKeys) {
      const v = profile.value[k];
      if (v) return v;
    }
  }

  const members = currentTeam.value?.membersSrc ?? [];
  const found = members.find((m: any) => m.name === profile.value?.nick);
  if (found?.src) return found.src;

  return "";
});

const playerSrcCompare = computed(() => {
  const p = profileVS;
  // profileVS is a computed; handle both its value and when used in template
  const profileObj = p?.value ?? p;
  if (!profileObj) return "";

  for (const k of avatarKeys) {
    const v = profileObj[k];
    if (v) return v;
  }

  const team = teams.find((t) =>
    t.membersSrc?.some((m) => m.name === profileObj.nick),
  );
  const found = team?.membersSrc?.find((m: any) => m.name === profileObj.nick);
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
  "Dama Win Rate",
  "Fuuro Win Rate",
  "1st Rate",
  "Rentai Rate",
];

//------COMPARE PROFILE SELECTOR------
const listPlayers = ref<{ label: string; value: string }[]>([]);
const value = ref("");
const parserCompare = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  { sheetName: "Display_Individual_Graph", useFormat: true },
);
parserCompare.parse().then((data) => {
  const mappedProfiles = data.map((item) => {
    return { label: item.nick, value: item["discord name"] };
  });

  listPlayers.value = mappedProfiles;
});
//------------------------------------

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

    <div class="p-4 flex flex-col gap-4 items-center">
      <USelectMenu
        v-model="value"
        value-key="value"
        variant="subtle"
        placeholder="Compare with"
        :items="listPlayers"
        size="xl"
        :ui="{ base: 'min-w-2/3 rounded-full' }"
      />
    </div>

    <div v-if="profileVS" class="flex gap-4">
      <div class="relative w-[120px] h-[120px]">
        <div class="rounded-full overflow-hidden w-full h-full">
          <NuxtImg
            :src="playerSrcCompare"
            alt="X"
            width="120"
            height="120"
            class="object-cover w-full h-full"
          />
        </div>

        <NuxtImg
          class="absolute bottom-0 right-2 bg-[#ca9654] z-9999 shadow-md"
          width="30"
          :alt="profileVS?.['Country'] ?? 'Country'"
          :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${profileVS?.['Country Code']}.svg`"
        />
      </div>
      <div>
        <h3 class="text-xl font-semibold text-gray-400">
          {{ profileVS?.["Player Name"] ?? profileVS?.nick ?? "Player" }}
        </h3>
        <h4 class="text-lg text-gray-400">
          {{ profileVS?.["Team Name"] ?? "Team" }}
        </h4>
        <h4 class="text-lg flex items-center gap-2 text-gray-400">
          <Icon name="ic:baseline-discord" class="w-5 h-5 text-[#5865F2]" />
          {{ profileVS?.discordId ?? "Discord ID" }}
        </h4>
      </div>

      <UButton
        icon="i-heroicons-x-mark"
        color="gray"
        variant="ghost"
        size="xs"
        :ui="{ rounded: 'rounded-full' }"
        aria-label="Clear compare selection"
        class="absolute right"
        @click="clearVS"
      />
    </div>

    <ChartRanking :player-name="route.params.name" />

    <div class="py-4">
      <div class="flex items-center justify-center gap-4">
        <div class="text-center">
          <p :class="classContainerHeading">Placings Records</p>
          <p class="">
            {{ profile?.["1st"] }}/{{ profile?.["2nd"] }}/{{
              profile?.["3rd"]
            }}/{{ profile?.["4th"] }}
          </p>
          <div v-if="profileVS" class="flex flex-col text-center">
            <p>VS</p>
            <p class="">
              {{ profileVS?.["1st"] ?? "-" }}/{{ profileVS?.["2nd"] ?? "-" }}/{{
                profileVS?.["3rd"] ?? "-"
              }}/{{ profileVS?.["4th"] ?? "-" }}
            </p>
          </div>
        </div>
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
            <div v-if="profileVS" class="flex flex-col text-center">
              <p>VS</p>
              <p
                class="font-bold text-xl"
                :class="
                  profileVS?.['Total'] > 0 ? 'text-green-400' : 'text-red-400'
                "
              >
                <span v-if="profileVS?.['Total'] > 0">+</span>
                <span v-else-if="profileVS?.['Total'] < 0">▲</span>
                {{ profileVS?.["Total"] }}
              </p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>Highest Score</p>
          </div>
          <p class="font-bold text-xl">
            {{ profile?.["Highest Score"] }}
          </p>
          <div v-if="profileVS" class="flex flex-col text-center">
            <p>VS</p>
            <p class="font-bold text-xl text-gray-400">
              {{ profileVS?.["Highest Score"] }}
            </p>
          </div>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>4th Avoidance rate</p>
          </div>
          <p class="font-bold text-xl">
            {{ profile?.["4th Avoidance Rate"] }}
          </p>
          <div v-if="profileVS" class="flex flex-col text-center">
            <p>VS</p>
            <p class="font-bold text-xl text-gray-400">
              {{ profileVS?.["4th Avoidance Rate"] }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Statistics -->
    <h3 class="mt-6 mb-2 text-lg font-semibold">Main Statistics</h3>
    <div
      class="mt-6 gap-x-6 gap-y-2"
      :class="profileVS ? 'grid grid-cols-3' : 'grid grid-cols-2'"
    >
      <template v-for="label in mainStatLabels" :key="label">
        <span class="text-sm text-gray-500">{{ label }}</span>

        <div class="flex items-center justify-end gap-1">
          <span class="font-semibold">
            {{ profile?.[label] ?? "-" }}
          </span>

          <UPopover v-if="label === 'Number of Games'" placement="top">
            <UButton
              icon="i-heroicons-exclamation-circle"
              color="gray"
              variant="ghost"
              size="xs"
              :ui="{ rounded: 'rounded-full' }"
              class="-my-1"
            />
            <template #content>
              <p class="p-2 text-xs">
                need {{ 20 - (profile?.["Number of Games"] || 0) }} games to
                qualify
              </p>
            </template>
          </UPopover>
        </div>

        <span v-if="profileVS" class="font-semibold text-right text-gray-400">
          {{ profileVS?.[label] ?? "-" }}
        </span>
      </template>
    </div>

    <!-- Other Statistics -->
    <h3 class="mt-6 mb-2 text-lg font-semibold">Other Statistics</h3>
    <div
      class="mt-6 gap-x-6 gap-y-2"
      :class="profileVS ? 'grid grid-cols-3' : 'grid grid-cols-2'"
    >
      <template v-for="label in otherStatLabels" :key="label">
        <span class="text-sm text-gray-500">{{ label }}</span>
        <span class="font-semibold text-right">
          {{ profile?.[label] ?? "-" }}
        </span>
        <span v-if="profileVS" class="font-semibold text-right text-gray-400">
          {{ profileVS?.[label] ?? "-" }}
        </span>
      </template>
    </div>

    <!-- </div> -->
    <!-- </div> -->
  </div>
</template>
