"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Play, Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 mb-8 animate-bounce-slow">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span className="text-xs font-black tracking-widest uppercase text-slate-600 dark:text-slate-400">
            The Future of Eco-Innovation
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9]">
          Spark the <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-400 italic">
            Green
          </span>{" "}
          Revolution.
        </h1>

        {/* Sub-headline */}
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 font-medium mb-12 leading-relaxed">
          The global marketplace to buy and sell sustainable blueprints. Turn
          your environmental ideas into reality or fund the next big spark in
          green technology.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-16 px-10 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white font-black text-lg transition-all shadow-2xl shadow-emerald-500/20 group cursor-pointer"
          >
            <Link href="/ideas">
              Explore Ideas
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-16 px-10 rounded-2xl border-2 border-slate-100 dark:border-slate-800 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer transition-all shadow-2xl shadow-slate-500/20 group"
          >
            <Link
              href="/dashboard/create-idea"
              className="flex items-center gap-2"
            >
              <Leaf className="h-5 w-5 text-emerald-500" />
              Start Selling
            </Link>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-wrap justify-center items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <p className="text-xs font-black tracking-widest text-slate-400 w-full mb-4 uppercase">
            Trusted by innovators from
          </p>
          <div className="flex items-center gap-2 font-black text-xl italic text-slate-400">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />{" "}
            ECOSYSTEM
          </div>
          <div className="flex items-center gap-2 font-black text-xl italic text-slate-400">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />{" "}
            TERRA-FORM
          </div>
          <div className="flex items-center gap-2 font-black text-xl italic text-slate-400">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg" />{" "}
            BIO-LAB
          </div>
        </div>
      </div>
    </section>
  );
}
