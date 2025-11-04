<script setup lang="ts">
import PublicGoogleSheetsParser from "public-google-sheets-parser";

const profiles = ref<string[]>([]);
const value = ref("");

const options = { sheetName: "Display_Individual_Score", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options
);
parser.parse().then((data) => {
  const mappedProfiles = data.map((item) => {
    return item.nick;
  });
  profiles.value = mappedProfiles;
});
</script>

<template>
  <div class="p-4 flex flex-col gap-4 items-center">
    <USelectMenu
      v-model="value"
      variant="subtle"
      placeholder="Check your profile"
      :items="profiles"
      size="xl"
      :ui="{ base: 'min-w-2/3 rounded-full' }"
      @change="$router.push({ path: `/profile/${value}` })"
    />
  </div>
</template>
