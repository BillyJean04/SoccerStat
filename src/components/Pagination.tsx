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

    return (
        <PaginationBase>
            <PaginationContent>
                <PaginationItem>
                    <Button className="bg-transparent hover:bg-transparent text-black">
                        <PaginationPrevious onClick={() => onPageChange(Number(currentPage - 1))} />
                    </Button>
                </PaginationItem>
                {paginationRange?.map((index) => (
                    <PaginationItem key={index}>
                        <PaginationLink isActive={index === currentPage} onClick={() => onPageChange(Number(index))}>
                            {index}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <Button className="inline-flex bg-transparent hover:bg-transparent text-black">
                        <PaginationNext onClick={() => onPageChange(Number(currentPage + 1))} />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </PaginationBase>
    );
};

export default Pagination;
