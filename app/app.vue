<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div
      class="border-8 border-[#009a44] box-border min-h-screen w-full overflow-x-hidden"
    >
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
