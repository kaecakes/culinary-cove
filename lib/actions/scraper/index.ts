"use server";

import { recipeDefaultValues } from "@/constants";
import { handleError, wait } from "@/lib/utils";

import * as cheerio from "cheerio";
import puppeteer, { Page } from "puppeteer";

export async function scrapeAndReturnRecipe(url: string) {
    if (!url) return;
    try {
        // launch puppeteer
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        // go to url
        await page.goto(url, { waitUntil: "domcontentloaded" });
        // scrape site
        const recipe = await (scrapePage(url, page));
        // close and return
        await browser.close();
        return recipe;
    } catch (error) {
        handleError(error);
    }
}

async function scrapePage(url: string, page: Page) {
    // load cheerio
    const html = await page.content();
    const $ = cheerio.load(html);
    // define recipe
    let recipe = {
        ...recipeDefaultValues,
        ingredients: [] as string[],
        url,
    };
    // pull title, description, image
    recipe.title = $("meta[property='og:title']").attr("content") || $("title").text();
    recipe.description = $("meta[property='og:description']").attr("content") || $("meta[name='description']").attr("content");
    recipe.imageUrl = $("meta[property='og:image']").attr("content");
    // ingredients
    $("li").each((_, element) => {
        const classNames = $(element).attr("class");
        if (classNames && classNames.includes("ingredients")) {
            const ingredient = $(element).text().trim();
            recipe.ingredients.push(ingredient);
        }
    })
    return recipe;
}
