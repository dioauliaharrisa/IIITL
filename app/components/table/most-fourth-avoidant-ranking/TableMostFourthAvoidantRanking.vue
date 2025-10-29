<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const options = {
  sheetName: "Display_Most_Fourth_Avoidant_Ranking",
  useFormat: true,
};
const parser = new PublicGoogleSheetsParser(
  "1G4VXF7ewoXhF--UWzn80E98QQOggNbXz4x7sU9mzGWw",
  options
);
const players = ref([]);
parser.parse().then((data) => {
  players.value = data;
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
    header: "Player",
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
          'text-xl uppercase text-white transition-all duration-1000 transform',
          isOpen ? 'font-semibold' : 'font-normal',
        ]"
      >
        {{ $t("most_4th_avoidant_ranking") }}
      </h2>
    </div>

    <template #content>
      <UTable :data="players" :columns="columns" class="flex-1">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :src="row.original.displayPicture" />
            <span>{{ row.original.name }}</span>
          </div>
        </template>
      </UTable>
    </template>
  </UCollapsible>
</template>
