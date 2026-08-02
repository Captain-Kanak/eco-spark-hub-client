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
  SheetFooter,
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
import { getMe } from "@/actions/auth";
import {
  ADMIN_ROUTE_PATHS,
  MEMBER_ROUTE_PATHS,
} from "@/routes/routes-constant";

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
    { title: "CATEGORIES", url: "/categories" },
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
  const dashboardLink =
    user?.role === UserRole.ADMIN
      ? ADMIN_ROUTE_PATHS.OVERVIEW
      : MEMBER_ROUTE_PATHS.OVERVIEW;

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  const handleLogout = async () => {
    try {
      await deleteCookie("better-auth.session_token");

      setUser(null);

      toast.success("Logged out successfully.");
      setIsOpen(false);
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
    <section
      className={cn(
        "py-4 sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-md dark:border-slate-800/60 dark:bg-slate-950/80 transition-all",
        className,
      )}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Desktop */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Nav Links */}
          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="rounded-full border border-emerald-100/60 bg-white/70 p-1 backdrop-blur-md dark:border-emerald-900/50 dark:bg-slate-900/70">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link
                      href={item.url}
                      className={cn(
                        "relative flex h-10 items-center px-5 text-sm font-semibold transition-all duration-300",
                        "after:absolute after:-bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:bg-emerald-500 after:transition-all",
                        isActive(item.url)
                          ? "scale-105 tracking-wide text-emerald-600 after:w-8 dark:text-emerald-400"
                          : "text-slate-600 hover:scale-105 hover:text-emerald-600 hover:after:w-6 dark:text-slate-300 dark:hover:text-emerald-400",
                      )}
                    >
                      {item.title.toUpperCase()}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mode Toggle and Auth */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full border border-slate-200/70 p-1 dark:border-slate-800">
              <ModeToggle />
            </div>

            {user ? (
              <div className="hidden lg:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 cursor-pointer rounded-full border border-slate-200 p-0 transition-all duration-300 hover:scale-105 hover:border-emerald-300 hover:ring-4 hover:ring-emerald-500/10 dark:border-slate-800 dark:hover:border-emerald-700"
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={user.image || ""}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-emerald-600 text-white font-bold">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="mt-2 w-64 rounded-xl border border-slate-200/70 bg-background p-2 shadow-xl dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200"
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
                        className="h-10 cursor-pointer rounded-lg transition-colors focus:bg-emerald-50 focus:text-emerald-600 dark:focus:bg-emerald-900/20"
                      >
                        <Link href={dashboardLink}>
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
                  variant="ghost"
                  size="lg"
                  className="rounded-full border-slate-200 font-semibold transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                <Button
                  asChild
                  form="register-form"
                  type="submit"
                  className="rounded-full bg-emerald-600 px-6 font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:scale-105 hover:bg-emerald-700 active:scale-95"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile */}
        <div className="flex items-center justify-between lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden rounded-full border-slate-200 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full sm:w-90 bg-background/95 p-0 backdrop-blur-xl"
            >
              <SheetHeader className="p-6 text-left border-b border-slate-100 dark:border-slate-900">
                <SheetTitle className="flex items-center gap-2">
                  <Logo />
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-6 py-8">
                {user && (
                  <div className="mb-8 rounded-2xl border border-emerald-100/60 bg-emerald-50/40 p-4 dark:border-emerald-900/40 dark:bg-emerald-900/10">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback className="bg-emerald-600 text-white font-bold">
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
                      className="h-11 w-full justify-between rounded-xl border border-transparent transition-all hover:border-emerald-200 hover:bg-emerald-50 dark:hover:border-emerald-900 dark:hover:bg-emerald-900/20"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={dashboardLink}>
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
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-4 py-3 font-semibold transition-all duration-300",
                        isActive(item.url)
                          ? "text-emerald-600 dark:text-emerald-400 border-l-2 border-emerald-500"
                          : "text-slate-700 hover:bg-emerald-50 hover:pl-6 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400",
                      )}
                    >
                      {item.title}
                      <ChevronRight className="h-4 w-4 opacity-30 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>

              <SheetFooter>
                <div className="p-6 border-t border-slate-100 dark:border-slate-900 space-y-3">
                  {user ? (
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="group h-12 w-full justify-between rounded-2xl border border-rose-200/70 bg-rose-50/40 px-4 font-semibold text-rose-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-100 hover:text-rose-700 hover:shadow-lg hover:shadow-rose-500/10 dark:border-rose-900/40 dark:bg-rose-950/20 dark:hover:border-rose-800 dark:hover:bg-rose-900/30 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <LogOut className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:rotate-6" />
                        <span>Sign Out</span>
                      </div>

                      <ChevronRight className="h-4 w-4 opacity-50 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                    </Button>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="ghost"
                        size="lg"
                        className="rounded-full border-slate-200 font-semibold transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20"
                      >
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>

                      <Button
                        asChild
                        form="register-form"
                        type="submit"
                        className="rounded-full bg-emerald-600 px-6 font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:scale-105 hover:bg-emerald-700 active:scale-95"
                      >
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <div className="flex items-center rounded-full border border-slate-200/70 p-1 dark:border-slate-800">
            <ModeToggle />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
