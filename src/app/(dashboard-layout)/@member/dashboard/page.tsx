import { getMyIdeas, getPurchasedIdeas } from "@/actions/idea.action";
import { Payment } from "@/types";
import React from "react";

export default async function MemberDashboardPage() {
  const [ideasPromise, paymentsPromise] = await Promise.all([
    getMyIdeas({}),
    getPurchasedIdeas({}),
  ]);

  const totalIdeas = ideasPromise.meta?.total || 0;
  const totalPurchases = paymentsPromise.meta?.total || 0;
  const totalSpent =
    paymentsPromise.data?.reduce(
      (acc: number, curr: Payment) => acc + curr.amount,
      0,
    ) || 0;

  return <div>MemberDashboardPage</div>;
}
