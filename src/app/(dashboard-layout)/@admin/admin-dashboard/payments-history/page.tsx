import { getAllPayments } from "@/actions/payment.action";
import AppPagination from "@/components/layouts/AppPagination";
import PaymentDetailsSheet from "@/components/modules/dashboard/admin/PaymentDetailsSheet";
import { CreditCard, ArrowDownLeft, DollarSign } from "lucide-react";

export default async function PaymentsHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = params.page || "1";
  const limit = "10";

  const { data: payments, meta } = await getAllPayments({
    page,
    limit,
  });

  return (
    <div className="container mx-auto space-y-6">
      {/* Header Deck */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            Financial <span className="text-emerald-500 italic">Ledger</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Audit purchases, access keys, and platform revenue.
          </p>
        </div>
      </div>

      {/* Main Ledger Table Frame */}
      <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-900">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Transaction ID
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Payer Reference
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Target Asset
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Gross Amount
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Processed
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Audit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {payments?.map((payment: any) => (
                <tr
                  key={payment.id}
                  className="group hover:bg-slate-50/20 dark:hover:bg-slate-900/20 transition-all"
                >
                  {/* Transaction Identity Code */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 flex items-center justify-center">
                        <ArrowDownLeft size={14} className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-30">
                          {payment.transactionId}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                          <CreditCard size={10} /> {payment.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Customer Identity Core */}
                  <td className="px-6 py-5">
                    <div>
                      <p className="font-black text-xs text-slate-900 dark:text-white">
                        {payment.user?.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400">
                        {payment.user?.email}
                      </p>
                    </div>
                  </td>

                  {/* Target Content Bought */}
                  <td className="px-6 py-5">
                    <div className="max-w-50">
                      <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {payment.idea?.title || "Deleted Concept Asset"}
                      </p>
                      <p className="text-[10px] font-medium text-slate-400 truncate">
                        ID: {payment.ideaId.substring(0, 8)}...
                      </p>
                    </div>
                  </td>

                  {/* Amount Transacted */}
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center text-xs font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 px-3 py-1 rounded-xl">
                      <DollarSign
                        size={12}
                        className="text-emerald-500 -mr-0.5"
                      />
                      {payment.amount}
                    </span>
                  </td>

                  {/* Date Flag */}
                  <td className="px-6 py-5 text-xs font-bold text-slate-500">
                    {new Date(payment.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Audit Actions Wrapper */}
                  <td className="px-8 py-5 text-right">
                    <PaymentDetailsSheet payment={payment} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AppPagination
        totalPages={meta?.totalPages || 1}
        currentPage={Number(page)}
      />
    </div>
  );
}
