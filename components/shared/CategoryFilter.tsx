"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoriesList = await getAllCategories();
      categoriesList && setCategories(categoriesList as ICategory[]);
    }

    getCategories();
  }, []);

  const onSelectCatergory = (category: string) => {
    const newUrl = categories && category !== "all" ?
      formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      }) :
      removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      })
      router.push(newUrl, { scroll: false });
  }

  return (
    <Select onValueChange={(value: string) => onSelectCatergory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all" className="select-item p-regular-14">All</SelectItem>
        {/* CATEGORIES LIST */}
        {categories.map((category) => (
          <SelectItem value={category.name} key={category._id} className="select-item p-regular-14">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter;