"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Database,
  FileText,
  Clock,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const policySections = [
  {
    id: "collection",
    icon: Database,
    title: "Data Collection",
    content:
      "We collect information you provide directly to us when you create an account, submit an idea, or make a payment. This includes your name, email address, and transaction details.",
  },
  {
    id: "usage",
    icon: ShieldCheck,
    title: "How We Use Data",
    content:
      "Your data allows us to personalize your experience, process transactions, and maintain the security of our community. We never sell your personal information to third parties.",
  },
  {
    id: "security",
    icon: Lock,
    title: "Security Measures",
    content:
      "We implement industry-standard encryption and security protocols (SSL/TLS) to protect your data. Payment information is handled through secure, PCI-compliant processors.",
  },
  {
    id: "cookies",
    icon: EyeOff,
    title: "Cookie Policy",
    content:
      "We use cookies to understand site usage and improve our interface. You can manage your cookie preferences through your browser settings at any time.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4 lg:px-0">
        {/* Hero */}
        <div className="relative mb-24 overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900 md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <Lock className="h-4 w-4 text-emerald-500" />

              <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
                Privacy & Trust
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-7xl">
              Your
              <span className="bg-linear-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent italic">
                Privacy
              </span>
              <br />
              Comes First.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              Transparency and trust are the foundation of EcoSpark Hub. We are
              committed to protecting your information while providing a secure
              platform for innovators and supporters around the world.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Last Updated
                </p>
                <p className="mt-1 font-bold">May 2026</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Version
                </p>
                <p className="mt-1 font-bold">2.1</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Encryption
                </p>
                <p className="mt-1 font-bold">SSL / TLS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Quick Navigation - Visible on Desktop */}
          <div className="sticky top-24 hidden h-fit overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:block">
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.25em] text-slate-400">
              Jump to section
            </h3>
            <div className="space-y-1">
              {policySections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-all hover:bg-emerald-50 dark:hover:bg-slate-800"
                >
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {section.title}
                  </span>

                  <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Policy Sections */}
          <div className="md:col-span-2 space-y-16">
            {policySections.map((section, index) => (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group scroll-mt-24 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-cyan-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <section.icon size={24} />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                    {section.title}
                  </h2>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg border-l-4 border-slate-100 dark:border-slate-800 pl-6">
                  {section.content}
                </p>
              </motion.section>
            ))}

            {/* Legal Contact Footer */}
            <div className="overflow-hidden rounded-[3rem] bg-linear-to-r from-emerald-600 to-cyan-600 p-12 text-white shadow-2xl">
              <h3 className="text-3xl font-black">
                Questions about your data?
              </h3>
              <p className="mt-4 max-w-xl leading-8 text-white/80">
                Our legal team is available to discuss your privacy concerns.
                Reach out to our Data Protection Officer.
              </p>

              <Button
                asChild
                className="group mt-8 h-14 rounded-2xl bg-white px-8 text-base font-bold text-emerald-700 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-100"
              >
                <Link href="/contact">
                  Contact Privacy Team
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
