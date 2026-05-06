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
  ChevronRight
} from "lucide-react";

const terms = [
  {
    id: "account",
    icon: UserPlus,
    title: "Account Eligibility",
    content: "By creating an account on EcoSpark-Hub, you represent that you are at least 18 years of age and that all information provided is accurate and truthful. You are responsible for maintaining the security of your credentials."
  },
  {
    id: "conduct",
    icon: Ban,
    title: "Prohibited Conduct",
    content: "Users may not submit fraudulent ideas, engage in harassment, or attempt to circumvent the platform's payment systems. Any 'spamming' of the voting or comment system will result in immediate account suspension."
  },
  {
    id: "ip",
    icon: Copyright,
    title: "Intellectual Property",
    content: "Users retain ownership of the original ideas they submit. However, by posting on EcoSpark-Hub, you grant us a worldwide license to display and promote your concept to potential contributors and the public."
  },
  {
    id: "liability",
    icon: Scale,
    title: "Limitation of Liability",
    content: "EcoSpark-Hub acts as a facilitator for environmental innovation. We do not guarantee the success of any project and are not liable for any financial losses or project failures resulting from platform interactions."
  }
];

export default function TermsOfServicePage() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Page Header */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="h-6 w-6 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-950">
              <Gavel size={14} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Legal Agreement</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            Terms of <span className="text-slate-400 italic font-light tracking-normal">Service.</span>
          </motion.h1 >
          
          <p className="mt-6 text-slate-500 font-medium max-w-2xl leading-relaxed">
            Please read these terms carefully before using our platform. By accessing EcoSpark-Hub, you agree to be bound by these rules and our community guidelines.
          </p>
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
                className="relative pl-16 md:pl-24"
              >
                {/* Large Number Background */}
                <span className="absolute left-0 top-0 text-6xl md:text-8xl font-black text-slate-100 dark:text-slate-900 select-none -z-10">
                  0{index + 1}
                </span>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      <term.icon size={20} />
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                      {term.title}
                    </h2>
                  </div>
                  
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-3xl leading-relaxed">
                    {term.content}
                  </p>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Important Notice Box */}
          <div className="md:col-span-12 mt-12">
            <div className="p-8 md:p-12 rounded-[3rem] bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="h-16 w-16 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-rose-200/50 dark:shadow-none flex items-center justify-center text-rose-500 shrink-0">
                <AlertCircle size={32} />
              </div>
              <div className="flex-1">
                <h3 className="font-black text-xl text-rose-900 dark:text-rose-400 mb-2">Notice of Arbitration</h3>
                <p className="text-rose-700/70 dark:text-rose-300/50 font-medium text-sm">
                  PLEASE NOTE: THESE TERMS CONTAIN AN ARBITRATION CLAUSE. EXCEPT FOR CERTAIN TYPES OF DISPUTES, YOU AGREE THAT DISPUTES BETWEEN US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION.
                </p>
              </div>
              {/* <button className="whitespace-nowrap px-8 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-rose-700 transition-all">
                I Understand
              </button> */}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}