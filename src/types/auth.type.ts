import { UserRole, UserStatus } from "./enums";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  isDeleted: boolean;
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
}
