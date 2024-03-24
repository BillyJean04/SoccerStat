import { useEffect, useState } from "react";

import Container from "@/components/Container";

async function fetchCompetitions() {
    return fetch("https://api.football-data.org/v4/competitions").then((res) => res.json());
}

export default function LeaguesPage() {
    const [teams, setTeams] = useState();

    useEffect(() => {
        fetchCompetitions().then((res) => setTeams(res.competitions));
    }, []);

    console.log(teams);

    return <Container>Leagues</Container>;
}
