import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";

import { getAllRecipes } from "@/lib/actions/recipe.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const recipes = await getAllRecipes({
    query: searchText,
    category,
    page,
    limit: 3,
  });
  
  return (
    <main>
      <>
        <section className="pb-5 md:pb-10">
          <div className="wrapper grid grid-col-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col justify-center gap-8">
              <h1 className="text-4xl md:text-6xl">Crafted with love and geekiness.</h1>
              <p className="text-xs sm:text-sm">Dive into a world where passion meets expertise, where every dish is a labor of love, seasoned with a dash of geeky enthusiasm.</p>
              <Button size="lg" asChild className="button w-full md:w-fit">
                <Link href="#recipes">
                  Explore Now
                </Link>
              </Button>
            </div>
            <Image
              src="/assets/images/hero-2.jpg"
              alt="hero"
              width={1000}
              height={1000}
              className="sm:block hidden max-h-[70vh] object-cover object-center 2xl:max-h-[50vh] rounded-3xl"
            />
          </div>
        </section>
        <section id="recipes" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
          <h2 className="h2-bold">
            Recent recipes
          </h2>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>
          <Collection
            data={recipes?.data}
            emptyTitle="No recipes found"
            emptyStateSubtext="Adjust your search or share your own recipes to enrich our culinary community!"
            collectionType="All_Recipes"
            limit={6}
            page={page}
            totalPages={recipes?.totalPages}
          />
        </section>
      </>
    </main>
  )
}