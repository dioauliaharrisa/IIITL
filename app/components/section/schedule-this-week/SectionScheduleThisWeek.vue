<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const loading = ref(true);
const schedule = ref([]);
const options = { sheetName: "Display_Stream_Schedule", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options
);
parser.parse().then((data) => {
  schedule.value = data;
  loading.value = false; // ✅ added
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
      <pre class="font-semibold">{{ item.schedule }}</pre>
      <div class="grid grid-cols-2 gap-4 text-xs h-[375px]">
        <UCard
          v-for="key in item.listCountries.split(',')"
          :key="key"
          variant="solid"
          class="flex flex-col justify-between"
          :ui="{
            body: 'p-0',
            footer: 'p-2 bg-amber-600',
          }"
        >
          <NuxtImg
            :src="'https://i.imgur.com/hChfMhT.png'"
            alt="Country Flag"
            class="mx-auto"
          />

          <template #footer>
            <p class="text-center">{{ key }}</p>
          </template>
        </UCard>
      </div>
    </UCarousel>
  </div>
</template>
