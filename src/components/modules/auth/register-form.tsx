"use client";

import React, { useState } from "react";
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
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { AuthValidation } from "@/validations/auth";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { SocialLogin } from "./SocialLogin";
import Link from "next/link";
import { EmailVerificationModal } from "./EmailVerificationModal";
import { register } from "@/actions/auth";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(
    null,
  );

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: { onSubmit: AuthValidation.registerSchema },
    onSubmit: async ({ value }) => {
      setIsUploading(true);
      const toastId = toast.loading("Creating your account...");

      try {
        const result = await register(value);

        if (!result.success) {
          toast.error(result.message, { id: toastId });
          setIsUploading(false);
          return;
        }

        setVerificationEmail(value.email);
        toast.success(`Verification email sent to ${result.data?.email}`, {
          id: toastId,
        });
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
      finally {
        setIsUploading(false);
      }
    },
  });

  return (
    <div>
      <Card
        {...props}
        className="overflow-hidden rounded-[36px] border border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.08)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
      >
        <CardHeader className="px-10 pt-10 pb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 dark:bg-emerald-900/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>

          <div className="mt-6 space-y-3">
            <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Join EcoSpark
            </CardTitle>

            <CardDescription className="mx-auto max-w-sm text-base leading-7 text-slate-500 dark:text-slate-400">
              Create your account and start sharing sustainable innovations with
              a global community.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-10 pb-2">
          <form
            id="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="px-8 pt-2"
          >
            <FieldGroup className="space-y-4">
              <form.Field
                name="name"
                children={(field) => (
                  <Field>
                    <FieldLabel className="text-slate-700 dark:text-slate-300">
                      Full Name
                    </FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="h-14 rounded-2xl pl-12 border-transparent bg-slate-100/70 dark:bg-slate-800/60 shadow-inner transition-all duration-300 focus:bg-whitedark:focus:bg-slate-800 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500"
                        placeholder="John Doe"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

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
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col px-10 pb-10 pt-4">
          <Button
            form="register-form"
            type="submit"
            disabled={isUploading}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.99] transition-all font-bold text-white rounded-xl shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
          <SocialLogin className="mt-2" isLoading={isUploading} />

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-emerald-600 font-bold hover:underline transition-all"
            >
              Log in
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
