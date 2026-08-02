import { Globe2, Lightbulb, Sparkles, Users, Zap } from "lucide-react";

const stats = [
  {
    label: "Active Innovators",
    value: "12K+",
    icon: Users,
    color: "text-sky-500",
  },
  {
    label: "Eco Solutions",
    value: "500+",
    icon: Lightbulb,
    color: "text-emerald-500",
  },
  {
    label: "Countries",
    value: "85+",
    icon: Globe2,
    color: "text-amber-500",
  },
  {
    label: "CO₂ Offset",
    value: "2.4K",
    icon: Zap,
    color: "text-violet-500",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/20 dark:text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Platform Impact
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight md:text-5xl">
            Growing Together
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500 dark:text-slate-400">
            Thousands of innovators, supporters, and environmental projects are
            already creating measurable impact worldwide.
          </p>
        </div>

        {/* Stats */}

        <div className="overflow-hidden rounded-[36px] border border-slate-200/70 bg-white/80 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
          <div className="grid divide-y divide-slate-200 dark:divide-slate-800 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group relative px-8 py-10 text-center transition-all duration-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/10"
              >
                {/* Glow */}

                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
                </div>

                <div className="relative">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-6 dark:bg-slate-800">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>

                  <h3 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                    {stat.value}
                  </h3>

                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
