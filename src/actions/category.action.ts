"use server";

import { categoryServices } from "@/services/category.service";
import { ApiResponse, Category } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";

export const createCategory = async (
  payload: FormData,
): Promise<ApiResponse<Category>> => {
  return await categoryServices.createCategory(payload);
};

export const getCategories = async (
  params?: GetIdeaSearchParams,
): Promise<ApiResponse<Category[]>> => {
  return await categoryServices.getCategories(params);
};

export const updateCategory = async (
  id: string,
  payload: FormData,
): Promise<ApiResponse<Category>> => {
  return await categoryServices.updateCategory(id, payload);
};

export const deleteCategory = async (
  id: string,
): Promise<ApiResponse<Category>> => {
  return await categoryServices.deleteCategory(id);
};
