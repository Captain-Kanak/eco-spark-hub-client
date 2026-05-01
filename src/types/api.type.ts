export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
  meta?: Meta | null;
}

export interface Meta {
  currentPage: number;
  limit: number;
  total: number;
  totalPages: number;
}
