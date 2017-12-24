export interface Page {
    currentPage: number;
    totalPages: number;
    totalElements: number;
    pageElements: number;
}

export interface Sort {
    property: string;
    direction: 'ASC' | 'DESC' | string;
}

export interface PageableSearchQuery {
    page?: number;
    size?: number;
    sort?: Sort[];
    query?: string;
}
