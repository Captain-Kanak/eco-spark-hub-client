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
  FieldDescription,
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
  Key,
  Loader2,
  Mail,
  User,
} from "lucide-react";
import { register } from "@/actions/auth.action";

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: { onSubmit: authValidations.registerFormSchema },
    onSubmit: async ({ value }) => {
      console.log("Submitting form with values:", value);

      setIsUploading(true);
      const toastId = toast.loading("Creating your account...");

      try {
        const result = await register(value);

        if (!result) {
          toast.error("An unexpected error occurred", { id: toastId });
          setIsUploading(false);
          return;
        }

        toast.success("Verification email sent!", { id: toastId });
        setIsUploading(false);
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
        setIsUploading(false);
      }
    },
  });

  return (
    <Card {...props}>
      <div className="h-1.5 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600" />

      <CardHeader className="text-center pt-8 space-y-2">
        <div className="mx-auto bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-2">
          <CheckCircle2 className="text-blue-600 dark:text-blue-400 w-6 h-6" />
        </div>
        <CardTitle className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Join Us
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 max-w-62.5 mx-auto">
          Start your journey with our secure medical platform
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(e);
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
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
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
                      placeholder="••••••••"
                      type="password"
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

      <CardFooter className="flex flex-col px-8 pb-10 space-y-4">
        <Button
          form="register-form"
          type="submit"
          disabled={isUploading}
          className="w-full h-12 bg-slate-900 dark:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-white rounded-xl cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            "Register"
          )}
        </Button>

        <div className="relative w-full flex items-center gap-4 py-2">
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Social Access
          </span>
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />
        </div>

        {/* <Button
          // onClick={() => handleGoogleLogin()}
          variant="outline"
          className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
        >
          <Mail className="mr-2 h-4 w-4 text-rose-500" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Continue with Google
          </span>
        </Button> */}
        <FieldGroup>
          <Field>
            <Button type="submit">Create Account</Button>
            <Button variant="outline" type="button">
              Sign up with Google
            </Button>
            <FieldDescription className="px-6 text-center">
              Already have an account? <a href="#">Sign in</a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  );
}
