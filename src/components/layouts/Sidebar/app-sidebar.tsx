"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { User, Route } from "@/types";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/enums";
import { AdminRoutes } from "@/routes/admin-routes";
import { MemberRoutes } from "@/routes/member-routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { NavUser } from "@/components/modules/dashboard/shared/NavUser";

export function AppSidebar({
  user,
  ...props
}: { user: User | null | undefined } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  let routes: Route[] = [];

  const isActive = (url: string): boolean => {
    return pathname === url;
  };

  switch (user?.role) {
    case UserRole.MEMBER:
      routes = MemberRoutes;
      break;

    case UserRole.ADMIN:
      routes = AdminRoutes;
      break;
  }

  return (
    <Sidebar
      {...props}
      className="border-r border-emerald-100 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
    >
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {routes?.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-2">
                {group.items.map((item) => {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive(item.url)}
                        className={cn(
                          "relative flex items-center gap-3 rounded-2xl px-3 py-5 transition-all duration-300",
                          isActive(item.url)
                            ? "bg-linear-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/60"
                        )}
                      >
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon
                              className={cn(
                                "h-5 w-5 shrink-0 transition-all duration-300",
                                isActive(item.url)
                                  ? "text-white"
                                  : "text-slate-400"
                              )}
                            />
                          )}
                          <span className="font-semibold tracking-tight">
                            {item.title}
                          </span>

                          {isActive(item.url) && (
                            <div className="absolute right-3 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,.8)]" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}