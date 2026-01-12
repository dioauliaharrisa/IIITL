import PublicGoogleSheetsParser from "public-google-sheets-parser";
import teams from "../../team-name-src.json";

type PlayerRow = {
  nick?: string;
  ["Highest Score"]?: string | number;
  [key: string]: any;
};

export const useHighestScorerRanking = () => {
  const players = ref<PlayerRow[]>([]);
  const isLoading = ref(false);

  const findTeamSrc = (name?: string | null): string | null => {
    if (!name) return null;
    const target = name.trim().toLowerCase();

    for (const t of teams as any[]) {
      const m = t.membersSrc?.find(
        (mm: any) => mm.name?.trim().toLowerCase() === target
      );
      if (m?.src) return m.src;
    }
    return null;
  };

  const fetchRanking = async () => {
    isLoading.value = true;

    const parser = new PublicGoogleSheetsParser(
      "1G4VXF7ewoXhF--UWzn80E98QQOggNbXz4x7sU9mzGWw",
      {
        sheetName: "Display_Highest_Scorer_Ranking",
        useFormat: true,
      }
    );

    const data = (await parser.parse()) as PlayerRow[];

    players.value = data
      .map((p) => ({
        ...p,
        highestScore: Number(p["Highest Score"] ?? "ga ada"),
        displayPicture: findTeamSrc(p.nick),
      }))
      .sort((a, b) => b.highestScore - a.highestScore);
    console.log("🦆 ~ fetchRanking ~ players.value:", players.value);

    isLoading.value = false;
  };

  return {
    players,
    isLoading,
    fetchRanking,
  };
};
