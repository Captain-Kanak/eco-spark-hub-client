"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Testimonial Card - The Human Element */}
        <div className="relative max-w-5xl mx-auto mb-32">
          <div className="absolute -top-10 -left-10 text-emerald-500/10">
            <Quote size={180} fill="currentColor" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-12 items-center bg-slate-50 dark:bg-slate-900 rounded-[4rem] p-8 md:p-16 border border-slate-100 dark:border-slate-800 shadow-2xl">
            <div className="space-y-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-emerald-500 text-emerald-500"
                  />
                ))}
              </div>
              <p className="text-2xl md:text-3xl font-medium tracking-tight text-slate-900 dark:text-white leading-tight">
                "EcoSpark didn't just help me sell my solar irrigation
                blueprint; it connected me with a community that actually
                implemented it in three different countries."
              </p>
              <div>
                <p className="font-black text-lg text-slate-900 dark:text-white">
                  Dr. Aris Thorne
                </p>
                <p className="text-emerald-500 font-bold uppercase tracking-widest text-xs">
                  Sustainability Architect
                </p>
              </div>
            </div>

            <div className="relative h-100 rounded-[3rem] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-700">
              <Image
                src="/eco.png"
                alt="Creator"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Final CTA - The Conversion Point */}
        <div className="relative rounded-[4rem] bg-slate-900 dark:bg-emerald-500 p-12 md:p-24 overflow-hidden text-center">
          {/* Decorative Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/5 rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
              Ready to spark the <br />
              <span className="opacity-50">next big idea?</span>
            </h2>
            <p className="text-emerald-100/80 text-lg md:text-xl font-medium">
              Join 12,000+ innovators already building the future. Whether
              you're a creator or an implementer, your journey starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {/* Primary Button */}
              <Button
                asChild
                size="lg"
                className={cn(
                  "h-16 px-10 rounded-2xl font-black text-lg transition-all w-full sm:w-auto bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 cursor-pointer",
                )}
              >
                <Link href="/register">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              {/* Outline Button */}
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  "h-16 px-10 rounded-2xl font-black text-lg w-full sm:w-auto transition-all bg-white text-slate-900 hover:bg-slate-50 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 cursor-pointer",
                )}
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
