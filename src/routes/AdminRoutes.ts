import { Route } from "@/types";
import {
  DollarSign,
  LayoutDashboard,
  Lightbulb,
  Tags,
  User,
  Users,
} from "lucide-react";

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
        url: "/admin-dashboard/manage-ideas/approved",
        icon: Lightbulb,
      },
      {
        title: "Manage Users",
        url: "/admin-dashboard/manage-users",
        icon: Users,
      },
      {
        title: "Payments History",
        url: "/admin-dashboard/payments-history",
        icon: DollarSign,
      },
    ],
  },
];
