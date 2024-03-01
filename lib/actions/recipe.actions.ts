"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";

import Recipe from "@/lib/database/models/recipe.model";
import User from "@/lib/database/models/user.model";

import { CreateRecipeParams } from "@/types";

export const createRecipe = async ({ recipe, userId, path }: CreateRecipeParams) => {
    try {
        await connectToDatabase();
        const author = await User.findById(userId);
        if (!author) throw new Error("Author not found.");
        const newRecipe = { ...recipe, category: recipe.categoryId, author: userId };
        if (!newRecipe.categoryId) delete newRecipe.category; 
        const createdRecipe = await Recipe.create(newRecipe);
        return JSON.parse(JSON.stringify(createdRecipe));
    } catch (error) {
        handleError(error);
    }
}