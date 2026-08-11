"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@ecospark.hub",
    color: "text-blue-500",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "+1 (555) 000-0000",
    color: "text-emerald-500",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "Green Innovation Hub, San Francisco",
    color: "text-rose-500",
  },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validators: { onSubmit: ContactSchema },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      // const toastId = toast.loading("Sending message...");

      const toastId = toast.info("This feature is not available yet.");

      try {
        const payload = {
          name: value.name,
          email: value.email,
          subject: value.subject,
          message: value.message,
        };

        // API call to send email

        // toast.success("Message sent successfully", { id: toastId });
      } catch (error) {
        toast.error("Failed to send message", { id: toastId });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white dark:bg-slate-950 py-14 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 lg:px-0 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info & Socials */}
          <div className="space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
                Let's Connect
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl font-black leading-none tracking-tight text-slate-900 dark:text-white md:text-7xl">
                We'd love
                <br />
                <span className="bg-linear-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent italic">
                  to hear
                </span>{" "}
                from you.
              </h1>

              <p className="max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                Whether you have an innovative environmental idea, a partnership
                opportunity, or simply want to say hello, our team is always
                ready to connect.
              </p>
            </div>

            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-5 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 transition-transform duration-300 group-hover:scale-110 dark:bg-slate-800 ${item.color}`}
                  >
                    <item.icon className="h-8 w-8" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                      {item.label}
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-10">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-3xl font-black text-emerald-500">&lt;24h</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                  Response
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-3xl font-black text-emerald-500">99%</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                  Satisfaction
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-3xl font-black text-emerald-500">24/7</p>
                <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">
                  Support
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[2.5rem] bg-linear-to-br from-emerald-500/10 via-transparent to-cyan-500/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200/70 bg-white/80 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 md:p-10">
              {/* Form Header */}
              <div className="mb-8">
                <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
                  Send Message
                </span>

                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                  We'd love to hear from you
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Name */}
                  <form.Field
                    name="name"
                    children={(field) => (
                      <Field>
                        <FieldLabel>Name</FieldLabel>
                        <Input
                          placeholder="Jhon Doe"
                          className="h-14 rounded-2xl border-slate-200 bg-slate-50/70 px-5 shadow-sm transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />

                  {/* Email */}
                  <form.Field
                    name="email"
                    children={(field) => (
                      <Field>
                        <FieldLabel>Email</FieldLabel>
                        <Input
                          placeholder="john@example.com"
                          className="h-14 rounded-2xl border-slate-200 bg-slate-50/70 px-5 shadow-sm transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />
                </div>

                <div className="mt-6 space-y-6">
                  {/* Subject */}
                  <form.Field
                    name="subject"
                    children={(field) => (
                      <Field>
                        <FieldLabel>Subject</FieldLabel>
                        <Input
                          placeholder="I need help with..."
                          className="h-14 rounded-2xl border-slate-200 bg-slate-50/70 px-5 shadow-sm transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />

                  {/* Message */}
                  <form.Field
                    name="message"
                    children={(field) => (
                      <Field>
                        <FieldLabel>Message</FieldLabel>
                        <Textarea
                          placeholder="Write your message here..."
                          className="min-h-40 rounded-2xl border-slate-200 bg-slate-50/70 p-5 shadow-sm transition-all duration-300 resize-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-950"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldError errors={field.state.meta.errors} />
                      </Field>
                    )}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-8 h-14 w-full rounded-2xl bg-linear-to-r from-emerald-600 to-teal-500 text-base font-bold shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/40 active:scale-100 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span className="ml-2">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span className="ml-2">Send Message</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
