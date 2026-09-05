"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { env } from "@/env";
import PaymentForm from "@/components/modules/payment/PaymentForm";
import { Idea } from "@/types";
import { Currency } from "@/types/enums";
import { Button } from "@/components/ui/button";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function PaymentClient({ idea }: { idea: Idea | null }) {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>(Currency.USD);
  const [showPayment, setShowPayment] = useState(false);

  const handleContinue = () => {
    const donationAmount = Number(amount);

    if (!donationAmount || donationAmount <= 0) {
      return;
    }

    setShowPayment(true);
  };

  if (showPayment) {
    return (
      <Elements stripe={stripePromise}>
        <PaymentForm idea={idea} amount={Number(amount)} currency={currency} />
      </Elements>
    );
  }

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-md rounded-[2.5rem] bg-white dark:bg-slate-900 p-8 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-6">
        <div className="space-y-5">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black">Support This Idea</h2>

            <p className="text-sm text-slate-500">
              Choose how much you would like to donate to
              <br />
              <span className="text-emerald-600 font-bold">{idea?.title}</span>
            </p>
          </div>

          {/* Funding Summary */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Funding Goal */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Funding Goal
                </p>

                <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">
                  ${idea?.fundingGoal?.toLocaleString()}
                </p>
              </div>

              {/* Estimated Budget */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Estimated Budget
                </p>

                <p className="mt-1 text-lg font-black text-slate-900 dark:text-white">
                  ${idea?.estimatedBudget?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Current Funding */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-500">
                  Current Funding
                </p>

                <p className="text-lg font-black text-emerald-600">
                  ${idea?.currentFunding?.toLocaleString()}
                </p>
              </div>

              {/* Progress */}
              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-full rounded-full bg-emerald-600 transition-all"
                    style={{
                      width: `${Math.min(
                        ((idea?.currentFunding || 0) /
                          (idea?.fundingGoal || 1)) *
                          100,
                        100,
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-400 text-right">
                  {Math.min(
                    ((idea?.currentFunding || 0) / (idea?.fundingGoal || 1)) *
                      100,
                    100,
                  ).toFixed(1)}
                  % funded
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-sm font-bold">Donation Amount</label>

          <input
            type="number"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Currency */}
        <div className="space-y-2">
          <label className="text-sm font-bold">Currency</label>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 outline-none"
          >
            <option value={Currency.USD}>USD</option>
            <option value={Currency.BDT}>BDT</option>
          </select>
        </div>

        <Button
          type="button"
          onClick={handleContinue}
          disabled={!amount || Number(amount) <= 0}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black cursor-pointer"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}
