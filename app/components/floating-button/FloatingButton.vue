<script setup>
const { y } = useScroll(window);
const rotation = computed(() => `rotate(${y.value % 360}deg)`);

const scrollToTop = () => {
  const el = document.querySelector("main") || window;
  el.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <NuxtImg
      src="/logo.svg"
      alt="Logo"
      class="w-[50px]"
      :style="{ transform: rotation }"
      @click="scrollToTop"
    />
  </div>
</template>
