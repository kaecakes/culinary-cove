import { auth } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link"

import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";
import { IRecipe } from "@/lib/database/models/recipe.model"

type CardProps = {
    recipe: IRecipe,
}

const Card = ({ recipe }: CardProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const isRecipeAuthor = userId === recipe.author._id.toString();

    return (
        <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]">
            {/* IMAGE */}
            <Link 
                href={`/recipes/${recipe._id}`}
                style={{backgroundImage: `url(${recipe.imageUrl})`}}
                className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
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
            {/* INFO */}
            <Link 
                href={`/recipes/${recipe._id}`}
                className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
            >
                {recipe.category && (
                    <p className="p-semibold-14 w-min rounded-full bg-primary-500 px-4 py-1 text-white line-clamp-1">
                        {recipe.category.name}
                    </p>
                )}
                <div className="flex-1">
                    <p className="p-medium-16 md:p-medium-20 line-clamp-2 text-black">
                        {recipe.title}
                    </p>
                    {recipe.description && (
                        <p className="p-medium-14 md:p-medium-16 line-clamp-2 flex-1 mt-2 text-grey-600">
                            {recipe.description}
                        </p>
                    )}
                </div>
                <div className="flex-between w-full">
                    <p className="p-medium-14 md:p-medium-16 text-grey-600">
                        {recipe.author.firstName} {recipe.author.lastName}
                    </p>
                </div>
            </Link>
        </div>
    )
}

export default Card;
