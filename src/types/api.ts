export type SortOrder = "asc" | "desc";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  currentPage: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchQueryParams {
  page?: string;
  limit?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
  selectFields?: string;
  includeFields?: string;
  [key: string]: string | unknown;
}
