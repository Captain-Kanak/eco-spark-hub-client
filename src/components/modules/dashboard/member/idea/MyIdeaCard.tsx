import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Idea } from "@/types";
import { Edit3, Eye, Lightbulb, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MyIdeaCardProps {
  idea: Idea;
  onEdit: (category: Idea) => void;
  onDelete: (category: Idea) => void;
}

export default function MyIdeaCard({
  idea,
  onEdit,
  onDelete,
}: MyIdeaCardProps) {
  return (
    <Card className="group overflow-hidden rounded-[2rem] border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {idea.coverImage ? (
          <Image
            src={idea.coverImage}
            alt={idea.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Lightbulb className="h-10 w-10 text-slate-300" />
          </div>
        )}
      </div>

      <CardHeader className="p-6 pb-2"></CardHeader>

      <CardContent className="px-6 py-0">
        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 italic">
          "{idea.description}"
        </p>
      </CardContent>

      <CardFooter className="p-6 pt-4 flex items-center justify-between border-t border-slate-50 dark:border-slate-900 mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer"
          >
            <Link href={`/ideas/${idea.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            onClick={() => onEdit(idea)}
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={() => onDelete(idea)}
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
