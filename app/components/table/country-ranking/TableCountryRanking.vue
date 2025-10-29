<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const options = { sheetName: "Display_Country_Ranking", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1G4VXF7ewoXhF--UWzn80E98QQOggNbXz4x7sU9mzGWw",
  options
);
const countries = ref([]);
parser.parse().then((data) => {
  countries.value = data;
});
const isOpen = ref(false);

const columns = [
  {
    accessorKey: "id",
    header: "No.",
    cell: (info) => info.row.index + 1,
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Country",
    size: 200,
  },
  {
    accessorKey: "points",
    header: "Points",
    size: 100,
  },
];
</script>

<template>
  <UCollapsible
    :open="isOpen"
    class="w-full flex flex-col gap-2"
    @update:open="isOpen = $event"
  >
    <div class="p-4 bg-primary">
      <h2
        :class="[
          'font-sans text-xl uppercase text-white transition-all duration-1000 transform',
          isOpen ? 'font-semibold' : 'font-normal',
        ]"
      >
        {{ $t("country_ranking") }}
      </h2>
    </div>
    <template #content>
      <div>
        <UTable :data="countries" :columns="columns" class="flex-1">
          <template #name-cell="{ row }">
            <div class="flex items-center gap-2">
              <NuxtImg
                :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${row.original.code}.svg`"
                width="28"
                height="20"
                class="rounded-sm"
              />
              <span>{{ row.original.name }}</span>
            </div>
          </template>
        </UTable>
      </div>
    </template>
  </UCollapsible>
</template>
