"use client";

import { useRef, useState } from "react";
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
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/actions/auth";

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
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState<string[]>(
    new Array(OTP_LENGTH).fill("")
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const otpCode = otp.join("");

  const handleVerify = async () => {
    if (otpCode.length !== OTP_LENGTH) {
      return toast.error("Please enter the full 6-digit code.");
    }

    setIsVerifying(true);
    const toastId = toast.loading("Verifying security code...");

    try {
      const result = await verifyEmail({
        email,
        otp: otpCode,
      });

      if (result.success) {
        toast.success("Identity confirmed! Please log in.", { id: toastId });
        onOpenChange(false);
        router.push("/login");
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
      const result = await verifyEmail({
        email,
        otp: otpCode,
      });

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

  const handleChange = (
    value: string,
    index: number,
  ) => {
    if (!/^[a-zA-Z0-9]?$/.test(value)) return;

    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      const next = [...otp];
      next[index] = "";
      setOtp(next);
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .trim()
      .slice(0, OTP_LENGTH)
      .split("");

    if (pasted.length === 0) return;

    const next = [...otp];

    pasted.forEach((char, i) => {
      next[i] = char;
    });

    setOtp(next);

    const last =
      Math.min(pasted.length, OTP_LENGTH) - 1;

    inputRefs.current[last]?.focus();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-170 max-w-[calc(100vw-32px)] rounded-[32px] p-0 border overflow-hidden"
      >
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-28 -right-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl" />
        </div>

        <div className="relative px-10 py-10">
          <DialogHeader className="items-center space-y-6">
            {/* Icon */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/25 blur-2xl animate-pulse" />
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-[30px] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-2xl shadow-emerald-500/40"
              >
                <ShieldCheck className="h-11 w-11 text-white" />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-3 text-center">
              <DialogTitle className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                Verify your email
              </DialogTitle>

              <DialogDescription className="mx-auto max-w-md text-base leading-7 text-slate-500 dark:text-slate-400">
                Enter the verification code we just sent to
              </DialogDescription>

              <div className="max-w-75 truncate rounded-full bg-emerald-50 px-4 py-2">
                {email}
              </div>
            </div>
          </DialogHeader>

          {/* OTP */}
          <div className="mt-10 flex justify-center overflow-x-auto py-2">
            <div className="flex justify-center">
              <div className="grid grid-cols-6 gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    value={digit}
                    maxLength={1}
                    disabled={isVerifying}
                    onPaste={handlePaste}
                    onChange={(e) =>
                      handleChange(
                        e.target.value.toUpperCase(),
                        index,
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, index)
                    }
                    className="aspect-square w-full max-w-16 border border-emerald-200 bg-slate-50 text-center text-2xl font-bold text-slate-900 dark:border-emerald-800 dark:bg-slate-950 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-0"
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            The code expires in
            <span className="mx-1 font-semibold text-emerald-600">
              10 minutes
            </span>
          </p>

          {/* Verify */}
          <Button
            onClick={handleVerify}
            disabled={otpCode.length !== OTP_LENGTH}
            className="mt-8 h-14 w-full rounded-2xl bg-linear-to-r from-emerald-500 to-teal-500 text-base font-bold shadow-xl shadow-emerald-500/30 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-emerald-500/40 active:scale-[0.98]"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </Button>

          {/* Footer */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 text-center backdrop-blur dark:border-slate-800 dark:bg-slate-900/40">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
              Didn't receive the code?
            </p>

            <button
              onClick={handleResend}
              disabled={isResending}
              className="mt-4 inline-flex items-center font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
            >
              {isResending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCcw className="mr-2 h-4 w-4 transition-transform duration-500 hover:rotate-180" />
              )}

              Resend verification code
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
