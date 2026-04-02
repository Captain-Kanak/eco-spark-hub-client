import * as React from "react";

import { SearchForm } from "@/components/layouts/search-form";
import { VersionSwitcher } from "@/components/layouts/version-switcher";
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
import { DecodedToken, Route } from "@/types";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/enums";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { MemberRoutes } from "@/routes/MemberRoutes";
import Logo from "./Logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavUser } from "../modules/dashboard/NavUser";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: { user: DecodedToken } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  let routes: Route[] = [];

  switch (user.role) {
    case UserRole.ADMIN:
      routes = AdminRoutes;
      break;

    case UserRole.MEMBER:
      routes = MemberRoutes;
      break;

    default:
      routes = [];
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/80">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1 px-2">
                {group.items.map((item) => {
                  const isActive =
                    item.url === "/admin-dashboard" || item.url === "/dashboard"
                      ? pathname === item.url
                      : pathname.startsWith(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "relative flex items-center gap-3 px-3 py-5 transition-all duration-200 rounded-xl group",
                          isActive
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-600 hover:text-white"
                            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                        )}
                      >
                        <Link href={item.url}>
                          {item.icon && (
                            <item.icon
                              className={cn(
                                "h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                                isActive
                                  ? "text-white"
                                  : "text-slate-400 group-hover:text-slate-600",
                              )}
                            />
                          )}
                          <span className="font-semibold tracking-tight">
                            {item.title}
                          </span>

                          {/* Modern Active Indicator */}
                          {isActive && (
                            <div className="absolute right-2 h-1.5 w-1.5 rounded-full bg-white/40" />
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
