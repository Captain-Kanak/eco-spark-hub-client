import { getIdeaBySlug } from "@/actions/idea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Compass,
  Eye,
  Heart,
  Leaf,
  Lightbulb,
  LightbulbOff,
  MapPin,
  Quote,
  Target,
  TrendingUp,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function IdeaDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: idea } = await getIdeaBySlug(slug);

  if (!idea) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-6">
        <div className="relative max-w-2xl text-center">
          {/* Background Glow */}
          <div className="absolute inset-0 -z-10">
            <div className="mx-auto h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
          </div>

          {/* Icon */}
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 dark:border-emerald-900/30 dark:bg-emerald-950/20">
            <LightbulbOff className="h-14 w-14 text-emerald-500" />
          </div>

          <h1 className="mt-10 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            This idea couldn't be found
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            The project may have been removed, is no longer available, or the
            link you followed is incorrect.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button
              asChild
              className="rounded-full bg-emerald-600 px-7 hover:bg-emerald-700"
            >
              <Link href="/ideas">
                <Compass className="mr-2 h-4 w-4" />
                Explore Ideas
              </Link>
            </Button>

            <Button asChild variant="outline" className="rounded-full px-7">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back Home
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-400">
            Looking for inspiration? Browse hundreds of sustainability projects
            created by innovators around the world.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 lg:px-0 py-8">
      {/* Header / Back Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          asChild
          className="rounded-full gap-2 text-slate-500"
        >
          <Link href="/ideas">
            <ArrowLeft className="h-4 w-4" /> Back to Explore
          </Link>
        </Button>
      </div>

      {/* ================= HERO ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start py-14">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="rounded-full bg-emerald-500 hover:bg-emerald-500">
              {idea?.category?.name}
            </Badge>

            <Badge variant="outline" className="rounded-full capitalize">
              {idea?.status.replaceAll("_", " ").toLowerCase()}
            </Badge>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none">
            {idea?.title}
          </h1>

          <p className="text-lg leading-8 text-slate-600 dark:text-slate-400 max-w-3xl">
            {idea?.description}
          </p>

          {/* Creator */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                <User className="h-6 w-6 text-emerald-600" />
              </div>

              <div>
                <p className="font-bold">{idea?.user?.name}</p>

                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <BadgeCheck className="h-4 w-4 text-blue-500" />
                  Verified Member
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="h-5 w-5 text-emerald-500" />

              {idea?.location}
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="h-5 w-5 text-blue-500" />

              {new Date(idea!.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <Eye className="h-5 w-5 text-purple-500" />
              {idea?.views} views
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl">
            <div className="relative aspect-4/3">
              {idea?.coverImage ? (
                <Image
                  src={idea.coverImage}
                  alt={idea.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-emerald-500 via-teal-500 to-sky-500 flex items-center justify-center">
                  <Target className="h-24 w-24 text-white/70" />
                </div>
              )}
            </div>

            <div className="p-8 space-y-6">
              <div>
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-3xl font-black text-emerald-600">
                      ${Number(idea?.currentFunding).toLocaleString()}
                    </p>

                    <p className="text-sm text-slate-500">Raised</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">
                      ${Number(idea?.fundingGoal).toLocaleString()}
                    </p>

                    <p className="text-sm text-slate-500">Goal</p>
                  </div>
                </div>

                <Progress
                  value={
                    (Number(idea?.currentFunding) / Number(idea?.fundingGoal)) *
                    100
                  }
                  className="h-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5">
                  <TrendingUp className="h-6 w-6 text-emerald-500 mb-2" />

                  <p className="text-2xl font-black">
                    {Math.round(
                      (Number(idea?.currentFunding) /
                        Number(idea?.fundingGoal)) *
                        100,
                    )}
                    %
                  </p>

                  <p className="text-sm text-slate-500">Funded</p>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5">
                  <Heart className="h-6 w-6 text-rose-500 mb-2" />

                  <p className="text-2xl font-black">{idea?._count.likes}</p>

                  <p className="text-sm text-slate-500">Likes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-8 space-y-10">
            <div className="space-y-10">
              {/* ================= PROBLEM ================= */}
              <section className="relative overflow-hidden rounded-[2.5rem] border border-rose-100 dark:border-rose-900/30 bg-linear-to-br from-white via-rose-50/40 to-white dark:from-slate-900 dark:via-rose-950/10 dark:to-slate-900 p-10 lg:p-14">
                {/* background decoration */}

                <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-rose-500/5 blur-3xl" />

                <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-orange-500/5 blur-3xl" />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-lg shadow-rose-500/20">
                      <AlertTriangle className="h-8 w-8" />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] font-black text-rose-500">
                        Challenge
                      </p>

                      <h2 className="text-4xl font-black">The Problem</h2>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -left-3 -top-3 h-20 w-20 text-rose-200 dark:text-rose-900" />

                    <p className="relative pl-10 text-lg leading-9 text-slate-700 dark:text-slate-300">
                      {idea?.problemStatement}
                    </p>
                  </div>
                </div>
              </section>

              {/* ================= SOLUTION ================= */}
              <section className="relative overflow-hidden rounded-[2.5rem] border border-emerald-100 dark:border-emerald-900/30 bg-linear-to-br from-emerald-50/40 via-white to-white dark:from-emerald-950/10 dark:via-slate-900 dark:to-slate-900 p-10 lg:p-14">
                {/* decoration */}

                <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-emerald-500/5 blur-3xl" />

                <div className="flex items-center gap-5 mb-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                    <Lightbulb className="h-8 w-8" />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] font-black text-emerald-600">
                      Solution
                    </p>

                    <h2 className="text-4xl font-black">Proposed Solution</h2>
                  </div>
                </div>

                <div className="relative rounded-[2rem] border border-emerald-100 dark:border-emerald-900/30 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-8">
                  <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-emerald-200 dark:bg-emerald-800" />

                  <div className="flex gap-6">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-xl font-black mb-4">Our Approach</h3>

                      <p className="text-lg leading-9 text-slate-700 dark:text-slate-300 whitespace-pre-line">
                        {idea?.proposedSolution}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4">
            <aside className="lg:col-span-4">
              <div className="sticky top-28">
                <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl space-y-8">
                  <div>
                    <h3 className="text-xl font-black">Support this project</h3>

                    <p className="text-sm text-slate-500 mt-2">
                      Every contribution helps turn this idea into reality.
                    </p>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-lg font-bold"
                  >
                    💰 Donate Now
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-14 rounded-2xl"
                  >
                    ❤️ Like Idea
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-14 rounded-2xl"
                  >
                    ⭐ Save
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-14 rounded-2xl"
                  >
                    📤 Share
                  </Button>

                  <div className="border-t pt-6 space-y-5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Comments</span>

                      <span className="font-bold">{idea?._count.comments}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Likes</span>

                      <span className="font-bold">{idea?._count.likes}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">Views</span>

                      <span className="font-bold">{idea?.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </aside>
        </div>

        {/* ================= IMPACT ================= */}
        <section className="space-y-10 pt-14">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-emerald-600">
              Expected Impact
            </p>

            <h2 className="mt-3 text-4xl lg:text-5xl font-black">
              Real Change We Hope To Create
            </h2>

            <p className="mt-5 max-w-3xl mx-auto text-slate-500 text-lg leading-8">
              Every successful project should create measurable environmental
              and social impact. These are the outcomes this initiative aims to
              achieve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {idea?.expectedImpact?.map((impact, index) => {
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-500/5 blur-3xl" />

                  <div className="relative">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20">
                      <Leaf className="h-7 w-7" />
                    </div>

                    <p className="text-lg leading-8 font-medium text-slate-700 dark:text-slate-300">
                      {impact}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
