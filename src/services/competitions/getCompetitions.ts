import { CompetitionDataApi } from "@/services/competitions/privateTypes.ts";
import { Competition } from "@/services/competitions/publicTypes.ts";

export async function getCompetitions() {
    const data: CompetitionDataApi = await fetch("/api/competitions", {
        headers: {
            "X-Auth-Token": import.meta.env.VITE_API_KEY,
        },
    }).then((res) => res.json());

    return data.competitions.map((competition) => ({
        id: competition.id,
        name: competition.name,
        area: {
            name: competition.area.name,
        },
    })) satisfies Competition[];
}
