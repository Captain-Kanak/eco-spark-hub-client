"use client";

import { ChevronRight, Menu } from "lucide-react";
import { Accordion } from "@/components/ui/accordion";
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
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ThemeToggle";
import { useState } from "react";

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

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

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
                        {item.title}
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

            <Button
              asChild
              variant="outline"
              size="lg"
              className="hidden sm:flex border-slate-200 dark:border-slate-800 font-semibold hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 transition-colors"
            >
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>

            <Button
              asChild
              size="lg"
              className={cn(
                "bg-emerald-600 text-white font-bold px-8 shadow-lg shadow-emerald-600/20",
                "hover:bg-white hover:text-emerald-600 hover:border-emerald-600 border border-transparent",
                "transition-all duration-300 active:scale-95",
              )}
            >
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />

            <Sheet open={isOpen} onOpenChange={(value) => setIsOpen(!!value)}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-xl font-bold transition-colors",
                          isActive(item.url)
                            ? "bg-emerald-600 text-white"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900",
                        )}
                      >
                        {item.title}
                        <ChevronRight
                          className={cn(
                            "h-4 w-4",
                            isActive(item.url) ? "opacity-100" : "opacity-20",
                          )}
                        />
                      </Link>
                    ))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={auth.login.url}>{auth.login.title}</Link>
                    </Button>
                    <Button asChild onClick={() => setIsOpen(false)}>
                      <Link href={auth.signup.url}>{auth.signup.title}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
