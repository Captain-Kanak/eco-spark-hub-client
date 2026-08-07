"use client";

import React, { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  UploadCloud,
  MapPin,
  Phone,
  Calendar,
  User as UserIcon,
  CameraIcon,
} from "lucide-react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/actions/user";
import { IMAGE_ACCEPT } from "@/validations/file";

interface ProfileFormProps {
  user: User;
  onSuccess?: () => void;
}

const updateProfileSchema = z.object({
  name: z.string(),
  image: z.any().nullable(),
  phone: z.string(),
  address: z.string(),
  dateOfBirth: z.string(),
});

export default function ProfileForm({ user, onSuccess }: ProfileFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(user.image || null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      image: null as File | null,
      phone: user.phone || "",
      address: user.address || "",
      dateOfBirth: user.dateOfBirth || "",
    },
    validators: { onSubmit: updateProfileSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating your profile...");

      try {
        const formData = new FormData();

        if (value.name) formData.append("name", value.name);
        if (value.phone) formData.append("phone", value.phone);
        if (value.address) formData.append("address", value.address);
        if (value.dateOfBirth)
          formData.append("dateOfBirth", value.dateOfBirth);
        if (value.image) formData.append("file", value.image);

        const result = await updateUser(formData);

        if (result.success) {
          toast.success("Profile updated successfully!", { id: toastId });
          router.refresh();
          form.reset();
          onSuccess?.();
        } else {
          toast.error(result.message || "Failed to update profile", {
            id: toastId,
          });
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
    <div className="space-y-7">
      {/* Profile Image Section */}
      <form.Field
        name="image"
        children={(field) => (
          <Field>
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-br from-emerald-50 via-white to-cyan-50 p-6 dark:border-slate-800 dark:from-emerald-950/30 dark:via-slate-900 dark:to-cyan-950/20">
              {/* Decorative background */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />

              <div className="relative flex flex-col items-center sm:flex-row sm:items-center sm:gap-6">
                {/* Avatar */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-28 w-28 shrink-0 cursor-pointer"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-xl dark:border-slate-800 dark:bg-slate-800">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Profile preview"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <UserIcon className="h-10 w-10 text-slate-400" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <UploadCloud className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Online/status dot */}
                  <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-emerald-500 dark:border-slate-900">
                    <CameraIcon className="h-3 w-3 text-white" />
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept={IMAGE_ACCEPT}
                    onChange={(e) => handleImageChange(e, field)}
                  />
                </div>

                {/* Avatar information */}
                <div className="mt-5 text-center sm:mt-0 sm:text-left">
                  <div className="flex items-center justify-center gap-2 sm:justify-start">
                    <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                      Profile Picture
                    </h3>

                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      Avatar
                    </span>
                  </div>

                  <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Upload a clear profile image. This will be displayed across
                    your EcoSpark account.
                  </p>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200 bg-white px-3.5 py-2 text-xs font-bold text-emerald-700 shadow-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 active:scale-95 dark:border-emerald-900 dark:bg-slate-900 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
                  >
                    <UploadCloud className="h-3.5 w-3.5" />
                    Change Photo
                  </button>
                </div>
              </div>
            </div>
          </Field>
        )}
      />

      {/* Personal Information */}
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-500/10">
            <UserIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              Personal Information
            </h3>

            <p className="text-xs text-slate-500">
              Keep your account information up to date.
            </p>
          </div>
        </div>

        <form
          id="profile-update-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-7"
        >
          <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Full Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Full Name
                  </FieldLabel>

                  <div className="relative">
                    <UserIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your full name"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm font-medium transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-900"
                    />
                  </div>
                </Field>
              )}
            />

            {/* Date of Birth */}
            <form.Field
              name="dateOfBirth"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date of Birth
                  </FieldLabel>

                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm font-medium transition-all focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-900"
                    />
                  </div>
                </Field>
              )}
            />

            {/* Phone */}
            <form.Field
              name="phone"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phone Number
                  </FieldLabel>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm font-medium transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-900"
                    />
                  </div>
                </Field>
              )}
            />

            {/* Address */}
            <form.Field
              name="address"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Address
                  </FieldLabel>

                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="City, Country"
                      className="h-12 rounded-2xl border-slate-200 bg-slate-50 pl-11 text-sm font-medium transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-900"
                    />
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-4 border-t border-slate-200/80 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900">
            <Save className="h-3.5 w-3.5 text-slate-500" />
          </div>

          <div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Your changes are secure
            </p>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Only the information you update will be changed.
            </p>
          </div>
        </div>

        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty,
          ]}
          children={([canSubmit, isSubmitting, isDirty]) => (
            <Button
              type="submit"
              form="profile-update-form"
              disabled={!isDirty || !canSubmit || isSubmitting}
              className="h-12 w-full rounded-2xl bg-emerald-600 px-7 font-bold text-white shadow-lg shadow-emerald-500/20
               transition-all hover:bg-emerald-700 hover:shadow-emerald-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          )}
        />
      </div>
    </div>
  );
}
