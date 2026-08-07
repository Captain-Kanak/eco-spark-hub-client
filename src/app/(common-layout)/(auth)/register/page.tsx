import { RegisterForm } from "@/components/modules/auth/forms/RegisterForm";
import { ArrowRight, CheckCircle2, Globe, Leaf, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-950 py-8">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div
        className="relative mx-auto max-w-7xl min-h-screen grid lg:grid-cols-2 gap-16 px-4 lg:px-0 overflow-x-hidden"
      >
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 backdrop-blur dark:border-emerald-900 dark:bg-slate-900/80">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">
                Join EcoSpark Hub
              </span>
            </div>

            <h1 className="mt-8 text-6xl font-black leading-none tracking-tight">
              Build the
              <span className="block text-emerald-600">future together.</span>
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-8 text-slate-500">
              Discover sustainable innovations, support impactful projects,
              connect with changemakers, and help create a greener tomorrow.
            </p>
          </div>

          <div className="space-y-5">
            {[
              "Discover innovative eco ideas",
              "Support projects through funding",
              "Earn Eco Points & achievements",
              "Collaborate with global innovators",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/20">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>

                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white/70 p-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
                <Leaf />
              </div>

              <div>
                <h3 className="font-bold">
                  Every idea starts with one person.
                </h3>

                <p className="text-sm text-slate-500">
                  Today that person could be you.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center">
          <div className="w-full">
            <RegisterForm />

            <p className="mt-8 text-center text-sm text-slate-500">
              By continuing, you agree to our{" "}
              <Link
                href="/terms-of-service"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
