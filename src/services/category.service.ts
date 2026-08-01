import { env } from "@/env";
import { api } from "@/lib/api";
import { Category, SearchQueryParams } from "@/types";

const API_URL = `${env.API_URL}/api/v1/categories`;

const create = async (payload: FormData) => {
  return api.post<Category>(API_URL, payload, {
    auth: true,
  });
};

const getAll = async (params: SearchQueryParams) => {
  const url = new URL(API_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== "") {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  return api.get<Category[]>(url.toString());
};

const getById = async (id: string) => {
  return api.get<Category>(`${API_URL}/${id}`);
};

const updateById = async (id: string, payload: FormData) => {
  return api.patch<Category>(`${API_URL}/${id}`, payload, {
    auth: true,
  });
};

const deleteById = async (id: string) => {
  return api.delete<Category>(`${API_URL}/${id}`, {
    auth: true,
  });
};

export const categoryService = {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
