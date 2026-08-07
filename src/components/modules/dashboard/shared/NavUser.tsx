"use client";

import { LogOut, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteCookie } from "@/lib/cookie";

export function NavUser({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await deleteCookie("better-auth.session_token");

      toast.success("Logged out successfully.");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="group h-auto rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:bg-slate-800 cursor-pointer"
            >
              <div className="flex w-full items-center gap-3">
                <Avatar className="h-12 w-12 rounded-2xl ring-2 ring-emerald-500/15">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback className="rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 font-bold text-white">
                    {user?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">
                    {user?.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>

                <ChevronsUpDown className="h-4 w-4 text-slate-400 transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0">
              <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 rounded-xl">
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 text-white">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="font-bold">
                      {user?.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>

            <div className="rounded-xl bg-emerald-50 p-3 text-center dark:bg-emerald-900/20">
              <p className="text-xs text-slate-500">
                Eco Points
              </p>

              <p className="text-lg font-black text-emerald-600">
                {user?.ecoPoints ?? 0}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer rounded-xl py-3 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-900/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
