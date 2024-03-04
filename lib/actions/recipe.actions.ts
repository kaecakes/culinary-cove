"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { isAuthor } from "@/lib/actions/user.actions";

import Category from "@/lib/database/models/category.model";
import Recipe from "@/lib/database/models/recipe.model";
import User from "@/lib/database/models/user.model";

import { CreateRecipeParams, DeleteRecipeParams, GetAllRecipesParams, GetRecipesByUserParams, GetRelatedRecipesByCategoryParams, UpdateRecipeParams } from "@/types";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: 'i' } });
}

const populateRecipe = async (query: any) => {
    return query
        .populate({ path: 'author', model: User, select: "_id firstName lastName"})
        .populate({ path: 'category', model: Category, select: "_id name"});
}

// CREATE
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

// UPDATE
export async function updateRecipe({ recipe, path }: UpdateRecipeParams) {
  try {
    await connectToDatabase();

    const recipeToUpdate = await Recipe.findById(recipe._id);
    if (!recipeToUpdate || !isAuthor(recipeToUpdate.author.toHexString())) {
      throw new Error('Unauthorized or recipe not found');
    };

    const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipe._id,
      { ...recipe, category: recipe.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedRecipe));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export const deleteRecipe = async ({ recipeId, path }: DeleteRecipeParams) => {
    try {
        const recipe = await getRecipeById(recipeId);
        if (!isAuthor(recipe.author.toHexString())) throw new Error("User does not have permission to delete this recipe");
        await connectToDatabase();
        const deletedEvent = await Recipe.findByIdAndDelete(recipeId);
        if (deletedEvent) revalidatePath(path);
    } catch (error) {
        handleError(error);
    }
}

// FETCH ONE
export const getRecipeById = async (recipeId: string) => {
    try {
        await connectToDatabase();
        const recipe = await populateRecipe(Recipe.findById(recipeId));
        if (!recipe) throw new Error("Recipe not found");
        return JSON.parse(JSON.stringify(recipe));
    } catch (error) {
        handleError(error);
    }
}

// FETCH ALL
export const getAllRecipes = async ({ query, limit = 6, page, category }: GetAllRecipesParams) => {
    try {
        await connectToDatabase();

        const { sessionClaims } = auth();
        const userId = sessionClaims?.userId as string;

        const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
        const categoryCondition = category ? await getCategoryByName(category) : null;
        const accessCondition = {
            $or: [
                { isPublic: true },
                { author: userId },
            ]
        };
        const conditions = {
            $and: [
                titleCondition,
                categoryCondition ? { category: categoryCondition._id } : {},
                accessCondition,
            ],
        };

        const skipAmount = (Number(page) - 1) * limit;
        const recipeQuery = Recipe.find(conditions)
            .sort({ title: 'asc' })
            .skip(skipAmount)
            .limit(limit);

        const recipes = await populateRecipe(recipeQuery);
        const recipesCount = await Recipe.countDocuments(conditions);

        return {
            data: JSON.parse(JSON.stringify(recipes)),
            totalPages: Math.ceil(recipesCount / limit),
        };
    } catch (error) {
        handleError(error);
    }
}

// FETCH BY AUTHOR
export async function getRecipesByUser({ userId, limit = 6, page }: GetRecipesByUserParams) {
    try {
        await connectToDatabase();
    
        const conditions = {
            $or: [
                await isAuthor(userId) ? {} : { isPublic: true },
                { author: userId },
            ]
        };
        const skipAmount = (page - 1) * limit;
    
        const recipesQuery = Recipe.find(conditions)
            .sort({ title: 'asc' })
            .skip(skipAmount)
            .limit(limit);
    
        const recipes = await populateRecipe(recipesQuery);
        const recipesCount = await Recipe.countDocuments(conditions);
    
        return { data: JSON.parse(JSON.stringify(recipes)), totalPages: Math.ceil(recipesCount / limit) }
    } catch (error) {
        handleError(error);
    }
}

// FETCH RELATED
export async function getRelatedRecipesByCategory({
        categoryId,
        recipeId,
        limit = 3,
        page = 1,
    }: GetRelatedRecipesByCategoryParams) {
    try {
        await connectToDatabase();
    
        const skipAmount = (Number(page) - 1) * limit;
        const conditions = { $and: [{ category: categoryId }, { _id: { $ne: recipeId } }] };
    
        const recipesQuery = Recipe.find(conditions)
            .sort({ createdAt: 'desc' })
            .skip(skipAmount)
            .limit(limit);
    
        const recipes = await populateRecipe(recipesQuery);
        const recipesCount = await Recipe.countDocuments(conditions);
    
        return { data: JSON.parse(JSON.stringify(recipes)), totalPages: Math.ceil(recipesCount / limit) };
    } catch (error) {
        handleError(error);
    }
}
