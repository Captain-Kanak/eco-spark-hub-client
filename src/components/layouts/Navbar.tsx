"use client";

import { ChevronRight, LayoutDashboard, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";
import { getMe } from "@/actions/auth.action";
import { User } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserRole } from "@/types/enums";
import { deleteCookie } from "@/lib/cookie";
import { toast } from "sonner";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: MenuItem;
    signup: MenuItem;
  };
}

const Navbar = ({
  className,
  menu = [
    { title: "HOME", url: "/" },
    { title: "IDEAS", url: "/ideas" },
    { title: "ABOUT US", url: "/about" },
    { title: "CONTACT", url: "/contact" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null | undefined>(null);
  const router = useRouter();
  let dashboardLink = "/";

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  switch (user?.role) {
    case UserRole.ADMIN:
      dashboardLink = "/admin-dashboard";
      break;

    case UserRole.MEMBER:
      dashboardLink = "/dashboard";
      break;

    default:
      dashboardLink = "/";
  }

  const handleLogout = async () => {
    try {
      await deleteCookie("better-auth.session_token");

      setUser(null);

      toast.success("Logged out successfully.");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out.");
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const result = await getMe();

      if (result.success) {
        setUser(result.data);
      }
    };

    getUser();
  }, [pathname]);

  return (
    <section className={cn("py-4", className)}>
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Logo />

            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <Link
                        href={item.url}
                        className={cn(
                          "group inline-flex h-9 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-bold transition-all duration-200",
                          isActive(item.url)
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                            : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:text-slate-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-400",
                        )}
                      >
                        {item.title.toUpperCase()}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="mr-2">
              <ModeToggle />
            </div>

            {user ? (
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 border border-slate-200 dark:border-slate-800 hover:ring-4 hover:ring-blue-500/10 transition-all cursor-pointer"
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={user.image || ""}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-blue-600 text-white font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-64 mt-2 p-2 rounded-2xl shadow-2xl border-slate-200/60 dark:border-slate-800/60"
                    align="end"
                  >
                    <DropdownMenuLabel>
                      <div className="flex flex-col gap-0.5 px-2 py-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                        <span className="text-xs text-slate-500 truncate font-medium">
                          {user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        asChild
                        className="rounded-lg h-10 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-600"
                      >
                        <Link href={`${dashboardLink}`}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          <span className="font-semibold">Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-2" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="rounded-lg h-10 cursor-pointer text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-900/20 focus:text-rose-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span className="font-semibold">Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="hidden sm:flex border-slate-200 dark:border-slate-800 font-medium hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30 hover:border-emerald-200 dark:hover:border-emerald-900 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                <Button
                  form="register-form"
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] active:scale-[0.99] transition-all font-medium text-white rounded-sm shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden rounded-xl border-slate-200 dark:border-slate-800 cursor-pointer"
            >
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full sm:w-87.5 p-0 flex flex-col border-l border-slate-200 dark:border-slate-800"
          >
            <SheetHeader className="p-6 text-left border-b border-slate-100 dark:border-slate-900">
              <SheetTitle className="flex items-center gap-2">
                <Logo />
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {/* User Section for Mobile */}
              {user && (
                <div className="mb-8 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className="bg-blue-600 text-white font-bold">
                        {user.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white leading-tight">
                        {user.name}
                      </span>
                      <span className="text-xs text-slate-500 truncate max-w-37.5">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full justify-between h-10 rounded-xl"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={`${dashboardLink}`}>
                      <div className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </Link>
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
                  Navigation
                </p>

                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    {item.title}
                    <ChevronRight className="h-4 w-4 opacity-20" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 dark:border-slate-900 space-y-3">
              {user ? (
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full h-12 rounded-xl font-bold cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full h-12 rounded-xl font-bold"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full h-12 rounded-xl font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
};

export { Navbar };
