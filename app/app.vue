<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="border-8 border-[#009a44] h-full">
      <UHeader title="IIITL" />
      <UMain>
        <MarqueeFlags />
        <TableCountryRanking />
        <TableIndividualScoreRanking />
      </UMain>
      <UFooter>
        <template #left>
          <p class="text-muted text-sm">
            Copyright © {{ new Date().getFullYear() }}
          </p>
        </template>
      </UFooter>
      <FloatingButton />
    </div>
  </UApp>
</template>

<script setup></script>
