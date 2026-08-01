import { env } from "@/env";
import { api } from "@/lib/api";
import { SearchQueryParams, User } from "@/types";

const API_URL = `${env.API_URL}/api/v1/users`;

const getAll = async (params: SearchQueryParams) => {
  const url = new URL(API_URL);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== "") {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  return api.get<User[]>(url.toString(), {
    auth: true,
  });
};

const updateById = async (payload: FormData) => {
  return api.patch<User>(`${API_URL}/update-profile`, payload, {
    auth: true,
  });
};

const blockById = async (userId: string) => {
  return api.patch<null>(
    `${API_URL}/block/${userId}`,
    {},
    {
      auth: true,
    },
  );
};

const deleteById = async (userId: string) => {
  return api.delete<null>(`${API_URL}/delete/${userId}`, {
    auth: true,
  });
};

export const userService = {
  getAll,
  updateById,
  blockById,
  deleteById,
};
