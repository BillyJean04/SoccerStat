import { Stage, StatusStrings } from "@/services/competitions/privateTypes";

export interface MatchDataApiBase {
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

export interface MatchBase {
    id: number;
    date: string;
    status: StatusStrings;
    homeTeam: {
        id: number;
        name: string;
    };
    awayTeam: {
        id: number;
        name: string;
    };
    score: {
        fullTime: {
            home: number;
            away: number;
        };
        extraTime?: {
            home: number;
            away: number;
        };
        penalties?: {
            home: number;
            away: number;
        };
    };
}
