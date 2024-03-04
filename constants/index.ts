import { IRecipe } from "@/lib/database/models/recipe.model"

export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'About us',
    route: '/about',
  },
  {
    label: 'Recipes',
    route: '/recipes',
  },
]
  
export const recipeDefaultValues = {
  title: '',
  description: '',
  imageUrl: '',
  ingredients: [],
  instructions: '',
  isPublic: false,
  url: '',
  prepTime: '',
  cookTime: '',
  servings: '',
} as IRecipe;
