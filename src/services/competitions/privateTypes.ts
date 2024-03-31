import { MatchDataApiBase } from "@/types";

export enum Status {
    SCHEDULED = "Запланирован",
    LIVE = "В прямом эфире",
    IN_PLAY = "В игре",
    PAUSED = "Пауза",
    FINISHED = "Завершен",
    POSTPONED = "Отложен",
    SUSPENDED = "Приостановлен",
    CANCELED = "Отменен",
}

export enum Stage {
    GROUP_STAGE,
    LAST_16,
    QUARTER_FINALS,
    SEMI_FINALS,
    THIRD_PLACE,
    FINAL,
}

export type StatusStrings = keyof typeof Status;

export interface Area {
    id: number;
    name: string;
    countryCode: string;
    ensignUrl?: string;
}

export interface CurrentSeason {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner?: string;
}

export interface Competition {
    id: number;
    area: Area;
    name: string;
    code: string;
    ensignUrl?: string;
    plan: string;
    currentSeason: CurrentSeason;
    numberOfAvailableSeasons: string;
    lastUpdated: Date;
}

export interface CompetitionDataApi {
    count: number;
    filters: object;
    competitions: Competition[];
}

export interface Match extends MatchDataApiBase {}

export interface MatchesCompetitionApi {
    filters: object;
    resultSet: {
        count: number;
        first: Date;
        last: Date;
        played: number;
    };
    competition: {
        id: number;
        name: string;
        code: string;
        type: string;
        emblem: string;
    };
    matches: Match[];
}
