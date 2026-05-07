"use client";

import { updateIdeaById } from "@/actions/idea.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Category, Idea } from "@/types";
import { useForm } from "@tanstack/react-form";
import { Loader2, UploadCloud, X, Save } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

interface UpdateIdeaModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  idea: Idea;
  categories: Category[];
}

const updateIdeaSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  image: z.any().nullable(),
  problemStatement: z.string().min(20, "Please describe the problem"),
  solution: z.string().min(20, "Please describe the solution"),
  categoryId: z.string().min(1, "Category is required"),
  isPaid: z.boolean(),
  price: z.number().nonnegative(),
});

export default function UpdateIdeaModal({
  isOpen,
  onOpenChange,
  idea,
  categories,
}: UpdateIdeaModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(idea?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (idea) setPreview(idea.image);
  }, [idea]);

  const form = useForm({
    defaultValues: {
      title: idea?.title || "",
      description: idea?.description || "",
      image: null as File | null,
      problemStatement: idea?.problemStatement || "",
      solution: idea?.solution || "",
      categoryId: idea?.categoryId || "",
      isPaid: idea?.isPaid || false,
      price: idea?.price || 0,
    },
    validators: { onSubmit: updateIdeaSchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      const toastId = toast.loading("Updating your idea...");
      try {
        const formData = new FormData();
        formData.append("title", value.title);
        formData.append("description", value.description);
        formData.append("problemStatement", value.problemStatement);
        formData.append("solution", value.solution);
        formData.append("categoryId", value.categoryId);
        formData.append("isPaid", String(value.isPaid));
        formData.append("price", String(value.price));

        if (value.image) {
          formData.append("file", value.image);
        }

        const res = await updateIdeaById(idea.id, formData);

        if (res?.success) {
          toast.success("Idea updated successfully!", { id: toastId });
          onOpenChange(false);
          router.refresh();
        } else {
          toast.error(res?.message || "Failed to update", { id: toastId });
        }
      } catch (error) {
        toast.error("An unexpected error occurred", { id: toastId });
      } finally {
        setIsSubmitting(false);
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl border-none rounded-[2.5rem] p-0 shadow-2xl">
        <div className="h-2 bg-amber-500 w-full" />

        <div className="p-8">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">
              Update Idea
            </DialogTitle>
            <DialogDescription>
              Adjust details for{" "}
              <span className="text-amber-600 font-bold">{idea?.title}</span>
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="mt-6 space-y-6"
          >
            <FieldGroup className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="title"
                  children={(field) => (
                    <Field>
                      <FieldLabel className="font-bold">Title</FieldLabel>
                      <Input
                        className="h-11 rounded-xl"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />

                <form.Field
                  name="categoryId"
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
                          {categories.map((cat) => (
                            <SelectItem
                              key={cat.id}
                              value={cat.id}
                              className="cursor-pointer"
                            >
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError errors={field.state.meta.errors} />
                    </Field>
                  )}
                />
              </div>

              {/* Image Upload */}
              <form.Field
                name="image"
                children={(field) => (
                  <Field>
                    <FieldLabel className="font-bold">Cover Image</FieldLabel>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="relative group cursor-pointer border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-amber-500 transition-all overflow-hidden"
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, field)}
                      />
                      {preview ? (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                          <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <UploadCloud className="text-white h-8 w-8" />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-6 text-slate-400">
                          <UploadCloud className="h-8 w-8 mb-2" />
                          <p className="text-sm font-medium">
                            Click to replace image
                          </p>
                        </div>
                      )}
                    </div>
                  </Field>
                )}
              />

              <form.Field
                name="description"
                children={(field) => (
                  <Field>
                    <FieldLabel className="font-bold">
                      Short Description
                    </FieldLabel>
                    <Textarea
                      className="rounded-xl resize-none"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <form.Field
                  name="problemStatement"
                  children={(field) => (
                    <Field>
                      <FieldLabel className="font-bold">Problem</FieldLabel>
                      <Textarea
                        className="rounded-xl min-h-25"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                />
                <form.Field
                  name="solution"
                  children={(field) => (
                    <Field>
                      <FieldLabel className="font-bold">Solution</FieldLabel>
                      <Textarea
                        className="rounded-xl min-h-25"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </Field>
                  )}
                />
              </div>

              {/* Pricing Row */}
              <div className="flex items-center gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200">
                <form.Field
                  name="isPaid"
                  children={(field) => (
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.state.value}
                        onCheckedChange={field.handleChange}
                      />
                      <FieldLabel className="mb-0">Paid Idea?</FieldLabel>
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
                          <div className="flex-1 animate-in slide-in-from-left-2">
                            <Input
                              type="number"
                              className="h-10 rounded-lg"
                              placeholder="Price ($)"
                              value={field.state.value}
                              onChange={(e) =>
                                field.handleChange(Number(e.target.value))
                              }
                            />
                          </div>
                        )}
                      />
                    )
                  }
                />
              </div>
            </FieldGroup>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-xl cursor-pointer"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-amber-600 hover:bg-amber-700 rounded-xl font-bold cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-5 w-5" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
