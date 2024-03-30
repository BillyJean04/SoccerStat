import { StatusStrings } from "@/services/competitions/privateTypes.ts";

export interface Competition {
    id: number;
    name: string;
    area: {
        name: string;
    };
}

export interface Match {
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

export interface Match {}
