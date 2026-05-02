import { getMe } from "@/actions/auth.action";
import ProfileForm from "@/components/modules/dashboard/ProfileForm";
import { User, ShieldCheck, Mail, Camera, Calendar } from "lucide-react";
import React from "react";

export default async function AdminProfilePage() {
  const { data: user } = await getMe();

  if (!user) return null;

  return (
    <div className="container mx-auto py-10 px-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white">
          Account <span className="text-emerald-500 italic">Settings</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Manage your public identity and account security.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Quick Info Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative group mb-4">
                <div className="h-32 w-32 rounded-[2.5rem] overflow-hidden border-4 border-emerald-500/20">
                  <img
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${user.name}`
                    }
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                {user.name}
              </h2>
              <p className="text-sm text-slate-500 font-medium mb-4">
                {user.email}
              </p>

              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                <ShieldCheck size={12} />
                Verified {user.role}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <Mail size={16} className="text-slate-400" />
                {user.email}
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                <Calendar size={16} className="text-slate-400" />
                Date of birth:{" "}
                {user.date_of_birth
                  ? new Date(user.date_of_birth).toLocaleDateString("en-US")
                  : "-"}
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-400">
                Joined on:
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US")
                  : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Right: The Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-[3rem] p-8 md:p-12 shadow-sm">
            <ProfileForm user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
