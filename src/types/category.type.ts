export interface Category {
  id: string;
  name: string;
  icon: string | null;
  description?: string;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    ideas: number;
  };
}
