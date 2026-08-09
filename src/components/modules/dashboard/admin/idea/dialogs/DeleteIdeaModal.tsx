import { Idea } from "@/types";
import React from "react";

interface ViewIdeaModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  idea: Idea;
}

export default function DeleteIdeaModal({}: ViewIdeaModalProps) {
  return <div>DeleteIdeaModal</div>;
}
