import { Route, Routes } from "react-router-dom";

import Header from "@/components/Header";
import LeaguesPage from "@/pages/Leagues";
import LeaguesCalendar from "@/pages/LeaguesCalendar";
import TeamsPage from "@/pages/Teams";
import TeamsCalendar from "@/pages/TeamsCalendar";

function App() {
    return (
        <>
            <Header />
            <Routes>
                {["/", "/leagues"].map((path) => (
                    <Route key={path} Component={LeaguesPage} path={path} />
                ))}
                <Route Component={LeaguesCalendar} path={"/leagues/:leagueId"} />
                <Route Component={TeamsPage} path="/teams" />
                <Route Component={TeamsCalendar} path={"/teams/:teamId"} />
            </Routes>
        </>
    );
}

export default App;
