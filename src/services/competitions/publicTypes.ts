import { MatchBase } from "@/types";

export interface Competition {
    id: number;
    name: string;
    area: {
        name: string;
    };
}

export interface Match extends MatchBase {}
