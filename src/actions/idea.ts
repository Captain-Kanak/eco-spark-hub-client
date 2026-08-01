"use server";

import { ideaService } from "@/services/idea.service";
import { SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";

export const createIdea = async (payload: FormData) => {
  return await ideaService.create(payload);
};

export const getIdeas = async (params: SearchQueryParams) => {
  return await ideaService.getAll(params);
};

export const updateIdeaStatusById = async (id: string, status: IdeaStatus) => {
  return await ideaService.updateStatusById(id, status);
};

export const getIdeaById = async (id: string) => {
  return await ideaService.getById(id);
};

export const updateIdeaById = async (id: string, payload: FormData) => {
  return await ideaService.updateById(id, payload);
};

export const deleteIdeaById = async (id: string) => {
  return await ideaService.deleteById(id);
};
