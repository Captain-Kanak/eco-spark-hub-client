"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { verifyEmail } from "@/actions/auth.action";
import { useRouter } from "next/navigation";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

export const EmailVerificationModal = ({
  isOpen,
  onOpenChange,
  email,
}: EmailVerificationModalProps) => {
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {
    if (otp.length < 6) {
      return toast.error("Please enter the full 6-digit code.");
    }

    setIsVerifying(true);
    const toastId = toast.loading("Verifying security code...");

    try {
      const result = await verifyEmail(email, otp);

      if (result.success) {
        toast.success("Identity confirmed! Welcome Back.", { id: toastId });
        onOpenChange(false);
        router.push("/");
      } else {
        toast.error(result.message || "That code doesn't look right.", {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error("Connection error. Please try again.", { id: toastId });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const result = await verifyEmail(email, "");
      if (result.success) {
        toast.success("Fresh code sent to your inbox.");
      } else {
        toast.error(result.message || "Couldn't resend code.");
      }
    } catch (error) {
      toast.error("Error resending code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-110 p-0 overflow-hidden border-none bg-white dark:bg-slate-950 rounded-3xl shadow-2xl">
        {/* Decorative Header Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-emerald-500/10 via-emerald-500/5 to-transparent -z-10" />

        <div className="px-6 pt-10 pb-8">
          <DialogHeader className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative bg-white dark:bg-slate-900 border-4 border-emerald-50 dark:border-emerald-950/30 p-4 rounded-2xl shadow-sm">
                <ShieldCheck className="h-10 w-10 text-emerald-600 dark:text-emerald-500" />
              </div>
            </div>

            <div className="text-center space-y-1">
              <DialogTitle className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Check Your Inbox
              </DialogTitle>
              <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm">
                We sent a secure verification code to <br />
                <span className="font-bold text-emerald-600 dark:text-emerald-400 break-all">
                  {email}
                </span>
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center space-y-8 mt-8">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              disabled={isVerifying}
              autoFocus
            >
              <InputOTPGroup className="gap-2 sm:gap-3">
                {[0, 1, 2].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-14 w-11 sm:h-16 sm:w-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 focus:border-emerald-500 focus:ring-0 text-xl font-bold bg-slate-50/50 dark:bg-slate-900/50 transition-all"
                  />
                ))}
                <InputOTPSeparator className="text-slate-300 dark:text-slate-700" />
                {[3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-14 w-11 sm:h-16 sm:w-14 rounded-2xl border-2 border-slate-100 dark:border-slate-800 focus:border-emerald-500 focus:ring-0 text-xl font-bold bg-slate-50/50 dark:bg-slate-900/50 transition-all"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            <div className="w-full space-y-4">
              <Button
                onClick={handleVerify}
                disabled={isVerifying || otp.length !== 6}
                className="w-full h-14 bg-slate-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-black text-base rounded-2xl transition-all shadow-xl shadow-emerald-500/10 active:scale-[0.98]"
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  "Complete Verification"
                )}
              </Button>

              <div className="flex flex-col items-center gap-2">
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                  Didn&apos;t get the email?
                </p>
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="group flex items-center text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors disabled:opacity-50"
                >
                  {isResending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                  )}
                  Send me another code
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
