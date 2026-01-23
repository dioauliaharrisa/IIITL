import PublicGoogleSheetsParser from "public-google-sheets-parser";
import { useTeamSrc } from "~/composables/useTeamSrc";

type Player = {
  nick: string;
  Total: string | number;
  displayPicture?: string | null;
};

export const useTeamRanking = () => {
  const { findTeamSrc } = useTeamSrc();
  const teams = ref<Player[]>([]);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const fetchTeams = async () => {
    loading.value = true;
    error.value = null;

    try {
      const parser = new PublicGoogleSheetsParser(
        "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc",
        { sheetName: "Stat_Team", useFormat: true },
      );

      const data = await parser.parse();

      teams.value = data
        .map((p: Player) => ({
          ...p,
          displayPicture: findTeamSrc(p.nick) ?? p.displayPicture ?? null,
        }))
        .sort((a, b) => Number(b.Total) - Number(a.Total));
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return {
    teams,
    loading,
    error,
    fetchTeams,
  };
};
