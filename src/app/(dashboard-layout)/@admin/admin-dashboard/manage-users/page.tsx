import { getUsers } from "@/actions/auth.action";
import AppPagination from "@/components/layouts/AppPagination";
import DeleteUserButton from "@/components/modules/dashboard/admin/DeleteUserButton";
import { cn } from "@/lib/utils";
import { Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default async function ManageUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;

  const page = params.page || "1";
  const limit = "12";

  const { data: users, meta } = await getUsers({
    page,
    limit,
  });

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            User <span className="text-emerald-500 italic">Management</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            View activity and moderate community members.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-900">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  User Identity
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Role & Status
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Activity Stats
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Joined Date
                </th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {users?.map((user: any) => (
                <tr
                  key={user.id}
                  className="group hover:bg-slate-50/30 dark:hover:bg-slate-900/30 transition-colors"
                >
                  {/* User Profile */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-900 shadow-sm relative">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold">
                            {user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                          <Mail size={10} className="text-emerald-500" />{" "}
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Role & Status */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter",
                          user.role === "ADMIN"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700",
                        )}
                      >
                        {user.role === "ADMIN" && <ShieldCheck size={10} />}
                        {user.role}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1">
                        <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                        {user.status}
                      </span>
                    </div>
                  </td>

                  {/* Stats */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="text-slate-900 dark:text-white font-black text-sm">
                          {user._count.ideas}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase">
                          Ideas
                        </div>
                      </div>
                      <div className="w-px h-6 bg-slate-100 dark:bg-slate-800" />
                      <div className="flex flex-col items-center">
                        <div className="text-slate-900 dark:text-white font-black text-sm">
                          {user._count.payments}
                        </div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase">
                          Purchases
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Joined Date */}
                  <td className="px-6 py-5 text-xs font-bold text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-right">
                    <DeleteUserButton userId={user.id} userName={user.name} />
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
