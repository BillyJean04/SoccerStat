import { useEffect, useMemo, useState } from "react";

import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { type Competition, getCompetitions } from "@/services/competitions";

export default function LeaguesPage() {
    const [competitions, setCompetitions] = useState<Competition[]>();
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * 9;
        const lastPageIndex = firstPageIndex + 9;
        return competitions?.slice(firstPageIndex, lastPageIndex);
    }, [competitions, currentPage]);

    useEffect(() => {
        getCompetitions().then((competitions) => setCompetitions(competitions));
    }, []);

    if (!competitions) {
        return (
            <Container>
                <div className="flex flex-row flex-wrap mt-10 gap-3.5">
                    {Array.from({ length: 9 }, (_, index) => index).map((index) => (
                        <Skeleton key={index} className="h-[125px] w-[calc(33%-5px)] rounded-xl" />
                    ))}
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="flex flex-row flex-wrap gap-3.5 mt-10">
                {currentTableData?.map(({ area, name, id }) => (
                    <Card key={id} className="w-[calc(33%-5px)]">
                        <CardContent className="flex items-center flex-col gap-5 py-5">
                            <CardTitle>{name}</CardTitle>
                            <CardDescription>{area.name}</CardDescription>
                        </CardContent>
                    </Card>
                ))}
                <Pagination
                    currentPage={currentPage}
                    pageSize={9}
                    totalCount={competitions.length}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </Container>
    );
}
