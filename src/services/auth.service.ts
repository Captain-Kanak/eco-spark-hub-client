import { env } from "@/env";
import { RegisterPayload } from "@/types";

const API_URL = env.API_URL;

export const authServices = {
  register: async (payload: RegisterPayload) => {
    try {
      const url = `${API_URL}/api/v1/auth/register`;

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
};
