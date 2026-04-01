import * as z from "zod";

const createCategoryFormSchema = z.object({
  name: z.string().min(2, "Name is too short"),
});

export const categoryValidations = {
  createCategoryFormSchema,
};
