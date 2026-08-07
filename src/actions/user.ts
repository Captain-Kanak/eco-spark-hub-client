"use server";

import { userService } from "@/services/user.service";
import { SearchQueryParams } from "@/types";

export const getUsers = async (params: SearchQueryParams) => {
  return await userService.getAll(params);
};

export const updateUser = async (payload: FormData) => {
  return await userService.updateById(payload);
};

export const blockUserById = async (userId: string) => {
  return await userService.blockById(userId);
};

export const deleteUserById = async (userId: string) => {
  return await userService.deleteById(userId);
};
