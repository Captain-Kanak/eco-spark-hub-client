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
import { authValidations } from "@/validations/auth.validation";
import {
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { register } from "@/actions/auth.action";
import { SocialLogin } from "./SocialLogin";
import Link from "next/link";
import { EmailVerificationModal } from "./EmailVerificationModal";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [sendEmail, setSendEmail] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: { onSubmit: authValidations.registerFormSchema },
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

        setSendEmail(value.email);
        toast.success(`Verification email sent to ${result.data?.email}`, {
          id: toastId,
        });
        setIsUploading(false);
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
    <Card
      {...props}
      className="overflow-hidden border-slate-200 dark:border-slate-800 shadow-xl"
    >
      {/* Sustainability Gradient Top Bar */}
      <div className="h-1.5 bg-linear-to-r from-emerald-400 via-emerald-600 to-teal-500" />

      <CardHeader className="text-center pt-8 space-y-2">
        <div className="mx-auto bg-emerald-50 dark:bg-emerald-900/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-2">
          <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
        </div>
        <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Join EcoSpark
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 max-w-62.5 mx-auto">
          Securely share and discover sustainable ideas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
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
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-emerald-500 rounded-xl"
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
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-emerald-500 rounded-xl"
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
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-emerald-500 rounded-xl"
                      placeholder="••••••••"
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

      <CardFooter className="flex flex-col px-8 pb-10">
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
  );
}
