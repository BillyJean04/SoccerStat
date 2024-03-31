import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "@/components/Container";
import Pagination from "@/components/Pagination";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentTableData } from "@/hooks/useCurrentTableData";
import { getTeams, type Team } from "@/services/teams";

export default function TeamsPage() {
    const [search, setSearch] = useState("");
    const [teams, setTeams] = useState<Team[]>();
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useCurrentTableData(teams ?? [], currentPage, 9);

    useEffect(() => {
        getTeams()
            .then((teams) => setTeams(teams))
            .catch((error: Error) => alert(error.message));
    }, []);

    if (!teams) {
        return (
            <>
                <Container className="mt-10">
                    <Input
                        className="flex items-start"
                        placeholder="Поиск"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <div className="flex flex-row flex-wrap mt-10 gap-3.5">
                        {Array.from({ length: 9 }, (_, index) => index).map((index) => (
                            <Skeleton key={index} className="h-[190px] w-[calc(33%-5px)] rounded-xl" />
                        ))}
                    </div>
                </Container>
            </>
        );
    }

    const filteredData = teams?.filter((item) => item.name.toString().includes(search));

    return (
        <Container className="mt-10">
            <Input
                className="flex items-start"
                placeholder="Поиск"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <div className="flex flex-row flex-wrap gap-3.5 my-10">
                {search
                    ? filteredData?.map(({ id, name, image }) => (
                          <Card key={id} className="w-[calc(33%-5px)]">
                              <Link to={`/${id}`}>
                                  <CardContent className="flex items-center flex-col gap-5 py-5">
                                      <CardTitle>{name}</CardTitle>
                                      <CardDescription>
                                          <img alt="" className="w-[100px] h-[100px]" src={image} />
                                      </CardDescription>
                                  </CardContent>
                              </Link>
                          </Card>
                      ))
                    : currentTableData?.map(({ id, name, image }) => (
                          <Card key={id} className="w-[calc(33%-5px)]">
                              <Link to={`${id}`}>
                                  <CardContent className="flex items-center flex-col gap-5 py-5">
                                      <CardTitle>{name}</CardTitle>
                                      <CardDescription>
                                          <img alt="" className="w-[100px] h-[100px]" src={image} />
                                      </CardDescription>
                                  </CardContent>
                              </Link>
                          </Card>
                      ))}
            </div>
            <Pagination
                currentPage={currentPage}
                pageSize={9}
                totalCount={search ? currentTableData?.length : filteredData.length}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </Container>
    );
}
