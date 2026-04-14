"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalLoaderProps {
  fullPage?: boolean;
  className?: string;
  text?: string;
}

export const GlobalLoader = ({
  fullPage = true,
  className,
  text = "Loading EcoSpark...",
}: GlobalLoaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 transition-all duration-300",
        fullPage
          ? "fixed inset-0 z-100 bg-white/80 backdrop-blur-sm dark:bg-slate-950/80"
          : "w-full py-10",
        className,
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute h-12 w-12 animate-ping rounded-full bg-emerald-500/20" />

        {/* Main Spinner */}
        <Loader2 className="h-10 w-10 animate-spin text-emerald-600 dark:text-emerald-500" />
      </div>

      {text && (
        <p className="animate-pulse text-sm font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
          {text}
        </p>
      )}
    </div>
  );
};
