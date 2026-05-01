import { getPurchasedIdeas } from "@/actions/idea.action";
import AppPagination from "@/components/layouts/AppPagination";
import PurchasedIdeaCard from "@/components/modules/idea/PurchasedIdeaCard";
import { GetIdeaSearchParams } from "@/types/idea.type";
import { PackageOpen } from "lucide-react";
import React from "react";

export default async function PurchasedIdeasPage({
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
    <div className="max-w-7xl mx-auto">
      {payments?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
          <PackageOpen className="h-16 w-16 text-slate-300 mb-4" />
          <h3 className="text-xl font-bold">No purchases yet</h3>
          <p className="text-slate-500">
            Your library is empty. Start exploring!
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payments?.map((payment: any) => (
              <PurchasedIdeaCard key={payment.id} idea={payment.idea} />
            ))}
          </div>

          <AppPagination
            totalPages={meta?.totalPages || 1}
            currentPage={meta?.currentPage || 1}
          />
        </div>
      )}
    </div>
  );
}
