import { auth } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";

import { getRecipesByUser } from "@/lib/actions/recipe.actions";
import { SearchParamProps } from "@/types";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    const recipesPage = Number(searchParams?.recipesPage) || 1;

    const recipes = await getRecipesByUser({userId, page: 1});
    return (
        <>
            <section className="bg-primary-50 bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className='h3-bold text-center sm:text-left text-white'>My Recipes</h3>
                    <Button asChild size="lg" className="button hidden sm:flex">
                    <Link href="/recipes/create">
                        Create new recipe
                    </Link>
                    </Button>
                </div>
            </section>
            <section className="wrapper my-8">
                <Collection
                    data={recipes?.data}
                    emptyTitle="No recipes posted yet"
                    emptyStateSubtext="No recipes yet? Share your culinary creations and inspire our community!"
                    collectionType="All_Recipes"
                    limit={3}
                    page={recipesPage}
                    urlParamName="recipesPage"
                    totalPages={recipes?.totalPages}
                />
            </section>
        </>
    )
}

export default ProfilePage