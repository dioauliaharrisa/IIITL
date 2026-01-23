<script setup lang="ts">
import ChartRanking from "./components/chart-ranking/ChartRanking.vue";
const route = useRoute();
console.log("🦆 ~ route:", route);
const { team, members, fetchTeam } = useTeamStat();

onMounted(() => {
  fetchTeam(route.params.teamname as string);
});

const classContainerHeading =
  "font-heading font-bold h-12 flex items-center justify-center";
</script>

<template>
  <div class="p-4">
    <div class="flex gap-4">
      <div class="relative w-[120px] h-[120px]">
        <div class="rounded-full overflow-hidden w-full h-full">
          <NuxtImg
            :src="team?.urlLogoTeam || 'https://i.imgur.com/hChfMhT.png'"
            width="120"
            height="120"
          />

          <h3 class="text-xl font-semibold">
            {{ team?.nameTeam || "Team" }}
          </h3>
          <p class="text-sm text-gray-600 mt-1">
            Rank #{{ team?.rank || "-" }}
          </p>
        </div>
      </div>
      <div>
        <h3 class="text-xl font-semibold">
          {{ team?.nameTeam || "Team" }}
        </h3>
      </div>
    </div>
    <div class="py-4 flex flex-col gap-6">
      <div class="flex-1 text-center">
        <p :class="classContainerHeading">Members</p>
        <div class="flex justify-center gap-2">
          <div
            v-for="(member, i) in members"
            :key="i"
            class="flex flex-col items-center cursor-pointer"
            @click="$router.push(`/profile/${member.discordId}`)"
          >
            <NuxtImg
              :src="member.src || 'https://i.imgur.com/hChfMhT.png'"
              width="40"
              height="40"
              class="rounded-full"
            />
            <span class="text-xs mt-1 text-center">
              {{ member.name }}
            </span>
          </div>
        </div>
      </div>
      <ChartRanking :team-name="route.params.teamname" />
      <div class="flex-1 text-center">
        <p :class="classContainerHeading">Placings Records</p>
        <p class="font-semibold">
          {{ team?.["first"] }}/{{ team?.["second"] }}/{{ team?.["third"] }}/{{
            team?.["fourth"]
          }}
        </p>
      </div>
      <div class="text-center">
        <div :class="classContainerHeading">
          <p>Total Points</p>
        </div>
        <div>
          <p
            class="font-bold text-lg"
            :class="
              Number(team?.Total) >= 0 ? 'text-green-600' : 'text-red-600'
            "
          >
            {{ Number(team?.Total) > 0 ? "+" : "" }}{{ team?.Total }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
