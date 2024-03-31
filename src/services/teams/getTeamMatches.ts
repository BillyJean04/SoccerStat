import { fetcher, transformMatchesData } from "@/lib/utils";
import { TeamMatchDataApi } from "@/services/teams/privateTypes";

const authToken = import.meta.env.VITE_API_KEY;

export async function getTeamMatches(id: number, params?: { dateFrom?: string; dateTo?: string }) {
    try {
        const data: TeamMatchDataApi = await fetcher(
            !params
                ? `/api/teams/${id}/matches`
                : `/api/teams/${id}/matches?dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`,
            {
                headers: {
                    "X-Auth-Token": authToken,
                },
            },
        );
        return transformMatchesData(data.matches);
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
