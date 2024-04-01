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
            if (error.message.includes("You reached your request limit.")) {
                throw new Error("Достигнут лимит на запросы. Попробуйте позже");
            }
            if (
                error.message.includes(
                    "The resource you are looking for is restricted and apparently not within your permissions",
                )
            ) {
                throw new Error("Ресурс который вы ищете ограничен и по видимому не входит в ваши права доступа");
            }
        }
    }
}
