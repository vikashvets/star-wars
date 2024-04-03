export interface PaginationData {
    totalItems: number,
    nextPageUrl?: string | null,
    previousPageUrl?: string | null,
    currentPage: number
}