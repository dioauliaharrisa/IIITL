<script setup>
const { teams, fetchTeams } = useTeamRanking();
console.log("🦆 ~ teams:", teams);

const isOpen = ref(false);

onMounted(() => {
  fetchTeams();
});

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
        {{ $t("country_ranking") }}
      </h2>
    </div>
    <template #content>
      <div>
        <UTable :data="teams" :columns="columns" class="flex-1">
          <template #name-cell="{ row }">
            <div class="flex items-center gap-2">
              <UAvatar :src="row.original.urlLogoTeam" />
              <NuxtImg
                v-for="country in countries"
                :key="country.code"
                width="30"
                :alt="country.name"
                :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`"
              />
              <div class="flex flex-col">
                <span>{{ row.original.nameTeam }}</span>
                <span class="text-[8px] text-gray-400 leading-none">
                  {{ row.original.Representing }}
                </span>
              </div>
            </div>
          </template>
        </UTable>
      </div>
    </template>
  </UCollapsible>
</template>
