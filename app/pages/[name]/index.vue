<template>
  <div class="p-4">
    <div class="flex gap-4">
      <div class="relative w-[120px] h-[120px]">
        <!-- keep parent relative -->
        <div class="rounded-full overflow-hidden w-full h-full">
          <!-- image wrapper -->
          <NuxtImg
            src="https://cdn.discordapp.com/avatars/482905063505920022/7aa2186844c2710c1c30a0445f2d7655.webp?size=240"
            alt="mandarinduck"
            width="120"
            height="120"
            class="object-cover w-full h-full"
          />
        </div>

        <NuxtImg
          class="absolute bottom-0 right-2 bg-[#ca9654] z-[9999] shadow-md"
          width="30"
          :alt="'Indonesia'"
          :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/ID.svg`"
        />
      </div>
      <div>
        <h3 class="text-xl font-semibold">Dio</h3>
        <h4 class="text-lg">KOMODO D.E.A.D.</h4>
      </div>
    </div>
  </div>
</template>
