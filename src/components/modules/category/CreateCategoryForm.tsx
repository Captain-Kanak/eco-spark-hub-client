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
import { CheckCircle2, Loader2, User } from "lucide-react";
import { categoryValidations } from "@/validations/category.validation";
import { createCategory } from "@/actions/category.action";

export function CreateCategoryForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
    },
    validators: { onSubmit: categoryValidations.createCategoryFormSchema },
    onSubmit: async ({ value }) => {
      setIsUploading(true);
      const toastId = toast.loading("Creating category...");

      try {
        const result = await createCategory(value);

        if (!result.success) {
          toast.error("An unexpected error occurred", { id: toastId });
          setIsUploading(false);
          return;
        }

        toast.success(`Category created successfully`, {
          id: toastId,
        });
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
          id="category-form"
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
                  <FieldLabel htmlFor="name">Category Name</FieldLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      className="pl-10 h-11 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 focus:ring-blue-500 rounded-xl"
                      placeholder="Enter category name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
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
          form="category-form"
          type="submit"
          disabled={isUploading}
          className="w-full h-12 bg-slate-900 dark:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-white rounded-xl cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />{" "}
              Category Creating...
            </>
          ) : (
            "Create Category"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
