"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Idea } from "@/types";
import { IdeaStatus } from "@/types/enums";
import { format } from "date-fns";
import {
  Archive,
  Calendar,
  Edit,
  Eye,
  Heart,
  MessageCircle,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface IdeasTableProps {
  ideas: Idea[];
  onView: (idea: Idea) => void;
  onEdit?: (idea: Idea) => void;
  onDelete?: (idea: Idea) => void;
  onArchive?: (idea: Idea) => void;
  viewAsLink?: boolean;
}

export default function IdeasTable({
  ideas,
  onView,
  onEdit,
  onDelete,
  onArchive,
  viewAsLink,
}: IdeasTableProps) {
  return (
    <Table>
      {/* ================= HEADER ================= */}
      <TableHeader className="bg-slate-50/70 dark:bg-slate-900/70">
        <TableRow className="border-slate-100 dark:border-slate-800">
          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Idea
          </TableHead>

          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Category
          </TableHead>

          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Engagement
          </TableHead>

          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Created At
          </TableHead>

          <TableHead className="h-14 text-right text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      {/* ================= BODY ================= */}
      <TableBody>
        {ideas.map((idea) => (
          <TableRow
            key={idea.id}
            className="group border-slate-100 transition-colors hover:bg-slate-50/60 dark:border-slate-800
             dark:hover:bg-slate-900/50"
          >
            {/* ================= IDEA ================= */}
            <TableCell className="py-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 shrink-0 rounded-xl border border-slate-200 shadow-sm dark:border-slate-700">
                  <AvatarImage
                    src={idea.coverImage || ""}
                    alt={idea.title}
                    className="object-cover"
                  />

                  <AvatarFallback className="rounded-xl bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                    {idea.title.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="max-w-60 truncate font-bold text-slate-900 dark:text-white">
                    {idea.title}
                  </p>

                  <p className="mt-0.5 max-w-60 truncate text-xs text-slate-500">
                    {idea.description || "No description provided."}
                  </p>
                </div>
              </div>
            </TableCell>

            {/* ================= CATEGORY ================= */}
            <TableCell>
              <Badge
                variant="secondary"
                className="rounded-lg border-none bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              >
                {idea.category?.name || "Uncategorized"}
              </Badge>
            </TableCell>

            {/* ================= ENGAGEMENT ================= */}
            <TableCell>
              <div className="flex items-center gap-4">
                {/* Comments */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>{idea._count?.comments || 0}</span>
                </div>

                {/* Likes */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Heart className="h-3.5 w-3.5" />
                  <span>{idea._count?.likes || 0}</span>
                </div>

                {/* Views */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{idea.views || 0}</span>
                </div>
              </div>
            </TableCell>

            {/* ================= CREATED DATE ================= */}
            <TableCell>
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="h-3.5 w-3.5" />

                <span className="text-sm font-medium">
                  {format(new Date(idea.createdAt), "MMM dd, yyyy")}
                </span>
              </div>
            </TableCell>

            {/* ================= ACTIONS ================= */}
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                {/* View */}
                {viewAsLink ? (
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all
                     hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:bg-blue-950/30"
                  >
                    <Link
                      href={`/ideas/${idea.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View idea"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView?.(idea)}
                    className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all
                     hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}

                {/* Archive */}
                {onArchive && idea.status === IdeaStatus.COMPLETED && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onArchive(idea)}
                    title="Archive idea"
                    className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all
                     hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 dark:border-slate-700
                      dark:bg-slate-900 dark:hover:border-violet-800 dark:hover:bg-violet-950/30 cursor-pointer"
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                )}

                {/* Edit - only rendered when provided */}
                {onEdit && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(idea)}
                    className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all
                     hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-700
                      dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}

                {/* Delete - only rendered when provided */}
                {onDelete && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(idea)}
                    className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all
                     hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-rose-800 dark:hover:bg-rose-950/30 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
