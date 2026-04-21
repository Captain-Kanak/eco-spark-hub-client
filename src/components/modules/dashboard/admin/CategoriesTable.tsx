"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar,
  Edit,
  Lightbulb,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Category } from "@/types";

export default function CategoriesTable({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Table>
      <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
        <TableRow>
          <TableHead className="font-bold">Icon</TableHead>
          <TableHead className="font-bold">Category Name</TableHead>
          <TableHead className="font-bold">Total Ideas</TableHead>
          <TableHead className="font-bold">Created At</TableHead>
          <TableHead className="font-bold text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow
            key={category.id}
            className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
          >
            <TableCell>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-slate-100 capitalize">
                  <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-800 shadow-sm">
                    <AvatarImage src={category.icon || ""} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold">
                      {category.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 dark:text-slate-100 capitalize">
                  {category.name}
                </span>
                <span className="text-xs text-slate-500 truncate max-w-50">
                  {category.description || "No description provided."}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 border-none flex w-fit items-center gap-1.5 px-2.5 py-0.5"
              >
                <Lightbulb className="h-3 w-3" />
                {category._count?.ideas}
              </Badge>
            </TableCell>
            <TableCell className="text-slate-600 dark:text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {format(new Date(category.createdAt), "MMM dd, yyyy")}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 rounded-xl border-slate-200 dark:border-slate-800 shadow-xl"
                >
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-300">
                    <Edit className="h-4 w-4" />
                    Edit Category
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    // onClick={() => handleDelete(category.id)}
                    className="flex items-center gap-2 cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/20"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
