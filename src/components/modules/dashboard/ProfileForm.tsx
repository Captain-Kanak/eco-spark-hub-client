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
} from "lucide-react";
import { updateProfile } from "@/actions/auth.action";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { User } from "@/types";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import { Button } from "@/components/ui/button";

const updateProfileSchema = z.object({
  name: z.string(),
  image: z.any().nullable(),
  phone: z.string(),
  address: z.string(),
  date_of_birth: z.string(),
});

export default function ProfileForm({ user }: { user: User }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(user.image || null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: user.name || "",
      image: null as File | null,
      phone: user.phone || "",
      address: user.address || "",
      date_of_birth: user.date_of_birth || "",
    },
    validators: { onSubmit: updateProfileSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating your profile...");

      try {
        const formData = new FormData();

        if (value.name) formData.append("name", value.name);
        if (value.phone) formData.append("phone", value.phone);
        if (value.address) formData.append("address", value.address);
        if (value.date_of_birth)
          formData.append("date_of_birth", value.date_of_birth);
        if (value.image) formData.append("file", value.image);

        const result = await updateProfile(formData);

        if (result.success) {
          toast.success("Profile updated successfully!", { id: toastId });
          router.refresh();
          form.reset();
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
    <Card className="max-w-3xl mx-auto rounded-[2.5rem] border-slate-200 shadow-xl overflow-hidden bg-white dark:bg-slate-950">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 p-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 rounded-2xl text-white">
            <UserIcon size={24} />
          </div>
          <div>
            <CardTitle className="text-2xl font-black tracking-tight">
              Personal Profile
            </CardTitle>
            <CardDescription>
              Update any field. Leave others as they are.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <form
          id="profile-update-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          {/* Avatar Upload */}
          <form.Field
            name="image"
            children={(field) => (
              <Field className="flex flex-col items-center space-y-4">
                <div
                  className="relative h-32 w-32 group cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="h-full w-full rounded-[2rem] overflow-hidden border-4 border-emerald-500/10 bg-slate-100 dark:bg-slate-800 relative">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400">
                        <UploadCloud size={32} />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-[2rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <UploadCloud className="text-white" size={24} />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, field)}
                  />
                </div>
                <div className="text-center">
                  <FieldLabel className="font-black uppercase tracking-widest text-[10px] text-slate-400">
                    Profile Picture
                  </FieldLabel>
                </div>
              </Field>
            )}
          />

          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-bold flex items-center gap-2 text-sm">
                    <UserIcon size={14} className="text-emerald-500" /> Full
                    Name
                  </FieldLabel>
                  <Input
                    className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border-slate-200"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Update your name"
                  />
                </Field>
              )}
            />

            {/* Date of Birth */}
            <form.Field
              name="date_of_birth"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-bold flex items-center gap-2 text-sm">
                    <Calendar size={14} className="text-emerald-500" /> Date of
                    Birth
                  </FieldLabel>
                  <Input
                    type="date"
                    className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border-slate-200"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            />

            {/* Phone */}
            <form.Field
              name="phone"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-bold flex items-center gap-2 text-sm">
                    <Phone size={14} className="text-emerald-500" /> Phone
                    Number
                  </FieldLabel>
                  <Input
                    className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border-slate-200"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                  />
                </Field>
              )}
            />

            {/* Address */}
            <form.Field
              name="address"
              children={(field) => (
                <Field className="space-y-2">
                  <FieldLabel className="font-bold flex items-center gap-2 text-sm">
                    <MapPin size={14} className="text-emerald-500" /> Address
                  </FieldLabel>
                  <Input
                    className="h-12 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 border-slate-200"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="City, Country"
                  />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="p-8 pt-0">
        <form.Subscribe
          selector={(state) => [
            state.canSubmit,
            state.isSubmitting,
            state.isDirty,
          ]}
          children={([canSubmit, isSubmitting, isDirty]) => (
            <Button
              form="profile-update-form"
              type="submit"
              // 3. Button is disabled if nothing changed (isDirty) OR currently submitting
              disabled={!isDirty || !canSubmit || isSubmitting}
              className="w-full h-14 bg-slate-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg transition-all active:scale-95 shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <Save size={20} /> Update Profile
                </>
              )}
            </Button>
          )}
        />
      </CardFooter>
    </Card>
  );
}
