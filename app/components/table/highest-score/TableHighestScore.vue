<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";

import teams from "../../../../team-name-src.json";

const findTeamSrc = (name) => {
  if (!name) return null;
  const target = name.toString().trim().toLowerCase();
  for (const t of teams) {
    const m = t.membersSrc?.find(
      (mm) => mm.name?.toString().trim().toLowerCase() === target
    );
    if (m?.src) return m.src;
  }
  return null;
};

const options = {
  sheetName: "Display_Highest_Scorer_Ranking",
  useFormat: true,
};
const parser = new PublicGoogleSheetsParser(
  "1G4VXF7ewoXhF--UWzn80E98QQOggNbXz4x7sU9mzGWw",
  options
);
const players = ref([]);
parser.parse().then((data) => {
  players.value = data.map((p) => {
    const existing =
      p.displayPicture || p.avatar || p.img || p.image || p.profileImage;
    const src =
      existing ||
      findTeamSrc(p.name ?? p.nick ?? p["discord name"] ?? p.discordId) ||
      "https://i.imgur.com/hChfMhT.png";
    return { ...p, displayPicture: src };
  });
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
        {{ $t("highest_scorer_ranking") }}
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
