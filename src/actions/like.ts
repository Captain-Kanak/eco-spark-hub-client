"use server";

import { likeService } from "@/services/like.service";

export const likeHandler = async (ideaId: string) => {
  return await likeService.likeHandler(ideaId);
};
