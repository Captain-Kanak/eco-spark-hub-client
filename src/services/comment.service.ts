import { env } from "@/env";
import { api } from "@/lib/api";
import { Comment, CreateComment, UpdateComment } from "@/types";

const API_URL = `${env.API_URL}/api/v1/comments`;

export const commentService = {
  create: async (payload: CreateComment) => {
    return api.post<Comment>(API_URL, payload, {
      auth: true,
    });
  },
  updateById: async (id: string, payload: UpdateComment) => {
    return api.patch<Comment>(`${API_URL}/${id}`, payload, {
      auth: true,
    });
  },
  deleteById: async (id: string) => {
    return api.delete<null>(`${API_URL}/${id}`, {
      auth: true,
    });
  },
};
