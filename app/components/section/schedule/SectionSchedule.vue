<script setup></script>

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
