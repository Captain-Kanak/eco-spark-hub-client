import { getUsers } from "@/actions/auth.action";
import { getCategories } from "@/actions/category.action";
import { getIdeas, getPendingIdeas } from "@/actions/idea.action";
import { getAllPayments } from "@/actions/payment.action";
import StatsGrid from "@/components/modules/dashboard/admin/StatsGrid";
import { Sparkles } from "lucide-react";

export default async function AdminDashboardPage() {
  const [
    usersPromise,
    categoriesPromise,
    ideasPromise,
    pendingIdeasPromise,
    paymentsPromise,
  ] = await Promise.all([
    getUsers({}),
    getCategories({}),
    getIdeas({}),
    getPendingIdeas({}),
    getAllPayments({}),
  ]);

  const stats = {
    totalUsers: usersPromise.meta?.total || 0,
    totalCategories: categoriesPromise.meta?.total || 0,
    totalIdeas: ideasPromise.meta?.total || 0,
    totalPendingIdeas: pendingIdeasPromise.meta?.total || 0,
    totalPayments: paymentsPromise.meta?.total || 0,
    totalRevenue:
      paymentsPromise.data?.reduce(
        (sum: number, payment: any) => sum + payment.amount,
        0,
      ) || 0,
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center text-white animate-pulse">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600">
            Platform Overview
          </span>
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
          Dashboard{" "}
          <span className="text-slate-400 italic font-light tracking-normal">
            Metrics
          </span>
        </h1>
        <p className="text-slate-500 font-medium max-w-md mt-2">
          Real-time snapshot of EcoSpark-Hub's performance, user growth, and
          community impact.
        </p>
      </div>

      {/* The Animated Grid */}
      <StatsGrid stats={stats} />

      {/* Placeholder for Charts/Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
        <div className="h-64 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-900 flex items-center justify-center text-slate-300 font-bold text-sm uppercase tracking-widest">
          Revenue Visualization Area
        </div>
        <div className="h-64 rounded-[2.5rem] border-2 border-dashed border-slate-100 dark:border-slate-900 flex items-center justify-center text-slate-300 font-bold text-sm uppercase tracking-widest">
          User Growth Chart Area
        </div>
      </div>
    </div>
  );
}
