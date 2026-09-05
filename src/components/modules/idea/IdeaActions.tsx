"use client";

import { Button } from "@/components/ui/button";
import { Idea } from "@/types";
import Link from "next/link";
import React from "react";

export default function IdeaActions({ idea }: { idea: Idea }) {
  return (
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

            <Link href={`/donations/${idea?.slug}`}>
              <Button
                size="lg"
                className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-lg font-bold cursor-pointer mb-6"
              >
                💰 Donate Now
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 rounded-2xl cursor-pointer"
            >
              ❤️ Like Idea
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 rounded-2xl cursor-pointer"
            >
              ⭐ Save
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 rounded-2xl cursor-pointer"
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
  );
}
