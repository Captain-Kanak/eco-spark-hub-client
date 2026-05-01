"use server";

import { ideaServices } from "@/services/idea.service";
import { ApiResponse, Idea, Payment } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";

export const createIdea = async (
  payload: FormData,
): Promise<ApiResponse<Idea>> => {
  return await ideaServices.createIdea(payload);
};

export const getIdeas = async (
  params: GetIdeaSearchParams,
): Promise<ApiResponse<Idea[]>> => {
  return await ideaServices.getIdeas(params);
};

export const getMyIdeas = async (
  params: GetIdeaSearchParams,
): Promise<ApiResponse<Idea[]>> => {
  return await ideaServices.getMyIdeas(params);
};

export const getPurchasedIdeas = async (): Promise<ApiResponse<Payment[]>> => {
  return await ideaServices.getPurchasedIdeas();
};

export const getIdeaById = async (id: string): Promise<ApiResponse<Idea>> => {
  return await ideaServices.getIdeaById(id);
};

export const updateIdeaById = async (
  id: string,
  payload: FormData,
): Promise<ApiResponse<Idea>> => {
  return await ideaServices.updateIdeaById(id, payload);
};

export const deleteIdeaById = async (
  id: string,
): Promise<ApiResponse<Idea>> => {
  return await ideaServices.deleteIdeaById(id);
};
