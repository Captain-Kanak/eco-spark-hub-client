"use server";

import { categoryServices } from "@/services/category.service";
import { ApiResponse, Category } from "@/types";

export const createCategory = async (
  payload: FormData,
): Promise<ApiResponse<Category>> => {
  return await categoryServices.createCategory(payload);
};

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  return await categoryServices.getCategories();
};

export const updateCategory = async (
  id: string,
  payload: FormData,
): Promise<ApiResponse<Category>> => {
  return await categoryServices.updateCategory(id, payload);
};
