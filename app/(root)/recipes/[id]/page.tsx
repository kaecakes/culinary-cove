import Image from "next/image";

import { getRecipeById, getRelatedRecipesByCategory } from "@/lib/actions/recipe.actions";
import { SearchParamProps } from "@/types";
import Collection from "@/components/shared/Collection";

const RecipeDetails = async ({ params: { id }, searchParams}: SearchParamProps) => {
    const recipe = await getRecipeById(id);
    const relatedRecipes = recipe.category
        ? (await getRelatedRecipesByCategory({
            categoryId: recipe.category._id,
            recipeId: recipe._id,
            page: searchParams.page as string,
        }))?.data
        : [];
    return (
        <>
            <section className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 max-w-7xl">
                    {/* RECIPE IMAGE */}
                    {recipe.imageUrl && (
                        <Image
                            src={recipe.imageUrl}
                            alt="hero image"
                            width={700}
                            height={700}
                            className="h-full min-h-[300px] object-cover object-center"
                        />
                    )}
                    {/* RECIPE INFORMATION */}
                    <div className="flex w-full flex-col gap-8 p-5 md:p-10">
                        {/* METADATA */}
                        <div className="flex flex-col gap-6">
                            {/* TITLE */}
                            <h2 className="h2-bold">{recipe.title}</h2>
                            {/* ISPUBLIC/CATEGORY/AUTHOR */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
                                    <p className="p-medium-16  rounded-full bg-primary-50 px-5 py-3 text-white line-clamp-1">
                                        {recipe.isPublic ? 'public' : 'private'}
                                    </p>
                                    {recipe.category && (
                                        <p className="p-medium-16 rounded-full bg-primary-500 px-5 py-3 text-white line-clamp-1">
                                            {recipe.category.name}
                                        </p>
                                    )}
                                </div>
                                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                                    by{' '}
                                    <span>{recipe.author.firstName} {recipe.author.lastName}</span>
                                </p>
                            </div>
                            {recipe.description && (
                                <p className="p-medium-16 lg:p-regular-18">{recipe.description}</p>
                            )}
                        </div>
                        {/* DETAILS */}
                        <div className="flex flex-col gap-2">
                            {/* INGREDIENTS */}
                            {recipe.ingredients.map((ingredient: string, index: number) => (
                                <div key={ingredient + index}>
                                    <p className="p-medium-16 lg:p-regular-18 text-grey-600">Ingredients:</p>
                                    <p className="p-medium-16 lg:p-regular-18">
                                        {ingredient}
                                    </p>
                                </div>
                            ))}
                            {/* INSTRUCTIONS */}
                            {recipe.instructions && (
                                <>
                                    <p className="p-medium-16 lg:p-regular-18 text-grey-600">Instructions:</p>
                                    <p className="p-medium-16 lg:p-regular-18">
                                        {recipe.instructions}
                                    </p>
                                </>
                            )}
                            {/* ORGINAL URL */}
                            {recipe.url && (
                                <>
                                    <p className="p-medium-16 lg:p-regular-18 text-grey-600">Orginal source:</p>
                                    <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">{recipe.url}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED RECIPES */}
            <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
                <h2 className="h2-bold">Related recipes</h2>
                <Collection
                    data={relatedRecipes}
                    emptyTitle="No recipes found"
                    emptyStateSubtext=""
                    collectionType="All_Recipes"
                    limit={6}
                    page={1}
                    totalPages={2}
                />
            </section>
        </>
    )
}

export default RecipeDetails;