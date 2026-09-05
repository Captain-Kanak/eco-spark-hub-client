"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Lock, CreditCard } from "lucide-react";
import { useTheme } from "next-themes";

import { Idea } from "@/types";
import { Button } from "@/components/ui/button";
import { Currency } from "@/types/enums";
import { createPaymentIntent } from "@/actions/donation";

interface PaymentFormProps {
  idea: Idea | null;
  amount: number;
  currency: Currency;
}

export default function PaymentForm({
  idea,
  amount,
  currency,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string>("");

  const cardOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: theme === "dark" ? "#ffffff" : "#1e293b",
        fontFamily: "'Inter', sans-serif",
        "::placeholder": {
          color: theme === "dark" ? "#94a3b8" : "#94a3b8",
        },
      },
      invalid: {
        color: "#e11d48",
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setPaymentError("");

    const card = elements.getElement(CardElement);

    if (!card) {
      setPaymentError("Card details are unavailable");
      setLoading(false);
      return;
    }

    // 1. Create Stripe PaymentMethod
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message || "Failed to process card");
      setLoading(false);
      return;
    }

    // 2. Create PaymentIntent on backend
    const paymentIntent = await createPaymentIntent({
      ideaId: idea?.id as string,
      amount,
      currency,
    });

    const secret = paymentIntent.data;

    if (!secret) {
      setPaymentError("Unable to initiate payment");
      setLoading(false);
      return;
    }

    // 3. Confirm payment with Stripe
    const result = await stripe.confirmCardPayment(secret, {
      payment_method: paymentMethod.id,
    });

    if (result.error) {
      setPaymentError(result.error.message || "Payment failed");
      setLoading(false);
      return;
    }

    // 4. Payment succeeded
    if (result.paymentIntent.status === "succeeded") {
      toast.success("Donation successful!");

      router.push(`/ideas/${idea?.slug}`);

      return;
    }

    setPaymentError("Payment was not completed");
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 shadow-2xl rounded-[2.5rem] p-8 w-full max-w-md border border-slate-100 dark:border-slate-800 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Complete Your Donation
          </h2>

          <p className="text-slate-500 font-medium">
            Your contribution will support:
            <br />
            <span className="text-emerald-600 font-bold">{idea?.title}</span>
          </p>
        </div>

        {/* Donation Amount */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Donation Amount
            </span>

            <span className="text-2xl font-black text-emerald-600">
              {currency} {amount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
            <CreditCard className="h-4 w-4" />

            <span className="text-xs font-bold uppercase tracking-widest">
              Card Details
            </span>
          </div>

          <CardElement options={cardOptions} />
        </div>

        {/* Pay Button */}
        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Processing..." : "Donate Now"}
        </Button>

        {/* Error */}
        {paymentError && (
          <p className="text-rose-500 text-sm font-bold text-center animate-in fade-in">
            {paymentError}
          </p>
        )}

        {/* Security */}
        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 uppercase tracking-widest font-bold">
          <Lock className="h-3 w-3" />
          100% Secure Encrypted Transaction
        </p>
      </form>
    </div>
  );
}
