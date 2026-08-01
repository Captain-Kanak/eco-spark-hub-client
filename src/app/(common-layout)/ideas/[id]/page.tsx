import { ideaAction } from "@/actions/idea";
import { Button } from "@/components/ui/button";
import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function IdeaDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [ideasResult] = await Promise.all([ideaAction.getById(id)]);

  const idea = ideasResult?.data;

  if (!idea) {
    return (
      <div className="p-20 text-center font-black">
        <div className="flex items-center justify-center gap-4">
          <Lock className="h-8 w-8" />
          <h1 className="text-3xl font-bold">Locked</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-4">
          You don&apos;t have access to this idea.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
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

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">
            {idea.title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            {idea.description}
          </p>
        </div>

        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-900"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative">
        <div className="bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 min-h-100">
          <h2 className="text-2xl font-black mb-6">Problem Statement</h2>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-loose">
            <div dangerouslySetInnerHTML={{ __html: idea.problemStatement }} />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/50 p-8 md:p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 min-h-100">
          <h2 className="text-2xl font-black mb-6">Solution Details</h2>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 leading-loose">
            <div dangerouslySetInnerHTML={{ __html: idea.proposedSolution }} />
          </div>
        </div>
      </div>
    </div>
  );
}
