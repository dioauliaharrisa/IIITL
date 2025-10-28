<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="border-8 border-[#009a44] h-full">
      <SectionHeader />
      <UMain>
        <MarqueeFlags />
        <SectionVisionAndMission />
        <TableCountryRanking />
        <TableIndividualScoreRanking />
        <TableHighestScore />
        <TableMostFourthAvoidantRanking />
        <SectionSchedule />
      </UMain>
      <LazySectionFooter />
      <FloatingButton />
    </div>
  </UApp>
</template>

<script setup></script>
