"use server";

import { categoryService } from "@/services/category.service";
import { SearchQueryParams } from "@/types";

export const createCategory = async (payload: FormData) => {
  return await categoryService.create(payload);
};

export const getCategories = async (params: SearchQueryParams) => {
  return await categoryService.getAll(params);
};

export const getCategoryById = async (id: string) => {
  return await categoryService.getById(id);
};

export const updateCategoryById = async (id: string, payload: FormData) => {
  return await categoryService.updateById(id, payload);
};

export const deleteCategoryById = async (id: string) => {
  return await categoryService.deleteById(id);
};
