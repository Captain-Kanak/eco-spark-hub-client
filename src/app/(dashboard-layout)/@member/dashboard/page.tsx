import { getMyIdeas, getPurchasedIdeas } from "@/actions/idea.action";
import { getSales } from "@/actions/payment.action";
import { Payment } from "@/types";
import React from "react";
import {
  Lightbulb,
  ShoppingBag,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function MemberDashboardPage() {
  const [ideasPromise, purchasesPromise, salesPromise] = await Promise.all([
    getMyIdeas({}),
    getPurchasedIdeas({}),
    getSales({}),
  ]);

  const totalIdeas = ideasPromise.meta?.total || 0;
  const totalPurchases = purchasesPromise.meta?.total || 0;
  const totalSpent =
    purchasesPromise.data?.reduce(
      (acc: number, curr: Payment) => acc + curr.amount,
      0,
    ) || 0;
  const totalSales = salesPromise.meta?.total || 0;
  const totalRevenue =
    salesPromise.data?.reduce(
      (acc: number, curr: Payment) => acc + curr.amount,
      0,
    ) || 0;

  const netProfit = totalRevenue - totalSpent;

  const metrics = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      description: `${totalSales} successful sales`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-500/10",
      borderColor: "border-emerald-100 dark:border-emerald-500/20",
      trend: <ArrowUpRight className="text-emerald-500" size={16} />,
    },
    {
      label: "Total Spent",
      value: `$${totalSpent.toLocaleString()}`,
      description: `${totalPurchases} ideas unlocked`,
      icon: Wallet,
      color: "text-rose-600",
      bgColor: "bg-rose-50 dark:bg-rose-500/10",
      borderColor: "border-rose-100 dark:border-rose-500/20",
      trend: <ArrowDownRight className="text-rose-500" size={16} />,
    },
    {
      label: "My Innovations",
      value: totalIdeas,
      description: "Active blueprints",
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-500/10",
      borderColor: "border-blue-100 dark:border-blue-500/20",
    },
  ];

  return (
    <div className="container mx-auto py-10 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
          Overview <span className="text-emerald-500 italic">Matricks</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Real-time performance of your eco-innovation portfolio.
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={cn(
              "p-8 rounded-[2.5rem] border transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none",
              m.bgColor,
              m.borderColor,
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={cn(
                  "p-3 rounded-2xl bg-white dark:bg-slate-900 shadow-sm",
                  m.color,
                )}
              >
                <m.icon size={24} />
              </div>
              {m.trend}
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">
                {m.label}
              </h3>
              <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
                {m.value}
              </p>
              <p className="text-sm font-bold text-slate-500 mt-2">
                {m.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Performance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 dark:bg-slate-950 p-8 rounded-[3rem] border border-slate-800 flex items-center justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                Net Financial Impact
              </h3>
            </div>
            <p
              className={cn(
                "text-5xl font-black tracking-tighter",
                netProfit >= 0 ? "text-emerald-400" : "text-rose-400",
              )}
            >
              {netProfit >= 0
                ? `+$${netProfit.toLocaleString()}`
                : `-$${Math.abs(netProfit).toLocaleString()}`}
            </p>
          </div>
          <div className="hidden sm:block opacity-20 text-white">
            <BarChart3 size={80} strokeWidth={1} />
          </div>
        </div>

        {/* Quick Action Info */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex flex-col justify-center">
          <p className="text-slate-900 dark:text-white font-bold text-lg mb-1 italic">
            Ready to scale?
          </p>
          <p className="text-slate-500 text-sm font-medium mb-4">
            You have {totalIdeas} active blueprints. Share more ideas to
            increase your revenue stream.
          </p>
          <div className="flex gap-3">
            <div className="h-1.5 flex-1 bg-emerald-500 rounded-full" />
            <div className="h-1.5 flex-1 bg-emerald-500/30 rounded-full" />
            <div className="h-1.5 flex-1 bg-emerald-500/10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
