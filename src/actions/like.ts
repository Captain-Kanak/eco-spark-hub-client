"use server";

import { likeService } from "@/services/like.service";

const likeHandler = async (ideaId: string) => {
  return await likeService.likeHandler(ideaId);
};

export const likeAction = {
  likeHandler,
};
