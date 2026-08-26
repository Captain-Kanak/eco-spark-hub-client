import { IdeaStatus } from "@/types/enums";
import * as z from "zod";
import { ALLOWED_IMAGE_EXTENSIONS, MAX_FILE_SIZE } from "./file";

const titleSchema = z
  .string("Title is required")
  .trim()
  .min(3, "Title must be at least 3 characters long")
  .max(255, "Title can't be more than 255 characters long");

const textSchema = z
  .string("Description is required")
  .trim()
  .min(10, "Description must be at least 10 characters long")
  .max(5000, "Description can't be more than 5000 characters long");

const impactSchema = z.array(z.string());

const locationSchema = z
  .string("Location is required")
  .trim()
  .min(2, "Location must be at least 2 characters long")
  .max(300, "Location can't be more than 300 characters long");

const amountSchema = z
  .number("Amount is required")
  .min(0, "Amount cannot be negative");

const idSchema = z.uuid("Invalid or missing UUID");

const parcentageSchema = z.number().int().min(0).max(100);

const imageSchema = z
  .instanceof(File)
  .nullable()
  .refine(
    (file) =>
      !file ||
      ALLOWED_IMAGE_EXTENSIONS.includes(
        `.${file.name.split(".").pop()?.toLowerCase()}`,
      ),
    {
      message: "Only JPG, JPEG, PNG, GIF, and WEBP files are allowed.",
    },
  )
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: "Image size cannot exceed 2MB.",
  });

const createIdeaSchema = z.object({
  title: titleSchema,
  description: textSchema,
  image: imageSchema,
  problemStatement: textSchema,
  proposedSolution: textSchema,
  expectedImpact: impactSchema,
  location: locationSchema,
  estimatedBudget: amountSchema,
  fundingGoal: amountSchema,
  categoryId: idSchema,
});

const updateIdeaSchema = createIdeaSchema.partial();

const updateIdeaStatusSchema = z.object({
  status: z.enum(IdeaStatus),
});

const createIdeaUpdateSchema = z.object({
  title: titleSchema,
  content: textSchema,
  progressPercentage: parcentageSchema,
});

const updateIdeaUpdateSchema = createIdeaUpdateSchema.partial();

export const IdeaValidation = {
  createIdeaSchema,
  updateIdeaSchema,
  updateIdeaStatusSchema,
  createIdeaUpdateSchema,
  updateIdeaUpdateSchema,
};
