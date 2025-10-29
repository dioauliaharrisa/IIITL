<script setup>
const classContainerHeading =
  "font-heading font-bold h-24 flex items-center justify-center";
</script>

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
    <div class="py-4">
      <div class="flex-1 text-center">
        <p :class="classContainerHeading">Placings Records</p>
        <p class="">1/2/3/4</p>
      </div>
      <div class="grid grid-cols-3 gap-4 mt-4">
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>Total Individual Points</p>
          </div>
          <div>
            <p class="font-bold text-lg text-green-600">+339.8</p>
          </div>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>Highest Score</p>
          </div>
          <p class="font-bold text-lg">59,400</p>
        </div>
        <div class="text-center">
          <div :class="classContainerHeading">
            <p>4th Avoidance rate</p>
          </div>
          <p class="font-bold text-lg text-blue-600">89.47%</p>
        </div>
      </div>
    </div>
  </div>
</template>
