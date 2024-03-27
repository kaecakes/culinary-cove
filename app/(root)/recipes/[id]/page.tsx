import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import Collection from "@/components/shared/Collection";
import { getRecipeById, getRelatedRecipesByCategory } from "@/lib/actions/recipe.actions";

import { SearchParamProps } from "@/types";

const RecipeDetails = async ({ params: { id }, searchParams}: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const recipe = await getRecipeById(id);
    const isRecipeAuthor = userId === recipe.author._id.toString();

    const relatedRecipes = recipe.category
        ? (await getRelatedRecipesByCategory({
            categoryId: recipe.category._id,
            recipeId: recipe._id,
            page: searchParams.page as string,
        }))?.data
        : [];

    return (
        <>
            <section className="bg-primary-50 bg-cover bg-center py-5">
                <div className="wrapper flex flex-col gap-2 md:gap-12 w-full md:flex-row justify-center items-center">
                    {/* RECIPE IMAGE */}
                    <div className="h-full w-full relative">
                        <Image
                            src={recipe.imageUrl ? recipe.imageUrl : '/assets/icons/cooking.png'}
                            alt="recipe image"
                            width={700}
                            height={700}
                            className="w-full object-cover object-center overflow-hidden rounded-2xl"
                        />
                        {/* UPDATE */}
                        {isRecipeAuthor && (
                            <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-lg bg-white p-3 shadow-sm transition-all">
                                <Link href={`/recipes/${recipe._id}/update`}>
                                    <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                                </Link>
                                <DeleteConfirmation recipeId={recipe._id} />
                            </div>
                        )}
                    </div>
                    {/* INFO */}
                    {/* RECIPE INFORMATION */}
                    <div className="flex w-full flex-col gap-8 py-5 lg:py-10">
                        {/* METADATA */}
                        <div className="flex flex-col gap-6 text-white">
                            {/* TITLE */}
                            <h2 className="h2-bold">{recipe.title}</h2>
                            {/* ISPUBLIC/CATEGORY/AUTHOR */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <div className="flex gap-3">
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
                    </div>
                </div>
            </section>
            
            <section className="wrapper flex flex-col gap-8 md:gap-12 w-full my-8">
                <div className="w-full">
                    {/* DETAILS */}
                    <div className="flex flex-col gap-2">
                        {/* INGREDIENTS */}
                        {recipe.ingredients && (
                            <>
                                <p className="p-medium-16 lg:p-regular-18 text-grey-600">Ingredients:</p>
                                {recipe.ingredients.map((ingredient: string, index: number) => (
                                    <div key={ingredient + index}>
                                        <p className="p-medium-16 lg:p-regular-18">
                                            {ingredient}
                                        </p>
                                    </div>
                                ))}
                            </>
                        )}
                        {/* INSTRUCTIONS */}
                        {recipe.instructions && (
                            <>
                                <p className="p-medium-16 lg:p-regular-18 text-grey-600">Instructions:</p>
                                <div className="p-medium-16 lg:p-regular-18" dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
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
            </section>

            {/* RELATED RECIPES */}
            <section className="bg-primary-500 bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex flex-col gap-8 md:gap-12 w-full">
                    <h2 className="h2-bold">Related recipes</h2>
                    <Collection
                        data={relatedRecipes}
                        emptyTitle="No recipes found"
                        emptyStateSubtext="No related recipes found. Why not explore more or share your own unique creations?"
                        collectionType="All_Recipes"
                        limit={3}
                        page={searchParams.page as string}
                        totalPages={relatedRecipes?.totalPages}
                    />
                </div>
            </section>
        </>
    )
}

export default RecipeDetails;