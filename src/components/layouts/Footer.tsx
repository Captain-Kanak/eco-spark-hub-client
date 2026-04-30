"use client";

import React from "react";
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
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 pt-20 pb-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo />

            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              The world's leading marketplace for sustainable innovations. Join
              a global community of eco-conscious creators and problem solvers.
            </p>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                <Link href="https://twitter.com">
                  <FaTwitter className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                <Link href="https://github.com">
                  <FaGithub className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-500"
              >
                <Link href="https://linkedin.com">
                  <FaLinkedin className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">
              Explore
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 text-sm font-bold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account & Support */}
          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">
              Platform
            </h4>
            <ul className="space-y-4">
              {importantLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 text-sm font-bold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Sparkles className="h-20 w-20 text-emerald-500" />
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-lg">
              Stay in the loop
            </h4>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              Get the latest eco-innovations delivered to your inbox weekly.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter email"
                className="rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-6 focus-visible:ring-emerald-500 font-medium"
              />
              <Button
                onClick={handleSubscribe}
                className="w-full rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black py-6 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
            © {currentYear} ECOSPARK-HUB. BUILT FOR THE FUTURE.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
              <Globe className="h-4 w-4" />
              <span>English (US)</span>
            </div>
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
