"use server";

import { handleError } from "@/lib/utils";
import { recipeDefaultValues } from "@/constants";

import * as cheerio from "cheerio";
import axios from "axios";
import { auth } from "@clerk/nextjs";
import puppeteer from "puppeteer";

export async function scrapeAndReturnBrightData(url: string) {
    if (!url) return;

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) || 0;
    // const { sessionClaims } = auth();
    // const userId = sessionClaims?.userId as string;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: "brd.superproxy.io",
        port,
        rejectUnauthorized: false,
    }
    try {
        const response = await axios.get(url, options);
        const recipe = await (scrapePage(url, response.data));
        return recipe;
    } catch (error) {
        handleError(error);
    }
}

export async function scrapeAndReturnRecipe(url: string) {
    if (!url) return;
    try {
        // launch puppeteer
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        // go to url
        await page.goto(url, { waitUntil: "domcontentloaded" });
        // scrape site
        const html = await page.content();
        const recipe = await (scrapePage(url, html));
        // close and return
        await browser.close();
        return recipe;
    } catch (error) {
        handleError(error);
    }
}

async function scrapePage(url: string, html: string) {
    // load cheerio
    const $ = cheerio.load(html);
    // define recipe
    let recipe = {
        ...recipeDefaultValues,
        ingredients: [] as string[],
        instructions: '' as string,
        url,
    };

    // pull title, description, image
    recipe.title = $("meta[property='og:title']").attr("content") || $("title").text();
    recipe.description = $("meta[property='og:description']").attr("content") || $("meta[name='description']").attr("content");
    recipe.imageUrl = $("meta[property='og:image']").attr("content");

    // ingredients
    $("li").each((_, element) => {
        const classNames = $(element).attr("class");
        if (!classNames) return;
        if (classNames.includes("ingredient")) {
            const ingredientText = $(element).text().trim();
            const childrenText = $(element).children().map((_, child) => $(child).text().trim()).get().join(" ");

            const ingredient = ingredientText || childrenText;
            if (ingredient) {
                recipe.ingredients.push(ingredient);
            }
        }
    })

    // instructions
    $("li div").each((_, element) => {
        const classNames = $(element).attr("class");
        if (!classNames) return;
        if (classNames.includes("instruction") || classNames.includes("direction")) {
            $(element).contents().each((_, node) => {
                recipe.instructions = recipe.instructions.concat(`${$(node).text().trim()}\n`)
            });
        }
    })

    return recipe;
}
