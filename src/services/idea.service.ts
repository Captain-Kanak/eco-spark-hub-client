import { env } from "@/env";
import { api } from "@/lib/api";
import { Idea, SearchQueryParams } from "@/types";
import { IdeaStatus } from "@/types/enums";

const API_URL = `${env.API_URL}/api/v1/ideas`;

const create = async (payload: FormData) => {
  return api.post<Idea>(API_URL, payload, {
    auth: true,
  });
};

const getAll = async (params: SearchQueryParams) => {
  const url = new URL(API_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value == null || value === "") return;

      if (Array.isArray(value)) {
        value.forEach((item) => {
          url.searchParams.append(key, item.toString());
        });
      } else {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  return api.get<Idea[]>(url.toString());
};

const updateStatusById = async (id: string, status: IdeaStatus) => {
  return api.patch<Idea>(`${API_URL}/${id}`, { status }, { auth: true });
};

const getBySlug = async (slug: string) => {
  return api.get<Idea>(`${API_URL}/${slug}`);
};

const updateById = async (id: string, payload: FormData) => {
  return api.patch<Idea>(`${API_URL}/${id}`, payload, { auth: true });
};

const deleteById = async (id: string) => {
  return api.delete<Idea>(`${API_URL}/${id}`, { auth: true });
};

export const ideaService = {
  create,
  getAll,
  updateStatusById,
  getBySlug,
  updateById,
  deleteById,
};
