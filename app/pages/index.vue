<script setup>
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const options = { sheetName: "Display_Stream_Schedule", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options
);
parser.parse().then((data) => {
  console.log("🦆 ~ data:", data);
});
</script>

<template>
  <div>
    <UMain>
      <!-- <MarqueeFlags /> -->
      <SectionVisionAndMission />
      <LazySectionCheckCurrentStanding />
      <TableCountryRanking />
      <LazyTableIndividualScoreRanking />
      <LazyTableHighestScore />
      <LazyTableMostFourthAvoidantRanking />
      <LazySectionSchedule />
    </UMain>
    <LazyFloatingButton />
  </div>
</template>
