"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

function ToastHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const authError = searchParams.get("error");
    const authGoogle = searchParams.get("auth");

    if (authGoogle === "success") {
      toast.success("Welcome! Successfully logged in with Google.", {
        description: "You now have full access to the platform.",
      });

      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete("error");
      newParams.delete("auth");
      const newPath =
        window.location.pathname +
        (newParams.toString() ? `?${newParams.toString()}` : "");

      router.replace(newPath);
    }

    if (authError) {
      toast.error("Authentication Error", {
        description: authError,
      });
    }
  }, [searchParams, router]);

  return null;
}

export function AuthToastListener() {
  return (
    <Suspense fallback={null}>
      <ToastHandler />
    </Suspense>
  );
}
