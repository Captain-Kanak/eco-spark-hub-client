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

interface CategoriesTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
}

export default function CategoriesTable({
  categories,
  onEdit,
}: CategoriesTableProps) {
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
            className="hover:bg-slate-50/50 transition-colors"
          >
            <TableCell>
              <Avatar className="h-8 w-8 border shadow-sm">
                <AvatarImage src={category.icon || ""} />
                <AvatarFallback className="bg-emerald-600 text-white font-bold">
                  {category.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
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
                className="bg-emerald-50 text-emerald-700 border-none gap-1.5"
              >
                <Lightbulb className="h-3 w-3" />
                {category._count?.ideas || 0}
              </Badge>
            </TableCell>
            <TableCell className="text-slate-600 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                {format(new Date(category.createdAt), "MMM dd, yyyy")}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 cursor-pointer"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-40 rounded-xl shadow-xl"
                >
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onEdit(category)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Category
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-rose-600 focus:text-rose-600">
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
