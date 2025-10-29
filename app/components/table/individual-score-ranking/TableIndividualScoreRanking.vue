<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const options = { sheetName: "Display_Individual_Ranking", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1G4VXF7ewoXhF--UWzn80E98QQOggNbXz4x7sU9mzGWw",
  options
);
const players = ref([]);
parser.parse().then((data) => {
  players.value = data;
});
// const players = [
//   {
//     name: "Alex Carter",
//     code: "https://github.com/benjamincanac.png",
//     points: 248,
//   },
//   {
//     name: "Mika Tanaka",
//     code: "https://github.com/benjamincanac.png",
//     points: 310,
//   },
//   {
//     name: "Lucas Silva",
//     code: "https://github.com/benjamincanac.png",
//     points: 275,
//   },
//   {
//     name: "Noah Johnson",
//     code: "https://github.com/benjamincanac.png",
//     points: 289,
//   },
//   {
//     name: "Wei Chen",
//     code: "https://github.com/benjamincanac.png",
//     points: 301,
//   },
//   {
//     name: "Julien Dupont",
//     code: "https://github.com/benjamincanac.png",
//     points: 292,
//   },
//   {
//     name: "Nathan Lee",
//     code: "https://github.com/benjamincanac.png",
//     points: 268,
//   },
//   {
//     name: "Haruto Sato",
//     code: "https://github.com/benjamincanac.png",
//     points: 334,
//   },
//   {
//     name: "Piotr Nowak",
//     code: "https://github.com/benjamincanac.png",
//     points: 258,
//   },
//   {
//     name: "Dmitri Ivanov",
//     code: "https://github.com/benjamincanac.png",
//     points: 280,
//   },
//   {
//     name: "Oskar Berg",
//     code: "https://github.com/benjamincanac.png",
//     points: 266,
//   },
//   {
//     name: "Ethan Wong",
//     code: "https://github.com/benjamincanac.png",
//     points: 299,
//   },
//   {
//     name: "Jisoo Park",
//     code: "https://github.com/benjamincanac.png",
//     points: 320,
//   },
//   {
//     name: "Liam Smith",
//     code: "https://github.com/benjamincanac.png",
//     points: 345,
//   },
//   {
//     name: "Erik Hansen",
//     code: "https://github.com/benjamincanac.png",
//     points: 274,
//   },
//   {
//     name: "Oleh Petrov",
//     code: "https://github.com/benjamincanac.png",
//     points: 260,
//   },
//   {
//     name: "Minh Nguyen",
//     code: "https://github.com/benjamincanac.png",
//     points: 255,
//   },
// ];
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
        {{ $t("player_ranking") }}
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
