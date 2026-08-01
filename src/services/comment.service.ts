import { env } from "@/env";
import { api } from "@/lib/api";
import { Comment, CreateComment, UpdateComment } from "@/types";

const API_URL = `${env.API_URL}/api/v1/comments`;

const create = async (payload: CreateComment) => {
  return api.post<Comment>(API_URL, payload, {
    auth: true,
  });
};

const updateById = async (id: string, payload: UpdateComment) => {
  return api.patch<Comment>(`${API_URL}/${id}`, payload, {
    auth: true,
  });
};

const deleteById = async (id: string) => {
  return api.delete<null>(`${API_URL}/${id}`, {
    auth: true,
  });
};

export const commentService = {
  create,
  updateById,
  deleteById,
};
