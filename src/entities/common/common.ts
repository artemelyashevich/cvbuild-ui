export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export interface PageRequestParams {
    page?: number;
    size?: number;
    sort?: string;
    direction?: 'asc' | 'desc';
}