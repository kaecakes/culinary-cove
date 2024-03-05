import { z } from "zod";

export const recipeFormSchema = z.object({
    title: z.string()
        .min(3, { message: "Title must be at least 3 characters." })
        .max(50),
    description: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    categoryId: z.string().optional(),
    ingredients: z.array(z.string()),
    instructions: z.string().optional(),
    url: z.string().url().optional().or(z.literal("")),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    servings: z.string().optional(),
    isPublic: z.boolean(),
});