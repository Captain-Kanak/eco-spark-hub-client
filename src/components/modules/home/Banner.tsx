"use client";

import Link from "next/link";
import { ArrowRight, Leaf, Sparkles, HeartHandshake } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-background py-12 lg:py-16">
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e08_1px,transparent_1px),linear-gradient(to_bottom,#22c55e08_1px,transparent_1px)] bg-size[90px_90px]" />

        {/* Gradient */}
        <div className="absolute -left-32 top-0 h-137.5 w-137.5 rounded-full bg-emerald-500/15 blur-[150px]" />
        <div className="absolute -right-32 bottom-0 h-125 w-125 rounded-full bg-teal-400/15 blur-[160px]" />

        {/* Floating Icons */}
        <Leaf className="absolute left-20 top-40 hidden h-10 w-10 rotate-12 text-emerald-300/40 lg:block animate-pulse" />

        <Sparkles className="absolute right-24 top-40 hidden h-8 w-8 text-yellow-300/50 lg:block animate-pulse" />

        <HeartHandshake className="absolute right-40 bottom-28 hidden h-9 w-9 text-emerald-300/40 lg:block animate-pulse" />
      </div>

      {/* ================= Content ================= */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-20 lg:flex-row lg:justify-between px-4 lg:px-0">
        {/* ================================= Left ================================= */}
        <div className="max-w-3xl">
          {/* Badge */}

          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white/70 px-5 py-2 backdrop-blur-xl dark:border-emerald-900 dark:bg-slate-900/70">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />

            <Sparkles className="h-4 w-4 text-emerald-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-600 dark:text-slate-300">
              Crowdfunding For Environmental Innovation
            </span>
          </div>

          {/* Heading */}

          <h1 className="text-5xl font-black leading-[0.95] tracking-tight text-slate-900 dark:text-white md:text-7xl xl:text-8xl">
            Fund Ideas.
            <br />
            <span className="bg-linear-to-r from-emerald-500 via-green-400 to-teal-500 bg-clip-text text-transparent">
              Change Tomorrow.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Discover groundbreaking environmental ideas, support passionate
            innovators, and help transform sustainable concepts into real-world
            impact. Every contribution helps build a cleaner future.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="group h-14 rounded-full bg-emerald-600 px-8 text-base font-semibold shadow-xl shadow-emerald-500/20 transition-all duration-300 hover:scale-105 hover:bg-emerald-700"
            >
              <Link href="/ideas">
                Explore Ideas
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group h-14 rounded-full border-emerald-200 bg-white/70 px-8 text-base backdrop-blur-xl transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:bg-emerald-900/20"
            >
              <Link
                href="/dashboard/create-idea"
                className="flex items-center gap-2"
              >
                <Leaf className="h-5 w-5 text-emerald-500 transition-transform group-hover:rotate-12" />
                Submit Your Idea
              </Link>
            </Button>
          </div>
        </div>

        {/* ================================= Right ================================= */}
        <div className="relative hidden h-145 w-130 items-center justify-center lg:flex">
          {/* Glow */}
          <div className="absolute h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px]" />

          {/* Orbit Circle */}
          <div className="absolute h-105 w-105 rounded-full border border-dashed border-emerald-300/30 dark:border-emerald-700/30" />

          {/* Center */}
          <div className="relative z-10 flex h-56 w-56 flex-col items-center justify-center rounded-full border border-emerald-200 bg-white/80 shadow-2xl backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-4 rounded-full bg-emerald-100 p-5 dark:bg-emerald-900/30">
              <Leaf className="h-10 w-10 text-emerald-600" />
            </div>

            <h3 className="text-2xl font-black">EcoSpark Hub</h3>

            <p className="mt-2 text-center text-sm text-slate-500">
              Connecting innovators,
              <br />
              supporters & impact.
            </p>
          </div>

          {/* Top */}
          <div className="absolute top-6 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            <Sparkles className="mb-2 h-5 w-5 text-amber-500" />
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Innovation
            </p>
            <p className="font-bold">Fresh Ideas</p>
          </div>

          {/* Left */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-2 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/30">
              💡
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-500">
              Ideas
            </p>

            <p className="font-bold">Creative Solutions</p>
          </div>

          {/* Right */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-2 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900/30">
              🤝
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-500">
              Community
            </p>

            <p className="font-bold">Support Together</p>
          </div>

          {/* Bottom */}
          <div className="absolute bottom-6 rounded-2xl border border-white/60 bg-white/80 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
            <div className="mb-2 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900/30">
              🌱
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-500">
              Impact
            </p>

            <p className="font-bold">Greener Future</p>
          </div>
        </div>
      </div>
    </section>
  );
}
