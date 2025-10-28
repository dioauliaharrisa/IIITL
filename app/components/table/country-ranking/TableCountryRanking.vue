<script setup>
const isOpen = ref(false);
const countries = [
  { name: "Indonesia", code: "ID", points: 248 },
  { name: "Australia", code: "AU", points: 310 },
  { name: "Brazil", code: "BR", points: 275 },
  { name: "Canada", code: "CA", points: 289 },
  { name: "Chinese Taipei", code: "TW", points: 301 },
  { name: "France", code: "FR", points: 292 },
  { name: "Hong Kong", code: "HK", points: 268 },
  { name: "Japan", code: "JP", points: 334 },
  { name: "Poland", code: "PL", points: 258 },
  { name: "Russia", code: "RU", points: 280 },
  { name: "Sweden", code: "SE", points: 266 },
  { name: "Singapore", code: "SG", points: 299 },
  { name: "South Korea", code: "KR", points: 320 },
  { name: "USA", code: "US", points: 345 },
  { name: "Norway", code: "NO", points: 274 },
  { name: "Ukraine", code: "UA", points: 260 },
  { name: "Vietnam", code: "VN", points: 255 },
];

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
          'text-xl uppercase text-white transition-all duration-1000 transform',
          isOpen ? 'font-semibold' : 'font-normal',
        ]"
      >
        Country Ranking
      </h2>
    </div>
    <template #content>
      <div>
        <UTable :data="countries" :columns="columns" class="flex-1">
          <template #name-cell="{ row }">
            <div class="flex items-center gap-2">
              <NuxtImg
                :src="`http://purecatamphetamine.github.io/country-flag-icons/3x2/${row.original.code}.svg`"
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
