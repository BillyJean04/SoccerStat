import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { MatchBase, MatchDataApiBase } from "@/types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function paginationRange(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
}

export async function fetcher<T>(input: RequestInfo, init: RequestInit) {
    const response = await fetch(input, init);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return (await response.json()) as Promise<T>;
}

export function transformMatchesData(matches: MatchDataApiBase[]): MatchBase[] {
    return matches.map((match) => ({
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
    }));
}
