import { env } from "@/env";
import { setTokenInCookie } from "@/lib/token";
import { LoginPayload, RegisterPayload } from "@/types";
import { redirect } from "next/navigation";

const API_URL = env.API_URL;

export const authServices = {
  register: async (payload: RegisterPayload) => {
    try {
      const url = `${API_URL}/api/v1/auth/register`;

      console.log("Register payload:", payload);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return false;
      }

      const result = await res.json();

      console.log("Register result:", result);

      return true;
    } catch (error) {
      return false;
    }
  },
  login: async (payload: LoginPayload) => {
    try {
      const url = `${API_URL}/api/v1/auth/login`;

      console.log("Login payload:", payload);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        return false;
      }

      const result = await res.json();
      const { token, accessToken, refreshToken, user } = result;

      await setTokenInCookie("accessToken", accessToken);

      console.log("Login result:", result);

      redirect("/");

      return true;
    } catch (error) {
      return false;
    }
  },
};
