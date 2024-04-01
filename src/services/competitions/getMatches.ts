import { fetcher, transformMatchesData } from "@/lib/utils";
import { MatchesCompetitionApi } from "@/services/competitions/privateTypes";

const authToken = import.meta.env.VITE_API_KEY;

export default async function getMatches(id: number, params?: { dateFrom?: string; dateTo?: string }) {
    try {
        const data: MatchesCompetitionApi = await fetcher(
            !params
                ? `/api/competitions/${id}/matches`
                : `/api/competitions/${id}/matches?dateFrom=${params.dateFrom}&dateTo=${params.dateTo}`,
            {
                headers: {
                    "X-Auth-Token": authToken,
                },
            },
        );

        return {
            competitionName: data.competition.name,
            matches: transformMatchesData(data.matches),
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message.includes("You reached your request limit.")) {
                throw new Error("Достигнут лимит на запросы. Попробуйте позже");
            }
        }
    }
}
