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

export interface Matches {
    area: {
        id: number;
        name: string;
        code: string;
        flag?: string;
    };
    competition: {
        id: number;
        name: string;
        code: string;
        type: string;
        emblem: string;
    };
    season: {
        id: number;
        startDate: Date;
        endDate: Date;
        currentMatchday: number;
        winner?: {
            id: number;
            name: string;
            shortName: string;
            tla: string;
            crest: string;
            address: string;
            website: string;
            founded: number;
            clubColors: string;
            venue?: string;
            lastUpdated: Date;
        };
    };
    id: number;
    utcDate: string;
    status: StatusStrings;
    matchday: number;
    stage: Stage;
    group: string;
    lastUpdated: Date;
    homeTeam: {
        id: number;
        name: string;
        shortName: string;
        tla: string;
        crest: string;
    };
    awayTeam: {
        id: number;
        name: string;
        shortName: string;
        tla: string;
        crest: string;
    };
    score: {
        winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW";
        duration: "REGULAR" | "PENALTY_SHOOTOUT";
        fullTime: {
            home: number;
            away: number;
        };
        halfTime: {
            home: number;
            away: number;
        };
        regularTime: {
            home: number;
            away: number;
        };
        extraTime: {
            home: number;
            away: number;
        };
        penalties: {
            home: number;
            away: number;
        };
        odds: {
            message: string;
        };
        referees: {
            id: number;
            name: string;
            type: "REFEREE" | "CUP";
            nationality: string;
        }[];
    };
}

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
    matches: Matches[];
}
