"use server";

import { commentService } from "@/services/comment.service";
import { CreateComment, UpdateComment } from "@/types";

const create = async (payload: CreateComment) => {
  return await commentService.create(payload);
};

const updateById = async (id: string, payload: UpdateComment) => {
  return await commentService.updateById(id, payload);
};

const deleteById = async (id: string) => {
  return await commentService.deleteById(id);
};

export const commentAction = {
  create,
  updateById,
  deleteById,
};
