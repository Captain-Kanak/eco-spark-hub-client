import * as z from "zod";

const nameSchema = z
  .string("Name is required")
  .min(1, "Name must be at least 1 characters long")
  .max(255, "Name can't be more than 255 characters long");

const descriptionSchema = z
  .string()
  .max(1000, "Description can't be more than 1000 characters long");

const iconSchema = z.instanceof(File).nullable();

const createCategorySchema = z.object({
  name: nameSchema,
  description: descriptionSchema,
  icon: iconSchema,
});

const updateCategorySchema = createCategorySchema.partial();

export const CategoryValidation = {
  createCategorySchema,
  updateCategorySchema,
};
