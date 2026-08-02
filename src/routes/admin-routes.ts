import { Route } from "@/types";
import {
  DollarSign,
  LayoutDashboard,
  Lightbulb,
  Tags,
  User,
  Users,
} from "lucide-react";
import { ADMIN_ROUTE_PATHS } from "./routes-constant";

export const AdminRoutes: Route[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: ADMIN_ROUTE_PATHS.PROFILE,
        icon: User,
      },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        title: "Overview",
        url: ADMIN_ROUTE_PATHS.OVERVIEW,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Platform Control",
    items: [
      {
        title: "Manage Categories",
        url: ADMIN_ROUTE_PATHS.MANAGE_CATEGORIES,
        icon: Tags,
      },
      {
        title: "Manage Ideas",
        url: ADMIN_ROUTE_PATHS.MANAGE_IDEAS,
        icon: Lightbulb,
      },
      {
        title: "Manage Users",
        url: ADMIN_ROUTE_PATHS.MANAGE_USERS,
        icon: Users,
      },
      {
        title: "Payments History",
        url: ADMIN_ROUTE_PATHS.PAYMENTS_HISTORY,
        icon: DollarSign,
      },
    ],
  },
];
