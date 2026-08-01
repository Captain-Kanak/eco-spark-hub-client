"use server";

import { ideaService } from "@/services/idea.service";
import { SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";

const create = async (payload: FormData) => {
  return await ideaService.create(payload);
};

const getAll = async (params: SearchQueryParams) => {
  return await ideaService.getAll(params);
};

const updateStatusById = async (id: string, status: IdeaStatus) => {
  return await ideaService.updateStatusById(id, status);
};

const getById = async (id: string) => {
  return await ideaService.getById(id);
};

const updateById = async (id: string, payload: FormData) => {
  return await ideaService.updateById(id, payload);
};

const deleteById = async (id: string) => {
  return await ideaService.deleteById(id);
};

export const ideaAction = {
  create,
  getAll,
  updateStatusById,
  getById,
  updateById,
  deleteById,
};
