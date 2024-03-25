import { useMemo } from "react";

import { paginationRange } from "@/lib/utils";

export default function usePagination({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: {
    totalCount: number;
    pageSize: number;
    siblingCount: number;
    currentPage: number;
}) {
    return useMemo(() => {
        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 5;

        if (totalPageNumbers >= totalPageCount) {
            return paginationRange(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount + 1;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = paginationRange(1, leftItemCount);

            return [...leftRange, "...", totalPageCount];
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = paginationRange(totalPageCount - rightItemCount + 1, totalPageCount);
            return [firstPageIndex, "...", ...rightRange];
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = paginationRange(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
        }
    }, [currentPage, pageSize, siblingCount, totalCount]);
}
