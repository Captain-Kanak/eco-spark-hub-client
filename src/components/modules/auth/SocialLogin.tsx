"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Suspense } from "react";
import { env } from "@/env";
import { FaGoogle } from "react-icons/fa";

const SocialLoginButtons = ({ className, isLoading }: SocialLoginProps) => {
  const searchParams = useSearchParams();

  const destination = searchParams.get("redirect") || "/";

  const url = `${env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/google?redirect=${destination}`;

  const onGoogleClick = () => {
    const toastId = toast.loading("Connecting to Google...");

    try {
      window.location.href = url;

      toast.success("Redirecting...", {
        id: toastId,
      });
    } catch {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className={cn("mt-8", className)}>
      {/* Divider */}
      <div className="relative py-4 flex items-center">
        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />

        <span className="mx-4 rounded-full border border-slate-200 bg-white px-4 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:border-slate-800 dark:bg-slate-900">
          or continue with
        </span>

        <div className="h-px flex-1 bg-linear-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent" />
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={isLoading}
        onClick={onGoogleClick}
        className="group relative h-15 w-full overflow-hidden rounded-2xl border-slate-200 bg-white/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/70 cursor-pointer"
      >
        {/* Hover Glow */}
        <div className="absolute inset-0 bg-linear-to-r from-emerald-500/0 via-emerald-500/5 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex w-full items-center justify-between px-2">
          {/* Left */}
          <div className="flex items-center gap-4">
            <svg
              className="h-5 w-5 group-hover:scale-110 transition-transform duration-300"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15.2 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.2 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6.2 6.8l6.2 5.2C39 36.5 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
              />
            </svg>

            <div className="text-left">
              <p className="font-bold text-slate-900 dark:text-white">
                Continue with Google
              </p>
            </div>
          </div>
        </div>
      </Button>
    </div>
  );
};

export const SocialLogin = (props: SocialLoginProps) => {
  return (
    <Suspense
      fallback={
        <div className="h-20 w-full animate-pulse bg-slate-100 dark:bg-slate-800 rounded-xl" />
      }
    >
      <SocialLoginButtons {...props} />
    </Suspense>
  );
};

interface SocialLoginProps {
  className?: string;
  isLoading?: boolean;
}
