import { Comment } from "./comment";
import { UserRole, UserStatus } from "./enums";
import { Idea, IdeaUpdate } from "./idea";
import { Like } from "./like";

export interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface VerifyEmail {
  email: string;
  otp: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  phone: string | null;
  address: string | null;
  dateOfBirth: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  ideas?: Idea[];
  likes?: Like[];
  comments?: Comment[];
  ideaUpdates?: IdeaUpdate[];
}

// export interface DecodedToken {
//   id: string;
//   name: string;
//   email: string;
//   emailVerified: boolean;
//   role: UserRole;
//   isDeleted: boolean;
// }
