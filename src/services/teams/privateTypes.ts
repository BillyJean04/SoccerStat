export interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    lastUpdated: string;
}

export interface TeamsDataApi {
    count: number;
    filters: {
        limit: number;
        offset: number;
        permission: string;
    };
    teams: Team[];
}
