import { useMemo } from "react";

export function useCurrentTableData<T>(items: T[], currentPage: number, pageSize: number): T[] {
    return useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return items?.slice(firstPageIndex, lastPageIndex) ?? [];
    }, [currentPage, items, pageSize]);
}
