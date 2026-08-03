"use client";

import React from "react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-950 py-14">
      <div className="container mx-auto max-w-7xl">
        {/* ================= Hero ================= */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-137.5 w-137.5 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb20_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb20_1px,transparent_1px)] bg-size-[70px_70px] dark:bg-[linear-gradient(to_right,#1e293b40_1px,transparent_1px),linear-gradient(to_bottom,#1e293b40_1px,transparent_1px)]" />
          </div>

          <div className="relative px-4 lg:px-0">
            <div className="grid items-center gap-20 lg:grid-cols-2">
              {/* ================= Left ================= */}
              <div>
                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                  About EcoSpark Hub
                </span>

                <h1 className="mt-8 text-5xl font-black leading-none tracking-tight text-slate-900 dark:text-white md:text-7xl">
                  Building the Future of
                  <span className="block bg-linear-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent italic">
                    Environmental Innovation
                  </span>
                </h1>

                <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-400">
                  EcoSpark Hub is a modern crowdfunding platform connecting
                  innovators, environmental experts, and global supporters to
                  transform sustainable ideas into real-world impact.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/ideas"
                    className="rounded-2xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-emerald-700"
                  >
                    Explore Ideas
                  </Link>

                  <Link
                    href="/dashboard/create-idea"
                    className="rounded-2xl border border-slate-200 px-8 py-4 font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
                  >
                    Submit Idea
                  </Link>
                </div>
              </div>

              {/* ================= Right ================= */}
              <div className="relative hidden lg:block">
                <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                  <div className="space-y-8">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-500">
                        Platform Impact
                      </p>

                      <h3 className="mt-2 text-3xl font-black">
                        Sustainable Innovation
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                        <p className="text-sm text-slate-500">Ideas</p>
                        <h4 className="mt-2 text-3xl font-black">500+</h4>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                        <p className="text-sm text-slate-500">Innovators</p>
                        <h4 className="mt-2 text-3xl font-black">12K+</h4>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                        <p className="text-sm text-slate-500">Countries</p>
                        <h4 className="mt-2 text-3xl font-black">85+</h4>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
                        <p className="text-sm text-slate-500">Funding</p>
                        <h4 className="mt-2 text-3xl font-black">$2.4M</h4>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Card */}

                <div className="absolute -left-8 top-12 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs uppercase tracking-widest text-emerald-500">
                    Mission
                  </p>

                  <p className="mt-2 font-semibold">
                    Turning Ideas into Environmental Impact
                  </p>
                </div>

                <div className="absolute -bottom-6 right-8 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-xs uppercase tracking-widest text-emerald-500">
                    Since 2026
                  </p>

                  <p className="mt-2 font-semibold">
                    Growing Global Community 🌍
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Our Story ================= */}
        <section className="relative overflow-hidden py-20">
          <div className="container mx-auto max-w-7xl px-4 lg:px-0">
            <div className="grid items-center gap-20 lg:grid-cols-2">
              {/* ================= Left ================= */}
              <div>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                  Our Story
                </span>

                <h2 className="mt-8 text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
                  Every Great
                  <span className="block text-emerald-500">
                    Environmental Solution
                  </span>
                  Begins With One Idea.
                </h2>

                <p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-400">
                  Around the world, thousands of innovators create brilliant
                  environmental solutions every day. Unfortunately, many of
                  those ideas never become reality because they lack visibility,
                  community support, and funding.
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                  EcoSpark Hub was created to bridge that gap — empowering
                  innovators, connecting supporters, and transforming
                  sustainable ideas into measurable environmental impact.
                </p>
              </div>

              {/* ================= Right Timeline ================= */}
              <div className="relative">
                <div className="absolute left-7 top-6 bottom-6 w-px bg-linear-to-b from-emerald-500 via-emerald-300 to-transparent" />

                <div className="space-y-12">
                  {[
                    {
                      year: "Step 01",
                      title: "A Problem Exists",
                      desc: "Innovators struggle to find funding and visibility for sustainable ideas.",
                    },
                    {
                      year: "Step 02",
                      title: "EcoSpark Begins",
                      desc: "A platform built to connect innovators with supporters around the world.",
                    },
                    {
                      year: "Step 03",
                      title: "Community Grows",
                      desc: "Environmental enthusiasts collaborate, vote, and fund meaningful projects.",
                    },
                    {
                      year: "Step 04",
                      title: "Real Impact",
                      desc: "Ideas become real-world environmental solutions that benefit communities.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="relative flex gap-6 group">
                      {/* Timeline Dot */}

                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
                        {index + 1}
                      </div>

                      {/* Card */}

                      <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-emerald-300 group-hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-500">
                          {item.year}
                        </p>

                        <h3 className="mt-3 text-2xl font-black text-slate-900 dark:text-white">
                          {item.title}
                        </h3>

                        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Mission & Vision ================= */}
        <section className="relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
          </div>

          <div className="container relative mx-auto max-w-7xl px-4 lg:px-0">
            <div className="mb-20 text-center">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                Mission & Vision
              </span>

              <h2 className="mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
                Purpose That Drives
                <span className="block text-emerald-500">Every Innovation</span>
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-5">
              {/* ================= Mission ================= */}
              <div className="group relative overflow-hidden rounded-[2.5rem] bg-linear-to-br from-emerald-600 to-teal-500 p-10 text-white shadow-2xl lg:col-span-3">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-125" />

                <div className="relative z-10">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-100">
                    Our Mission
                  </span>

                  <h3 className="mt-6 text-4xl font-black leading-tight">
                    Empower Every
                    <br />
                    Environmental Innovator.
                  </h3>

                  <p className="mt-8 max-w-xl text-lg leading-8 text-emerald-50/90">
                    We believe every sustainable idea deserves an opportunity to
                    grow. Our mission is to remove the barriers between
                    innovators, supporters, and communities by creating a
                    transparent ecosystem where ideas receive the funding and
                    visibility they need to become reality.
                  </p>
                </div>
              </div>

              {/* ================= Vision ================= */}
              <div className="flex flex-col gap-6 lg:col-span-2">
                <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-500">
                    Our Vision
                  </span>

                  <h3 className="mt-4 text-3xl font-black text-slate-900 dark:text-white">
                    A Greener Future
                  </h3>

                  <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                    Build the world's most trusted environmental innovation
                    marketplace, where sustainable ideas can inspire, scale, and
                    create measurable global impact.
                  </p>
                </div>

                <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                    We Believe
                  </p>

                  <blockquote className="mt-5 text-2xl font-black leading-relaxed text-slate-900 dark:text-white">
                    "Small ideas,
                    <span className="text-emerald-500">
                      {" "}
                      when supported by a global community,
                    </span>
                    <br />
                    can change the world."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= Why EcoSpark ================= */}
        <section className="relative overflow-hidden py-20">
          <div className="container mx-auto max-w-7xl px-4 lg:px-0">
            {/* Header */}

            <div className="mx-auto mb-20 max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                Why EcoSpark
              </span>

              <h2 className="mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                More Than
                <span className="block text-emerald-500">
                  Just Crowdfunding
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                EcoSpark Hub is built specifically for environmental innovation,
                connecting people, funding, and sustainable ideas in one
                transparent ecosystem.
              </p>
            </div>

            {/* Cards */}

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Global Community",
                  description:
                    "Connect innovators, researchers, and supporters from around the world.",
                },
                {
                  number: "02",
                  title: "Transparent Funding",
                  description:
                    "Every contribution is tracked to ensure accountability and trust.",
                },
                {
                  number: "03",
                  title: "Verified Ideas",
                  description:
                    "High-quality environmental projects reviewed and supported by the community.",
                },
                {
                  number: "04",
                  title: "Real Impact",
                  description:
                    "Measure success through funding, implementation, and environmental outcomes.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 transition-all duration-500 hover:-translate-y-3 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Background Glow */}

                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/5 blur-3xl transition-transform duration-700 group-hover:scale-150" />

                  {/* Number */}

                  <div className="relative z-10">
                    <span className="text-5xl font-black text-slate-100 transition-colors duration-300 group-hover:text-emerald-200 dark:text-slate-800 dark:group-hover:text-emerald-900">
                      {item.number}
                    </span>

                    <h3 className="mt-8 text-2xl font-black text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-5 leading-7 text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>

                    <div className="mt-8 h-1 w-12 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= Platform Impact ================= */}
        <section className="relative overflow-hidden">
          {/* Background */}

          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
          </div>

          <div className="container relative mx-auto max-w-7xl px-4 lg:px-0">
            {/* Heading */}
            <div className="mx-auto mb-20 max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
                Platform Impact
              </span>

              <h2 className="mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
                Numbers That
                <span className="block text-emerald-500">
                  Inspire Confidence
                </span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
                Every project, every supporter, and every contribution helps
                accelerate the global transition toward a sustainable future.
              </p>
            </div>

            {/* Stats */}
            <div className="grid gap-px overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-200 dark:border-slate-800 dark:bg-slate-800 lg:grid-cols-2">
              {[
                {
                  value: "12K+",
                  label: "Global Innovators",
                },
                {
                  value: "500+",
                  label: "Environmental Ideas",
                },
                {
                  value: "85+",
                  label: "Countries Reached",
                },
                {
                  value: "$2.4M",
                  label: "Funding Raised",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="group bg-white p-12 transition-all duration-500 hover:bg-emerald-50 dark:bg-slate-900 dark:hover:bg-slate-900"
                >
                  <p className="text-6xl font-black tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-600 dark:text-white md:text-7xl">
                    {item.value}
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-1 w-12 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-24" />

                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Text */}
            <div className="mx-auto mt-16 max-w-4xl text-center">
              <p className="text-xl font-medium leading-9 text-slate-600 dark:text-slate-400">
                Together, our global community is transforming innovative
                environmental ideas into measurable actions that benefit people
                and the planet.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
