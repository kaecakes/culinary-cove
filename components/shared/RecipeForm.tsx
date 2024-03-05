"use client";

import { Button } from "@/components/ui/button";
import Dropdown from "@/components/shared/Dropdown";
import { FileUploader } from "@/components/shared/FileUploader";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { createRecipe, updateRecipe } from "@/lib/actions/recipe.actions";
import { recipeFormSchema } from "@/lib/validator";
import { recipeDefaultValues } from "@/constants";
import { useUploadThing } from "@/lib/uploadthing";

import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IRecipe } from "@/lib/database/models/recipe.model";

type RecipeFormProps = {
    userId: string,
    type: 'Create' | 'Update',
    recipeId?: string,
    recipe?: IRecipe
}

const RecipeForm = ({ userId, type, recipeId, recipe }: RecipeFormProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const [newIngredient, setNewIngredient] = useState<string>('');
    const initialValues = recipe && type === 'Update'
        ? recipe
        : recipeDefaultValues;
    const router = useRouter();

    const { startUpload } = useUploadThing('imageUploader');

    const form = useForm<z.infer<typeof recipeFormSchema>>({
      resolver: zodResolver(recipeFormSchema),
      defaultValues: initialValues,
    })

    function handleNewIngredientInput(e: ChangeEvent<HTMLInputElement>) {
        setNewIngredient(e.target.value);
    }

    function addIngredients() {
        const ingredientsArray = form.getValues().ingredients || [];
        const newIngredients = newIngredient
            .split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient != '');
        ingredientsArray.push(...newIngredients);
        form.setValue('ingredients', ingredientsArray);
        setNewIngredient('');
    }

    function updateIngredientsArray(ingredient: string, index: number) {
        const ingredientsArray = form.getValues().ingredients || [];
        if (ingredient) ingredientsArray[index] = ingredient;
        else ingredientsArray.splice(index, 1);
        form.setValue('ingredients', ingredientsArray);
    }
   
    async function onSubmit(values: z.infer<typeof recipeFormSchema>) {
        addIngredients();
        const recipeData = values;
        let uploadedImageUrl = values.imageUrl;
        if (files.length > 0) {
            const uploadedImages = await startUpload(files);
            if (!uploadedImages) return;
            uploadedImageUrl = uploadedImages[0].url;
        }
        if (type === 'Create') {
            try {
                const newRecipe = await createRecipe({
                    recipe: { ...recipeData, imageUrl: uploadedImageUrl },
                    userId,
                    path: '/profile',
                });
                if (newRecipe) {
                    form.reset();
                    router.push(`/recipes/${newRecipe._id}`);
                }
            } catch (error) {
                console.warn(error);
            }
        }
        if (type === 'Update') {
            if (!recipeId) {
                router.back();
                return;
            }

            try {
                const updatedRecipe = await updateRecipe({
                    recipe: { ...recipeData, imageUrl: uploadedImageUrl, _id: recipeId },
                    path: `/recipes/${recipeId}`,
                });
                if (updatedRecipe) {
                    form.reset();
                    router.push(`/recipes/${updatedRecipe._id}`);
                }
            } catch (error) {
                console.warn(error);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* URL */}
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input placeholder="Import an existing recipe" {...field} className="input-field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* NAME AND ACCESS */}
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Recipe name" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isPublic"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <Switch
                                  onCheckedChange={field.onChange}
                                  checked={field.value}
                                id="isPublic" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                <label htmlFor="isPublic" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Public recipe</label>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                    />
                </div>
                {/* CATEGORY */}
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Dropdown onChangeHandler={field.onChange} value={field.value} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* DESCRIPTION AND IMAGE */}
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="h-36">
                                    <Textarea placeholder="Description" {...field} className="textarea rounded-2xl md:h-72" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl className="md:h-72">
                                    <FileUploader
                                        onFieldChange={field.onChange}
                                        imageUrl={field.value || ''}
                                        setFiles={setFiles}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* PREP TIME AND SERVING SIZE */}
                <div className="flex flex-col gap-5 md:flex-row">
                    <FormField
                        control={form.control}
                        name="prepTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Prep time" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="cookTime"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Cook time" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="servings"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input placeholder="Servings" {...field} className="input-field" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* INGREDIENTS */}
                <div className="flex gap-5">
                    <Input
                        placeholder="Add ingredients, seperated by commas"
                        value={newIngredient}
                        onChange={handleNewIngredientInput}
                        onKeyDown={(e) => e.key === 'Enter' && addIngredients()}
                        className="input-field" />
                    <Button
                        type="button"
                        onClick={addIngredients}
                        className="h-100 min-w-[120px] rounded-full"
                    >
                        Add
                    </Button>
                </div>
                {form.getValues("ingredients").length > 0 && (
                    <FormField
                        control={form.control}
                        name="ingredients"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <>
                                        {field.value.map((ingredient, index) => (
                                            <Input
                                                key={index}
                                                placeholder={`Ingredient ${index + 1}`}
                                                value={ingredient}
                                                onChange={(e) => updateIngredientsArray(e.target.value, index)} 
                                                className="input-field" />
                                        ))}
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {/* INSTRUCTIONS */}
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl className="h-72">
                                <Textarea placeholder="Instructions" {...field} className="textarea rounded-2xl" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="rounded-full"
                >
                    {form.formState.isSubmitting ? (
                        'Submitting...'
                    ): `${type} recipe`}
                </Button>
            </form>
        </Form>
    )
}

export default RecipeForm