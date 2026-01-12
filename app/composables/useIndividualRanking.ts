import PublicGoogleSheetsParser from "public-google-sheets-parser";
import { useTeamSrc } from "~/composables/useTeamSrc";

type Player = {
  nick: string;
  Total: string | number;
  displayPicture?: string | null;
};

export const useIndividualRanking = () => {
  const { findTeamSrc } = useTeamSrc();
  const players = ref<Player[]>([]);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const fetchTopPlayers = async (limit = 10) => {
    loading.value = true;
    error.value = null;

    try {
      const parser = new PublicGoogleSheetsParser(
        "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
        { sheetName: "Stat_Individual", useFormat: true }
      );

      const data = await parser.parse();

      players.value = data
        .map((p: Player) => ({
          ...p,
          displayPicture: findTeamSrc(p.nick) ?? p.displayPicture ?? null,
        }))
        .sort((a, b) => Number(b.Total) - Number(a.Total))
        .slice(0, limit);
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    players,
    loading,
    error,
    fetchTopPlayers,
  };
};
