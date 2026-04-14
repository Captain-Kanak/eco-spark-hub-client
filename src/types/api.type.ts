export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T | null;
  meta?: Meta | null;
}

interface Meta {
  total: number;
  page: number;
  pageSize: number;
}
