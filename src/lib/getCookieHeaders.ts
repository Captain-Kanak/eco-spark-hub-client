import { cookies } from "next/headers";

export async function getCookieHeaders() {
  const cookieStore = await cookies();

  return cookieStore.toString();
}
