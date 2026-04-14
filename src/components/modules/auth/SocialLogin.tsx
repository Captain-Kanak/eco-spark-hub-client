"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Suspense } from "react";
import { env } from "@/env";

const SocialLoginButtons = ({ className, isLoading }: SocialLoginProps) => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("redirect") || "/";
  const url = `${env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/google?redirect=${destination}`;

  const onGoogleClick = async () => {
    const toastId = toast.loading("Connecting to Google...");
    try {
      window.location.href = url;

      toast.success("Redirecting to Google...", { id: toastId });
    } catch (error) {
      toast.error("An unexpected error occurred", { id: toastId });
    }
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="relative w-full flex items-center gap-4 py-2">
        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
          Social Access
        </span>
        <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={isLoading}
        onClick={onGoogleClick}
        className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all duration-300 cursor-pointer group"
      >
        <Mail className="mr-2 h-4 w-4 text-rose-500 group-hover:scale-110 transition-transform" />
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          Continue with Google
        </span>
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
