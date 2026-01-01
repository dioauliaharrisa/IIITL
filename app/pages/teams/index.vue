<script setup lang="ts">
import teams from "../../../../team-name-src.json";
</script>

<template>
  <section class="p-6">
    <!-- Heading -->
    <h2 class="text-2xl font-heading font-bold mb-6 text-center">
      List of Teams
    </h2>

    <!-- Grid -->
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="team in teams"
        :key="team.name"
        class="aspect-square border border-red-300 rounded-xl p-4 flex flex-col items-center justify-between shadow-sm"
        @click="$router.push(`/team/${team.name}`)"
      >
        <!-- Team logo -->
        <NuxtImg
          :src="team.src"
          :alt="team.name"
          class="w-24 h-24 object-contain"
          format="webp"
        />

        <!-- Team name -->
        <p
          class="font-semibold text-center text-sm mt-2 h-14 line-clamp-3 flex items-center justify-center"
        >
          {{ team.name }}
        </p>

        <!-- Members -->
        <!-- <div class="flex gap-2 mt-3">
          <NuxtImg
            v-for="(m, i) in team.membersSrc"
            :key="i"
            :src="m.src"
            class="w-8 h-8 rounded-full"
            alt="member"
            format="webp"
          />
          <pre>{{ m.src }}</pre>
        </div> -->
      </div>
    </div>
  </section>
</template>
