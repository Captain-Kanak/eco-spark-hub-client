"use server";

import { commentService } from "@/services/comment.service";
import { CreateComment, UpdateComment } from "@/types";

export const createComment = async (payload: CreateComment) => {
  return await commentService.create(payload);
};

export const updateCommentById = async (id: string, payload: UpdateComment) => {
  return await commentService.updateById(id, payload);
};

export const deleteCommentById = async (id: string) => {
  return await commentService.deleteById(id);
};
