import { fetcher } from "@/lib/utils.ts";
import { MatchesCompetitionApi } from "@/services/competitions/privateTypes";
import { Match } from "@/services/competitions/publicTypes";

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
            matches: data.matches.map((match) => ({
                id: match.id,
                date: match.utcDate,
                status: match.status,
                homeTeam: {
                    id: match.homeTeam.id,
                    name: match.homeTeam.name,
                },
                awayTeam: {
                    id: match.awayTeam.id,
                    name: match.awayTeam.name,
                },
                score: {
                    fullTime: {
                        home: match.score.fullTime.home,
                        away: match.score.fullTime.away,
                    },
                    extraTime: {
                        home: match.score.extraTime?.home,
                        away: match.score.extraTime?.away,
                    },
                    penalties: {
                        home: match.score.penalties?.home,
                        away: match.score.penalties?.away,
                    },
                },
            })) satisfies Match[],
        };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
}
