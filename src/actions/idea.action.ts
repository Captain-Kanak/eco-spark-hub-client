"use server";

import { ideaServices } from "@/services/idea.service";
import { ApiResponse, Idea } from "@/types";

export const createIdea = async (
  payload: FormData,
): Promise<ApiResponse<Idea>> => {
  return await ideaServices.createIdea(payload);
};

export const getMyIdeas = async (): Promise<ApiResponse<Idea[]>> => {
  return await ideaServices.getMyIdeas();
};

export const updateIdeaById = async (
  id: string,
  payload: FormData,
): Promise<ApiResponse<Idea>> => {
  return await ideaServices.updateIdeaById(id, payload);
};
