// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
}

export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
}

// ====== RECIPE PARAMS
export type CreateRecipeParams = {
    userId: string
    recipe: {
        title: string
        description?: string
        imageUrl?: string
        ingredients?: Array<string>
        instructions?: string
        isPublic: boolean
        prepTime?: string
        cookTime?: string
        servings?: string
        url?: string
        categoryId?: string
    }
    path: string
}

export type UpdateRecipeParams = {
    userId: string
    recipe: {
        _id: string
        title: string
        description?: string
        imageUrl?: string
        ingredients?: Array<string>
        instructions?: string
        isPublic: boolean
        prepTime?: string
        cookTime?: string
        servings?: string
        categoryId?: string
    }
    path: string
}

export type DeleteRecipeParams = {
    recipeId: string
    path: string
}

export type GetAllRecipesParams = {
    query: string
    category: string
    limit: number
    page: number
}

export type GetRecipesByUserParams = {
    userId: string
    limit?: number
    page: number
}

export type GetRelatedRecipesByCategoryParams = {
    categoryId: string
    recipeId: string
    limit?: number
    page: number | string
}

export type Recipe = {
    _id: string
    title: string
    description?: string
    imageUrl?: string
    ingredients?: Array<string>
    instructions?: string
    isPublic: boolean
    url?: string
    prepTime?: string
    cookTime?: string
    servings?: string
    author: {
        _id: string
        firstName: string
        lastName: string
    }
    category?: {
        _id: string
        name: string
    }
}

// ====== CATEGORY PARAMS
export type CreateCategoryParams = {
    categoryName: string
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
}

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
}

export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}