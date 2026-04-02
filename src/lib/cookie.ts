"use server";

import { CookieOptions } from "@/types";
import { cookies } from "next/headers";

export const setCookie = async (
  name: string,
  value: string,
  options?: CookieOptions,
): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, options);
};

export const getCookieToken = async (
  name: string,
): Promise<string | undefined> => {
  const cookieStore = await cookies();

  return cookieStore.get(name)?.value;
};

export const deleteCookie = async (name: string): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.delete(name);
};
