"use server";

import { categoryServices } from "@/services/category.service";
import { ApiResponse, Category } from "@/types";

export const createCategory = async (
  payload: Partial<Category>,
): Promise<ApiResponse<Category>> => {
  return await categoryServices.createCategory(payload);
};
