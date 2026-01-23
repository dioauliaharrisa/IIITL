<script setup lang="ts">
import SectionYoutubeStream from "../../app/components/section/youtube-stream/SectionYoutubeStream.vue";
</script>

<template>
  <div>
    <UMain>
      <SectionScheduleThisWeek />
      <SectionYoutubeStream />
      <MarqueeFlags />
      <SectionVisionAndMission />
      <!-- <LazySectionCheckCurrentStanding /> -->
      <LazySectionSelectProfile />
      <TableCountryRanking />
      <LazyTableIndividualScoreRanking />
      <LazyTableHighestScore />
      <LazyTableMostFourthAvoidantRanking />
      <LazySectionSchedule />
    </UMain>
    <!-- <LazyFloatingButton /> -->
  </div>
</template>
