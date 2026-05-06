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
  ChevronRight
} from "lucide-react";

const policySections = [
  {
    id: "collection",
    icon: Database,
    title: "Data Collection",
    content: "We collect information you provide directly to us when you create an account, submit an idea, or make a payment. This includes your name, email address, and transaction details."
  },
  {
    id: "usage",
    icon: ShieldCheck,
    title: "How We Use Data",
    content: "Your data allows us to personalize your experience, process transactions, and maintain the security of our community. We never sell your personal information to third parties."
  },
  {
    id: "security",
    icon: Lock,
    title: "Security Measures",
    content: "We implement industry-standard encryption and security protocols (SSL/TLS) to protect your data. Payment information is handled through secure, PCI-compliant processors."
  },
  {
    id: "cookies",
    icon: EyeOff,
    title: "Cookie Policy",
    content: "We use cookies to understand site usage and improve our interface. You can manage your cookie preferences through your browser settings at any time."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-6 w-6 rounded-lg bg-blue-500 flex items-center justify-center text-white">
              <Lock size={14} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-blue-600">Trust & Safety</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            Privacy <span className="text-slate-400 italic">Matters.</span>
          </motion.h1 >
          
          <div className="mt-6 flex items-center gap-4 text-slate-500 font-bold text-sm">
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full">
              <Clock size={14} /> Last Updated: May 2026
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-full">
              <FileText size={14} /> Version 2.1
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Quick Navigation - Visible on Desktop */}
          <div className="hidden md:block sticky top-24 h-fit space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Jump to section</h3>
            <div className="space-y-1">
              {policySections.map((section) => (
                <a 
                  key={section.id} 
                  href={`#${section.id}`}
                  className="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600"
                >
                  {section.title}
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
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
                className="scroll-mt-24 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-colors">
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
            <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-xl mb-4">Questions about your data?</h3>
              <p className="text-slate-500 font-medium mb-6">
                Our legal team is available to discuss your privacy concerns. Reach out to our Data Protection Officer.
              </p>
              <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all">
                Contact Privacy Team
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}