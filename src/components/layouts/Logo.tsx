import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 transition-all duration-300 hover:scale-105"
    >
      <span className="h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] transition-all duration-300 group-hover:scale-125" />

      <span className="text-2xl font-black tracking-tight">
        <span className="text-emerald-600">ECO</span>
        <span className="text-slate-900 dark:text-white">HUB</span>
      </span>
    </Link>
  );
}
