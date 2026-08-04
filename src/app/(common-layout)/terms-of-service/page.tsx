"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Gavel,
  UserPlus,
  Ban,
  Scale,
  Copyright,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const terms = [
  {
    id: "account",
    icon: UserPlus,
    title: "Account Eligibility",
    content:
      "By creating an account on EcoSpark-Hub, you represent that you are at least 18 years of age and that all information provided is accurate and truthful. You are responsible for maintaining the security of your credentials.",
  },
  {
    id: "conduct",
    icon: Ban,
    title: "Prohibited Conduct",
    content:
      "Users may not submit fraudulent ideas, engage in harassment, or attempt to circumvent the platform's payment systems. Any 'spamming' of the voting or comment system will result in immediate account suspension.",
  },
  {
    id: "ip",
    icon: Copyright,
    title: "Intellectual Property",
    content:
      "Users retain ownership of the original ideas they submit. However, by posting on EcoSpark-Hub, you grant us a worldwide license to display and promote your concept to potential contributors and the public.",
  },
  {
    id: "liability",
    icon: Scale,
    title: "Limitation of Liability",
    content:
      "EcoSpark-Hub acts as a facilitator for environmental innovation. We do not guarantee the success of any project and are not liable for any financial losses or project failures resulting from platform interactions.",
  },
  {
    id: "disclaimer",
    icon: AlertCircle,
    title: "Disclaimer of Warranties",
    content:
      "EcoSpark-Hub is provided on an " +
      '"as is" and "as available" basis. We disclaim any warranties, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose.',
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-8">
      <div className="container mx-auto max-w-7xl px-4 lg:px-0">
        {/* Hero */}
        <div className="relative mb-24 overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900 md:p-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 dark:border-emerald-900/40 dark:bg-emerald-950/30">
              <Gavel className="h-4 w-4 text-emerald-500" />

              <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
                Terms & Conditions
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white md:text-7xl">
              Rules that keep
              <br />
              <span className="bg-linear-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent italic">
                EcoSpark Hub
              </span>{" "}
              safe.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              These Terms of Service explain your rights, responsibilities, and
              the standards that help maintain a transparent and trusted
              community for innovators and supporters.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 dark:border-slate-800 dark:bg-slate-950">
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  Updated
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
                  Reading Time
                </p>
                <p className="mt-1 font-bold">5 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Section List (Numbered) */}
          <div className="md:col-span-12 space-y-12">
            {terms.map((term, index) => (
              <motion.section
                key={term.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start gap-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-cyan-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                      <term.icon size={24} />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">
                      Section {index + 1}
                    </p>

                    <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
                      {term.title}
                    </h2>

                    <p className="mt-6 leading-8 text-slate-600 dark:text-slate-400">
                      {term.content}
                    </p>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Important Notice Box */}
          <div className="md:col-span-12 mt-12">
            <div className="overflow-hidden rounded-[3rem] bg-linear-to-r from-rose-600 to-orange-500 p-10 text-white shadow-2xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <AlertCircle size={32} />
              </div>
              <div className="flex-1">
                <h3 className="text-3xl font-black">Notice of Arbitration</h3>
                <p className="mt-4 max-w-3xl leading-8 text-white/80">
                  PLEASE NOTE: THESE TERMS CONTAIN AN ARBITRATION CLAUSE. EXCEPT
                  FOR CERTAIN TYPES OF DISPUTES, YOU AGREE THAT DISPUTES BETWEEN
                  US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 rounded-[3rem] border border-slate-200 bg-white p-12 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white">
            Questions about these terms?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-500">
            If anything in these Terms of Service is unclear, our support team
            is happy to help explain your rights and responsibilities.
          </p>

          <Button
            asChild
            className="mt-8 rounded-2xl bg-emerald-600 px-8 py-6 text-base hover:bg-emerald-700"
          >
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
