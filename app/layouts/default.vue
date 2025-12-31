<template>
  <div
    class="border-8 border-red-500 box-border min-h-screen w-full overflow-x-hidden"
  >
    <SectionHeader />
    <main>
      <slot />
    </main>
    <SectionFooter />
  </div>
</template>
