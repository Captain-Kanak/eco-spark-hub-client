"use client";

import { User } from "@/types";
import {
  CalendarDays,
  CheckCircle2,
  Edit3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import React from "react";
import UpdateProfileModal from "./UpdateProfileModal";

export default function ProfilePage({ user }: { user: User }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "-";

  const dateOfBirth = user.dateOfBirth
    ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "-";

  return (
    <div className="space-y-8">
      {/* ==================== PAGE HEADER ==================== */}
      <div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Account
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              My Profile
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
              Manage your personal information and account details.
            </p>
          </div>

          <UpdateProfileModal user={user} />
        </div>
      </div>

      {/* ==================== PROFILE HERO ==================== */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        <div className="relative p-6 sm:p-8 md:p-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="rounded-[2rem] bg-linear-to-br from-emerald-400 via-emerald-500 to-teal-600 p-1 shadow-xl shadow-emerald-500/20">
                <div className="h-28 w-28 overflow-hidden rounded-[1.75rem] bg-white dark:bg-slate-900 sm:h-32 sm:w-32">
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name,
                      )}&background=10b981&color=fff&bold=true`
                    }
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Online / verified indicator */}
              <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-emerald-500 dark:border-slate-900">
                <CheckCircle2 className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* User information */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {user.name}
                </h2>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                  <ShieldCheck className="h-3 w-3" />
                  {user.role}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {user.email}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <CalendarDays className="h-3.5 w-3.5 text-emerald-600" />
                  Joined{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </div>

                <div className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  Account Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== INFORMATION GRID ==================== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-500/10">
              <UserRound className="h-5 w-5 text-emerald-600" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 dark:text-white">
                Personal Information
              </h3>
              <p className="text-xs text-slate-500">
                Your basic account information
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <ProfileInfoItem
              icon={<UserRound />}
              label="Full Name"
              value={user.name}
            />

            <ProfileInfoItem
              icon={<Mail />}
              label="Email Address"
              value={user.email}
            />

            <ProfileInfoItem
              icon={<CalendarDays />}
              label="Date of Birth"
              value={
                user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Not provided"
              }
            />
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 dark:bg-cyan-500/10">
              <ShieldCheck className="h-5 w-5 text-cyan-600" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 dark:text-white">
                Account Information
              </h3>
              <p className="text-xs text-slate-500">
                Your account status and details
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <ProfileInfoItem
              icon={<ShieldCheck />}
              label="Role"
              value={user.role}
            />

            <ProfileInfoItem
              icon={<CheckCircle2 />}
              label="Account Status"
              value={user.status}
            />

            <ProfileInfoItem
              icon={<CalendarDays />}
              label="Joined At"
              value={
                user.dateOfBirth
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Not provided"
              }
            />
          </div>
        </div>
      </div>

      {/* ==================== CONTACT / ADDRESS ==================== */}
      <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-500/10">
            <MapPin className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <h3 className="font-black text-slate-900 dark:text-white">
              Contact Information
            </h3>
            <p className="text-xs text-slate-500">
              Your contact and location details
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ProfileInfoItem
            icon={<Phone />}
            label="Phone"
            value={user.phone || "Not provided"}
          />

          <ProfileInfoItem
            icon={<MapPin />}
            label="Address"
            value={user.address || "Not provided"}
          />
        </div>
      </div>
    </div>
  );
}

function ProfileInfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
        <span className="h-4 w-4 text-slate-400 [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-bold text-slate-700 dark:text-slate-200">
          {value}
        </p>
      </div>
    </div>
  );
}
