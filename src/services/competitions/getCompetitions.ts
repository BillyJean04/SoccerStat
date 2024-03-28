import { fetcher } from "@/lib/utils.ts";
import { CompetitionDataApi } from "@/services/competitions/privateTypes.ts";
import { Competition } from "@/services/competitions/publicTypes.ts";

const authToken = import.meta.env.VITE_API_KEY;

export async function getCompetitions() {
    try {
        const data: CompetitionDataApi = await fetcher("/api/competitions", {
            headers: {
                "X-Auth-Token": authToken,
            },
        });

        return data.competitions.map((competition) => ({
            id: competition.id,
            name: competition.name,
            area: {
                name: competition.area.name,
            },
        })) satisfies Competition[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
