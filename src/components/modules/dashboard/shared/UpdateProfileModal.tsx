"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileForm from "./UpdateProfileForm";
import { User } from "@/types";

interface ProfileEditModalProps {
  user: User;
}

export default function UpdateProfileModal({ user }: ProfileEditModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-11 rounded-xl bg-emerald-600 px-5 font-bold text-white shadow-lg shadow-emerald-500/20
         transition-all hover:bg-emerald-700 hover:shadow-emerald-500/30 active:scale-[0.98] cursor-pointer"
        >
          <Edit3 className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>

      <DialogContent
        className="max-h-[90vh] overflow-hidden overflow-y-auto rounded-[2rem] border border-slate-200
       bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-950 sm:max-w-2xl [&>button]:cursor-pointer"
      >
        <div className="p-6 sm:p-8">
          <div className="border-b border-slate-200 pb-6 mb-6 dark:border-slate-800">
            <DialogHeader className="items-center text-center space-y-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-xl shadow-emerald-500/30">
                  <Edit3 className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="space-y-1.5">
                <DialogTitle className="text-[32px] leading-none font-black tracking-tight">
                  Edit Profile
                </DialogTitle>

                <DialogDescription className="max-w-sm text-sm leading-6 text-slate-500">
                  Update your personal information and account details.
                </DialogDescription>
              </div>
            </DialogHeader>
          </div>

          <ProfileForm user={user} onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
