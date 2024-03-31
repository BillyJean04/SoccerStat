import { MatchBase } from "@/types";

export interface Team {
    id: number;
    name: string;
    image: string;
}

export interface TeamMatch extends MatchBase {}
