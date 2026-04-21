import { Route } from "@/types";
import { ClipboardList, LayoutDashboard, Tags, User } from "lucide-react";

export const AdminRoutes: Route[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/admin-dashboard/profile",
        icon: User,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Overview",
        url: "/admin-dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Platform Control",
    items: [
      {
        title: "Manage Categories",
        url: "/admin-dashboard/manage-categories",
        icon: Tags,
      },
      {
        title: "Manage Ideas",
        url: "/admin-dashboard/manage-ideas",
        icon: ClipboardList,
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/manage-users",
        icon: ClipboardList,
      },
      {
        title: "Payments History",
        url: "/admin-dashboard/payments-history",
        icon: ClipboardList,
      },
    ],
  },
];
