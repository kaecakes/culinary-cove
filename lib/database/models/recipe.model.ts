import { Schema, model, models } from "mongoose";

export interface IRecipe extends Document {
    _id: string;
    title: string;
    description?: string;
    imageUrl?: string;
    ingredients?: string | string[];
    instructions?: string;
    isPublic: boolean;
    category?: { _id: string, name: string };
    author: { _id: string, firstName: string, lastName: string };
}

const RecipeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    ingredients: { type: String || Array<String> },
    instructions: { type: String },
    isPublic: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Recipe = models.Recipe || model('Recipe', RecipeSchema);

export default Recipe;
