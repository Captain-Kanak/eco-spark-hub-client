export interface ApiResponse<T> {
  data: {
    data: T[];
    meta: {
      currentPage: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  } | null;
  error: { message: string } | null;
}
