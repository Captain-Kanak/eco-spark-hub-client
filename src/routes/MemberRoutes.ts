import { Route } from "@/types";
import { LayoutDashboard, Lightbulb, ShoppingCart, User } from "lucide-react";

export const MemberRoutes: Route[] = [
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: User,
      },
    ],
  },
  {
    title: "Member Management",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Create Idea",
        url: "/dashboard/create-idea",
        icon: ShoppingCart,
      },
      {
        title: "My Ideas",
        url: "/dashboard/my-ideas/shared-ideas",
        icon: Lightbulb,
      },
      {
        title: "Payments History",
        url: "/dashboard/payments-history",
        icon: ShoppingCart,
      },
    ],
  },
];
