import { Route, Routes } from "react-router-dom";

import Header from "@/components/Header.tsx";
import LeaguesPage from "@/pages/Leagues.tsx";
import TeamsPage from "@/pages/Teams.tsx";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route Component={LeaguesPage} path="/" />
                <Route Component={TeamsPage} path="/teams" />
            </Routes>
        </>
    );
}

export default App;