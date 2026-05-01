import React from "react";
import { getPurchasedIdeas } from "@/actions/idea.action";
import { GetIdeaSearchParams } from "@/types/idea.type";
import {
  Calendar,
  ExternalLink,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AppPagination from "@/components/layouts/AppPagination";
import { Payment } from "@/types";

export default async function PurchasedHistoryPage({
  searchParams,
}: {
  searchParams: Promise<GetIdeaSearchParams>;
}) {
  const params = await searchParams;
  const page = params.page || "1";
  const limit = "12";

  const { data: payments, meta } = await getPurchasedIdeas({
    page,
    limit,
  });

  return (
    <div className="container mx-auto">
      {/* Table Section */}
      <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-900">
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Idea / Blueprint
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Date
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Amount
                </th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">
                  Status
                </th>
                <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {payments && payments.length > 0 ? (
                payments.map((payment: Payment) => (
                  <tr
                    key={payment.id}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
                  >
                    {/* Idea Details */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                            {payment.idea?.title || "Sustainability Idea"}
                          </p>
                          <p className="text-xs text-slate-400 font-medium font-mono uppercase tracking-tighter">
                            ID: {payment.transactionId.slice(0, 12)}...
                          </p>
                        </div>
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

                    {/* Amount */}
                    <td className="px-6 py-6">
                      <span className="font-black text-slate-900 dark:text-white text-lg">
                        ${payment.amount}
                      </span>
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
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-emerald-500 transition-colors"
                      >
                        View Blueprint <ExternalLink size={14} />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-sm">
                      No transactions found
                    </p>
                    <Link
                      href="/ideas"
                      className="text-emerald-500 font-black text-xs uppercase mt-4 block underline"
                    >
                      Browse Innovations
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <AppPagination
        currentPage={meta?.currentPage || 1}
        totalPages={meta?.totalPages || 1}
      />
    </div>
  );
}
