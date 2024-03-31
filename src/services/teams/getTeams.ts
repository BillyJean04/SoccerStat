import { fetcher } from "@/lib/utils.ts";
import { TeamsDataApi } from "@/services/teams/privateTypes";
import { type Team } from "@/services/teams/publicTypes";

const authToken = import.meta.env.VITE_API_KEY;

export async function getTeams() {
    try {
        const data: TeamsDataApi = await fetcher("/api/teams?limit=500", {
            headers: {
                "X-Auth-Token": authToken,
            },
        });

        return data.teams.map((team) => ({
            id: team.id,
            name: team.name,
            image: team.crest,
        })) satisfies Team[];
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
