import React from "react";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserFromToken } from "@/lib/jwt";
import { UserRole } from "@/types/enums";
import { ModeToggle } from "@/components/layouts/ThemeToggle";

export default async function DashboardLayout({
  admin,
  member,
}: Readonly<{
  admin: React.ReactNode;
  member: React.ReactNode;
}>) {
  const user = await getUserFromToken();
  let dashboardLink = "";

  switch (user?.role) {
    case UserRole.MEMBER:
      dashboardLink = "/dashboard";
      break;

    case UserRole.ADMIN:
      dashboardLink = "/admin-dashboard";
      break;
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset className="bg-slate-50/50 dark:bg-slate-950/50">
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 px-6 backdrop-blur-md dark:bg-slate-900/80 transition-all">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={dashboardLink}
                    className="font-medium text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-slate-900 dark:text-white capitalize">
                    {user?.role} PANEL
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex flex-1 items-center justify-end">
            <ModeToggle />
          </div>
        </header>

        <main className="flex flex-1 flex-col p-6 animate-in fade-in duration-500">
          <div className="mx-auto w-full max-w-7xl">
            {user?.role === UserRole.ADMIN ? admin : member}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
