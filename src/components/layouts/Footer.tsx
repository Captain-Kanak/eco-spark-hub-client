"use client";

import Link from "next/link";
import { Mail, Globe, Sparkles } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";
import { toast } from "sonner";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    {
      id: 1,
      name: "All Ideas",
      href: "/ideas",
    },
    {
      id: 2,
      name: "About",
      href: "/about",
    },
    {
      id: 3,
      name: "Contact",
      href: "/contact",
    },
  ];

  const importantLinks = [
    {
      id: 1,
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      id: 2,
      name: "Terms of Service",
      href: "/terms-of-service",
    },
  ];

  const handleSubscribe = () => {
    toast.info("This feature is not available yet.");
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 py-14 lg:py-18">
      <div className="container mx-auto max-w-7xl px-4 lg:px-0">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo />

            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Eco Spark Hub empowers innovators, supporters, and communities to
              transform environmental ideas into real-world impact. Together,
              we're building a cleaner, greener, and more sustainable future—one
              idea at a time.
            </p>

            <div className="flex gap-4">
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20 cursor-pointer"
              >
                <Link href="https://twitter.com">
                  <FaTwitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20 cursor-pointer"
              >
                <Link href="https://github.com">
                  <FaGithub className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-800 dark:hover:border-emerald-800 dark:hover:bg-emerald-900/20 cursor-pointer"
              >
                <Link href="https://linkedin.com">
                  <FaLinkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-slate-900 dark:text-white uppercase">
              Explore
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-slate-900 dark:text-white uppercase">
              Platform
            </h4>
            <ul className="space-y-4">
              {importantLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-500 transition-all duration-300 hover:translate-x-1 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="rounded-3xl border border-emerald-200/90 bg-linear-to-br from-emerald-50 via-white to-white p-8 shadow-sm dark:border-emerald-900/40 dark:from-emerald-950/20 dark:via-slate-950 dark:to-slate-900">
            <div className="mb-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
                Newsletter
              </p>

              <h4 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Stay in the loop
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Get the latest eco-innovation news, featured projects, funding
                updates, and community stories delivered to your inbox.
              </p>
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                className="h-12 rounded-full border-slate-200 bg-white px-5 dark:border-slate-800 dark:bg-slate-950"
              />

              <Button
                onClick={handleSubscribe}
                className="h-12 w-full rounded-full bg-emerald-600 font-semibold shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:scale-[1.02] hover:bg-emerald-700 active:scale-95 cursor-pointer"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {currentYear} Eco Spark Hub. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <Globe className="h-4 w-4" />
              <span>English (US)</span>
            </div> */}
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <Mail className="h-4 w-4" />
              <span>support@ecospark.hub</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
