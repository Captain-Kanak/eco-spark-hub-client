"use client";

import { useRef, useState } from "react";
import { Category } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, X } from "lucide-react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { createIdea } from "@/actions/idea.action";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const createIdeaSchema = z
  .object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    image: z.file().nullable(),
    problemStatement: z.string().min(20, "Please describe the problem"),
    solution: z.string().min(20, "Please describe the solution"),
    categoryId: z.string().min(1, "Category is required"),
    isPaid: z.boolean(),
    price: z.number().nonnegative(),
  })
  .refine(
    (data) => {
      if (data.isPaid) {
        return data.price > 0;
      }
      return true;
    },
    {
      message: "Price must be greater than 0 for paid ideas",
      path: ["price"],
    },
  );

export default function CreateIdeaForm({
  categories,
}: {
  categories: Category[];
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: null as File | null,
      problemStatement: "",
      solution: "",
      categoryId: "",
      isPaid: false,
      price: 0,
    },
    validators: { onSubmit: createIdeaSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting your idea...");

      try {
        const formData = new FormData();

        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("problemStatement", value.problemStatement);
        formData.append("solution", value.solution);
        formData.append("categoryId", value.categoryId);
        formData.append("isPaid", String(value.isPaid));

        if (value.isPaid && value.price) {
          formData.append("price", String(value.price));
        }

        if (value.image) {
          formData.append("file", value.image);
        }

        const res = await createIdea(formData);

        if (res?.success) {
          toast.info("Admin will review your idea shortly!", {
            id: toastId,
          });
          setPreview(null);
          router.push("/dashboard/my-ideas/shared-ideas");
        } else {
          toast.error(res?.message || "Failed to create idea", { id: toastId });
        }
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      }
    },
  });

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      field.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto rounded-[2.5rem] border-slate-200 shadow-xl overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
        <CardTitle className="text-2xl font-bold">Create New Idea</CardTitle>
        <CardDescription>
          Share your innovative solution with the EcoSpark community.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8">
        <form
          id="create-idea-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <FieldGroup className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <form.Field
                name="categoryId"
                validators={{ onChange: createIdeaSchema.shape.categoryId }}
                children={(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-bold">Category</FieldLabel>
                    <Select
                      onValueChange={field.handleChange}
                      value={field.state.value}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 cursor-pointer">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <div className="max-h-60 overflow-y-auto">
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              {/* Title */}
              <form.Field
                name="title"
                validators={{ onChange: createIdeaSchema.shape.title }}
                children={(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-bold">Title</FieldLabel>
                    <Input
                      className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900/50"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Solar Purification System"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            {/* Image Upload Area */}
            <form.Field
              name="image"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-bold">Idea Image</FieldLabel>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative group cursor-pointer border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-4 transition-all hover:border-emerald-500 hover:bg-emerald-50/30 overflow-hidden"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, field)}
                    />

                    {preview ? (
                      <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-inner">
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                            field.handleChange(null);
                          }}
                          className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-slate-900/90 rounded-full text-rose-500 shadow-md hover:scale-110 transition-transform cursor-pointer"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-slate-500">
                        <UploadCloud className="h-10 w-10 mb-3 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                          Click to upload cover image
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          PNG, JPG or WebP (max. 2MB)
                        </p>
                      </div>
                    )}
                  </div>
                </Field>
              )}
            />

            {/* Description */}
            <form.Field
              name="description"
              validators={{ onChange: createIdeaSchema.shape.description }}
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-bold">
                    Short Description
                  </FieldLabel>
                  <Textarea
                    className="rounded-xl bg-slate-50/50 dark:bg-slate-900/50 min-h-25"
                    placeholder="Briefly describe your idea..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field
                name="problemStatement"
                validators={{
                  onChange: createIdeaSchema.shape.problemStatement,
                }}
                children={(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-bold">
                      Problem Statement
                    </FieldLabel>
                    <Textarea
                      className="rounded-xl bg-slate-50/50 dark:bg-slate-900/50 min-h-30"
                      placeholder="What specific issue does this address?"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
              <form.Field
                name="solution"
                validators={{ onChange: createIdeaSchema.shape.solution }}
                children={(field) => (
                  <Field className="space-y-2">
                    <FieldLabel className="font-bold">The Solution</FieldLabel>
                    <Textarea
                      className="rounded-xl bg-slate-50/50 dark:bg-slate-900/50 min-h-30"
                      placeholder="How does your idea solve the problem?"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            {/* Pricing Section */}
            <div className="flex items-center gap-6 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <form.Field
                name="isPaid"
                children={(field) => (
                  <div className="flex items-center gap-3">
                    <Switch
                      id="isPaid"
                      className="cursor-pointer"
                      checked={field.state.value}
                      onCheckedChange={(checked) => {
                        field.handleChange(checked);

                        if (!checked) {
                          form.setFieldValue("price", 0);
                        }
                      }}
                    />
                    <FieldLabel
                      htmlFor="isPaid"
                      className="font-bold mb-0 cursor-pointer"
                    >
                      Paid Idea?
                    </FieldLabel>
                  </div>
                )}
              />

              <form.Subscribe
                selector={(state) => state.values.isPaid}
                children={(isPaid) =>
                  isPaid && (
                    <form.Field
                      name="price"
                      children={(field) => (
                        <div className="flex-1 animate-in fade-in slide-in-from-left-2 duration-300">
                          <Input
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder="Enter price"
                            value={field.state.value ?? ""}
                            disabled={!isPaid}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.handleChange(value ? Number(value) : 0);
                            }}
                          />
                          <FieldError errors={field.state.meta.errors} />
                        </div>
                      )}
                    />
                  )
                }
              />
            </div>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="p-8 pt-0">
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              form="create-idea-form"
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : (
                "Publish Sustainable Idea"
              )}
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
}
