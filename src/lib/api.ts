import { cookies } from "next/headers";
import { ApiResponse } from "@/types";

type RequestBody = FormData | object | null;

interface RequestConfig {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: RequestBody;
  auth?: boolean;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

async function request<T>({
  url,
  method = "GET",
  headers = {},
  body,
  auth = false,
  cache = "no-store",
  next,
}: RequestConfig): Promise<ApiResponse<T>> {
  try {
    const requestHeaders = new Headers(headers);
    let requestBody: BodyInit | undefined;

    if (auth) {
      const cookieStore = await cookies();
      requestHeaders.set("Cookie", cookieStore.toString());
    }

    if (body instanceof FormData) {
      requestBody = body;
    } else if (body) {
      requestHeaders.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }

    const res = await fetch(url, {
      method,
      headers: requestHeaders,
      body: requestBody,
      cache,
      next,
    });

    const result = (await res.json()) as ApiResponse<T>;

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "An unexpected error occurred.",
        data: null,
      };
    }

    return result;
  } catch {
    return {
      success: false,
      message: "An unexpected error occurred.",
      data: null,
    };
  }
}

export const api = {
  get: <T>(
    url: string,
    options?: Omit<RequestConfig, "url" | "method" | "body">,
  ) =>
    request<T>({
      url,
      method: "GET",
      ...options,
    }),

  post: <T>(
    url: string,
    body?: RequestBody,
    options?: Omit<RequestConfig, "url" | "method" | "body">,
  ) =>
    request<T>({
      url,
      method: "POST",
      body,
      ...options,
    }),

  patch: <T>(
    url: string,
    body?: RequestBody,
    options?: Omit<RequestConfig, "url" | "method" | "body">,
  ) =>
    request<T>({
      url,
      method: "PATCH",
      body,
      ...options,
    }),

  put: <T>(
    url: string,
    body?: RequestBody,
    options?: Omit<RequestConfig, "url" | "method" | "body">,
  ) =>
    request<T>({
      url,
      method: "PUT",
      body,
      ...options,
    }),

  delete: <T>(
    url: string,
    options?: Omit<RequestConfig, "url" | "method" | "body">,
  ) =>
    request<T>({
      url,
      method: "DELETE",
      ...options,
    }),
};
