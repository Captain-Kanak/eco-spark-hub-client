"use client";

import { motion, Variants } from "framer-motion";
import {
  Users,
  Lightbulb,
  Hourglass,
  DollarSign,
  Layers,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ElementType;
  description: string;
  color: string;
  index: number;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  color,
}: StatCardProps) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group p-6 rounded-[2.5rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 shadow-sm overflow-hidden"
    >
      {/* Background Glow */}
      <div
        className={cn(
          "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-20 transition-opacity",
          color,
        )}
      />

      <div className="relative flex flex-col h-full justify-between">
        <div className="flex items-start justify-between">
          <div className={cn("p-4 rounded-2xl text-white shadow-lg", color)}>
            <Icon size={24} />
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">
            <TrendingUp size={10} /> +12%
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
            {title}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
              {typeof value === "number" && title.includes("Revenue")
                ? `$${value.toLocaleString()}`
                : value}
            </span>
          </div>
          <p className="text-xs font-medium text-slate-500 mt-2 flex items-center gap-1">
            {description} <ArrowUpRight size={12} className="text-slate-300" />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsGrid({ stats }: { stats: any }) {
  const cards = [
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      icon: DollarSign,
      description: "Gross platform earnings",
      color: "bg-emerald-500",
    },
    {
      title: "Active Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Total registered accounts",
      color: "bg-blue-500",
    },
    {
      title: "Approved Ideas",
      value: stats.totalIdeas,
      icon: Lightbulb,
      description: "Live environmental projects",
      color: "bg-amber-500",
    },
    {
      title: "Pending Queue",
      value: stats.totalPendingIdeas,
      icon: Hourglass,
      description: "Awaiting admin review",
      color: "bg-rose-500",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: Layers,
      description: "Thematic classifications",
      color: "bg-violet-500",
    },
    {
      title: "Total Payments",
      value: stats.totalPayments,
      icon: TrendingUp,
      description: "Successful transactions",
      color: "bg-indigo-500",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {cards.map((card, i) => (
        <StatCard key={card.title} {...card} index={i} />
      ))}
    </motion.div>
  );
}
