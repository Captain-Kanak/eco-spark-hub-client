import { getIdeas } from "@/actions/idea";
import { BarChart3 } from "lucide-react";

export default async function MemberDashboardPage() {
  const [ideasPromise] = await Promise.all([getIdeas({})]);

  const totalIdeas = ideasPromise.meta?.total || 0;

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"></div>

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
