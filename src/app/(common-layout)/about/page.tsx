"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sprout, Users, ShieldCheck, Zap, Globe } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">
              Our Origin
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mt-4 leading-[0.9]">
              Igniting the <span className="text-slate-400 italic">Green</span>{" "}
              Revolution.
            </h1>
            <p className="mt-8 text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
              EcoSpark-Hub is more than a platform. It's a global incubator
              where environmental visionaries meet the capital needed to save
              our planet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Bento Grid */}
      <section className="py-20 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div
              {...fadeInUp}
              className="md:col-span-8 p-12 bg-emerald-600 rounded-[3rem] text-white relative overflow-hidden group"
            >
              <div className="relative z-10">
                <Zap className="mb-6 opacity-80" size={40} />
                <h2 className="text-4xl font-black tracking-tight mb-4 text-white">
                  Our Mission
                </h2>
                <p className="text-emerald-10/80 text-lg font-medium max-w-xl">
                  To accelerate the transition to a sustainable future by
                  democratizing access to environmental innovation. We believe
                  every green idea deserves a chance to shine.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="md:col-span-4 p-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <Globe className="mb-6 text-emerald-500" size={40} />
              <h2 className="text-2xl font-black tracking-tight mb-4">
                The Vision
              </h2>
              <p className="text-slate-500 font-medium">
                A world where environmental solutions are developed by the
                community, for the community, powered by transparent funding.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black tracking-tight uppercase italic text-slate-900 dark:text-white">
              Why We <span className="text-emerald-500">Care</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: ShieldCheck,
                title: "Transparency",
                desc: "Every dollar donated is tracked through our secure ledger system.",
              },
              {
                icon: Users,
                title: "Community First",
                desc: "Decisions are driven by the collective voice of our eco-warriors.",
              },
              {
                icon: Sprout,
                title: "Pure Impact",
                desc: "We focus on ideas that offer measurable, positive environmental change.",
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="h-16 w-16 rounded-3xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-emerald-500">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-black">{value.title}</h3>
                <p className="text-slate-500 font-medium px-4">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-32 container mx-auto px-6">
        <div className="bg-slate-950 dark:bg-emerald-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 uppercase">
              Ready to spark <br />{" "}
              <span className="italic text-emerald-400">change?</span>
            </h2>
            <Link
              href="/register"
              className="px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg hover:scale-105 transition-transform"
            >
              Join the Movement
            </Link>
          </motion.div>
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-64 h-64 border-2 border-white rounded-full opacity-50" />
          </div>
        </div>
      </section>
    </div>
  );
}
