import teams from "../../team-name-src.json";

type TeamMember = {
  name?: string;
  src?: string;
};

type Team = {
  membersSrc?: TeamMember[];
};

export const useTeamSrc = () => {
  const findTeamSrc = (name?: string | null): string | null => {
    if (!name) return null;

    const target = name.trim().toLowerCase();

    for (const t of teams as Team[]) {
      const m = t.membersSrc?.find(
        (mm) => mm.name?.trim().toLowerCase() === target
      );
      if (m?.src) return m.src;
    }

    return null;
  };

  return { findTeamSrc };
};
