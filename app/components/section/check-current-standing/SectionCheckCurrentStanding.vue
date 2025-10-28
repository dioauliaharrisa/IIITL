<template>
  <UModal fullscreen title="Modal fullscreen" :ui="{ header: 'hidden' }">
    <div class="flex justify-center">
      <UButton label="CHECK CURRENT STANDING" class="rounded-full p-4 m-4" />
    </div>

    <template #body>
      <Placeholder class="h-full" />
    </template>
  </UModal>
</template>
