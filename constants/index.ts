import { IRecipe } from "@/lib/database/models/recipe.model"

export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'About Us',
    route: '/about',
  },
  {
    label: 'My Recipes',
    route: '/profile',
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
