import Image from "next/image";

import { getRecipeById } from "@/lib/actions/recipe.actions";
import { SearchParamProps } from "@/types";

const RecipeDetails = async ({ params: { id }}: SearchParamProps) => {
    const recipe = await getRecipeById(id);
    return (
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
                                <p className="p-bold-20 rounded-full bg-primary-50 px-5 py-2 text-white">
                                    {recipe.isPublic ? 'Public' : 'Private'} recipe
                                </p>
                                {recipe.category && (
                                    <p className="p-medium-16 rounded-full bg-primary-500 px-5 py-2 text-white">
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
                            <>
                                <p className="p-medium-16 lg:p-regular-18 text-grey-600">Ingredients:</p>
                                <p key={ingredient + index} className="p-medium-16 lg:p-regular-18">
                                    {ingredient}
                                </p>
                            </>
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
    )
}

export default RecipeDetails;