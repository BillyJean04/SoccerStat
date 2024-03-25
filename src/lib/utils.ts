import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function paginationRange(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, index) => index + 1);
}
