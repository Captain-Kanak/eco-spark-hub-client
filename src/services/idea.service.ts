import { env } from "@/env";
import { api } from "@/lib/api";
import { Idea, SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";

const API_URL = `${env.API_URL}/api/v1/ideas`;

export const ideaService = {
  create: async (payload: FormData) => {
    return api.post<Idea>(API_URL, payload, {
      auth: true,
    });
  },
  getAll: async (params?: SearchQueryParams) => {
    const url = new URL(API_URL);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value != null && value !== "") {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    return api.get<Idea[]>(url.toString());
  },
  updateStatusById: async (id: string, status: IdeaStatus) => {
    return api.patch<Idea>(`${API_URL}/${id}`, { status }, { auth: true });
  },
  getById: async (id: string) => {
    return api.get<Idea>(`${API_URL}/${id}`);
  },
  updateById: async (id: string, payload: FormData) => {
    return api.patch<Idea>(`${API_URL}/${id}`, payload, { auth: true });
  },
  deleteById: async (id: string) => {
    return api.delete<Idea>(`${API_URL}/${id}`, { auth: true });
  },
};
