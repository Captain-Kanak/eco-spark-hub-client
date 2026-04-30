"use client";

import React from "react";
import { Users, Lightbulb, Globe2, Zap } from "lucide-react";

const stats = [
  {
    label: "Active Innovators",
    value: "12K+",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Eco-Solutions",
    value: "500+",
    icon: Lightbulb,
    color: "text-emerald-500",
  },
  {
    label: "Countries Reached",
    value: "85+",
    icon: Globe2,
    color: "text-amber-500",
  },
  {
    label: "CO2 Offset (Tons)",
    value: "2.4K",
    icon: Zap,
    color: "text-purple-500",
  },
];

export default function Stats() {
  return (
    <section className="relative py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-900 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5 hover:-translate-y-1"
            >
              {/* Icon Circle */}
              <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform duration-500">
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>

              {/* Text Logic */}
              <div className="space-y-1">
                <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`w-2 h-2 rounded-full ${stat.color.replace("text", "bg")}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle Divider Line */}
      <div className="mt-20 mx-auto max-w-4xl h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
    </section>
  );
}
