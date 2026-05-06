"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Eye,
  CreditCard,
  Calendar,
  ArrowUpRight,
  Hash,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function PaymentDetailsSheet({ payment }: { payment: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-xl border-slate-100 text-slate-600 hover:bg-slate-50 font-bold text-xs gap-1.5 transition-all cursor-pointer"
        >
          <Eye size={14} /> Details
        </Button>
      </SheetTrigger>
      <SheetContent className="w-100 sm:w-135 rounded-l-[2.5rem] bg-white border-l border-slate-100 dark:bg-slate-950 p-8 overflow-y-auto">
        <SheetHeader className="space-y-1 mb-6">
          <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase flex items-center gap-1.5">
            <Sparkles size={12} /> Audit Log
          </span>
          <SheetTitle className="text-2xl font-black tracking-tighter uppercase">
            Transaction Information
          </SheetTitle>
          <SheetDescription className="text-xs text-slate-400 font-medium">
            Internal Ledger ID: {payment.id}
          </SheetDescription>
        </SheetHeader>

        {/* Amount & Status Grid */}
        <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-900 rounded-3xl p-6 mb-6 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
              Amount Transacted
            </p>
            <p className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              ${payment.amount.toFixed(2)}
            </p>
          </div>
          <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
            {payment.status}
          </span>
        </div>

        {/* Transaction Fields */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm py-2 border-b border-dashed border-slate-100 dark:border-slate-900">
            <span className="font-bold text-slate-400 flex items-center gap-1.5">
              <Hash size={14} /> Transaction ID
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white select-all">
              {payment.transactionId}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-dashed border-slate-100 dark:border-slate-900">
            <span className="font-bold text-slate-400 flex items-center gap-1.5">
              <CreditCard size={14} /> Method
            </span>
            <span className="font-bold text-slate-900 dark:text-white capitalize">
              {payment.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-dashed border-slate-100 dark:border-slate-900">
            <span className="font-bold text-slate-400 flex items-center gap-1.5">
              <Calendar size={14} /> Timestamp
            </span>
            <span className="font-bold text-slate-600 dark:text-slate-300">
              {new Date(payment.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Buyer Section */}
        <div className="space-y-3 mb-6">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Payer Identity
          </h4>
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">
              {payment.user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-black text-sm text-slate-900 dark:text-white leading-none mb-1">
                {payment.user?.name}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {payment.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Seller Section */}
        <div className="space-y-3 mb-6">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Seller Identity
          </h4>
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center gap-3">
            <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-500">
              {payment.idea?.user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-black text-sm text-slate-900 dark:text-white leading-none mb-1">
                {payment.idea?.user?.name}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {payment.idea?.user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Asset Bought Section */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Purchased Idea
          </h4>
          <div className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
            {payment.idea?.image && (
              <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={payment.idea.image}
                  alt={payment.idea.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <h5 className="font-black text-sm text-slate-900 dark:text-white line-clamp-1">
                {payment.idea?.title}
              </h5>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                {payment.idea?.description}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
