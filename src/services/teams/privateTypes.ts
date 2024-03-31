import { MatchDataApiBase } from "@/types";

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

export interface RunningCompetition {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
}

export interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    contract: {
        start: string;
        until: string;
    };
}

export interface Squad {
    id: number;
    name: string;
    position: string;
    dateOfBirth: string;
    nationality: string;
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

export interface TeamMatch extends MatchDataApiBase {}

export interface TeamMatchDataApi {
    filters: {
        dateFrom?: string;
        dateTo?: string;
        competitions: string;
        permission: string;
        limit: number;
    };
    resultSet: {
        count: number;
        competitions: string;
        first: string;
        last: string;
        played: number;
        wins: number;
        draws: number;
        losses: number;
    };
    matches: TeamMatch[];
}

export interface ParticularTeamDataApi extends Team {
    area: {
        id: number;
        name: string;
        code: string;
        flag: string;
    };
    runningCompetitions: RunningCompetition[];
    coach: Coach;
    squad: Squad[];
    staff: [];
}
