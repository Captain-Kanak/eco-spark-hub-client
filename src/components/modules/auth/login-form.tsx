"use client";

import { cn } from "@/lib/utils";
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
import { authValidations } from "@/validations/auth.validation";
import { toast } from "sonner";
import { login } from "@/actions/auth.action";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { SocialLogin } from "./SocialLogin";
import Link from "next/link";
import { EmailVerificationModal } from "./EmailVerificationModal";

export function LoginForm({
  redirect,
  className,
  ...props
}: React.ComponentProps<"div"> & { redirect: string }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [sendEmail, setSendEmail] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: { onSubmit: authValidations.loginFormSchema },
    onSubmit: async ({ value }) => {
      setIsUploading(true);
      const toastId = toast.loading("Logging in...");

      try {
        const result = await login(value);

        if (!result.success && result.message === "Email not verified") {
          setSendEmail(value.email);
          toast.error(result.message, { id: toastId });
          setIsUploading(false);
          return;
        }

        if (!result.success) {
          toast.error(result.message, { id: toastId });
          setIsUploading(false);
          return;
        }

        toast.success(`Welcome Back Mr. ${result.data?.name}!`, {
          id: toastId,
        });
        setIsUploading(false);
        router.push(redirect);
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
        setIsUploading(false);
      }
    },
  });

  if (sendEmail) {
    return (
      <EmailVerificationModal
        isOpen={true}
        onOpenChange={(open) => !open && setSendEmail("")}
        email={sendEmail}
      />
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="login-form"
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
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
                        placeholder="m@example.com"
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
                        placeholder="••••••••"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />

                      {/* Eye Button */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer outline-none"
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

        <CardFooter className="flex flex-col px-8 pb-10">
          <Button
            form="login-form"
            type="submit"
            disabled={isUploading}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.99] transition-all font-bold text-white rounded-xl shadow-lg shadow-emerald-600/20 cursor-pointer"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <SocialLogin isLoading={isUploading} />

          <p className="mt-4 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-emerald-600 font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
