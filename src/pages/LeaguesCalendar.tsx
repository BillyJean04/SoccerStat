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
import { Match } from "@/services/competitions";
import getMatches from "@/services/competitions/getMatches";
import { Status } from "@/services/competitions/privateTypes";

const breadcrumbItems = (name: string) => [
    {
        id: 1,
        name: "Лиги",
        link: "/leagues",
        isPage: false,
    },
    {
        id: 2,
        name: name,
        isPage: true,
    },
];

export default function LeaguesCalendar() {
    const [matches, setMatches] = useState<Match[]>();
    const [competitionName, setCompetitionName] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);
    const [dateFrom, setDateFrom] = useState<Date>();
    const [dateTo, setDateTo] = useState<Date>();

    const currentTableData = useCurrentTableData(matches ?? [], currentPage, 15);

    const { leagueId } = useParams();

    useEffect(() => {
        leagueId &&
            getMatches(Number(leagueId))
                .then((matches) => {
                    setMatches(matches?.matches);
                    setCompetitionName(matches?.competitionName);
                })
                .catch((error: Error) => alert(error.message));
    }, [leagueId]);

    useEffect(() => {
        if (leagueId && dateFrom && dateTo) {
            getMatches(Number(leagueId), {
                dateFrom: format(dateFrom, "yyyy-MM-dd"),
                dateTo: format(dateTo, "yyyy-MM-dd"),
            })
                .then((matches) => setMatches(matches?.matches))
                .catch((error: Error) => alert(error.message));
        }
    }, [dateFrom, dateTo, leagueId]);

    if (!matches) {
        return (
            <Container>
                <Breadcrumb items={breadcrumbItems(competitionName ?? "")} />
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
            <Breadcrumb items={breadcrumbItems(competitionName ?? "")} />
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
