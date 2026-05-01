import { getSales } from "@/actions/payment.action";
import AppPagination from "@/components/layouts/AppPagination";
import { cn } from "@/lib/utils";
import { Payment } from "@/types";
import { GetIdeaSearchParams } from "@/types/idea.type";
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  User,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function SalesHistoryPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;
  const page = params.page || "1";
  const limit = "12";

  const { data: payments, meta } = await getSales({
    page,
    limit,
  });

  return (
    <div className="container mx-auto pb-10">
      {/* Table Section */}
      <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-900">
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Sold Idea / Blueprint
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Buyer Name
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Sale Date
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Earnings
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Status
                </th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {payments && payments.length > 0 ? (
                payments.map((payment: any) => (
                  <tr
                    key={payment.id}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    {/* Idea Details */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">
                            {payment.idea?.title || "Project Idea"}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                            TX: {payment.transactionId.slice(0, 14)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Buyer Details */}
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                          <User size={12} className="text-slate-500" />
                        </div>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {payment.user?.name || "Anonymous Buyer"}
                        </p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </td>

                    {/* Earnings */}
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-1">
                        <ArrowUpRight size={14} className="text-emerald-500" />
                        <span className="font-black text-slate-900 dark:text-white text-lg">
                          ${payment.amount}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-6">
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          payment.status === "PAID"
                            ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
                        )}
                      >
                        {payment.status === "PAID" ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <Clock size={12} />
                        )}
                        {payment.status}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="px-8 py-6 text-right">
                      <Link
                        href={`/ideas/${payment.ideaId}`}
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors"
                      >
                        Details <ExternalLink size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">
                      No sales yet
                    </p>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Market your ideas more effectively to see sales here!
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <AppPagination
        currentPage={Number(page)}
        totalPages={meta?.totalPages || 1}
      />
    </div>
  );
}
