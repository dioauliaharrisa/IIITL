<script setup lang="ts">
const { players, fetchRanking } = useHighestScorerRanking();

onMounted(fetchRanking);

const isOpen = ref(false);
const columns = [
  {
    accessorKey: "id",
    header: "No.",
    cell: (info) => info.row.index + 1,
    size: 50,
  },
  {
    accessorKey: "nick",
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
        <template #nick-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :src="row.original.displayPicture" />
            <span>{{ row.original.nick }}</span>
          </div>
        </template>
      </UTable>
    </template>
  </UCollapsible>
</template>
