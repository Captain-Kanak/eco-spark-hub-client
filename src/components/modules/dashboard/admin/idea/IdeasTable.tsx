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
import { format } from "date-fns";
import { Calendar, Edit, Eye, Lightbulb, Trash2 } from "lucide-react";
import React from "react";

interface IdeasTableProps {
  ideas: Idea[];
  onView: (idea: Idea) => void;
  onDelete: (idea: Idea) => void;
  onEdit: (idea: Idea) => void;
}

export default function IdeasTable({
  ideas,
  onView,
  onEdit,
  onDelete,
}: IdeasTableProps) {
  return (
    <Table>
      <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
        <TableRow>
          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Icon
          </TableHead>
          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Category Name
          </TableHead>
          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Total Ideas
          </TableHead>
          <TableHead className="h-14 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Created At
          </TableHead>
          <TableHead className="h-14 w-35 text-right text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ideas.map((idea) => (
          <TableRow
            key={idea.id}
            className="group transition-all duration-200 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20"
          >
            <TableCell>
              <Avatar className="h-11 w-11 border border-slate-200 shadow-sm">
                <AvatarImage src={idea.coverImage || ""} />
                <AvatarFallback className="bg-linear-to-br from-emerald-500 to-teal-500 text-white font-bold">
                  {" "}
                  {idea.title.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <span className="text-sm font-bold tracking-tight capitalize">
                  {idea.title}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-3 font-semibold gap-2">
                <Lightbulb className="h-3 w-3" />
                {idea._count?.comments || 0}
              </Badge>
              <Badge className="rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-3 py-3 font-semibold gap-2">
                <Lightbulb className="h-3 w-3" />
                {idea._count?.likes || 0}
              </Badge>
            </TableCell>
            <TableCell className="text-slate-600 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar className="h-4 w-4 opacity-60" />

                <span className="text-sm">
                  {format(new Date(idea.createdAt), "MMM dd, yyyy")}
                </span>
              </div>
            </TableCell>

            <TableCell className="max-w-35">
              <div className="flex justify-end items-center gap-2">
                {/* View */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onView(idea)}
                  className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                {/* Edit */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(idea)}
                  className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/30 cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                </Button>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(idea)}
                  className="h-9 w-9 rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-red-800 dark:hover:bg-red-950/30 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
