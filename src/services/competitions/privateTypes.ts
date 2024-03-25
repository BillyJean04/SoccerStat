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
