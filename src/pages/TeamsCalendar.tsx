import { format, getHours, getMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import DateFilter from "@/components/DateFilter";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCurrentTableData } from "@/hooks/useCurrentTableData";
import { Status } from "@/services/competitions/privateTypes";
import { getTeamMatches, getTeamName, type TeamMatch } from "@/services/teams";

const breadcrumbItems = (name: string) => [
    {
        id: 1,
        name: "Команды",
        link: "/teams",
        isPage: false,
    },
    {
        id: 2,
        name: name,
        isPage: true,
    },
];

export default function TeamsCalendar() {
    const [matches, setMatches] = useState<TeamMatch[]>();
    const [teamName, setTeamName] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);
    const [dateFrom, setDateFrom] = useState<Date>();
    const [dateTo, setDateTo] = useState<Date>();
    const { teamId } = useParams();

    const currentTableData = useCurrentTableData(matches ?? [], currentPage, 15);

    useEffect(() => {
        if (teamId) {
            getTeamMatches(Number(teamId))
                .then((res) => setMatches(res))
                .catch((error: Error) => alert(error.message));
            getTeamName(Number(teamId))
                .then((res) => setTeamName(res))
                .catch((error: Error) => alert(error.message));
        }
    }, [teamId]);

    useEffect(() => {
        if (teamId && dateFrom && dateTo) {
            getTeamMatches(Number(teamId), {
                dateFrom: format(dateFrom, "yyyy-MM-dd"),
                dateTo: format(dateTo, "yyyy-MM-dd"),
            })
                .then((matches) => setMatches(matches))
                .catch((error: Error) => alert(error.message));
        }
    }, [dateFrom, dateTo, teamId]);

    if (!matches) {
        return (
            <Container>
                <Breadcrumb items={breadcrumbItems(teamName ?? "")} />
                <Table>
                    <TableBody>
                        {Array.from({ length: 10 }, (_, index) => index).map((index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton key={index} className="h-[50px] w-full] rounded-xl" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        );
    }

    return (
        <Container>
            <Breadcrumb items={breadcrumbItems(teamName ?? "")} />
            <DateFilter dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo} />
            <Table className="mt-5">
                <TableBody>
                    {currentTableData?.map((match) => {
                        const formattedDate = format(new Date(match.date), "dd.MM.yyyy");
                        const hours = getHours(new Date(match.date));
                        const minutes = String(getMinutes(new Date(match.date))).padStart(2, "0");

                        return (
                            <TableRow key={match.id}>
                                <TableCell>{formattedDate}</TableCell>
                                <TableCell>{`${hours}.${minutes}`}</TableCell>
                                <TableCell>{Status[match.status]}</TableCell>
                                <TableCell>{match.homeTeam.name}</TableCell>
                                <TableCell>-</TableCell>
                                <TableCell>{match.awayTeam.name}</TableCell>
                                <TableCell>
                                    {match.score.fullTime.home &&
                                        `${match.score.fullTime.home}:${match.score.fullTime.away}`}{" "}
                                    {match.score.extraTime?.home &&
                                        `(${match.score.extraTime?.home}:${match.score.extraTime?.away})`}{" "}
                                    {match.score.penalties?.home &&
                                        `(${match.score.penalties?.home}:${match.score.penalties?.away})`}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <Pagination
                currentPage={currentPage}
                pageSize={15}
                totalCount={matches?.length}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </Container>
    );
}
