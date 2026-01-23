<script setup lang="ts">
// import teams from "../../../../team-name-src.json";
import PublicGoogleSheetsParser from "public-google-sheets-parser";
const props = defineProps<{ teamName?: string }>();

const teamName = computed(() =>
  props.teamName ? decodeURIComponent(props.teamName) : "",
);

const options = { sheetName: "Display_Team_Graph", useFormat: true };
const parser = new PublicGoogleSheetsParser(
  "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
  options,
);

parser.parse().then((data) => {
  const foundData = data.find((item) => item["team name"] === teamName.value);
  console.log("🦆 ~ data:", teamName.value);
  if (!foundData) return;

  const chartData = Object.entries(foundData)
    .filter(([key]) => !isNaN(Number(key)))
    .map(([key, value], index) => {
      const [rank, score] = value.split(",").map((v) => v.trim());
      return {
        date: `${index + 1}`,
        score: Number(rank),
        rank: Number(score),
      };
    })
    .filter((d) => !Number.isNaN(d.rank));

  const totals = Object.fromEntries(
    Object.entries(foundData).filter(([k]) => k.startsWith("tot_")),
  );
  const chartData2 = Object.keys(totals).map((key, i) => {
    const split = totals[key].split(", ");
    return { date: String(i + 1), score: Number(split[1]) };
  });

  const merged = {
    ...foundData,
    chartData,
    chartData2,
  };

  profile.value = merged;
});

const profile = ref();

const categories: Record<string, BulletLegendItemInterface> = {
  score: { name: "Score", color: "#801b1f" },
  // rank: { name: "Rank", color: "#3b82f6" },
};
const xFormatter = (tick: number, _i?: number, _ticks?: number[]): string => {
  return String(profile?.value?.chartData?.[tick]?.date ?? "");
};
const yFormatter = (value: number) => String(value);
interface MarkerConfig {
  type?: "circle" | "square" | "triangle" | "diamond";
  size?: number;
  strokeWidth?: number;
  color?: string;
  strokeColor?: string;
}
const MarkerConfig = {
  rank: {
    type: "circle",
    size: 18,
    color: "#22c55e",
    strokeColor: "#22c55e",
    strokeWidth: 20,
  },
};
</script>

<template>
  <div class="snap-center shrink-0 w-full">
    <div class="">
      <LineChart
        :data="profile?.chartData"
        :height="250"
        x-label="Hanchan"
        :x-num-ticks="24"
        :categories="categories"
        :x-formatter="xFormatter"
        y-label="Rank"
        :y-domain="[4, 1]"
        :y-tick-line="true"
        :y-num-ticks="4"
        :y-domain-line="true"
        :y-formatter="yFormatter"
        :y-grid-line="true"
        :curve-type="CurveType.Linear"
        :marker-config="MarkerConfig"
        :hide-y-axis="false"
        hide-legend
      >
        <template #tooltip="{ values }">
          <div>Score: {{ String(values?.rank) }}</div>
        </template>
      </LineChart>
    </div>
  </div>
</template>
