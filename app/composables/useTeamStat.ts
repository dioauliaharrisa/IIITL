import PublicGoogleSheetsParser from "public-google-sheets-parser";
import teams from "../../team-name-src.json";

export interface TeamProfile {
  Representing: string;
  urlLogoTeam: string;
  nameTeam: string;
  Raw: number;
  Uma: number;
  Total: number;
  numberOfGames: number;
  numberOfHands: number;
  rateWin: number;
  pointAverage: number;
  rateDealIn: number;
  rateRiichi: number;
  rateRiichiWin: number;
  rateIppatsu: number;
  rateOpen: number;
  rateTsumo: number;
  doraAverage: number;
  first: number;
  second: number;
  third: number;
  fourth: number;
  rankAverage: number;
}

const TEAM_SHEET_ID = "1EJxSdz98HHM3gPD9u7fjiLWWmu_ZDBV0U1m-Z-a1uGc";

export const useTeamStat = () => {
  const team = ref<TeamProfile | null>(null);
  const members = ref<any[]>([]);

  const teamMap = Object.fromEntries(teams.map((t) => [t.name, t]));

  const fetchTeam = async (teamName: string) => {
    const parser = new PublicGoogleSheetsParser(TEAM_SHEET_ID, {
      sheetName: "Stat_Team",
      useFormat: true,
    });

    const data = await parser.parse();

    const row = data.find((r) => r["nameTeam"] === teamName);

    if (!row) return;

    team.value = {
      Representing: row["Representing"],
      urlLogoTeam: row["urlLogoTeam"],
      nameTeam: row["nameTeam"],
      Raw: Number(row["Raw"]),
      Uma: Number(row["Uma"]),
      Total: Number(row["Total"]),
      numberOfGames: Number(row["numberOfGames"]),
      numberOfHands: Number(row["numberOfHands"]),
      rateWin: Number(row["rateWin"]),
      pointAverage: Number(row["pointAverage"]),
      rateDealIn: Number(row["rateDealIn"]),
      rateRiichi: Number(row["rateRiichi"]),
      rateRiichiWin: Number(row["rateRiichiWin"]),
      rateIppatsu: Number(row["rateIppatsu"]),
      rateOpen: Number(row["rateOpen"]),
      rateTsumo: Number(row["rateTsumo"]),
      doraAverage: Number(row["doraAverage"]),
      first: Number(row["1st"]),
      second: Number(row["2nd"]),
      third: Number(row["3rd"]),
      fourth: Number(row["4th"]),
      rankAverage: Number(row["rankAverage"]),
    };

    members.value = teamMap[teamName]?.membersSrc ?? [];
  };

  return {
    team,
    members,
    fetchTeam,
  };
};
