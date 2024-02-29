"use server";

import { connectToDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

import Recipe from "@/lib/database/models/recipe.model";
import User from "@/lib/database/models/user.model";

import { CreateUserParams, UpdateUserParams } from "@/types";

export const createUser = async (user: CreateUserParams) => {
    try {
        await connectToDatabase();
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    } catch (error) {
        handleError(error);
    }
}

export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase()

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    handleError(error)
  }
}

export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
    try {
        await connectToDatabase();
        const updatedUser = await User.findOneAndUpdate({ clerkId }, user, { new: true });
        if (!updatedUser) throw new Error('User update failed');
        return JSON.parse(JSON.stringify(updatedUser));
    } catch (error) {
        handleError(error);
    }
}

export const deleteUser = async (clerkId: string) => {
    try {
        await connectToDatabase();
        const userToDelete = await User.findOne({ clerkId });
        if (!userToDelete) throw new Error('User not found');
        // unlink relationships
        await Promise.all([
            Recipe.updateMany(
                { _id: { $in: userToDelete.events } },
                { $pull: { author: userToDelete._id } },
            )
        ])
        const deletedUser = await User.findByIdAndDelete(userToDelete._id);
        revalidatePath('/');
        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
    } catch (error) {
        handleError(error);
    }
}