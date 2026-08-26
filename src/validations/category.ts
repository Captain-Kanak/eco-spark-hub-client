import * as z from "zod";
import { ALLOWED_IMAGE_EXTENSIONS, MAX_FILE_SIZE } from "./file";

const nameSchema = z
  .string("Name is required")
  .min(1, "Name must be at least 1 characters long")
  .max(255, "Name can't be more than 255 characters long");

const descriptionSchema = z
  .string()
  .max(1000, "Description can't be more than 1000 characters long");

const iconSchema = z
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

const createCategorySchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  icon: iconSchema,
});

const updateCategorySchema = createCategorySchema;

export const CategoryValidation = {
  createCategorySchema,
  updateCategorySchema,
};
