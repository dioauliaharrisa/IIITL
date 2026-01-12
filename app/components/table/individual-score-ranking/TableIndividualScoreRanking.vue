<script setup lang="ts">
const { players, fetchTopPlayers } = useIndividualRanking();

const isOpen = ref(false);

onMounted(() => {
  fetchTopPlayers(10);
});

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
    accessorKey: "Total",
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
        <template #nick-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar
              :src="row.original.displayPicture"
              :alt="row.original.nick"
            />
            <span>{{ row.original.nick }}</span>
          </div>
        </template>
      </UTable>
    </template>
  </UCollapsible>
</template>
