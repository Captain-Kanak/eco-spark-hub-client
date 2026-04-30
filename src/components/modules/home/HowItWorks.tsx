"use client";

import React from "react";
import { Search, Lock, Zap, Share2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "Browse our curated taxonomy of verified sustainable innovations.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Lock,
    title: "Unlock",
    description: "Secure the full technical blueprints and resource lists.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Zap,
    title: "Implement",
    description: "Deploy the solution in your local community or industry.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Share2,
    title: "Scale",
    description: "Share your impact and contribute to the global green ledger.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background Text Decor */}
      <div className="absolute top-10 left-10 text-[15rem] font-black text-slate-50 dark:text-slate-900/50 select-none pointer-events-none tracking-tighter uppercase leading-none">
        Process
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-20">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
            From Idea to <br />
            <span className="text-emerald-500">Global Impact.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">
            Our ecosystem is designed to accelerate the transition to a
            sustainable future by bridging the gap between visionaries and
            implementers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-0.5 bg-dashed-line opacity-20" />

          {steps.map((step, index) => (
            <div key={index} className="group relative">
              {/* Step Number */}
              <div className="text-6xl font-black text-slate-100 dark:text-slate-800 mb-4 transition-colors group-hover:text-emerald-500/20">
                0{index + 1}
              </div>

              {/* Icon Card */}
              <div className="relative mb-8 p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                <div
                  className={`w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center mb-6 transition-transform group-hover:rotate-12`}
                >
                  <step.icon className={`h-7 w-7 ${step.color}`} />
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                  {step.description}
                </p>

                {/* Hover Glow */}
                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500 to-teal-400 rounded-[2.2rem] opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-dashed-line {
          background-image: linear-gradient(
            to right,
            #64748b 50%,
            transparent 50%
          );
          background-size: 20px 1px;
        }
      `}</style>
    </section>
  );
}
