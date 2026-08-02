import { Route } from "@/types";
import { DollarSign, LayoutDashboard, Lightbulb, User } from "lucide-react";
import { MEMBER_ROUTE_PATHS } from "./routes-constant";

export const MEMBER_ROUTE_PREFIX = "/dashboard";

export const MEMBER_ROUTES: Route[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: MEMBER_ROUTE_PATHS.PROFILE,
        icon: User,
      },
    ],
  },
  {
    title: "Inventory Management",
    items: [
      {
        title: "Overview",
        url: MEMBER_ROUTE_PATHS.OVERVIEW,
        icon: LayoutDashboard,
      },
      {
        title: "Manage Ideas",
        url: MEMBER_ROUTE_PATHS.MY_IDEAS,
        icon: Lightbulb,
      },
      {
        title: "Payments History",
        url: MEMBER_ROUTE_PATHS.PAYMENTS_HISTORY,
        icon: DollarSign,
      },
    ],
  },
];
