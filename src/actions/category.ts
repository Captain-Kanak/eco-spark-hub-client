"use server";

import { categoryService } from "@/services/category.service";
import { SearchQueryParams } from "@/types";

const create = async (payload: FormData) => {
  return await categoryService.create(payload);
};

const getAll = async (params: SearchQueryParams) => {
  return await categoryService.getAll(params);
};

const getById = async (id: string) => {
  return await categoryService.getById(id);
};

const updateById = async (id: string, payload: FormData) => {
  return await categoryService.updateById(id, payload);
};

const deleteById = async (id: string) => {
  return await categoryService.deleteById(id);
};

export const categoryAction = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
