import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function paginationRange(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, index) => index + start);
}

export async function fetcher<T>(input: RequestInfo, init: RequestInit) {
    const response = await fetch(input, init);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    return (await response.json()) as Promise<T>;
}
