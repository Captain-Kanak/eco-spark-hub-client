"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Eye, EyeOff, Key, Loader2, Lock, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { SocialLogin } from "../SocialLogin";
import Link from "next/link";
import { EmailVerificationModal } from "../dialogs/EmailVerificationModal";
import { login } from "@/actions/auth";
import { AuthValidation } from "@/validations/auth";

export function LoginForm({
  redirect,
  className,
  ...props
}: React.ComponentProps<"div"> & { redirect: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null,
  );

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: AuthValidation.loginSchema },
    onSubmit: async ({ value }) => {
      setIsUploading(true);
      const toastId = toast.loading("Logging in...");

      try {
        const result = await login(value);

        if (!result.success && result.message === "Email not verified") {
          toast.error(result.message, { id: toastId });
          setVerificationEmail(value.email);
          setIsUploading(false);
          return;
        }

        if (!result.success) {
          toast.error(result.message, { id: toastId });
          setVerificationEmail(value.email);
          setIsUploading(false);
          return;
        }

        toast.success(`Welcome Back Mr. ${result.data?.user.name}!`, {
          id: toastId,
        });
        router.push(redirect);
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      } finally {
        setIsUploading(false);
      }
    },
  });

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[40px] bg-linear-to-br from-emerald-500/20 via-cyan-500/10 to-teal-500/20 blur-3xl" />

      <Card className="relative overflow-hidden rounded-[36px] border border-white/30 bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl shadow-2xl">
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

        <CardHeader className="px-10 pt-8 pb-6 text-center space-y-6">
          <div className="mx-auto flex flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-900 dark:bg-emerald-950/20">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                Secure Login
              </span>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl" />

              <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl shadow-emerald-500/30">
                <Key className="h-9 w-9" />
              </div>
            </div>
          </div>

          <CardTitle className="text-3xl font-black tracking-tight">
            Welcome Back
          </CardTitle>

          <CardDescription className="mx-auto max-w-xs text-base leading-7 text-slate-500">
            Sign in to continue building
            ideas that make an impact.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-10">
          <form
            id="login-form"
            className="pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(e);
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => (
                  <Field>
                    <FieldLabel className="text-slate-700 dark:text-slate-300">
                      Email
                    </FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="h-14 rounded-2xl pl-12 border-transparent bg-slate-100/70 dark:bg-slate-800/60 shadow-inner transition-all duration-300 focus:bg-whitedark:focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                        placeholder="name@example.com"
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="password"
                children={(field) => (
                  <Field>
                    <FieldLabel className="text-slate-700 dark:text-slate-300">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="h-14 rounded-2xl pl-12 border-transparent bg-slate-100/70 dark:bg-slate-800/60 shadow-inner transition-all duration-300 focus:bg-whitedark:focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                        placeholder="********"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col px-10 pb-10 pt-4">
          <Button
            form="login-form"
            type="submit"
            disabled={isUploading}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.99] transition-all font-bold text-white rounded-xl shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <SocialLogin className="mt-2" isLoading={isUploading} />

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            New to EcoSpark?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-bold hover:underline transition-all"
            >
              Create an account
            </Link>
          </p>
        </CardFooter>
      </Card>

      <EmailVerificationModal
        isOpen={!!verificationEmail}
        email={verificationEmail ?? ""}
        onOpenChange={(open) => {
          if (!open) setVerificationEmail(null);
        }}
      />
    </div>
  );
}
