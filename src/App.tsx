import { Route, Routes } from "react-router-dom";

import Header from "@/components/Header";
import LeaguesPage from "@/pages/Leagues";
import TeamsPage from "@/pages/Teams";

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
