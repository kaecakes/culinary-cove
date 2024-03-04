"use server";

import { handleError } from "@/lib/utils";
import { connectToDatabase } from "@/lib/database";

import Category from "@/lib/database/models/category.model";
import Recipe from "@/lib/database/models/recipe.model";
import User from "@/lib/database/models/user.model";

import { CreateRecipeParams } from "@/types";

const populateRecipe = async (query: any) => {
    return query
        .populate({ path: 'author', model: User, select: "_id firstName lastName"})
        .populate({ path: 'category', model: Category, select: "_id name"})
}

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

export const getRecipeById = async ( recipeId: string) => {
    try {
        await connectToDatabase();
        const recipe = await populateRecipe(Recipe.findById(recipeId));
        if (!recipe) throw new Error("Recipe not found");
        return JSON.parse(JSON.stringify(recipe));
    } catch (error) {
        handleError(error);
    }
}