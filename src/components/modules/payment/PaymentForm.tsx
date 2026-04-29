"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Loader2, Lock, CreditCard } from "lucide-react";
import { useTheme } from "next-themes";
import { getIdeaById } from "@/actions/idea.action";
import { confirmPayment, createPaymentIntent } from "@/actions/payment.action";
import { Idea } from "@/types";
import { Button } from "@/components/ui/button";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const router = useRouter();
  const { theme } = useTheme();

  const [idea, setIdea] = useState<Idea | null | undefined>(null);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string>("");

  useEffect(() => {
    getIdeaById(id as string).then((res) => setIdea(res?.data));
  }, [id]);

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
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message || "Failed to process card");
      setLoading(false);
      return;
    }

    const paymentIntent = await createPaymentIntent({ ideaId: id as string });
    const secret = paymentIntent.data;

    if (!secret) {
      setPaymentError("Unable to initiate payment");
      setLoading(false);
      return;
    }

    const result = await stripe.confirmCardPayment(secret, {
      payment_method: paymentMethod.id,
    });

    if (result.error) {
      setPaymentError(result.error.message || "Payment failed");
    } else if (result.paymentIntent.status === "succeeded") {
      const res = await confirmPayment({
        ideaId: id as string,
        transactionId: result.paymentIntent.id,
        paymentMethod: "card",
      });

      if (!res.success) {
        setPaymentError(res.message);
      } else {
        toast.success("Payment successful!");
        router.push("/dashboard/my-ideas/purchased-ideas");
        return;
      }
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 shadow-2xl rounded-[2.5rem] p-8 w-full max-w-md border border-slate-100 dark:border-slate-800 space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Complete Purchase
          </h2>
          <p className="text-slate-500 font-medium">
            Securing your access to:{" "}
            <span className="text-emerald-600 font-bold">{idea?.title}</span>
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3 text-slate-400">
            <CreditCard className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Card Details
            </span>
          </div>

          <CardElement options={cardOptions} />
        </div>

        <Button
          type="submit"
          disabled={!stripe || loading}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            `Pay $${idea?.price || "0.00"}`
          )}
        </Button>

        {paymentError && (
          <p className="text-rose-500 text-sm font-bold text-center animate-in fade-in">
            {paymentError}
          </p>
        )}

        <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1 uppercase tracking-widest font-bold">
          <Lock className="h-3 w-3" /> 100% Secure Encrypted Transaction
        </p>
      </form>
    </div>
  );
}
