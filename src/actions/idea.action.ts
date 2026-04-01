"use server";

import { ideaServices } from "@/services/idea.service";
import { ApiResponse, Idea } from "@/types";

// export const getIdeas = async (): Promise<ApiResponse<Idea>> => {
//   return await ideaServices.getIdeas();
// };

export const createIdea = async (
  payload: Partial<Idea>,
): Promise<ApiResponse<Idea>> => {
  return await ideaServices.createIdea(payload);
};
