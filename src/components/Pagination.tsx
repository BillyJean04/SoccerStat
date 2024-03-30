import { Dispatch, FC, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
    Pagination as PaginationBase,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination.tsx";
import usePagination from "@/hooks/usePagination.ts";

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageChange: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalCount, pageSize, onPageChange }) => {
    const paginationRange = usePagination({ currentPage, totalCount, pageSize, siblingCount: 1 });

    const lastPage = paginationRange ? paginationRange[paginationRange.length - 1] : 1;

    return (
        <PaginationBase className="py-5">
            <PaginationContent>
                <PaginationItem>
                    <Button
                        className="px-0 sm:px-4 bg-transparent hover:bg-transparent text-black"
                        disabled={currentPage === 1}
                    >
                        <PaginationPrevious
                            className="px-0 sm:px-4 "
                            onClick={() => onPageChange(Number(currentPage - 1))}
                        />
                    </Button>
                </PaginationItem>
                {paginationRange?.map((pageNumber, index) => {
                    if (pageNumber === "...") {
                        return (
                            <PaginationItem key={String(`${pageNumber}${index}`)} className="cursor-pointer">
                                &#8230;
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={String(`${pageNumber}${index}`)} className="cursor-pointer">
                            <PaginationLink
                                className="w-[2rem] sm:w-[2.5rem]"
                                isActive={pageNumber === currentPage}
                                onClick={() => onPageChange(Number(pageNumber))}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <Button
                        className="px-0 sm:px-4 inline-flex bg-transparent hover:bg-transparent text-black"
                        disabled={currentPage === lastPage}
                    >
                        <PaginationNext
                            className="px-0 sm:px-4"
                            onClick={() => onPageChange(Number(currentPage + 1))}
                        />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </PaginationBase>
    );
};

export default Pagination;
