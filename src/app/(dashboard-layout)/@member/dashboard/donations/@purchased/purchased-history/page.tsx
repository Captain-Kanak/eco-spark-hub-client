import React from "react";

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
import { SearchQueryParams } from "@/types";

export default async function PurchasedHistoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchQueryParams>;
}) {
  const params = await searchParams;
  const page = params.page || "1";
  const limit = "12";

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
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900"></tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {/* <AppPagination
        currentPage={meta?.currentPage || 1}
        totalPages={meta?.totalPages || 1}
      /> */}
    </div>
  );
}
