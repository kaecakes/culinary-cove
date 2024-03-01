import { Schema, model, models } from "mongoose";

export interface IRecipe extends Document {
    _id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    ingredients?: [{ type: String }];
    instructions?: string;
    isPublic: boolean;
    url?: string;
    prepTime?: string;
    cookTime?: string;
    servings?: string;
    category?: { _id: string, name: string };
    author: { _id: string, firstName: string, lastName: string };
}

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    imageUrl: { type: String, required: false },
    ingredients: [{ type: String }],
    instructions: { type: String, required: false },
    url: { type: String, required: false },
    prepTime: { type: String, required: false },
    cookTime: { type: String, required: false },
    servings: { type: String, required: false },
    isPublic: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId || String, ref: 'Category', required: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;
