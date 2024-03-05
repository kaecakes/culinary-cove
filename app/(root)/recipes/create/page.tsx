import RecipeForm from "@/components/shared/RecipeForm";
import { auth } from "@clerk/nextjs";

const CreateRecipe = () => {
    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <>
            <section className="py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">Create Recipe</h3>
            </section>

            <div className="wrapper my-8">
                <RecipeForm userId={userId} type="Create" />
            </div>
        </>
    )
}

export default CreateRecipe