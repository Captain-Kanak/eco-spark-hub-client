import { env } from "@/env";
import { api } from "@/lib/api";
import { ApiResponse, Like } from "@/types";

const API_URL = `${env.API_URL}/api/v1/likes`;

const likeHandler = async (ideaId: string) => {
  return api.post<ApiResponse<Like>>(
    `${API_URL}/${ideaId}`,
    {},
    {
      auth: true,
    },
  );
};

export const likeService = {
  likeHandler,
};
