"use client";

import { ArrowRight, Lock, Search, Share2, Sparkles, Zap } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Explore verified environmental ideas submitted by innovators around the world.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
  {
    icon: Lock,
    title: "Support",
    description:
      "Choose a project you believe in and securely fund its development.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "Build",
    description:
      "Creators transform ideas into real-world sustainable solutions.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Share2,
    title: "Impact",
    description:
      "Watch projects grow and create measurable environmental change.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}

        <div className="mx-auto mb-24 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
            How EcoSpark Works
          </div>

          <h2 className="mt-8 text-5xl font-black tracking-tight md:text-6xl">
            Four Steps Toward
            <span className="block bg-linear-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Global Impact
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500 dark:text-slate-400">
            Every successful environmental project starts with one idea. We
            connect innovators, supporters, and communities through one simple
            process.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative">
          {/* Line */}

          <div className="absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-transparent via-emerald-300 to-transparent lg:block" />

          <div className="grid gap-10 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative flex flex-col">
                {/* Timeline Dot */}

                <div className="relative z-10 mb-10 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-background bg-emerald-600 shadow-xl shadow-emerald-600/25">
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Arrow */}

                {index !== steps.length - 1 && (
                  <ArrowRight className="absolute -right-5 top-5 hidden h-5 w-5 text-emerald-300 lg:block" />
                )}

                {/* Card */}

                <div className="group relative flex flex-1 flex-col rounded-[28px] border border-slate-200/70 bg-white/80 p-8 shadow-sm backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/70">
                  {/* Number */}

                  <div className="absolute -top-4 left-8 flex h-8 w-8 items-center justify-center rounded-full border border-emerald-200 bg-background text-xs font-bold text-emerald-600 dark:border-emerald-900">
                    {index + 1}
                  </div>

                  {/* Icon */}

                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 ${step.bg}`}
                  >
                    <step.icon className={`h-7 w-7 ${step.color}`} />
                  </div>

                  {/* Title */}

                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {step.title}
                  </h3>

                  {/* Description */}

                  <p className="mt-4 flex-1 leading-7 text-slate-500 dark:text-slate-400">
                    {step.description}
                  </p>

                  {/* Bottom Accent */}

                  <div className="mt-8 h-1 w-12 rounded-full bg-linear-to-r from-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-24" />

                  {/* Glow */}

                  <div className="absolute inset-0 -z-10 rounded-[28px] bg-linear-to-r from-emerald-500/0 to-teal-500/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-emerald-500/10 group-hover:to-teal-500/10 group-hover:opacity-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
