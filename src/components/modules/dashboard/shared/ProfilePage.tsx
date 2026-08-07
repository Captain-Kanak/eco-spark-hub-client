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

export default function ProfilePage({ user }: { user: User }) {
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
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
            <UserRound className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>

          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Account
          </p>
        </div>

        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Manage your account information and personal identity.
        </p>
      </div>

      {/* Profile Hero */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-teal-500/5 blur-3xl" />
        </div>

        <div className="relative p-8 md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            {/* Identity */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="h-28 w-28 overflow-hidden rounded-[2rem] border-4 border-white bg-slate-100 shadow-xl dark:border-slate-900 dark:bg-slate-800">
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name,
                      )}&background=059669&color=fff&bold=true`
                    }
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Online / verified indicator */}
                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-500 dark:border-slate-950">
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {user.name}
                </h2>

                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {user.role}
                  </div>

                  <div
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-black 
                  uppercase tracking-widest text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold
               text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-[0.98] cursor-pointer"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Information Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-[2rem] border border-slate-200/70 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
              <UserRound className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 dark:text-white">
                Personal Information
              </h3>

              <p className="text-xs text-slate-500">
                Your personal account details
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {/* Email */}
            <ProfileInfoRow
              icon={Mail}
              label="Email Address"
              value={user.email}
            />

            {/* Phone */}
            <ProfileInfoRow
              icon={Phone}
              label="Phone Number"
              value={user.phone || "Not provided"}
            />

            {/* Date of Birth */}
            <ProfileInfoRow
              icon={CalendarDays}
              label="Date of Birth"
              value={dateOfBirth}
            />

            {/* Address */}
            <ProfileInfoRow
              icon={MapPin}
              label="Address"
              value={user.address || "Not provided"}
            />
          </div>
        </div>

        {/* Account Information */}
        <div className="rounded-[2rem] border border-slate-200/70 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5 dark:border-slate-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <h3 className="font-black text-slate-900 dark:text-white">
                Account Information
              </h3>

              <p className="text-xs text-slate-500">
                Security and account details
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {/* Role */}
            <ProfileInfoRow
              icon={ShieldCheck}
              label="Account Role"
              value={user.role}
              valueClassName="capitalize text-emerald-600 dark:text-emerald-400"
            />

            {/* Status */}
            <ProfileInfoRow
              icon={CheckCircle2}
              label="Account Status"
              value={user.status || "Active"}
              valueClassName="capitalize text-emerald-600 dark:text-emerald-400"
            />

            {/* Verification */}
            <ProfileInfoRow
              icon={Mail}
              label="Email Verification"
              value={user.emailVerified ? "Verified" : "Not verified"}
              valueClassName={
                user.emailVerified
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-amber-600 dark:text-amber-400"
              }
            />

            {/* Joined */}
            <ProfileInfoRow
              icon={CalendarDays}
              label="Member Since"
              value={joinedDate}
            />
          </div>
        </div>
      </div>

      {/* Profile Form
          Keep this hidden for now.
          Later we can open it inside a Dialog when
          "Edit Profile" is clicked.
      */}
    </div>
  );
}

function ProfileInfoRow({
  icon: Icon,
  label,
  value,
  valueClassName = "",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900">
        <Icon className="h-4 w-4 text-slate-400" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
          {label}
        </p>

        <p
          className={`mt-1 truncate text-sm font-bold text-slate-700 dark:text-slate-300 ${valueClassName}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
