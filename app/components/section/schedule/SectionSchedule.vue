<script setup></script>

<template>
  <UCollapsible class="w-full flex flex-col gap-2">
    <div class="p-4 bg-primary">
      <h2 class="text-center text-2xl uppercase text-white">
        Upcoming Match Schedule
      </h2>
    </div>

    <template #content>
      <UTable :data="players" :columns="columns" class="flex-1">
        <template #name-cell="{ row }">
          <div class="flex items-center gap-2">
            <UAvatar :src="row.original.code" />
            <span>{{ row.original.name }}</span>
          </div>
        </template>
      </UTable>
    </template>
  </UCollapsible>
</template>
