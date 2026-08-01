"use server";

import { userService } from "@/services/user.service";
import { SearchQueryParams } from "@/types";

const getAll = async (params: SearchQueryParams) => {
  return await userService.getAll(params);
};

const updateById = async (payload: FormData) => {
  return await userService.updateById(payload);
};

const blockById = async (userId: string) => {
  return await userService.blockById(userId);
};

const deleteById = async (userId: string) => {
  return await userService.deleteById(userId);
};

export const userAction = {
  getAll,
  updateById,
  blockById,
  deleteById,
};
