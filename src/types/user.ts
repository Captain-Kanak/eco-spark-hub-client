import { Comment } from "./comment";
import { UserRole, UserStatus } from "./enums";
import { Idea, IdeaUpdate } from "./idea";
import { Like } from "./like";

export interface UpdateUser {
  name?: string;
  image?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: Date;
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
  ecoPoints: number;
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
